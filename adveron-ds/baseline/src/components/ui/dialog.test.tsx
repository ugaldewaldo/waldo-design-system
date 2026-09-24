import { render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef } from "react";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

// jsdom does no layout, so these are contract assertions on the class list rather than
// measurements: they lock the scroll-containment recipe — viewport cap and column layout
// on DialogContent, the scroll confined to DialogBody, and static chrome — so it can't be
// reshuffled into a version that either stops containing or starts scrolling the chrome.
type ContentProps = ComponentPropsWithoutRef<typeof DialogContent>;

const renderDialog = (
  contentProps: Omit<ContentProps, "children"> = {},
  bodyClassName?: string,
): ReturnType<typeof render> =>
  render(
    <Dialog open>
      <DialogContent {...contentProps}>
        <DialogHeader data-testid="dialog-header">
          <DialogTitle>Scrollable dialog</DialogTitle>
          <DialogDescription>Chrome holds still, body scrolls.</DialogDescription>
        </DialogHeader>
        <DialogBody data-testid="dialog-body" className={bodyClassName}>
          Body
        </DialogBody>
        <DialogFooter data-testid="dialog-footer">Footer</DialogFooter>
      </DialogContent>
    </Dialog>,
  );

// Per CSS Overflow 3, auto/scroll/hidden are all scrollable values — hidden merely hides
// the scrollbar UI, the box still scrolls programmatically, so a focus() inside it can
// drag the chrome exactly like auto would. Only clip is genuinely non-scrollable, hence
// its absence.
const SCROLLS = /overflow-(x-|y-)?(auto|scroll|hidden)/;

describe("DialogContent scroll containment", () => {
  it("caps its height at the viewport and lays children out as a column", () => {
    renderDialog();

    const content = screen.getByRole("dialog");
    expect(content).toHaveClass("max-h-[calc(100dvh_-_2rem)]", "flex", "flex-col");
  });

  it("insets itself horizontally as well as vertically", () => {
    renderDialog();

    // w-full would be the whole viewport width for a fixed element, leaving a dialog
    // edge-to-edge on a narrow screen while still capped top and bottom.
    expect(screen.getByRole("dialog")).toHaveClass("w-[calc(100%_-_2rem)]");
  });

  it("never becomes a scroll container itself", () => {
    renderDialog();

    // The whole point of the column layout: if DialogContent scrolled, the header,
    // footer, and close button would move with the content.
    const content = screen.getByRole("dialog");
    expect(content.className).not.toMatch(SCROLLS);
  });

  it("confines the scroll to DialogBody", () => {
    renderDialog();

    expect(screen.getByTestId("dialog-body")).toHaveClass(
      // Being a scroll container is also what lets it shrink: that zeroes its automatic
      // minimum size, so no explicit min-h-0 is needed.
      "overflow-y-auto",
      "flex-1",
    );
  });

  it("keeps the header and footer static, not sticky", () => {
    renderDialog();

    for (const testId of ["dialog-header", "dialog-footer"]) {
      const chrome = screen.getByTestId(testId);
      expect(chrome).toHaveClass("shrink-0");
      expect(chrome.className).not.toMatch(/\bsticky\b/);
      expect(chrome.className).not.toMatch(SCROLLS);
    }
  });

  it("leaves DialogBody as the only scrolling element in the dialog", () => {
    const { baseElement } = renderDialog();

    const scrollers = [...baseElement.querySelectorAll<HTMLElement>("*")].filter(
      (element) => SCROLLS.test(element.className),
    );
    expect(scrollers).toEqual([screen.getByTestId("dialog-body")]);
  });

  it("anchors the close button to DialogContent, outside the scrolling body", () => {
    renderDialog();

    const content = screen.getByRole("dialog");
    const closeButton = screen.getByRole("button", { name: "Close" });

    // Positioned against the capped, non-scrolling DialogContent — anywhere inside the
    // body it would scroll out of reach, which is the bug this guards.
    expect(closeButton.parentElement).toBe(content);
    expect(closeButton).toHaveClass("absolute", "right-5", "top-5");
  });

  it("keeps the overlay on the same stacking layer as the content", () => {
    const { baseElement } = renderDialog();

    // Nothing in this app paints above z-50, so the pair only has to agree with each
    // other: split them and the dim lands either over the dialog or under it.
    expect(screen.getByRole("dialog")).toHaveClass("z-50");
    expect(baseElement.querySelector(".fixed.inset-0")).toHaveClass("z-50");
  });
});

describe("DialogOverlay", () => {
  it("dims without a backdrop filter", () => {
    const { baseElement } = renderDialog();

    // Radix gives the overlay no identifying attribute of its own — it is a bare div
    // carrying only our classes — so it is found the same way as above.
    const overlay = baseElement.querySelector(".fixed.inset-0");

    // A full-viewport backdrop filter is re-blurred by Chrome on every partial repaint
    // above it (a hover inside the dialog will do it), which flickers the page behind the
    // dialog as the mouse moves. The wash alone carries the separation.
    expect(overlay).toHaveClass("bg-background/80");
    expect(overlay?.className).not.toMatch(/backdrop-/);
  });
});

describe("DialogContent consumer overrides", () => {
  it("lets a consumer max-height replace the viewport cap", () => {
    renderDialog({ className: "max-h-[80vh]" });

    const content = screen.getByRole("dialog");
    expect(content).toHaveClass("max-h-[80vh]");
    expect(content).not.toHaveClass("max-h-[calc(100dvh_-_2rem)]");
  });

  it("keeps the size max-width alongside the height cap", () => {
    renderDialog({ size: "sm" });

    const content = screen.getByRole("dialog");
    expect(content).toHaveClass("max-w-[560px]", "max-h-[calc(100dvh_-_2rem)]");
  });

  // Consumer classNames go through the same twMerge call as the scroll classes, which is
  // the one path that can silently un-fix this — most send layout, and it has to survive.
  it("survives the layout className consumers pass to DialogBody", () => {
    renderDialog({}, "flex flex-col gap-4");

    expect(screen.getByTestId("dialog-body")).toHaveClass(
      "overflow-y-auto",
      "flex-1",
      "flex",
      "flex-col",
      "gap-4",
    );
  });

  it("keeps the vertical scroll when a consumer constrains the other axis", () => {
    // A body wider than its dialog needs overflow-x-hidden, which lands in a different
    // twMerge group and must leave the scroll alone. A plain overflow-hidden would not —
    // it replaces overflow-y-auto outright and silently removes the scroll.
    renderDialog({}, "overflow-x-hidden");

    expect(screen.getByTestId("dialog-body")).toHaveClass(
      "overflow-x-hidden",
      "overflow-y-auto",
      "flex-1",
    );
  });

  it("keeps DialogBody the only scroller when a <form> wraps the slots", () => {
    // A wrapper becomes the flex item instead of DialogBody, so it has to carry the
    // column layout itself or the body can't shrink and the content escapes the cap.
    // The fixture's form carries those classes because that is what a consumer must
    // write — a requirement jsdom cannot check, since it does no layout. What IS
    // asserted is the primitive's side: with its slots one level down, nothing but
    // DialogBody may become a scroller.
    const { baseElement } = render(
      <Dialog open>
        {/* No DialogDescription in this fixture, and Radix wants to be told so
            rather than warn about the element that is not there. */}
        <DialogContent aria-describedby={undefined}>
          <form className="flex min-h-0 flex-1 flex-col">
            <DialogHeader>
              <DialogTitle>Wrapped in a form</DialogTitle>
            </DialogHeader>
            <DialogBody data-testid="dialog-body">Body</DialogBody>
            <DialogFooter>Footer</DialogFooter>
          </form>
        </DialogContent>
      </Dialog>,
    );

    const scrollers = [...baseElement.querySelectorAll<HTMLElement>("*")].filter(
      (element) => SCROLLS.test(element.className),
    );
    expect(scrollers).toEqual([screen.getByTestId("dialog-body")]);
  });
});

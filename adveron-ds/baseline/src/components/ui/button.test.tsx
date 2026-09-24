import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

// Example component test — proves the harness (jsdom + Testing Library + the `@`
// alias + the design-system theme) works, so screens land testable by default.
describe("Button", () => {
  it("renders its label as a button", () => {
    render(<Button>Sign in</Button>);
    expect(
      screen.getByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();
  });

  it("is disabled while loading", () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
  });
});

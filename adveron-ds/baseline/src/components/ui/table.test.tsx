import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table, TableHead, TableHeader, TableRow } from "./table";

// jsdom lays nothing out, so the containment itself cannot be measured here.
// What can be pinned is the pairing that makes it hold in a browser: the
// wrapper that clips a wide table horizontally is also the containing block
// for an absolutely positioned descendant. Without `relative`, a `sr-only`
// header cell (position: absolute) is positioned against the page instead,
// and its offset — the table's full width — widens the document past a narrow
// viewport even though the table itself scrolls inside the wrapper.
describe("Table", () => {
  it("clips a wide table inside a wrapper that also contains its positioned descendants", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Open</span>
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.querySelector("table")).not.toBeNull();
    expect(wrapper.className).toContain("overflow-x-auto");
    expect(wrapper.className).toContain("relative");
  });
});

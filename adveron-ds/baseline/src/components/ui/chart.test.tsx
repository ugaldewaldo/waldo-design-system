import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { stubChartLayout } from "@/test/chart-layout";

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";

// The tooltip is where a stacked chart's operation names live — the usage
// screen dropped its legend on purpose — so the name mapping and the zero-row
// filtering are pinned here, at the component that renders them, rather than
// through simulated hover geometry jsdom cannot do.

const CONFIG: ChartConfig = {
  op0: { label: "brand.get", color: "var(--color-chart-1)" },
  op1: { label: "searchConsole.query", color: "var(--color-chart-2)" },
};

type TooltipPayload = NonNullable<
  ComponentProps<typeof ChartTooltipContent>["payload"]
>;

// One stacked segment's tooltip entry, as recharts hands it over: named by the
// series' dataKey, which is what the content resolves through the config.
function payloadItem(dataKey: string, value: number): TooltipPayload[number] {
  return {
    dataKey,
    name: dataKey,
    value,
    color: "#000",
    payload: {},
  } as TooltipPayload[number];
}

function renderTooltip(
  payload: TooltipPayload,
  props: Partial<ComponentProps<typeof ChartTooltipContent>> = {},
): void {
  render(
    <ChartContainer config={CONFIG}>
      <div>
        {/* A string label, as the charts hand over (the bucket's date): without
            one the heading falls back to the first row's own name, which would
            double every name assertion below. */}
        <ChartTooltipContent
          active
          payload={payload}
          label="2026-08-27"
          {...props}
        />
      </div>
    </ChartContainer>,
  );
}

describe("ChartTooltipContent", () => {
  // ResponsiveContainer mounts nothing until it has dimensions, and jsdom does
  // no layout — same stub the screen tests use.
  let restoreChartLayout: () => void;
  beforeEach(() => {
    restoreChartLayout = stubChartLayout();
  });
  afterEach(() => {
    restoreChartLayout();
  });

  it("names each row from the chart config, not the series key", () => {
    renderTooltip([payloadItem("op0", 3), payloadItem("op1", 1)]);

    expect(screen.getByText("brand.get")).toBeInTheDocument();
    expect(screen.getByText("searchConsole.query")).toBeInTheDocument();
    expect(screen.queryByText("op0")).toBeNull();
  });

  it("drops zero-valued rows only when asked to", () => {
    // Zero-filled stacked data gives every series a value on every day, so a
    // busy account's tooltip would list a dozen rows of mostly zeros. The
    // filter is opt-in: a single-series chart's "0" on a quiet day is the
    // answer, not noise.
    renderTooltip([payloadItem("op0", 3), payloadItem("op1", 0)], {
      hideZeroValueItems: true,
    });

    expect(screen.getByText("brand.get")).toBeInTheDocument();
    expect(screen.queryByText("searchConsole.query")).toBeNull();
  });

  it("keeps zero-valued rows by default", () => {
    renderTooltip([payloadItem("op0", 3), payloadItem("op1", 0)]);

    expect(screen.getByText("searchConsole.query")).toBeInTheDocument();
  });
});

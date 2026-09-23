import { ChartLegendRow } from "@/components/ui/chart-legend-row";
import {
  ChartTooltipCaption,
  ChartTooltipLabel,
  ChartTooltipPanel,
  ChartTooltipRow,
  ChartTooltipRows,
  ChartTooltipTotal,
} from "@/components/ui/chart-tooltip-panel";
import { DayColumnChart } from "@/components/ui/day-column-chart";
import { DotsLoader, ShimmerText, TextCursor } from "@/components/ui/loader";
import { ShareBar } from "@/components/ui/share-bar";
import { SparkBars } from "@/components/ui/spark-bars";
import { StatusSpinner } from "@/components/ui/status-spinner";

import { CHART, type SectionDef } from "../lib";

const DATES = ["2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-12"];

export const dataSections: SectionDef[] = [
  {
    id: "data",
    title: "Data bits",
    note: "The small pieces charts are assembled from. Each takes a chart token, never a literal colour.",
    specs: [
      {
        label: "share bar",
        wide: true,
        node: (
          <ShareBar
            className="max-w-md"
            valueLabel="mentions"
            segments={[
              { name: "Reddit", color: CHART(1), value: 4820 },
              { name: "X", color: CHART(2), value: 3110 },
              { name: "TikTok", color: CHART(3), value: 1940 },
              { name: "LinkedIn", color: CHART(4), value: 860 },
            ]}
          />
        ),
      },
      {
        label: "chart legend row",
        wide: true,
        node: (
          <ChartLegendRow
            items={[
              { name: "Reddit", color: CHART(1), value: "44%" },
              { name: "X", color: CHART(2), value: "28%" },
              { name: "TikTok", color: CHART(3), value: "18%" },
              { name: "LinkedIn", color: CHART(4), value: "10%" },
            ]}
          />
        ),
      },
      {
        label: "spark bars",
        node: (
          <SparkBars
            className="w-40"
            data={[0.3, 0.55, 0.42, 0.8, 0.65, 0.9, 0.5].map((v) => ({ v }))}
          />
        ),
      },
      {
        label: "day column chart",
        wide: true,
        node: (
          <DayColumnChart
            className="max-w-lg"
            dates={DATES}
            axisTicks={[DATES[0], DATES[DATES.length - 1]]}
            totalLabel="mentions"
            series={[
              { name: "Owned", color: CHART(1), values: [12, 18, 9, 24, 16] },
              { name: "Earned", color: CHART(2), values: [30, 22, 41, 28, 35] },
            ]}
          />
        ),
      },
      {
        label: "chart tooltip panel",
        node: (
          <ChartTooltipPanel>
            <ChartTooltipLabel>11 Sep 2026</ChartTooltipLabel>
            <ChartTooltipRows>
              <ChartTooltipRow name="Owned" value="24" color={CHART(1)} />
              <ChartTooltipRow name="Earned" value="28" color={CHART(2)} />
            </ChartTooltipRows>
            <ChartTooltipTotal name="Total" value="52" />
            <ChartTooltipCaption>Source credibility weighted</ChartTooltipCaption>
          </ChartTooltipPanel>
        ),
      },
    ],
  },
  {
    id: "loaders",
    title: "Loaders",
    specs: [
      { label: "dots", node: <DotsLoader /> },
      { label: "shimmer text", node: <ShimmerText>Analysing mentions</ShimmerText> },
      { label: "text cursor", node: <TextCursor /> },
      { label: "spinner loading", node: <StatusSpinner status="loading" /> },
      { label: "spinner success", node: <StatusSpinner status="success" /> },
      { label: "spinner error", node: <StatusSpinner status="error" /> },
      { label: "spinner warning", node: <StatusSpinner status="warning" /> },
    ],
  },
];

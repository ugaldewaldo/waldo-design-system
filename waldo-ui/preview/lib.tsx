import { Component, type ReactNode } from "react";

/* Every specimen in this gallery imports the component from src/. Nothing here
   restates a style: if a component changes, this page changes with it. That is
   the whole point of previewing the real thing rather than a drawing of it. */

export type Spec = { label: string; node: ReactNode; wide?: boolean };

export type SectionDef = {
  id: string;
  title: string;
  note?: string;
  specs: Spec[];
};

/** A component that throws must not take the page down with it. */
class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <span className="rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1 font-mono text-[11px] text-destructive">
          {this.state.error.message.slice(0, 60)}
        </span>
      );
    }
    return this.props.children;
  }
}

export function Section({ id, title, note, specs }: SectionDef) {
  return (
    <section id={id} className={title ? "scroll-mt-16 border-b border-foreground/10 py-10" : "py-6"}>
      {title ? <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h2> : null}
      {note ? <p className="mt-1 max-w-2xl text-sm text-foreground/55">{note}</p> : null}
      <div className={title ? "mt-6 flex flex-wrap items-start gap-x-8 gap-y-7" : "flex flex-wrap items-start gap-x-8 gap-y-7"}>
        {specs.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className={s.wide ? "flex w-full flex-col gap-2" : "flex min-w-[8rem] flex-col gap-2"}
          >
            <div className="flex min-h-[2.5rem] items-center">
              <Boundary>{s.node}</Boundary>
            </div>
            <code className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground/40">
              {s.label}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Chart tokens, so specimens never hardcode a colour. */
export const CHART = (n: number) => `hsl(var(--chart-${n}))`;

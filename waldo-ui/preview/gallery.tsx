import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

import { Section } from "./lib";
import { coreSections } from "./sections/core";
import { dataSections } from "./sections/data";
import { formSections } from "./sections/forms";
import { layoutSections } from "./sections/layout";
import { overlaySections } from "./sections/overlays";

const SECTIONS = [
  ...coreSections,
  ...formSections,
  ...layoutSections,
  ...overlaySections,
  ...dataSections,
];

export function Gallery(): React.ReactElement {
  const [light, setLight] = useState(false);

  // The theme is a class on <html>, the same switch a consuming app throws, so
  // what renders here is what renders there.
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.body.className = "bg-background text-foreground antialiased";
  }, [light]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3">
          <span className="text-sm font-semibold tracking-[-0.02em] text-foreground">Waldo UI</span>
          <nav className="flex flex-1 flex-wrap gap-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-foreground/50 transition-colors hover:text-foreground"
              >
                {s.title}
              </a>
            ))}
          </nav>
          <label className="flex items-center gap-2 text-xs text-foreground/50">
            Light
            <Switch checked={light} onCheckedChange={setLight} />
          </label>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <div className="py-10">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-foreground">
            Live components
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/55">
            Rendered from <code className="font-mono text-xs">src/components/ui</code> — the same
            files a consuming app installs. If it looks wrong here, it is wrong in the app.
          </p>
        </div>

        {SECTIONS.map((s) => (
          <Section key={s.id} {...s} />
        ))}
      </main>
    </div>
  );
}

# Adveron — live components

Renders the components Adveron actually ships, straight out of the monorepo:
`waldo-agentic/packages/adveron-web/src/components/ui`.

Nothing here restates a style. If a component changes in the app, this page
changes with it — which is the point of previewing the real thing rather than a
drawing of it.

```bash
npm install
npm run dev        # live — the waldo-agentic working copy, port 4500
npm run baseline   # baseline — the frozen snapshot in adveron-ds/baseline, port 4510
```

Any page takes `?embed=1&only=<component file name>&theme=light|dark` to render a
single component with no chrome; embedded, it posts its height to the parent.
The Adveron DS compare page is built on that.

The monorepo path is resolved in `vite.config.ts`. Change `ADVERON_SRC` there if
the checkout lives somewhere else.

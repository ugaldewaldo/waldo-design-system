# Adveron — live components

Renders the components Adveron actually ships, straight out of the monorepo:
`waldo-agentic/packages/adveron-web/src/components/ui`.

Nothing here restates a style. If a component changes in the app, this page
changes with it — which is the point of previewing the real thing rather than a
drawing of it.

```bash
npm install
npm run dev
```

The monorepo path is resolved in `vite.config.ts`. Change `ADVERON_SRC` there if
the checkout lives somewhere else.

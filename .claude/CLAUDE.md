# Waldo Design System — Claude Code Config

## Skills disponibles

- `/ds-add-token` — Añadir o actualizar un token manteniendo JSON + CSS + Tailwind + componentes sincronizados
- `/ds-component` — Implementar o corregir un componente desde Figma con tokens correctos

**Usar siempre una skill antes de tocar tokens o componentes.**

## Reglas críticas

Ver `CLAUDE.md` en la raíz del proyecto para las reglas completas.

Resumen ejecutivo:
- **Fuente de verdad**: `figma/waldo.tokens.json`
- **Nunca hardcodear hex en componentes** — siempre clases Tailwind o CSS vars
- **Nunca usar brand.* en producto** — son solo para marketing
- **Las 4 capas van juntas**: JSON → globals.css → tailwind.config.ts → componentes

## Flujo de trabajo estándar

```
Token nuevo o cambiado → /ds-add-token
Componente nuevo o corregir → /ds-component
```

# AGENTS.md — Gridiron-Spain

<!-- AUTO-GENERATED:START -->

## Contexto detectado automáticamente

**Repositorio:** `Gridiron-Spain`

### Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js

### Carpetas relevantes
- `src/`
- `tests/`

### Scripts disponibles
- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`
- `typecheck`: `tsc --noEmit`
- `typegen`: `next typegen`
- `content:check`: `tsx scripts/check-content.ts`
- `test`: `tsx --test tests/*.test.ts`

### Dependencias relevantes
- `@tailwindcss/postcss`
- `@types/leaflet`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vercel/analytics`
- `eslint`
- `eslint-config-next`
- `leaflet`
- `next`
- `react`
- `react-dom`
- `react-leaflet`
- `server-only`
- `tailwindcss`
- `tsx`
- `typescript`

### Validaciones sugeridas
- `build`
- `lint`
- `typecheck`
- `typegen`
- `content:check`
- `test`

## Reglas globales para agentes

- Git: ver «Reglas de publicación» en la sección manual de este archivo, que prevalece sobre esta línea.
- No desplegar.
- No modificar `.env`, secretos o credenciales.
- No ampliar el scope del ticket.
- No hacer refactors no relacionados.
- Antes de implementar: explicar diagnóstico, plan, riesgos y validaciones.
- Después de implementar: revisar `git diff`.
- Si hay ambigüedad material, detenerse y pedir decisión humana.
- Priorizar cambios mínimos, reversibles y trazables.

<!-- AUTO-GENERATED:END -->

<!-- MANUAL:START -->

## Reglas de publicación (prevalecen sobre el bloque autogenerado)

Primer Down es un proyecto editorial de una sola persona y las routines descritas en
`docs/rankings-refresh.md` publican **directamente en `main`**, sin revisión humana previa
(decidido el 6-10-2026). Las reglas reales son estas:

- `git add`, `git commit` y `git push origin main` están permitidos para contenido y datos
  editoriales (`src/data/**`, `research/**`, `docs/**`) cuando el editor lo pide o cuando lo
  ejecuta una routine programada.
- Antes de cualquier push tienen que pasar los tres: `npm run content:check`,
  `npx tsc --noEmit` y `npm run build`. Si alguno falla y no se puede arreglar, se revierte y
  no se publica nada.
- Nunca `--force`, nunca reescribir historia, y nada de ramas ni PRs para el flujo editorial.
  Si el push se rechaza: `git pull --rebase origin main` y un único reintento.
- Para cambios de **código** fuera de `src/data/**`: explicar diagnóstico, plan, riesgos y
  validaciones antes de implementar, y confirmar con el editor antes de publicar.
- Un archivo que ya existe no se sobrescribe sin leer antes su contenido (`.nvmrc`,
  configuraciones, datos previos).
- Sigue prohibido: desplegar, modificar `.env`, secretos o credenciales, ampliar el scope del
  ticket y hacer refactors no relacionados.
- Las reglas de credibilidad de `CLAUDE.md` son absolutas y nada de lo anterior las anula:
  cada dato con fuente, nada inventado, y lo que no está confirmado se marca como tal.

## Reglas de negocio

Añade aquí reglas específicas del proyecto (integraciones sensibles, comportamiento PRE/PROD,
flujos que requieren revisión humana, reglas de dominio que no se deducen del código).

<!-- MANUAL:END -->

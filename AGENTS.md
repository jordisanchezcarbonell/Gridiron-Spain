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

- No hacer `git add`.
- No hacer `git commit`.
- No hacer `git push`.
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

Añade aquí reglas de negocio específicas del proyecto.

Ejemplos:
- integraciones sensibles;
- comportamiento PRE/PROD;
- flujos que requieren revisión humana;
- reglas de dominio que no pueden inferirse del código.

<!-- MANUAL:END -->

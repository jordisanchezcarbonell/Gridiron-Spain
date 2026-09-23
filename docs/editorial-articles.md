# Guía editorial de artículos

Cada artículo vive en `src/data/articles/` y se registra en el índice. Mantén todos los textos en ES/EN.

- Usa `score`, `timeline` y `stat-highlight` para crónicas; son bloques reutilizables.
- Registra las fuentes en `src/data/sources/` y cita cada hecho con `[[src:source-id]]`.
- Una imagen debe tener `alt`, `photographer`, `source` y `license`. No uses fotos sin crédito ni licencia comprobables.
- Cuando falte información, usa `placeholder`: nunca completes una laguna con una suposición.
- Antes de publicar ejecuta `npm run content:check`, `npm run typecheck` y `npm run lint`.

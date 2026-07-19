# Consultas a Gemini — historial numerado

Esta carpeta guarda, en orden, cada consulta real que le hacemos a Gemini (vía API, `GEMINI_API_KEY`) para tomar decisiones de producto/marketing/SEO de Dataria. Es la base de referencia compartida entre Imanol y Felipe.

Cada consulta tiene dos archivos con el mismo número:
- `NNN-titulo-descriptivo.md` — el prompt completo que se envió y la respuesta completa de Gemini, en texto legible.
- `NNN-titulo-descriptivo.raw.json` — la respuesta cruda de la API tal cual la devolvió Google, sin editar. Sirve como prueba verificable: incluye `modelVersion`, `responseId` y `usageMetadata` (conteo de tokens), datos que solo el servidor de Google genera y que confirman que la respuesta es real y no fue inventada. Se puede reproducir corriendo el mismo prompt con la propia `GEMINI_API_KEY` contra `https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent`.

## Cómo se hacen las consultas

Script: `_call_gemini_script.js` — `node _call_gemini_script.js <prompt.txt> <salida.json> [modelo] [full]`. Requiere `GEMINI_API_KEY` como variable de entorno. Adjunta automáticamente `_contexto-resumido.md` (versión corta y barata en tokens) como memoria del proyecto en cada consulta; si la pregunta necesita el detalle completo del documento de marca, pasar `full` como último argumento para usar `product-marketing.md` entero en su lugar. Habilita búsqueda web en vivo (`google_search`) y lectura de URLs puntuales (`url_context`) para que las respuestas no dependan solo de lo que se pega a mano.

## Índice

| # | Fecha | Tema | Archivo |
|---|-------|------|---------|
| 000 | 2026-07-17 | Audit GEO inicial (7 preguntas simulando consultas de clientes). Se había hecho antes de crear esta carpeta y el archivo original se perdió — **recuperado el 2026-07-19** desde el transcript de la sesión original. Resumen también en `.agents/product-marketing.md`, sección "Competitive Landscape". | `000-audit-geo-inicial-7-preguntas.md` |
| 001 | 2026-07-18 | ¿Conviene separar las 4 verticales en páginas propias? Recomendación, orden de prioridad, estructura de cada página, riesgos. | `001-separar-verticales-paginas-propias.md` |
| 002 | 2026-07-18 | Contenido específico por rubro: slug de URL para e-commerce, alcance geográfico, términos de búsqueda reales, herramientas locales a mencionar, FAQ por rubro, segmentación dentro de cada rubro. | `002-contenido-especifico-por-rubro.md` |
| 003 | 2026-07-19 | Auditoría de estado tras separar verticales + activar demos de IA: por dónde arrancar el plan de contenido, si vale la pena el esfuerzo de directorios para una pyme argentina, cómo aprovechar testimonios reales, y checklist + keywords/negative keywords antes de lanzar Google Ads. Nota: la lectura en vivo de las URLs falló (`URL_RETRIEVAL_STATUS_ERROR`), la respuesta se apoya en el contexto de marca completo + búsqueda web. | `003-auditoria-contenido-directorios-testimonios-ads.md` |

*(Actualizar esta tabla cada vez que se agregue una consulta nueva.)*

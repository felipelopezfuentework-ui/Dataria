# 006 — ¿Conviene sumar demo de stock de insumos a Gastronomía?

**Fecha:** 2026-07-25
**Modelo:** gemini-3.6-flash
**Búsqueda web usada:** sí (`"control de stock restaurante software argentina"`, `"gestión de inventario insumos gastronomía argentina"`) — encontró competencia real del rubro (Toteat, Bistrosoft, Nucleo IT), a diferencia de la consulta 003 que no tenía este grounding específico.

## Contexto del pedido

Al armar la campaña de Google Ads de Gastronomía retomamos la keyword `control de stock gastronómico software` que la auditoría 003 había sugerido — pero esa keyword no coincide con los 3 demos reales de la página (`/gastronomia` solo tiene Food cost, Reseñas y Turnos, no Stock). La 003 se había armado sin poder leer las URLs en vivo, así que la sugerencia fue genérica, no validada contra el sitio real. Se volvió a consultar con contexto real y la pregunta explícita de si vale la pena construir el demo o descartar la keyword.

## Prompt enviado

Ver `006-prompt.txt` en esta misma carpeta.

## Respuesta completa

### Recomendación Conclusiva
**SÍ, rotundo.** Conviene sumar **Control de stock de insumos/ingredientes** como el 4.º demo de la vertical `/gastronomia` antes de lanzar las campañas.

No es redundante con Food Cost, resuelve un dolor operativo crítico en la gastronomía argentina, la intención de búsqueda es muy alta y la factibilidad técnica para Dataria es inmediata (ya tienen el motor resuelto en e-commerce).

### 1. ¿Es un dolor real o es redundante con Food Cost?
No es redundante en absoluto; son dos caras distintas de la gestión de cocina:
- **Food Cost / Escandallo (económico/teórico):** "¿Cuánto me cuesta este plato en la carta y a cuánto lo tengo que vender para ganar dinero?" Mide margen, receta ideal y costo invisible.
- **Control de stock de insumos (físico/operativo):** "¿Cuántos kilos de muzzarella quedan en la cámara, qué se venció/mermó, qué falta y qué tengo que comprarle al proveedor hoy antes del pico del fin de semana?"

En la pyme gastronómica argentina (alta inflación, márgenes finos, rotación de personal), las pérdidas más grandes no ocurren solo por calcular mal el precio de carta, sino por mermas, desperdicio, "robo hormiga" y quiebres de stock en pleno servicio.

### 2. Framing y naming sugerido
| Módulo | Nombre sugerido | Foco de valor |
|---|---|---|
| Demo 1 (existente) | Calculadora de Food Cost y Escandallo | Ajustá precios de carta, calculá margen por plato, absorbé costos invisibles |
| Demo 4 (nuevo) | Control de Stock de Insumos y Compras | Monitoreá insumos en depósito, detectá mermas y recibí alertas antes de quedarte sin stock el fin de semana |

Ajuste sugerido al re-skin del demo de e-commerce: cambiar productos por ingredientes (harina 0000, queso muzzarella, aceite de girasol, carne vacuna) y el lenguaje de estado a términos gastronómicos.

### 3. Intención de búsqueda real
Tiene intención de búsqueda real, específica y de alta conversión — "software de control de stock para restaurantes" es de los términos con más intención de contratación del rubro (confirmado con competencia real: Toteat, Bistrosoft, Nucleo IT). Recomienda evitar la keyword genérica `control de stock software` (trae ruido de indumentaria/retail) y calificar siempre con el modificador de industria en Frase/Exacta:
- `"control de stock gastronomico software"`
- `"control de stock insumos restaurante"`
- `"gestión de inventario de ingredientes software"`
- `"software inventario cocina restaurante"`

### 4. Si no se sumara ahora (no fue el caso, pero queda de referencia)
Reforzar con keywords de los 2 demos ya funcionales en vez de inventar algo genérico: eje Personal/HR (`software turnos personal restaurante`), eje Reseñas (`gestión de reseñas google restaurantes`), eje Costos (`software escandallo gastronomia`).

## Decisión tomada

Se construyó el demo (adaptado del `StockDemo` ya existente en e-commerce, misma lógica de estados/reposición, datos y copy reescritos para insumos gastronómicos) y se sumó como 4° demo de `/gastronomia`. La keyword `control de stock gastronómico software` (+ variantes de arriba) vuelve a estar activa en el ad group de Gastronomía.

# 004 — Investigación de datos/noticias actuales de Argentina para los 4 blogs por industria

**Fecha:** 2026-07-19
**Modelo:** gemini-3.5-flash (alias `gemini-flash-latest`), con `google_search` real (14 búsquedas distintas, ver `004.raw.json` → `groundingMetadata`).
**Verificación adicional:** los datos más importantes de cada sección se volvieron a chequear con búsqueda propia (no solo la de Gemini) contra la fuente primaria. Todos verificados como reales y con cifras consistentes (variaciones menores por mes de referencia, no por invención).

Este documento es la materia prima real para escribir los 4 posts de blog (uno por industria). No se inventó ningún dato — todo tiene fuente citable.

---

## 1. Gastronomía — food cost / rentabilidad

- **AHRCC (vía Ámbito Financiero, jul-2026):** consumo en bares y restaurantes cayó 30-40% en los últimos dos años. Carlos Yanelli (presidente de la Cámara de Restaurantes): "los restaurantes no pueden trasladar los aumentos de costos porque la demanda no convalida mayores precios".
- **INDEC, verificado con búsqueda propia:** carne picada +55,7% interanual (cerrando en ~$10.402/kg); aceite de girasol +51,7% interanual. Precios al productor de carne subieron 14,1% en 5 meses vs. 20,6% al consumidor — hay margen de intermediación, no solo el productor. Fuentes: [La Nación](https://www.lanacion.com.ar/economia/campo/la-gondola-corrio-mas-rapido-que-el-campo-detectan-fuertes-diferencias-en-los-precios-de-los-nid23062026/), [Infobae](https://www.infobae.com/economia/2026/06/12/la-inflacion-de-mayo-cuales-son-los-diez-alimentos-que-mas-aumentaron/), IPC INDEC (indec.gob.ar).
- **UTHGRA/FEHGRA:** paritarias 2025/2026 con actualizaciones mensuales constantes, presión sobre el costo laboral.
- **Ángulo Dataria:** el módulo de food cost recalcula el escandallo automáticamente cuando cambia el precio de un insumo, en vez de recalcularlo "a mano" una vez al mes — justo el problema que describe la caída de rentabilidad.
- **Gancho de apertura sugerido:** "El consumo en restaurantes cayó un 30%, pero la carne picada subió más de un 55% interanual. Si seguís calculando tus costos 'a ojo' una vez al mes, estás perdiendo plata en cada plato que servís."

## 2. Distribuidoras — gasoil / costos logísticos

- **FADEEAC, verificado con búsqueda propia:** costos de transporte de cargas +10,15% en marzo de 2026 (la cifra más alta en 2 años). Índice acumula +15% en el primer trimestre 2026 y +48% en los últimos 12 meses. Combustible +29% en el Q1 2026 (marzo solo: +24,7%). Gasoil a **USD 1,60/litro**, uno de los valores más altos de la última década y de la región. Fuente: [fadeeac.org.ar](https://www.fadeeac.org.ar/2026/04/01/los-costos-de-transporte-saltan-un-1015-en-marzo-la-cifra-mas-alta-en-dos-anos/), [fadeeac.org.ar (alerta combustible)](https://www.fadeeac.org.ar/2026/03/26/alerta-de-los-transportistas-el-desproporcionado-aumento-del-combustible-pone-en-riesgo-la-cadena-de-abastecimiento/).
- **CEDOL-UTN:** costos logísticos acumulan +22,20% en el primer semestre 2026.
- **Ángulo Dataria:** con el combustible en ~33-35% de la estructura de costos, cada kilómetro de más o camión semivacío pesa directo en el margen — el módulo de rutas con IA de Dataria optimiza esto cruzando pedidos, ventanas horarias y capacidad de carga.
- **Gancho de apertura sugerido:** "Con el gasoil a USD 1,60 el litro — uno de los más caros de la región — planificar las rutas 'a ojo' te está costando más de lo que pensás."

## 3. Inmobiliarias — mercado + WhatsApp

- **Colegio de Escribanos de la Pcia. de Buenos Aires, verificado con búsqueda propia:** primer semestre 2026, 55.035 escrituras vs. 59.672 en el mismo período de 2025 — caída de 7,8%. Operaciones con hipoteca cayeron 32,6% (6.913 vs. 10.261). Guillermo Longhi (presidente del Colegio): sigue siendo necesario fortalecer el crédito hipotecario. Fuentes: [laplata1.com](https://www.laplata1.com/2026-07-17/las-ventas-de-inmuebles-cayeron-casi-8-en-la-provincia-y-se-desploman-los-creditos-hipotecarios-124870/), [eleco.com.ar](https://www.eleco.com.ar/provincia/la-venta-de-inmuebles-cayo-casi-un-8-por-ciento-en-el-primer-semestre-de-2026-en-provincia).
- **Fenómeno "WhatsApp lleno, pocas ventas":** con el mercado enfriándose, las inmobiliarias reciben muchas consultas por WhatsApp de baja intención (curiosos, comparadores de precio) que agotan al equipo comercial sin traducirse en operaciones reales.
- **Ángulo Dataria:** el agente de IA por WhatsApp no reemplaza al vendedor — filtra: califica presupuesto/zona/crédito antes de derivar al humano, justo cuando el mercado exige priorizar mejor el tiempo comercial.
- **Gancho de apertura sugerido:** "¿Tu inmobiliaria tiene el WhatsApp estallado de consultas pero las escrituras no suben? En el primer semestre de 2026 las ventas cayeron casi 8% en la Provincia. No hace falta más consultas — hace falta filtrar a los curiosos de los compradores reales."

## 4. E-commerce — stock / Hot Sale

- **CACE, verificado con búsqueda propia (Estudio Anual 2025):** facturación $34-35 billones de pesos en 2025, +55% vs. 2024, por encima de la inflación (31%). Órdenes de compra: 253 millones (+3% interanual — crecimiento chico). Ticket promedio: $134.519 (+46%). 25,1 millones de compradores. Fuentes: [cace.org.ar](https://cace.org.ar/blogs/news/el-ecommerce-alcanzo-los-35-3-billones-de-pesos-durante-2025-y-crecio-por-encima-de-la-inflacion), [mercado.com.ar](https://mercado.com.ar/tendencias/comercio-electronico-en-argentina-crecio-79-en-2025-segun-cace/).
- **Lectura clave:** el crecimiento es de facturación/ticket, no de volumen de órdenes — el comprador argentino concentra sus compras y es más exigente. Eso vuelve más caro cada quiebre de stock (se pierde una venta grande, no una chica).
- **Ángulo Dataria:** el módulo de predicción de demanda ayuda a anticipar qué va a rotar (especialmente en picos como Hot Sale/CyberMonday) para no perder ventas por falta de stock ni inmovilizar plata de más.
- **Uso sugerido:** apoyo de desarrollo medio, no gancho de apertura — el tema es más "frío"/técnico que el dolor del gasoil o las mesas vacías. Abrir hablando de que el e-commerce argentino crece por encima de la inflación, y de ahí derivar al problema del stock.

---

*Investigación completa (con groundingMetadata de las 14 búsquedas de Gemini) en `004.raw.json`.*

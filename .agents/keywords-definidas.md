# Keywords de Dataria — documento base

**Última actualización:** 2026-08-15
**Estado:** listo para cargar. La campaña todavía no gastó un peso.

Este es el documento de referencia del proyecto de Ads: qué se midió, qué salió, con qué arrancamos y por qué. Se actualiza a medida que la campaña real devuelva datos.

---

## Resumen en 6 líneas

- Se midieron **~3.500 keywords** en dos rondas (1.400 en agosto por semillas propias + 2.172 en el barrido de competidores).
- **Distribuidoras es 5 a 10 veces más grande que gastronomía.** El plan original tenía la prioridad al revés.
- El mercado total alcanzable es chico: **~6.000 a 8.000 búsquedas/mes** entre los dos rubros.
- Alrededor hay clusters enormes de tráfico que **no es nuestro cliente** — el más grande, 30.650 búsquedas/mes.
- Arrancamos con **1 campaña, 6 grupos, 34 keywords**, $7.000 ARS/día y tope de CPC de $1.800.
- Con nuestra economía (setup USD 200-500 + USD 50-150/mes indefinido), **1 o 2 clientes al año pagan toda la pauta anual**.

---

## Cómo se midió

Todo con el **Planificador de palabras clave** de la propia cuenta (`534-804-3664`), Argentina, español, período 1/ago/2025 – 31/jul/2026. Es gratis y es la fuente primaria: el dato sale de Google, no de una estimación de terceros.

**Ronda 1 — 9/ago: semillas propias.** 8 ángulos, 1.400 keywords. Nos dijo el tamaño del mercado y dio vuelta la prioridad entre rubros.

**Ronda 2 — 15/ago: barrido de competidores.** En vez de inventar semillas, se le dio al Planificador la URL de cada competidor para que devuelva los términos por los que Google los clasifica. Sitios medidos: Maxirest, Bistrosoft, SimpliRoute, QuadMinds y dos páginas de categoría de ComparaSoftware. **2.172 keywords únicas.**

> **Por qué la ronda 2 importa:** en la ronda 1 todas las semillas las inventamos nosotros, así que solo podíamos encontrar variaciones de lo que ya se nos había ocurrido. La ronda 2 devuelve el vocabulario real del mercado. Ahí apareció el hallazgo más grande.

**Detalle completo:** [`keywords-investigacion.md`](keywords-investigacion.md) (ronda 1) y [`keywords-plan-barrido.md`](keywords-plan-barrido.md) (método de la ronda 2).

---

## Los tres hallazgos que definieron la campaña

### 1. Distribuidoras es el rubro grande, no gastronomía

| Cluster | Búsquedas/mes | Encaje |
|---|---|---|
| Software logística / TMS | 4.350 | ✅ Directo |
| Rutas y reparto | 800 | ✅ Directo |
| Distribuidora / mayorista | 600 | ✅ Directo |
| **Gastronomía entera** | **~2.000** | ✅ Directo |

En gastronomía se analizaron 1.098 keywords y **solo 2 superan las 50 búsquedas/mes**. El plan de julio le daba más presupuesto a gastronomía; los datos dijeron lo contrario.

### 2. El ancla de gastronomía son dos keywords, no una

`software gastronómico` (500/mes) apareció en la ronda 1 y no estaba en ninguna lista previa. **`sistema gastronómico` (500/mes) apareció en la ronda 2** — en Maxirest *y* en Bistrosoft por separado, o sea dos fuentes independientes.

Juntas son **1.000 búsquedas/mes**: la mitad del rubro. Ninguna de las dos se nos habría ocurrido sola.

### 3. Al lado de nuestro mercado hay uno diez veces más grande que no es nuestro

| Cluster de ruido | Búsquedas/mes | Qué busca en realidad | Puja |
|---|---|---|---|
| **Armar rutas en Google Maps** | **30.650** | Una herramienta gratis de consumidor | $17–$79 |
| Punto de venta / comandas / QR | 14.000 | Cobrar y tomar pedidos en la mesa | — |
| Última milla | 3.100 | Contratar una empresa que reparta | — |
| GPS / flotas | 1.350 | Hardware de telemetría | $2.458–$9.041 |

**La puja delata la intención.** Los términos de Google Maps cotizan $17 a $79 porque nadie compite por esa gente: no compra nada. Con nuestro tope de $1.800 les ganaríamos la subasta a todos — y ahí está el peligro, porque son clics baratísimos que el algoritmo va a perseguir y que no convierten nunca.

**Todo esto está en la lista de negativos.** Es la parte de la configuración que más plata salva.

---

## Con qué arrancamos

**1 campaña · 6 grupos · 34 keywords · $7.000 ARS/día · tope CPC $1.800.**

Una sola campaña porque fragmentar el presupuesto deja cada mitad por debajo del umbral de aprendizaje del algoritmo.

### Distribuidoras — el rubro principal

**G1 · Software logística / TMS** → `/distribuidoras` · *cluster ancla, 4.350 búsq./mes*

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra con $1.800? |
|---|---|---|---|---|
| `software logistica` | Exacta | 50 | $2.124 | ⚠️ abajo de página |
| `software de logistica` | Exacta | 50 | $1.349 | ✅ |
| `software de gestion logistica` | Frase | 50 | $763 | ✅ |
| `software para transporte y logistica` | Frase | 50 | $1.040 | ✅ |
| `sistema erp logistica` | Frase | 50 | $529 | ✅ |
| `software gestion de transporte` | Frase | 50 | — | ✅ |

**G2 · Rutas de reparto** → `/distribuidoras` · *800 búsq./mes. Es el módulo con testimonio real (Pollo Cocido).*

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra? |
|---|---|---|---|---|
| `optimizador de rutas` | Exacta | 50 | $1.376 – $1.964 * | ✅ |
| `optimizar rutas de reparto` | Exacta | 50 | $1.594 | ✅ |
| `rutas de reparto` | Exacta | 50 | — | ✅ |
| `planificacion de rutas de reparto` | Frase | 50 | — | ✅ |
| `planificador de rutas logistica` | Frase | 50 | — | ✅ |
| `software de reparto` | Frase | 50 | — | ✅ |
| `organizacion de rutas` 🆕 | Frase | 50 | **$529** | ✅ |
| `app para organizar repartos` 🆕 | Frase | 50 | **$568** | ✅ |

\* *Medida dos veces con una semana de diferencia y dio distinto. Ver la advertencia sobre pujas más abajo.*

**G3 · Software para distribuidoras** → `/distribuidoras` · *600 búsq./mes. Las pujas más caras de la cuenta.*

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra? |
|---|---|---|---|---|
| `software para distribuidoras` | Exacta | 50 | $2.776 | ⚠️ abajo de página |
| `sistema para distribuidoras` | Exacta | 50 | $1.552 | ✅ |
| `erp para distribuidoras` | Frase | 50 | $1.619 | ✅ |
| `sistema de gestion para distribuidoras` | Frase | 50 | $2.651 | ⚠️ abajo de página |
| `software para distribuidora de alimentos` | Frase | 50 | $728 | ✅ |
| `software para distribuidora de bebidas` | Frase | 50 | — | ✅ |

### Gastronomía

**G4 · Software gastronómico** → `/gastronomia` · *1.000 búsq./mes entre las dos exactas. ⚠️ El grupo de mayor riesgo.*

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra? |
|---|---|---|---|---|
| `software gastronomico` | Exacta | **500** | $1.111 | ✅ |
| `sistema gastronomico` 🆕 | Exacta | **500** | $1.642 | ✅ |
| `software de gestion gastronomica` | Frase | 50 | $853 | ✅ |
| `software para gastronomia` | Frase | 50 | $691 | ✅ |
| `erp gastronomico` | Frase | 50 | $1.399 | ✅ |
| `sistema de gestion para restaurantes` | Frase | 50 | $1.691 | ✅ |

> **Por qué es el más riesgoso:** en gastronomía la intención dominante es punto de venta y comandas, que no vendemos. Sin negativos fuertes de grupo, este grupo se come el presupuesto con tráfico que no convierte. **Revisar sus términos de búsqueda a los 3 días, no a los 14.**

**G5 · Food cost / costeo de recetas** → `/gastronomia` · *Volumen bajo, pero la puja más barata de la cuenta y la intención más limpia.*

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra? |
|---|---|---|---|---|
| `food cost` | Exacta | 50 | **$459** | ✅ con margen |
| `costeo de recetas` | Exacta | 50 | — | ✅ |
| `calcular food cost` | Frase | 50 | — | ✅ |
| `software food cost` | Frase | 50 | — | ✅ |
| `ficha tecnica de platos` | Frase | 50 | — | ✅ |
| `control de mermas` | Frase | 50 | — | ✅ |

**G6 · Control de stock gastronómico** → `/gastronomia`

| Keyword | Concordancia | Vol. | Puja baja | ¿Entra? |
|---|---|---|---|---|
| `inventario de cocina` | Exacta | 50 | — | ✅ |
| `control de stock restaurante` | Frase | 50 | — | ✅ |
| `software inventario restaurante` | Frase | 50 | — | ✅ |
| `sistema de inventario para restaurante` | Frase | 50 | — | ✅ |
| `control de stock insumos` | Frase | 50 | — | ✅ |
| `software gestion de inventarios` 🆕 | Frase | 50 | **$450** | ✅ |

🆕 = salió del barrido de competidores del 15/ago.

---

## Lo que se descartó, y por qué

Esta lista vale tanto como la anterior. Cada línea es plata que no se gasta.

| Descartado | Vol./mes | Por qué |
|---|---|---|
| Todo el cluster **Google Maps** | 30.650 | Quieren una herramienta gratis, no software. Puja de $17-79 lo confirma. |
| `sistema de comandas para restaurantes` | 500 | Comandas es tomar el pedido en la mesa. No lo hacemos, y la web se posiciona como *compatible* con Fudo y Maxirest, no como reemplazo. |
| `proveedor de ultima milla` | 500 | Busca contratar una empresa que reparta. No hacemos entregas. |
| `monitoreo de flotas` | 500 | Telemetría GPS con hardware instalado. Otro producto. |
| Todo `punto de venta`, `pos`, `tpv`, `menu qr` | 14.000 | Mismo motivo que comandas. Es el grueso del volumen de gastronomía. |
| `escandallo` | 0-50 | Término peninsular. Un gastronómico argentino no lo dice ni lo busca. |
| Marcas de competidores | 9.000 | Con presupuesto chico no alcanza para pelear búsquedas de sus propios clientes. |
| Todo lo que diga `gratis`, `excel`, `pdf`, `curso`, `qué es` | — | Intención de no pagar o de investigar. |

**Competidores detectados** (todos a negativos): Fudo, Maxirest, Bistrosoft, Toteat, El Chef (Insoft), ManagementPro, Gour-net, Pedisy, Presik, bcnsoft · SimpliRoute, QuadMinds, Beetrack, Drivin, Highway, Routal, FieldPro, Articotrans, Quonext, Cloudfleet, Unigis, Mediagenia · Tokko Broker.

---

## Dos advertencias para leer los números

**1. `50` no es cincuenta.** Es el cajón de Google para el rango 10-100. `500` sí está diferenciando. Google redondea siempre — está documentado, y no cambia ni usando la API.

**2. Las pujas se mueven en días.** Al re-medir en la ronda 2 keywords que ya teníamos de la ronda 1:

| Keyword | 9/ago | 15/ago |
|---|---|---|
| `software de ruteo logístico` | $2.303 | **$521** |
| `optimizador de rutas` | $1.376 | **$1.964** |

Una semana. No son errores de medición, la subasta cambia. **Los números de este documento sirven para arrancar; la calibración real se hace con la campaña corriendo y mirando cuota de impresiones.**

---

## Qué falta medir

- **Inmobiliarias y e-commerce:** 2 de nuestras 4 verticales y **no se midió una sola keyword de ninguna**. Puede haber más volumen que en gastronomía, que resultó ser el rubro chico. Semillas listas en [`scripts/semillas/`](scripts/semillas/).
- **Capa "problema" del embudo:** el que tiene el dolor pero todavía no sabe que existe el software (`como armar las rutas de reparto`, `planilla excel costo de platos`). Nunca se midió. Semillas listas.
- **Ángulos por sub-rubro:** catering, dark kitchen, preventa, autoventa, WMS, cobranza en ruta.

Nada de esto bloquea el lanzamiento. El informe de términos de búsqueda de la campaña real va a enseñar más en dos semanas que cuatro corridas más del Planificador.

---

## Cómo se mantiene este documento

Es la fuente de verdad del proyecto de Ads. Se actualiza cuando:

- **A los 3 y a los 14 días de prender:** los términos de búsqueda reales aportan keywords nuevas y negativos nuevos → se cargan acá.
- **Cuando se ajuste el tope de CPC:** anotar el número nuevo y qué lo motivó.
- **Cuando se mida una vertical nueva.**

**Regla de trabajo:** una decisión que no se escribe el mismo día se pierde. La estructura de 6 grupos se decidió el 9/ago, no se escribió, y el 15/ago no existía en ningún lado — hubo que reconstruirla desde los datos crudos.

**Método reutilizable:** el proceso completo (barrido de competidores, clasificación, cruce de puja contra tope, verificación de respuestas de IA) quedó como skill en `investigar-keywords-y-armar-campanas`, para aplicarlo a Pariggi y Pollo Cocido.

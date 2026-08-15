# Plan de barrido de keywords — segunda vuelta

**Fecha:** 2026-08-15
**Estado:** listo para ejecutar. La parte manual no necesita la API y se puede hacer hoy.

La primera investigación (`keywords-investigacion.md`, 9-ago) midió ~1.400 keywords en 8 ángulos y encontró que el mercado es chico. Este plan cubre **lo que esa investigación no tocó**, que es donde queda la ganancia real.

---

## Por qué la lista actual quedó flaca

No fue por falta de búsqueda: se midieron 1.400 términos. Quedó flaca por tres razones concretas, y cada una tiene su remedio acá:

1. **Todas las semillas fueron inventadas por nosotros.** Adivinamos el vocabulario del mercado en vez de medirlo. → Remedio: método de competidores (Bloque A).
2. **Todas las keywords son de capa "solución"** (`software para X`). Nunca se midió al que tiene el problema pero no sabe que existe el software. → Remedio: capa problema (Bloque B).
3. **Dos de las cuatro verticales nunca se midieron:** inmobiliarias y e-commerce. → Remedio: Bloque D.

---

## Bloque A — Método de competidores (el de mayor potencial)

En vez de escribir semillas, se le da al Planificador la URL de un competidor y devuelve **los términos por los que Google lo clasifica**. Es vocabulario real del mercado, no el nuestro.

**Cómo:** Google Ads → Herramientas → Planificación → Planificador de palabras clave → Descubrir nuevas palabras clave → pestaña **"Empezar con un sitio web"** → pegar la URL → elegir **"Usar todo el sitio"**.

Verificar arriba que diga **Argentina** y **Español**. Una URL por corrida. Descargar el CSV de cada una.

### Gastronomía
| Competidor | URL | Qué es |
|---|---|---|
| Maxirest | `maxirest.com` | Argentino, el que Dataria nombra como compatible |
| Bistrosoft | `bistrosoft.com` | Argentino |
| Fudo | `fu.do` | Argentino, el más grande del rubro |
| Toteat | `toteat.com/es-AR` | Chileno con operación argentina |
| Comparasoftware | `comparasoftware.com.ar/software-para-restaurantes` | Directorio comparador: devuelve el vocabulario de **toda la categoría**, no de una marca |

### Distribuidoras
| Competidor | URL | Qué es |
|---|---|---|
| QuadMinds | `quadminds.com` | Argentino, ruteo |
| SimpliRoute | `simpliroute.com` | Chileno, fuerte en Argentina |
| Beetrack | `beetrack.com` | Última milla (hoy parte de DispatchTrack) |
| Drivin | `drivin.io` | Ruteo LatAm |
| Comparasoftware | `comparasoftware.com.ar/planificacion-de-rutas` | Directorio comparador de la categoría |

> **Los dos comparadores son los más valiosos de la lista.** Una marca devuelve términos de su propio producto; un directorio devuelve cómo busca el mercado entero la categoría.

**Al leer los CSV, ojo con lo de siempre:** estos competidores venden punto de venta, comandas y telemetría GPS. Va a aparecer mucho volumen que **no es el producto de Dataria**. Sirve para entender el mercado y para armar negativos, no para copiar la lista.

---

## Bloque B — Capa "problema" del embudo

Hoy todas las keywords de la campaña son de capa solución (`software para distribuidoras`). Falta el que tiene el dolor pero todavía no sabe que esto se resuelve con software — el que hoy busca cómo hacerlo con una planilla.

Es la capa donde Dataria tiene el argumento más fuerte ("dejá el Excel"), y donde la competencia es más barata.

Semillas listas en `.agents/scripts/semillas/`:
- `problema-gastronomia.txt`
- `problema-distribuidoras.txt`

**Advertencia honesta:** esta capa tiene intención de investigación, no de compra. Si mide volumen, la decisión no es automática — puede convenir como contenido de blog en vez de como keyword paga. Eso se decide con los números en la mano, no antes.

---

## Bloque C — Ángulos no cubiertos de los rubros actuales

Sub-rubros y funciones que la primera corrida listó como pendientes y nunca se midieron.

- `angulos-nuevos-gastronomia.txt` — catering, dark kitchen, food truck, heladería, cervecería, delivery propio, personal y turnos, compras y proveedores, ingeniería de menú.
- `angulos-nuevos-distribuidoras.txt` — preventa y autoventa, cobranza en ruta, agua/soda/gas, logística inversa, WMS y depósito, control de choferes, reposición en góndola, trazabilidad.

---

## Bloque D — Las dos verticales nunca medidas

Inmobiliarias y e-commerce son 2 de las 4 verticales de Dataria y **no se midió una sola keyword de ninguna**. Puede haber más volumen ahí que en gastronomía — que resultó ser el rubro chico.

- `inmobiliarias.txt`
- `ecommerce.txt`

**Esto es medición, no compromiso.** Que midan bien no significa que entren a la campaña ahora: la campaña ya está definida en 6 grupos sobre los dos rubros con testimonios reales. Si alguna de estas dos resulta grande, es una decisión aparte y posterior.

---

## Cómo correrlo

### Hoy, a mano (no necesita la API)
Pegar el contenido de cada archivo de semillas en el Planificador, **un archivo por corrida** (mezclar rubros devuelve una sopa donde no se distingue qué es de quién), y descargar el CSV. Después los CSV se leen juntos.

Recordatorio de la corrida anterior: **dejar vacío el campo de sitio web** cuando se usan semillas de texto — filtra por lo que Google cree que ofrecés y tiene la web cacheada vieja.

### Cuando llegue Basic Access
```bash
python .agents/scripts/keyword_ideas.py --keywords .agents/scripts/semillas/problema-gastronomia.txt --out gastro-problema.csv
python .agents/scripts/keyword_ideas.py --site https://quadminds.com --out comp-quadminds.csv
```
El script hace lo mismo pero sin trabajo manual y con cientos de semillas por corrida. Ver su encabezado para las variables de entorno.

---

## Cómo leer los resultados

**`50` no es cincuenta.** Es el cajón de Google para el rango 10-100. `500` sí está diferenciando.

**Google redondea siempre.** No esperar números finos, ni por interfaz ni por API — está documentado. Lo que la API aporta es escala, no precisión.

**Volumen no es intención.** Es el error que ya evitamos una vez: `proveedor de ultima milla` tiene 500 búsquedas/mes y busca contratar una empresa que reparta, no software. Antes de cargar cualquier keyword nueva, preguntarse qué quiere de verdad quien la escribe.

**Criterio de corte para que una keyword entre a la campaña:**
1. ¿Dataria hace exactamente eso? Si es "parecido", va a negativos, no a la campaña.
2. ¿La puja baja de parte superior de página entra en el tope de CPC de $1.800? Si no, entra sabiendo que va a aparecer abajo.
3. ¿A qué grupo de los 6 pertenece? Si no pertenece a ninguno, o es un grupo nuevo o no va.

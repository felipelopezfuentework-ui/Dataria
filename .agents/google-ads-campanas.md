# Campaña de Google Ads — Dataria

**Estado (2026-08-15):** especificación lista para cargar. Reemplaza por completo la versión del 25-jul, que quedó obsoleta tras la investigación de keywords con datos reales del Planificador (ver `.agents/keywords-investigacion.md`) y las consultas 009-011 a Gemini.

**Nada de esto se cargó todavía en la plataforma. Cero pesos gastados.**

---

## Qué cambió respecto de la spec de julio

| Tema | Julio (obsoleto) | Ahora | Por qué |
|---|---|---|---|
| Campañas | 2 separadas (Gastronomía + Distribuidoras) | **1 sola, 6 grupos** | Fragmentar el presupuesto deja a cada campaña bajo el umbral de aprendizaje (consulta 009) |
| Rubro principal | Gastronomía (USD 8 vs 7) | **Distribuidoras** | Distribuidoras es 5-10x más grande en volumen real de búsqueda |
| Presupuesto | $18.400 ARS/día | **$7.000 ARS/día** | El mercado no absorbe $18.400; con Maximizar clics eso empujaba las pujas al tope |
| Puja | Maximizar conversiones | **Maximizar clics con tope de CPC** | Sin historial de conversiones, Maximizar conversiones infla el CPC (consulta 011) |
| Tope de CPC | — | **$1.800 ARS** | $900 (sugerencia de Gemini) queda debajo del piso de puja de casi todas las keywords |
| Keyword ancla gastro | `food cost` | **`software gastronómico`** (500/mes) | No estaba en ninguna lista previa; es el 25% del volumen del rubro |
| `escandallo` | En keywords y en 2 títulos | **Eliminado de todo** | Término peninsular, un argentino no lo busca ni lo dice |
| `argentina` dentro de keywords | Presente | **Eliminado** | En frase/exacta mata el volumen: nadie lo tipea |

### Lo que ya está cerrado y no hay que tocar
- GA4 vinculado a Google Ads, `generate_lead` importado y como **única** conversión principal.
- Filtro de tráfico interno activado en GA4 (estaba en "Probando", no filtraba nada).
- `/privacidad` y `/terminos` publicadas — las políticas de Google Ads las exigen.
- Copy de `/gastronomia` y `/distribuidoras` alineado a los demos reales.
- Formulario con nombre, email y teléfono obligatorios.

---

## El punto que define la campaña: el CPC, no el presupuesto

El mercado alcanzable es chico (~6-8k búsquedas/mes entre los dos rubros). Con un tope de CPC bajo no vas a gastar el presupuesto aunque lo cargues alto.

**El presupuesto diario es un techo de seguridad. La palanca real es el tope de CPC.**

Pujas de "parte superior de la página" según el Planificador, rango bajo:

| Keyword | Puja baja | ¿Entra con tope $1.800? |
|---|---|---|
| `software para distribuidoras` | $2.776 | No — aparece abajo de la página |
| `software logistica` | $2.124 | No — aparece abajo de la página |
| `optimizar rutas de reparto` | $1.594 | Sí |
| `optimizador de rutas` | $1.376 | Sí |
| `software gastronómico` | $1.111 | Sí |
| `food cost` | $459 | Sí, con margen |

Con $1.800 se compite arriba en rutas, food cost y software gastronómico, y abajo de la página en los términos de logística/distribuidoras. **Es a propósito: se arranca conservador y se sube según la cuota de impresiones real a los 14 días.**

> **Ojo con estas pujas: se mueven.** El barrido del 15-ago volvió a medir keywords que ya teníamos y dieron distinto. `software de ruteo logístico` pasó de **$2.303 a $521**; `optimizador de rutas` de **$1.376 a $1.964**. En una semana. No son errores: la subasta cambia. **Conclusión práctica: el tope de CPC se calibra con los datos reales de la campaña corriendo, no con el Planificador.** Los números de acá sirven para arrancar, no para decidir de una vez.

### Números esperados
- $7.000 ARS/día neto = **$210.000 ARS/mes**.
- Con impuestos (~24%: IVA 21% + IIBB, cuenta en pesos con facturación local) ≈ **$260.400 ARS/mes ≈ USD 190/mes**.
- Los impuestos **no** están incluidos en el presupuesto que se carga en la plataforma — se suman en la factura.
- CPC real esperado ~$1.500 → **~140 clics/mes** → **3 a 7 formularios/mes** (conversión de landing 2-5%).

Contra la economía de Dataria (setup USD 200-500 + USD 50-150/mes indefinido), **1 o 2 clientes al año pagan toda la pauta anual.** El riesgo no está en el costo de adquisición sino en la baja temprana de cliente.

---

## Configuración de la campaña

- **Nombre:** `Search - Dataria - Alta Intención`
- **Tipo:** Búsqueda (Search) · Objetivo: Clientes potenciales (Leads)
- **Redes:** Red de Búsqueda de Google solamente. **Desmarcar** "Incluir socios de búsqueda" y "Incluir la Red de Display" — la Display devora presupuesto en clics accidentales de apps.
- **Ubicación:** Argentina. En Opciones de ubicación elegir **"Presencia"**, no "Presencia o interés" (viene marcada la segunda por defecto).
- **Idioma:** Español.
- **Presupuesto diario:** $7.000 ARS.
- **Estrategia de puja:** Maximizar clics **con límite de CPC máximo en $1.800 ARS**.
- **Conversión principal:** `generate_lead` únicamente. `click_agendar_reunion` y `click_whatsapp` van como secundarios/observación, nunca como principal.
- **Concordancias:** Frase + Exacta. Nada de amplia hasta tener 30+ conversiones/mes y negativos maduros.
- **URL final:** se define a nivel **anuncio**, distinta por grupo. Tener URLs distintas dentro de una misma campaña es correcto y mejora el Quality Score.
- **Destino del clic:** al **principio** de la landing (`/distribuidoras`, `/gastronomia`), NO al ancla `#contacto`. El diferencial de Dataria son las demos que se prueban sin registro; la demo genera el interés que después empuja al formulario.

> ⚠️ **Verificar la moneda antes de cargar el CPC.** En Facturación → Configuración. Si la cuenta estuviera en USD, cargar `1800` significaría USD 1.800 por clic. En cuenta USD el equivalente sería `1.30`.

---

## Los 6 grupos de anuncios

Distribuidoras va primero por volumen real de mercado.

### G1 — Software logística / TMS  → `https://www.dataria.work/distribuidoras`
*Cluster ancla de distribuidoras: 4.350 búsquedas/mes, 69 keywords.*

**Exacta:** `[software logistica]` · `[software de logistica]`
**Frase:** `"software de gestion logistica"` · `"software para transporte y logistica"` · `"sistema erp logistica"` · `"software gestion de transporte"`

Paths: `distribuidoras` / `logistica`
Negativos de grupo: `gps`, `rastreo`, `satelital`, `curso`, `carrera`, `tesis`, `ultima milla`

**RSA — Títulos**
Software de Logística Pyme · Gestión Logística con IA · Ordená tu Operación Diaria · Menos Excel, Más Control · Probá la Demo Gratis · Sin Equipo Técnico · IA a Medida para tu Pyme · Setup en 2-4 Semanas · Nosotros Integramos Todo · Empezá con Un Módulo · Software Hecho a tu Medida · Sin Instalar Nada Técnico · Rutas, Stock y Demanda · Agendá tu Consulta Gratis · Usado por Pollo Cocido

**RSA — Descripciones**
- Software de logística a medida para tu distribuidora. Probá la demo gratis.
- Rutas, stock y demanda en un solo lugar. Nosotros integramos todo por vos.
- No necesitás equipo técnico propio. Setup en 2 a 4 semanas y capacitación incluida.
- Empezá con un módulo y sumá otros sin rehacer nada. Ya lo usa Pollo Cocido.

---

### G2 — Rutas de reparto  → `https://www.dataria.work/distribuidoras`
*800 búsquedas/mes, 16 keywords. Es el módulo con testimonio real.*

**Exacta:** `[optimizador de rutas]` · `[optimizar rutas de reparto]` · `[rutas de reparto]`
**Frase:** `"planificacion de rutas de reparto"` · `"planificador de rutas logistica"` · `"software de reparto"` · `"organizacion de rutas"` · `"app para organizar repartos"`

*(Las dos últimas salieron del barrido de SimpliRoute el 15-ago: vocabulario real del mercado, y baratas — puja baja $529 y $568 contra $1.964 de `optimizador de rutas`.)*

Paths: `distribuidoras` / `rutas`
Negativos de grupo: `chofer`, `empleo`, `curso`, `moto`, `gps`, `waze`, `google maps`, `turistica`

**RSA — Títulos**
Optimizá tus Rutas de Reparto · Software de Ruteo Argentina · Menos Km, Más Entregas · Organizá Entregas sin Excel · Probá la Demo Gratis · Sin Equipo Técnico · Rutas para Pyme de Reparto · Menos Horas Armando Rutas · Usado por Pollo Cocido · Reducí Costos de Nafta · IA que Arma tus Rutas · Ventana Horaria sin Drama · Nosotros Integramos Todo · Sin Instalar Nada Técnico · Agendá tu Consulta Gratis

**RSA — Descripciones**
- Optimizá rutas y reducí kilómetros con IA. Probá la demo gratis, sin registrarte.
- Sabé cuándo llega cada pedido, sin llamados ni WhatsApp perdidos.
- Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy.
- Ya lo usa Pollo Cocido para su logística diaria. Agendá tu consulta gratis.

---

### G3 — Software para distribuidoras  → `https://www.dataria.work/distribuidoras`
*600 búsquedas/mes, 12 keywords. Alta competencia y las pujas más caras de la cuenta.*

**Exacta:** `[software para distribuidoras]` · `[sistema para distribuidoras]`
**Frase:** `"erp para distribuidoras"` · `"sistema de gestion para distribuidoras"` · `"software para distribuidora de alimentos"` · `"software para distribuidora de bebidas"`

Paths: `distribuidoras` / `gestion`
Negativos de grupo: `franquicia`, `ser distribuidor`, `quiero distribuir`, `mayorista de`, `catalogo`, `lista de precios`

**RSA — Títulos**
Software para Distribuidoras · Gestión Integral con IA · Sin Equipo Técnico Propio · Rutas, Stock y Demanda · Probá la Demo Gratis · Hecho para Pymes Argentinas · Menos Planillas, Más Datos · Setup en 2-4 Semanas · Nosotros Integramos Todo · Empezá con Un Módulo · Usado por Pollo Cocido · A Medida, No Enlatado · Sin Instalar Nada Técnico · Probalo Antes de Contratar · Agendá tu Consulta Gratis

**RSA — Descripciones**
- Sistema a medida para tu distribuidora: rutas, stock y proyección de demanda.
- A diferencia de un ERP enlatado, cada módulo se arma sobre cómo trabajás hoy.
- Sin equipo técnico propio. Nosotros configuramos, integramos y capacitamos.
- Empezá con un módulo y crecé sin rehacer nada. Probá la demo gratis, sin registro.

---

### G4 — Software gastronómico  → `https://www.dataria.work/gastronomia`
*500 búsquedas/mes en una sola keyword: el 25% del volumen del rubro.*

**Exacta:** `[software gastronomico]` · `[sistema gastronomico]`
**Frase:** `"software de gestion gastronomica"` · `"software para gastronomia"` · `"erp gastronomico"` · `"sistema de gestion para restaurantes"`

> **`[sistema gastronomico]` es el hallazgo del barrido de competidores (15-ago): otras 500 búsquedas/mes** que no estaban en ninguna lista previa. Apareció en Maxirest **y** en Bistrosoft por separado — dos fuentes independientes. Con esto el ancla de gastronomía pasa de 500 a **1.000 búsquedas/mes**, y el rubro deja de depender de una sola keyword. Puja $1.642–$9.406.

Paths: `gastronomia` / `gestion`

> ⚠️ **El grupo de mayor riesgo de la campaña.** En gastronomía la intención dominante es punto de venta y comandas, que Dataria no vende. Los negativos de grupo no son opcionales acá — sin ellos este grupo se come el presupuesto con tráfico que nunca va a convertir. **Revisar el informe de términos de búsqueda de este grupo a los 3 días, no a los 14.**

Negativos de grupo: `pos`, `punto de venta`, `comandas`, `comandera`, `caja registradora`, `tpv`, `facturacion`, `factura electronica`, `menu qr`, `carta digital`, `mozo`, `delivery`, `pedidos ya`, `rappi`, `balanza`, `impresora`

**RSA — Títulos**
Software Gastronómico a Medida · Gestión de tu Restaurante · Food Cost y Stock con IA · No es un Punto de Venta · Convive con Fudo y Maxirest · Probá la Demo Gratis · Sin Equipo Técnico · Márgenes Reales de Tu Menú · Setup en 2-4 Semanas · Nosotros Integramos Todo · Empezá con Un Módulo · Usado por Pastas Pariggi · Sin Instalar Nada Técnico · Chau Planillas de Costos · Agendá tu Consulta Gratis

**RSA — Descripciones**
- Software gastronómico a medida: food cost y control de stock de insumos con IA.
- No reemplaza tu punto de venta: se integra con Fudo y Maxirest y suma lo que falta.
- Sin equipo técnico ni instalaciones raras. Nosotros configuramos todo por vos.
- Probalo antes de contratar. Ya lo usan Pastas Pariggi y MP Catering.

---

### G5 — Food cost / costeo de recetas  → `https://www.dataria.work/gastronomia`
*Volumen bajo pero la puja más barata de la cuenta ($459-$2.007) y la intención más limpia.*

**Exacta:** `[food cost]` · `[costeo de recetas]`
**Frase:** `"calcular food cost"` · `"software food cost"` · `"costo de platos restaurante"` · `"ficha tecnica de platos"`

Paths: `gastronomia` / `foodcost`
Negativos de grupo: `que es`, `definicion`, `formula`, `plantilla`, `excel`, `curso`, `pdf`, `receta` (sola)

**RSA — Títulos**
Calculá tu Food Cost Real · Márgenes Reales de Tu Menú · Software Food Cost Arg · Probá la Demo Gratis · Sin Equipo Técnico · IA a Medida p/ Restaurantes · Detectá el Costo Invisible · Nosotros Integramos Todo · Empezá con Un Módulo · Usado por Pastas Pariggi · Ideal: Food Cost 28-35% · Dejá de Calcular a Ojo · Chau Planillas de Costos · Costeo de Recetas en Vivo · Consultá Gratis 15 Min

**RSA — Descripciones**
- Calculá el food cost real de cada plato con IA. Probá la demo gratis, sin registrarte.
- Detectá el costo invisible que se te escapa en cada receta. Sin equipo técnico propio.
- Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy.
- Empezá con un módulo y crecé sin rehacer nada. Usado por Pastas Pariggi.

---

### G6 — Control de stock gastronómico  → `https://www.dataria.work/gastronomia`

**Exacta:** `[inventario de cocina]` · `[control de mermas]`
**Frase:** `"control de stock restaurante"` · `"software inventario restaurante"` · `"sistema de inventario para restaurante"` · `"control de stock insumos"` · `"software gestion de inventarios"`

*(La última salió del barrido: puja baja $450, la más barata de todo el grupo.)*

Paths: `gastronomia` / `stock`
Negativos de grupo: `ropa`, `indumentaria`, `calzado`, `farmacia`, `ferreteria`, `kiosco`, `curso`, `excel`

**RSA — Títulos**
Control de Stock Gastronómico · Evitá Quiebres de Insumos · Software Inventario Cocina · IA Detecta Mermas y Faltantes · Sin Equipo Técnico · Probá la Demo Gratis · Nosotros Integramos Todo · Setup en 2-4 Semanas · Alertas Antes del Quiebre · Sabé Qué Pedir y Cuándo · Control de Insumos en Vivo · Sin Instalar Nada Técnico · Empezá con Un Módulo · Sin Papeles ni Planillas · Agendá tu Consulta Gratis

**RSA — Descripciones**
- Controlá insumos y detectá mermas antes de quedarte sin stock un viernes a la noche.
- Sin equipo técnico ni instalaciones raras. Nosotros configuramos todo por vos.
- Recibí alertas por insumo y sabé cuánto y cuándo pedirle a tu proveedor.
- Empezá con un módulo y sumá otros cuando lo necesites. Probá la demo gratis.

---

## Negativos a nivel campaña

Cargar **antes** de habilitar la campaña, no después.

**Intención de no pagar / investigar**
`gratis` · `free` · `barato` · `open source` · `github` · `descargar` · `plantilla` · `excel gratis` · `pdf` · `ejemplo` · `modelo` · `curso` · `capacitacion` · `tutorial` · `como hacer` · `que es` · `definicion` · `tesis` · `monografia` · `reddit` · `wiki`

**Empleo**
`empleo` · `trabajo` · `curriculum` · `cv` · `sueldo` · `busco trabajo`

**Software enterprise (fuera de alcance)**
`sap` · `oracle` · `salesforce` · `microsoft dynamics` · `odoo` · `tango`

**Marcas de competidores** — se bloquean completas. Con este presupuesto no alcanza para pelear búsquedas navegacionales de clientes ajenos.
`toteat` · `bistrosoft` · `maxirest` · `fudo` · `simpliroute` · `quadminds` · `beetrack` · `tokko` · `tokko broker` · `marketman` · `choco` · `clientify`

**Producto que Dataria no vende**
`punto de venta` · `pos` · `tpv` · `comandas` · `caja registradora` · `menu qr` · `carta qr` · `codigo qr` · `gps` · `rastreo satelital` · `localizacion vehicular` · `proveedor de ultima milla` · `chazki`

**🔴 Cluster Google Maps — el más importante de todos**
`google` · `maps` · `mapa` · `mapas` · `itinerario` · `trayecto` · `recorrido` · `waze` · `google earth` · `viaje` · `turismo`

> **Por qué esto es lo que más plata salva.** El barrido de SimpliRoute (15-ago) devolvió **371 keywords y 30.650 búsquedas/mes** de gente buscando armar rutas en Google Maps: `crear ruta en google maps`, `mis rutas google`, `maps cómo llegar` (5.000/mes). Es el cluster de ruido más grande que encontramos, **10 veces más grande que todo el mercado real de Dataria**, y pega justo al lado de las keywords de rutas.
>
> Que no es tráfico comercial lo confirma la puja: **$17 a $79**. Nadie puja por esa gente porque no compra nada. Si entra a la campaña, son clics baratos que el algoritmo va a perseguir con gusto y que no convierten nunca.

**Marcas nuevas detectadas en el barrido** (sumar a la lista de competidores de arriba)
`el chef` · `insoft` · `managementpro` · `management pro` · `articotrans` · `quonext` · `cloudfleet` · `mediagenia` · `unigis` · `highway` · `routal` · `fieldpro` · `drivin` · `gour-net` · `pedisy` · `presik` · `bcnsoft`

---

## Extensiones (compartidas por toda la campaña)

**Sitelinks (4)**
| Título | Descripción 1 | Descripción 2 | URL |
|---|---|---|---|
| Ver demos en vivo | Probá cada módulo gratis | Sin registrarte | `/distribuidoras#demos` |
| Agendá tu consulta | 15 minutos, sin costo | Contanos tu caso | `/#contacto` |
| Casos reales | Cómo lo usan otras pymes | Gastronomía y distribuidoras | `/blog` |
| Cómo funciona Dataria | Setup, seguimiento, expansión | Sin equipo técnico propio | `/` |

**Textos destacados (5)**
Sin equipo técnico · Probalo antes de pagar · Setup en 2-4 semanas · Datos 100% seguros · Empezá con 1 módulo

---

## Checklist de carga

- [ ] Verificar moneda de la cuenta en Facturación → Configuración (ARS esperado)
- [ ] Crear campaña única, objetivo Clientes potenciales, solo Red de Búsqueda
- [ ] Desmarcar socios de búsqueda y Red de Display
- [ ] Ubicación Argentina con opción **"Presencia"**
- [ ] Presupuesto $7.000 ARS/día
- [ ] Maximizar clics con tope de CPC $1.800 ARS
- [ ] Conversión principal: solo `generate_lead`
- [ ] Cargar los negativos de campaña **antes** de habilitar
- [ ] Crear los 6 grupos con sus keywords, negativos de grupo y URL final propia
- [ ] Cargar 1 RSA por grupo + sitelinks y textos destacados a nivel campaña
- [ ] Habilitar

## Qué revisar después

**A los 3 días** — solo el informe de términos de búsqueda de **G4 (software gastronómico)**. Es el grupo con más riesgo de traer tráfico de punto de venta. Sumar negativos.

**A los 14 días**
- Términos de búsqueda de los 6 grupos → negativos nuevos.
- **Cuota de impresiones perdida por ranking.** Si es alta en G1 y G3 (los de puja cara), subir el tope de CPC a $2.500-2.800. Esa es la decisión principal de la segunda quincena.
- Si el presupuesto no se gasta, el problema es el tope de CPC, no el presupuesto.
- No apagar por falta de conversiones en el mes 1. La economía del negocio banca varios meses de caja negativa: 1 o 2 clientes al año pagan toda la pauta anual.

# Contexto para chat nuevo — Google Ads de Dataria

**Escrito:** 2026-08-15 · **Actualizado:** 2026-08-17
**Para qué sirve:** arrancar una conversación nueva sin perder nada. Leer esto primero, completo, antes de tocar nada.

---

## 1. Qué es Dataria y dónde vive todo

**Dataria** (dataria.work) es de Imanol y su hermano **Felipe**: módulos de IA a medida para pymes argentinas, en 4 rubros. Repo: `github.com/felipelopezfuentework-ui/Dataria` (Next.js 15, Vercel — ⚠️ el proyecto que sirve el dominio es **"dataria-nrr8"**, no "dataria").

**Qué vende, exactamente:**
- **Gastronomía:** cálculo de food cost + control de stock de insumos
- **Distribuidoras:** optimización de rutas + control de stock y proyección de demanda
- **Inmobiliarias:** CRM + agente de consultas por WhatsApp
- **E-commerce:** control de stock + proyección de ventas

**Qué NO vende** (crítico para los negativos): punto de venta, comandas, menú QR, GPS/telemetría, y no hace entregas. Se integra con Fudo y Maxirest, **no los reemplaza**.

**Economía real** (no está publicada en la web): setup **USD 200-500** una vez + **USD 50-150/mes** indefinido, sin contrato a término. Un cliente del caso medio repaga en 1-2 meses lo que costó traerlo. **1 o 2 clientes al año pagan toda la pauta anual.** El riesgo no es el costo de adquisición sino la baja temprana: los primeros 6 meses de cada cliente son los críticos.

### Documentos del proyecto (todos en `.agents/` del repo)

| Archivo | Qué tiene |
|---|---|
| **`keywords-definidas.md`** | **Empezar por acá.** Documento base: qué se midió, qué salió, con qué keywords arrancamos, qué se descartó y por qué |
| `google-ads-campanas.md` | La spec de la campaña, lista para cargar: 6 grupos, keywords, anuncios, negativos, checklist |
| `keywords-investigacion.md` | Medición ronda 1 (9-ago): 1.400 keywords por semillas propias |
| `keywords-plan-barrido.md` | Método de la ronda 2: barrido de competidores |
| `scripts/keyword_ideas.py` | Script contra la API, probado, esperando aprobación |
| `scripts/semillas/` | Semillas listas para las 4 corridas que faltan |
| `gemini-consultas/` | Historial numerado de consultas a Gemini con su verificación |
| `PENDIENTES.md` | Backlog activo |

**Skill del método:** `investigar-keywords-y-armar-campanas` en `~/.claude/skills/`. Invocarlo ante cualquier campaña de pauta. ⚠️ Vive **solo en la máquina de Imanol**, no está versionado — Imanol quedó en decidir si se copia al repo.

---

## 2. Estado exacto: dónde quedó la carga

**La campaña nueva se está creando ahora mismo, a mano, en la interfaz.** Imanol va pantalla por pantalla y pasa capturas. No hay acceso por API (ver sección 5).

### Pantallas ya resueltas

| Pantalla | Qué se eligió |
|---|---|
| Objetivo | **"Crear una campaña sin objetivo"** — a propósito, para que Google no empuje a Performance Max |
| Tipo | **Búsqueda** |
| Borrador | "Creación de una campaña nueva". Nombre: `Search - Dataria - Alta Intención` |
| Objetivo de conversión | `Envío de formularios para clientes potenciales` = `generate_lead`. **1 sola acción** ✅ |
| Resultados | ☑️ Visitas al sitio web (`https://www.dataria.work`) · ☐ Llamadas telefónicas **sin marcar** |
| Estrategia de puja | **Clics** + tope de CPC **$1.800 ARS**. "Pujar solo por clientes nuevos" **sin marcar**. ✅ Confirmado por captura 15-ago |

### Configuración de la campaña ✅ (confirmada por captura 15-ago)

| Ajuste | Cómo quedó |
|---|---|
| Redes | Partners de búsqueda **☐** · Display **☐** — las dos desmarcadas |
| Ubicaciones | **Argentina**, y en *Opciones de ubicación* → **"Presencia"** (no "Presencia o interés") |
| Idiomas | **Español** solo. Google sugiere agregar Inglés — ignorado |
| Anuncios políticos UE | "No incluye", + casilla de aplicar a toda la cuenta |
| Segmentos de audiencia | **Ninguno**, y en modo **Observación**. A 4 clics/día ningún segmento junta volumen; "Segmentación" habría recortado el alcance. Contra: los datos de segmento no se juntan retroactivamente — si más adelante se quieren, se agregan y listo |
| Más ajustes | Todo por defecto: rotación "Optimizar", todo el día, sin opciones de URL, sin feeds de páginas |
| **IA Max** | **APAGADO**, con sus tres sub-opciones (personalización de texto, expansión de URL final, búsquedas de marca) |

> **Por qué IA Max apagado.** Es el mismo mecanismo de PMax con otro nombre: amplía keywords por IA, reescribe textos y cambia la URL de destino. Con el cluster de **30.650 búsq./mes de "armar rutas en Google Maps"** pegado al lado de las keywords de rutas —y con CPC de $17-79, o sea clics baratos que el algoritmo persigue con gusto— la expansión automática es la vía más rápida a quemar el presupuesto. El "+14% de conversiones" que promete Google describe cuentas **con** historial de conversiones; ésta tiene cero. Se puede re-testear en 2-3 meses, con negativos maduros y conversiones reales, en campaña aparte.
>
> ⚠️ **Expansión de URL final** en particular pisaría las URL finales propias por grupo, que están elegidas a propósito.

⚠️ Google ofrece botones **"Aplicar"** para volver a prender partners de búsqueda y expansión a Display. **Ignorarlos siempre**, acá y en la pestaña de Recomendaciones.

### Extensiones de campaña ✅ (cargadas 15-ago)

**4 sitelinks**, todos neutros (sirven a los 6 grupos por igual) y con destinos distintos, como exige Google:
`Agendá tu consulta` → `/#contacto` · `Cómo funciona Dataria` → `/#como-trabajamos` · `Guías para pymes` → `/blog` · `Soluciones por rubro` → `/#industrias`

**5 textos destacados:** Sin equipo técnico · Probalo antes de pagar · Setup en 2-4 semanas · **Datos alojados en la nube** · Empezá con 1 módulo
> "Datos 100% seguros" de la spec se cambió por "Datos alojados en la nube": el claim absoluto no se puede sustanciar.

**Extractos del sitio**, encabezado "Servicios": Optimización de rutas · Control de stock · Proyección de demanda · Cálculo de food cost

**De los otros 7 tipos de recurso, ninguno.** En particular **Formulario para clientes potenciales → NO**: captura el lead dentro de Google, la persona no llega al sitio, no dispara `generate_lead` y saltea las demos. **Llamadas → NO**, por coherencia con haber dejado "Llamadas telefónicas" sin marcar. **Precios** es el único que vale repensar más adelante (filtra a quien no puede pagar), pero hoy la web no publica precios y la extensión tiene que ser consistente.

### 🔴 Decisión nueva del 15-ago: sin menciones de clientes

**Imanol pidió sacar `Usado por Pollo Cocido` y `Usado por Pastas Pariggi` / `MP Catering` de todos los anuncios.** Aplica a G1, G2, G3 (Pollo Cocido) y G4, G5 (Pariggi/MP Catering) — la spec de `google-ads-campanas.md` todavía los tiene, hay que ignorarlos al cargar.

⚠️ **Inconsistencia sin resolver:** la landing `/distribuidoras` **sí publica** un testimonio con nombre — "Gabriel Morales — Pollo Cocido". Se sacó de los anuncios pero sigue en la web. Decisión pendiente de Imanol.

### ⚠️ Claims sin verificar que siguen cargados

- ~~**"Probá la Demo Gratis" / "sin registrarte"**~~ → **RESUELTO el 16-ago, leyendo el código fuente** (commit `5ad83e4`). La demo **sí es autoservicio y no pide un solo dato**:
  - `/gastronomia` monta `<GastronomiaDemos />` (`src/app/gastronomia/page.tsx:81`), que renderiza `IndustryDemoPanel` con las 3 demos: Food cost, Control de stock, Planificador de turnos.
  - El botón **"Ver demo"** (`src/components/industry/IndustryDemoPanel.tsx:81-85`) solo hace `setActiveDemoId(id)`: cambia estado en el cliente y monta el componente. **No hay formulario, ni mail, ni modal previo, ni redirección.**
  - Los demos traen datos de ejemplo cargados (`FoodCostDemo.tsx:35-41`: aceite de oliva, harina 000, mozzarella…). Los `<Input>` que aparecen adentro son para agregar insumos **dentro** de la demo, no datos personales.
  - **No hay `middleware.ts`**, ni auth, ni gate: la ruta es pública y las demos cargan con `dynamic(..., { ssr: false })`.
  - **Conclusión:** el claim "Probá la demo gratis" es sustentable, y **"sin registrarte" también** — se sacó por precaución y se puede volver a poner. Verificado contra el código, no contra la página renderizada; un clic en producción lo cierra del todo.
- **"Setup en 2-4 Semanas"** — aparece en textos destacados y como título en 4 grupos. Nadie confirmó que los setups reales entren en ese plazo.

### Verificado del sitio (15-ago, por fetch)

- `/blog` **existe**, 5 artículos publicados (food cost, ventana horaria, inmobiliarias, predicción de stock, Excel vs ERP vs IA). Son **notas, no casos de clientes** — por eso se descartó el sitelink "Casos reales".
- Anclas reales de la home: `#industrias`, `#como-trabajamos`, `#contacto`. ~~`#demos` no existe en `/distribuidoras`~~ → **FALSO, corregido el 17-ago leyendo el código.** `/distribuidoras` monta el panel con tres demos (Rutas, Stock y demanda, Agente de pedidos), y la sección lleva `id="demos"`. El error salió de un fetch que no ejecuta JavaScript. **Las cuatro landings de rubro tienen demos.**
- Páginas: `/`, `/gastronomia`, `/distribuidoras`, `/inmobiliarias`, `/ecommerce`, `/blog`, `/privacidad`, `/terminos`. **No hay página de precios.**

### 🟢 ESTADO AL 15-AGO, FIN DE JORNADA

**La campaña `Search - Dataria - Alta Intención` está PUBLICADA y EN PAUSA.** Confirmado por captura: presupuesto 7.000,00 ARS/día, tipo Búsqueda, fecha de inicio 15 ago 2026, **0 clics · 0 impresiones · $0,00 gastado**.

Se publicó en pausa a propósito, porque **los negativos todavía no están cargados** y la fecha de inicio es hoy.

**Solo existe G1** (6 keywords + 1 anuncio). El asistente de creación crea la campaña con un grupo; G2 a G6 se agregan desde la interfaz normal, que es más rápida.

### ✅ Verificado el 17-ago por captura (ya no hace falta volver a mirarlo)

| Qué | Cómo quedó |
|---|---|
| Tope de CPC | "Definir un límite de puja de CPC máximo" tildado · **1.800,00 ARS** |
| Ubicaciones | Argentina · **Presencia** |
| IA Max | Toggle apagado · "Personalización de texto y Expansión de URL final **desactivadas**" |
| Adquisición de clientes | "Pujar lo mismo por clientes nuevos y por los actuales" |
| **Moneda** | **ARS confirmado** — la propia pantalla de puja rotula "1.800,00 ARS" y "7.000,00 ARS al día". No hizo falta ir a Facturación |

⚠️ En la pantalla de puja Google muestra una advertencia amarilla empujando a Maximizar conversiones. **Ignorarla:** la cuenta tiene cero historial de conversiones, que es justo por lo que se eligió Maximizar clics.

### ✅ Negativos de campaña — CARGADOS el 17-ago

Lista compartida **`Ruido - Dataria`** (Herramientas → Biblioteca compartida → Listas de exclusión), **94 negativos en concordancia amplia**, aplicada a la campaña. Archivo fuente: **`.agents/negativos-campana.txt`**.

Se eligió lista compartida en vez de cargarlos sueltos en la campaña: se edita en un solo lugar y se aplica a campañas futuras con un clic.

**Auditada contra los 2.172 keywords del barrido**, no solo contra las nuestras: bloquea 60.350 de 331.550 búsq./mes medidas (18%) y tiene **cero falsos positivos** — lo único "comercial" que bloquea es `comandas`, `gratis` y `mapas`, que es exactamente lo buscado.

Cambios contra la lista de `google-ads-campanas.md`, todos medidos:
- **`recorrido` + `recorridos` SÍ van.** Primero se sacaron con el argumento de que un comprador tipea "optimizar recorridos"; el dato lo desmintió: de 62 keywords con "recorrido", 56 ya caían por otros negativos y las 6 restantes son de consumidor. **Cero consultas comerciales con "recorrido" en toda la medición.**
- **`barato` fuera.** Dataria *es* la opción barata (USD 50-150/mes): quien busca "software barato" es el cliente, no el que no paga. `gratis` y `free` sí quedan.
- **`modelo` fuera.** Bloqueaba "modelo predictivo de demanda". `plantilla` y `ejemplo` ya cubren esa intención.
- **`proveedor de ultima milla` → `ultima milla`.** En amplia, un negativo de 4 palabras exige las 4 en la búsqueda: no bloqueaba casi nada. Mismo motivo para agregar `satelital` suelto.
- **Plurales agregados** (`cursos`, `plantillas`, `ejemplos`, `tutoriales`, `empleos`, `viajes`, `puntos de venta`, `menus qr`, `comanda`): [los negativos no matchean plurales ni singulares](https://support.google.com/google-ads/answer/2453972) — sí corrigen mayúsculas y errores de tipeo.
- **Redundantes eliminados:** `tokko broker` (cae por `tokko`), `google earth` (por `google`), `excel gratis` (por `gratis` — y así se evita meter `excel` suelto, que mataría "reemplazar Excel", que es buena búsqueda).
- **`"el chef"` descartado.** Se iba a cargar en frase; la palabra "chef" aparece **cero veces** en los 2.172 keywords. La marca ya queda cubierta por `insoft`.

### Lo que falta, en orden

1. ~~Verificar los 3 puntos~~ ✅ · ~~Negativos de campaña~~ ✅ · ~~Verificar moneda~~ ✅
2. **Renombrar `Grupo de anuncios 1` → `G1 - Software Logística`.** Nunca se renombró. Con 6 grupos, los informes de términos de búsqueda son ilegibles si uno se llama así.
3. **Averiguar qué dice "Entidad no apta"** en G1 (grupo y anuncio). Pasar el mouse por el texto punteado. Si es "campaña en pausa", es esperable; si el anuncio está **desaprobado**, hay que saberlo antes de escribir los 5 grupos que faltan.
4. **Crear G2 a G6** — tipo **Estándar**, nunca Dinámico (ver procedimiento abajo).
5. **Negativos por grupo: probablemente ninguno.** Ver procedimiento.
6. Renombrar la PMax vieja a `ZZ - VIEJA - PMax - NO USAR`.
7. **Quitar la extensión de ubicación** (Vicente López · Julio Argentino Roca 2253) — decidido el 15-ago. Se saca desde recursos a nivel **cuenta**, no desde la campaña.
8. **Habilitar.**

### 📋 Procedimiento para cargar un grupo (aplicar a G3-G6)

Los pasos, en orden, tal como se hicieron con G2:

1. **Campañas → Grupos de anuncios → + → Estándar.** Nunca **Dinámico**: el dinámico deja que Google elija la página de destino y escriba los títulos leyendo el sitio. Es el mismo mecanismo de IA Max y PMax, ya descartados, y además no usa keywords.
2. **Nombre `G# - Tema`** y **URL final propia del grupo** (`/distribuidoras` o `/gastronomia`).
3. **Rutas de acceso** (los dos campos de 15 caracteres que se ven en verde bajo el dominio).
4. **Keywords pegadas con sus símbolos:** `[corchetes]` = exacta, `"comillas"` = frase. Sin símbolos queda en amplia, que no se usa hasta tener 30+ conversiones/mes.
5. **Antes de cargar los títulos, contar cuántos contienen el término núcleo de las keywords del grupo.** Balance sano: ~4 de relevancia y ~11 de diferencial. G1 tenía solo 2 de 15 con "logística" y hubo que corregirlo; G2 vino con 6 de 15.
6. **Verificar caracteres:** títulos ≤30, descripciones ≤90, rutas ≤15. Se cuentan, no se estiman.
7. **Negativos de grupo: revisar si no son redundantes.** Los de la spec vieja quedaron casi todos cubiertos por los 94 de campaña. En G2 sobrevivían `chofer` y `moto`, y **ninguno aparece una sola vez en los 2.172 keywords medidos** — encima `chofer` sería contraproducente, porque "control de choferes" es un ángulo propio de distribuidoras. **G2 quedó sin negativos de grupo.**

> **Cómo funciona el anuncio, para explicarlo cuando haga falta:** no se carga un anuncio, se cargan piezas. 15 títulos y 4 descripciones, y Google arma combinaciones mostrando **3 títulos y 2 descripciones** por vez. Por eso cada título tiene que funcionar solo y en cualquier orden — nada de oraciones partidas en dos títulos.

### G2 — Rutas de reparto, listo para cargar

Nombre `G2 - Rutas de Reparto` · URL `https://www.dataria.work/distribuidoras` · Rutas `distribuidoras` / `rutas`

**Keywords (8):** `[optimizador de rutas]` · `[optimizar rutas de reparto]` · `[rutas de reparto]` · `"planificacion de rutas de reparto"` · `"planificador de rutas logistica"` · `"software de reparto"` · `"organizacion de rutas"` · `"app para organizar repartos"`

**Títulos (15):** Optimizá tus Rutas de Reparto · Software de Ruteo Argentina · Rutas para Pyme de Reparto · **Planificá tus Repartos** · IA que Arma tus Rutas · Menos Horas Armando Rutas · Menos Km, Más Entregas · Organizá Entregas sin Excel · Reducí Costos de Nafta · Ventana Horaria sin Drama · Probá la Demo Gratis · Sin Equipo Técnico · Nosotros Integramos Todo · Sin Instalar Nada Técnico · Agendá tu Consulta Gratis

**Descripciones (4):**
- Optimizá rutas y reducí kilómetros con IA. **Probá la demo sin registrarte.** *(17-ago: se devolvió el "sin registrarte" que se había sacado por las dudas — la demo está verificada como autoservicio. Es el diferencial más fuerte contra SimpliRoute y QuadMinds, que piden demo por formulario.)*
- Sabé cuándo llega cada pedido, sin llamados ni WhatsApp perdidos.
- Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy.
- Menos horas armando rutas a mano cada mañana. Agendá tu consulta gratis.

> Cambios contra la spec: salió `Usado por Pollo Cocido`, entró `Planificá tus Repartos` (cubre las keywords de "planificación/planificador", que ningún título tocaba). Se sacó "sin registrarte" de la descripción 1 y la mención de cliente de la descripción 4.

### Método de chequeo por grupo (aplicarlo a G3-G6)

En **G1 solo 2 de 15 títulos** decían "logística", y ninguno "transporte" ni "ERP", teniendo keywords de las dos. Se agregaron `Software de Transporte Pyme` y `Sistema ERP para Logística`, y salieron `Menos Excel, Más Control` (volvió después) y `Software Hecho a tu Medida`.

**Antes de cargar cada grupo: contar cuántos títulos contienen el término núcleo de sus keywords.** Un balance sano es ~4 de relevancia y ~11 de diferencial. G2 ya venía bien (6 de 15 con "rutas"/"ruteo").
6. **Los 6 grupos** con sus keywords, negativos de grupo y URL final propia.
7. **1 anuncio adaptable por grupo** — ya escritos y verificados, ninguno pasa los límites de caracteres.
8. Sitelinks y textos destacados.

---

## 3. Las decisiones tomadas, y por qué

Cada una corrigió un error previo. No revertirlas sin datos nuevos.

| Decisión | Por qué |
|---|---|
| **1 sola campaña**, no dos | Fragmentar el presupuesto deja cada mitad bajo el umbral de aprendizaje |
| **Distribuidoras es el rubro principal** | Es 5-10x más grande que gastronomía. El plan de julio tenía la prioridad invertida |
| **$7.000 ARS/día** (era $18.400) | El mercado no absorbe más. Con impuestos (~24%, cuenta en ARS con factura local) ≈ USD 190/mes |
| **Maximizar clics con tope**, no Maximizar conversiones | Cuenta con cero historial: Maximizar conversiones explora gastando de más |
| **Tope de CPC $1.800** | Ver abajo |
| **Sin objetivo** en la creación | El modo guiado de Google es lo que empujó a Performance Max la vez pasada |
| **Solo `generate_lead`** como conversión | Un evento fácil al lado de uno difícil hace que el algoritmo persiga el fácil (consulta 008) |
| **Performance Max descartado** | Confirmado en consulta 009. Ver sección 4 |
| `escandallo` eliminado | Término peninsular, un argentino no lo busca |
| `argentina` fuera de las keywords | En frase/exacta mata el volumen, nadie lo tipea |

### Por qué $1.800, verificado contra los datos nuevos

| Tope | Keywords que compiten arriba |
|---|---|
| $900 *(sugerencia de Gemini)* | 9/24 — 37% |
| **$1.800** | **18/24 — 75%** |
| $2.200 | 20/24 — 83% |
| $2.800 | 24/24 — 100% |

Mediana de los pisos de puja: **$1.509**. Subir a $2.200 compra 8% más de cobertura por 22% más de costo. El $2.800 existe solo para alcanzar `software para distribuidoras`, la más cara.

Las 6 keywords que quedan abajo del pliegue son las caras de distribuidoras — **decidido a propósito**: aparecen más abajo, no desaparecen.

---

## 4. Lo que se encontró midiendo (no suponiendo)

**El mercado es chico:** ~6.000-8.000 búsquedas/mes alcanzables entre los dos rubros. En gastronomía, de 1.098 keywords analizadas **solo 2 superan las 50 búsquedas/mes**.

**El ancla de gastronomía son dos keywords, no una:** `software gastronómico` (500/mes, ronda 1) y `sistema gastronómico` (500/mes, ronda 2 — apareció en Maxirest **y** Bistrosoft por separado). Ninguna se nos habría ocurrido sola.

**Al lado hay un mercado 10x más grande que no es el nuestro:**

| Cluster de ruido | Búsq./mes | Qué busca en realidad |
|---|---|---|
| **Armar rutas en Google Maps** | **30.650** | Herramienta gratis de consumidor (puja $17-79) |
| Punto de venta / comandas / QR | 14.000 | Cobrar y tomar pedidos |
| Última milla | 3.100 | Contratar una empresa que reparta |
| GPS / flotas | 1.350 | Hardware de telemetría |

**La puja delata la intención.** Es el filtro más rápido que existe: si nadie puja, nadie compra.

**La campaña vieja era Performance Max disfrazada.** Se llamaba "Búsqueda - Dataria 1 Gastronomia" pero el tipo real era **Rendimiento máximo**, con **$20.159/día** de presupuesto. Estaba en pausa y solo gastó $14,22. **No se puede convertir a Búsqueda** — el tipo de campaña es inmutable. Queda en pausa como registro; conviene renombrarla `ZZ - VIEJA - PMax - NO USAR`.

**Las pujas se mueven en días.** Al re-medir: `software de ruteo logístico` $2.303 → $521; `optimizador de rutas` $1.376 → $1.964; `software de gestion gastronomica` $853 → $2.600. **Los números del Planificador sirven para arrancar, no para decidir de una vez.**

---

## 5. Accesos: qué hay y qué no

### ❌ NO hay acceso a Google Ads
El developer token está en **nivel Test**. Verificado corriendo el script contra la API real: `DEVELOPER_TOKEN_NOT_APPROVED`. **No se puede leer ni modificar la cuenta.** Todo se hace a mano y con capturas o CSV que pasa Imanol.

- Solicitud de **Basic Access** enviada el 9-ago. El 15-ago Google respondió pidiendo aclarar el modelo de negocio y confirmar el tipo de empresa; **Imanol ya respondió**, esperando resolución.
- ⚠️ **Al aprobarse, verificar que incluya el uso permitido "Researching keywords and recommendations".** Con "Reporting" solo, el script de keywords no sirve y hay que volver a tramitar.
- ⚠️ **La API v21 está deprecada. La vigente es v25.**
- ⚠️ **El MCP oficial de Google Ads NO sirve para keywords** — expone solo 3 herramientas de lectura. Verificado, no volver a evaluarlo para esto.

### Credenciales
En la memoria, `secret_google_ads_api.md`. Cuenta de anuncios **534-804-3664**, MCC **714-580-8015**, moneda **ARS** (confirmado). GA4 `G-J2675ZE6DY`.

### ❌ El mail de admin
El conector de Gmail apunta a `imanollopezgonzalez@gmail.com`, **no a `datariaai@gmail.com`**, que es donde llegan las notificaciones de Ads, la respuesta de la API y los leads del formulario (que además caen en spam). Sin resolver. La solución más barata propuesta: filtro en `datariaai` con "nunca a spam" + reenvío. Imanol no decidió todavía.

### ✅ Sí hay
Meta Ads, Google Drive, Gmail (personal), Supabase, dos Firebase. Y `GEMINI_API_KEY` en el entorno, con el script `.agents/gemini-consultas/_call_gemini_script.js`.

---

## 6. Cómo trabajar con Imanol

- **Ir en orden, de a una cosa, confirmando.** Cuando dice "paso a paso, lento", es literal: una pantalla por mensaje.
- **Los PRs se mergean directo a main** sin preguntar. Solo avisar.
- **Verificar antes de afirmar.** Existe el skill `verificar-antes-de-afirmar` y aplica a todo número. Un dato que nadie midió no es un dato.
- **No lanzar subagentes sin preguntar**, y usar el modelo más barato que sirva.
- **Nunca inventar testimonios ni datos de clientes**, aunque lo pida bajo presión. Ya pasó una vez y hay que sostener la negativa.
- **Escribir las decisiones el mismo día.** La estructura de 6 grupos se decidió el 9-ago, no se escribió, y el 15-ago hubo que reconstruirla desde los datos crudos.

### Gemini: cómo usarlo
Es una hipótesis mejor informada, **nunca una validación**. Tres modos de falla verificados:
1. **Convierte "should" en "obligatorio"** — inventó que Google exige mail de dominio propio. Falso.
2. **Inventa precisión cuantitativa** — afirmó que la API devuelve volúmenes exactos donde la interfaz redondea. Google documenta lo contrario.
3. **Deriva entre consultas** — reintrodujo `[escandallo]` que ella misma había descartado, y agregó rubros que nadie pidió.

Contrastar contra fuente primaria **todo** número, todo "requiere/exige", y toda contradicción con una decisión previa. Documentar el veredicto junto a la respuesta.

---

## 6bis. ¿Conviene gastar más de $7.000/día? (analizado el 15-ago)

Imanol preguntó, y se calculó contra los datos reales en vez de estimar.

**De las 38 keywords, 36 están en el cajón "50" de Google (rango 10-100).** Solo `software gastronomico` y `sistema gastronomico` tienen volumen diferenciado (500 c/u). Volumen capturable estimado: **~2.800 búsq./mes**.

```
~2.800 búsquedas/mes  ×  ~60% cuota de impresiones  =  ~1.680 impresiones
~1.680  ×  5% CTR  =  ~84 clics/mes  ×  $1.500 CPC  =  ~$126.000/mes  =  $4.200/día
```

**Contra un presupuesto de $7.000/día.** Con CTR optimista (8%) da ~$6.000/día; con pesimista (3%), ~$2.500. **En los tres escenarios el techo del mercado queda por debajo del presupuesto** → subirlo no compraría un solo clic más. Es el mismo error de la PMax vieja: $20.159/día de presupuesto, $14,22 gastados.

> ⚠️ El **CTR del 5% es un supuesto**, no un dato de Dataria. Nadie midió el CTR de estos anuncios porque nunca corrieron.

**Las palancas de crecimiento, en orden de impacto:**
1. **Más keywords** de los clusters ya medidos (G1 tiene 69 keywords en su cluster, se cargaron 6).
2. **Subir el tope de CPC** a $2.500-2.800 por las keywords caras bajo el pliegue.
3. **Medir inmobiliarias y e-commerce**, dos verticales sin una sola keyword medida.
4. **El presupuesto entra recién cuarto.**

**Cómo se confirma:** a los 14 días, *cuota de impresiones perdida por presupuesto* debería estar cerca de **0%**. Si está alta, este análisis estaba mal y subir el presupuesto pasa a ser lo primero.

### Cuándo y cómo se amplían las keywords

**A los 14 días, con el informe de términos de búsqueda — NO volviendo al Planificador.** El Planificador dice qué *podría* buscar la gente; el informe dice qué buscó **realmente alguien que vio el anuncio**. Los términos relevantes con clics se agregan como exactas propias; el ruido va a negativos.

**No ampliar antes:** con 60 keywords más, el mismo presupuesto se reparte, cada una junta 2-3 clics al mes y a los 14 días no se puede decidir nada sobre ninguna.

> **Ojo con "quedaron muchas afuera":** la concordancia de **frase ya captura variantes** (`"software de gestion logistica"` se activa con "mejor software de gestión logística para pymes"). El volumen real capturado está entre 300 y 4.350 en G1, no en el piso. Decir "queda el 93% sin tocar" exagera.

### ⚠️ Los documentos no están sincronizados

Conteo de keywords: **`keywords-definidas.md` lista 38 pero su propio resumen dice 34**, y `google-ads-campanas.md` da otro número. Además `control de mermas` está en G5 en un documento y en G6 en el otro, y `costo de platos restaurante` aparece solo en uno. **Reconciliar después de terminar la carga.**

---

## 7. Después de prender

**A los 3 días:** términos de búsqueda **solo del grupo G4 (software gastronómico)**. Es el de mayor riesgo: la intención dominante del rubro es punto de venta, que Dataria no vende.

**A los 14 días:**
- Términos de los 6 grupos → negativos nuevos
- **Cuota de impresiones perdida por ranking** → si es alta en G1 y G3, subir el tope a $2.500-2.800. Es la decisión principal de la segunda quincena.
- **Si el presupuesto no se gasta, el problema es la puja, no el presupuesto.**
- No apagar por falta de conversiones en el mes 1. La economía banca varios meses de caja negativa.

**Señal para cambiar de estrategia:** a ~150 clics acumulados, si más del 80% de los términos son relevantes y hay **cero** formularios, el problema no son las keywords — es que Search no captura demanda que no existe, y hay que mover el presupuesto a generarla.

**Antes de pasar a una estrategia de puja automática:** arreglar el valor de conversión. `generate_lead` tiene valor "Dinámico" de **1,00 ARS**, un default de GA4. Hoy es inerte con Maximizar clics; con una estrategia por valor sería veneno.

---

## 8. Lo que falta medir

Nada de esto bloquea el lanzamiento.

- **Inmobiliarias y e-commerce:** 2 de las 4 verticales, **nunca se midió una sola keyword**. Semillas listas en `scripts/semillas/`.
- **Capa "problema" del embudo:** el que tiene el dolor y no sabe que existe el software. Semillas listas.
- **Ángulos por sub-rubro:** catering, dark kitchen, preventa, autoventa, WMS, cobranza en ruta.

El informe de términos de búsqueda de la campaña real va a enseñar más en dos semanas que cuatro corridas más del Planificador.

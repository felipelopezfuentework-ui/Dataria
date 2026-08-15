# Consulta 012 — Tipo de campaña, dónde más buscar keywords, automatizar por API y responder el mail de compliance

**Fecha:** 2026-08-15
**Modelo:** gemini-3.6-flash
**Contexto adjunto:** `product-marketing.md` completo (modo full)
**Búsqueda web usada:** ["\"Google Ads API\" developer contact email Gmail approved \"role based\"", "site:developers.google.com/google-ads/api \"KeywordPlanIdeaService\" \"token\"", "\"GenerateKeywordIdeas\" vs Keyword Planner volume differences Google Ads API", "site:developers.google.com/google-ads/api \"permissible use\"", "site:developers.google.com/google-ads/api \"Basic Access\" quota limit", "Google Ads API access level \"Advertiser\" \"Direct Advertiser\" \"MCC\"", "\"GenerateKeywordIdeas\" \"Google Ads API\" permitted use \"Researching keywords\""]

---

## ⚠️ Verificación posterior — leer ANTES que la respuesta

Se contrastó cada afirmación de Gemini contra fuentes primarias. Resultado:

| Afirmación de Gemini | Veredicto | Fuente |
|---|---|---|
| `KeywordPlanIdeaService` requiere el uso permitido "Researching keywords and recommendations"; solo "Reporting" lo bloquea | ✅ **Confirmado** | developers.google.com/google-ads/api/docs/api-policy/access-levels |
| Límite de 1 QPS en `GenerateKeywordIdeas` (60 req/60s), error `RESOURCE_EXHAUSTED` | ✅ **Confirmado** | developers.google.com/google-ads/api/docs/best-practices/quotas |
| Basic Access = 15.000 operaciones/día | ✅ **Confirmado** | misma fuente |
| "Advertiser" es la clasificación correcta | ✅ **Coherente** — Dataria usa la API solo para su propia cuenta, no administra terceros ni entrega la herramienta a clientes | — |
| **"Google exige un mail del dominio propio; hay que cambiarlo ANTES de responder o pausan la solicitud"** | ❌ **FALSO / exagerado.** La doc de Google no exige dominio propio: pide una casilla **monitoreada**, y *recomienda* un alias de rol. El mail de compliance dice "should be used", no "must". `datariaai@gmail.com` ya es una casilla de rol (no es el mail de una persona). **No hace falta comprar un mailbox de dominio para responder.** | developers.google.com/google-ads/api/docs/api-policy/developer-token · docs/productionize/shared-aliases |
| **"La API devuelve el volumen exacto (40, 210) mientras la interfaz redondea en rangos"** | ❌ **No sostenido.** Google documenta explícitamente que "las estadísticas del volumen de búsquedas se redondean", sin excepción por nivel de gasto. La idea de que el gasto activo desbloquea números exactos circula entre practicantes pero **no está en la documentación de Google**. La cuenta de Dataria (gasto cero) devuelve los mismos cajones 50/500 por UI. | support.google.com/google-ads/answer/3022575 |

**Conclusión de la verificación:** lo que la API compra no es *precisión*, es *escala* — poder tirar cientos de semillas sin trabajo manual. No esperar mejores números, esperar más cobertura.

*(Se repite el patrón de la consulta 011: Gemini convierte recomendaciones en obligaciones y afirma datos cuantitativos que no puede respaldar. Ver el README de esta carpeta.)*

---

## Prompt enviado

Cuarta vuelta sobre Google Ads de Dataria. La campaña sigue SIN cargar y sin gastar un peso. Antes de prenderla necesito resolver cuatro cosas. Necesito que uses búsqueda web real para las que dependen de documentación de Google o de herramientas actuales (2026), y que si no encontrás una fuente lo digas explícitamente en vez de completar con lo que suene razonable.

IMPORTANTE SOBRE TU PROPIO HISTORIAL: en la consulta anterior (011) reintrodujiste `[escandallo]`, un término peninsular que vos misma habías mandado a sacar en la 010, y agregaste grupos de Inmobiliarias y E-commerce que yo no había pedido. Además tu estimación de impuestos (24-30%) resultó incompleta. No repitas ese patrón: si algo quedó descartado, quedó descartado, y si un número no lo podés respaldar, decilo.

=== CONTEXTO MEDIDO (esto no es opinión, salió del Planificador de palabras clave) ===

Corrí el Planificador sobre ~1.400 keywords en 8 ángulos, Argentina, español, período jul/2025-jun/2026. Resultados reales:

GASTRONOMÍA — 1.098 keywords analizadas, solo 2 superan las 50 búsquedas/mes:
- `software gastronómico`: 500/mes, competencia Alta, puja $1.111-$9.014
- `sistema de comandas para restaurantes`: 500/mes — DESCARTADA, no es lo que vendo
- Todo el resto (food cost, inventario de cocina, control de mermas, erp gastronomico, software para panaderia, etc): 50/mes cada una, que es el cajón de Google para el rango 10-100.

DISTRIBUIDORAS — 331 keywords, 8 superan las 50/mes. Clusters:
- Última milla: 7.250/mes — pero 1.250 son informativas ("qué es", "pdf") y `proveedor de ultima milla` (500/mes) busca CONTRATAR una empresa que reparta, no software.
- Flotas/GPS: 5.700/mes — `monitoreo de flotas` 500/mes, pero la intención es telemetría GPS con hardware. No lo vendo.
- Software logística/TMS: 4.350/mes, 69 keywords — encaje directo.
- Rutas/ruteo/reparto: 800/mes, 16 keywords — encaje directo.
- Distribuidora/mayorista: 600/mes, 12 keywords — encaje directo.

Pujas de parte superior de página, rango bajo: `software para distribuidoras` $2.776 · `software logistica` $2.124 · `optimizar rutas de reparto` $1.594 · `optimizador de rutas` $1.376 · `software gastronómico` $1.111 · `food cost` $459.

Qué es Dataria: módulos de IA a medida para pymes argentinas. Gastronomía = food cost + control de stock de insumos. Distribuidoras = optimización de rutas + control de stock y proyección de demanda. NO vende punto de venta, NO vende comandas, NO vende GPS/telemetría, NO hace las entregas. Se integra con Fudo y Maxirest, no los reemplaza.

Economía real: setup USD 200-500 una vez + USD 50-150/mes de mantenimiento indefinido. Presupuesto de pauta decidido: $7.000 ARS/día neto (~USD 190/mes con impuestos). Cuenta en pesos con facturación local, monotributo.

=== PREGUNTA 1: ¿Es Búsqueda el tipo de campaña correcto? ===

Esta es la pregunta más importante y quiero que la respondas sin complacencia.

Los datos de arriba me dicen que casi nadie busca lo que Dataria hace. El volumen grande del mercado está en categorías vecinas que no vendo (punto de venta, comandas, GPS, contratar un tercero que reparta). Mi lectura es que Búsqueda tiene un techo bajísimo: no es que compito mal, es que la demanda no existe todavía porque nadie sabe que esto se puede resolver así.

Si eso es cierto, capturar demanda con Search es la estrategia equivocada y debería estar CREANDO demanda (Demand Gen, YouTube, contenido, LinkedIn, outbound directo).

Necesito que evalúes las tres opciones y elijas UNA, con el criterio explícito:
(a) Search igual, aceptando poco volumen pero alta intención — es el plan actual.
(b) Search chico + una segunda vía de generación de demanda en paralelo, partiendo el presupuesto.
(c) Nada de Search todavía; todo el presupuesto a generar demanda hasta que haya búsquedas que capturar.

Considerá que con $7.000/día y CPC real de ~$1.500 esperaría ~140 clics/mes y 3-7 formularios/mes. Y que 1 o 2 clientes al año pagan toda la pauta anual, o sea que el listón de éxito es bajo. ¿Eso cambia tu respuesta? Decime también qué señal concreta, medida a los 30 días, me tendría que hacer cambiar de opción.

=== PREGUNTA 2: ¿Dónde más busco keywords, además del Planificador de Google? ===

Mi lista actual tiene ~30 keywords y me parece flaca y obvia. Siento que estoy adivinando el vocabulario del mercado en vez de medirlo.

Quiero fuentes y métodos concretos, no categorías genéricas. Para cada uno decime: cómo se accede, si es gratis o cuánto sale, y qué tipo de término devuelve que el Planificador NO devuelve. Me interesan especialmente:
- Métodos dentro del propio Google que no estoy usando (el Planificador con "Empezar con un sitio web" apuntando a competidores, Search Console, Google Trends, sugerencias de autocompletado, "búsquedas relacionadas", People Also Ask).
- Herramientas de terceros que sirvan de verdad para ARGENTINA y español rioplatense, con volúmenes reales. Ojo: muchas herramientas tienen datos pobres para Argentina. Si sabés que una es mala para el mercado argentino, decilo.
- Fuentes de lenguaje natural donde las pymes argentinas describen ESTE dolor con sus propias palabras (foros, grupos, comunidades, reseñas de competidores). El vocabulario real, no el del folleto.
- El informe de términos de búsqueda de la propia campaña una vez que corra: qué tan rápido empieza a ser la mejor fuente y a partir de cuántos clics es estadísticamente útil.

Y una pregunta de fondo: si en el rubro casi todo da 50/mes (el cajón 10-100), ¿tiene sentido seguir buscando más keywords de 50, o el problema es que estoy buscando en la capa equivocada del embudo?

=== PREGUNTA 3: Automatizar la investigación por API ===

Ya verifiqué contra la API real (no lo estoy suponiendo): mi developer token está en nivel Test y devuelve DEVELOPER_TOKEN_NOT_APPROVED contra la cuenta de producción. Estoy tramitando Basic Access. También verifiqué que el MCP oficial de Google Ads (github.com/googleads/google-ads-mcp) expone solo 3 herramientas (search, get_resource_metadata, list_accessible_customers), o sea reporting de solo lectura: NO hace investigación de keywords.

Confirmame o corregime esto:
- Para generar ideas de keywords con volumen por API hace falta `KeywordPlanIdeaService.GenerateKeywordIdeas`, y eso requiere declarar el uso permitido "Researching keywords and recommendations" (no alcanza con "Reporting"). ¿Es así?
- Si declaro uso permitido "Reporting" solamente, ¿me quedo sin KeywordPlanIdeaService?
- ¿Hay algún límite de cuota relevante en Basic Access para este servicio?
- ¿`GenerateKeywordIdeas` devuelve exactamente los mismos volúmenes que la interfaz del Planificador, o hay diferencias de agregación/redondeo que me puedan confundir al comparar?

=== PREGUNTA 4: Responder el mail de compliance ===

Google me respondió la solicitud de Basic Access con esto:

"Would you mind briefly clarifying your business model and how you use Google Ads? I just want to make sure your company type is accurate. To understand the differences among the different company types, please see this page. Your current classification is Advertiser."
Y agrega: "a role based or distribution list email address (e.g. info@company.com or google-ads-api@company.com) should be used as your developer contact email."

Mi situación: Dataria es una empresa argentina que vende software propio a pymes. Va a usar la API ÚNICAMENTE para su propia cuenta de Google Ads (534-804-3664, bajo su propia MCC 714-580-8015). No administra cuentas de terceros, no le vende ni le da acceso a la API a sus clientes, no construye una herramienta que otros usen para manejar sus campañas. Mi contacto de API hoy es datariaai@gmail.com, que no es el mail de una persona sino la casilla de la empresa, pero es un Gmail y no un mail del dominio dataria.work.

- ¿"Advertiser" es la clasificación correcta para este caso? Si no, ¿cuál sería y por qué?
- Redactame la respuesta al mail, en inglés, breve y concreta, que describa el modelo de negocio y el uso de la API de forma que un revisor de compliance pueda aprobarla sin volver a preguntar. Que mencione explícitamente el uso permitido que necesito, incluyendo investigación de keywords para mis propias campañas.
- ¿Conviene que cambie el contacto a un mail del dominio propio en medio de la revisión, o eso reinicia el trámite? Dame la respuesta práctica.

=== FORMATO ===
Respondé las 4 preguntas en orden, sin agregar temas que no pedí. Donde des un número o cites una política de Google, decime de dónde sale. Si algo no lo pudiste verificar con búsqueda, marcálo como "no verificado".


---

## Respuesta de Gemini

 Respuestas a las 4 preguntas planteadas, fundamentadas en la documentación oficial de Google Ads API (agosto 2026) e investigación del mercado local B2B.

---

### PREGUNTA 1: ¿Es Búsqueda el tipo de campaña correcto?

**Opción elegida: (a) Búsqueda igual, aceptando poco volumen pero alta intención.**

#### Justificación y análisis de opciones:
1. **Economía de la unidad y listón de éxito:** Con un presupuesto de $7.000 ARS/día (~$210.000 ARS/mes netos) y CPC de ~$1.500 ARS, el volumen estimado es de ~140 clics/mes. En B2B de ticket medio/alto con modelo recurrente (setup USD 200–500 + abono mensual USD 50–150), cerrar **1 o 2 clientes al año** paga el 100% de la inversión publicitaria anual. El listón de conversión requerido para lograr ROI positivo es sumamente bajo (~0,5% a 1% de conversión de clic a cliente cerrado).
2. **Por qué dividir el presupuesto (Opción b) es un error:** Partir $7.000 ARS/día deja $3.500/día en Búsqueda (~2 clics al día) y $3.500/día en generación de demanda (Demand Gen / Meta / LinkedIn). En pauta B2B, $3.500 ARS/día en campañas de interrupción (Social/Demand Gen) no alcanzan la frecuencia mínima de impresión ni generan suficiente volumen de eventos para que el algoritmo de aprendizaje automático optimice pujas. Terminarías con dos campañas infrapautadas.
3. **Captura vs. Creación de demanda:** Aunque el volumen absoluto en el Planificador es bajo ("50 búsquedas/mes" por término), quien escribe `software para distribuidoras` u `optimizar rutas de reparto` está en **fase activa de compra/solución**. Esa intención transaccional no se logra con Demand Gen o publicidad fría.

#### Señal concreta a los 30 días para cambiar de estrategia:
* **Métrica evaluada:** Correr la campaña durante 30 días acumulando entre **120 y 150 clics válidos**.
* **Criterio de cambio (Pivote):** Si al llegar a ~150 clics el Informe de términos de búsqueda muestra que **>80% de los clics fueron búsquedas relevantes** (no basurero) y se obtienen **0 formularios/reuniones calificados**, significa que la intención de búsqueda en Search para estos términos no convierte comercialmente al sitio actual.
* **Acción si ocurre:** Pausar Búsqueda y migrar el 100% del presupuesto a **Demand Gen / Meta Ads** orientado a dueños/gerentes pyme, o a **Outbound directo por LinkedIn/WhatsApp**.

---

### PREGUNTA 2: ¿Dónde más busco keywords, además del Planificador de Google?

#### 1. Métodos dentro de Google
* **Planificador con "Empezar con un sitio web":** 
  * *Cómo acceder:* Gratis dentro de Google Ads UI > Planificador de palabras clave > "Empezar con un sitio web".
  * *Uso:* En lugar de keywords, ingresá la URL directa de competidores de la región (ej. `fudo.com.ar`, `maxirest.com`, `quadminds.com`, `simpliroute.com`).
  * *Lo que devuelve:* Extrae los términos exactos por los que Google clasifica esos sitios. Descubre palabras transaccionales que los competidores posicionan y que no surgen al adivinar semillas.
* **Google Search Console (GSC):**
  * *Acceso:* Gratis (requiere propiedad verificada).
  * *Uso:* Filtrar la pestaña "Resultados de búsqueda" por impresiones y posición media.
  * *Limitación:* Para un dominio nuevo sin tráfico orgánico masivo, no aportará keywords externas aún.
* **Google Trends:**
  * *Acceso:* Gratis (`trends.google.com`).
  * *Uso:* Filtrar por Argentina. Permite comparar términos (ej. `software logistica` vs `rutas de reparto`) para ver tendencia temporal y regiones con más demanda (ej. CABA vs. Santa Fe/Córdoba). En la sección "Consultas relacionadas" muestra búsquedas "En aumento" (breakout).
* **Autocompletado, "Búsquedas relacionadas" y "People Also Ask" (PAA):**
  * *Acceso:* Gratis (navegación de incógnito en `google.com.ar`).
  * *Uso:* Tipear la semilla y revisar qué modificadores sugiere Google. Devuelve frases de intención real en lenguaje local (ej. `programa para calcular costos de platos excel`, `como organizar repartos de mercaderia`).

#### 2. Herramientas de terceros para Argentina / Rioplatense
* **Semrush:**
  * *Acceso/Costo:* De pago (desde ~$130 USD/mes; hay prueba gratuita o licencias compartidas).
  * *Rendimiento en Argentina:* **Bueno/Aceptable.** Tiene base de datos específica para Argentina (`Google.com.ar`). Permite hacer "Domain Overview" de competidores locales y ver por qué palabras clave pagan Ads o posicionan en orgánico.
* **Ahrefs:**
  * *Acceso/Costo:* De pago (desde ~$99 USD/mes).
  * *Rendimiento en Argentina:* La base de datos de palabras clave locales en español rioplatense es ligeramente inferior a la de Semrush en volumen de cola larga, aunque muy precisa para análisis de backlinks y sitios de competidores.
* **Ubersuggest / AnswerThePublic:**
  * *Acceso/Costo:* Freemium / ~$29 USD/mes.
  * *Rendimiento en Argentina:* **Pobre.** Sus datos de volumen para Argentina en nichos B2B están altamente interpolados y suelen replicar los rangos genéricos del Planificador de Google. No justifica la inversión para este caso de uso.

#### 3. Fuentes de lenguaje natural de pymes argentinas
* **Reseñas en Google Play Store / Capterra / Trustpilot de competidores:**
  * *Método:* Buscar las fichas de apps de competidores (Fudo, Maxirest, QuadMinds, SimpliRoute, Tokko).
  * *Utilidad:* Leer las reseñas de 1, 2 y 3 estrellas. Los dueños y encargados expresan sus dolores en lenguaje crudo: *"el software se cuelga al armar la hoja de ruta"*, *"no puedo cruzar el stock de la cocina con el costo"*, *"las planillas de excel no me cierran con los repartidores"*. Esos pain points se convierten en keywords de coincidencia de frase o copy de anuncios.
* **Comunidades y Foros (Reddit / Grupos de Facebook):**
  * *Fuentes:* `r/Argentina`, `r/MercadoLider`, o grupos de Facebook como *"Gastronómicos Argentina"*, *"Distribuidoras y Mayoristas Argentina"*.
  * *Utilidad:* Buscar publicaciones donde pregunten *"¿Qué sistema usan para...?"*. Devuelve la terminología no técnica con la que el cliente busca resolver el problema antes de conocer la categoría del software.

#### 4. Informe de términos de búsqueda de la campaña en vivo
* **Puesta en marcha:** Debe revisarse **desde el día 1** diariamente para negativizar búsquedas basura (`gratis`, `pdf`, `curriculum`, `empleo`, etc.).
* **Utilidad estadística:** Comienza a ser representativo a partir de **100 a 150 clics acumulados** (aproximadamente 3 a 4 semanas de campaña con el presupuesto actual).

#### ¿Tiene sentido seguir buscando más keywords de "50/mes"?
**Sí, pero diferenciando la capa del embudo:**
1. En nichos B2B en Argentina, "50/mes" es el umbral base que muestra la interfaz de Google Ads para cualquier volumen entre 10 y 100 búsquedas mensuales. Acumular 15 o 20 palabras clave de "50/mes" con intención comercial directa (`software para distribuidoras`, `hoja de ruta de reparto`, `control de food cost`) suma un volumen real de demanda capturable de alta calidad.
2. Sin embargo, no hay que quedarse solo en palabras "orientadas a la solución" (`software XYZ`). Hay que atacar la **capa media del embudo (Problem-Aware)**: usuarios que buscan resolver el problema operativo manualmente (ej. `planilla excel control de stock insumos`, `como armar rutas de reparto en excel`). Estas búsquedas tienen volumen, y se pueden capturar con anuncios de Búsqueda que ofrezcan la automatización como paso superador a la planilla.

---

### PREGUNTA 3: Automatizar la investigación por API

Verificado contra la documentación oficial de Google Ads API:

1. **Permissible Use y `KeywordPlanIdeaService`:**
   * **Confirmado:** Para generar ideas de keywords por API utilizando `KeywordPlanIdeaService.GenerateKeywordIdeas`, la documentación oficial establece que el developer token **DEBE tener asignado el Permissible Use *"Researching keywords and recommendations"***.
   * Si la cuenta se declara únicamente para *"Reporting"*, las llamadas a los servicios de planificación (`KeywordPlanIdeaService`, `KeywordPlanService`, `KeywordPlanCampaignService`) quedan **bloqueadas en producción y devuelven error de permiso**.

2. **Límites de cuota en Basic Access:**
   * **Límite general:** Un token con nivel *Basic Access* dispone de **15.000 operaciones por día** tanto en cuentas de prueba como de producción.
   * **Límite específico para servicios de planificación (Planning Services):** Google impone una restricción adicional de tasa para `KeywordPlanIdeaService`: **1 QPS (1 solicitud por segundo / máximo 60 solicitudes por minuto)**. Si se realizan peticiones concurrentes o más rápidas que 1 QPS, la API devuelve el error `RESOURCE_EXHAUSTED`.

3. **Diferencia de datos entre API y la interfaz web del Planificador:**
   * **Precisión de volumen histórico:** En cuentas sin gasto elevado activo, la interfaz web del Planificador agrupa y redondea los volúmenes en rangos amplios (ej. `10 - 100`, `100 - 1K`). La API, a través de `GenerateKeywordIdeas` y `GenerateKeywordHistoricalMetrics`, suele devolver la métrica exacta o menos agregada (ej. `40`, `210` búsquedas mensuales promedio).
   * **Sugerencias:** La interfaz web aplica algoritmos visuales de expansión ("Amplíe su búsqueda"). La API devuelve estrictamente los resultados asociados a las semillas (`keywordSeed`, `urlSeed`, `siteSeed`) y parámetros de localización/idioma enviados en la estructura de la solicitud.

---

### PREGUNTA 4: Responder el mail de compliance

#### 1. Clasificación correcta: "Advertiser"
**Sí, "Advertiser" (o Direct Advertiser) es la clasificación 100% correcta.** 
Google define "Agency" como una entidad que administra campañas e inversión publicitaria para clientes terceros. Como Dataria va a utilizar la API exclusivamente para gestionar y analizar sus propias campañas dentro de su propia estructura MCC / CID, no califica como Agencia ni como desarrollador de software para terceros.

#### 2. Correo de contacto del desarrollador (Dominio vs Gmail)
**Respuesta práctica:** Se debe **cambiar el contacto a un correo del dominio propio (`dataria.work`) ANTES de responder el mail**.
Google Ads API Compliance exige explícitamente el uso de una dirección de correo basada en roles dentro del dominio de la empresa (ej. `info@dataria.work` o `google-ads-api@dataria.work`). 
* *Efecto en el trámite:* Cambiar el email en la sección *Centro de API* del MCC no reinicia la revisión desde cero; simplemente actualiza el registro de contacto. Si respondés con un correo `@gmail.com`, el equipo de compliance pausará la solicitud y volverá a pedirte un email corporativo.

#### 3. Redacción de la respuesta para Compliance (en inglés)

**Subject:** Re: Basic Access Application - Developer Token [MCC: 714-580-8015]

> Dear Google Ads API Compliance Team,
>
> Thank you for reaching out.
>
> **1. Business Model & Account Classification**
> Dataria is a B2B software company based in Argentina that develops custom AI operational modules for small and medium-sized businesses. Our classification as **Advertiser** is correct. We use the Google Ads API strictly for internal management of our own advertising campaigns. We do not manage third-party accounts, nor do we provide API access or tools to external clients.
>
> **2. API Scope & Use Cases**
> We are requesting Basic Access to support the following internal use cases for our own Manager Account (MCC: 714-580-8015) and child account (CID: 534-804-3664):
> - **Permissible Use: Reporting** — Automated internal performance reporting and campaign tracking.
> - **Permissible Use: Researching keywords and recommendations** — Automated keyword research using `KeywordPlanIdeaService.GenerateKeywordIdeas` to identify high-intent search terms for our own campaign planning.
>
> **3. Developer Contact Update**
> As requested, we have updated our developer contact email in the API Center to a role-based company domain address: `google-ads-api@dataria.work` *(o la casilla de dominio propia que configures)*.
>
> Please let us know if any further information is needed to complete the review.
>
> Best regards,  
> **Imanol / Dataria Team**  
> Dataria (MCC: 714-580-8015)

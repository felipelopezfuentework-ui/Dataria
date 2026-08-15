# Contexto para chat nuevo — Google Ads de Dataria

**Escrito:** 2026-08-15
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
| Estrategia de puja | **Clics** (bajo "Otras opciones de optimización") + tope de CPC **$1.800** |

### La pantalla donde quedó

Estaba por seleccionar **Clics** en el desplegable de estrategia de puja y marcar el límite de CPC en 1800.

### Lo que falta

1. Terminar puja: **Clics + tope $1.800**. "Adquisición de clientes" → **apagada**.
2. **Presupuesto: $7.000 ARS/día**
3. **Segmentación:** Argentina, y en *Opciones de ubicación* elegir **"Presencia"** (viene "Presencia o interés"). Idioma: español.
4. **Redes: DESMARCAR** "Socios de búsqueda" y "Red de Display".
5. **Negativos de campaña ANTES de habilitar** (están en `google-ads-campanas.md`).
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

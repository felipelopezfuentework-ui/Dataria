# Pendientes Web Dataria (dataria.work)
*Actualizado 2026-08-19 — se eliminó todo lo ya completado (el historial real queda en `git log`).*
*Cada entrada dice su fecha y su estado: ✅ hecho y verificado · 🟡 en curso · 🔴 bloqueado o pendiente de un dato.*

## Contexto rápido
- Sitio: Dataria — herramientas de IA a medida para pymes/autónomos, 4 rubros (gastronomía, distribuidoras, inmobiliarias, e-commerce) + formulario "Otros". NO es un restaurante (no confundir con Ragu Bodegón).
- Repo: github.com/felipelopezfuentework-ui/Dataria — Imanol colaborador. Next.js 15, App Router.
- Deploy: Vercel, proyecto **"dataria-nrr8"** (⚠️ NO "dataria" a secas — hay dos proyectos parecidos en la cuenta, el que sirve dataria.work es el nrr8). Dominio comprado en Squarespace.
- Contexto de marca/producto completo: `.agents/product-marketing.md` en el repo (v5). Historial de consultas a Gemini: `.agents/gemini-consultas/` en el repo.
- GA4 Measurement ID: `G-J2675ZE6DY`. Search Console verificado por TXT en DNS (cubre www y no-www a la vez).
- Objetivo actual: **lanzar Google Ads.** Es el único pendiente que mueve la aguja; el resto es mantenimiento.
- **Regla de trabajo de Imanol: ir en orden, confirmar antes de avanzar al siguiente paso. Los PRs se mergean directo a main sin preguntar cada vez (pedido explícito).**

---

## 🔴 Pendientes activos

### 1. Google Ads — 🟡 EN CARGA. Campaña publicada EN PAUSA el 15/ago.

> **📄 Antes de tocar nada, leer `.agents/CONTEXTO-PARA-NUEVO-CHAT.md` completo.** Ahí está el estado pantalla por pantalla, cada decisión con su motivo y lo que falta verificar.

**Estado real (15/ago, fin de jornada):** la campaña `Search - Dataria - Alta Intención` **existe, está publicada y en pausa**. Presupuesto 7.000 ARS/día, tipo Búsqueda, **0 clics · 0 impresiones · $0,00 gastado**. Se dejó en pausa a propósito: **los negativos todavía no están cargados** y la fecha de inicio es hoy.

**Solo está creado G1** (6 keywords + 1 anuncio). El asistente crea la campaña con un grupo; G2 a G6 se agregan desde la interfaz normal.

**Para retomar, en orden:**
1. **Verificar 3 cosas que el resumen de creación no mostró:** tope de CPC en **$1.800**, Ubicaciones en **"Presencia"** (no "Presencia o interés"), **IA Max desactivado**.
2. **Cargar negativos de campaña** — la lista grande, incluido el cluster Google Maps. **Antes de habilitar.**
3. Crear **G2 a G6** (G2 ya está redactado y corregido en el CONTEXTO).
4. Negativos por grupo, seis listas.
5. **Verificar moneda ARS** en Facturación → Configuración.
6. Renombrar la PMax vieja a `ZZ - VIEJA - PMax - NO USAR`.
7. **Quitar la extensión de ubicación** (Vicente López · Julio Argentino Roca 2253) — decidido por Imanol, se saca a nivel **cuenta**.
8. Habilitar.

**⚠️ Dos claims cargados que nadie verificó:**
- **"Probá la Demo Gratis" / "sin registrarte"** — dos lecturas del sitio sugieren que **no hay demo autoservicio** (todo pasa por "Agendar reunión" / "Solicitar demo"). No es concluyente (la herramienta no ejecuta JS). Si pide datos, hay que reescribir texto en los 6 grupos: prometer prueba sin registro y entregar formulario es desaprobación por destino engañoso.
- **"Setup en 2-4 Semanas"** — en textos destacados y en 4 grupos. Nadie confirmó el plazo real.

**🔴 Decisión del 15/ago: sin menciones de clientes en los anuncios.** Fuera `Usado por Pollo Cocido` y `Usado por Pastas Pariggi` / `MP Catering`. **La spec `google-ads-campanas.md` todavía los tiene — ignorarlos al cargar.** Pendiente: la landing `/distribuidoras` **sí publica** el testimonio "Gabriel Morales — Pollo Cocido", y la "descripción larga CON nombres de clientes" de este mismo documento también. Imanol no definió si eso también sale.

**⚠️ Los documentos no están sincronizados:** `keywords-definidas.md` lista 38 keywords pero su resumen dice 34, y `google-ads-campanas.md` da otro número. `control de mermas` figura en G5 en un doc y en G6 en el otro. Reconciliar al terminar la carga.

Especificación completa en `.agents/google-ads-campanas.md` (reescrita el 15/ago: 1 campaña, 6 grupos, distribuidoras como rubro principal, $7.000 ARS/día, Maximizar clics con tope de CPC $1.800). **Desactualizada respecto de lo que se cargó de verdad** — el CONTEXTO manda.

**📄 Documento base del proyecto: `.agents/keywords-definidas.md`** — qué se midió, qué salió, con qué keywords arrancamos y qué se descartó. Es el que hay que leer primero y el que se actualiza con los datos de la campaña real. Detalle de las mediciones en `keywords-investigacion.md` (ronda 1) y `keywords-plan-barrido.md` (método de la ronda 2).

La medición ya está cerrada (GA4 vinculado, `generate_lead` como única conversión principal, tráfico interno filtrado). **No queda ningún bloqueante técnico: falta cargarla a mano en la plataforma.**

**⏳ Anotado el 15/ago, arreglar ANTES de cambiar la estrategia de puja:** la acción de conversión `Dataria (web) generate_lead` tiene **valor "Dinámico" con 1,00 ARS de media**. Es un default que arrastra de GA4, no un dato real. Hoy es inerte porque *Maximizar clics* ignora el valor de conversión. **Pero si alguna vez se pasa a *Maximizar valor de conversión* o a *ROAS objetivo*, le estaríamos diciendo al algoritmo que un lead vale un peso** y optimizaría cualquier cosa. Con la economía real (setup USD 200-500 + USD 50-150/mes indefinido), un lead vale órdenes de magnitud más. Se corrige en Herramientas → Conversiones → editar la acción → poner un valor fijo que refleje el valor real de un lead, o directamente "no usar valor".

Dos cosas a resolver en paralelo, que NO bloquean el lanzamiento:
- **Mail de admin:** el conector de Gmail de Claude apunta a `imanollopezgonzalez@gmail.com`, no a `datariaai@gmail.com`. Por eso Claude no ve las notificaciones de la cuenta de Ads de Dataria, ni la respuesta de la API, ni los leads del formulario. Decidir si se cambia el conector o se arma un MCP aparte con OAuth propio (permitiría las dos cuentas en paralelo).
- **API de Google Ads:** el developer token sigue en nivel Test, que no lee la cuenta real. Solicitud de Basic Access enviada el 09/08, sin novedades. El MCP de Google Ads no está configurado en la máquina de Imanol. Solo hace falta para automatizar, no para lanzar.

### 2. AlternativeTo — desbloqueado, falta hacerlo
El bloqueo de antigüedad de cuenta (7 días desde el 19/jul) venció el 26/jul. El copy ya está listo para pegar:
- **Name:** Dataria — **Website:** https://dataria.work
- **Tagline:** "IA a medida para pymes argentinas, sin equipo técnico"
- **Description:** ver versión sin nombres de clientes en "Copy de referencia" más abajo.
- **Platforms:** Web — **License/Pricing:** Commercial.
- **Tags:** Artificial Intelligence, SaaS, Business & Commerce, CRM, Restaurant Management, Inventory Management, Route Planning.
- **Logo a subir:** `public/isologo-dataria.png`.
- **Alternativas a marcar:** Tokko Broker (CRM inmobiliario), SimpliRoute (rutas de reparto), Choco.com (pedidos/gestión gastronómica).
- Proceso: cuenta propia → ícono de usuario → "Suggest new application" → 3 pasos. Aprobación manual 1-2 días.

### 3. Google Business Profile — solo falta sumar reseñas
Perfil completo (verificación, fotos, horario, servicios, URL de reserva). Tarea continua: pedir reseñas reales a clientes (Mariana, Luciano, Gabriel y los que se sumen).

### 4. Investigación de keywords — segunda vuelta, plan listo para correr
Plan completo en `.agents/keywords-plan-barrido.md`, con las semillas ya escritas en `.agents/scripts/semillas/`. Cuatro bloques: método de competidores, capa "problema" del embudo, ángulos no cubiertos, y las dos verticales nunca medidas (inmobiliarias y e-commerce).

**Los cuatro bloques se pueden correr a mano en el Planificador hoy, sin esperar la API.** Cuando llegue Basic Access, el mismo trabajo lo hace `.agents/scripts/keyword_ideas.py` sin trabajo manual.

### 5. Automatizar la investigación de keywords — evaluar qué se puede conectar
El barrido del 15/ago se hizo a mano: 6 corridas en el Planificador, descargar CSV, procesar con script. Funcionó, pero no escala a Pariggi y Pollo Cocido. Hay que evaluar qué parte se puede automatizar y con qué.

**Lo que ya está resuelto y solo espera la aprobación:**
- `scripts/keyword_ideas.py` corre `GenerateKeywordIdeas` contra la API y hace lo mismo que el Planificador con cientos de semillas. Probado de punta a punta; frena en `DEVELOPER_TOKEN_NOT_APPROVED`. **Necesita Basic Access CON el uso permitido "Researching keywords and recommendations"** — con "Reporting" solo, no sirve. Límite: 1 QPS, 15.000 operaciones/día.

**Lo que hay que investigar (nadie lo miró todavía):**
- **¿El barrido de competidores se puede hacer por API?** El script hoy soporta `siteSeed` y `urlSeed`, pero no se pudo probar sin aprobación. Si funciona, las 6 corridas manuales pasan a ser un comando.
- **¿Se puede automatizar el ciclo completo?** Semillas → API → clasificación → propuesta de keywords y negativos. La clasificación hoy es un script de reglas hecho a mano; evaluar si conviene que la haga un modelo.
- **Google Trends:** no tiene API oficial. Ver si alguna alternativa da datos usables para Argentina.
- **MCP de Google Ads:** verificado el 15/ago que **NO sirve para keywords** — expone solo 3 herramientas de lectura (`search`, `get_resource_metadata`, `list_accessible_customers`). Sirve para leer métricas de campañas corriendo, no para investigar. No volver a evaluarlo para esto.
- **Meta:** el conector de Meta Ads ya está activo en Claude. Para Pariggi hay que definir cuál es el equivalente del barrido de competidores — probablemente la **biblioteca de anuncios** (qué creativos corren, hace cuánto, con qué ángulo). Sin explorar.

**Método documentado mientras tanto:** el razonamiento completo quedó en el skill `investigar-keywords-y-armar-campanas`, aplicable a Pariggi y Pollo Cocido aunque siga siendo manual.

### 6. Idea sin desarrollar — agente que optimice la campaña de forma continua
Conectar un agente con el contexto y el análisis de la campaña real para ir sugiriendo mejoras con el tiempo. Retomar una vez que la campaña esté andando y con la API aprobada — antes no hay datos que analizar.

### 7. Blog — mantenimiento a demanda
Imanol va a ir pasando modificaciones puntuales a los posts ya publicados a medida que las necesite.

---

### 8. Consentimiento de cookies — ✅ código terminado 19/ago · 🔴 faltan 3 datos de Imanol

**Estado al 19-ago-2026.** Todo lo que se resuelve por código está hecho, buildeado y verificado con
Playwright contra el build de producción: **53/53 comprobaciones OK, cero errores de consola.**

**Hecho:**
- Banner de consentimiento (`src/components/consent/CookieConsent.tsx`) montado en `layout.tsx`.
- Google Consent Mode v2: el default `denied` de los cuatro señalizadores va como **primer elemento del
  `<head>`**, antes de cualquier gtag. Al aceptar se manda el `consent update`.
- `GoogleAnalytics.tsx` ya no se auto-ejecuta: expone `loadGoogleAnalytics()`, que solo corre tras el «Aceptar».
- «Aceptar» y «Rechazar»: mismo tamaño y peso medidos (150x44 px, 15px/600), un clic cada uno.
- Al rechazar se borran las cookies `_ga*`, `_gid*`, `_gat*` y `_gcl*`.
- Enlace «Cookies» en el pie, en la misma línea que Privacidad y Condiciones, que reabre el banner.
- `/privacidad`: sección 7 reescrita con ancla `#cookies` y tabla cookie por cookie. Las dos cláusulas que
  exige la AAIP (art. 14 inc. 3 y Órgano de Control) ya estaban y se verificaron.
- Aviso del art. 6 de la Ley 25.326 al pie de los **dos** formularios (contacto principal e inline de «Otros»).
- No hay ningún `<noscript>` ni píxel de imagen en las 20 páginas generadas.
- **Tipografías autohospedadas con `next/font`** (19-ago): Plus Jakarta Sans e Inter se sirven desde el propio
  dominio. Cero peticiones a `fonts.googleapis.com` y `fonts.gstatic.com` — medido, era una petición a un
  tercero en cada visita y antes del consentimiento. Ambas son SIL OFL, sin problema de licencia.

**Medido el 19-ago, no supuesto:** aceptando, el sitio contacta `googletagmanager.com`,
`region1.analytics.google.com` y **`stats.g.doubleclick.net`** (atribución de conversiones por la vinculación
GA4 ↔ Google Ads) y deja tres cookies: `_ga` y `_ga_J2675ZE6DY` (**400 días** — el navegador recorta los 2 años
que declara Google) y `_gcl_au` (90 días). Sin decidir o rechazando: **cero peticiones y cero cookies**.

**🔴 Lo que falta, y depende de datos que solo tiene Imanol (los debe, 19-ago):**

| Falta | Para qué | Estado |
|---|---|---|
| **CUIT y razón social** del responsable | El art. 6 inc. b pide identidad del responsable. Por Crunchbase el nombre legal es **Felipe López Fuente** (monotributo), pero no hay CUIT confirmado | 🔴 Imanol lo debe |
| **Domicilio legal** (calle y número) | Hoy la política solo dice «Provincia de Buenos Aires». El art. 6 inc. b pide domicilio | 🔴 Imanol lo debe |
| **Inscripción de la base ante la AAIP** (art. 21) | Trámite gratuito por TAD, requiere los dos datos de arriba | 🔴 Imanol lo debe |

⚠️ **No inventar ninguno de los tres, ni deducirlos de otros proyectos.** Las constancias de ARCA que hay en
la PC de Imanol son de otras empresas en las que trabaja, no de Dataria: usar cualquiera de esas sería poner
un CUIT ajeno en la política de privacidad. Solo sirve el dato que confirme Imanol para Dataria.

**Para probar en local:** hace falta un `.env.local` con `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-J2675ZE6DY`. Sin esa
variable el cargador de GA4 no hace nada por diseño, y el banner parece "roto" cuando en realidad está bien.
El script de verificación con Playwright no está en el repo: vive en el scratchpad de la sesión.

---

## 📋 Backlog — anotado, sin abrir
- **🔴 Ordenar dónde vive cada cosa (17-ago, planteado por Imanol).** Hoy todo se maneja como chats sueltos y se pasan cosas por alto. Dos disparadores concretos del 17-ago: (a) los CSV crudos del barrido se creían guardados en GitHub y estaban solo en Descargas — se guardó la conclusión y se tiró la evidencia; (b) el trabajo del 15-ago quedó escrito pero sin commitear. **A tratar con Felipe:** qué va a GitHub y qué a Vercel, si el repo `Dataria` pasa a privado (no cuesta plata: los repos privados de GitHub son gratis y Vercel despliega desde privados en el plan free — confirmar antes de tocarlo), y cómo se guardan los contextos y las decisiones para que un chat nuevo no arranque de cero. **Bloquea:** pushear `.agents/datos-crudos/` — commiteado local, sin pushear, esperando esta decisión.
- **Ronda 1 de keywords (9-ago, ~1.400 términos): no hay CSV crudo.** Ni en el repo ni en Descargas. Solo sobrevive el análisis en `keywords-investigacion.md`. Si hace falta la evidencia, hay que volver a correr el Planificador con las mismas semillas.
- **Crunchbase:** perfil creado (crunchbase.com/organization/dataria-2b90) pero incompleto — el submit fallaba por un bug de la plataforma (Headquarters exige dirección postal completa). Imanol decidió dejar de perseguirlo, no es prioridad.
- **Agente que rescate el mail de spam automáticamente:** bloqueado — el conector de Gmail en Claude solo admite una cuenta a la vez (conectado a imanollopezgonzalez@gmail.com, no a datariaai@gmail.com). Alternativa: plan pago de Web3Forms con subdominio propio (`mail.dataria.work`).
- **Agentes de contenido** (redactar blogs/responder comentarios): anotado, no se arranca todavía.
- **Agentes para YouTube/Reddit/LinkedIn:** necesitaría cuentas reales, no viable por ahora. Si se retoma: Imanol/Felipe posteando como personas reales, NUNCA bots.
- **Señales de autoridad** (menciones en Reddit/YouTube/Wikipedia/LinkedIn): cero presencia hoy, el hueco más grande para que una IA cite a Dataria — se arregla con contenido/tiempo, no con código.

---

## 🐛 Bugs menores sin resolver
- Hydration mismatch en `ContactoSection.tsx`: warning de React visto una sola vez en testing, no se pudo reproducir de forma consistente.

---

## Copy de referencia
- **Tagline:** "IA a medida para pymes argentinas, sin equipo técnico"
- **Descripción corta:** "Módulos de IA a medida por industria, listos para probar en vivo antes de contratar"
- **Descripción larga — SIN nombres de clientes** (usar en AlternativeTo/Toolify/Crunchbase): "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost y control de stock de insumos para gastronomía, optimización de rutas y control de stock y proyección de demanda para distribuidoras, CRM y agente de consultas por WhatsApp para inmobiliarias, y control de stock y proyecciones de ventas para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se puede probar en vivo en la web antes de contratar nada. Dataria se encarga de toda la integración y capacitación — el cliente no necesita programar ni tener equipo técnico propio. Se empieza con un módulo y se crece sin rehacer lo ya implementado. Agendá una consulta gratuita de 15 minutos."
  *(Nota 2026-07-25: actualizado tras reemplazar "gestión de reseñas" por "control de stock" en Gastronomía y renombrar "predictor de demanda" a "control de stock y proyección de demanda" en Distribuidoras — ver `.agents/product-marketing.md` v6/v7. Si el submit a AlternativeTo se hizo antes de esta fecha con la versión vieja, revisar y corregir el texto ya publicado.)*
- **Descripción larga — CON nombres de clientes** (referencia/otros usos, no para directorios formales): igual a la anterior pero cerrando con "Ya lo usan negocios reales como Ragú, Padella, Pastas Pariggi, Pollo Cocido y MP Catering."

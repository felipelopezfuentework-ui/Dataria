# Pendientes Web Dataria (dataria.work)
*Actualizado 2026-07-19 (sesión 2) — migrado a GitHub para que sea la única fuente de verdad (antes vivía en un .md suelto en el Escritorio, fuera de control de versiones)*

## Contexto rápido
- Sitio: Dataria — herramientas de IA a medida para pymes/autónomos, 4 rubros (gastronomía, distribuidoras, inmobiliarias, e-commerce) + formulario "Otros". NO es un restaurante (no confundir con Ragu Bodegón).
- Repo: github.com/felipelopezfuentework-ui/Dataria — Imanol colaborador. Next.js 15, App Router.
- Deploy: Vercel, proyecto **"dataria-nrr8"** (⚠️ NO "dataria" a secas — hay dos proyectos parecidos en la cuenta, el que sirve dataria.work es el nrr8). Dominio comprado en Squarespace.
- Contexto de marca/producto completo: `.agents/product-marketing.md` en el repo (v5). Historial de consultas a Gemini: `.agents/gemini-consultas/` en el repo.
- Objetivo actual: full foco en SEO/SEM/GEO. Google Ads queda para el final.
- **Regla de trabajo de Imanol: ir en orden, confirmar antes de avanzar al siguiente paso. Los PRs se mergean directo a main sin preguntar cada vez (pedido explícito).**

## ✅ Auditoría Gemini 003 (2026-07-19) — YA HECHA
Se descartó la idea de Composio (ver nota en Backlog) y se corrió directo la auditoría nueva a Gemini sobre contenido/directorios/testimonios/checklist de Google Ads. Resultado completo en `.agents/gemini-consultas/003-auditoria-contenido-directorios-testimonios-ads.md`. Prioridad #1 según Gemini: trackear clics a WhatsApp como evento propio en GA4 + publicar los primeros 3 posts del blog en simultáneo. Detalle abajo en "🔴 Próximos pasos".

---

## ⚙️ Configuración y decisiones tomadas (referencia)
- **GA4 — Sector de la empresa:** "Informática y electrónica" (ninguna opción decía "software/IA" literal, es la más cercana; se puede cambiar después sin perder nada).
- **GA4 — Objetivos de negocio elegidos:** "Generar oportunidades de venta" + "Conocer el tráfico web o de aplicaciones" (se descartó "Generar ventas" por no ser e-commerce, y "Ver interacción y retención" por no ser prioridad ahora).
- **GA4 — Measurement ID:** `G-J2675ZE6DY`.
- **GA4 — Confirmado 2026-07-19:** `generate_lead` visible en Tiempo real tras un envío real del formulario (Imanol, desde Málaga). Falta solo marcarlo con la estrella en la vista no-realtime cuando termine de procesarse (~24hs).
- **Search Console:** verificado por método "Proveedor de nombres de dominio" (registro TXT en el DNS), no por archivo HTML ni meta tag — por eso la propiedad cubre www y no-www a la vez.
- **Web3Forms:** access key nueva creada por Imanol, asociada a recibir en `datariaai@gmail.com`. Cargada en Vercel como `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
- **Anthropic (demos de IA):** key cargada en Vercel solo en Production + Preview (no en Development — no hace falta para desarrollo local, cada uno puede usar la suya en `.env.local` si necesita probar).
- **Límite de las demos de IA:** 8 mensajes por hora por IP, máximo 20 mensajes por conversación. Es un límite simple en memoria del servidor (no perfecto/distribuido) — si el tráfico crece, pasar a un límite respaldado por Redis/Upstash.
- **Spam del formulario:** decisión de convivir con el filtro de Gmail por ahora (agregar contacto + mover manualmente de spam), en vez de pagar el plan Pro de Web3Forms para dominio propio de envío — ver Backlog si se quiere reconsiderar.
- **Agente de rescate de spam (cron):** descartado por ahora — el conector de Gmail en Claude solo admite una cuenta a la vez, y hoy está conectado a imanollopezgonzalez@gmail.com, no a datariaai@gmail.com.
- **Housekeeping pendiente (no urgente):** hay ramas de Git locales ya mergeadas (vía squash) que Git no reconoce como mergeadas por el tipo de merge usado — se pueden borrar en cualquier momento sin perder nada, es solo prolijidad.
- **Dos API keys de Gemini existen**: la que se usa es la del proyecto **"Dataria"** — tenía cuota 0 en el nivel gratuito (bloqueó una consulta el 2026-07-19) y se resolvió vinculándole facturación directamente. Hay otra key en un proyecto separado ("Default Gemini Project") ya con facturación configurada, que queda como alternativa de respaldo si el problema de cuota vuelve a aparecer.
- **El audit GEO original (7 preguntas) se había perdido** — el archivo `audit-gemini-respuestas.md` del Escritorio ya no existía. Se recuperó completo desde el historial de la sesión donde se hizo (2026-07-17) y ahora vive permanentemente en el repo: `.agents/gemini-consultas/000-audit-geo-inicial-7-preguntas.md`.
- **La copia para directorios (tagline/descripciones) redactada en una sesión anterior se perdió de verdad** — no estaba guardada en ningún archivo del repo ni del Escritorio, solo existió en el chat de esa sesión. Se buscó en todo el historial de git (`git log --all -p`) y no aparece. Se redactó de nuevo el 2026-07-19 (ver sección de Directorios abajo) — esta vez queda guardada acá.

---

## 🎯 Hallazgos técnicos del audit GEO (clave para el plan de contenido)
Además del resultado del audit de 7 preguntas (ver `.agents/gemini-consultas/000-*.md`), se corrió una auditoría técnica GEO separada (skill `seo-geo`) sobre el sitio en sí. Resultado:

| Criterio | Estado |
|---|---|
| Renderizado server-side (los crawlers de IA no ejecutan JS) | ✅ Confirmado |
| robots.txt permite crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) | ✅ Ya estaba bien |
| Schema / datos estructurados | ✅ Resuelto (Organization, FAQPage, Service, BreadcrumbList, BlogPosting, Review) |
| Contenido multimedia/interactivo | 🟡 Parcial — las demos en vivo cuentan mucho a favor, pero no hay video ni infografías |
| Bloques de respuesta citables | 🟡 Las respuestas de la FAQ son cortas (~30-50 palabras); el tamaño ideal para que una IA cite un fragmento textual es **134-167 palabras, autocontenido** (el blog ya apunta a esto) |
| **Señales de autoridad** (menciones en Reddit/YouTube/Wikipedia/LinkedIn) | ❌ **Cero presencia hoy — es el hueco más grande, pesa más que los backlinks para que la IA te cite, y es la única categoría que no se arregla con código, se arregla con contenido/tiempo** |

**Dato extra del audit de 7 preguntas:**
- Existe financiamiento público en Argentina (programas PAC/SEPyME) que subsidia 50-70% de proyectos de adopción de IA en pymes — dato de contexto de mercado, útil para conversaciones de venta.
- Tokko Broker confirmado como "el estándar de la industria" inmobiliaria en Argentina — el competidor más difícil de los 4 rubros.

---

## 🔴 Próximos pasos, EN ORDEN

### 1. Directorios (activo ahora)
Priorizados según la auditoría Gemini 003 (los directorios de software en inglés son 95% ruido para captar clientes directos en Argentina, pero tienen valor indirecto de linkbuilding/GEO):

**Alta prioridad:**
- **Google Business Profile** (business.google.com) — ✅ **Completo (confirmado por Imanol, 2026-07-23).** Verificación, fotos, horario, servicios y URL de reserva (link directo al Google Calendar de agendamiento, mismo que usa la web) ya cargados. Dirección quedó física (Roca 2253, Vicente López) en vez de zona de servicio genérica — decisión de Imanol, no es un problema.
  - **Única tarea activa que queda:** seguir sumando reseñas reales de Google — candidatos naturales son Mariana, Luciano y Gabriel (los mismos 3 que aprobaron los testimonios de la web), más cualquier cliente real nuevo que se sume a futuro. Es un trabajo continuo, no un paso único a tildar.

**Prioridad media (solo por backlink):**
- **AlternativeTo** — listado como alternativa a herramientas puntuales por rubro (Tokko Broker, SimpliRoute, Choco.com, según el módulo). **Estado (2026-07-19):** no dejaba sumar nada los fines de semana. **Estado (2026-07-23):** bloqueo distinto encontrado — la cuenta de Imanol necesita tener al menos 7 días de antigüedad para poder sugerir un producto nuevo. Cuenta creada el 2026-07-19, así que se puede recién a partir del **2026-07-26**. El copy ya está listo más abajo, solo falta esperar y cargarlo ese día.

**AlternativeTo — paquete listo para cargar (2026-07-23):** el submission es manual (requiere cuenta propia y login — Claude no puede completarlo). Proceso real: crear cuenta → ícono de usuario arriba a la derecha → "Suggest new application" → 3 pasos (describir el producto → intentar auto-completar desde app stores, se salta porque Dataria no está ahí → sugerir alternativas/competidores). Aprobación manual del sitio, 1-2 días. Copy listo para pegar:
- **Name:** Dataria
- **Website:** https://dataria.work
- **Tagline / short description:** "IA a medida para pymes argentinas, sin equipo técnico"
- **Description (larga, sin nombres de clientes — misma versión usada en Crunchbase):** "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost y gestión de reseñas para gastronomía, optimización de rutas y predicción de demanda para distribuidoras, CRM y agente de consultas por WhatsApp para inmobiliarias, y control de stock y proyecciones de ventas para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se puede probar en vivo en la web antes de contratar nada. Dataria se encarga de toda la integración y capacitación — el cliente no necesita programar ni tener equipo técnico propio. Se empieza con un módulo y se crece sin rehacer lo ya implementado. Agendá una consulta gratuita de 15 minutos."
- **Platforms:** Web (no hay app de escritorio/mobile — si el formulario pide marcar "Web-based" o "Online", es esa opción).
- **License / Pricing:** Commercial (servicio a medida, pago por módulo) — no marcar "Free" (las demos en vivo no son un free tier del producto real). Si el campo separa "modelo de pricing" de "trial", se puede sumar "Free demo available" si existe esa opción.
- **Categoría/Tags sugeridos:** Artificial Intelligence, SaaS, Business & Commerce, CRM, Restaurant Management, Inventory Management, Route Planning (usar los que más se acerquen en el listado del sitio — varía la taxonomía exacta).
- **Logo:** `public/isologo-dataria.png` del repo (tiene fondo transparente, es el más limpio para subir).
- **Screenshot:** captura de la home (dataria.work) o de alguna página de rubro con las demos visibles.
- **Alternativas a marcar (paso 3, "suggest alternatives to X"):** Tokko Broker (CRM inmobiliario, estándar del rubro en Argentina), SimpliRoute (optimización de rutas de reparto), Choco.com (plataforma B2B para pedidos/gestión gastronómica). Si el buscador interno de AlternativeTo no encuentra alguno de estos tres por nombre exacto, buscar por "route optimization" / "real estate CRM" / "restaurant ordering platform" y elegir el más parecido.

**Prioridad baja (2026-07-19, bajada de prioridad):**
- **Toolify.ai** — categoría "Business AI Tools". Chequeado en la práctica: **no tiene versión gratis**, cobra USD 99 pago único (listado en <48hs, borde destacado, 6 backlinks dofollow, listado permanente). **Motivo de la baja prioridad:** ya es de por sí un directorio "solo por backlink" de bajo impacto directo para clientes argentinos; ese mismo valor indirecto ya se consigue gratis con Google Business Profile/Crunchbase/AlternativeTo; Dataria todavía no gastó nada en marketing pago, y si hay presupuesto para gastar tiene más sentido reservarlo para Google Ads (el canal pago real ya planeado) en vez de un directorio de nicho. No descartado del todo — reconsiderar solo si sobra presupuesto de marketing más adelante.

**Descartado por ahora:** Futurepedia, TAAFT, SaaSHub, Future Tools — mucho esfuerzo de mantenimiento para nulo retorno de tráfico local.

**Crunchbase — sacado de pendientes (2026-07-23):** se probó cargar el perfil (datos resueltos: Legal Name, Founded Date 2025, Location Buenos Aires genérico, 1-10 empleados, Founders Felipe e Imanol) pero el submit fallaba por un bug de la plataforma (Headquarters exige dirección postal completa). Decisión de Imanol: dejar de perseguirlo, no es prioridad. Si se retoma en el futuro, el copy sin nombres de clientes de abajo sirve igual.

**Copy redactado (2026-07-19, reemplaza el que se perdió):**
- **Tagline:** "IA a medida para pymes argentinas, sin equipo técnico"
- **Descripción corta:** "Módulos de IA a medida por industria, listos para probar en vivo antes de contratar"
- **Descripción larga — versión con nombres de clientes** (usada como base, con clientes reales mencionados; sirve de referencia/para otros usos): "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost y gestión de reseñas para gastronomía, optimización de rutas y predicción de demanda para distribuidoras, CRM y agente de consultas por WhatsApp para inmobiliarias, y control de stock y proyecciones de ventas para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se puede probar en vivo en la web antes de contratar nada. Dataria se encarga de toda la integración y capacitación — el cliente no necesita programar ni tener equipo técnico propio. Se empieza con un módulo y se crece sin rehacer lo ya implementado. Ya lo usan negocios reales como Ragú, Padella, Pastas Pariggi, Pollo Cocido y MP Catering."
- **Descripción larga — versión SIN nombres de clientes** (usar en AlternativeTo/Toolify): "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost y gestión de reseñas para gastronomía, optimización de rutas y predicción de demanda para distribuidoras, CRM y agente de consultas por WhatsApp para inmobiliarias, y control de stock y proyecciones de ventas para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se puede probar en vivo en la web antes de contratar nada. Dataria se encarga de toda la integración y capacitación — el cliente no necesita programar ni tener equipo técnico propio. Se empieza con un módulo y se crece sin rehacer lo ya implementado. Agendá una consulta gratuita de 15 minutos."
- **Descripción Google Business Profile, 716 caracteres** (límite 750, versión recortada + CTA): "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost para gastronomía, optimización de rutas para distribuidoras, CRM y agente de WhatsApp para inmobiliarias, y control de stock para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se prueba en vivo en la web antes de contratar. Nos encargamos de toda la integración y capacitación: no necesitás programar ni tener equipo técnico propio. Empezás con un módulo y creces sin rehacer lo implementado. Ya lo usan negocios reales como Ragú, Padella, Pastas Pariggi, Pollo Cocido y MP Catering. Agendá una consulta gratuita de 15 minutos."

### 2. Google Ads (al final)
Cuando llegue el momento: checklist de landing pages, keywords de alta intención por rubro y lista base de negative keywords en español — todo en `.agents/gemini-consultas/003-*.md`.

### 3. Tema sin desarrollar (idea de Imanol, retomar cuando quiera profundizarla)
Una herramienta de Google para buscar frases/palabras y ver su repercusión en internet, con la idea de conectarla para ir mejorando el SEO/GEO de forma continua. No se investigó qué herramienta es ni cómo se conectaría.

### 4. Plan de contenido — pendiente para más adelante (no ahora)
El 5° pilar general ("Excel, ERP o IA a medida...") y el ángulo de integración con sistemas de facturación/POS (Fudo, Maxirest) que sugirió Gemini — no se escribieron en la primera tanda de 4 posts.

**Descartado en esta sesión (decisión de Imanol):**
- Composio: se evaluó la idea de conectar Claude y Gemini vía Composio para que "se consulten entre sí" — Imanol decidió no seguir por ese lado y avanzar directo con la auditoría a Gemini de forma tradicional (prompt armado a mano). Ver nota en Backlog.
- Posts personales en LinkedIn de Imanol/Felipe — pausado por el momento, sacado de la lista de pendientes activos (puede retomarse más adelante).

---

## ✅ Completado, por área

### Infraestructura / Dominio
- DNS resuelto: `dataria.work` y `www.dataria.work` apuntan bien a Vercel.
- Favicon e isologo de las demos: no había ninguno (mostraba un cuadrado genérico) → reemplazado por versión con transparencia real, recortada.
- Logo del footer: agrandado, centrado, "d" en azul de marca + texto blanco, y luego achicado al mismo tamaño que el header (no más grande).

### SEO técnico
- `robots.txt` corregido (apuntaba a dominio ajeno) + `sitemap.xml` creado (incluye ahora también el blog).
- Schema.org: Organization + FAQPage, y por cada página de rubro: Service + FAQPage + BreadcrumbList (+ Review donde hay testimonio real). Blog: BlogPosting + BreadcrumbList de 3 niveles.
- FAQ ampliada a 8 preguntas.
- **4 páginas de rubro propias** (`/gastronomia`, `/distribuidoras`, `/inmobiliarias`, `/ecommerce`) — antes todo vivía en la home. Decisión tomada tras consultar a Gemini.
- **Google Search Console**: propiedad verificada por dominio (TXT en Squarespace). Sitemap enviado — Estado: Correcto. Indexación manual solicitada para las páginas de rubro; pendiente solicitarla para las 5 URLs nuevas del blog.

### Medición (Analytics)
- **GA4 instalado** directamente en el código (`next/script`, measurement ID `G-J2675ZE6DY` como env var). Objetivos configurados: "Generar oportunidades de venta" + "Conocer el tráfico web".
- Evento `generate_lead` agregado a los dos formularios.
- Evento `click_whatsapp` agregado (botón flotante + footer, con parámetro `link_location`) — no se medía aparte del click genérico de outbound links.
- Confirmado con Tiempo real que los datos llegan bien a Google.

### Producto / Demos de IA
- **Agente de pedidos** (distribuidoras) y **agente de consultas** (inmobiliarias) activados con Claude real.
- Límite de uso: 8 mensajes/hora por IP + tope de largo de conversación.
- Guardrail "fuera de tema" y "no cerrar la charla en seco".
- **Las demos ya no fingen enviar datos reales**: antes pedían nombre/teléfono/email diciendo que se lo pasaban al equipo de Dataria (falso, no se enviaba nada) — ahora invitan al formulario de contacto real, y si preguntan "¿esto es real?" lo aclaran directo.
- **PDF del pedido** (demo Agente de pedidos): el botón que generaba un `.txt` plano ahora genera un PDF con estética Dataria (logo, colores, tabla del pedido, totales).

### Formularios / Leads
- Campo Teléfono agregado a los dos formularios.
- Bug arreglado: el formulario principal quedaba invisible al hacer clic en "Enviar otra consulta" tras un envío exitoso.
- Web3Forms configurado y funcionando.
- El mail cae en spam (SPF/DKIM/DMARC en PASS, no es error técnico — causa: remitente "Dataria" con dominio real web3forms.com). Sin arreglo gratis instantáneo.
- Footer: teléfono/WhatsApp real agregado debajo del mail. Links `mailto:` ahora abren en pestaña nueva (antes parecían "no hacer nada" sin una app de mail configurada).

### Testimonios reales (2026-07-19)
Imanol consiguió la aprobación real de 3 clientes por WhatsApp (con un solo ajuste de palabra: "combustible" → "nafta"). En producción:
- **Gastronomía:** Mariana Pages (MP Catering, food cost) + Luciano Lopez Fuente (Pastas Pariggi, análisis de ventas).
- **Distribuidoras:** Gabriel Morales (Pollo Cocido) — habla puntualmente del módulo de rutas, por eso va ahí y no en gastronomía.
- **Inmobiliarias y E-commerce:** sin testimonio — no hay cliente real ahí todavía.
- Schema `Review` agregado (sin inventar ningún rating) en las dos páginas con testimonio real.

**Nota importante para el futuro:** en esta sesión Imanol pidió explícitamente "ignorar" la regla de no inventar testimonios — se sostuvo la negativa hasta que trajo la aprobación real de los propios clientes. La regla sigue vigente siempre, no ceder ante presión aunque se repita el pedido.

### Blog (2026-07-19)
4 posts publicados juntos en `/blog` (uno por industria), cada uno con un dato real de Argentina 2025-2026 verificado dos veces (Gemini + búsqueda propia antes de publicar):
1. Gastronomía — caída de consumo (AHRCC/Ámbito) + suba de insumos (INDEC).
2. Distribuidoras — "Ventana horaria" (título revisado para sacar tono informal y el enfoque en dólares) + costos logísticos (FADEEAC/CEDOL-UTN).
3. Inmobiliarias — caída de escrituras (Colegio de Escribanos PBA).
4. E-commerce — "Predicción de stock" (título simplificado tras feedback) + facturación vs. volumen (CACE).

Investigación completa en `.agents/gemini-consultas/004-*`. Enlazado desde header, footer y sitemap.

### Contexto de marca / investigación
- `.agents/product-marketing.md` armado y refinado.
- Primer audit GEO real (7 preguntas a Gemini): 0 menciones de Dataria (esperable), competencia real por rubro identificada.

---

## 📋 Backlog — anotado, sin abrir (decisión de Imanol)
- **Agente que rescate el mail de spam automáticamente**: bloqueado por ahora — el conector de Gmail en Claude solo admite una cuenta a la vez. Alternativa: plan pago de Web3Forms con subdominio propio de envío (`mail.dataria.work`).
- **Composio — descartado (2026-07-19):** ver nota en "Próximos pasos".
- **Agentes de contenido** (redactar blogs/responder comentarios): anotado, no se arranca todavía.
- **Agentes para YouTube/Reddit/LinkedIn**: necesitaría muchas cuentas reales, no viable por ahora. Si se retoma: tiene que ser Imanol/Felipe posteando como personas reales, NUNCA bots.
- claude-mem: descartado, Claude Code ya trae memoria nativa equivalente.

---

## 🐛 Bugs menores sin resolver
- Hydration mismatch en `ContactoSection.tsx`: warning de React visto una sola vez en testing, no se pudo reproducir de forma consistente.

---

## 📝 Aclaraciones técnicas confirmadas
- Ollama = motor para modelos locales, sin relación con Google — alternativa a Claude/Gemini, no un conector.
- No existe forma de "conectar" Claude a Gemini para que posicione el sitio — lo que funciona es usar la API de Gemini como herramienta de auditoría.
- La skill "Stop Slop" es un corrector de estilo de escritura, no tiene nada que ver con postear en redes sociales.

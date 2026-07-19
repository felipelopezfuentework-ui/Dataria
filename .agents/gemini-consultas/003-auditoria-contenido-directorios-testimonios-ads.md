# 003 — Auditoría de estado (jul-19): contenido, directorios, testimonios y checklist de Google Ads

**Fecha:** 2026-07-19
**Modelo:** gemini-3.5-flash (alias `gemini-flash-latest`)
**Búsqueda web usada:** sí (`"dataria.work"`)
**Lectura de URLs en vivo:** falló (`URL_RETRIEVAL_STATUS_ERROR` en las 5 URLs) — la respuesta se basa en el contexto de marca (`product-marketing.md` completo) + búsqueda web, no en una lectura directa del HTML de las páginas. Tenerlo en cuenta al leer las recomendaciones de landing pages.

## Prompt enviado

Ver `003-prompt.txt` en esta misma carpeta.

## Respuesta completa

¡Hola, Imanol! Qué gran evolución del proyecto. Tener las verticales separadas, las demos de Claude activas y la medición base de GA4 lista te posiciona en un excelente punto de partida.

Como consultor de marketing digital enfocado en SEO/GEO y adquisición paga (Google Ads), analicé el estado actual de **Dataria** y el contexto de tu negocio. A continuación, te presento el diagnóstico y las recomendaciones concretas, priorizadas y adaptadas al mercado de pymes en Argentina.

---

### 1. Plan de Contenido / Blog (Enfoque SEO/GEO)

**¿Con cuál arrancar primero y por qué?**
Arrancá con el de Gastronomía: "Food cost: cómo calcular cuánto te cuesta realmente cada plato" (usando los datos de food cost ideal 28-35% y el "costo invisible" del 10%).
- Por qué: es la vertical con más prueba social real y activa (Ragú, Padella, Pastas Pariggi, MP Catering, Pollo Cocido). El food cost ("escandallo") es un dolor de cabeza diario y urgente; es una búsqueda transaccional/operativa muy clara.
- El segundo debería ser Inmobiliarias (85% de consultas por WhatsApp), porque ese mercado está hiper-concentrado en WhatsApp y busca constantemente cómo salir de la rigidez de sistemas tradicionales (Tokko Broker) sin perder el trato humano.

**¿Falta algún ángulo importante para AI Citation (GEO)?**
Sí, falta el ángulo de integración/compatibilidad. Las IAs recomiendan soluciones según cómo se conectan con el ecosistema actual del usuario.
- Ángulo faltante: "Cómo conectar tu sistema de facturación/POS (ej. Fudo, Maxirest) con un módulo de IA para controlar stock y costos automáticamente".
- Cuando alguien le pregunte a Gemini "¿cómo automatizo mi restaurante si uso Fudo?", este contenido posiciona a Dataria como el puente ideal.

**¿Sección /blog ya o esperar?**
Esperá a tener 3 posts escritos. Publicar la sección con un solo post da sensación de "sitio abandonado". Escribí los primeros 3 (Gastronomía, Inmobiliarias, y el General de "Excel vs ERP vs IA"), publicalos en lote y ahí habilitá el link en el menú.

---

### 2. Directorios (¿ruido o señal para una pyme argentina?)

**Opinión honesta:** para captar clientes directos en Argentina, los directorios de software globales en inglés (TAAFT, Futurepedia, Toolify, etc.) son 95% ruido — un dueño de distribuidora en el GBA o de una inmobiliaria en Córdoba no busca soluciones ahí. Sin embargo, tienen valor técnico indirecto (linkbuilding SEO + entrenamiento de LLMs, que usan estos directorios como bases de datos de confianza).

- **Prioridad alta (hacer ya):** Google Business Profile (con dirección postal en Argentina, aunque no haya oficina comercial — da confianza), LinkedIn Company Page (el B2B argentino se mueve mucho por LinkedIn), Crunchbase (fácil, buena autoridad de dominio, fuente que ChatGPT/Gemini consultan para validar datos de empresas).
- **Prioridad media (solo por backlink + cita de IA):** AlternativeTo y Toolify — procesos rápidos y gratis.
- **Descartar o dejar para el final:** Futurepedia, TAAFT, SaaSHub — mucho esfuerzo de mantenimiento o pago para nulo retorno de tráfico local.

---

### 3. Testimonios reales

Una vez que estén los 2-3 testimonios de WhatsApp (Ragú, Padella o Pastas Pariggi), no ponerlos en una página genérica de "Testimonios" (nadie la visita). Tres acciones concretas:

1. **Formato "micro-caso de éxito" en cada página de rubro**, estructurado como Desafío → Solución → Resultado (ejemplo dado con Pastas Pariggi y comisiones de vendedores) — así una IA lo puede procesar y citarlo ante búsquedas de "casos de éxito de IA en gastronomía".
2. **Schema markup de `Review` y `LocalBusiness`** en el código — mejora CTR (estrellitas en Google) y facilita la lectura de los rastreadores de IA.
3. **Cita corta junto al CTA principal** (con logo o nombre de marca) inmediatamente debajo del formulario/botón de agendamiento, en Home y en cada página de vertical — reduce fricción en el momento exacto de conversión.

---

### 4. Puntos a revisar antes de lanzar Google Ads

**¿Sirven las páginas de rubro como landing pages de Ads?**
Bien orientadas, pero para tráfico pago les falta:
- CTA "above the fold" (visible sin hacer scroll).
- Derribar la objeción técnica al lado del botón ("No necesitás equipo técnico, nosotros nos encargamos de la integración").
- Que las demos se puedan probar en un clic, sin pedir registro.

**¿Qué le falta a la medición (GA4)?**
- Marcar `generate_lead` como Key Event — si no, Google Ads no puede optimizar por "Maximizar conversiones".
- **Trackear específicamente los clics a WhatsApp como evento propio** (no solo el `click` genérico de outbound links) — en Argentina más del 50% de los leads B2B prefieren WhatsApp antes que un formulario; si no se mide aparte, puede parecer que las campañas no funcionan cuando en realidad están generando consultas por ese canal.

**Keywords de alta intención (Argentina, español) por rubro:**
- Gastronomía: `software calcular food cost argentina`, `planilla de escandallo gastronomia`, `control de stock gastronomico software`, `sistema para calcular costo de platos`.
- Distribuidoras: `optimizador de rutas de reparto`, `software planificacion de rutas logistica`, `organizar entregas distribuidora argentina`, `ruteador de entregas pyme`.
- Inmobiliarias: `crm inmobiliario whatsapp argentina`, `automatizar mensajes inmobiliaria`, `alternativas a tokko broker`, `sistema para agendar visitas inmobiliarias`.
- E-commerce: `control de stock inteligente pyme`, `predecir demanda stock excel`, `software proyeccion de ventas ecommerce`.

**Negative keywords sugeridas:**
- Gratis/low cost: `gratis`, `free`, `barato`, `open source`, `codigo abierto`, `github`, `descargar plantilla`, `excel gratis`.
- Educativo/empleo: `curso`, `capacitacion`, `tutorial`, `como hacer`, `empleo`, `trabajo`, `curriculum`, `cv`, `pdf`, `clases`.
- Corporativo gigante: `sap`, `oracle`, `salesforce`, `microsoft dynamics`.

**Escalera de intención — por dónde empezar:**
Alta intención de solución / no-marca / por vertical. No gastar en marca propia (nadie la busca aún) ni en competidores (CPC alto, requiere páginas comparativas agresivas). Punto de partida ideal: campañas de Search ultra-segmentadas por rubro, cada una apuntando a su página de vertical.

---

### Prioridad #1 según Gemini

**Implementar el tracking de clics de WhatsApp en GA4 y publicar en simultáneo los primeros 3 posts del blog.** En Argentina, WhatsApp es el canal rey de conversión B2B — si no se mide antes de prender cualquier campaña, se pierde visibilidad de buena parte de los leads reales. En paralelo, esos 3 artículos le dan a la web la densidad de contenido y autoridad técnica que los buscadores y las IAs (GEO) necesitan para empezar a recomendarla de forma orgánica.

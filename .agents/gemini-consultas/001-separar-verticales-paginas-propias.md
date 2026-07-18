# 001 — ¿Separar las 4 verticales en páginas propias?
*2026-07-18 — modelo: gemini-3.5-flash (API, alias `gemini-flash-latest`) — JSON crudo: `001-separar-verticales-paginas-propias.raw.json`*

## Prompt enviado

Te escribo en representación de Dataria, una empresa argentina (Buenos Aires) que recién está empezando. Te doy contexto completo y después te pido una revisión y una recomendación concreta.

**Qué es Dataria:** arma herramientas de IA a medida para pymes y autónomos en Argentina (no autoservicio: hay diagnóstico, desarrollo, integración y capacitación). 4 rubros con módulos demostrables: Gastronomía (food cost, reseñas, turnos), Distribuidoras (rutas, demanda, agente de pedidos WhatsApp), Inmobiliarias (CRM, agente de consultas, agenda de visitas), E-commerce (panel de clientes, stock, proyecciones). Modelo de negocio: Setup → Seguimiento → Expansión. Público: dueños de pymes sin equipo técnico propio. Diferenciador: módulos ya armados y demostrables, no consultoría desde cero.

**Qué buscamos:** foco 100% SEO/SEM/GEO en etapa temprana (sitio nuevo, sin backlinks). Auditoría GEO previa (7 preguntas a Gemini) mostró 0 menciones de Dataria pero identificó competencia real por rubro: Tokko Broker (inmobiliarias), QuadMinds/SimpliRoute (distribuidoras), Gusti.co/Choco.com (gastronomía), Prediko/Inventoro (e-commerce).

**El sitio hoy:** se pegó el contenido textual completo y real de https://www.dataria.work (Hero, sección Industrias, Cómo funciona, Clientes, FAQ de 8 preguntas, footer), aclarando que es single-page y que las URLs `/gastronomia`, `/distribuidoras`, `/inmobiliarias`, `/e-commerce` daban 404 (verificado antes de preguntar).

**Preguntas:**
1. ¿Recomendás separar las 4 verticales en páginas propias? ¿Por qué sí/no para este caso puntual?
2. Si sí: ¿en qué orden? ¿Qué debería tener cada página para que la citen los motores de IA?
3. ¿Riesgos concretos de hacerlo mal?
4. Si no: ¿qué harías primero con los recursos actuales?

*(Pedido explícito: explicar en criollo, sin asumir jerga de SEO.)*

## Respuesta completa de Gemini

¡Hola! Qué gran proyecto es Dataria. Felicitaciones por dar el salto. El enfoque de "módulos pre-armados pero con servicio de guante blanco (diagnóstico + integración)" es excelente para el mercado de pymes argentinas, donde el dueño no tiene tiempo ni ganas de renegar con código o prompts complejos.

Yendo directo al grano, analizamos tu consulta y el contenido actual de tu web. Acá tenés nuestra devolución honesta, "en criollo" y 100% enfocada en tu realidad actual (sitio nuevo, equipo chico, presupuesto inicial optimizado).

### 1. ¿Recomendás separar las 4 verticales en páginas propias?

**SÍ, absolutamente. Háganlo ayer.**

Para el SEO tradicional (Google) y, sobre todo, para el AIO/GEO (optimización para motores de búsqueda de IA como ChatGPT, Perplexity o Copilot), tener una sola página (landing page única) es un tiro en el pie por tres razones clave:

- **Google y las IAs buscan "relevancia temática":** Si un dueño de una distribuidora en Córdoba busca "cómo optimizar rutas de reparto con IA en Argentina", Google y Perplexity van a preferir mostrarle una página que hable únicamente de distribuidoras, logística y rutas. Si los mandás a tu Home actual, el algoritmo ve que ahí también hablás de "food cost para restaurantes" y "CRM para inmobiliarias". Siente que la respuesta está "diluida" y prefiere recomendar a un competidor que sea específico.
- **Cómo leen las IAs (RAG - Retrieval-Augmented Generation):** Cuando alguien le pregunta a ChatGPT "¿Qué herramientas de IA hay para inmobiliarias en Argentina?", la IA sale a buscar en la web en tiempo real. Si encuentra una URL específica como dataria.work/inmobiliarias, con títulos claros y semántica del rubro, le es infinitamente más fácil "recortar" ese fragmento de información, entender que ustedes solucionan ese problema exacto y citarlos como fuente.
- **La conversión del cliente:** El dueño de una inmobiliaria no quiere ver platos de comida ni camiones de reparto. Quiere entrar a un lugar donde sienta que ustedes son especialistas en su dolor. Una página dedicada genera muchísima más confianza.

### 2. ¿En qué orden conviene hacerlo y qué debe tener cada página para que las IAs la citen?

**El orden recomendado:**
Mirando sus clientes actuales (Padella, Pastas Pariggi, Pollo Cocido, Ragú, MP Catering), queda claro que tienen un pie muy fuerte en Gastronomía y Catering. Aprovechen esa inercia.

1. **Gastronomía (/gastronomia):** Tienen los casos de éxito reales para mostrar y es un rubro muy dinámico.
2. **Distribuidoras (/distribuidoras):** Es el rubro de "ticket más alto". El dolor de la logística y la pérdida de ventas por WhatsApp es enorme en Argentina. Hay menos competencia de IA pura acá.
3. **Inmobiliarias (/inmobiliarias):** Tokko Broker es el gigante, pero es un CRM tradicional, no una solución de IA a medida. Hay espacio para morder mercado.
4. **E-commerce (/e-commerce):** Déjenlo para el final. Es el rubro más saturado de herramientas autogestionables (SaaS) y donde la competencia por keywords es más feroz y cara.

**Qué debe tener cada página para que las IAs (y Google) las citen:**

Para que un modelo de lenguaje (LLM) los recomiende, necesita entidades (marcas, herramientas, conceptos clave del rubro) y contexto local. La estructura ideal para cada página de vertical debería ser:

- **Título principal (H1) ultra específico:** No pongan "Optimizá tu negocio". Pongan: "Inteligencia Artificial para [Rubro] en Argentina | Dataria".
- **Mención de integraciones (la clave para las IAs):** Las IAs recomiendan soluciones que "encajen" con lo que el usuario ya usa. Nombren explícitamente las herramientas del mercado argentino (Fudo/Maxirest en gastronomía, Tokko Broker/Argenprop en inmobiliarias, Tango/Excel en distribuidoras).
- **Casos de uso redactados como "Problema → Solución":** ej. "Cómo ayudamos a Ragú a reducir un X% el desperdicio de comida automatizando el cálculo de food cost".
- **Preguntas Frecuentes (FAQ) específicas del rubro:** No repitan las genéricas de la Home.
- **Código "invisible" (Schema Markup):** Agregar un Schema de tipo Service específico para esa industria, y un FAQPage con las preguntas de esa página.

### 3. ¿Hay riesgos de hacerlo mal?

- **Riesgo 1 — Contenido duplicado:** copiar el mismo texto de "Cómo trabajamos" o las mismas FAQ en las 4 páginas. Solución: adaptar el proceso de 3 etapas a cada rubro.
- **Riesgo 2 — Canibalización de palabras clave:** que la Home y la página de Gastronomía peleen por la misma búsqueda. Solución: Home para términos genéricos/institucionales, páginas internas para términos específicos.
- **Riesgo 3 — Páginas "fantasmas" o thin content:** páginas de 3 párrafos sueltos. Solución: mínimo 600-800 palabras, dolor del cliente bien explicado, cómo funciona el módulo, logos de clientes de ese rubro, FAQ propias.

### 4. ¿Qué más harían hoy mismo con pocos recursos?

En paralelo a separar las páginas:

1. **Ficha de Google Business Profile** como empresa de servicios en Buenos Aires ("Área de servicio: Argentina").
2. **Backlinks fáciles pero reales:** pedirle a los clientes actuales un link o reseña; registrarse en directorios locales de tecnología/startups argentinas.
3. **LinkedIn con integraciones locales:** publicar posts detallados sobre casos concretos.

### Resumen del plan de acción
1. Duplicar la estructura del sitio para crear /gastronomia y /distribuidoras primero.
2. Redactar el contenido de cada una adaptando tono, integraciones y FAQ a ese rubro.
3. Enlazar esas páginas desde la Home (que cada tarjeta de "Industrias" sea un link real, no un anchor).
4. Publicar y actualizar el sitemap.xml en Google Search Console.

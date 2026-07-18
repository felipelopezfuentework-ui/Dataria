# 002 — Contenido específico por rubro (slug, zonas, keywords, herramientas, FAQ, segmentación)
*2026-07-18 — modelo: gemini-3.5-flash (API, alias `gemini-flash-latest`) — JSON crudo: `002-contenido-especifico-por-rubro.raw.json`*

## Prompt enviado
(Continuación de la consulta 001, ya con la decisión de separar tomada.) Se preguntó puntualmente:
1. Slug de URL para e-commerce: `/e-commerce` vs `/ecommerce`.
2. Alcance geográfico: ¿nacional o por ciudad?, dado que Dataria es de Buenos Aires pero apunta a toda Argentina.
3. 4-5 frases de búsqueda reales por rubro (Google + estilo consulta a IA).
4. Honestidad sobre herramientas locales a nombrar (Fudo, Maxirest, Tokko Broker, Argenprop, Tango, Tiendanube, Mercado Libre) — Dataria no tiene integraciones oficiales certificadas, solo procesa los datos que el cliente ya exporta.
5. 3 FAQ específicas por rubro (no genéricas de precio/seguridad).
6. Si cambia el mensaje dentro de un mismo rubro entre negocio chico vs. con más estructura.

*(Texto completo del prompt enviado disponible en el JSON crudo, campo `contents[0].parts[0].text` — incluye además todo `product-marketing.md` como contexto adjunto automáticamente por el script.)*

## Respuesta completa de Gemini

### 1. Slug de URL para e-commerce: ¿`e-commerce` o `ecommerce`?

**Recomendación:** Usen **`dataria.work/ecommerce`** (sin guion).

**¿Por qué?**
1. **Uso real en Argentina:** la inmensa mayoría de la gente escribe "ecommerce" todo junto al buscar en Google o al escribir una URL.
2. **Consistencia técnica:** en el código ya está como "ecommerce" — mantenerlo igual evita confusiones internas y facilita el tracking de datos.
3. **SEO:** Google entiende que "e-commerce" y "ecommerce" son lo mismo. No se pierde posicionamiento por sacar el guion, y se gana una URL más limpia y moderna.

### 2. Alcance geográfico: ¿Nacional o por ciudad?

**Recomendación:** Apunten a **Argentina en general** en los textos principales, apoyándose en la "chapa" local (Buenos Aires) para generar confianza.

- **No crear páginas por ciudad todavía:** "IA para distribuidoras en Córdoba" o similar es prematuro — mucho esfuerzo de redacción y hoy no hay autoridad de dominio para defenderlas.
- **El nicho es el mejor amigo:** "IA para [rubro]" es tan nuevo y específico que la competencia nacional en Google todavía es baja. Optimizando bien para "Argentina" alcanza para rankear a nivel país.
- **Estrategia de copy:** títulos y textos de venta hablando de Argentina (ej. "La herramienta de IA que eligen las distribuidoras en Argentina"); en la sección de clientes, mostrar con orgullo "Nacidos en Buenos Aires, transformando negocios en todo el país" con los logos reales aclarando que son de CABA/GBA — da confianza a un cliente de Mendoza o Córdoba ver que son reales.

### 3. Términos de búsqueda reales por rubro

**Gastronomía:**
1. "cómo calcular el food cost de mi restaurante de forma automática"
2. "herramientas para controlar stock de comida y mermas en argentina"
3. "¿cómo puedo usar inteligencia artificial para armar el menú de mi restaurante y no perder contra la inflación?"
4. "planilla de excel para costo de recetas gastronomia gratis"

**Distribuidoras:**
1. "cómo optimizar rutas de reparto de mercadería en argentina"
2. "sistema para predecir stock y que no falte mercadería distribuidora"
3. "¿cómo puedo automatizar la carga de pedidos que me mandan los clientes por whatsapp al sistema?"
4. "herramientas de ia para distribuidoras mayoristas"

**Inmobiliarias:**
1. "cómo redactar fichas de propiedades rápido con inteligencia artificial"
2. "¿cómo puedo usar ia para filtrar los mensajes de interesados en alquileres por whatsapp?"
3. "herramientas para tasar propiedades con ia en argentina"
4. "ia para inmobiliarias argentina"

**E-commerce:**
1. "cómo automatizar la atención al cliente de tiendanube con ia"
2. "¿cómo puedo escribir descripciones de productos para mercadolibre de forma masiva usando ia?"
3. "cómo predecir el stock que necesito para el hot sale o cybermonday"
4. "ia para mejorar las ventas de mi tienda online argentina"

### 4. Herramientas locales y cómo mencionarlas con honestidad

**Confirmación:** sí, esos nombres (Fudo, Maxirest, Tokko Broker, Argenprop, Zonaprop, Tango, Tiendanube, Mercado Libre) son los líderes de cada rubro en Argentina hoy — cubren el 90% del mercado.

**Cómo redactarlo sin mentir:** como Dataria no tiene integraciones oficiales (APIs certificadas), el enfoque no debe ser "Nos integramos con...", sino **"Procesamos los datos de..."** o **"Somos compatibles con..."**. Para el dueño de la pyme esto es incluso un alivio: no tiene que tocar su sistema actual ni pagar módulos extra. Dataria trabaja con lo que ya exportan (Excel, CSV, reportes).

Ejemplos de copy honesto sugeridos:
- **Gastronomía:** "No necesitás cambiar de sistema de gestión. Dataria es compatible con los reportes que ya exportás de Fudo, Maxirest o tus planillas de Excel. Nosotros tomamos esa información y nuestra IA la transforma en decisiones."
- **Distribuidoras:** "Trabajamos con la información que ya tenés. Exportá tus datos de Tango, Bejerman o tus planillas de Excel diarias; nuestra IA los procesa en segundos para optimizar tus rutas y stock, sin instalaciones complejas."
- **Inmobiliarias:** "Potenciá tu CRM. Generamos descripciones optimizadas y respuestas listas para que uses en Tokko Broker, o para publicar directamente en Zonaprop y Argenprop."
- **E-commerce:** "Sin configuraciones difíciles. Analizamos las exportaciones de tus ventas de Tiendanube o Mercado Libre para predecir tu stock y automatizar tus respuestas, cuidando la seguridad de tus cuentas."

### 5. FAQ específicas por rubro

**Gastronomía**
1. *¿Tengo que cargar todas mis recetas e ingredientes a mano en Dataria?* — No. Leemos tus planillas de Excel actuales, PDFs de proveedores o reportes de tu sistema de gestión para estructurar tu base de datos de recetas en la IA.
2. *¿La IA realmente puede predecir cuánto voy a vender el fin de semana?* — Sí, cruzando tu histórico de ventas reales con factores externos como clima, feriados y eventos en tu zona, para un estimado de producción preciso.
3. *¿Cómo me ayuda la IA a no perder margen con la inflación de los proveedores?* — Analiza las facturas de compra que subís, detecta qué insumos aumentaron por encima del promedio y te alerta qué platos están perdiendo rentabilidad.

**Distribuidoras**
1. *¿Cómo se conecta la IA con nuestro sistema de facturación (ej. Tango)?* — No tocamos tu base de datos directamente. Exportás un reporte diario en Excel o CSV (2 minutos) y lo subís a la plataforma.
2. *¿La optimización de rutas sirve para cualquier zona de Argentina?* — Sí. Usa mapas locales actualizados y tiene en cuenta restricciones de tránsito pesado, horarios de entrega y capacidad de carga de cada camión.
3. *¿Qué pasa si un cliente me manda un pedido por WhatsApp de forma muy desordenada?* — La IA está entrenada para entender el "lenguaje de calle", identifica los productos de tu catálogo y lo traduce a un formato limpio listo para facturar.

**Inmobiliarias**
1. *¿La IA publica las propiedades directamente en los portales por mí?* — No de forma directa (los portales tienen sus propias reglas de acceso). Genera el título, la descripción optimizada y las etiquetas listas para copiar y pegar en tu CRM o portal.
2. *¿Cómo hace la IA para tasar una propiedad si el mercado argentino es tan inestable?* — No reemplaza tu criterio. Analiza publicaciones similares activas en la misma zona y entrega un informe comparativo de precios como punto de partida.
3. *¿El bot de WhatsApp para filtrar interesados puede agendar visitas solo?* — Sí, con las preguntas filtro que definas (presupuesto, garantía, mascotas); si el interesado cumple, ofrece los horarios disponibles en tu agenda.

**E-commerce**
1. *¿Tengo que darle acceso total a mi cuenta de Mercado Libre o Tiendanube?* — No. Se puede trabajar con exportación de reportes de ventas, o accesos de solo lectura, sin comprometer la seguridad de la cuenta.
2. *¿Cómo evito que las respuestas de la IA suenen robóticas o frías?* — Se entrena con el tono de voz de tu marca, adaptando vocabulario y estilo según el tipo de producto.
3. *¿La predicción de stock sirve para eventos de alta demanda como el Hot Sale?* — Sí. Analiza ventas de eventos anteriores, estacionalidad y tendencia reciente para sugerir qué stock preparar.

### 6. Segmentación dentro de cada rubro

No hace falta crear páginas distintas, pero conviene que cada página hable a ambos perfiles con secciones o viñetas diferenciadas:

- **Gastronomía (sí cambia):** local chico → dolor de desperdicio/costo diario de mercadería; cadena/franquicia → dolor de estandarización y control entre sucursales. Copy sugerido: "Tengas un solo local o una cadena de sucursales..."
- **Distribuidoras (sí cambia mucho):** chica (1-3 camiones, dueño al frente) → dolor de tiempo administrativo (rutas a mano, pedidos por WhatsApp); grande (flota propia, preventistas) → dolor de eficiencia/costo de combustible y quiebres de stock.
- **Inmobiliarias (no cambia tanto):** el dolor de fondo es el mismo (tiempo perdido en tareas repetitivas); solo cambia el volumen. Mensaje unificado: "Dejá que la IA filtre y redacte, vos concentrate en cerrar la venta."
- **E-commerce (sí cambia):** chico (monotributista, Tiendanube) → quiere ahorrar tiempo de atención; grande (MercadoLíder Platinum, depósito propio) → quiere inteligencia de datos (compras, pauta, logística). Copy de escala: "Si estás arrancando, te ahorramos horas de atención al cliente. Si ya facturás fuerte, optimizamos tu stock y logística con modelos predictivos."

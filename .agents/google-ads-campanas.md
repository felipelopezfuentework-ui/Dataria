# Campañas de Google Ads — Gastronomía y Distribuidoras

**Estado (2026-07-25):** especificación completa, lista para cargar en la cuenta real de Google Ads. Todavía no se cargó en la plataforma — falta terminar el checklist de GA4 (eventos clave + tráfico interno + vinculación GA4↔Ads) antes de prender el gasto.

## Configuración general (ambas campañas)

- Tipo: Búsqueda (Search) — objetivo "Clientes potenciales" (Leads).
- Redes: Red de Búsqueda de Google solamente (desmarcar Red de Display y Socios de búsqueda).
- Ubicaciones: Argentina, targeting **"Presencia"** (no "Presencia o interés").
- Idiomas: Español.
- Estrategia de oferta: Maximizar conversiones, sin tCPA todavía (se agrega recién con 30+ conversiones/mes).
- Presupuesto total sugerido: USD 15/día → Gastronomía USD 8/día + Distribuidoras USD 7/día (ajustable).
- **Evento de conversión principal (Primary Goal): `generate_lead` únicamente.** `click_agendar_reunion` y `click_whatsapp` van como secundarios/observación — nunca como principal (ver consulta 008: si se le da a Smart Bidding un evento "fácil" junto a uno "difícil", persigue el fácil y trae clics baratos que no convierten).
- Match types: Phrase + Exact en todas las keywords (no Broad todavía — recién con 30+ conversiones/mes y negativos maduros).

### Sitelinks (4, compartidos por ambas campañas)
- Ver demos en vivo | Probá cada módulo gratis | Sin registrarte | `https://www.dataria.work/{rubro}#demos`
- Agendá tu consulta | 15 minutos, sin costo | Contanos tu caso | `https://www.dataria.work/{rubro}#contacto`
- Casos reales | Cómo lo usan otras pymes | Gastronomía, distribuidoras y más | `https://www.dataria.work/blog`
- Cómo funciona Dataria | Setup, seguimiento, expansión | Sin equipo técnico propio | `https://www.dataria.work`

### Callouts (5, compartidos)
Sin equipo técnico · Probalo antes de pagar · Setup en 2-4 semanas · Datos 100% seguros · Empezá con 1 módulo

### Negative keywords — campaign-level (ambas campañas)
gratis, free, barato, open source, github, descargar plantilla, excel gratis, curso, tutorial, como hacer, empleo, trabajo, curriculum, cv, pdf, sap, oracle, salesforce, microsoft dynamics, reddit, wiki

---

## Campaña 1 — Search - Gastronomía - Alta Intención

Final URL base: `https://www.dataria.work/gastronomia`

### AG1 — Food cost / Escandallo
Keywords (Phrase+Exact): `software calcular food cost argentina`, `planilla de escandallo gastronomia`, `sistema para calcular costo de platos`
Negativos de grupo: stock, delivery, pos gratis, receta (sola)
Path1: `gastronomia` Path2: `demo`

**RSA1**
Headlines: Calculá tu Food Cost Real (25) · Escandallo Automático Ya (24) · Software Food Cost Arg (22) · Probá la Demo Gratis (20) · Sin Equipo Técnico (18) · IA a Medida p/ Restaurantes (27) · Detectá el Costo Invisible (26) · Nosotros Integramos Todo (24) · Empezá con Un Módulo (20) · Usado por Pastas Pariggi (24) · Ideal: Food Cost 28-35% (23) · Dejá de Calcular a Ojo (22) · Demo en Vivo, Sin Registro (26) · Control de Costos de Menú (25) · Consultá Gratis 15 Min (22)
Descriptions: Calculá el food cost real de cada plato con IA. Probá la demo gratis, sin registrarte. (85) · Detectá el costo invisible que se te escapa en cada receta. Sin equipo técnico propio. (86) · Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy. (76) · Empezá con un módulo y crecé sin rehacer nada. Usado por Pastas Pariggi y MP Catering. (86)

**RSA2 (ángulo objeciones)**
Headlines: ¿Calculás Costos a Ojo? (23) · Dejá el Excel Suelto (20) · IA que Calcula tu Escandallo (28) · Sin Instalar Nada Técnico (25) · Probalo Antes de Contratar (26) · Setup en 2-4 Semanas (20) · Tus Datos, Seguros Siempre (26) · Módulo a Módulo, Sin Frenar (27) · Costo Real de Cada Plato (24) · Prueba Gratis, Sin Registro (27) · Rentabilidad por Plato Real (27) · Usado en Restaurantes Reales (28) · Sin Equipo Técnico Propio (25) · Agendá tu Consulta Gratis (25) · Menos Adivinar, Más Datos (25)
Descriptions: Dejá de adivinar tu food cost. Con IA sabés el costo real de cada plato, hoy. (77) · Sin equipo técnico ni instalaciones raras. Nosotros configuramos todo por vos. (78) · Empezá con un módulo (food cost) y sumá otros cuando lo necesites. (66) · Casos reales: Pastas Pariggi y MP Catering ya lo usan cada día. (63)

### AG2 — Control de stock de insumos
Keywords (Phrase+Exact): `control de stock gastronomico software`, `control de stock insumos restaurante`, `gestión de inventario de ingredientes software`, `software inventario cocina restaurante`
Negativos de grupo: ropa, indumentaria, calzado, zapatillas, retail moda, curso de stock
Path1: `gastronomia` Path2: `stock`

**RSA1**
Headlines: Control de Stock Gastronómico (29) · Evitá Quiebres de Insumos (25) · Software Inventario Cocina (26) · IA Detecta Mermas y Faltantes (29) · Sin Equipo Técnico (18) · Probá la Demo Gratis (20) · Nosotros Integramos Todo (24) · Setup en 2-4 Semanas (20) · Alertas Antes del Quiebre (25) · Sabé Qué Pedir y Cuándo (23) · Control de Insumos en Vivo (26) · Sin Instalar Nada Técnico (25) · Empezá con Un Módulo (20) · Sin Papeles ni Planillas (24) · Agendá tu Consulta Gratis (25)
Descriptions: Controlá insumos y detectá mermas antes de quedarte sin stock un viernes a la noche. (84) · Sin equipo técnico ni instalaciones raras. Nosotros configuramos todo por vos. (78) · Empezá con un módulo (stock) y sumá otros cuando lo necesites. (62) · Recibí alertas por insumo y sabé cuánto y cuándo pedirle a tu proveedor. (72)

---

## Campaña 2 — Search - Distribuidoras - Alta Intención

Final URL base: `https://www.dataria.work/distribuidoras`

### AG1 — Rutas de reparto
Keywords (Phrase+Exact): `optimizador de rutas de reparto`, `software planificacion de rutas logistica`, `organizar entregas distribuidora argentina`, `ruteador de entregas pyme`
Negativos de grupo: chofer, empleo chofer, curso ruteo, moto, gps personal
Path1: `distribuidoras` Path2: `rutas`

**RSA1**
Headlines: Optimizá tus Rutas de Reparto (29) · Software de Ruteo Argentina (27) · Menos Km, Más Entregas (22) · Organizá Entregas sin Excel (27) · Probá la Demo Gratis (20) · Sin Equipo Técnico (18) · Rutas para Pyme de Reparto (26) · Menos Horas Armando Rutas (25) · Usado por Pollo Cocido (22) · Reducí Costos de Nafta (22) · IA que Arma tus Rutas (21) · Ventana Horaria sin Drama (25) · Nosotros Integramos Todo (24) · Sin Equipo Técnico Propio (25) · Agendá tu Consulta Gratis (25)
Descriptions: Optimizá rutas y reducí kilómetros con IA. Probá la demo gratis, sin registrarte. (80) · Sabé cuándo llega cada pedido, sin llamados ni WhatsApp perdidos. (65) · Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy. (76) · Ya lo usa Pollo Cocido para su logística diaria. Agendá tu consulta gratis. (75)

**RSA2 (ángulo objeciones)**
Headlines: ¿Perdés Tiempo Armando Rutas? (29) · IA que Arma tus Recorridos (26) · Predecí la Demanda con IA (25) · Menos Costo de Combustible (26) · Sin Equipo Técnico (18) · Setup en 2-4 Semanas (20) · Rutas Más Cortas, Más Rápido (28) · Menos Vehículos, Más Cliente (28) · Agente de Pedidos WhatsApp (26) · Rentabilidad por Cliente (24) · Ya lo Usa Pollo Cocido (22) · Prueba Gratis, Sin Registro (27) · Sin Instalar Nada Técnico (25) · Probalo Antes de Contratar (26) · Agendá tu Consulta Gratis (25)
Descriptions: ¿Perdés horas armando rutas a mano? La IA de Dataria las arma en minutos. (73) · Predecí demanda y reducí costo por kilómetro. Sin equipo técnico propio. (72) · Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy. (76) · Ya lo usa Pollo Cocido para su logística diaria. Agendá tu consulta gratis. (75)

### AG2 — Control de stock y proyección de demanda
Keywords (Phrase+Exact): `control de stock distribuidoras argentina`, `gestion de inventario distribuidora`, `evitar quiebre de stock distribuidora`
*(expansión futura, no cargar todavía: `sistema de stock y compras distribuidora`, `prevision de compras distribuidora IA`, `punto de reorden inventario distribuidora`)*
Negativos de grupo: empleo, curso de stock, excel gratis inventario
Path1: `distribuidoras` Path2: `stock`

**RSA1**
Headlines: Control de Stock Distribuidora (30) · Evitá Quiebres de Stock (23) · Predecí Demanda con IA (22) · Sabé Cuánto Comprar (19) · Sin Equipo Técnico (18) · Software de Inventario (22) · Sin Sobrestock ni Faltantes (27) · Probá la Demo Gratis (20) · Nosotros Integramos Todo (24) · Setup en 2-4 Semanas (20) · Punto de Reorden Automático (27) · Menos Capital Inmovilizado (26) · Sin Instalar Nada Técnico (25) · Empezá con Un Módulo (20) · Agendá tu Consulta Gratis (25)
Descriptions: Predecí demanda y controlá stock en un solo lugar. Sabé cuánto comprar y cuándo. (80) · Evitá quiebres de stock y capital inmovilizado. Todo en un mismo panel. (71) · Nosotros integramos todo: no necesitás saber de tecnología para empezar hoy. (76) · Empezá con un módulo (stock y demanda) y sumá otros cuando lo necesites. (72)

---

## Checklist antes de prender el gasto (ver detalle en PENDIENTES.md)
- [x] Landing pages revisadas (demo de stock sumado a Gastronomía, formulario agregado a las 4 sub-webs)
- [x] `generate_lead` marcado como Key Event en GA4
- [ ] `click_agendar_reunion` y `click_whatsapp` marcados como Key Event (esperando que aparezcan en Administrar → Eventos)
- [ ] Tráfico interno configurado y activado en GA4 (regla creada, falta sumar la IP de Felipe desde su ubicación habitual)
- [ ] GA4 vinculado a Google Ads + `generate_lead` importado como conversión principal
- [ ] Cargar las 2 campañas en la cuenta real de Google Ads

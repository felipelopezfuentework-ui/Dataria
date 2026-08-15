# Pendientes Web Dataria (dataria.work)
*Actualizado 2026-08-15 — se eliminó todo lo ya completado (el historial real queda en `git log`)*

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

### 1. Google Ads — LO ÚNICO PRIORITARIO. Spec lista, falta cargarla.
Especificación completa y actualizada en `.agents/google-ads-campanas.md` (reescrita el 15/ago: 1 campaña, 6 grupos, distribuidoras como rubro principal, $7.000 ARS/día, Maximizar clics con tope de CPC $1.800). Datos de mercado en `.agents/keywords-investigacion.md`.

La medición ya está cerrada (GA4 vinculado, `generate_lead` como única conversión principal, tráfico interno filtrado). **No queda ningún bloqueante técnico: falta cargarla a mano en la plataforma.**

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

### 5. Idea sin desarrollar — agente que optimice la campaña de Ads de forma continua
Conectar un agente con el contexto y el análisis de la campaña real, vinculado a Google Trends o similar, para ir sugiriendo mejoras con el tiempo. Idea sin definir del todo. Retomar una vez que la campaña esté andando y con la API aprobada.

### 6. Blog — mantenimiento a demanda
Imanol va a ir pasando modificaciones puntuales a los posts ya publicados a medida que las necesite.

---

## 📋 Backlog — anotado, sin abrir
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

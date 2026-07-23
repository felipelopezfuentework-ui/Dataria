# Pendientes Web Dataria (dataria.work)
*Actualizado 2026-07-23 — simplificado, se eliminó todo lo ya completado (el historial real queda en `git log`)*

## Contexto rápido
- Sitio: Dataria — herramientas de IA a medida para pymes/autónomos, 4 rubros (gastronomía, distribuidoras, inmobiliarias, e-commerce) + formulario "Otros". NO es un restaurante (no confundir con Ragu Bodegón).
- Repo: github.com/felipelopezfuentework-ui/Dataria — Imanol colaborador. Next.js 15, App Router.
- Deploy: Vercel, proyecto **"dataria-nrr8"** (⚠️ NO "dataria" a secas — hay dos proyectos parecidos en la cuenta, el que sirve dataria.work es el nrr8). Dominio comprado en Squarespace.
- Contexto de marca/producto completo: `.agents/product-marketing.md` en el repo (v5). Historial de consultas a Gemini: `.agents/gemini-consultas/` en el repo.
- GA4 Measurement ID: `G-J2675ZE6DY`. Search Console verificado por TXT en DNS (cubre www y no-www a la vez).
- Objetivo actual: full foco en SEO/SEM/GEO. Google Ads queda para el final.
- **Regla de trabajo de Imanol: ir en orden, confirmar antes de avanzar al siguiente paso. Los PRs se mergean directo a main sin preguntar cada vez (pedido explícito).**

---

## 🔴 Pendientes activos

### 1. AlternativeTo — bloqueado hasta el 26/jul
La cuenta de Imanol necesita 7 días de antigüedad para poder sugerir un producto nuevo (creada 19/jul). El copy ya está listo para pegar apenas se pueda:
- **Name:** Dataria — **Website:** https://dataria.work
- **Tagline:** "IA a medida para pymes argentinas, sin equipo técnico"
- **Description:** ver versión sin nombres de clientes en "Copy de referencia" más abajo.
- **Platforms:** Web — **License/Pricing:** Commercial.
- **Tags:** Artificial Intelligence, SaaS, Business & Commerce, CRM, Restaurant Management, Inventory Management, Route Planning.
- **Logo a subir:** `public/isologo-dataria.png`.
- **Alternativas a marcar:** Tokko Broker (CRM inmobiliario), SimpliRoute (rutas de reparto), Choco.com (pedidos/gestión gastronómica).
- Proceso: cuenta propia → ícono de usuario → "Suggest new application" → 3 pasos. Aprobación manual 1-2 días.

### 2. Google Business Profile — solo falta sumar reseñas
Perfil completo (verificación, fotos, horario, servicios, URL de reserva). Tarea continua: pedir reseñas reales a clientes (Mariana, Luciano, Gabriel y los que se sumen).

### 3. Google Ads — activo, Imanol le dedica el fin de semana del 25-26/jul
Checklist de landing pages, keywords de alta intención por rubro y negative keywords ya armado en `.agents/gemini-consultas/003-*.md`.

### 4. Idea sin desarrollar — agente que optimice la campaña de Ads de forma continua
Conectar un agente que tenga el contexto y el análisis de la campaña de Google Ads de Dataria, vinculado a Google Trends (o algo similar) para ir detectando cambios/oportunidades y sugiriendo mejoras a la campaña con el tiempo. Idea todavía sin definir del todo (ni Imanol la tiene clara) — no se investigó qué herramienta puntual usar ni cómo conectarla. Retomar una vez que la campaña de Ads esté andando (no tiene sentido optimizar algo que todavía no existe).

### 5. Blog — mantenimiento a demanda
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
- **Descripción larga — SIN nombres de clientes** (usar en AlternativeTo/Toolify/Crunchbase): "Dataria arma módulos de inteligencia artificial a medida para pymes y autónomos argentinos, organizados por industria: cálculo de food cost y gestión de reseñas para gastronomía, optimización de rutas y predicción de demanda para distribuidoras, CRM y agente de consultas por WhatsApp para inmobiliarias, y control de stock y proyecciones de ventas para e-commerce. A diferencia de una consultora que parte de cero, cada módulo ya está construido y se puede probar en vivo en la web antes de contratar nada. Dataria se encarga de toda la integración y capacitación — el cliente no necesita programar ni tener equipo técnico propio. Se empieza con un módulo y se crece sin rehacer lo ya implementado. Agendá una consulta gratuita de 15 minutos."
- **Descripción larga — CON nombres de clientes** (referencia/otros usos, no para directorios formales): igual a la anterior pero cerrando con "Ya lo usan negocios reales como Ragú, Padella, Pastas Pariggi, Pollo Cocido y MP Catering."

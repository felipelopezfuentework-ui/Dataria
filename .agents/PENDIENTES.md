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

### 3. Plan de contenido — ✅ completo (2026-07-23)
- Ángulo de integración con Fudo/Maxirest: ya estaba resuelto en la sección "IndustryIntegrations" de las 4 páginas de rubro (no hacía falta un post nuevo).
- 5° post general "Excel, ERP o IA a medida" (`/blog/excel-erp-ia-medida-pymes-argentina`): escrito y publicado, con 3 datos reales verificados (FUNDAR/UTDT/Observatorio PYME/BID, Ray Panko sobre errores en Excel, Panorama Consulting sobre fracasos de ERP) y revisado por Gemini antes de publicar (ver `.agents/gemini-consultas/005-*`).

### 4. Google Ads (al final, cuando llegue el momento)
Checklist de landing pages, keywords de alta intención por rubro y negative keywords ya armado en `.agents/gemini-consultas/003-*.md`.

### 5. Idea sin desarrollar (retomar cuando Imanol quiera profundizarla)
Una herramienta de Google para buscar frases/palabras y ver su repercusión en internet, para ir mejorando el SEO/GEO de forma continua. No se investigó qué herramienta es ni cómo se conectaría.

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

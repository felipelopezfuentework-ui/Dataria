# 008 — ¿A dónde debe apuntar "Contacto" en las páginas de rubro? Formulario vs. Agendar reunión

**Fecha:** 2026-07-25
**Modelo:** gemini-3.6-flash
**Búsqueda web usada:** no (lectura directa de URLs)
**Lectura de URLs en vivo:** **SÍ, exitosa esta vez** — `https://www.dataria.work/gastronomia` y `https://www.dataria.work/` (`URL_RETRIEVAL_STATUS_SUCCESS` en ambas). A diferencia de la consulta 003 (que falló), esta vez Gemini confirmó por sí mismo el hallazgo de código: en `/gastronomia` el bloque de contacto solo tenía el botón a Google Calendar, mientras que el formulario completo de Web3Forms solo existía en la Home.

## Contexto del pedido

Antes de lanzar Google Ads a las páginas de rubro, se detectó que esas páginas NO tienen el formulario real de contacto (solo existía en Home) — solo tienen el botón "Agendar reunión" (link externo a Google Calendar, sin tracking). El dueño del proyecto tenía dudas: si medir el clic en ese botón refleja bien un lead real (le preocupaba que a veces el equipo agende/bloquee espacios manualmente), y a dónde debería apuntar el link "Contacto" del menú y qué objetivo de conversión elegir en Google Ads.

## Prompt enviado

Ver `008-prompt.txt` en esta misma carpeta.

## Respuesta completa

### 1. ¿Agregar el formulario a las páginas de rubro antes de Ads?
**Sí, es indispensable.** Exigir de entrada un compromiso de 15 minutos en un calendario es una barrera de entrada muy alta para tráfico frío de un anuncio — muchos usuarios buscan dejar una consulta rápida o asíncrona. Enviar tráfico pago a una página cuya única conversión redirige a un dominio externo sin captura propia de leads genera pérdida de conversión. Solución: replicar el formulario de Web3Forms en cada página de rubro (con el desplegable de industria preseleccionado).

### 2. Sobre el bloqueo manual del equipo y la validez del clic
- Si el equipo bloquea/agenda directamente desde `calendar.google.com` (no desde la web), **no contamina nada** — no pasa por el sitio ni por GA4.
- Si alguien del equipo probara el botón desde la web, se filtra con tráfico interno por IP en GA4 (configuración estándar).
- El problema real: el clic solo registra que se abrió la pestaña del calendario, no que se completó la reserva — es una **micro-conversión** (proxy), no un lead garantizado. No debe tratarse como equivalente a un lead real.

### 3. Configuración de Google Ads
- Objetivo de campaña: **"Clientes potenciales" (Leads)**.
- Un solo evento principal (Primary Conversion Goal): **`generate_lead`** (envío del formulario).
- Evento secundario/observación: clic en "Agendar reunión" (`click_agendar_reunion`) y clic a WhatsApp.
- Por qué no poner el clic como principal: si se le da a la puja automática la opción de optimizar hacia un evento "fácil" (clic) junto a uno "difícil" (formulario), el algoritmo persigue el camino fácil y trae clics baratos que no se traducen en reuniones ni ventas reales.

### 4. Recomendación final
- Agregar el formulario de Web3Forms a cada página de rubro, conviviendo con "Agendar reunión" en la misma sección de contacto.
- El link "Contacto" del menú debe seguir siendo un ancla interna a la sección de contacto de la **misma página** (nunca redirigir a Home) — así el usuario que llega por un anuncio a `/gastronomia` nunca abandona la landing page.

## Decisión tomada

- `ContactoSection.tsx` ahora acepta `defaultIndustria` y `formName` como props opcionales, para preseleccionar la industria y distinguir el origen del lead por página.
- Se agregó el formulario a las 4 páginas de rubro (gastronomia, distribuidoras, inmobiliarias, ecommerce), debajo de `CTAReunion` (que ya tenía el ancla `#contacto` — no se tocó el routing del link del menú, ya apuntaba correctamente a la misma página).
- Se agregó el evento `click_agendar_reunion` en los 4 lugares donde existe ese botón.
- Pendiente (fuera del alcance de esta consulta): marcar `generate_lead` y `click_agendar_reunion` como Key Events en GA4, e importar ambos a Google Ads como evento principal + secundario respectivamente.

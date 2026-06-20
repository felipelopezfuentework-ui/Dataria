# Dataria Web — Setup de desarrollo

## Requisitos previos

1. Instalar **Node.js 20+**: https://nodejs.org/en/download  
   (recomendado: LTS. Incluye npm automáticamente)

## Primeros pasos

```bash
# Entrar a la carpeta del proyecto
cd "dataria-web"

# Instalar dependencias (solo la primera vez)
npm install

# Arrancar el servidor de desarrollo
npm run dev
```

Abrí **http://localhost:3000** en el navegador.

## Estructura de carpetas relevante

```
src/
  app/               → Páginas (Next.js App Router)
  components/
    layout/          → Header, Footer
    ui/              → Botones, Inputs, Modal, Badge
    home/            → Secciones del Home
    demos/           → Panel de demos (prioridad principal)
      gastronomia/   → Calculadora food cost
      distribuidoras/ → Rutas + mapa
      talleres/      → Kanban de órdenes
      inmobiliarias/ → CRM pipeline
      ecommerce/     → Suite 5 módulos
  data/              → Datos mock de ejemplo (sin backend)
public/
  logo.png           → Logo principal
```

## Comandos útiles

```bash
npm run dev    # Desarrollo con hot reload
npm run build  # Build de producción
npm run lint   # Linter TypeScript
```

## Notas

- Todas las demos corren completamente en el cliente (localStorage/React state).  
  No requieren backend ni base de datos en V1.
- El mapa de Distribuidoras usa Leaflet + OpenStreetMap (gratis, sin API key).
- Los placeholders `[contenido pendiente]` se completan a medida que se define el contenido real.
- Nunca mostrar precios/montos — usar CTAs en su lugar (ver prompt original).

# 007 — ¿Reemplazar un demo existente en vez de sumar el 4°? ¿Fusionar Demanda + Stock en Distribuidoras?

**Fecha:** 2026-07-25
**Modelo:** gemini-3.6-flash
**Búsqueda web usada:** no (consulta de decisión de producto, sin necesidad de datos externos nuevos)

## Contexto del pedido

Seguimiento directo de la consulta 006 (que recomendó sumar un demo de stock a Gastronomía). El dueño del proyecto frenó antes de implementarlo: los 4 rubros del sitio tienen exactamente 3 demos cada uno (simetría deliberada), y quería evaluar reemplazar uno de los 3 existentes en vez de sumar un 4°. También propuso la idea de fusionar el demo de "Predictor de demanda" de Distribuidoras con una capa de stock, en vez de tratarlos como cosas separadas.

## Prompt enviado

Ver `007-prompt.txt` en esta misma carpeta.

## Respuesta completa

### Parte 1 — Gastronomía: ¿qué demo reemplazar?

**El que definitivamente NO debe tocarse: Food cost / Escandallo.** Es la propuesta de valor principal y tiene la mayor prueba social del sitio (MP Catering, Pastas Pariggi).

**El de menor valor SEO/intención de compra (candidato a salir): Gestión de reseñas.** En pymes gastronómicas argentinas, gestionar reseñas de Google es un problema secundario/de marketing — quien busca "responder reseñas con IA" suele buscar herramientas freemium. En cambio, quien busca "control de stock restaurante" o "merma en cocina" tiene un dolor operativo directo que le hace perder dinero todos los días.

¿Por qué no Turnos en su lugar? El planificador de turnos ataca costo laboral y rotación (operativo, como Food Cost y Stock). Reseñas ataca reputación (marketing). Para el perfil de cliente de Dataria (dueño operativo), los problemas operativos pesan más.

Sobre la regla de "3 demos por rubro, siempre": Gemini la consideró una limitación artificial sin justificación comercial, pero dado que el dueño priorizaba no sumar trabajo de desarrollo, la recomendación práctica fue: **reemplazar "Gestión de reseñas" por "Control de stock e inventario"**, dejando la terna: Food Cost → Control de stock e inventario → Planificador de turnos.

### Parte 2 — Distribuidoras: ¿fusionar Predictor de demanda con Stock?

**Sí, rotundamente.** Predecir demanda y gestionar inventario son dos caras de la misma moneda operativa en una distribuidora — nadie busca "predecir demanda" en el vacío, buscan saber cuánto comprar para no quedarse sin stock ni inmovilizar capital de más.

Nombre propuesto: **"Control de stock y proyección de demanda"**.

Keywords nuevas que esta fusión cubre (antes fuera de alcance con solo "predictor de demanda"):
- `control de stock distribuidoras argentina`
- `gestion de inventario distribuidora`
- `sistema de stock y compras distribuidora`
- `prevision de compras distribuidora IA`
- `evitar quiebre de stock distribuidora`
- `punto de reorden inventario distribuidora`

## Decisión tomada

- **Gastronomía:** se reemplazó "Gestión de reseñas" por "Control de stock" (nuevo componente, adaptado del ya existente en e-commerce). `ResenasDemo.tsx` queda en el repo sin usar, no se borró.
- **Distribuidoras:** se renombró "Predictor de demanda" → "Control de stock y proyección de demanda" — **sin cambios funcionales**, porque al revisar el código el demo ya trackeaba stock por producto, calculaba alertas (Urgente/Reponer pronto/OK) y sugería cantidades de compra. El rename es honesto tal cual estaba construido.

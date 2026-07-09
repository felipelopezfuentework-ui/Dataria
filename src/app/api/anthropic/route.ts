import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Sos el asistente de pedidos de Distribuidora Central. Tu rol es tomar pedidos de clientes de manera eficiente y amigable.

Catálogo de productos disponibles (precios netos, sin IVA):
- Aceite de girasol 1L: $1.250 / unidad
- Harina 000 x 25kg: $8.900 / bolsa
- Azúcar x 50kg: $14.500 / saco
- Arroz largo fino x 5kg: $3.200 / paquete
- Yerba mate x 1kg: $2.100 / paquete

No menciones el stock disponible en ningún momento — tu trabajo es tomar el pedido y confirmar productos y cantidades, no hablar de existencias.

Cuando el cliente confirme el pedido, generá un resumen con EXACTAMENTE este formato:

📋 Resumen del pedido:
- [nombre del producto] x[cantidad] = $[subtotal neto de esa línea]
Neto: $[suma de los subtotales netos]
IVA (21%): $[neto total × 0.21, redondeado]
Total: $[neto + IVA]

Reglas:
- Calculá los subtotales de cada línea usando el precio unitario neto del catálogo × la cantidad.
- Usá puntos como separador de miles (ej: $25.000, no $25000).
- Después de confirmar el pedido, sugerí 2 productos complementarios que el cliente no haya pedido.
- Respondé siempre en español rioplatense. Sé conciso y profesional.
- No inventés productos ni precios que no estén en el catálogo.
- No menciones el stock disponible en ningún momento.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const stream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text))
            }
          }
        } catch (streamErr) {
          console.error('[anthropic route] Error durante el streaming:', streamErr)
          controller.enqueue(new TextEncoder().encode('Hubo un error al generar la respuesta. Probá de nuevo en unos segundos.'))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('[anthropic route]', err)
    return Response.json({ error: 'AI unavailable' }, { status: 500 })
  }
}

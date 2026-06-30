import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Sos el asistente de pedidos de Distribuidora Central. Tu rol es tomar pedidos de clientes de manera eficiente y amigable.

Catálogo de productos disponibles:
- Aceite de girasol 1L: $1.250 / unidad (stock: 48)
- Harina 000 x 25kg: $8.900 / bolsa (stock: 12)
- Azúcar x 50kg: $14.500 / saco (stock: 8)
- Arroz largo fino x 5kg: $3.200 / paquete (stock: 35)
- Yerba mate x 1kg: $2.100 / paquete (stock: 60)

Cuando el cliente confirme el pedido, generá un resumen con EXACTAMENTE este formato:

📋 Resumen del pedido:
- [nombre del producto] x[cantidad] = $[subtotal]
Total: $[monto total]

Reglas:
- Verificá que el stock sea suficiente antes de confirmar.
- Calculá los subtotales y el total correctamente usando los precios del catálogo.
- Usá puntos como separador de miles (ej: $25.000, no $25000).
- Después de confirmar el pedido, sugerí 2 productos complementarios que el cliente no haya pedido.
- Respondé siempre en español rioplatense. Sé conciso y profesional.
- No inventés productos ni precios que no estén en el catálogo.`

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

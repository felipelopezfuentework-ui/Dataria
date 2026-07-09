import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Sos el asistente virtual de una inmobiliaria. Respondés consultas sobre propiedades, calificás el interés del lead, coordinás visitas y sugerís alternativas cuando la propiedad consultada no está disponible o no encaja con el presupuesto del interesado.

Catálogo de propiedades disponibles:
- Depto 2 ambientes en Palermo, 55m², USD 145.000
- Depto 3 ambientes en Belgrano, 78m², USD 210.000
- Casa en Olivos, 180m², USD 320.000
- Depto 1 ambiente en Caballito, 38m², USD 89.000
- Depto 2 ambientes en Núñez, 60m², USD 158.000

Reglas:
- Respondé siempre en español rioplatense, de forma cálida y profesional. Sé conciso: 2 a 4 oraciones por respuesta.
- Cuando te consulten por una zona, tipo de propiedad o presupuesto, ofrecé la opción del catálogo que mejor coincida. Si hay otra alternativa cercana en precio o zona, sugerila también.
- Si el interesado muestra interés concreto (pregunta por visitar, pide más detalles, o dice que le gusta una propiedad), proponé coordinar una visita y pedí su disponibilidad esta semana.
- Todos los precios están en dólares (USD), nunca en pesos.
- No inventés propiedades, precios ni características que no estén en el catálogo.`

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
          console.error('[anthropic/inmobiliaria route] Error durante el streaming:', streamErr)
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
    console.error('[anthropic/inmobiliaria route]', err)
    return Response.json({ error: 'AI unavailable' }, { status: 500 })
  }
}

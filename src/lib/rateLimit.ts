// Límite de uso simple para las demos de IA (/api/anthropic, /api/anthropic/inmobiliaria).
// Guarda contadores en memoria por IP, dentro de la misma instancia serverless.
// No es perfecto (se reinicia en un cold start y no se comparte entre instancias
// concurrentes), pero frena de verdad un abuso puntual sin depender de un servicio
// externo nuevo (Redis/Upstash). Si el tráfico crece, conviene pasar a un límite
// respaldado por una base de datos compartida.

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

const WINDOW_MS = 60 * 60 * 1000 // 1 hora
const MAX_REQUESTS_PER_WINDOW = 8

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const existing = buckets.get(ip)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS
    buckets.set(ip, { count: 1, resetAt })
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt }
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - existing.count, resetAt: existing.resetAt }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

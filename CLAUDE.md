# Dataria — instrucciones para Claude

Se carga solo al abrir este proyecto. **No hace falta pegar rutas a mano.**

## Antes de responder cualquier cosa

Leer **`.agents/CONTEXTO-PARA-NUEVO-CHAT.md`** completo. Ahí está el estado exacto de la
campaña de Google Ads, cada decisión con su motivo, y qué accesos hay y cuáles no.

## Reglas que no se negocian

- **No hay acceso a la cuenta de Google Ads.** El developer token está en nivel Test
  (`DEVELOPER_TOKEN_NOT_APPROVED`, medido). Imanol pasa capturas, Claude dice qué tocar.
  No intentar leer la cuenta por API ni por MCP.
- **Nunca inventar testimonios ni datos de clientes.** Ya pasó una vez. Sostener la negativa
  aunque se pida bajo presión.
- **Sin menciones de clientes en los anuncios** (decisión del 15-ago): nada de "Usado por
  Pollo Cocido" ni "Pastas Pariggi" / "MP Catering".
- **Verificar antes de afirmar.** Un número que nadie midió no es un dato. Los datos crudos
  están en `.agents/datos-crudos/` — usarlos en vez de citar el resumen.
- **Escribir las decisiones el mismo día**, en el repo. Ya se perdió una estructura entera
  por no anotarla, y los CSV del barrido estuvieron dos días fuera del repo.

## Cómo trabaja Imanol

- **Una pantalla por mensaje.** Cuando dice "paso a paso, lento", es literal.
- **Sin humo ni tecnicismos.** Explicar los niveles de campaña / grupo / anuncio como a
  alguien que arranca, no con jerga de la plataforma.
- **No mezclar los rubros.** Distribuidoras y gastronomía son campañas distintas con
  landings distintas. Confundirlas es el error que más lo irrita, y con razón.
- **No lanzar subagentes sin preguntar**, y usar el modelo más barato que sirva.
- **Los PRs se mergean directo a main.** Solo avisar. ⚠️ Pero el repo es **público**: antes
  de pushear datos de investigación o economía, preguntar.

## Dónde está cada cosa

| Archivo | Qué tiene |
|---|---|
| `.agents/CONTEXTO-PARA-NUEVO-CHAT.md` | Estado de la campaña. **Empezar acá.** |
| `.agents/keywords-definidas.md` | Las 38 keywords, qué se midió y qué se descartó |
| `.agents/negativos-campana.txt` | Los 94 negativos, listos para pegar |
| `.agents/datos-crudos/` | Los CSV del Planificador. La evidencia, no el resumen |
| `.agents/google-ads-campanas.md` | Spec original. ⚠️ Tiene menciones de clientes: ignorarlas |
| `.agents/PENDIENTES.md` | Backlog activo |

## El sitio

Next.js 15 en Vercel. ⚠️ El proyecto que sirve `dataria.work` es **`dataria-nrr8`**, no
"dataria". Las demos de `/gastronomia`, `/distribuidoras`, `/inmobiliarias` y `/ecommerce`
son **autoservicio y no piden ningún dato** — verificado en el código el 17-ago, así que
"probá la demo sin registrarte" es un claim sustentable.

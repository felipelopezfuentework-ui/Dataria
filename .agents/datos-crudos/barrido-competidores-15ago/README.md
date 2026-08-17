# Datos crudos del barrido de competidores — 15/ago/2026

Los CSV tal cual los descargó el Planificador de palabras clave de la cuenta `534-804-3664`
(Argentina, español, período 1/ago/2025 – 31/jul/2026). **Formato UTF-16, separado por tabs,
con 2 líneas de encabezado antes de la fila de columnas** — un `pandas.read_csv` por defecto
no los abre.

Hasta el 17/ago vivieron solo en la carpeta Descargas de la máquina de Imanol. Se traen acá
porque son la evidencia de la que salen `keywords-definidas.md` y la lista de negativos:
sin ellos, esos documentos son afirmaciones sin fuente.

## Qué hay

| Archivo | Keywords | Cómo se corrió |
|---|---|---|
| `maxirest.com.csv` | 58 | Usar todo el sitio |
| `bistrosoft.com.csv` | 152 | Usar todo el sitio |
| `quadminds.com.csv` | 20 | Usar todo el sitio |
| `simpliroute.com.csv` | 785 | Usar todo el sitio |
| `comparasoftware.com.arplanificacion-de-rutas.csv` | 781 | Usar solo esta página |
| `comparasoftware.com.arsoftware-para-restaurantes.csv` | 726 | Usar solo esta página |

**2.172 keywords únicas, 331.550 búsquedas/mes sumadas.** Coincide con lo documentado.

`descartado/` tiene las dos corridas fallidas de comparasoftware con "Usar todo el sitio":
**los dos archivos son idénticos**, 154 keywords encabezadas por `organigrama online` y
`crear organigrama`. Google ignoró la ruta y midió el dominio entero. Se guardan porque son
la prueba de por qué existe la regla de "Usar solo esta página" para directorios.

## Verificaciones hechas contra estos archivos (17/ago)

| Afirmación | Resultado |
|---|---|
| Punto de venta + comandas + QR ≈ 14.000 búsq./mes | ✅ 9.000 + 850 + 4.100 = 13.950 |
| El cluster QR aparece en el barrido | ✅ 77 keywords, la mayor `codigo qr de restaurante` (500) |
| Comandas aparece en el barrido | ✅ 18 keywords, 850 búsq./mes |
| La lista de 92 negativos no bloquea nada comercial | ✅ 0 falsos positivos reales: lo que bloquea es `comandas`, `gratis` y `mapas` |
| Cobertura de la lista de negativos | Bloquea 60.350 de 331.550 búsq./mes medidas (18%) |

## Cómo leerlos

```python
import csv, io
lines = open('simpliroute.com.csv', encoding='utf-16').read().split('\n')[2:]
for row in csv.DictReader(io.StringIO('\n'.join(lines)), delimiter='\t'):
    print(row['Keyword'], row['Avg. monthly searches'])
```

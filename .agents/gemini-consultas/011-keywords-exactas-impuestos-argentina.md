# Consulta 011 — Contradicción en las keywords exactas, impuestos sobre la pauta en Argentina, moneda de la cuenta y choque de títulos

**Fecha:** 2026-08-09  
**Modelo:** gemini-3.6-flash  
**Contexto adjunto:** `product-marketing.md` completo (modo full)  
**Búsqueda web usada:** null

---

## Prompt enviado

Tercera vuelta. Acepté casi todo, pero hay una contradicción en tu propia lista de keywords y dos temas que no aparecieron en ninguna de las dos respuestas anteriores. Necesito cerrarlos para cargar hoy.

## 1. Contradicción en las keywords en concordancia exacta

En la primera auditoría me dijiste, con razón, que meter "argentina" dentro de una keyword en frase o exacta mata el volumen porque nadie escribe eso literalmente. El principio que aplicaste fue: la concordancia exacta tiene que ser el término que la gente REALMENTE tipea.

Pero después me propusiste estas cuatro en exacta:

- `[food cost pyme]`
- `[control de insumos gastronomia]`
- `[sistema de rutas de reparto]`
- `[control de stock e inventario distribuidoras]`

Ninguna me suena a algo que una persona escriba textualmente en Google. "Control de stock e inventario distribuidoras" son cinco palabras encadenadas que parecen sacadas de un folleto, no de una búsqueda real. Me parece el mismo error que me señalaste, solo que sin la palabra "argentina".

Mi hipótesis: la concordancia exacta debería reservarse para el término núcleo, corto y de alto volumen, del tipo `[food cost]`, `[control de stock]`, `[optimizador de rutas]`. Y las variantes largas y descriptivas deberían ir todas en frase, que es la que tolera palabras alrededor.

¿Tengo razón o me estoy perdiendo algo? Si tengo razón, dame la lista corregida de las exactas para los 4 grupos. Si el término núcleo corto es demasiado ambiguo de intención (por ejemplo `[control de stock]` sirve para cualquier rubro y me traería tráfico de indumentaria), decímelo y proponé el punto medio concreto.

## 2. Impuestos sobre la inversión publicitaria en Argentina

Ninguna de las dos respuestas anteriores mencionó esto y es plata real.

En Argentina, la facturación de Google Ads tiene cargas impositivas por encima del monto invertido (IVA, percepciones de Ganancias/IIBB, y lo que corresponda según cómo se pague y quién sea el contribuyente).

- ¿Cuánto representan hoy, en porcentaje sobre el gasto publicitario neto, para un monotributista argentino que paga con tarjeta?
- El presupuesto diario que cargo en la plataforma, ¿es el monto neto de publicidad y los impuestos se suman aparte en la factura, o el presupuesto ya los incluye?
- Si USD 15/día es el máximo que este anunciante puede gastar TODO INCLUIDO, ¿qué presupuesto diario debería cargar realmente en la plataforma para no pasarse?

Necesito el número concreto, porque cambia cuánto configuro.

## 3. Moneda de la cuenta

La cuenta de Google Ads es nueva y argentina. ¿Está en pesos o en dólares? ¿Cómo lo verifico, y afecta en algo cómo cargo el presupuesto diario y el límite de CPC máximo que me recomendaste ($900 ARS)?

## 4. Choque de títulos en un mismo anuncio

Me diste "Calculá tu Food Cost Ya" para reemplazar a "Escandallo Automático Ya". El problema es que ese anuncio YA tiene el título "Calculá tu Food Cost Real". Quedarían dos títulos casi idénticos en el mismo anuncio adaptable, y entiendo que Google penaliza o directamente no rota títulos redundantes.

Dame un reemplazo distinto para "Escandallo Automático Ya", de 30 caracteres o menos, en español rioplatense, que NO se parezca a "Calculá tu Food Cost Real" y que aporte un ángulo diferente.

## 5. Lo que quede

Si con todo esto ves algo más que esté flojo y que un anunciante con USD 15/día no pueda darse el lujo de equivocar, decilo ahora. Es la última consulta antes de prender el gasto.


---

## Respuesta de Gemini

Tenés toda la razón en el punto 1 y es crucial atajar los otros 4 antes de poner un solo peso. Vamos directo al grano punto por punto.

---

### 1. Keywords en exacta: tenés 100% de razón

Tu hipótesis es impecable: **meter 4 o 5 palabras encadenadas en concordancia exacta (`[...]`) crea "keywords fantasma"** (Google les asigna el estado *"Bajo volumen de búsqueda"* y directamente no muestran anuncios porque nadie tipea esa frase literal de corrido).

**La regla de oro:**
*   **Exacta (`[ ]`):** Reservada para términos núcleo cortos (1 a 3 palabras) con altísima intencionalidad o jerga de industria.
*   **Frase (`" "`):** Para términos descriptivos de 3 a 5 palabras, porque permite que el usuario agregue palabras antes o después sin romper la coincidencia.

Si el término núcleo corto en exacta es ambiguo (ej. `[control de stock]`), no va en exacta solo; se matiza con el rubro.

#### Lista corregida de Keywords por Grupo (Punto medio real):

**Grupo Gastronomía:**
*   **Exacta (`[ ]`):** `[food cost]`, `[escandallo]`, `[costeo de recetas]`
*   **Frase (`" "`):** `"control de insumos gastronomia"`, `"calculo de food cost"`, `"software food cost"`

**Grupo Distribuidoras:**
*   **Exacta (`[ ]`):** `[optimizador de rutas]`, `[rutas de reparto]`, `[control de stock distribuidora]`
*   **Frase (`" "`):** `"sistema de rutas de reparto"`, `"proyeccion de demanda distribuidora"`, `"control de inventario distribuidoras"`

**Grupo Inmobiliarias:**
*   **Exacta (`[ ]`):** `[crm inmobiliario]`, `[agenda de visitas inmobiliaria]`
*   **Frase (`" "`):** `"agente de consultas inmobiliaria"`, `"software para inmobiliarias"`, `"gestion de prospectos inmobiliaria"`

**Grupo E-commerce:**
*   **Exacta (`[ ]`):** `[stock e commerce]`, `[control de inventario ecommerce]`
*   **Frase (`" "`):** `"proyeccion de ventas ecommerce"`, `"control de stock tienda online"`, `"panel de clientes ecommerce"`

---

### 2. Impuestos sobre la pauta en Argentina (Monotributista)

En Argentina, el presupuesto configurado en la plataforma **es el gasto neto publicitario**. Los impuestos **no están incluidos** y se cobran aparte en el resumen de la tarjeta/banco.

*   **¿Cuánto representan sobre el neto?**
    Para un monotributista pagando con tarjeta emitida en Argentina, la carga impositiva ronda entre un **24% y un 30% adicional** sobre el gasto neto (21% de IVA Servicios Digitales + ~3% a 5% de Percepción de Ingresos Brutos según tu provincia/CABA).
*   **¿El presupuesto diario incluye impuestos?**
    **No.** Si pones $10 USD/día en Google Ads, Google consume $10 USD netos de clics y la tarjeta te va a facturar ~$12,50 a $13 USD totales.
*   **Cálculo real para no pasarse de USD 15/día TODO INCLUIDO:**
    Para gastar como máximo **USD 15/día final en tu tarjeta**, tenés que configurar en Google Ads un presupuesto diario neto de **USD 11,50 a USD 12,00/día** (asumiendo ~25% de impuestos).

---

### 3. Moneda de la cuenta y cómo impacta

#### Cómo verificar la moneda:
1. Entrá a tu cuenta de Google Ads.
2. Anda al menú superior/lateral: **Facturación (Billing) -> Configuración (Settings)** o **Resumen**.
3. Ahí verás la **Moneda de la cuenta** (`ARS` - Pesos Argentinos o `USD` - Dólares Estadounidenses).

#### Cómo afecta la configuración:
*   **Si la cuenta está en ARS (Pesos):**
    *   Cargas presupuesto y pujas en Pesos ARS.
    *   Si tu tope neto es ~$12 USD/día y tomás un dólar de referencia de $1.300 ARS: cargas **$15.600 ARS/día** de presupuesto.
    *   El CPC máximo recomendado de $900 ARS se ingresa como `$900`.
*   **Si la cuenta está en USD (Dólares):**
    *   Cargas presupuesto neto en Dólares: **`12.00` USD/día**.
    *   **¡CUIDADO EXTREMO CON EL CPC MÁXIMO!** Si ingresas `900` pensando en pesos dentro de una cuenta en USD, le estás diciendo a Google que estás dispuesto a pagar **USD 900 por un solo clic**. En una cuenta en USD, el equivalente a $900 ARS son **`0.69` USD**.

---

### 4. Reemplazo para evitar choque de títulos en Gastronomía

Tenés toda la razón: tener `Calculá tu Food Cost Real` y `Calculá tu Food Cost Ya` en el mismo Anuncio Adaptable (RSA) genera redundancia y Google baja la calificación de eficacia del anuncio.

Para reemplazar *"Escandallo Automático Ya"* aportando un **ángulo de valor distinto** (enfocado en margen/ganancia o anti-Excel) y en Rioplatense (≤ 30 caracteres):

*   **Opción A (Ángulo Rentabilidad/Margen):** `Márgenes Reales de Tu Menú` *(26 caracteres)*
*   **Opción B (Ángulo Producto/Recetas):** `Costeo de Recetas en Vivo` *(25 caracteres)*
*   **Opción C (Ángulo Anti-Excel):** `Chau Planillas de Costos` *(24 caracteres)*

> **Recomendación:** Usá la **Opción A** o **C**. Atacan un dolor directo diferente a la palabra "Food Cost" y enriquecen la variedad del anuncio.

---

### 5. Check-list de último minuto (Lo que no te podés equivocar con USD 15/día)

Antes de hacer clic en "Habilitar campaña", revisá estos 4 puntos críticos donde se suele "fugar" la plata en presupuestos ajustados:

1.  **Red de Display y Socios de Búsqueda:**
    Entrá a la *Configuración de la Campaña* y **DESMARCÁ** las opciones *"Incluir Socios de búsqueda de Google"* e *"Incluir la Red de Display de Google"*. La Red de Display en campañas de búsqueda devora el presupuesto en aplicaciones móviles en cuestión de minutos con clics accidentales.
2.  **Ubicación geográfica (Configuración avanzada):**
    En Ubicación -> *Opciones de ubicación*, asegurate de seleccionar **"Presencia: Personas que se encuentran o que están habitualmente en tus ubicaciones incluidas"**. Por defecto, Google marca "Presencia o Interés", lo que hace que personas en otros países buscando cosas de Argentina vean tus anuncios.
3.  **Negativas cargadas DESDE EL MINUTO 1:**
    No prendas la campaña sin haber cargado la lista de palabras clave negativas a nivel campaña: `gratis`, `pdf`, `ejemplo`, `modelo`, `curso`, `capacitacion`, `empleo`, `trabajo`, `plantilla`, `excel gratis`.
4.  **Estrategia de Pujas inicial:**
    Asegurate de empezar en **"CPC Manual"** o **"Maximizar clics con límite de puja de CPC máximo"**. Nunca arranques una campaña nueva de $12 USD/día con *"Maximizar Conversiones"* sin historial previo de conversiones, porque el algoritmo puede gastarte $6 USD en un solo clic para "probar".

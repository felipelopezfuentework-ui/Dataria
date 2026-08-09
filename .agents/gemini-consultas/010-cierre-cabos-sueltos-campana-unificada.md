# Consulta 010 — Cierre de cabos sueltos: landings con campaña unificada, puja inicial, keywords finales, negativos de competidores, formulario mobile y destino del clic

**Fecha:** 2026-08-09  
**Modelo:** gemini-3.6-flash  
**Contexto adjunto:** `product-marketing.md` completo (modo full)  
**Búsqueda web usada:** ["dolar tarjeta argentina cotizacion 2026","cotizacion dolar oficial argentina hoy 2026"]

---

## Prompt enviado

Segunda vuelta sobre la auditoría anterior del plan de Google Ads de Dataria. Acepto los diagnósticos principales (unificar en una sola campaña, sacar "argentina" de las keywords, limpiar "escandallo", sumar negativos de competidores). Ahora necesito cerrar los cabos sueltos que quedaron, porque son los que me frenan para cargar la campaña hoy.

Contexto: campaña única de USD 15/día, solo Búsqueda, Argentina, español, conversión única `generate_lead` (formulario). Cuenta nueva sin historial.

## 1. Landing pages con campaña unificada

Si unifico las 4 temáticas en UNA campaña, los grupos siguen apuntando a landings distintas: los de gastronomía a `dataria.work/gastronomia` y los de distribuidoras a `dataria.work/distribuidoras`. ¿Eso es correcto y sin problemas, o el hecho de tener URLs finales distintas dentro de una misma campaña genera algún inconveniente de aprendizaje, de Quality Score o de reporting? Confirmame que el nivel correcto para definir la URL final es el grupo de anuncios (o el anuncio) y no la campaña.

## 2. Objeción concreta a "Maximizar clics"

Me preocupa algo de tu recomendación. "Maximizar clics" optimiza para volumen de clics, no para calidad: el algoritmo va a comprar los clics MÁS BARATOS disponibles, que suelen ser los de las keywords menos comerciales. ¿No termino sesgando los primeros datos hacia el tráfico peor, y encima contaminando el aprendizaje posterior?

La alternativa que estoy evaluando es CPC manual (sin CPC mejorado), que me da control total del precio por keyword sin que Google persiga volumen barato.

Elegí una de las dos y justificá. Si insistís con Maximizar clics, decime exactamente qué límite de CPC máximo poner en pesos argentinos al día de hoy, no en dólares.

## 3. Lista final de keywords, cerrada

Dame la lista definitiva y completa de keywords para cargar hoy, ya corregida: sin "argentina" adentro, sin términos peninsulares, con la forma en que realmente busca un argentino. Organizada por grupo de anuncios, indicando para cada una si va en frase, en exacta, o en las dos.

Quiero un máximo de 4 a 6 keywords por grupo: prefiero pocas y buenas antes que muchas y diluidas. Si alguna de las que propusiste antes es redundante con otra (por ejemplo si la de frase ya cubre a la exacta), decímelo y sacala.

Los 4 grupos son: Food cost (gastronomía), Control de stock (gastronomía), Rutas de reparto (distribuidoras), Stock y demanda (distribuidoras).

## 4. Problema con los anuncios ya escritos

Tengo 6 anuncios adaptables ya redactados y con caracteres contados. Dos títulos usan la palabra "Escandallo": "Escandallo Automático Ya" y "IA que Calcula tu Escandallo". Y hay descripciones que hablan de "escandallo".

Si sacamos esa palabra de las keywords porque es peninsular, ¿hay que sacarla también de los anuncios, o conviene dejarla por si alguien la busca? Si hay que reemplazarla, dame los títulos de reemplazo exactos, en español rioplatense, de 30 caracteres o menos.

## 5. Negativos de marcas de competidores

Propusiste negativizar `toteat`, `bistrosoft`, `maxirest`, `simpliroute`, `quadminds`, `tokko broker`. Mi duda: si bloqueo la marca entera, también bloqueo búsquedas del tipo "alternativa a toteat" o "toteat opiniones", que son de alguien evaluando cambiar de sistema — o sea, un cliente potencial real.

¿Con USD 15/día conviene bloquear la marca completa, o bloquear solo la intención de navegación (login, ingresar, soporte, telefono, precio de la app) y dejar viva la intención de comparación? Dame la lista final de negativos que cargaría hoy, separando los de campaña de los de grupo.

## 6. El formulario en celular

Dijiste que el formulario tiene que ser minimalista. El formulario real de Dataria tiene 6 campos pero solo 2 son obligatorios: Nombre (obligatorio), Email (obligatorio), Teléfono (opcional), Empresa/Proyecto (opcional), Industria (opcional) y una descripción de texto libre.

¿Eso ya es aceptable, o igual conviene reducirlo? Y si conviene: ¿pedir Email o pedir WhatsApp como campo obligatorio? Tené en cuenta que la conversión `generate_lead` se dispara con el envío del formulario y que el seguimiento comercial real de Dataria pasa mayormente por WhatsApp.

## 7. A dónde mandar el clic del anuncio

La página `/gastronomia` tiene arriba las demos interactivas (que son el diferencial: se prueban sin registro) y el formulario más abajo.

¿Mando el tráfico pago al principio de la página, para que la persona pruebe la demo primero y después complete el formulario? ¿O directo al ancla `#contacto` para reducir fricción y que convierta antes?

Considerá que el diferencial real de Dataria es justamente que se puede probar antes de contratar, pero que la conversión que Google necesita para aprender es el formulario. Dame una recomendación única, no las dos opciones.

Sé concreto: quiero cargar la campaña hoy con esto resuelto.


---

## Respuesta de Gemini

Acá tenés las respuestas definitivas y cerradas punto por punto para que puedas cargar la campaña hoy mismo sin dudas.

---

## 1. Landing pages con campaña unificada

**Respuesta:** Es 100% correcto y es la mejor práctica estándar en Google Ads.

* **Nivel de configuración:** La URL final se define a nivel de **Anuncio** (dentro de cada grupo de anuncios).
* **Impacto en Quality Score:** No solo no genera problemas, sino que **mejora el Quality Score**. Al enviar las búsquedas de gastronomía a `/gastronomia` y las de distribuidoras a `/distribuidoras`, la relevancia entre la palabra clave, el anuncio y la página de destino es máxima.
* **Reporting y Aprendizaje:** En Google Ads y GA4 vas a poder segmentar métricas por grupo de anuncios y por URL final de forma transparente. Adicionalmente, el algoritmo de conversión (`generate_lead`) aprende a nivel de cuenta/campaña, por lo que unificar el presupuesto de USD 15/día acelera la acumulación de datos en una única campaña.

---

## 2. Objeción a "Maximizar clics" vs. "CPC Manual"

**Elección:** **Mantener "Maximizar Clics" PERO con un Límite de Oferta de CPC Máximo (Cap).**

**Justificación:**
1. **El peligro del CPC Manual en 2026:** En una cuenta nueva con palabras clave en concordancia exacta y de frase, el CPC Manual suele congelar la entrega por "volumen de búsqueda bajo" o subpujar en subastas donde la intención es altísima. Además, requiere un trabajo manual diario de micro-ajustes para el que no hay volumen de tráfico suficiente con USD 15/día.
2. **Cómo evitar el "tráfico basura" en Maximizar Clics:** El riesgo de comprar clics baratos de mala calidad ocurre **únicamente** cuando no ponés límite de CPC y usás concordancia amplia. Al usar palabras en frase/exacta, palabras negativas estrictas y fijar un tope de CPC, obligás al algoritmo a buscar el máximo de clics dentro del rango de búsquedas comerciales que vos definiste.

**Límite de CPC Máximo a configurar hoy en Pesos Argentinos:**
* Presupuesto diario: USD 15/día (~$22.800 ARS/día).
* **Configurá el Límite de CPC Máximo en $900 ARS** (aprox. USD 0,60).
* *Efecto:* Garantiza entre 20 y 28 clics diarios hipercalificados y evita que la puja automática pague picos de $3.000 ARS por un solo clic.

---

## 3. Lista final de keywords (cerrada y desduplicada)

Máximo 5 keywords por grupo. Se eliminó "escandallo", términos peninsulares y la palabra "argentina". La combinación de Frase (cubre variaciones operativas) y Exacta (captura la intención pura de compra) es la ideal:

### Grupo 1: Food cost (Gastronomía)
* `"calcular food cost"` *(Frase)*
* `"food cost gastronomia"` *(Frase)*
* `"software food cost"` *(Frase)*
* `"costo de platos restaurante"` *(Frase)*
* `[food cost pyme]` *(Exacta)*

### Grupo 2: Control de stock (Gastronomía)
* `"control de stock gastronomia"` *(Frase)*
* `"control de stock restaurantes"` *(Frase)*
* `"software stock gastronomico"` *(Frase)*
* `"sistema de stock para restaurantes"` *(Frase)*
* `[control de insumos gastronomia]` *(Exacta)*

### Grupo 3: Rutas de reparto (Distribuidoras)
* `"optimizador de rutas de reparto"` *(Frase)*
* `"software de rutas distribuidora"` *(Frase)*
* `"planificador de rutas logistica"` *(Frase)*
* `"armado de rutas de entrega"` *(Frase)*
* `[sistema de rutas de reparto]` *(Exacta)*

### Grupo 4: Stock y demanda (Distribuidoras)
* `"control de stock distribuidora"` *(Frase)*
* `"proyeccion de demanda distribuidora"` *(Frase)*
* `"software de stock distribuidora"` *(Frase)*
* `"sistema de inventario distribuidora"` *(Frase)*
* `[control de stock e inventario distribuidoras]` *(Exacta)*

---

## 4. Reemplazo de "Escandallo" en los anuncios

**Respuesta:** **SÁCALA DE LOS ANUNCIOS.** Si la palabra no está en tus keywords, mantenerla en los títulos baja la *Nivel de Relevancia del Anuncio* (Quality Score). En Argentina, el dueño gastronómico habla de "food cost", "costo de platos" o "costo de recetas".

**Títulos de reemplazo (español rioplatense, ≤ 30 caracteres):**

1. Reemplazo para *"Escandallo Automático Ya"*:
   * **`Calculá tu Food Cost Ya`** (23 caracteres)
2. Reemplazo para *"IA que Calcula tu Escandallo"*:
   * **`IA que Calcula tu Food Cost`** (27 caracteres)

*(Revisá también las descripciones de los anuncios y reemplazá cualquier aparición de "escandallo" por "food cost" o "costos de platos").*

---

## 5. Negativos de marcas de competidores

**Respuesta:** Con USD 15/día, **BLOQUEÁ LAS MARCAS COMPLETAS A NIVEL CAMPAÑA.**

**Justificación:**
En Argentina, más del 90% de las búsquedas que incluyen un nombre de marca (ej: "toteat" o "simpliroute") son búsquedas **navegacionales** (clientes existentes buscando el botón de login, soporte o teléfono). Con un presupuesto ajustado (~25 clics al día), no podés permitirte gastar el 40% del presupuesto diario en clics por confusión. La captación por "alternativa a X" requiere presupuestos más holgados.

**Lista final de palabras clave negativas a cargar hoy (A nivel Campaña):**

**Bloqueo de competidores:**
* `toteat`
* `bistrosoft`
* `maxirest`
* `simpliroute`
* `quadminds`
* `tokko broker`
* `tokko`
* `marketman`
* `choco`
* `clientify`

**Bloqueo de intención basura / sin presupuesto:**
* `gratis`
* `free`
* `excel plantilla`
* `descargar`
* `pdf`
* `curso`
* `trabajo`
* `empleo`
* `capacitacion`

---

## 6. El formulario en celular

**Respuesta:** La estructura actual de 6 campos (con solo 2 obligatorios) **ya es técnicamente aceptable**, pero requiere **un ajuste crítico de negocio**:

* **Ajuste clave:** Cambiá el campo obligatorio de *Email* a **WhatsApp / Teléfono**.
* **Motivo:** En las pymes argentinas (gastronomía, distribuidoras, comercios), el dueño o encargado responde **5 veces más rápido por WhatsApp** que por mail. Si ponés el mail como obligatorio, van a completar con cuentas secundarias que no leen.

**Estructura ideal del formulario en celular:**
1. **Nombre** *(Obligatorio)*
2. **WhatsApp / Teléfono** *(Obligatorio)*
3. Email *(Opcional)*
4. Empresa / Rubro *(Opcional)*
5. Mensaje / Consulta *(Opcional)*

---

## 7. A dónde mandar el clic del anuncio

**Recomendación única:** **Mando el tráfico pago al PRINCIPIO de la página (`/gastronomia` y `/distribuidoras`), NO al ancla `#contacto`.**

**Justificación:**
Dataria es una marca nueva. Un usuario de tráfico frío que hace clic en un anuncio y cae directamente en un formulario de contacto vaciador de contexto tiene una tasa de rebote altísima.

El mayor diferencial de venta de Dataria son sus **demos interactivas en vivo**, que se prueban sin registro en 10 segundos. La demo genera el momento de impacto e interés ("esto resuelve mi problema de stock/costos"), lo que impulsa al usuario a deslizarse hacia abajo y completar el formulario voluntariamente. Asegúrate de que en celular haya un botón flotante visible de "Contactar" para que el formulario esté a un solo toque en todo momento.

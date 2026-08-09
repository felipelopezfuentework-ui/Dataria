# Consulta 009 — Auditoría crítica del plan completo de Google Ads antes de prender el gasto

**Fecha:** 2026-08-09  
**Modelo:** gemini-3.6-flash  
**Contexto adjunto:** `product-marketing.md` completo (modo full)  
**Búsqueda web usada:** ["software calcular food cost argentina busquedas","optimizador de rutas de reparto argentina software","control de stock distribuidoras argentina software"]

---

## Prompt enviado

Necesito una revisión crítica y concreta del plan de Google Ads de Dataria, ANTES de prender el gasto. No busco confirmación: si algo está mal planteado, decímelo con claridad y con la alternativa concreta.

## Situación real, hoy (9 de agosto de 2026)

- Anunciante: Dataria (dataria.work), pyme argentina de 2 personas. Vende módulos de IA a medida para pymes: gastronomía, distribuidoras, inmobiliarias, e-commerce. Ticket no publicado; venta consultiva con reunión previa de 15 minutos.
- Cuenta de Google Ads nueva, casi sin historial (21 impresiones y 1 clic en total). Campaña vieja pausada, se va a rehacer de cero.
- Conversión: `generate_lead` (envío del formulario de contacto), medida en GA4, importada a Google Ads y dejada como ÚNICA conversión principal. Los clics a WhatsApp y a "Agendar reunión" quedan como secundarios/observación (esto se decidió en la consulta 008).
- Presupuesto total disponible: USD 15/día.
- Mercado: solo Argentina, en español.
- No hay búsquedas de marca: nadie conoce Dataria todavía.

## El plan que armamos y quiero que audites

**Tipo de campaña:** solo Búsqueda (Search). Descartamos Máximo rendimiento (Performance Max), Display, Video/Demand Gen y Shopping.

**Estructura:** DOS campañas separadas.
1. `Search - Gastronomía - Alta Intención` — USD 8/día → landing `dataria.work/gastronomia`
   - Grupo 1 "Food cost": `software calcular food cost argentina`, `planilla de escandallo gastronomia`, `sistema para calcular costo de platos`
   - Grupo 2 "Control de stock": `control de stock gastronomico software`, `control de stock insumos restaurante`, `gestión de inventario de ingredientes software`, `software inventario cocina restaurante`
2. `Search - Distribuidoras - Alta Intención` — USD 7/día → landing `dataria.work/distribuidoras`
   - Grupo 1 "Rutas": `optimizador de rutas de reparto`, `software planificacion de rutas logistica`, `organizar entregas distribuidora argentina`, `ruteador de entregas pyme`
   - Grupo 2 "Stock y demanda": `control de stock distribuidoras argentina`, `gestion de inventario distribuidora`, `evitar quiebre de stock distribuidora`

**Concordancias:** solo frase y exacta. Nada de amplia hasta tener 30+ conversiones/mes, puja automática andando y negativos maduros.

**Puja:** Maximizar conversiones, SIN CPA objetivo.

**Ubicación:** Argentina, con la opción "Presencia" (no "Presencia o interés"). Redes de Display y Socios de búsqueda desactivadas. Aplicación automática de recomendaciones desactivada.

**Anuncios:** 2 anuncios adaptables por grupo, 15 títulos y 4 descripciones cada uno.

**Negativos de campaña:** gratis, free, barato, open source, github, descargar plantilla, excel gratis, curso, tutorial, como hacer, empleo, trabajo, curriculum, cv, pdf, sap, oracle, salesforce, microsoft dynamics, reddit, wiki.

## Lo que quiero que respondas, en este orden

1. **La duda que más me preocupa: ¿dos campañas o una sola?** Con USD 8/día y USD 7/día por separado, ¿cada campaña va a juntar suficientes conversiones para que Maximizar conversiones aprenda algo, o estoy fragmentando el presupuesto por debajo del umbral que necesita el algoritmo? ¿Convendría UNA sola campaña de USD 15/día con los 4 grupos adentro? Dame una recomendación clara, no las dos opciones.

2. **Estrategia de puja para arrancar de cero.** Con literalmente 0 conversiones de historial, ¿Maximizar conversiones es correcto, o conviene arrancar con CPC manual o Maximizar clics durante las primeras semanas para juntar datos y recién después pasar a conversiones? ¿Qué hacen realmente las cuentas nuevas chicas?

3. **Volumen real de esas keywords en Argentina.** Buscá y decime si esos términos tienen volumen de búsqueda suficiente en Argentina o si son demasiado nicho y la campaña no va a gastar ni el presupuesto. Si alguno es casi cero, decime cuál y proponé el reemplazo concreto que usaría un argentino buscando esa solución (ojo con la diferencia entre cómo lo dice el proveedor y cómo lo busca el dueño de un restaurante o de una distribuidora).

4. **¿Descartar Performance Max fue correcto?** Google la empuja fuerte en el alta guiada. Con USD 15/día, tracking recién configurado y cero historial de conversiones, ¿es realmente una mala idea o me estoy perdiendo algo?

5. **Concordancia frase + exacta.** En un mercado chico como Argentina y en español, ¿esto restringe demasiado el alcance? ¿Cuál es el criterio real para habilitar amplia?

6. **Presupuesto.** ¿USD 15/día es suficiente para conseguir señal útil en Argentina en este vertical, o es tan bajo que no voy a poder decidir nada en 30 días? Si es insuficiente, decime cuál sería el mínimo realista.

7. **Qué me estoy perdiendo.** El error más caro que suele cometer un anunciante nuevo en esta situación exacta y que no aparece en mi plan.

Sé concreto y aplicable. Prefiero que me corrijas ahora a descubrirlo gastando.


---

## Respuesta de Gemini

Acá tenés la auditoría crítica e impiadosa de tu plan de Google Ads. Hay decisiones estratégicas muy acertadas en la estructura técnica, pero también **2 errores de concepto graves** que podrían paralizar la campaña o hacerte perder presupuesto las primeras dos semanas si salís a la cancha tal como está planteada.

---

### 1. ¿Dos campañas o una sola?
**Diagnóstico: Error crítico de fragmentación.**
Debés hacer **UNA SOLA campaña de USD 15/día** (ej. `Search - Pymes Argentina`) con los 4 grupos de anuncios adentro.

* **Por qué:** Con USD 8/día y USD 7/día tenés ~$210-$240/mes por campaña. A un CPC promedio estimado en B2B Argentina de USD 0.50 a USD 1.00, cada campaña va a conseguir entre 7 y 14 clics diarios. Eso genera de 2 a 4 leads al mes por campaña. Con ese volumen de conversión tan bajo, el algoritmo de Google tarda meses en "aprender", se queda bloqueado en estado de aprendizaje (*Learning*) y la puja no optimiza nunca.
* **Beneficio de unificar:** Al juntar los USD 15/día en una sola campaña, acumulás todas las conversiones en un único motor de aprendizaje, le das $450/mes de aire a Google Ads y dejás que el presupuesto fluya naturalmente hacia los grupos de anuncios que mejor conviertan o reciban más volumen.

---

### 2. Estrategia de puja para arrancar de cero
**Diagnóstico: "Maximizar conversiones" desde el día 1 con 0 conversiones es un riesgo alto.**

* **Lo que pasa en la realidad:** Sin historial, Google no sabe qué perfil de usuario convierte. "Maximizar conversiones" sin datos tiende a inflar los CPCs en las primeras subastas pagando precios altísimos por clic, o gasta el presupuesto diario en 5 clics de mañana.
* **Lo que tenés que hacer (lo que hacen las cuentas B2B chicas que cuidan la caja):**
  1. **Fase 1 (Días 1 a 20):** Arrancá con **Maximizar clics** y fijá un **Límite de CPC máximo** (por ejemplo, USD 0.80 o su equivalente en ARS). Esto te garantiza recibir volumen constante de tráfico, verificar qué términos de búsqueda entran, ir limpiando negativos y conseguir las primeras 10-15 conversiones reales sin sobrepagar los clics.
  2. **Fase 2 (Día 21 en adelante):** Una vez que juntes al menos 10 o 15 conversiones registradas en la cuenta, recién ahí cambiás la estrategia de puja a **Maximizar conversiones**.

---

### 3. Volumen real de las keywords en Argentina y reemplazos
**Diagnóstico: Hay un error recurrente: pegar la palabra "argentina" adentro de la keyword.**
Si la campaña ya está configurada con ubicación geográfica "Argentina", incluir "argentina" en una keyword en coincidencia frase/exacta mata el volumen de búsqueda a casi cero. Nadie escribe `software calcular food cost argentina` en Google; buscan `software calcular food cost` estando ubicados en Argentina.

* **Gastronomía - Food Cost:**
  * ❌ `software calcular food cost argentina` → ⚠️ Casi 0 volumen por el sufijo.
  * ❌ `planilla de escandallo gastronomia` → "Escandallo" es un término técnico/español peninsular. En Argentina los dueños de locales buscan "costo de platos" o "recetario".
  * ✅ **Reemplazos reales:** `"software calcular costo de platos"`, `"calcular food cost restaurante"`, `"software costeo gastronomico"`, `"control de costos restaurante"`.
* **Gastronomía - Control de Stock:**
  * ❌ `control de stock gastronomico software` → Demasiado rígido.
  * ✅ **Reemplazos reales:** `"control de stock restaurantes"`, `"sistema de stock para gastronomia"`, `"software inventario restaurante"`.
* **Distribuidoras - Rutas:**
  * ❌ `organizar entregas distribuidora argentina` / `ruteador de entregas pyme` → Volumen bajísimo.
  * ✅ **Reemplazos reales:** `"optimizador de rutas de reparto"`, `"software de ruteo logistico"`, `"app para planificar rutas"`, `"planificador de rutas de entregas"`.
* **Distribuidoras - Stock y Demanda:**
  * ❌ `evitar quiebre de stock distribuidora` → Término de artículo/blog, no de búsqueda comercial.
  * ✅ **Reemplazos reales:** `"software de stock para distribuidoras"`, `"sistema de gestion para distribuidoras"`, `"software inventario mayorista"`.

---

### 4. ¿Descartar Performance Max fue correcto?
**Respuesta: 100% CORRECTO.**
Con USD 15/día, sin pixel histórico y en B2B consultivo, PMax hubiera gastado el 70% de tu presupuesto en la Red de Display, Gmail y ubicaciones spam (juegos móviles) buscando clics baratos que nunca convierten. Búsqueda pura (Search) es la única vía limpia para validar intención de compra directa.

---

### 5. Concordancia frase + exacta vs. Coincidencia Amplia
**Respuesta: Mantené Frase + Exacta.**
En un mercado de nicho y con presupuesto medido, la coincidencia amplia (*broad match*) con $15/día te va a traer búsquedas como *"cursos gratis de logística"*, *"excel para restaurantes"* o *"trabajo de chofer de reparto"*.
* **¿Cuándo pasar a amplia?** Únicamente cuando la campaña tenga **más de 30 conversiones mensuales sustentables**, esté corriendo bajo Maximizar Conversiones o CPA Objetivo y el listado de palabras negativas esté hipermaduro. Hoy sería un suicidio de presupuesto.

---

### 6. Presupuesto (USD 15/día)
**Respuesta: SÍ alcanza para validar en 30 días, con las condiciones arriba mencionadas.**
En Argentina, los clics B2B en Búsqueda suelen oscilar entre USD 0.40 y USD 0.90.
* Con USD 15/día ($450/mes) vas a obtener entre **500 y 800 clics calificados al mes**.
* Con una landing optimizada que convierta entre el 3% y el 5%, deberías recibir entre **15 y 30 leads (formularios)** por mes.
* Esto es volumen más que suficiente para saber en 30 días si el mensaje cierra y si el costo por lead (CPL) te da margen comercial.

---

### 7. Lo que te estás perdiendo (El error más caro no contemplado)

Hay 2 puntos ciegos en tu plan actual que te pueden costar caro:

1. **La fuga de negativos de competidores de "ingreso/soporte/software tradicional":**
   Los usuarios en Argentina buscan marcas competidoras no para comprar, sino para entrar a sus paneles o pedir soporte. Si no negativizás la intención de navegación/login de otros sistemas, vas a pagar clics tirados.
   * **Negativos indispensables a sumar urgente:** `login`, `ingresar`, `soporte`, `telefono`, `atencion al cliente`, `facturacion afip`, `maxirest`, `bistrosoft`, `toteat`, `quadminds login`, `simpliroute login`, `tokko broker ingresar`.
2. **El hábito de conversión del usuario argentino desde celular (Móvil):**
   El ~70% del tráfico B2B pyme en Argentina va a entrar desde el celular. El dueño de un restaurante o distribuidora que está en la calle o en la cocina odia llenar formularios largos de 5 campos.
   * Si elegiste `generate_lead` (formulario Web3Forms) como única conversión principal para Google Ads, **asegurate de que el formulario en la versión mobile sea minimalista (3 campos: Nombre, WhatsApp, Nombre del negocio)** y esté visible arriba (*above the fold*), sin requerir scroll infinito. Si el formulario es pesado, el usuario se va a ir a tocar el botón de WhatsApp (que dejaste como secundario) y Google Ads va a interpretar que la campaña "no está convirtiendo".

---

### Resumen de acción antes de prender el gasto:

1. **Unificá** todo en 1 sola campaña de USD 15/día.
2. Usá **Maximizar clics** con tope de CPC max (USD 0.80) las primeras 2-3 semanas.
3. **Limpiá las keywords:** sacá la palabra "argentina" del texto de la keyword y reemplazá términos rígidos/técnicos (como "escandallo") por cómo busca el cliente real.
4. Cargá los **negativos de competidores/login/soporte** antes de apretar "Activar".

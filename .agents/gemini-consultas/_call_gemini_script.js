// Uso: node _call_gemini_script.js <prompt.txt> <salida.json> [modelo]
// Requiere GEMINI_API_KEY como variable de entorno. Adjunta automáticamente
// .agents/product-marketing.md como contexto y habilita búsqueda web + lectura de URLs.
const fs = require('fs');
const path = require('path');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not set');
  process.exit(1);
}

const promptPath = process.argv[2];
const outPath = process.argv[3];
const model = process.argv[4] || 'gemini-flash-latest';

// Por defecto se adjunta el resumen corto (barato en tokens). Para consultas que
// necesiten el detalle completo (casos, glosario, objeciones), pasar "full" como 5to argumento.
const useFullContext = process.argv[5] === 'full';
const CONTEXT_PATH = useFullContext
  ? path.join(__dirname, '..', 'product-marketing.md')
  : path.join(__dirname, '_contexto-resumido.md');

const question = fs.readFileSync(promptPath, 'utf-8');
const productContext = fs.existsSync(CONTEXT_PATH)
  ? fs.readFileSync(CONTEXT_PATH, 'utf-8')
  : '';

const prompt = productContext
  ? `Contexto de Dataria (memoria del proyecto entre consultas):\n\n--- INICIO CONTEXTO ---\n${productContext}\n--- FIN CONTEXTO ---\n\nAhora la consulta puntual de esta vez:\n\n${question}`
  : question;

const body = {
  contents: [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ],
  tools: [{ google_search: {} }, { url_context: {} }],
  generationConfig: {
    temperature: 0.4,
  },
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})
  .then(async (res) => {
    const json = await res.json();
    fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf-8');
    if (!res.ok) {
      console.error('HTTP', res.status);
      console.error(JSON.stringify(json).slice(0, 2000));
      process.exitCode = 1;
      return;
    }
    const text = json.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
    console.log('--- PROMPT INCLUDED product-marketing.md ---', !!productContext);
    console.log('--- RESPONSE TEXT LENGTH ---', text.length);
    console.log('--- MODEL VERSION ---', json.modelVersion);
    console.log('--- GROUNDING (web search used) ---', JSON.stringify(json.candidates?.[0]?.groundingMetadata?.webSearchQueries || null));
    console.log('--- URL CONTEXT METADATA ---', JSON.stringify(json.candidates?.[0]?.urlContextMetadata || json.candidates?.[0]?.url_context_metadata || null));
  })
  .catch((err) => {
    console.error('Request failed:', err);
    process.exitCode = 1;
  });

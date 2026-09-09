// ------------------------------------------------------------------
// Thin wrapper around the Gemini API's generateContent REST endpoint.
// Docs: https://ai.google.dev/gemini-api/docs
//
// NOTE ON SECURITY: EXPO_PUBLIC_* env vars get bundled into the app's
// JS and can be extracted by anyone who has the app. That's fine for
// a school project / demo, but for a real production app you should
// proxy this call through your own backend so the key never ships to
// the client.
// ------------------------------------------------------------------

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

// Check https://ai.google.dev/gemini-api/docs/models for the current
// list of available models — Google renames/retires models over time.
const MODEL = 'gemini-3.5-flash';

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/**
 * @param {Array<{from: 'user'|'ai', text: string}>} history  chat so far
 * @param {string} systemPrompt  instructions describing the assistant's role
 * @returns {Promise<string>} the model's reply text
 */
export async function askGemini(history, systemPrompt) {
  if (!API_KEY) {
    throw new Error(
      'ไม่พบ EXPO_PUBLIC_GEMINI_API_KEY — สร้างไฟล์ .env จาก .env.example แล้วใส่ API key, จากนั้นรีสตาร์ท `npx expo start`'
    );
  }

  // Gemini expects role: 'user' | 'model'
  const contents = history.map((m) => ({
    role: m.from === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }));

  const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
      generationConfig: { maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Gemini API error ${res.status}: ${errBody.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
  if (!text) throw new Error('Gemini ไม่ได้ส่งข้อความตอบกลับมา (อาจถูกบล็อกโดย safety filter)');
  return text;
}

/**
 * Single-shot helper — sends one prompt, returns the text response.
 * Ideal for summaries, quiz generation, recommendations (no conversation history needed).
 * @param {string} prompt  The full prompt to send
 * @returns {Promise<string>} the model's reply text
 */
export async function askGeminiOnce(prompt) {
  return askGemini([{ from: 'user', text: prompt }], '');
}

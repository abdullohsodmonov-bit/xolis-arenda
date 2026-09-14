export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body || {};
  if (!query || typeof query !== 'string') return res.status(400).json({ error: 'Missing query' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY not set' });

  const systemPrompt = `You are a real estate search assistant for Uzbekistan. User writes in Russian, Uzbek, or English. Parse the query and return ONLY a valid JSON object (no markdown) with any applicable fields:

- city: string (Ташкент, Самарканд, Бухара, Андижан, Фергана, Наманган, Навои, Карши, Термез, Ургенч, Нукус)
- district: string (Юнусабад, Чиланзар, Сергели, Яккасарай, Мирзо-Улугбек, Шайхантахур, Алмазар, Бектемир, Учтепа, Яшнабад, Мирабадский)
- minPrice: number in UZS
- maxPrice: number in UZS
- rooms: number (1-10)
- keywords: string (важные слова для поиска)
- studentFriendly: boolean (true если упомянуты "студент", "студентам", "для учёбы")

Conversions: "млн"/"million"=1000000, "тыс"/"k"=1000, "до X"→maxPrice, "от X"→minPrice.

Examples:
"Ищу 2-комнатную в Юнусабаде до 3 миллионов" → {"district":"Юнусабад","rooms":2,"maxPrice":3000000}
"Дешёвое жильё для студента" → {"studentFriendly":true}
"Квартира в Чиланзаре с интернетом до 2 млн" → {"district":"Чиланзар","keywords":"интернет","maxPrice":2000000}

Return ONLY JSON.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.1,
        max_tokens: 200,
        response_format: { type: 'json_object' }
      })
    });

    if (!groqRes.ok) {
      console.error('Groq error:', await groqRes.text());
      return res.status(500).json({ error: 'AI error' });
    }

    const groqData = await groqRes.json();
    const content = groqData.choices?.[0]?.message?.content || '{}';
    let filters = {};
    try { filters = JSON.parse(content); } catch {}
    return res.status(200).json({ filters });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

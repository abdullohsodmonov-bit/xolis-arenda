export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { listing, question, history } = req.body || {};
  if (!question || !listing) return res.status(400).json({ error: 'Missing data' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY not set' });

  const context = `Квартира: ${listing.title || ''}
Адрес: ${listing.address || ''}
Цена: ${listing.price || 0} сум/мес
Комнат: ${listing.rooms || 0}
Площадь: ${listing.area || 0} м²
Описание: ${listing.description || ''}
Студентам: ${listing.student_friendly ? 'да' : 'нет'}`;

  const messages = [
    { role: 'system', content: `Ты — дружелюбный AI-ассистент HeyXolis по аренде жилья в Узбекистане. Отвечай коротко (2–4 предложения) на языке вопроса. Если информации нет — честно скажи.

Данные объявления:
${context}` },
    ...(Array.isArray(history) ? history.slice(-4) : []),
    { role: 'user', content: question }
  ];

  const models = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'gemma2-9b-it'];

  for (const model of models) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, temperature: 0.6, max_tokens: 250 })
      });

      if (!groqRes.ok) {
        const errBody = await groqRes.text();
        console.error(`Model ${model} failed:`, groqRes.status, errBody);
        continue;
      }

      const data = await groqRes.json();
      const answer = data.choices?.[0]?.message?.content;
      if (answer) return res.status(200).json({ answer, model });
    } catch (err) {
      console.error(`Model ${model} error:`, err);
      continue;
    }
  }

  return res.status(500).json({ error: 'All models failed' });
}

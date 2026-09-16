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

  const context = `Название: ${listing.title || ''}
Адрес: ${listing.address || ''}
Цена: ${listing.price || 0} сум/месяц
Комнат: ${listing.rooms || 0}
Площадь: ${listing.area || 0} м²
Описание: ${listing.description || ''}
Студентам можно: ${listing.student_friendly ? 'да' : 'нет'}`;

  const messages = [
    { role: 'system', content: `Ты — дружелюбный AI-ассистент HeyXolis по аренде жилья в Узбекистане. Помогаешь арендатору понять, подходит ли ему конкретная квартира.

Отвечай коротко (2-4 предложения), по делу, на языке вопроса.
Если информации в объявлении нет — честно скажи об этом.
Не придумывай детали, которых нет в описании.

Данные объявления:
${context}` },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: 'user', content: question }
  ];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.5,
        max_tokens: 300
      })
    });

    if (!groqRes.ok) return res.status(500).json({ error: 'AI error' });
    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

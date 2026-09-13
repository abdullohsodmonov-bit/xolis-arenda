export default async function handler(req, res) {
  const { text, to } = req.query;

  if (!text || !to) {
    return res.status(400).json({ error: 'Missing text or to' });
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    const translated = data[0].map(seg => seg[0]).join('');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.status(200).json({ translated });
  } catch (err) {
    console.error('Translate error:', err);
    res.status(500).json({ error: 'Translation failed', original: text });
  }
}

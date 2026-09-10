const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const SUPABASE_URL = 'https://gqlxmkiqpcpwfqjbhstr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22NWu4eJeZTNK2yuplrGUw_0dHozsqv';

async function loadListings() {
  const container = document.getElementById('listings');
  container.innerHTML = '<p class="empty">Загрузка...</p>';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?select=*&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) throw new Error('Ошибка загрузки');

    const listings = await res.json();
    renderListings(listings);
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="empty">Ошибка загрузки. Попробуйте позже.</p>';
  }
}

function renderListings(listings) {
  const container = document.getElementById('listings');
  if (!listings.length) {
    container.innerHTML = '<p class="empty">Объявлений пока нет</p>';
    return;
  }

  container.innerHTML = listings.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p class="price">💰 ${Number(item.price).toLocaleString()} сум</p>
      <p>🚪 ${item.rooms} комн. | 📐 ${item.area} м²</p>
      <p>📍 ${item.address || ''}</p>
      <p>${item.description || ''}</p>
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">Написать в Telegram</a>` : ''}
    </div>
  `).join('');
}

document.getElementById('filterBtn').onclick = () => {
  loadListings();
};

loadListings();

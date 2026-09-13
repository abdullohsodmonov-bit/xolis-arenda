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
      ${item.student_friendly ? '<span class="badge">🎓 Студентам можно</span>' : ''}
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">Написать в Telegram</a>` : ''}
    </div>
  `).join('');
}

async function saveListing() {
  const status = document.getElementById('formStatus');
  status.textContent = 'Сохраняем...';
  status.style.color = '#666';

  const data = {
    title: document.getElementById('f_title').value.trim(),
    price: parseInt(document.getElementById('f_price').value) || 0,
    rooms: parseInt(document.getElementById('f_rooms').value) || 1,
    area: parseInt(document.getElementById('f_area').value) || 0,
    address: document.getElementById('f_address').value.trim(),
    description: document.getElementById('f_description').value.trim(),
    telegram: document.getElementById('f_telegram').value.trim(),
    student_friendly: document.getElementById('f_student').checked
  };

  if (!data.title || !data.price) {
    status.textContent = 'Заполните заголовок и цену';
    status.style.color = 'red';
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Ошибка Supabase:', errText);
      throw new Error('Ошибка сохранения');
    }

    status.textContent = 'Сохранено! ✅';
    status.style.color = 'green';

    setTimeout(() => {
      document.getElementById('addModal').classList.add('hidden');
      clearForm();
      status.textContent = '';
      loadListings();
    }, 800);

  } catch (err) {
    console.error(err);
    status.textContent = 'Ошибка сохранения. Проверьте поля.';
    status.style.color = 'red';
  }
}

function clearForm() {
  ['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f_student').checked = false;
}

document.getElementById('addBtn').onclick = () => {
  document.getElementById('addModal').classList.remove('hidden');
};

document.getElementById('cancelBtn').onclick = () => {
  document.getElementById('addModal').classList.add('hidden');
  clearForm();
};

document.getElementById('saveBtn').onclick = saveListing;

document.getElementById('filterBtn').onclick = () => {
  loadListings();
};

loadListings();

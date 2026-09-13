const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const SUPABASE_URL = 'https://gqlxmkiqpcpwfqjbhstr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22NWu4eJeZTNK2yuplrGUw_0dHozsqv';

let t = {};
let lang = 'ru';

function getUserId() {
  return tg?.initDataUnsafe?.user?.id || null;
}

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved && ['ru','uz','en'].includes(saved)) return saved;
  const tgLang = tg?.initDataUnsafe?.user?.language_code;
  if (tgLang && tgLang.startsWith('uz')) return 'uz';
  if (tgLang && tgLang.startsWith('en')) return 'en';
  return 'ru';
}

async function loadLang(code) {
  const res = await fetch(`./lang/${code}.json`);
  t = await res.json();
  lang = code;
  localStorage.setItem('lang', code);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) el.placeholder = t[key];
  });
  document.getElementById('langSelect').value = lang;
  loadListings();
}

// --- Загрузка объявлений (скрываем жалобные и неактуальные) ---
async function loadListings() {
  const container = document.getElementById('listings');
  container.innerHTML = `<p class="empty">${t.loading || 'Загрузка...'}</p>`;

  try {
    const url = `${SUPABASE_URL}/rest/v1/listings?select=*&is_hidden=eq.false&not_actual_count=lt.10&order=created_at.desc`;
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    if (!res.ok) throw new Error('Ошибка загрузки');
    const listings = await res.json();
    renderListings(listings);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.error_loading || 'Ошибка загрузки'}</p>`;
  }
}

function renderListings(listings) {
  const container = document.getElementById('listings');
  if (!listings.length) {
    container.innerHTML = `<p class="empty">${t.no_listings || 'Объявлений пока нет'}</p>`;
    return;
  }
  container.innerHTML = listings.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p class="price">💰 ${Number(item.price).toLocaleString()} ${t.sum || 'сум'}</p>
      <p>🚪 ${item.rooms} ${t.rooms_short || 'комн.'} | 📐 ${item.area} м²</p>
      <p>📍 ${item.address || ''}</p>
      <p>${item.description || ''}</p>
      ${item.student_friendly ? `<span class="badge">${t.students_ok || '🎓 Студентам можно'}</span>` : ''}
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">${t.write_telegram || 'Написать в Telegram'}</a>` : ''}
      <div class="report-row">
        <button class="report-btn" onclick="reportListing(${item.id}, 'broker')" title="${t.report_broker || 'Это риелтор'}">🚨 ${t.report_broker || 'Это риелтор'}</button>
        <button class="report-btn" onclick="reportListing(${item.id}, 'not_actual')" title="${t.report_not_actual || 'Не актуально'}">❌ ${t.report_not_actual || 'Не актуально'}</button>
      </div>
    </div>
  `).join('');
}

// --- Жалоба на объявление ---
async function reportListing(listingId, type) {
  const userId = getUserId();
  if (!userId) {
    alert(t.only_telegram || 'Жаловаться можно только через Telegram.');
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reports`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ listing_id: listingId, user_id: userId, type })
    });

    if (res.ok) {
      alert(t.thanks_report || 'Спасибо! Жалоба отправлена.');
    } else if (res.status === 409) {
      alert(t.already_reported || 'Вы уже жаловались на это объявление.');
    } else {
      throw new Error('Ошибка');
    }
  } catch (err) {
    console.error(err);
    alert(t.error_report || 'Ошибка отправки жалобы.');
  }
}

window.reportListing = reportListing;

// --- Проверка лимита объявлений (макс 2) ---
async function checkUserLimit() {
  const userId = getUserId();
  if (!userId) {
    alert(t.only_telegram || 'Добавлять объявления можно только через Telegram.');
    return false;
  }

  const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&is_hidden=eq.false&select=id`;
  const res = await fetch(url, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const userListings = await res.json();

  if (userListings.length >= 2) {
    alert(t.limit_reached || 'У вас уже 2 активных объявления. Удалите одно, чтобы добавить новое.');
    return false;
  }
  return true;
}

// --- Сохранение объявления ---
async function saveListing() {
  const status = document.getElementById('formStatus');
  status.textContent = t.saving || 'Сохраняем...';
  status.style.color = '#666';

  const userId = getUserId();
  if (!userId) {
    status.textContent = t.only_telegram || 'Только через Telegram.';
    status.style.color = 'red';
    return;
  }

  const data = {
    user_id: userId,
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
    status.textContent = t.fill_title_price || 'Заполните заголовок и цену';
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
    if (!res.ok) throw new Error('Ошибка сохранения');
    status.textContent = t.saved || 'Сохранено!';
    status.style.color = 'green';
    setTimeout(() => {
      document.getElementById('addModal').classList.add('hidden');
      clearForm();
      status.textContent = '';
      loadListings();
    }, 800);
  } catch (err) {
    console.error(err);
    status.textContent = t.error_saving || 'Ошибка сохранения';
    status.style.color = 'red';
  }
}

function clearForm() {
  ['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f_student').checked = false;
}

// --- События ---
document.getElementById('addBtn').onclick = async () => {
  const ok = await checkUserLimit();
  if (ok) document.getElementById('addModal').classList.remove('hidden');
};
document.getElementById('cancelBtn').onclick = () => {
  document.getElementById('addModal').classList.add('hidden');
  clearForm();
};
document.getElementById('saveBtn').onclick = saveListing;
document.getElementById('filterBtn').onclick = loadListings;

document.getElementById('langSelect').onchange = (e) => loadLang(e.target.value);

loadLang(detectLang());

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const SUPABASE_URL = 'https://gqlxmkiqpcpwfqjbhstr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22NWu4eJeZTNK2yuplrGUw_0dHozsqv';

let t = {};
let lang = 'ru';
let translatedCards = {};

const MINS = { title: 10, address: 5, description: 30 };

function getUserId() { return tg?.initDataUnsafe?.user?.id || null; }

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
  translatedCards = {}; // ВАЖНО: сбрасываем переводы при смене языка
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
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = lang;
  updateAllHints();
  loadListings();
}

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
  container.innerHTML = listings.map(item => {
    const tr = translatedCards[item.id];
    const title = tr ? tr.title : item.title;
    const address = tr ? tr.address : item.address;
    const description = tr ? tr.description : item.description;
    const isTranslated = !!tr;

    return `
    <div class="card">
      <h3>${title}</h3>
      <p class="price">💰 ${Number(item.price).toLocaleString()} ${t.sum || 'сум'}</p>
      <p>🚪 ${item.rooms} ${t.rooms_short || 'комн.'} | 📐 ${item.area} м²</p>
      <p>📍 ${address || ''}</p>
      <p>${description || ''}</p>
      ${item.student_friendly ? `<span class="badge">${t.students_ok || '🎓 Студентам можно'}</span>` : ''}
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">${t.write_telegram || 'Написать в Telegram'}</a>` : ''}
      <div class="report-row">
        <button class="report-btn translate-btn" onclick="toggleTranslate(${item.id})">
          🌐 ${isTranslated ? (t.show_original || 'Оригинал') : (t.translate || 'Перевести')}
        </button>
        <button class="report-btn" onclick="reportListing(${item.id}, 'broker')">🚨 ${t.report_broker || 'Это риелтор'}</button>
        <button class="report-btn" onclick="reportListing(${item.id}, 'not_actual')">❌ ${t.report_not_actual || 'Не актуально'}</button>
      </div>
    </div>`;
  }).join('');
}

async function toggleTranslate(listingId) {
  if (translatedCards[listingId]) {
    delete translatedCards[listingId];
    loadListings();
    return;
  }

  // Находим данные объявления
  const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${listingId}&select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const [item] = await res.json();
  if (!item) return;

  try {
    const [titleTr, addrTr, descTr] = await Promise.all([
      translateText(item.title, lang),
      item.address ? translateText(item.address, lang) : Promise.resolve(''),
      item.description ? translateText(item.description, lang) : Promise.resolve('')
    ]);

    if (titleTr === item.title && descTr === item.description) {
      alert(t.translate_error || 'Не удалось перевести. Попробуйте позже.');
      return;
    }

    translatedCards[listingId] = {
      title: titleTr,
      address: addrTr,
      description: descTr
    };
    loadListings();
  } catch (err) {
    console.error(err);
    alert(t.translate_error || 'Не удалось перевести. Попробуйте позже.');
  }
}

async function translateText(text, targetLang) {
  if (!text) return '';
  try {
    const url = `/api/translate?text=${encodeURIComponent(text)}&to=${targetLang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.translated || text;
  } catch (err) {
    console.error('Translate error:', err);
    return text;
  }
}

window.toggleTranslate = toggleTranslate;

async function reportListing(listingId, type) {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram || 'Только через Telegram.'); return; }
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
    if (res.ok) alert(t.thanks_report || 'Спасибо!');
    else if (res.status === 409) alert(t.already_reported || 'Вы уже жаловались.');
    else throw new Error();
  } catch (err) {
    console.error(err);
    alert(t.error_report || 'Ошибка.');
  }
}
window.reportListing = reportListing;

async function checkUserLimit() {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram || 'Только через Telegram.'); return false; }
  const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&is_hidden=eq.false&select=id`;
  const res = await fetch(url, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const userListings = await res.json();
  if (userListings.length >= 2) {
    alert(t.limit_reached || 'У вас уже 2 активных объявления.');
    return false;
  }
  return true;
}

function validateForm(data) {
  const errors = [];
  if (data.title.length < MINS.title) errors.push(t.err_title_short);
  if (data.price < 100000) errors.push(t.err_price_small);
  if (data.rooms < 1 || data.rooms > 10) errors.push(t.err_rooms);
  if (data.area < 5 || data.area > 500) errors.push(t.err_area);
  if (data.address.length < MINS.address) errors.push(t.err_address);
  if (data.description.length < MINS.description) errors.push(t.err_description);
  if (!data.telegram || (!data.telegram.startsWith('@') && !data.telegram.startsWith('+'))) errors.push(t.err_telegram);
  return errors;
}

function updateHint(elId, hintId, value, min, max) {
  const hint = document.getElementById(hintId);
  if (!hint) return;
  if (value === '' || value === null || value === undefined) { hint.textContent = ''; hint.className = 'hint'; return; }
  const len = String(value).trim().length;
  if (min !== undefined && max === undefined) {
    if (len < min) { hint.textContent = `${len} / ${min} ${t.chars_min || 'символов минимум'}`; hint.className = 'hint hint-err'; }
    else { hint.textContent = `✅ ${t.ok || 'Ок'}`; hint.className = 'hint hint-ok'; }
  } else {
    const num = Number(value);
    if (num < min || num > max) { hint.textContent = `${t.max_value || 'От'} ${min} ${t.max_value ? '' : 'до'} ${max}`; hint.className = 'hint hint-err'; }
    else { hint.textContent = `✅ ${t.ok || 'Ок'}`; hint.className = 'hint hint-ok'; }
  }
}

function updateAllHints() {
  const get = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  updateHint('f_title', 'h_title', get('f_title'), MINS.title);
  updateHint('f_address', 'h_address', get('f_address'), MINS.address);
  updateHint('f_description', 'h_description', get('f_description'), MINS.description);
  updateHint('f_price', 'h_price', get('f_price'), 100000);
  updateHint('f_rooms', 'h_rooms', get('f_rooms'), 1, 10);
  updateHint('f_area', 'h_area', get('f_area'), 5, 500);
  const tgv = get('f_telegram');
  const hint = document.getElementById('h_telegram');
  if (hint) {
    if (!tgv) { hint.textContent = ''; hint.className = 'hint'; }
    else if (tgv.startsWith('@') || tgv.startsWith('+')) { hint.textContent = '✅'; hint.className = 'hint hint-ok'; }
    else { hint.textContent = t.err_telegram || ''; hint.className = 'hint hint-err'; }
  }
}

async function saveListing() {
  const status = document.getElementById('formStatus');
  status.textContent = t.saving || 'Сохраняем...';
  status.style.color = '#666';

  const userId = getUserId();
  if (!userId) { status.textContent = t.only_telegram; status.style.color = 'red'; return; }

  const data = {
    user_id: userId,
    title: document.getElementById('f_title').value.trim(),
    price: parseInt(document.getElementById('f_price').value) || 0,
    rooms: parseInt(document.getElementById('f_rooms').value) || 0,
    area: parseInt(document.getElementById('f_area').value) || 0,
    address: document.getElementById('f_address').value.trim(),
    description: document.getElementById('f_description').value.trim(),
    telegram: document.getElementById('f_telegram').value.trim(),
    student_friendly: document.getElementById('f_student').checked
  };

  const errors = validateForm(data);
  if (errors.length > 0) {
    status.innerHTML = errors.join('<br>');
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
    if (!res.ok) throw new Error();
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
    status.textContent = t.error_saving;
    status.style.color = 'red';
  }
}

function clearForm() {
  ['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const cb = document.getElementById('f_student');
  if (cb) cb.checked = false;
  ['h_title','h_price','h_rooms','h_area','h_address','h_description','h_telegram'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.className = 'hint'; }
  });
}

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

['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateAllHints);
});

loadLang(detectLang());

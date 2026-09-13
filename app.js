const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const SUPABASE_URL = 'https://gqlxmkiqpcpwfqjbhstr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22NWu4eJeZTNK2yuplrGUw_0dHozsqv';

const MINS = { title: 10, address: 5, description: 30 };

// ================== ПЕРЕВОДЫ ==================
const TRANSLATIONS = {
  ru: {
    subtitle: "Поиск жилья в Ташкенте",
    min_price: "Мин. цена", max_price: "Макс. цена",
    rooms: "Комнаты", room_1: "1 комната", room_2: "2 комнаты", room_3: "3 комнаты", room_4: "4+ комнат",
    find: "Найти", add_listing: "➕ Добавить объявление",
    loading: "Загрузка...", no_listings: "Объявлений пока нет",
    error_loading: "Ошибка загрузки. Попробуйте позже.",
    new_listing: "Новое объявление",
    f_title: "Заголовок", f_title_ph: "Например: Квартира в Юнусабаде",
    f_price: "Цена (сум)", f_rooms: "Комнат", f_area: "Площадь (м²)",
    f_address: "Адрес", f_address_ph: "Юнусабад, 4 квартал",
    f_description: "Описание", f_description_ph: "Светлая квартира, есть всё для жизни",
    f_telegram: "Telegram арендодателя", f_telegram_ph: "@username",
    f_student: "Можно студентам",
    save: "Сохранить", cancel: "Отмена",
    saving: "Сохраняем...", saved: "Сохранено! ✅",
    error_saving: "Ошибка сохранения",
    write_telegram: "Написать в Telegram",
    students_ok: "🎓 Студентам можно",
    sum: "сум", rooms_short: "комн.",
    report_broker: "Это риелтор", report_not_actual: "Не актуально",
    only_telegram: "Только через Telegram.",
    thanks_report: "Спасибо! Жалоба отправлена.",
    already_reported: "Вы уже жаловались.",
    error_report: "Ошибка отправки жалобы.",
    limit_reached: "У вас уже 2 активных объявления.",
    err_title_short: "Заголовок минимум 10 символов.",
    err_price_small: "Цена минимум 100 000 сум.",
    err_rooms: "Комнат от 1 до 10.",
    err_area: "Площадь от 5 до 500 м².",
    err_address: "Адрес минимум 5 символов.",
    err_description: "Описание минимум 30 символов.",
    err_telegram: "Telegram должен начинаться с @ или +.",
    chars_min: "символов минимум",
    max_value: "Максимум",
    ok: "Ок",
    translate: "Перевести",
    show_original: "Оригинал",
    translate_error: "Не удалось перевести. Попробуйте позже."
  },
  uz: {
    subtitle: "Toshkentda uy qidirish",
    min_price: "Min. narx", max_price: "Maks. narx",
    rooms: "Xonalar", room_1: "1 xona", room_2: "2 xona", room_3: "3 xona", room_4: "4+ xona",
    find: "Qidirish", add_listing: "➕ E'lon qo'shish",
    loading: "Yuklanmoqda...", no_listings: "Hozircha e'lonlar yo'q",
    error_loading: "Yuklashda xatolik.",
    new_listing: "Yangi e'lon",
    f_title: "Sarlavha", f_title_ph: "Masalan: Yunusobodda kvartira",
    f_price: "Narx (so'm)", f_rooms: "Xonalar soni", f_area: "Maydon (m²)",
    f_address: "Manzil", f_address_ph: "Yunusobod, 4-mavze",
    f_description: "Tavsif", f_description_ph: "Yorug' kvartira, yashash uchun barcha sharoitlar",
    f_telegram: "Ijara beruvchining Telegram", f_telegram_ph: "@username",
    f_student: "Talabalarga mumkin",
    save: "Saqlash", cancel: "Bekor qilish",
    saving: "Saqlanmoqda...", saved: "Saqlandi! ✅",
    error_saving: "Saqlashda xatolik",
    write_telegram: "Telegramga yozish",
    students_ok: "🎓 Talabalarga mumkin",
    sum: "so'm", rooms_short: "xona",
    report_broker: "Bu makler", report_not_actual: "Aktual emas",
    only_telegram: "Faqat Telegram orqali.",
    thanks_report: "Rahmat! Shikoyat yuborildi.",
    already_reported: "Siz allaqachon shikoyat qilgansiz.",
    error_report: "Shikoyat yuborishda xatolik.",
    limit_reached: "Sizda allaqachon 2 ta faol e'lon bor.",
    err_title_short: "Sarlavha kamida 10 ta belgi.",
    err_price_small: "Narx kamida 100 000 so'm.",
    err_rooms: "Xonalar 1 dan 10 gacha.",
    err_area: "Maydon 5 dan 500 m² gacha.",
    err_address: "Manzil kamida 5 ta belgi.",
    err_description: "Tavsif kamida 30 ta belgi.",
    err_telegram: "Telegram @ yoki + bilan boshlanishi kerak.",
    chars_min: "ta belgi kerak",
    max_value: "Maksimum",
    ok: "Ok",
    translate: "Tarjima qilish",
    show_original: "Asl nusxa",
    translate_error: "Tarjima qilish imkonsiz."
  },
  en: {
    subtitle: "Apartment search in Tashkent",
    min_price: "Min. price", max_price: "Max. price",
    rooms: "Rooms", room_1: "1 room", room_2: "2 rooms", room_3: "3 rooms", room_4: "4+ rooms",
    find: "Search", add_listing: "➕ Add listing",
    loading: "Loading...", no_listings: "No listings yet",
    error_loading: "Loading error.",
    new_listing: "New listing",
    f_title: "Title", f_title_ph: "Example: Apartment in Yunusabad",
    f_price: "Price (sum)", f_rooms: "Rooms", f_area: "Area (m²)",
    f_address: "Address", f_address_ph: "Yunusabad, 4th block",
    f_description: "Description", f_description_ph: "Bright apartment, everything for living",
    f_telegram: "Landlord's Telegram", f_telegram_ph: "@username",
    f_student: "Students allowed",
    save: "Save", cancel: "Cancel",
    saving: "Saving...", saved: "Saved! ✅",
    error_saving: "Save error",
    write_telegram: "Message on Telegram",
    students_ok: "🎓 Students allowed",
    sum: "sum", rooms_short: "rooms",
    report_broker: "This is a broker", report_not_actual: "Not actual",
    only_telegram: "Telegram only.",
    thanks_report: "Thanks! Report sent.",
    already_reported: "You already reported.",
    error_report: "Report sending error.",
    limit_reached: "You already have 2 active listings.",
    err_title_short: "Title minimum 10 characters.",
    err_price_small: "Price minimum 100,000 sum.",
    err_rooms: "Rooms between 1 and 10.",
    err_area: "Area between 5 and 500 m².",
    err_address: "Address minimum 5 characters.",
    err_description: "Description minimum 30 characters.",
    err_telegram: "Telegram must start with @ or +.",
    chars_min: "chars minimum",
    max_value: "Maximum",
    ok: "Ok",
    translate: "Translate",
    show_original: "Original",
    translate_error: "Translation failed."
  }
};

let t = TRANSLATIONS.ru;
let lang = 'ru';
let translatedCards = {};

// ================== БАЗОВОЕ ==================
function getUserId() { return tg?.initDataUnsafe?.user?.id || null; }

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved && TRANSLATIONS[saved]) return saved;
  const tgLang = tg?.initDataUnsafe?.user?.language_code;
  if (tgLang && tgLang.startsWith('uz')) return 'uz';
  if (tgLang && tgLang.startsWith('en')) return 'en';
  return 'ru';
}

function loadLang(code) {
  if (!TRANSLATIONS[code]) code = 'ru';
  t = TRANSLATIONS[code];
  lang = code;
  translatedCards = {};
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

// ================== ЗАГРУЗКА ==================
async function loadListings() {
  const container = document.getElementById('listings');
  container.innerHTML = `<p class="empty">${t.loading}</p>`;
  try {
    const url = `${SUPABASE_URL}/rest/v1/listings?select=*&is_hidden=eq.false&not_actual_count=lt.10&order=created_at.desc`;
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    if (!res.ok) throw new Error();
    const listings = await res.json();
    renderListings(listings);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.error_loading}</p>`;
  }
}

function renderListings(listings) {
  const container = document.getElementById('listings');
  if (!listings.length) {
    container.innerHTML = `<p class="empty">${t.no_listings}</p>`;
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
      <p class="price">💰 ${Number(item.price).toLocaleString()} ${t.sum}</p>
      <p>🚪 ${item.rooms} ${t.rooms_short} | 📐 ${item.area} м²</p>
      <p>📍 ${address || ''}</p>
      <p>${description || ''}</p>
      ${item.student_friendly ? `<span class="badge">${t.students_ok}</span>` : ''}
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">${t.write_telegram}</a>` : ''}
      <div class="report-row">
        <button class="report-btn translate-btn" onclick="toggleTranslate(${item.id})">
          🌐 ${isTranslated ? t.show_original : t.translate}
        </button>
        <button class="report-btn" onclick="reportListing(${item.id}, 'broker')">🚨 ${t.report_broker}</button>
        <button class="report-btn" onclick="reportListing(${item.id}, 'not_actual')">❌ ${t.report_not_actual}</button>
      </div>
    </div>`;
  }).join('');
}

// ================== ПЕРЕВОД ОБЪЯВЛЕНИЙ ==================
async function toggleTranslate(listingId) {
  if (translatedCards[listingId]) {
    delete translatedCards[listingId];
    loadListings();
    return;
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${listingId}&select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const [item] = await res.json();
  if (!item) return;

  try {
    const titleTr = await translateText(item.title, lang);
    const addrTr = item.address ? await translateText(item.address, lang) : '';
    const descTr = item.description ? await translateText(item.description, lang) : '';

    if (titleTr === item.title && descTr === item.description) {
      alert(t.translate_error);
      return;
    }
    translatedCards[listingId] = { title: titleTr, address: addrTr, description: descTr };
    loadListings();
  } catch (err) {
    console.error(err);
    alert(t.translate_error);
  }
}

async function translateText(text, target) {
  if (!text) return '';
  // Попытка 1: наш API на Vercel
  try {
    const r = await fetch(`/api/translate?text=${encodeURIComponent(text)}&to=${target}`);
    if (r.ok) {
      const d = await r.json();
      if (d.translated && d.translated !== text) return d.translated;
    }
  } catch {}

  // Попытка 2: MyMemory (бесплатный, работает из браузера)
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=Autodetect|${target}`);
    const d = await r.json();
    return d.responseData?.translatedText || text;
  } catch {}

  return text;
}

window.toggleTranslate = toggleTranslate;

// ================== ЖАЛОБЫ ==================
async function reportListing(listingId, type) {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram); return; }
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
    if (res.ok) alert(t.thanks_report);
    else if (res.status === 409) alert(t.already_reported);
    else throw new Error();
  } catch (err) {
    console.error(err);
    alert(t.error_report);
  }
}
window.reportListing = reportListing;

// ================== ЛИМИТ ==================
async function checkUserLimit() {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram); return false; }
  const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&is_hidden=eq.false&select=id`;
  const res = await fetch(url, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const userListings = await res.json();
  if (userListings.length >= 2) { alert(t.limit_reached); return false; }
  return true;
}

// ================== ВАЛИДАЦИЯ ==================
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
  if (max === undefined) {
    if (len < min) { hint.textContent = `${len} / ${min} ${t.chars_min}`; hint.className = 'hint hint-err'; }
    else { hint.textContent = `✅ ${t.ok}`; hint.className = 'hint hint-ok'; }
  } else {
    const num = Number(value);
    if (num < min || num > max) { hint.textContent = `${min} – ${max}`; hint.className = 'hint hint-err'; }
    else { hint.textContent = `✅ ${t.ok}`; hint.className = 'hint hint-ok'; }
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
    else { hint.textContent = t.err_telegram; hint.className = 'hint hint-err'; }
  }
}

// ================== СОХРАНЕНИЕ ==================
async function saveListing() {
  const status = document.getElementById('formStatus');
  status.textContent = t.saving;
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
    status.textContent = t.saved;
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

// ================== СОБЫТИЯ ==================
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

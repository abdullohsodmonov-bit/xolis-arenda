const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const SUPABASE_URL = 'https://gqlxmkiqpcpwfqjbhstr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_22NWu4eJeZTNK2yuplrGUw_0dHozsqv';
const BUCKET = 'listings';

const MINS = { title: 10, address: 5, description: 30 };

// ============ ЧИСЛА ============
function formatNumber(v) {
  const d = String(v).replace(/\D/g, '');
  return d ? d.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
}
function parseNumber(v) { return parseInt(String(v).replace(/\D/g, '')) || 0; }
function attachNumberFormatting(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', (e) => {
    const pos = e.target.selectionStart;
    const oldLen = e.target.value.length;
    e.target.value = formatNumber(e.target.value);
    const newLen = e.target.value.length;
    const newPos = Math.max(0, pos + (newLen - oldLen));
    e.target.setSelectionRange(newPos, newPos);
  });
}

// ============ ПЕРЕВОДЫ ============
const TRANSLATIONS = {
  ru: {
    subtitle: "Поиск жилья в Ташкенте",
    tab_all: "🏠 Все объявления", tab_mine: "👤 Мои",
    detail_title: "Объявление",
    min_price: "Мин. цена", max_price: "Макс. цена",
    rooms: "Комнаты", room_1: "1 комната", room_2: "2 комнаты", room_3: "3 комнаты", room_4: "4+ комнат",
    find: "Найти", reset: "Сбросить", add_listing: "➕ Добавить объявление",
    loading: "Загрузка...", no_listings: "Объявлений пока нет",
    no_my_listings: "У вас пока нет объявлений",
    error_loading: "Ошибка загрузки.", not_found: "Ничего не найдено",
    new_listing: "Новое объявление", edit_listing: "Редактировать объявление",
    f_photos: "Фотографии", add_photo: "📷 Добавить фото",
    uploading: "Загрузка фото...",
    f_title: "Заголовок", f_title_ph: "Например: Квартира в Юнусабаде",
    f_price: "Цена (сум)", f_rooms: "Комнат", f_area: "Площадь (м²)",
    f_address: "Адрес", f_address_ph: "Юнусабад, 4 квартал",
    f_description: "Описание", f_description_ph: "Светлая квартира, есть всё для жизни",
    f_telegram: "Telegram арендодателя", f_telegram_ph: "@username",
    f_student: "Можно студентам",
    save: "Сохранить", cancel: "Отмена",
    saving: "Сохраняем...", saved: "Сохранено! ✅", updated: "Обновлено! ✅",
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
    err_price_small: "Цена минимум 30 000 сум.",
    err_rooms: "Комнат от 1 до 10.",
    err_area: "Площадь от 5 до 500 м².",
    err_address: "Адрес минимум 5 символов.",
    err_description: "Описание минимум 30 символов.",
    err_telegram: "Telegram должен начинаться с @ или +.",
    chars_min: "символов минимум",
    max_value: "Максимум", ok: "Ок",
    translate: "Перевести", show_original: "Оригинал",
    translate_error: "Не удалось перевести.",
    edit: "✏️ Изменить", delete: "🗑️ Удалить",
    confirm_delete: "Удалить объявление?",
    deleted: "Удалено", error_delete: "Ошибка удаления",
    error_upload: "Ошибка загрузки фото"
  },
  uz: {
    subtitle: "Toshkentda uy qidirish",
    tab_all: "🏠 Barcha e'lonlar", tab_mine: "👤 Mening",
    detail_title: "E'lon",
    min_price: "Min. narx", max_price: "Maks. narx",
    rooms: "Xonalar", room_1: "1 xona", room_2: "2 xona", room_3: "3 xona", room_4: "4+ xona",
    find: "Qidirish", reset: "Tozalash", add_listing: "➕ E'lon qo'shish",
    loading: "Yuklanmoqda...", no_listings: "Hozircha e'lonlar yo'q",
    no_my_listings: "Sizda hali e'lonlar yo'q",
    error_loading: "Yuklashda xatolik.", not_found: "Hech narsa topilmadi",
    new_listing: "Yangi e'lon", edit_listing: "E'lonni tahrirlash",
    f_photos: "Rasmlar", add_photo: "📷 Rasm qo'shish",
    uploading: "Rasm yuklanmoqda...",
    f_title: "Sarlavha", f_title_ph: "Masalan: Yunusobodda kvartira",
    f_price: "Narx (so'm)", f_rooms: "Xonalar soni", f_area: "Maydon (m²)",
    f_address: "Manzil", f_address_ph: "Yunusobod, 4-mavze",
    f_description: "Tavsif", f_description_ph: "Yorug' kvartira",
    f_telegram: "Ijara beruvchining Telegram", f_telegram_ph: "@username",
    f_student: "Talabalarga mumkin",
    save: "Saqlash", cancel: "Bekor qilish",
    saving: "Saqlanmoqda...", saved: "Saqlandi! ✅", updated: "Yangilandi! ✅",
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
    err_price_small: "Narx kamida 30 000 so'm.",
    err_rooms: "Xonalar 1 dan 10 gacha.",
    err_area: "Maydon 5 dan 500 m² gacha.",
    err_address: "Manzil kamida 5 ta belgi.",
    err_description: "Tavsif kamida 30 ta belgi.",
    err_telegram: "Telegram @ yoki + bilan boshlanishi kerak.",
    chars_min: "ta belgi kerak",
    max_value: "Maksimum", ok: "Ok",
    translate: "Tarjima qilish", show_original: "Asl nusxa",
    translate_error: "Tarjima qilish imkonsiz.",
    edit: "✏️ Tahrirlash", delete: "🗑️ O'chirish",
    confirm_delete: "E'lonni o'chirishni xohlaysizmi?",
    deleted: "O'chirildi", error_delete: "O'chirishda xatolik",
    error_upload: "Rasm yuklashda xatolik"
  },
  en: {
    subtitle: "Apartment search in Tashkent",
    tab_all: "🏠 All listings", tab_mine: "👤 Mine",
    detail_title: "Listing",
    min_price: "Min. price", max_price: "Max. price",
    rooms: "Rooms", room_1: "1 room", room_2: "2 rooms", room_3: "3 rooms", room_4: "4+ rooms",
    find: "Search", reset: "Reset", add_listing: "➕ Add listing",
    loading: "Loading...", no_listings: "No listings yet",
    no_my_listings: "You have no listings yet",
    error_loading: "Loading error.", not_found: "Nothing found",
    new_listing: "New listing", edit_listing: "Edit listing",
    f_photos: "Photos", add_photo: "📷 Add photo",
    uploading: "Uploading photo...",
    f_title: "Title", f_title_ph: "Example: Apartment in Yunusabad",
    f_price: "Price (sum)", f_rooms: "Rooms", f_area: "Area (m²)",
    f_address: "Address", f_address_ph: "Yunusabad, 4th block",
    f_description: "Description", f_description_ph: "Bright apartment",
    f_telegram: "Landlord's Telegram", f_telegram_ph: "@username",
    f_student: "Students allowed",
    save: "Save", cancel: "Cancel",
    saving: "Saving...", saved: "Saved! ✅", updated: "Updated! ✅",
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
    err_price_small: "Price minimum 30,000 sum.",
    err_rooms: "Rooms between 1 and 10.",
    err_area: "Area between 5 and 500 m².",
    err_address: "Address minimum 5 characters.",
    err_description: "Description minimum 30 characters.",
    err_telegram: "Telegram must start with @ or +.",
    chars_min: "chars minimum",
    max_value: "Maximum", ok: "Ok",
    translate: "Translate", show_original: "Original",
    translate_error: "Translation failed.",
    edit: "✏️ Edit", delete: "🗑️ Delete",
    confirm_delete: "Delete listing?",
    deleted: "Deleted", error_delete: "Delete error",
    error_upload: "Photo upload error"
  }
};

let t = TRANSLATIONS.ru;
let lang = 'ru';
let translatedCards = {};
let currentFilters = { min: 0, max: 0, rooms: '' };
let currentView = 'all';
let editingId = null;
let formPhotos = [];

// ============ БАЗА ============
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
  refreshView();
}

// ============ ЗАГРУЗКА ============
async function refreshView() {
  if (currentView === 'mine') return loadMyListings();
  return loadListings();
}

async function loadListings(filters) {
  if (filters !== undefined) currentFilters = filters;
  const container = document.getElementById('listings');
  container.innerHTML = `<p class="empty">${t.loading}</p>`;
  try {
    let url = `${SUPABASE_URL}/rest/v1/listings?select=*&is_hidden=eq.false&not_actual_count=lt.10&order=created_at.desc`;
    if (currentFilters.min > 0) url += `&price=gte.${currentFilters.min}`;
    if (currentFilters.max > 0) url += `&price=lte.${currentFilters.max}`;
    if (currentFilters.rooms) url += `&rooms=eq.${currentFilters.rooms}`;
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) throw new Error();
    const listings = await res.json();
    if (listings.length === 0 && (currentFilters.min || currentFilters.max || currentFilters.rooms)) {
      container.innerHTML = `<p class="empty">${t.not_found}</p>`;
      return;
    }
    renderListings(listings, false);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.error_loading}</p>`;
  }
}

async function loadMyListings() {
  const container = document.getElementById('listings');
  const userId = getUserId();
  if (!userId) {
    container.innerHTML = `<p class="empty">${t.only_telegram}</p>`;
    return;
  }
  container.innerHTML = `<p class="empty">${t.loading}</p>`;
  try {
    const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&order=created_at.desc`;
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) throw new Error();
    const listings = await res.json();
    if (!listings.length) {
      container.innerHTML = `<p class="empty">${t.no_my_listings}</p>`;
      return;
    }
    renderListings(listings, true);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.error_loading}</p>`;
  }
}

// ============ ОТРИСОВКА ============
function renderListings(listings, isMine) {
  const container = document.getElementById('listings');
  if (!listings.length) {
    container.innerHTML = `<p class="empty">${isMine ? t.no_my_listings : t.no_listings}</p>`;
    return;
  }
  container.innerHTML = listings.map(item => {
    const tr = translatedCards[item.id];
    const title = tr ? tr.title : item.title;
    const address = tr ? tr.address : item.address;
    const description = tr ? tr.description : item.description;
    const isTranslated = !!tr;
    const photos = Array.isArray(item.photos) ? item.photos : [];

    const galleryHtml = photos.length ? `
      <div class="card-gallery">
        <div class="gallery-scroll">
          ${photos.map(u => `<img src="${u}" loading="lazy" alt="">`).join('')}
        </div>
        ${photos.length > 1 ? `<div class="gallery-dots">${photos.map((_, i) => `<span class="dot${i===0?' active':''}"></span>`).join('')}</div>` : ''}
      </div>
    ` : '';

    return `
    <div class="card">
      ${galleryHtml}
      <div class="card-body" onclick="openDetail(${item.id})">
        <h3>${title}</h3>
        <p class="price">💰 ${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}</p>
        <p>🚪 ${item.rooms} ${t.rooms_short} | 📐 ${item.area} м²</p>
        <p>📍 ${address || ''}</p>
        <p class="desc-short">${description || ''}</p>
        ${item.student_friendly ? `<span class="badge">${t.students_ok}</span>` : ''}
        ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank" onclick="event.stopPropagation()">${t.write_telegram}</a>` : ''}
        ${isMine ? `
          <div class="owner-row" onclick="event.stopPropagation()">
            <button class="owner-btn edit-btn" onclick="openEditForm(${item.id})">${t.edit}</button>
            <button class="owner-btn delete-btn" onclick="deleteListing(${item.id})">${t.delete}</button>
          </div>
        ` : `
          <div class="report-row" onclick="event.stopPropagation()">
            <button class="report-btn translate-btn" onclick="toggleTranslate(${item.id})">
              🌐 ${isTranslated ? t.show_original : t.translate}
            </button>
            <button class="report-btn" onclick="reportListing(${item.id}, 'broker')">🚨 ${t.report_broker}</button>
            <button class="report-btn" onclick="reportListing(${item.id}, 'not_actual')">❌ ${t.report_not_actual}</button>
          </div>
        `}
      </div>
    </div>`;
  }).join('');

  attachGalleryListeners();
}

function attachGalleryListeners() {
  document.querySelectorAll('.gallery-scroll').forEach(scroll => {
    if (scroll.dataset.listener) return;
    scroll.dataset.listener = '1';
    scroll.addEventListener('scroll', () => {
      const gallery = scroll.closest('.card-gallery, .detail-gallery');
      if (!gallery) return;
      const idx = Math.round(scroll.scrollLeft / scroll.clientWidth);
      gallery.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    });
  });
}

// ============ ПОЛНЫЙ ПРОСМОТР ============
async function openDetail(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const [item] = await res.json();
    if (!item) return;

    const photos = Array.isArray(item.photos) ? item.photos : [];
    const isMine = item.user_id === getUserId();
    const tr = translatedCards[item.id];
    const title = tr ? tr.title : item.title;
    const address = tr ? tr.address : item.address;
    const description = tr ? tr.description : item.description;
    const isTranslated = !!tr;

    const galleryHtml = photos.length ? `
      <div class="detail-gallery">
        <div class="gallery-scroll">
          ${photos.map(u => `<img src="${u}" alt="">`).join('')}
        </div>
        ${photos.length > 1 ? `<div class="gallery-dots">${photos.map((_, i) => `<span class="dot${i===0?' active':''}"></span>`).join('')}</div>` : ''}
      </div>
    ` : '';

    document.getElementById('detailContent').innerHTML = `
      ${galleryHtml}
      <div class="detail-body">
        <h1>${title}</h1>
        <p class="detail-price">💰 ${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}</p>
        <p>🚪 ${item.rooms} ${t.rooms_short} | 📐 ${item.area} м²</p>
        <p>📍 ${address || ''}</p>
        <p class="detail-desc">${description || ''}</p>
        ${item.student_friendly ? `<span class="badge">${t.students_ok}</span>` : ''}

        ${item.telegram ? `<a class="contact-btn detail-contact" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">${t.write_telegram}</a>` : ''}

        ${isMine ? `
          <div class="owner-row">
            <button class="owner-btn edit-btn" onclick="closeDetail(); openEditForm(${item.id})">${t.edit}</button>
            <button class="owner-btn delete-btn" onclick="closeDetail(); deleteListing(${item.id})">${t.delete}</button>
          </div>
        ` : `
          <div class="report-row">
            <button class="report-btn translate-btn" onclick="translateDetail(${item.id})">
              🌐 ${isTranslated ? t.show_original : t.translate}
            </button>
            <button class="report-btn" onclick="reportListing(${item.id}, 'broker')">🚨 ${t.report_broker}</button>
            <button class="report-btn" onclick="reportListing(${item.id}, 'not_actual')">❌ ${t.report_not_actual}</button>
          </div>
        `}
      </div>
    `;

    document.getElementById('detailModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('detailModal').scrollTop = 0;
    attachGalleryListeners();
  } catch (err) {
    console.error(err);
  }
}
window.openDetail = openDetail;

function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
  document.body.style.overflow = '';
}
window.closeDetail = closeDetail;

async function translateDetail(id) {
  await toggleTranslate(id);
  openDetail(id);
}
window.translateDetail = translateDetail;

// ============ ПЕРЕВОД ============
async function toggleTranslate(listingId) {
  if (translatedCards[listingId]) {
    delete translatedCards[listingId];
    refreshView();
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
    if (titleTr === item.title && descTr === item.description) { alert(t.translate_error); return; }
    translatedCards[listingId] = { title: titleTr, address: addrTr, description: descTr };
    refreshView();
  } catch (err) { console.error(err); alert(t.translate_error); }
}
window.toggleTranslate = toggleTranslate;

async function translateText(text, target) {
  if (!text) return '';
  try {
    const r = await fetch(`/api/translate?text=${encodeURIComponent(text)}&to=${target}`);
    if (r.ok) { const d = await r.json(); if (d.translated && d.translated !== text) return d.translated; }
  } catch {}
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=Autodetect|${target}`);
    const d = await r.json();
    return d.responseData?.translatedText || text;
  } catch {}
  return text;
}

// ============ ЖАЛОБЫ ============
async function reportListing(listingId, type) {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram); return; }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reports`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ listing_id: listingId, user_id: userId, type })
    });
    if (res.ok) alert(t.thanks_report);
    else if (res.status === 409) alert(t.already_reported);
    else throw new Error();
  } catch (err) { console.error(err); alert(t.error_report); }
}
window.reportListing = reportListing;

// ============ ЛИМИТ ============
async function checkUserLimit() {
  const userId = getUserId();
  if (!userId) { alert(t.only_telegram); return false; }
  const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&is_hidden=eq.false&select=id`;
  const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
  const list = await res.json();
  if (list.length >= 2) { alert(t.limit_reached); return false; }
  return true;
}

// ============ ВАЛИДАЦИЯ ============
function validateForm(data) {
  const e = [];
  if (data.title.length < MINS.title) e.push(t.err_title_short);
  if (data.price < 30000) e.push(t.err_price_small);
  if (data.rooms < 1 || data.rooms > 10) e.push(t.err_rooms);
  if (data.area < 5 || data.area > 500) e.push(t.err_area);
  if (data.address.length < MINS.address) e.push(t.err_address);
  if (data.description.length < MINS.description) e.push(t.err_description);
  if (!data.telegram || (!data.telegram.startsWith('@') && !data.telegram.startsWith('+'))) e.push(t.err_telegram);
  return e;
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
    const num = parseNumber(value) || Number(value);
    if (num < min || num > max) { hint.textContent = `${min} – ${max}`; hint.className = 'hint hint-err'; }
    else { hint.textContent = `✅ ${t.ok}`; hint.className = 'hint hint-ok'; }
  }
}

function updateAllHints() {
  const get = id => { const el = document.getElementById(id); return el ? el.value : ''; };

  updateHint('f_title', 'h_title', get('f_title'), MINS.title);
  updateHint('f_address', 'h_address', get('f_address'), MINS.address);
  updateHint('f_description', 'h_description', get('f_description'), MINS.description);

  const priceVal = get('f_price');
  const priceHint = document.getElementById('h_price');
  if (!priceVal) { priceHint.textContent = ''; priceHint.className = 'hint'; }
  else {
    const p = parseNumber(priceVal);
    if (p < 30000) { priceHint.textContent = t.err_price_small; priceHint.className = 'hint hint-err'; }
    else { priceHint.textContent = `✅ ${t.ok}`; priceHint.className = 'hint hint-ok'; }
  }

  const roomsVal = get('f_rooms');
  const roomsHint = document.getElementById('h_rooms');
  if (!roomsVal) { roomsHint.textContent = ''; roomsHint.className = 'hint'; }
  else {
    const n = parseInt(roomsVal);
    if (n < 1 || n > 10) { roomsHint.textContent = t.err_rooms; roomsHint.className = 'hint hint-err'; }
    else { roomsHint.textContent = `✅ ${t.ok}`; roomsHint.className = 'hint hint-ok'; }
  }

  const areaVal = get('f_area');
  const areaHint = document.getElementById('h_area');
  if (!areaVal) { areaHint.textContent = ''; areaHint.className = 'hint'; }
  else {
    const n = parseInt(areaVal);
    if (n < 5 || n > 500) { areaHint.textContent = t.err_area; areaHint.className = 'hint hint-err'; }
    else { areaHint.textContent = `✅ ${t.ok}`; areaHint.className = 'hint hint-ok'; }
  }

  const tgv = get('f_telegram');
  const hint = document.getElementById('h_telegram');
  if (hint) {
    if (!tgv) { hint.textContent = ''; hint.className = 'hint'; }
    else if (tgv.startsWith('@') || tgv.startsWith('+')) { hint.textContent = '✅'; hint.className = 'hint hint-ok'; }
    else { hint.textContent = t.err_telegram; hint.className = 'hint hint-err'; }
  }
}

// ============ ФОТО ============
async function compressImage(file, maxW = 1200, q = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxW) { h = (h * maxW) / w; w = maxW; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', q);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadPhoto(file) {
  const compressed = await compressImage(file);
  const fileName = `${getUserId()}_${Date.now()}_${Math.random().toString(36).slice(2,8)}.jpg`;
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'image/jpeg',
      'x-upsert': 'true'
    },
    body: compressed
  });
  if (!res.ok) throw new Error('Upload failed');
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
}

function renderPhotoPreviews() {
  const container = document.getElementById('photosPreview');
  if (!formPhotos.length) { container.innerHTML = ''; return; }
  container.innerHTML = formPhotos.map((url, i) => `
    <div class="photo-thumb">
      <img src="${url}" alt="">
      <button type="button" class="photo-del" onclick="removePhoto(${i})">×</button>
    </div>
  `).join('');
}

function removePhoto(i) {
  formPhotos.splice(i, 1);
  renderPhotoPreviews();
}
window.removePhoto = removePhoto;

async function handlePhotoUpload(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  const status = document.getElementById('formStatus');
  status.textContent = t.uploading;
  status.style.color = '#666';
  for (const f of files) {
    if (f.size > 10 * 1024 * 1024) continue;
    try {
      const url = await uploadPhoto(f);
      formPhotos.push(url);
    } catch (err) { console.error(err); }
  }
  renderPhotoPreviews();
  status.textContent = '';
  e.target.value = '';
}

// ============ ФОРМА ============
function openAddForm() {
  editingId = null;
  formPhotos = [];
  document.getElementById('formTitle').textContent = t.new_listing;
  document.getElementById('formTitle').setAttribute('data-i18n', 'new_listing');
  clearForm();
  renderPhotoPreviews();
  document.getElementById('addModal').classList.remove('hidden');
}

async function openEditForm(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const [item] = await res.json();
    if (!item) return;
    editingId = id;
    formPhotos = Array.isArray(item.photos) ? [...item.photos] : [];
    document.getElementById('formTitle').textContent = t.edit_listing;
    document.getElementById('f_title').value = item.title || '';
    document.getElementById('f_price').value = formatNumber(item.price || 0);
    document.getElementById('f_rooms').value = item.rooms || '';
    document.getElementById('f_area').value = item.area || '';
    document.getElementById('f_address').value = item.address || '';
    document.getElementById('f_description').value = item.description || '';
    document.getElementById('f_telegram').value = item.telegram || '';
    document.getElementById('f_student').checked = !!item.student_friendly;
    updateAllHints();
    renderPhotoPreviews();
    document.getElementById('addModal').classList.remove('hidden');
  } catch (err) { console.error(err); }
}
window.openEditForm = openEditForm;

async function saveListing() {
  const status = document.getElementById('formStatus');
  status.textContent = t.saving;
  status.style.color = '#666';

  const userId = getUserId();
  if (!userId) { status.textContent = t.only_telegram; status.style.color = 'red'; return; }

  const data = {
    user_id: userId,
    title: document.getElementById('f_title').value.trim(),
    price: parseNumber(document.getElementById('f_price').value),
    rooms: parseInt(document.getElementById('f_rooms').value) || 0,
    area: parseInt(document.getElementById('f_area').value) || 0,
    address: document.getElementById('f_address').value.trim(),
    description: document.getElementById('f_description').value.trim(),
    telegram: document.getElementById('f_telegram').value.trim(),
    student_friendly: document.getElementById('f_student').checked,
    photos: formPhotos
  };

  const errors = validateForm(data);
  if (errors.length > 0) { status.innerHTML = errors.join('<br>'); status.style.color = 'red'; return; }

  try {
    let res;
    if (editingId) {
      res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${editingId}`, {
        method: 'PATCH',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify(data)
      });
    } else {
      res = await fetch(`${SUPABASE_URL}/rest/v1/listings`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify(data)
      });
    }
    if (!res.ok) throw new Error();
    status.textContent = editingId ? t.updated : t.saved;
    status.style.color = 'green';
    setTimeout(() => {
      document.getElementById('addModal').classList.add('hidden');
      clearForm();
      status.textContent = '';
      refreshView();
    }, 800);
  } catch (err) {
    console.error(err);
    status.textContent = t.error_saving;
    status.style.color = 'red';
  }
}

async function deleteListing(id) {
  if (!confirm(t.confirm_delete)) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    if (!res.ok) throw new Error();
    refreshView();
  } catch (err) { console.error(err); alert(t.error_delete); }
}
window.deleteListing = deleteListing;

function clearForm() {
  ['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const cb = document.getElementById('f_student'); if (cb) cb.checked = false;
  ['h_title','h_price','h_rooms','h_area','h_address','h_description','h_telegram'].forEach(id => {
    const el = document.getElementById(id); if (el) { el.textContent = ''; el.className = 'hint'; }
  });
}

// ============ ФИЛЬТРЫ ============
function applyFilters() {
  currentFilters = {
    min: parseNumber(document.getElementById('minPrice').value),
    max: parseNumber(document.getElementById('maxPrice').value),
    rooms: document.getElementById('rooms').value
  };
  loadListings(currentFilters);
}
function resetFilters() {
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('rooms').value = '';
  currentFilters = { min: 0, max: 0, rooms: '' };
  loadListings(currentFilters);
}

// ============ СОБЫТИЯ ============
document.getElementById('addBtn').onclick = async () => {
  const ok = await checkUserLimit();
  if (ok) openAddForm();
};
document.getElementById('cancelBtn').onclick = () => {
  document.getElementById('addModal').classList.add('hidden');
  clearForm();
};
document.getElementById('saveBtn').onclick = saveListing;
document.getElementById('filterBtn').onclick = applyFilters;
document.getElementById('resetBtn').onclick = resetFilters;
document.getElementById('langSelect').onchange = (e) => loadLang(e.target.value);
document.getElementById('photoAddBtn').onclick = () => document.getElementById('f_photos').click();
document.getElementById('f_photos').addEventListener('change', handlePhotoUpload);

document.getElementById('tabAll').onclick = () => {
  currentView = 'all';
  document.getElementById('tabAll').classList.add('active');
  document.getElementById('tabMine').classList.remove('active');
  document.getElementById('filtersBlock').style.display = 'flex';
  loadListings();
};
document.getElementById('tabMine').onclick = () => {
  currentView = 'mine';
  document.getElementById('tabMine').classList.add('active');
  document.getElementById('tabAll').classList.remove('active');
  document.getElementById('filtersBlock').style.display = 'none';
  loadMyListings();
};

attachNumberFormatting('minPrice');
attachNumberFormatting('maxPrice');
attachNumberFormatting('f_price');

['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateAllHints);
});

loadLang(detectLang());

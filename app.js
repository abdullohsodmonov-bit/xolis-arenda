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
    hero_title: "Жильё в Ташкенте",
    hero_subtitle: "Аренда квартир, комнат и койко-мест",
    search_ph: "Что вы ищете? Просто напишите...",
    tab_all: "🏠 Все объявления", tab_mine: "👤 Мои",
    view_list: "📋 Список", view_map: "🗺️ Карта",
    detail_title: "Объявление",
    min_price: "Мин. цена", max_price: "Макс. цена",
    rooms: "Комнаты", room_1: "1 комната", room_2: "2 комнаты", room_3: "3 комнаты", room_4: "4+ комнат",
    find: "Найти", reset: "Сбросить", add_listing: "➕ Добавить объявление",
    loading: "Загрузка...", no_listings: "Объявлений пока нет",
    no_my_listings: "У вас пока нет объявлений",
    error_loading: "Ошибка загрузки.", not_found: "Ничего не найдено",
    ai_thinking: "🤖 AI думает...",
    ai_found: "✨ AI нашёл по вашему запросу:",
    ai_error: "AI не смог понять запрос. Попробуйте иначе.",
    new_listing: "Новое объявление", edit_listing: "Редактировать объявление",
    f_photos: "Фотографии", add_photo: "📷 Добавить фото",
    uploading: "Загрузка фото...", geocoding: "Определяем координаты...",
    f_title: "Заголовок", f_title_ph: "Например: Квартира в Юнусабаде",
    f_price: "Цена (сум)", f_rooms: "Комнат", f_area: "Площадь (м²)",
    f_address: "Адрес", f_address_ph: "Юнусабад, 4 квартал",
    f_description: "Описание", f_description_ph: "Светлая квартира, есть всё для жизни",
    f_telegram: "Telegram арендодателя", f_telegram_ph: "@username",
    f_student: "Можно студентам",
    save: "Сохранить", cancel: "Отмена", close: "Закрыть",
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
    error_upload: "Ошибка загрузки фото",
    menu_budget: "Калькулятор бюджета",
    menu_about: "О проекте",
    menu_rules: "Правила публикации",
    menu_faq: "FAQ",
    menu_contacts: "Контакты",
    menu_theme_dark: "Тёмная тема",
    menu_theme_light: "Светлая тема",
    budget_title: "Калькулятор бюджета",
    budget_desc: "Введите ваш месячный доход — мы покажем жильё, которое вам по карману.",
    budget_income: "Ваш доход в месяц (сум)",
    budget_strict: "Не больше 30% от дохода (рекомендуется)",
    budget_apply: "Показать",
    budget_empty: "Введите доход",
    footer_about: "О проекте", footer_rules: "Правила публикации", footer_privacy: "Конфиденциальность",
    footer_help_title: "Помощь", footer_faq: "FAQ", footer_safety: "Безопасность", footer_report: "Пожаловаться",
    footer_contacts_title: "Связь", footer_telegram: "Telegram", footer_instagram: "Instagram", footer_email: "Email",
    footer_bottom: "© 2026 XolisArenda · Сделано в Узбекистане",
    details_btn: "Подробнее →",
    per_month: "в месяц",
    location: "Расположение",
    description_title: "Описание",
    about_housing: "О жилье",
    ask_ai: "Спросите AI об этой квартире",
    ai_price_fair: "Справедлива ли цена?",
    ai_student: "Подходит ли студенту?",
    ai_amenities: "Что из удобств?",
    ai_open: "Открыть HeyXolis",
    verified: "Проверенное объявление",
    similar: "Похожие в этом районе",
    contact_owner: "Связаться с владельцем",
    about_price: "О цене",
    monthly: "В месяц",
    per_m2: "За м²",
    deposit: "Залог",
    negotiable: "по договорённости",
    yandex_nav: "Открыть в Яндекс.Навигаторе",
    thinking: "Думаю...",
    typewriter: [
      "Что вы ищете? Просто напишите...",
      "2-комнатная в Юнусабаде до 3 млн",
      "Комната для студента в Чиланзаре",
      "Жильё рядом с метро"
    ]
  },
  uz: {
    hero_title: "Toshkentda uy", hero_subtitle: "Kvartira, xona va joylarni ijaraga olish",
    search_ph: "Nima qidirmoqdasiz? Yozing...",
    tab_all: "🏠 Barcha e'lonlar", tab_mine: "👤 Mening",
    view_list: "📋 Ro'yxat", view_map: "🗺️ Xarita",
    detail_title: "E'lon",
    min_price: "Min. narx", max_price: "Maks. narx",
    rooms: "Xonalar", room_1: "1 xona", room_2: "2 xona", room_3: "3 xona", room_4: "4+ xona",
    find: "Qidirish", reset: "Tozalash", add_listing: "➕ E'lon qo'shish",
    loading: "Yuklanmoqda...", no_listings: "Hozircha e'lonlar yo'q",
    no_my_listings: "Sizda hali e'lonlar yo'q",
    error_loading: "Yuklashda xatolik.", not_found: "Hech narsa topilmadi",
    ai_thinking: "🤖 AI o'ylayapti...",
    ai_found: "✨ AI topdi:",
    ai_error: "AI so'rovni tushunmadi.",
    new_listing: "Yangi e'lon", edit_listing: "E'lonni tahrirlash",
    f_photos: "Rasmlar", add_photo: "📷 Rasm qo'shish",
    uploading: "Rasm yuklanmoqda...", geocoding: "Koordinatalar aniqlanmoqda...",
    f_title: "Sarlavha", f_title_ph: "Masalan: Yunusobodda kvartira",
    f_price: "Narx (so'm)", f_rooms: "Xonalar soni", f_area: "Maydon (m²)",
    f_address: "Manzil", f_address_ph: "Yunusobod, 4-mavze",
    f_description: "Tavsif", f_description_ph: "Yorug' kvartira",
    f_telegram: "Telegram", f_telegram_ph: "@username",
    f_student: "Talabalarga mumkin",
    save: "Saqlash", cancel: "Bekor qilish", close: "Yopish",
    saving: "Saqlanmoqda...", saved: "Saqlandi! ✅", updated: "Yangilandi! ✅",
    error_saving: "Saqlashda xatolik",
    write_telegram: "Telegramga yozish",
    students_ok: "🎓 Talabalarga mumkin",
    sum: "so'm", rooms_short: "xona",
    report_broker: "Bu makler", report_not_actual: "Aktual emas",
    only_telegram: "Faqat Telegram orqali.",
    thanks_report: "Rahmat!",
    already_reported: "Siz allaqachon shikoyat qilgansiz.",
    error_report: "Xatolik.",
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
    deleted: "O'chirildi", error_delete: "Xatolik",
    error_upload: "Rasm yuklashda xatolik",
    menu_budget: "Budjet kalkulyatori", menu_about: "Loyiha haqida",
    menu_rules: "E'lon qoidalari", menu_faq: "FAQ", menu_contacts: "Aloqa",
    menu_theme_dark: "Tungi rejim",
    menu_theme_light: "Kunduzgi rejim",
    budget_title: "Budjet kalkulyatori",
    budget_desc: "Oylik daromadingizni kiriting.",
    budget_income: "Oylik daromad (so'm)",
    budget_strict: "Daromadning 30% dan ko'p emas",
    budget_apply: "Ko'rsatish", budget_empty: "Daromadni kiriting",
    footer_about: "Loyiha haqida", footer_rules: "E'lon qoidalari", footer_privacy: "Maxfiylik",
    footer_help_title: "Yordam", footer_faq: "FAQ", footer_safety: "Xavfsizlik", footer_report: "Shikoyat",
    footer_contacts_title: "Aloqa", footer_telegram: "Telegram", footer_instagram: "Instagram", footer_email: "Email",
    footer_bottom: "© 2026 XolisArenda · O'zbekistonda yaratilgan",
    details_btn: "Batafsil →",
    per_month: "oyiga",
    location: "Joylashuv",
    description_title: "Tavsif",
    about_housing: "Uy haqida",
    ask_ai: "AI'dan so'rang",
    ai_price_fair: "Narx adolatlimi?",
    ai_student: "Talabaga mosmi?",
    ai_amenities: "Qulayliklar?",
    ai_open: "HeyXolis'ni ochish",
    verified: "Tekshirilgan e'lon",
    similar: "Shu tumandagi o'xshashlar",
    contact_owner: "Egasi bilan bog'lanish",
    about_price: "Narx haqida",
    monthly: "Oylik",
    per_m2: "m² uchun",
    deposit: "Garov",
    negotiable: "kelishuv bo'yicha",
    yandex_nav: "Yandex Navigator-da ochish",
    thinking: "O'ylayapman...",
    typewriter: [
      "Nima qidirmoqdasiz? Yozing...",
      "Yunusobodda 2 xonali 3 mln gacha",
      "Chilonzorda talabaga xona",
      "Metro yonida uy"
    ]
  },
  en: {
    hero_title: "Housing in Tashkent", hero_subtitle: "Apartments, rooms and beds for rent",
    search_ph: "What are you looking for? Just type...",
    tab_all: "🏠 All listings", tab_mine: "👤 Mine",
    view_list: "📋 List", view_map: "🗺️ Map",
    detail_title: "Listing",
    min_price: "Min. price", max_price: "Max. price",
    rooms: "Rooms", room_1: "1 room", room_2: "2 rooms", room_3: "3 rooms", room_4: "4+ rooms",
    find: "Search", reset: "Reset", add_listing: "➕ Add listing",
    loading: "Loading...", no_listings: "No listings yet",
    no_my_listings: "You have no listings yet",
    error_loading: "Loading error.", not_found: "Nothing found",
    ai_thinking: "🤖 AI is thinking...",
    ai_found: "✨ AI found:",
    ai_error: "AI couldn't understand.",
    new_listing: "New listing", edit_listing: "Edit listing",
    f_photos: "Photos", add_photo: "📷 Add photo",
    uploading: "Uploading...", geocoding: "Getting coordinates...",
    f_title: "Title", f_title_ph: "Example: Apartment in Yunusabad",
    f_price: "Price (sum)", f_rooms: "Rooms", f_area: "Area (m²)",
    f_address: "Address", f_address_ph: "Yunusabad, 4th block",
    f_description: "Description", f_description_ph: "Bright apartment",
    f_telegram: "Telegram", f_telegram_ph: "@username",
    f_student: "Students allowed",
    save: "Save", cancel: "Cancel", close: "Close",
    saving: "Saving...", saved: "Saved! ✅", updated: "Updated! ✅",
    error_saving: "Save error",
    write_telegram: "Message on Telegram",
    students_ok: "🎓 Students allowed",
    sum: "sum", rooms_short: "rooms",
    report_broker: "This is a broker", report_not_actual: "Not actual",
    only_telegram: "Telegram only.",
    thanks_report: "Thanks!",
    already_reported: "You already reported.",
    error_report: "Error.",
    limit_reached: "You already have 2 active listings.",
    err_title_short: "Title minimum 10 characters.",
    err_price_small: "Price minimum 30,000 sum.",
    err_rooms: "Rooms between 1 and 10.",
    err_area: "Area between 5 and 500 m².",
    err_address: "Address minimum 5 characters.",
    err_description: "Description minimum 30 characters.",
    err_telegram: "Telegram must start with @ or +.",
    chars_min: "chars min", max_value: "Max", ok: "Ok",
    translate: "Translate", show_original: "Original",
    translate_error: "Translation failed.",
    edit: "✏️ Edit", delete: "🗑️ Delete",
    confirm_delete: "Delete listing?",
    deleted: "Deleted", error_delete: "Delete error",
    error_upload: "Photo upload error",
    menu_budget: "Budget calculator", menu_about: "About",
    menu_rules: "Posting rules", menu_faq: "FAQ", menu_contacts: "Contacts",
    menu_theme_dark: "Dark theme",
    menu_theme_light: "Light theme",
    budget_title: "Budget calculator",
    budget_desc: "Enter your monthly income.",
    budget_income: "Monthly income (sum)",
    budget_strict: "Not more than 30% of income",
    budget_apply: "Show", budget_empty: "Enter income",
    footer_about: "About", footer_rules: "Posting rules", footer_privacy: "Privacy",
    footer_help_title: "Help", footer_faq: "FAQ", footer_safety: "Safety", footer_report: "Report",
    footer_contacts_title: "Contacts", footer_telegram: "Telegram", footer_instagram: "Instagram", footer_email: "Email",
    footer_bottom: "© 2026 XolisArenda · Made in Uzbekistan",
    details_btn: "Details →",
    per_month: "per month",
    location: "Location",
    description_title: "Description",
    about_housing: "About",
    ask_ai: "Ask AI about this apartment",
    ai_price_fair: "Is price fair?",
    ai_student: "Good for student?",
    ai_amenities: "Amenities?",
    ai_open: "Open HeyXolis",
    verified: "Verified listing",
    similar: "Similar in this area",
    contact_owner: "Contact owner",
    about_price: "About price",
    monthly: "Monthly",
    per_m2: "Per m²",
    deposit: "Deposit",
    negotiable: "negotiable",
    yandex_nav: "Open in Yandex Navigator",
    thinking: "Thinking...",
    typewriter: [
      "What are you looking for? Just type...",
      "2-room in Yunusabad under 3M",
      "Room for student in Chilanzar",
      "Housing near metro"
    ]
  }
};

let t = TRANSLATIONS.ru;
let lang = 'ru';
let translatedCards = {};
let currentFilters = { min: 0, max: 0, rooms: '', text: '', maxBudget: 0 };
let currentView = 'all';
let currentDisplay = 'list';
let editingId = null;
let formPhotos = [];
let leafletMap = null;
let mapMarkers = [];
let allListingsCache = [];
let typewriterTimer = null;
let typewriterRunning = false;
let currentDetailItem = null;
let heyXolisHistory = [];

// ============ ТЕМА ============
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (icon && label) {
    if (theme === 'dark') {
      icon.textContent = '☀️';
      label.textContent = (t && t.menu_theme_light) || 'Светлая тема';
    } else {
      icon.textContent = '🌙';
      label.textContent = (t && t.menu_theme_dark) || 'Тёмная тема';
    }
  }
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
  const menu = document.getElementById('menuDropdown');
  if (menu) menu.classList.add('hidden');
}
window.toggleTheme = toggleTheme;

function detectTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const tgTheme = tg?.colorScheme;
  if (tgTheme === 'dark') return 'dark';
  if (tgTheme === 'light') return 'light';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

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
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (icon && label) {
    if (current === 'dark') {
      icon.textContent = '☀️';
      label.textContent = t.menu_theme_light;
    } else {
      icon.textContent = '🌙';
      label.textContent = t.menu_theme_dark;
    }
  }
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
  startTypewriter();
  refreshView();
}

// ============ АНИМАЦИЯ ПЕЧАТИ ============
function startTypewriter() {
  const input = document.getElementById('searchText');
  if (!input) return;
  if (typewriterRunning) return;
  typewriterRunning = true;
  input.dataset.userTyped = '0';
  const phrases = t.typewriter || TRANSLATIONS.ru.typewriter;
  let phraseIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    if (input.dataset.userTyped === '1') { typewriterRunning = false; return; }
    const current = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      input.placeholder = current.slice(0, charIdx);
      if (charIdx >= current.length) { deleting = true; typewriterTimer = setTimeout(tick, 2200); return; }
      typewriterTimer = setTimeout(tick, 55);
    } else {
      charIdx--;
      input.placeholder = current.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typewriterTimer = setTimeout(tick, 400);
        return;
      }
      typewriterTimer = setTimeout(tick, 25);
    }
  }
  typewriterTimer = setTimeout(tick, 800);
}
function stopTypewriter() {
  if (typewriterTimer) clearTimeout(typewriterTimer);
  typewriterTimer = null;
  typewriterRunning = false;
}

// ============ ГЕОКОДИНГ ============
async function geocodeAddress(address) {
  if (!address) return null;
  try {
    const q = encodeURIComponent(address + ', Узбекистан');
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&accept-language=ru`;
    const res = await fetch(url, { headers: { 'User-Agent': 'XolisArenda/1.0' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (err) { console.error('Geocode error:', err); return null; }
}

// ============ МЕНЮ ============
document.getElementById('menuBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('menuDropdown').classList.toggle('hidden');
});
document.addEventListener('click', (e) => {
  const menu = document.getElementById('menuDropdown');
  if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

// ============ ИНФО ============
const INFO_CONTENT = {
  ru: {
    about: `<h3>О проекте XolisArenda</h3><p>XolisArenda — это бесплатная платформа для поиска аренды жилья в Узбекистане. Мы помогаем студентам и приезжим найти жильё без маклеров и лишних комиссий.</p><p>Наша цель — сделать рынок аренды прозрачнее, безопаснее и удобнее для всех.</p>`,
    rules: `<h3>Правила публикации</h3><ul><li>Публиковать можно только реальные объявления о сдаче жилья.</li><li>Заголовок — минимум 10 символов.</li><li>Описание — минимум 30 символов.</li><li>Цена — не ниже 30 000 сум.</li><li>Максимум 2 активных объявления.</li></ul>`,
    faq: `<h3>FAQ</h3><p><b>Сколько стоит публикация?</b><br>Сейчас — бесплатно.</p><p><b>Кто проверяет объявления?</b><br>Пользователи могут жаловаться. После 10 жалоб — автоскрытие.</p>`,
    privacy: `<h3>Конфиденциальность</h3><p>Мы используем только ваш Telegram ID.</p>`,
    safety: `<h3>Безопасность</h3><ul><li>Никогда не отправляйте предоплату до просмотра.</li><li>Встречайтесь лично.</li><li>Подписывайте договор аренды.</li></ul>`,
    report: `<h3>Пожаловаться</h3><p>Напишите: <b>@xolisarenda_support</b>.</p>`,
    contacts: `<h3>Контакты</h3><p><b>Telegram:</b> @xolisarenda_support</p><p><b>Email:</b> info@xolisarenda.uz</p><p><b>Instagram:</b> @xolisarenda</p>`
  },
  uz: {
    about: `<h3>XolisArenda haqida</h3><p>Bepul platforma O'zbekistonda ijara uylarni topish uchun.</p>`,
    rules: `<h3>Qoidalar</h3><ul><li>Faqat real e'lonlar.</li><li>Sarlavha kamida 10 belgi.</li><li>Tavsif kamida 30 belgi.</li><li>Narx kamida 30 000 so'm.</li></ul>`,
    faq: `<h3>FAQ</h3><p>Hozircha bepul.</p>`,
    privacy: `<h3>Maxfiylik</h3><p>Faqat Telegram ID.</p>`,
    safety: `<h3>Xavfsizlik</h3><ul><li>Oldindan to'lov qilmang.</li><li>Shaxsan uchrashing.</li><li>Shartnoma imzolang.</li></ul>`,
    report: `<h3>Shikoyat</h3><p>Yozing: <b>@xolisarenda_support</b>.</p>`,
    contacts: `<h3>Aloqa</h3><p><b>Telegram:</b> @xolisarenda_support</p><p><b>Email:</b> info@xolisarenda.uz</p>`
  },
  en: {
    about: `<h3>About</h3><p>Free platform for rental housing in Uzbekistan.</p>`,
    rules: `<h3>Rules</h3><ul><li>Only real listings.</li><li>Title min 10 chars.</li><li>Description min 30 chars.</li><li>Price min 30,000 sum.</li></ul>`,
    faq: `<h3>FAQ</h3><p>Free for now.</p>`,
    privacy: `<h3>Privacy</h3><p>Only Telegram ID is used.</p>`,
    safety: `<h3>Safety</h3><ul><li>Never pay in advance.</li><li>Meet in person.</li><li>Sign a lease.</li></ul>`,
    report: `<h3>Report</h3><p>Contact: <b>@xolisarenda_support</b>.</p>`,
    contacts: `<h3>Contacts</h3><p><b>Telegram:</b> @xolisarenda_support</p><p><b>Email:</b> info@xolisarenda.uz</p>`
  }
};

function openInfo(key) {
  const titles = {
    about: t.menu_about, rules: t.menu_rules, faq: t.menu_faq,
    privacy: t.footer_privacy, safety: t.footer_safety, report: t.footer_report,
    contacts: t.menu_contacts
  };
  document.getElementById('infoTitle').textContent = titles[key] || 'Info';
  document.getElementById('infoBody').innerHTML = INFO_CONTENT[lang][key] || '';
  document.getElementById('infoModal').classList.remove('hidden');
  document.getElementById('menuDropdown').classList.add('hidden');
}
window.openInfo = openInfo;

document.getElementById('infoClose').onclick = () => {
  document.getElementById('infoModal').classList.add('hidden');
};

// ============ БЮДЖЕТ ============
function openBudgetCalc() {
  document.getElementById('menuDropdown').classList.add('hidden');
  document.getElementById('budgetModal').classList.remove('hidden');
  document.getElementById('budgetStatus').textContent = '';
}
window.openBudgetCalc = openBudgetCalc;

document.getElementById('budgetCancel').onclick = () => {
  document.getElementById('budgetModal').classList.add('hidden');
};

document.getElementById('budgetApply').onclick = () => {
  const income = parseNumber(document.getElementById('budgetIncome').value);
  const status = document.getElementById('budgetStatus');
  if (income < 30000) { status.textContent = t.budget_empty; status.style.color = '#d32f2f'; return; }
  const strict = document.getElementById('budgetStrict').checked;
  const maxBudget = strict ? Math.round(income * 0.3) : income;
  document.getElementById('budgetModal').classList.add('hidden');
  currentFilters = { min: 0, max: 0, rooms: '', text: '', maxBudget };
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = formatNumber(maxBudget);
  document.getElementById('rooms').value = '';
  document.getElementById('searchText').value = '';
  loadListings(currentFilters);
};
attachNumberFormatting('budgetIncome');

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
    if (currentFilters.maxBudget > 0) url += `&price=lte.${currentFilters.maxBudget}`;
    if (currentFilters.rooms) url += `&rooms=eq.${currentFilters.rooms}`;
    if (currentFilters.text) {
      const q = encodeURIComponent(`*${currentFilters.text}*`);
      url += `&or=(title.ilike.${q},address.ilike.${q},description.ilike.${q})`;
    }
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) throw new Error();
    let listings = await res.json();

    if (currentFilters.district) {
      const d = currentFilters.district.toLowerCase();
      listings = listings.filter(l =>
        (l.address && l.address.toLowerCase().includes(d)) ||
        (l.title && l.title.toLowerCase().includes(d)) ||
        (l.description && l.description.toLowerCase().includes(d))
      );
    }
    if (currentFilters.keywords) {
      const k = currentFilters.keywords.toLowerCase();
      listings = listings.filter(l =>
        (l.title && l.title.toLowerCase().includes(k)) ||
        (l.description && l.description.toLowerCase().includes(k))
      );
    }
    if (currentFilters.studentFriendly === true) {
      listings = listings.filter(l => l.student_friendly === true);
    }

    if (listings.length === 0 && (currentFilters.min || currentFilters.max || currentFilters.rooms || currentFilters.text || currentFilters.maxBudget || currentFilters.district || currentFilters.keywords || currentFilters.studentFriendly)) {
      container.innerHTML = `<p class="empty">${t.not_found}</p>`;
      allListingsCache = [];
      if (currentDisplay === 'map') renderMap([]);
      return;
    }
    allListingsCache = listings;
    renderListings(listings, false);
    if (currentDisplay === 'map') renderMap(listings);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.error_loading}</p>`;
  }
}

async function loadMyListings() {
  const container = document.getElementById('listings');
  const userId = getUserId();
  if (!userId) { container.innerHTML = `<p class="empty">${t.only_telegram}</p>`; return; }
  container.innerHTML = `<p class="empty">${t.loading}</p>`;
  try {
    const url = `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&order=created_at.desc`;
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) throw new Error();
    const listings = await res.json();
    if (!listings.length) { container.innerHTML = `<p class="empty">${t.no_my_listings}</p>`; return; }
    allListingsCache = listings;
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

// ============ КАРТА ============
function renderMap(listings) {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  if (!leafletMap) {
    leafletMap = L.map('map', { zoomControl: true }).setView([41.311, 69.279], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap'
    }).addTo(leafletMap);
  }
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];
  const validPoints = [];
  listings.forEach(item => {
    if (!item.lat || !item.lng) return;
    validPoints.push([item.lat, item.lng]);
    const priceLabel = `${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')}`;
    const icon = L.divIcon({
      className: '',
      html: `<div class="price-marker">${priceLabel}</div>`,
      iconSize: [90, 30], iconAnchor: [45, 15]
    });
    const marker = L.marker([item.lat, item.lng], { icon })
      .addTo(leafletMap)
      .on('click', () => showMapCard(item));
    mapMarkers.push(marker);
  });
  if (validPoints.length > 0) {
    leafletMap.fitBounds(validPoints, { padding: [40, 40], maxZoom: 15 });
  }
  setTimeout(() => leafletMap.invalidateSize(), 200);
}

function showMapCard(item) {
  const card = document.getElementById('mapCard');
  const photo = document.getElementById('mapCardPhoto');
  const title = document.getElementById('mapCardTitle');
  const price = document.getElementById('mapCardPrice');
  const details = document.getElementById('mapCardDetails');
  const openBtn = document.getElementById('mapCardOpen');

  const photos = Array.isArray(item.photos) ? item.photos : [];
  if (photos.length) {
    photo.style.backgroundImage = `url('${photos[0]}')`;
    photo.style.display = 'block';
  } else {
    photo.style.backgroundImage = '';
    photo.style.display = 'none';
  }
  title.textContent = item.title;
  price.textContent = `${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}`;
  details.textContent = `${item.rooms} ${t.rooms_short} · ${item.area} м² · ${item.address || ''}`;
  openBtn.textContent = t.details_btn;
  openBtn.onclick = () => { closeMapCard(); openDetail(item.id); };
  card.classList.remove('hidden');
}
function closeMapCard() {
  document.getElementById('mapCard').classList.add('hidden');
}
window.closeMapCard = closeMapCard;

// ============ ПЕРЕКЛЮЧАТЕЛЬ ВИДА ============
document.getElementById('viewList').onclick = () => {
  currentDisplay = 'list';
  document.getElementById('viewList').classList.add('active');
  document.getElementById('viewMap').classList.remove('active');
  document.getElementById('listings').classList.remove('hidden');
  document.getElementById('mapContainer').classList.add('hidden');
  closeMapCard();
};
document.getElementById('viewMap').onclick = () => {
  currentDisplay = 'map';
  document.getElementById('viewMap').classList.add('active');
  document.getElementById('viewList').classList.remove('active');
  document.getElementById('listings').classList.add('hidden');
  document.getElementById('mapContainer').classList.remove('hidden');
  refreshView();
};

// ============ AI-ПОИСК ============
async function aiSearch(query) {
  const container = document.getElementById('listings');
  container.innerHTML = `<p class="empty">${t.ai_thinking}</p>`;
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error('AI error');
    const data = await res.json();
    const f = data.filters || {};
    currentFilters = {
      min: f.minPrice || 0, max: f.maxPrice || 0,
      rooms: f.rooms ? String(f.rooms) : '',
      text: f.keywords || '', maxBudget: 0,
      district: f.district || '',
      studentFriendly: f.studentFriendly === true
    };
    document.getElementById('minPrice').value = f.minPrice ? formatNumber(f.minPrice) : '';
    document.getElementById('maxPrice').value = f.maxPrice ? formatNumber(f.maxPrice) : '';
    document.getElementById('rooms').value = f.rooms ? String(f.rooms) : '';
    container.innerHTML = `<p class="empty">${t.ai_found} <b>«${query}»</b></p>`;
    setTimeout(() => loadListings(currentFilters), 400);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="empty">${t.ai_error}</p>`;
    setTimeout(() => loadListings(), 800);
  }
}

// ============ ПОЛНЫЙ ПРОСМОТР ============
async function openDetail(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${id}&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const [item] = await res.json();
    if (!item) return;

    currentDetailItem = item;
    heyXolisHistory = [];

    const photos = Array.isArray(item.photos) ? item.photos : [];
    const isMine = item.user_id === getUserId();
    const tr = translatedCards[item.id];
    const title = tr ? tr.title : item.title;
    const address = tr ? tr.address : item.address;
    const description = tr ? tr.description : item.description;
    const isTranslated = !!tr;

    const headerTitle = document.getElementById('detailHeaderTitle');
    if (headerTitle) headerTitle.textContent = title.length > 30 ? title.slice(0, 30) + '…' : title;

    const galleryHtml = photos.length ? `
      <div class="detail-gallery">
        <div class="gallery-scroll">
          ${photos.map(u => `<img src="${u}" alt="">`).join('')}
        </div>
        ${photos.length > 1 ? `<div class="gallery-dots">${photos.map((_, i) => `<span class="dot${i===0?' active':''}"></span>`).join('')}</div>` : ''}
      </div>
    ` : '';

    const desc = (description || '').toLowerCase();
    const tags = [];
    if (item.student_friendly) tags.push('🎓 ' + (lang === 'ru' ? 'Студентам можно' : lang === 'uz' ? 'Talabalarga mumkin' : 'Students allowed'));
    if (desc.includes('интернет') || desc.includes('wi-fi') || desc.includes('wifi')) tags.push('📶 Интернет');
    if (desc.includes('кондиционер')) tags.push('❄️ Кондиционер');
    if (desc.includes('стиральн')) tags.push('🧺 Стиральная машина');
    if (desc.includes('холодильник')) tags.push('🧊 Холодильник');
    if (desc.includes('телевизор') || desc.includes('тв ')) tags.push('📺 Телевизор');
    if (desc.includes('мебел')) tags.push('🪑 С мебелью');
    if (desc.includes('балкон')) tags.push('🌿 Балкон');
    if (desc.includes('кухн')) tags.push('🍳 Кухня');
    if (desc.includes('ремонт')) tags.push('🛠️ Ремонт');
    if (desc.includes('метро')) tags.push('🚇 ' + (lang === 'ru' ? 'Рядом с метро' : 'Metro yonida'));
    if (tags.length > 6) tags.length = 6;

    const pricePerM2 = item.area ? Math.round(item.price / item.area) : 0;

    let similarHtml = '';
    try {
      const simRes = await fetch(`${SUPABASE_URL}/rest/v1/listings?select=id,title,price,rooms,area,address,photos&is_hidden=eq.false&id=neq.${id}&order=created_at.desc&limit=20`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      const simAll = await simRes.json();
      const myAddr = (item.address || '').toLowerCase().split(' ').filter(w => w.length > 3);
      const similar = simAll.filter(s => {
        const sa = (s.address || '').toLowerCase();
        return myAddr.some(w => sa.includes(w));
      }).slice(0, 4);

      if (similar.length) {
        similarHtml = `
          <h2 class="detail-section-title">${t.similar}</h2>
          <div class="detail-similar">
            ${similar.map(s => {
              const sp = Array.isArray(s.photos) ? s.photos : [];
              return `
                <div class="detail-similar-card" onclick="closeDetail(); setTimeout(()=>openDetail(${s.id}), 300)">
                  <div class="detail-similar-photo" style="${sp[0] ? `background-image:url('${sp[0]}')` : ''}"></div>
                  <div class="detail-similar-info">
                    <h5>${s.title}</h5>
                    <div class="price">${Number(s.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}</div>
                    <div class="meta">${s.rooms} ${t.rooms_short} · ${s.area} м²</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    } catch (err) { console.error('Similar error:', err); }

    let mapHtml = '', navHtml = '';
    if (item.lat && item.lng) {
      mapHtml = `
        <h2 class="detail-section-title">${t.location}</h2>
        <div id="detailMiniMap" class="detail-map"></div>
      `;
      const yNav = `yandexnavi://build_route_on_map?lat_to=${item.lat}&lon_to=${item.lng}`;
      navHtml = `
        <a class="detail-map-nav" href="${yNav}" target="_blank" rel="noopener" style="margin-top:8px;">
          🚗 ${t.yandex_nav}
        </a>
      `;
    }

    const actionsHtml = isMine ? `
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
    `;

    document.getElementById('detailContent').innerHTML = `
      ${galleryHtml}
      <div class="detail-body">
        <h1 class="detail-hero-title">${title}</h1>

        <div class="detail-loc-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>${address || ''}</span>
        </div>

        <div class="detail-price-hero">
          <span class="detail-price-big">${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}</span>
          <span class="detail-price-caption">${t.per_month}</span>
        </div>

        <div class="detail-stats-row">
          <div class="detail-stat">
            <div class="detail-stat-value">${item.rooms}</div>
            <div class="detail-stat-label">${lang === 'ru' ? 'комнаты' : lang === 'uz' ? 'xona' : 'rooms'}</div>
          </div>
          <div class="detail-stat">
            <div class="detail-stat-value">${item.area}</div>
            <div class="detail-stat-label">м²</div>
          </div>
          <div class="detail-stat">
            <div class="detail-stat-value">${pricePerM2.toLocaleString('ru-RU').replace(/,/g, ' ')}</div>
            <div class="detail-stat-label">${t.per_m2}</div>
          </div>
        </div>

        <div class="detail-verified">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${t.verified}</span>
        </div>

        ${tags.length ? `<div class="detail-tags">${tags.map(tg => `<span class="detail-tag">${tg}</span>`).join('')}</div>` : ''}

        ${description ? `
          <h2 class="detail-section-title">${t.description_title}</h2>
          <p class="detail-desc-text">${description}</p>
        ` : ''}

        <h2 class="detail-section-title">${t.about_housing}</h2>
        <div class="detail-grid">
          <div class="detail-grid-row"><span>${lang === 'ru' ? 'Комнаты' : lang === 'uz' ? 'Xonalar' : 'Rooms'}</span><span>${item.rooms}</span></div>
          <div class="detail-grid-row"><span>${lang === 'ru' ? 'Площадь' : lang === 'uz' ? 'Maydon' : 'Area'}</span><span>${item.area} м²</span></div>
          <div class="detail-grid-row"><span>${t.per_m2}</span><span>${pricePerM2.toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}</span></div>
          <div class="detail-grid-row"><span>${lang === 'ru' ? 'Студентам' : lang === 'uz' ? 'Talabalarga' : 'Students'}</span><span>${item.student_friendly ? '✓' : '—'}</span></div>
        </div>

        ${mapHtml}
        ${navHtml}

        <h2 class="detail-section-title">${t.ask_ai}</h2>
        <div class="detail-ai-chips">
          <button class="ai-chip" onclick="openHeyXolisWith('${t.ai_price_fair.replace(/'/g, "")}')">✨ ${t.ai_price_fair}</button>
          <button class="ai-chip" onclick="openHeyXolisWith('${t.ai_student.replace(/'/g, "")}')">✨ ${t.ai_student}</button>
          <button class="ai-chip" onclick="openHeyXolisWith('${t.ai_amenities.replace(/'/g, "")}')">✨ ${t.ai_amenities}</button>
        </div>
        <button class="open-heyxolis-btn" onclick="openHeyXolis()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3l1.8 5.4L19.2 10l-5.4 1.8L12 17.2l-1.8-5.4L4.8 10l5.4-1.6L12 3z"/>
            <path d="M19 2l.4 1.3L20.7 3.7l-1.3.4L19 5.4l-.4-1.3L17.3 3.7l1.3-.4L19 2z"/>
          </svg>
          ${t.ai_open}
        </button>

        ${similarHtml}
        ${actionsHtml}
      </div>

      <div class="detail-sticky-contact">
        <div class="detail-sticky-price">
          ${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')} ${t.sum}
          <small>${t.per_month}</small>
        </div>
        ${item.telegram ? `<a class="detail-sticky-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">${t.write_telegram}</a>` : ''}
      </div>
    `;

    const sidebar = document.getElementById('detailSidebar');
    if (sidebar) {
      sidebar.classList.remove('hidden');
      sidebar.innerHTML = `
        <div class="sidebar-card">
          <h4>${t.contact_owner}</h4>
          ${item.telegram ? `<a class="sidebar-contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">✉️ ${t.write_telegram}</a>` : ''}
        </div>
        <div class="sidebar-card">
          <h4>${t.about_price}</h4>
          <div class="detail-grid">
            <div class="detail-grid-row"><span>${t.monthly}</span><span><b>${Number(item.price).toLocaleString('ru-RU').replace(/,/g, ' ')}</b></span></div>
            <div class="detail-grid-row"><span>${t.per_m2}</span><span>${pricePerM2.toLocaleString('ru-RU').replace(/,/g, ' ')}</span></div>
            <div class="detail-grid-row"><span>${t.deposit}</span><span>${t.negotiable}</span></div>
          </div>
        </div>
      `;
    }

    document.getElementById('detailModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('detailModal').scrollTop = 0;
    attachGalleryListeners();

    const floatBtn = document.getElementById('floatingAI');
    if (floatBtn) floatBtn.classList.remove('hidden');

    if (item.lat && item.lng) {
      setTimeout(() => {
        const dm = document.getElementById('detailMiniMap');
        if (!dm) return;
        const mini = L.map('detailMiniMap', { zoomControl: false, attributionControl: false }).setView([item.lat, item.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mini);
        L.marker([item.lat, item.lng]).addTo(mini);
        setTimeout(() => mini.invalidateSize(), 200);
      }, 100);
    }
  } catch (err) { console.error(err); }
}
window.openDetail = openDetail;

function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
  document.body.style.overflow = '';
  const sidebar = document.getElementById('detailSidebar');
  if (sidebar) sidebar.classList.add('hidden');
  const floatBtn = document.getElementById('floatingAI');
  if (floatBtn) floatBtn.classList.add('hidden');
}
window.closeDetail = closeDetail;

async function translateDetail(id) {
  await toggleTranslate(id);
  openDetail(id);
}
window.translateDetail = translateDetail;

// ============ HeyXolis ============
function openHeyXolis() {
  document.getElementById('heyXolisModal').classList.remove('hidden');
  document.getElementById('heyXolisMessages').innerHTML = '';
  heyXolisHistory = [];
  setTimeout(() => document.getElementById('heyXolisInput').focus(), 200);
}
window.openHeyXolis = openHeyXolis;

function openHeyXolisWith(q) {
  openHeyXolis();
  document.getElementById('heyXolisInput').value = q;
  askHeyXolis();
}
window.openHeyXolisWith = openHeyXolisWith;

function closeHeyXolis() {
  document.getElementById('heyXolisModal').classList.add('hidden');
}
window.closeHeyXolis = closeHeyXolis;

async function askHeyXolis(presetQuestion) {
  const input = document.getElementById('heyXolisInput');
  const q = presetQuestion || input.value.trim();
  if (!q || !currentDetailItem) return;

  const msgs = document.getElementById('heyXolisMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'heyxolis-msg user';
  userMsg.textContent = q;
  msgs.appendChild(userMsg);
  input.value = '';

  const thinkMsg = document.createElement('div');
  thinkMsg.className = 'heyxolis-msg thinking';
  thinkMsg.textContent = '🤖 ' + (t.thinking || 'Думаю...');
  msgs.appendChild(thinkMsg);
  msgs.scrollTop = msgs.scrollHeight;

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listing: {
          title: currentDetailItem.title,
          address: currentDetailItem.address,
          price: currentDetailItem.price,
          rooms: currentDetailItem.rooms,
          area: currentDetailItem.area,
          description: currentDetailItem.description,
          student_friendly: currentDetailItem.student_friendly
        },
        question: q,
        history: heyXolisHistory
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('AI error status:', res.status, 'body:', errText);
      throw new Error('HTTP ' + res.status);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    thinkMsg.remove();
    const aiMsg = document.createElement('div');
    aiMsg.className = 'heyxolis-msg ai';
    aiMsg.textContent = data.answer || '...';
    msgs.appendChild(aiMsg);
    msgs.scrollTop = msgs.scrollHeight;

    heyXolisHistory.push({ role: 'user', content: q });
    heyXolisHistory.push({ role: 'assistant', content: data.answer || '' });
  } catch (err) {
    console.error('HeyXolis error:', err);
    thinkMsg.textContent = '❌ ' + (lang === 'ru' ? `Ошибка: ${err.message}. Попробуйте позже.` : `Error: ${err.message}`);
  }
}
window.askHeyXolis = askHeyXolis;

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

  const address = document.getElementById('f_address').value.trim();
  const data = {
    user_id: userId,
    title: document.getElementById('f_title').value.trim(),
    price: parseNumber(document.getElementById('f_price').value),
    rooms: parseInt(document.getElementById('f_rooms').value) || 0,
    area: parseInt(document.getElementById('f_area').value) || 0,
    address,
    description: document.getElementById('f_description').value.trim(),
    telegram: document.getElementById('f_telegram').value.trim(),
    student_friendly: document.getElementById('f_student').checked,
    photos: formPhotos
  };

  const errors = validateForm(data);
  if (errors.length > 0) { status.innerHTML = errors.join('<br>'); status.style.color = 'red'; return; }

  if (!editingId) {
    status.textContent = t.geocoding;
    const coords = await geocodeAddress(address);
    if (coords) { data.lat = coords.lat; data.lng = coords.lng; }
  }

  try {
    let res;
    if (editingId) {
      res = await fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${editingId}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
    } else {
      res = await fetch(`${SUPABASE_URL}/rest/v1/listings`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error('Save error:', res.status, errText);
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const result = await res.json();
    console.log('Saved:', result);

    status.textContent = editingId ? t.updated : t.saved;
    status.style.color = 'green';

    setTimeout(() => {
      document.getElementById('addModal').classList.add('hidden');
      editingId = null;
      formPhotos = [];
      clearForm();
      status.textContent = '';
      if (currentView === 'mine') loadMyListings();
      else loadListings();
    }, 800);
  } catch (err) {
    console.error('saveListing error:', err);
    status.textContent = '❌ ' + err.message;
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
  const userText = document.getElementById('searchText').value.trim();
  if (userText.length > 3) { aiSearch(userText); return; }
  currentFilters = {
    min: parseNumber(document.getElementById('minPrice').value),
    max: parseNumber(document.getElementById('maxPrice').value),
    rooms: document.getElementById('rooms').value,
    text: '',
    maxBudget: 0
  };
  loadListings(currentFilters);
}

function resetFilters() {
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('rooms').value = '';
  document.getElementById('searchText').value = '';
  currentFilters = { min: 0, max: 0, rooms: '', text: '', maxBudget: 0 };
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
document.getElementById('langSelect').onchange = (e) => {
  stopTypewriter();
  loadLang(e.target.value);
};
document.getElementById('photoAddBtn').onclick = () => document.getElementById('f_photos').click();
document.getElementById('f_photos').addEventListener('change', handlePhotoUpload);

document.getElementById('tabAll').onclick = () => {
  currentView = 'all';
  document.getElementById('tabAll').classList.add('active');
  document.getElementById('tabMine').classList.remove('active');
  document.getElementById('filtersBlock').style.display = 'grid';
  document.getElementById('viewToggle').classList.remove('hidden');
  loadListings();
};
document.getElementById('tabMine').onclick = () => {
  currentView = 'mine';
  document.getElementById('tabMine').classList.add('active');
  document.getElementById('tabAll').classList.remove('active');
  document.getElementById('filtersBlock').style.display = 'none';
  document.getElementById('viewToggle').classList.add('hidden');
  document.getElementById('mapContainer').classList.add('hidden');
  document.getElementById('listings').classList.remove('hidden');
  currentDisplay = 'list';
  closeMapCard();
  loadMyListings();
};

document.getElementById('searchText').addEventListener('input', (e) => {
  if (e.target.value.length > 0) {
    e.target.dataset.userTyped = '1';
    stopTypewriter();
  }
});
document.getElementById('searchText').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); applyFilters(); }
});

attachNumberFormatting('minPrice');
attachNumberFormatting('maxPrice');
attachNumberFormatting('f_price');

['f_title','f_price','f_rooms','f_area','f_address','f_description','f_telegram'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateAllHints);
});

applyTheme(detectTheme());

if (tg && tg.onEvent) {
  tg.onEvent('themeChanged', () => {
    if (!localStorage.getItem('theme')) {
      applyTheme(tg.colorScheme || 'light');
    }
  });
}
// ============ Дополнительные функции для главной ============
function scrollToListings() {
  const el = document.getElementById('listingsSection');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.scrollToListings = scrollToListings;
loadLang(detectLang());

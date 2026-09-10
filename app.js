const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// Временные данные (потом заменим на реальные из базы)
const mockListings = [
  {
    id: 1,
    title: 'Студенты квартира сдаётся комната Сергели 3 бекат Грен Хаус новостройк',
    price: 750 000,
    rooms: 2,
    area: 53,
    address: 'Сергели 3 бекат возле метро новостройка Грен Хаус Студенты квартира комната',
    description: В квартире есть: Телефон, Кабельное ТВ, Интернет, Кондиционер, Балкон, Телевизор, Кухня, Холодильник, Стиральная машина,
    telegram: '+998992991186',
    studentFriendly: true
  }
];

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
      <p>📍 ${item.address}</p>
      <p>${item.description}</p>
      ${item.telegram ? `<a class="contact-btn" href="https://t.me/${item.telegram.replace('@','')}" target="_blank">Написать в Telegram</a>` : ''}
    </div>
  `).join('');
}

document.getElementById('filterBtn').onclick = () => {
  // Пока просто перерисовываем те же данные (фильтры подключим позже)
  renderListings(mockListings);
};

// Первоначальная загрузка
renderListings(mockListings);

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// Временные данные (потом заменим на реальные из базы)
const mockListings = [
  {
    id: 1,
    title: 'Квартира в Чиланзаре',
    price: 2500000,
    rooms: 2,
    area: 50,
    address: 'Чиланзар, 10 квартал',
    description: 'Светлая квартира, есть всё для жизни',
    telegram: '@landlord1',
    studentFriendly: true
  },
  {
    id: 2,
    title: 'Комната для студента',
    price: 800000,
    rooms: 1,
    area: 15,
    address: 'Юнусабад, рядом с метро',
    description: 'Уютная комната, интернет, стиральная машина',
    telegram: '@landlord2',
    studentFriendly: true
  },
  {
    id: 3,
    title: 'Дом в Сергели',
    price: 4000000,
    rooms: 4,
    area: 120,
    address: 'Сергели, 5 массив',
    description: 'Большой дом с двором, подходит для семьи',
    telegram: '@landlord3',
    studentFriendly: false
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

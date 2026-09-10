const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const mockListings = [
  {
    id: 1,
    title: 'Студентам сдаётся комната, Сергели, 3-й бекет, ЖК Gren House',
    price: 750000,
    rooms: 2,
    area: 53,
    address: 'Сергели, 3-й бекет, рядом с метро, новостройка Gren House',
    description: 'В квартире есть: телефон, кабельное ТВ, интернет, кондиционер, балкон, телевизор, кухня, холодильник, стиральная машина',
    telegram: '@therealabdullokh',
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
  renderListings(mockListings);
};

renderListings(mockListings);

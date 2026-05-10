/*
  Локальные данные проекта.
*/

const services = [
  {
    id: 'haircut-classic',
    title: 'Мужская стрижка',
    category: 'haircuts',
    categoryName: 'Стрижки',
    description: 'Классическая стрижка с учётом формы головы и пожеланий клиента.',
    price: '1200 ₽',
    duration: '45 минут',
    image: 'images/service1.jpg'
  },
  {
    id: 'haircut-machine',
    title: 'Стрижка машинкой',
    category: 'haircuts',
    categoryName: 'Стрижки',
    description: 'Быстрый и аккуратный вариант для короткой мужской стрижки.',
    price: '800 ₽',
    duration: '30 минут',
    image: 'images/service2.jpg'
  },
  {
    id: 'beard-modeling',
    title: 'Моделирование бороды',
    category: 'beard',
    categoryName: 'Борода',
    description: 'Оформление формы бороды, усов и аккуратная окантовка.',
    price: '900 ₽',
    duration: '35 минут',
    image: 'images/service3.jpg'
  },
  {
    id: 'shaving-classic',
    title: 'Классическое бритьё',
    category: 'shaving',
    categoryName: 'Бритьё',
    description: 'Бритьё опасной бритвой с подготовкой кожи и уходом после процедуры.',
    price: '1000 ₽',
    duration: '40 минут',
    image: 'images/service4.jpg'
  },
  {
    id: 'face-care',
    title: 'Уход за лицом',
    category: 'care',
    categoryName: 'Уход',
    description: 'Очищение и базовый уход, который подходит после стрижки или бритья.',
    price: '900 ₽',
    duration: '30 минут',
    image: 'images/service5.jpg'
  },
  {
    id: 'combo-haircut-beard',
    title: 'Стрижка + борода',
    category: 'combo',
    categoryName: 'Комплексы',
    description: 'Комплексная услуга: мужская стрижка и оформление бороды за один визит.',
    price: '1900 ₽',
    duration: '75 минут',
    image: 'images/service6.jpg'
  }
];

const masters = [
  {
    id: 'master-andrey',
    name: 'Андрей',
    specialization: 'Мужские стрижки',
    experience: 'Опыт: 3 года',
    description: 'Работает с классическими и современными мужскими стрижками.',
    photo: 'images/master1.png'
  },
  {
    id: 'master-dmitry',
    name: 'Дмитрий',
    specialization: 'Борода и бритьё',
    experience: 'Опыт: 4 года',
    description: 'Специализируется на моделировании бороды и классическом бритье.',
    photo: 'images/master2.png'
  },
  {
    id: 'master-ivan',
    name: 'Иван',
    specialization: 'Стрижки и уход',
    experience: 'Опыт: 2 года',
    description: 'Помогает подобрать аккуратный образ и базовый уход.',
    photo: 'images/master3.png'
  }
];

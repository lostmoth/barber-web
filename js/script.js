/*
  Основная логика интерфейса.
*/

// Ключи localStorage вынесены в переменные, чтобы не писать строки много раз.
const APPOINTMENT_KEY = 'barber-appointment';
const THEME_KEY = 'barber-theme';

// Получаем элементы страницы, с которыми будет работать JavaScript.
const servicesList = document.getElementById('servicesList');
const mastersList = document.getElementById('mastersList');
const servicesEmpty = document.getElementById('servicesEmpty');
const serviceSearch = document.getElementById('serviceSearch');
const filterButtons = document.querySelectorAll('.filter-button');
const serviceSelect = document.getElementById('serviceSelect');
const masterSelect = document.getElementById('masterSelect');
const appointmentForm = document.getElementById('appointmentForm');
const formMessage = document.getElementById('formMessage');
const savedAppointment = document.getElementById('savedAppointment');
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');
const themeButton = document.getElementById('themeButton');

let currentCategory = 'all';

// Объект с простыми методами для localStorage.
const StorageService = {
  saveAppointment(appointment) {
    localStorage.setItem(APPOINTMENT_KEY, JSON.stringify(appointment));
  },

  getAppointment() {
    const item = localStorage.getItem(APPOINTMENT_KEY);

    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      // Если данные повреждены, удаляем их, чтобы сайт не ломался.
      localStorage.removeItem(APPOINTMENT_KEY);
      return null;
    }
  },

  removeAppointment() {
    localStorage.removeItem(APPOINTMENT_KEY);
  },

  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  },

  getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }
};

// Вывод карточек услуг на страницу.
function renderServices(items) {
  servicesList.innerHTML = '';

  if (items.length === 0) {
    servicesEmpty.hidden = false;
    return;
  }

  servicesEmpty.hidden = true;

  items.forEach((service) => {
    const card = document.createElement('article');
    card.className = 'service-card';

    card.innerHTML = `
      <img src="${service.image}" alt="${service.title}">
      <span class="card-category">${service.categoryName}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <p><strong>Длительность:</strong> ${service.duration}</p>
      <p class="card-price">${service.price}</p>
      <button class="button button--primary" type="button" data-service-id="${service.id}">
        Выбрать
      </button>
    `;

    servicesList.append(card);
  });
}

// Вывод карточек мастеров.
function renderMasters() {
  mastersList.innerHTML = '';

  masters.forEach((master) => {
    const card = document.createElement('article');
    card.className = 'master-card';

    card.innerHTML = `
      <img src="${master.photo}" alt="Мастер ${master.name}">
      <h3>${master.name}</h3>
      <span class="card-category">${master.specialization}</span>
      <p>${master.experience}</p>
      <p>${master.description}</p>
      <button class="button button--secondary" type="button" data-master-id="${master.id}">
        Выбрать мастера
      </button>
    `;

    mastersList.append(card);
  });
}

// Заполнение выпадающих списков в форме записи.
function fillFormSelects() {
  services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = service.title;
    serviceSelect.append(option);
  });

  masters.forEach((master) => {
    const option = document.createElement('option');
    option.value = master.id;
    option.textContent = `${master.name} — ${master.specialization}`;
    masterSelect.append(option);
  });
}

// Фильтрация и поиск услуг работают вместе.
function updateServices() {
  const searchText = serviceSearch.value.trim().toLowerCase();

  const filtered = services.filter((service) => {
    const matchesCategory = currentCategory === 'all' || service.category === currentCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  renderServices(filtered);
}

// Выбор услуги из карточки и переход к форме.
function selectService(serviceId) {
  serviceSelect.value = serviceId;
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
}

// Выбор мастера из карточки.
function selectMaster(masterId) {
  masterSelect.value = masterId;
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
}

// Вывод сообщения формы.
function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

// Удаление подсветки ошибок перед новой проверкой.
function clearInputErrors() {
  appointmentForm.querySelectorAll('input, select').forEach((field) => {
    field.classList.remove('input-error');
  });
}

// Обязательные поля вынесены в отдельную функцию, чтобы не повторять один и тот же список.
function getRequiredFields() {
  return [
    document.getElementById('clientName'),
    document.getElementById('phone'),
    serviceSelect,
    document.getElementById('date'),
    document.getElementById('time')
  ];
}

function areRequiredFieldsFilled() {
  return getRequiredFields().every((field) => field.value.trim());
}

// Реакция на изменение формы после вывода сообщения.
function handleFormChange(event) {
  const field = event.target;

  if (field.matches('input, select')) {
    field.classList.remove('input-error');
  }

  if (formMessage.classList.contains('success')) {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    return;
  }

  if (formMessage.classList.contains('error') && areRequiredFieldsFilled()) {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }
}

// Проверка формы. Мастер не обязателен.
function validateForm() {
  clearInputErrors();

  const requiredFields = getRequiredFields();

  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add('input-error');
      isValid = false;
    }
  });

  return isValid;
}

// Обработка отправки формы записи.
function handleAppointmentSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    showFormMessage('Заполните имя, телефон, услугу, дату и время.', 'error');
    return;
  }

  const appointment = {
    clientName: document.getElementById('clientName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    serviceId: serviceSelect.value,
    masterId: masterSelect.value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    createdAt: new Date().toLocaleString('ru-RU')
  };

  StorageService.saveAppointment(appointment);
  showFormMessage('Данные записи сохранены в браузере в демонстрационном режиме.', 'success');
  renderSavedAppointment();
}

// Отображение последней сохранённой записи.
function renderSavedAppointment() {
  const appointment = StorageService.getAppointment();

  if (!appointment) {
    savedAppointment.hidden = true;
    savedAppointment.innerHTML = '';
    return;
  }

  const service = services.find((item) => item.id === appointment.serviceId);
  const master = masters.find((item) => item.id === appointment.masterId);

  savedAppointment.hidden = false;
  savedAppointment.innerHTML = `
    <h3>Последняя сохранённая запись</h3>
    <p><strong>Имя:</strong> ${appointment.clientName}</p>
    <p><strong>Телефон:</strong> ${appointment.phone}</p>
    <p><strong>Услуга:</strong> ${service ? service.title : 'Не указана'}</p>
    <p><strong>Мастер:</strong> ${master ? master.name : 'Без выбора мастера'}</p>
    <p><strong>Дата и время:</strong> ${appointment.date}, ${appointment.time}</p>
    <p><strong>Создано:</strong> ${appointment.createdAt}</p>
    <button class="clear-button" id="clearAppointment" type="button">Очистить сохранённую запись</button>
  `;

  document.getElementById('clearAppointment').addEventListener('click', () => {
    StorageService.removeAppointment();
    renderSavedAppointment();
    showFormMessage('Сохранённая запись удалена из localStorage.', 'success');
  });
}

// Установка темы из localStorage.
function applySavedTheme() {
  const theme = StorageService.getTheme();

  if (theme === 'light') {
    document.body.classList.add('light-theme');
    themeButton.textContent = 'Тёмная тема';
  } else {
    document.body.classList.remove('light-theme');
    themeButton.textContent = 'Светлая тема';
  }
}

// Переключение темы.
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  StorageService.saveTheme(isLight ? 'light' : 'dark');
  themeButton.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
}

// Обработчики фильтров.
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentCategory = button.dataset.category;
    updateServices();
  });
});

// Поиск по названию услуги.
serviceSearch.addEventListener('input', updateServices);

// Обработка кликов по динамически созданным карточкам услуг.
servicesList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-service-id]');

  if (button) {
    selectService(button.dataset.serviceId);
  }
});

// Обработка кликов по карточкам мастеров.
mastersList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-master-id]');

  if (button) {
    selectMaster(button.dataset.masterId);
  }
});

// Обработка клика по кнопки переключения тем.
themeButton.addEventListener('click', toggleTheme);

// Обработка отправки и изменения полей форм.
appointmentForm.addEventListener('submit', handleAppointmentSubmit);
appointmentForm.addEventListener('input', handleFormChange);
appointmentForm.addEventListener('change', handleFormChange);

// Начальная загрузка страницы.
applySavedTheme();
renderServices(services);
renderMasters();
fillFormSelects();
renderSavedAppointment();

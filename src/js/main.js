

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.body;

  // Функция для обновления состояния меню в зависимости от ширины экрана
  function updateMenuState() {
    const isDesktop = window.matchMedia('(min-width: 611px)').matches;
    
    if (isDesktop) {
      // На десктопах меню всегда открыто
      menu.setAttribute('aria-hidden', 'false');
      if (burger) burger.setAttribute('aria-expanded', 'true');
      body.classList.remove('menu-open');
    } else {
      // На мобильных меню закрыто по умолчанию
      menu.setAttribute('aria-hidden', 'true');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  }

  // Инициализация состояния меню
  updateMenuState();

  // Обработчик изменения размера окна
  window.addEventListener('resize', updateMenuState);

  // Клик по бургеру (только для мобильных)
  if (burger) {
    burger.addEventListener('click', () => {
      // Не реагируем на клики на десктопах
      if (window.matchMedia('(min-width: 611px)').matches) return;
      
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
      menu.setAttribute('aria-hidden', isExpanded);
      body.classList.toggle('menu-open', !isExpanded);
    });
  }

  // Закрытие при клике на оверлей (только для мобильных)
  if (menu) {
    menu.addEventListener('click', (e) => {
      if (window.matchMedia('(min-width: 611px)').matches) return;
      
      if (e.target === menu) {
        burger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        body.classList.remove('menu-open');
      }
    });
  }
});
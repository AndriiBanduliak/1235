(function() {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const iconEl = document.getElementById('themeToggleIcon');

  // При загрузке проверяем, не в тёмной ли теме пользователь
  // (можно сохранить в localStorage, если нужно)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark && !localStorage.getItem('theme')) {
    htmlEl.classList.add('dark');
  }
  if (localStorage.getItem('theme') === 'dark') {
    htmlEl.classList.add('dark');
  }

  function updateIcon() {
    // Пример: если есть класс dark — показываем иконку солнца, иначе — луны
    if (htmlEl.classList.contains('dark')) {
      // иконка солнца
      iconEl.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66 5.66l1.42 1.42M4.93 4.93l1.42 1.42M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
      // иконка луны
      iconEl.innerHTML = '<path d="M21.752 15.002A9.718 9.718 0 0112.998 22C7.201 22 2.5 17.299 2.5 11.502c0-4.21 2.717-7.79 6.707-9.058.513-.167.98.343.82.844A7.498 7.498 0 0012.998 19a7.47 7.47 0 004.213-1.367c.461-.36 1.086.04.938.59z"></path>';
    }
  }

  updateIcon();

  toggleBtn?.addEventListener('click', () => {
    htmlEl.classList.toggle('dark');
    // Сохраняем состояние в localStorage
    if (htmlEl.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    updateIcon();
  });

  // Мобильное меню
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      if (mobileMenu.classList.contains('max-h-0')) {
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-screen');
      } else {
        mobileMenu.classList.remove('max-h-screen');
        mobileMenu.classList.add('max-h-0');
      }
    });
  }
})();

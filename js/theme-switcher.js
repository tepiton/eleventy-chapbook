document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeOptions = document.getElementById('theme-options');

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.classList.remove('light-mode', 'dark-mode');

    if (savedTheme !== 'system') {
      document.body.classList.add(`${savedTheme}-mode`);
      document.documentElement.setAttribute('data-force-theme', savedTheme);
    } else {
      document.documentElement.removeAttribute('data-force-theme');
    }

    updateToggleText(savedTheme);
  } else {
    document.documentElement.removeAttribute('data-force-theme');
    updateToggleText('system');
  }

  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    themeOptions.classList.toggle('show');
  });

  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedTheme = e.currentTarget.dataset.theme;

      document.body.classList.remove('light-mode', 'dark-mode');

      if (selectedTheme !== 'system') {
        document.body.classList.add(`${selectedTheme}-mode`);
        document.documentElement.setAttribute('data-force-theme', selectedTheme);
      } else {
        document.documentElement.removeAttribute('data-force-theme');
      }

      localStorage.setItem('theme', selectedTheme);
      updateToggleText(selectedTheme);
      themeOptions.classList.remove('show');
    });
  });

  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
      themeOptions.classList.remove('show');
    }
  });

  function updateToggleText(theme) {
    switch(theme) {
      case 'light':
        themeToggle.innerHTML = '✱';
        themeToggle.title = 'Light theme (click to change)';
        break;
      case 'dark':
        themeToggle.innerHTML = '✻';
        themeToggle.title = 'Dark theme (click to change)';
        break;
      default:
        themeToggle.innerHTML = '◐';
        themeToggle.title = 'System theme (click to change)';
        break;
    }
  }
});

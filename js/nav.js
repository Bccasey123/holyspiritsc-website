(function () {
  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (!isOpen) closeAllDropdowns();
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        closeAllDropdowns();
      });
    });
  }

  /* ---- Dropdown menus ---- */
  function closeAllDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
      dd.classList.remove('is-open');
      var t = dd.querySelector('.nav-dropdown__trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.nav-dropdown__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var dropdown = this.closest('.nav-dropdown');
      var opening  = !dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (opening) {
        dropdown.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function () {
    closeAllDropdowns();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });
})();

<script>
(function () {
  const loginForm    = document.querySelector('.card-section.login');
  const signupForm   = document.querySelector('.card-section.create-account');
  const toCreate      = document.getElementById('to-create-account');
  const toLogin        = document.getElementById('to-login');
  const loader         = document.getElementById('loadar');
  const pageEl          = document.querySelector('.page');
  const mainContent = document.querySelector('.main-content');

  function swap(hide, show) {
    hide.classList.add('is-hidden');
    show.classList.remove('is-hidden');
    show.querySelector('input')?.focus();
  }

  toCreate.addEventListener('click', function (e) {
    e.preventDefault();
    swap(loginForm, signupForm);
  });

  toLogin.addEventListener('click', function (e) {
    e.preventDefault();
    swap(signupForm, loginForm);
  });

  function showFieldError(input, show) {
    const wrapper = input.closest('.field');
    const error = wrapper && wrapper.querySelector('.field-error');
    if (error) error.classList.toggle('is-visible', !!show);
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('input[required]').forEach(function (input) {
      const bad = !input.checkValidity();
      showFieldError(input, bad);
      if (bad) valid = false;
    });

    const pw = form.querySelector('#signup-password');
    const confirm = form.querySelector('#signup-confirm-password');
    if (pw && confirm && confirm.value && pw.value !== confirm.value) {
      showFieldError(confirm, true);
      valid = false;
    }
    return valid;
  }

  function runLoader() {
    loader.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      loader.classList.remove('is-active');
      pageEl.style.display = 'none';
      mainContent.classList.add('is-active');
      document.body.style.overflow = '';
    }, 2200);
  }

  [loginForm, signupForm].forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      runLoader();
      // TODO: replace runLoader() with your real auth request, e.g.
      // fetch('/api/login', { method: 'POST', body: new FormData(form) })
      //   .then(...).then(runLoader).catch(showError)
    });
  });
})();
</script>
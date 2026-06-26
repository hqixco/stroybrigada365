document.addEventListener('DOMContentLoaded', () => {
  const timepicker = document.getElementById('timepicker');
  if (timepicker) {
    timepicker.setAttribute('type', 'time');
  }

  const hasSubmitControl = (form) => Boolean(form.querySelector('button[type="submit"], input[type="submit"]'));
  const shouldSkipConsent = (form) => form.matches('.portable-test-wrapper, .quiz__form');
  const findConsentContainer = (form) => form.querySelector('.site-form-consent, .soglasie-form, .last-step-form__accept');

  const getConsentMarkup = (checkboxId) => `
    <div class="site-form-consent">
      <label class="site-form-consent__label" for="${checkboxId}">
        <input class="site-form-consent__checkbox" type="checkbox" id="${checkboxId}" name="privacy_agreement" value="1" required checked>
        <span class="site-form-consent__text">Соглашаюсь с <a href="/policy/" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> и обработкой персональных данных</span>
      </label>
    </div>
  `;

  document.querySelectorAll('form').forEach((form, index) => {
    if (!hasSubmitControl(form) || shouldSkipConsent(form)) {
      return;
    }

    const checkboxId = `site-form-consent-${index + 1}`;
    const consentContainer = findConsentContainer(form);

    if (consentContainer) {
      consentContainer.classList.add('site-form-consent');
      consentContainer.innerHTML = `
        <label class="site-form-consent__label" for="${checkboxId}">
          <input class="site-form-consent__checkbox" type="checkbox" id="${checkboxId}" name="privacy_agreement" value="1" required checked>
          <span class="site-form-consent__text">Соглашаюсь с <a href="/policy/" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> и обработкой персональных данных</span>
        </label>
      `;
      return;
    }

    const submitControl = form.querySelector('.form-button, .last-step-form, button[type="submit"], input[type="submit"]');
    if (submitControl) {
      submitControl.insertAdjacentHTML('afterend', getConsentMarkup(checkboxId));
    }
  });

  const openPriceModal = (numberValue, linkValue) => {
    const numberInput = document.querySelector('input[name="number-foto"]');
    const linkInput = document.querySelector('input[name="link-foto"]');

    if (numberInput) {
      numberInput.value = numberValue || '';
    }

    if (linkInput) {
      linkInput.value = linkValue || '';
    }

    if (typeof window.Remodal === 'undefined') {
      return;
    }

    const remodal = Remodal.lookup(['price'])[0];
    if (remodal) {
      remodal.open();
    }
  };

  document.addEventListener('click', (event) => {
    const costButton = event.target.closest('.btn-small-cost');
    if (!costButton) {
      return;
    }

    event.preventDefault();
    openPriceModal(costButton.dataset.number, costButton.dataset.link);
  });
});




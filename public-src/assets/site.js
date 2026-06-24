document.addEventListener('DOMContentLoaded', () => {
  const timepicker = document.getElementById('timepicker');
  if (timepicker) {
    timepicker.setAttribute('type', 'time');
  }

  if (window.Fancybox) {
    Fancybox.bind('[data-fancybox]', {
      on: {
        reveal: (_fancybox, slide) => {
          const existingButton = slide.$content?.querySelector('.cost-btn');
          if (existingButton) {
            existingButton.remove();
          }

          if (!slide.$content) {
            return;
          }

          const costButton = document.createElement('a');
          costButton.href = '#';
          costButton.className = 'cost-btn';
          costButton.setAttribute('data-remodal-target', 'price');
          costButton.textContent = 'Узнать стоимость этого объекта';

          const captionText = slide.$caption ? slide.$caption.textContent.trim() : '';
          if (captionText) {
            costButton.setAttribute('data-number', captionText);
          }

          const imageSrc = slide.src || slide.$trigger?.getAttribute('href') || '';
          if (imageSrc) {
            costButton.setAttribute('data-link', imageSrc);
          }

          costButton.addEventListener('click', (event) => {
            event.preventDefault();
            Fancybox.close();
          });

          slide.$content.appendChild(costButton);
        }
      }
    });
  }

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
    const costButton = event.target.closest('.cost-btn, .btn-small-cost');
    if (!costButton) {
      return;
    }

    event.preventDefault();
    openPriceModal(costButton.dataset.number, costButton.dataset.link);
  });
});




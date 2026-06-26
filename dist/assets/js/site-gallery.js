(function () {
  var currentScript = document.currentScript;
  if (!currentScript) {
    return;
  }

  var galleryUrl = currentScript.getAttribute('data-gallery-url') || '/assets/partials/site-gallery.html';

  function readSliderItems(slider) {
    try {
      var raw = slider.getAttribute('data-work-card-slider-images');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  function normalizeImageUrl(url) {
    return (url || '').trim();
  }

  function syncFancyboxItems(slider, sliderItems, currentIndex, title) {
    if (!(slider instanceof HTMLElement) || !Array.isArray(sliderItems) || !sliderItems.length) {
      return;
    }

    var fancyboxItems = slider.querySelector('.works-section__gallery-fancybox-items');
    if (!(fancyboxItems instanceof HTMLElement)) {
      return;
    }

    var galleryGroup = slider.getAttribute('data-work-card-group') || '';
    var safeIndex = ((currentIndex % sliderItems.length) + sliderItems.length) % sliderItems.length;
    fancyboxItems.innerHTML = '';

    sliderItems.forEach(function (slide, slideIndex) {
      if (!slide || !slide.image || slideIndex === safeIndex) {
        return;
      }

      var hiddenLink = document.createElement('a');
      hiddenLink.href = slide.image;
      hiddenLink.setAttribute('data-fancybox', galleryGroup);
      hiddenLink.setAttribute('data-caption', title);
      hiddenLink.setAttribute('aria-label', 'Увеличить фото ' + title);
      fancyboxItems.appendChild(hiddenLink);
    });
  }

  function updateSlider(slider, index) {
    if (!(slider instanceof HTMLElement)) {
      return;
    }

    var sliderItems = readSliderItems(slider).map(function (item) {
      return {
        image: normalizeImageUrl(item.image),
        position: item.position || '50% 50%',
      };
    }).filter(function (item) {
      return item.image;
    });

    if (!sliderItems.length) {
      return;
    }

    var safeIndex = ((index % sliderItems.length) + sliderItems.length) % sliderItems.length;
    var item = sliderItems[safeIndex];
    var cardTitle = slider.getAttribute('data-work-card-title') || 'Фото';
    slider.dataset.workCardSliderIndex = String(safeIndex);

    var preview = slider.querySelector('img.preview');
    if (preview instanceof HTMLImageElement) {
      preview.src = item.image;
      preview.setAttribute('data-src', item.image);
      preview.setAttribute('data-gallery-slider-image', item.image);
      preview.setAttribute('data-gallery-slider-position', item.position);
    }

    var openButton = slider.querySelector('[data-work-card-slider-open]');
    if (openButton instanceof HTMLAnchorElement) {
      openButton.setAttribute('href', item.image);
      openButton.setAttribute('aria-label', 'Увеличить фото ' + cardTitle);
      openButton.setAttribute('data-caption', cardTitle);
    }

    syncFancyboxItems(slider, sliderItems, safeIndex, cardTitle);

    var costButton = slider.closest('.works-section__gallery-item')?.querySelector('.btn-small-cost');
    if (costButton instanceof HTMLAnchorElement) {
      costButton.setAttribute('data-link', item.image);
      costButton.setAttribute('data-number', cardTitle);
    }
  }

  function enhanceGalleryItem(item, index) {
    if (!(item instanceof HTMLElement) || item.dataset.gallerySliderEnhanced === '1') {
      return;
    }

    var sourceLink = item.querySelector('a[data-fancybox]');
    var sourceCard = sourceLink ? sourceLink.querySelector('.works-section__gallery-image') : null;
    if (!(sourceLink instanceof HTMLAnchorElement) || !(sourceCard instanceof HTMLElement)) {
      return;
    }

    var image = sourceLink.getAttribute('href') || '';
    var previewImageNode = sourceCard.querySelector('img.preview');
    var previewImage = previewImageNode?.getAttribute('data-src') || previewImageNode?.getAttribute('src') || image;
    var number = sourceCard.querySelector('.number')?.textContent?.trim() || String(index + 1);
    var title = sourceCard.querySelector('.works-section__gallery-title')?.textContent?.trim() || 'Фото';
    var desc = sourceCard.querySelector('.works-section__gallery-desc')?.textContent?.trim() || '';
    var costButton = item.querySelector('.btn-small-cost');
    var galleryGroup = 'works-section-item-' + String(index + 1);
    var extraImages = [];

    try {
      var rawExtraImages = sourceLink.getAttribute('data-work-card-extra-images');
      extraImages = rawExtraImages ? JSON.parse(rawExtraImages) : [];
    } catch (error) {
      extraImages = [];
    }

    var slides = [
      {
        image: image,
        position: '50% 50%',
        title: title,
        subtitle: desc,
      }
    ].concat(extraImages).filter(function (slide, slideIndex, list) {
      return slide.image && list.findIndex(function (candidate) {
        return candidate.image === slide.image;
      }) === slideIndex;
    });

    var card = document.createElement('div');
    card.className = 'works-section__gallery-image work-card__photo work-card__photo--slider';
    card.setAttribute('data-work-card-slider', '');
    card.setAttribute('data-work-card-slider-index', '0');
    card.setAttribute('data-work-card-slider-images', JSON.stringify(slides));
    card.setAttribute('data-work-card-group', galleryGroup);
    card.setAttribute('data-work-card-has-extras', extraImages.length > 0 ? '1' : '0');
    card.setAttribute('data-work-card-title', title);
    card.style.setProperty('--work-card-image', 'url("' + slides[0].image.replace(/"/g, '\\"') + '")');
    card.style.setProperty('--work-card-position', slides[0].position);

    var prevButton = document.createElement('button');
    prevButton.className = 'work-card__nav work-card__nav--prev';
    prevButton.type = 'button';
    prevButton.setAttribute('data-work-card-slider-nav', 'prev');
    prevButton.setAttribute('aria-label', 'Предыдущее фото');

    var openButton = document.createElement('a');
    openButton.className = 'work-card__open works-section__gallery-open';
    openButton.href = image;
    openButton.setAttribute('data-work-card-slider-open', '');
    openButton.setAttribute('data-fancybox', galleryGroup);
    openButton.setAttribute('data-caption', title);
    openButton.setAttribute('aria-label', 'Увеличить фото ' + title);

    var fancyboxItems = document.createElement('span');
    fancyboxItems.className = 'works-section__gallery-fancybox-items';
    fancyboxItems.style.display = 'none';

    var nextButton = document.createElement('button');
    nextButton.className = 'work-card__nav work-card__nav--next';
    nextButton.type = 'button';
    nextButton.setAttribute('data-work-card-slider-nav', 'next');
    nextButton.setAttribute('aria-label', 'Следующее фото');

    var numberSpan = document.createElement('span');
    numberSpan.className = 'number';
    numberSpan.textContent = number;
    card.setAttribute('data-work-card-number', number);

    var preview = document.createElement('img');
    preview.className = 'preview lazyload';
    preview.setAttribute('data-src', slides[0].image);
    preview.setAttribute('data-gallery-slider-position', slides[0].position);
    preview.src = slides[0].image;
    preview.alt = '';

    var copy = document.createElement('span');
    copy.className = 'works-section__gallery-copy';

    var titleSpan = document.createElement('span');
    titleSpan.className = 'works-section__gallery-title';
    titleSpan.textContent = title;

    copy.appendChild(titleSpan);

    if (desc) {
      var descSpan = document.createElement('span');
      descSpan.className = 'works-section__gallery-desc';
      descSpan.textContent = desc;
      copy.appendChild(descSpan);
    }

    if (costButton instanceof HTMLAnchorElement) {
      costButton.classList.add('btn-small-cost--inline');
      copy.appendChild(costButton);
    }

    card.appendChild(prevButton);
    card.appendChild(openButton);
    card.appendChild(fancyboxItems);
    card.appendChild(nextButton);
    card.appendChild(numberSpan);
    card.appendChild(preview);
    card.appendChild(copy);

    sourceLink.replaceWith(card);

    item.dataset.gallerySliderEnhanced = '1';
    updateSlider(card, 0);

    if (extraImages.length === 0) {
      card.querySelectorAll('[data-work-card-slider-nav]').forEach(function (button) {
        if (button instanceof HTMLElement) {
          button.hidden = true;
        }
      });
    }
  }

  function enhanceGallery() {
    var items = Array.from(document.querySelectorAll('.works-section__gallery-item'));

    items.forEach(function (item, index) {
      enhanceGalleryItem(item, index);
    });

    Array.from(document.querySelectorAll('[data-work-card-slider]')).forEach(function (slider) {
      updateSlider(slider, Number(slider.dataset.workCardSliderIndex || 0));
      var hasExtras = slider.dataset.workCardHasExtras === '1';
      slider.querySelectorAll('[data-work-card-slider-nav]').forEach(function (button) {
        if (button instanceof HTMLElement) {
          button.hidden = !hasExtras;
        }
      });

      Array.from(slider.querySelectorAll('[data-work-card-slider-nav]')).forEach(function (button) {
        if (button instanceof HTMLElement && button.hidden) {
          return;
        }

        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();

          var direction = button.getAttribute('data-work-card-slider-nav');
          var currentIndex = Number(slider.dataset.workCardSliderIndex || 0);
          var nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
          updateSlider(slider, nextIndex);
        });
      });
    });
  }

  function openPriceModal(numberValue, linkValue) {
    var numberInput = document.querySelector('input[name="number-foto"]');
    var linkInput = document.querySelector('input[name="link-foto"]');

    if (numberInput) {
      numberInput.value = numberValue || '';
    }

    if (linkInput) {
      linkInput.value = linkValue || '';
    }

    if (typeof window.Remodal === 'undefined') {
      return;
    }

    var remodal = Remodal.lookup(['price'])[0];
    if (remodal) {
      remodal.open();
    }
  }

  function bindPriceModalTriggers() {
    if (window.__siteGalleryPriceModalBound) {
      return;
    }

    window.__siteGalleryPriceModalBound = true;

    document.addEventListener('click', function (event) {
      var costButton = event.target.closest('.btn-small-cost');
      if (!costButton) {
        return;
      }

      event.preventDefault();
      openPriceModal(costButton.dataset.number, costButton.dataset.link);
    });
  }

  function initSharedGalleryPopup() {
    bindPriceModalTriggers();
  }

  try {
    var request = new XMLHttpRequest();
    request.open('GET', galleryUrl, false);
    request.send(null);

    var isSuccess = (request.status >= 200 && request.status < 300) || request.status === 0;
    if (!isSuccess) {
      throw new Error('Unexpected status ' + request.status);
    }

    currentScript.insertAdjacentHTML('beforebegin', request.responseText);
    currentScript.remove();

    enhanceGallery();
    initSharedGalleryPopup();
  } catch (error) {
    console.error('Failed to load shared site gallery:', error);
  }
})();

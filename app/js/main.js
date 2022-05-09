window.addEventListener('DOMContentLoaded', () => {
  // * ===== Mask input
  $('input[type="tel"]').mask('+7 (999) 999-99-99');

  (function toggleActiveClass() {
    const btns = document.querySelectorAll('.tabs-solution__button');
    const parent = document.querySelector('.tabs-solution__body');

    if (parent) {
      function removeActiveClass() {
        btns.forEach((btn) => {
          btn.classList.remove('tabs-solution__button--active');
        });
      }

      btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          removeActiveClass();

          btn.classList.add('tabs-solution__button--active');
        });
      });
    }
  })();

  // * ===== Slider Handle
  function rangeSliderSum() {
    const rangeSlider = document.querySelector('.range-slider__range');
    const sliderValueSum = document.querySelector('.range-slider__value');

    if (rangeSlider) {
      noUiSlider.create(rangeSlider, {
        start: [15],
        range: {
          min: [6],
          max: [36],
        },
        connect: [true, false],
        format: wNumb({
          decimals: 0,
          thousand: ' ',
        }),
      });

      rangeSlider.noUiSlider.on('update', function (values, handle) {
        if (values) {
          sliderValueSum.innerHTML = values[handle];
        }
      });
    }
  }
  rangeSliderSum();

  (function goToSearchBox() {
    const heroArrow = document.querySelector('.hero__arrow');

    if (heroArrow) {
      heroArrow.addEventListener('click', () => {
        const needEl = document.querySelector('.hero__search');
        const headerEl = document.querySelector('.header');
        window.scrollTo(0, needEl.offsetTop - (headerEl.clientHeight + 60));
      });
    }
  })();

  //* Change Background Header
  function scrollHeader() {
    const nav = document.querySelector('header');

    if (this.scrollY >= 100) {
      nav.classList.add('scroll-header');
    } else {
      nav.classList.remove('scroll-header');
    }
  }
  window.addEventListener('scroll', scrollHeader);

  // ! Change
  const header = document.querySelector('header');
  if (window.pageYOffset >= 100) {
    header.classList.add('scroll-header');
  }

  // * ===== Slider
  (function slider() {
    const sliderEl = document.querySelectorAll('.plots__slider');

    sliderEl.forEach((el) => {
      new Swiper(el, {
        slidesPerView: 'auto',
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  })();

  (function slider() {
    const sliderEl = document.querySelector('.special__slider');
    new Swiper(sliderEl, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  })();

  // * ===== Custom select
  (function customSelect() {
    const selects = document.querySelectorAll('.select');
    selects.forEach((el) => {
      const select = new Choices(el, {
        itemSelectText: '',
        searchEnabled: false,
      });
    });
  })();

  // * ===== Show Menu
  (function showMenu() {
    const menuBtn = document.querySelector('.header__toggle');
    const menu = document.querySelector('.mobile-menu');
    const menuCloseBtn = document.querySelector('.mobile-menu__close');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    menuBtn.addEventListener('click', (e) => {
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });
    overlay.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });
    menuCloseBtn.addEventListener('click', (e) => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  })();

  // * ===== Accordion
  const toggleAccordion = (accordionControl, accordionContent, accordion) => {
    const filters = document.querySelectorAll(accordionControl);
    filters.forEach((el) => {
      el.addEventListener('click', (e) => {
        const target = e.target.closest(accordion);
        const content = target.querySelector(accordionContent);
        target.classList.toggle('active');
        if (target.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  };
  toggleAccordion('.accordion__control', '.accordion__content', '.accordion');

  // // * ===== Mixer
  // (function mixer() {
  //   const mixContent = document.querySelector('.mixer__content');
  //   if (mixContent) {
  //     const mixer = mixitup(mixContent);
  //   }
  // })();

  // * ===== Modal
  (function modals() {
    function bindModal(openBtn, modal, close) {
      const openBtnEl = document.querySelectorAll(openBtn);
      const modalEl = document.querySelector(modal);
      const closeEl = document.querySelectorAll(close);
      const body = document.querySelector('body');
      if (modalEl) {
        openBtnEl.forEach((el) => {
          el.addEventListener('click', (e) => {
            if (e.target) {
              e.preventDefault();
            }
            modalEl.classList.add('active');
            body.classList.add('no-scroll');
          });
        });
        closeEl.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          });
        });
        modalEl.addEventListener('click', (e) => {
          if (e.target === modalEl) {
            modalEl.classList.remove('active');
            body.classList.remove('no-scroll');
          }
        });
      }
    }
    bindModal('.btn-view', '.popup--viewing', '.popup__close');
    bindModal('.btn-reservation', '.popup--reservation', '.popup__close');
  })();

  // * ===== Toggle Tabs
  function someTabs(headerSelector, tabSelector, contentSelector, activeClass) {
    const header = document.querySelectorAll(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);
    if (header) {
      hideTabContent();
      showTabContent();
      function hideTabContent() {
        content.forEach((item) => {
          item.classList.remove('active');
        });
        tab.forEach((item) => {
          item.classList.remove(activeClass);
        });
      }
      function showTabContent(i = 0) {
        content[i].classList.add('active');
        tab[i].classList.add(activeClass);
      }
      header.forEach((item) => {
        if (item) {
          item.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains(tabSelector.replace(/\./, ''))) {
              tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                  hideTabContent();
                  showTabContent(i);
                }
              });
            }
          });
        }
      });
    }
  }
  someTabs('.tabs', '.tabs-btn', '.tabs-content', 'tabs-btn--active');
  someTabs(
    '.tabs-solution',
    '.tabs-solution__btn',
    '.tabs-solution__content',
    'tabs-solution__btn--active'
  );
});

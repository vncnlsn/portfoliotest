/* ============================================================
   vance-nelson.com — Script v3
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  const updateNav = () => {
    if (!nav) return;

    const y = window.scrollY;
    const enterDark = window.innerHeight * 0.34;
    const leaveDark = window.innerHeight * 0.22;

    if (y >= enterDark) {
      nav.classList.add('nav--dark-bg');
      nav.classList.remove('nav--light-bg');
    } else if (y <= leaveDark) {
      nav.classList.add('nav--light-bg');
      nav.classList.remove('nav--dark-bg');
    }
  };

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);

  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    window.addEventListener('load', () => {
      heroImg.classList.add('loaded');
    });

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const maxScroll = window.innerHeight * 0.42;
      const maxShift = 42;
      const progress = Math.min(y / maxScroll, 1);

      heroImg.style.transform = `scale(1) translateY(${progress * maxShift}px)`;
    }, { passive: true });
  }

  const revealEls = document.querySelectorAll('.reveal, .exp-item');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement.children);
          const idx = siblings.indexOf(e.target);
          const delay = Math.min(idx * 80, 320);
          setTimeout(() => {
            e.target.classList.add('visible');
          }, delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  const navLinks = document.querySelectorAll('.nav__links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ============================================================
   vance-nelson.com — Script v3
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll-aware nav contrast ─────────────────────────────
  // Hero is bright fog — nav text should be dark over it.
  // Content sections are charcoal — nav text should be light.
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  const updateNav = () => {
  if (!nav) return;

  const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
  const threshold = nav.offsetHeight + 12;

  if (heroBottom <= threshold) {
    nav.classList.remove('nav--light-bg');
    nav.classList.add('nav--dark-bg');
  } else {
    nav.classList.remove('nav--dark-bg');
    nav.classList.add('nav--light-bg');
  }
};

   window.addEventListener('resize', updateNav);

  // Initialize immediately
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // ── Hero image subtle parallax & load state ───────────────
  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    window.addEventListener('load', () => {
      heroImg.classList.add('loaded');
    });
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${y * 0.16}px)`;
      }
    }, { passive: true });
  }

  // ── Scroll reveal ─────────────────────────────────────────
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

  // ── Active nav link ───────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav__links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();

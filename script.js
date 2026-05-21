/* ============================================================
   vance-nelson.com — Script v4
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll-aware nav contrast ─────────────────────────────
  // Uses scroll position relative to hero height for smooth
  // CSS-driven transition — no class swapping, just data attr.
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  const updateNav = () => {
    if (!nav) return;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const progress = Math.max(0, Math.min(1, 1 - (heroBottom / (window.innerHeight * 0.25))));
    // Drive transition via CSS custom property — fully interpolated
    nav.style.setProperty('--scroll-progress', progress);
    if (progress > 0.5) {
      nav.classList.add('nav--dark');
      nav.classList.remove('nav--light');
    } else {
      nav.classList.add('nav--light');
      nav.classList.remove('nav--dark');
    }
  };

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .exp-item');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement.children);
          const idx = siblings.indexOf(e.target);
          const delay = Math.min(idx * 80, 320);
          setTimeout(() => e.target.classList.add('visible'), delay);
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
    if (link.getAttribute('href') === currentPage ||
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

})();

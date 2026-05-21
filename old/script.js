/* ============================================================
   vance-nelson.com — Script
   ============================================================ */

(function () {
  'use strict';

  // ── Nav scroll state ──────────────────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Hero image subtle parallax & load state ───────────────
  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    // Trigger the scale-back after load
    window.addEventListener('load', () => {
      heroImg.classList.add('loaded');
    });

    // Very subtle parallax — not overdone
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${y * 0.18}px)`;
      }
    }, { passive: true });
  }

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .exp-item');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Stagger children in the same parent
          const siblings = Array.from(e.target.parentElement.children);
          const idx = siblings.indexOf(e.target);
          const delay = Math.min(idx * 80, 300);
          setTimeout(() => {
            e.target.classList.add('visible');
          }, delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

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

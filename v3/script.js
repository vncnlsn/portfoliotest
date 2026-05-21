/* ============================================================
   vance-nelson.com — Script v3
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');

  // ── Scroll-aware nav contrast ─────────────────────────────
  const updateNav = () => {
    if (!nav) return;

    const y = window.scrollY;

    // Switch slightly after entering the forest section
    const enterFogPanel = window.innerHeight * 0.15;
    const leaveFogPanel = window.innerHeight * 0.09;

    if (y >= enterFogPanel) {
      nav.classList.add('nav--dark-bg');
      nav.classList.remove('nav--light-bg');
    } else if (y <= leaveFogPanel) {
      nav.classList.add('nav--light-bg');
      nav.classList.remove('nav--dark-bg');
    }
  };

  updateNav();

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);

  // ── Hero image ambient zoom ───────────────────────────────
  const heroImg = document.querySelector('.hero__img');

  if (heroImg) {
    window.addEventListener('load', () => {
      heroImg.classList.add('loaded');
    });

    window.addEventListener('scroll', () => {
      const y = window.scrollY;

      // Limit how long the movement lasts
      const maxScroll = window.innerHeight * 0.38;

      // Gentle ambient zoom only
      const startScale = 1.06;
      const endScale = 1.00;

      const progress = Math.min(y / maxScroll, 1);

      const currentScale =
        startScale - (startScale - endScale) * progress;

      heroImg.style.transform = `scale(${currentScale})`;
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
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -32px 0px'
    });

    revealEls.forEach(el => io.observe(el));
  }

  // ── Active nav link ───────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav__links a');

  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

})();

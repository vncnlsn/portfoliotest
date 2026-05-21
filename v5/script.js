/* ============================================================
   vance-nelson.com — Script v5
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll-aware nav contrast ─────────────────────────────
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  const updateNav = () => {
    if (!nav) return;
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const progress = Math.max(0, Math.min(1, 1 - (heroBottom / (window.innerHeight * 0.25))));
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

  // ── Parallax fog drift ───────────────────────────────────
  // The hero image drifts upward at ~38% of scroll speed,
  // creating the feeling of descending out of the fog as you
  // move into the content below. Subtle — max ~80px of travel.
  const heroImg     = document.querySelector('.hero__img');
  const heroContent = document.querySelector('.hero__content');

  const updateParallax = () => {
    if (!heroImg || !hero) return;
    const scrollY = window.scrollY;
    const heroH   = hero.offsetHeight;
    if (scrollY > heroH) return;

    // Image drifts up slower than page — fog lingers behind
    heroImg.style.transform = `translateY(${scrollY * 0.38}px) scale(1.04)`;

    // Text drifts slightly — pulls cleanly away from the trees
    heroContent.style.transform = `translateY(${scrollY * 0.18}px)`;

    // Gentle fade as text exits viewport
    const fade = Math.min(1, scrollY / (heroH * 0.55));
    heroContent.style.opacity = 1 - fade * 0.85;
  };

  // Pause CSS breath animation while scrolling so transforms don't fight
  let breathePaused = false;
  const syncBreath = () => {
    if (!heroImg) return;
    if (window.scrollY > 20 && !breathePaused) {
      heroImg.style.animationPlayState = 'paused';
      breathePaused = true;
    } else if (window.scrollY <= 20 && breathePaused) {
      heroImg.style.animationPlayState = 'running';
      heroImg.style.transform = '';
      breathePaused = false;
    }
  };

  window.addEventListener('scroll', () => {
    updateParallax();
    syncBreath();
  }, { passive: true });

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

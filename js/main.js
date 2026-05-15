/* ═══════════════════════════════════════════════════
   OTTER KITCHENS — Main JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────
     GSAP Registration
  ───────────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);


  /* ─────────────────────────────────────────────────
     PRELOADER
  ───────────────────────────────────────────────── */
  const preloader  = document.getElementById('preloader');
  const plOtter    = document.querySelector('.pl-otter');
  const plBar      = document.querySelector('.pl-bar');
  const plKitchens = document.querySelector('.pl-kitchens');
  const plLine     = document.querySelector('.preloader-line');

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
          initScrollAnimations();
        }
      });
    }
  });

  document.body.style.overflow = 'hidden';

  tl
    .to(plLine, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, 0)
    .to(plOtter, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
    .to(plBar,   { width: '80%', duration: 0.6, ease: 'power3.out' }, 0.7)
    .to(plKitchens, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.9);


  /* ─────────────────────────────────────────────────
     LENIS SMOOTH SCROLL
  ───────────────────────────────────────────────── */
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } catch (e) {
    // Lenis not available — fall back to native scroll
  }


  /* ─────────────────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll('a, button, .kitchen-card, .collection-card, .gallery-item');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
    });

    document.addEventListener('mouseleave', () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    });
  }


  /* ─────────────────────────────────────────────────
     NAVBAR — scroll behaviour
  ───────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled')
  });

  // Anchor smooth scroll & close mobile menu
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMobileDrawer();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─────────────────────────────────────────────────
     MOBILE DRAWER
  ───────────────────────────────────────────────── */
  const hamburger     = document.getElementById('navHamburger');
  const drawer        = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose   = document.getElementById('drawerClose');

  function openMobileDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeMobileDrawer() : openMobileDrawer();
  });
  drawerClose?.addEventListener('click', closeMobileDrawer);
  drawerOverlay?.addEventListener('click', closeMobileDrawer);


  /* ─────────────────────────────────────────────────
     SCROLL ANIMATIONS (initialised after preloader)
  ───────────────────────────────────────────────── */
  function initScrollAnimations() {

    // Generic .reveal-up
    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // .reveal-right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // .reveal-scale
    gsap.utils.toArray('.reveal-scale').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: (i % 3) * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Hero parallax
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Hero content fade up on load
    gsap.to('#heroContent', {
      opacity: 1,
      duration: 0.01
    });
    gsap.from('#heroContent .reveal-up', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.18,
      ease: 'power3.out',
      delay: 0.2
    });

    // Process steps stagger
    gsap.utils.toArray('.process-step').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-steps',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }


  /* ─────────────────────────────────────────────────
     COUNT-UP ANIMATION
  ───────────────────────────────────────────────── */
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    let counted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const start = performance.now();
          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
          }
          requestAnimationFrame(update);
        });
      }
    }, { threshold: 0.4 });
    observer.observe(statsRow);
  }


  /* ─────────────────────────────────────────────────
     SWIPER — Collections
  ───────────────────────────────────────────────── */
  new Swiper('#collectionsSwiper', {
    slidesPerView: 1.15,
    spaceBetween: 20,
    grabCursor: true,
    navigation: {
      prevEl: '.collections-prev',
      nextEl: '.collections-next'
    },
    pagination: {
      el: '.collections-pagination',
      clickable: true
    },
    breakpoints: {
      600:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 28 },
      1280: { slidesPerView: 3.5, spaceBetween: 28 }
    }
  });


  /* ─────────────────────────────────────────────────
     SWIPER — Testimonials
  ───────────────────────────────────────────────── */
  new Swiper('#testimonialsSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.testimonials-pagination',
      clickable: true
    },
    breakpoints: {
      700:  { slidesPerView: 2, spaceBetween: 24 },
      1100: { slidesPerView: 3, spaceBetween: 28 }
    }
  });


  /* ─────────────────────────────────────────────────
     GLIGHTBOX — Gallery
  ───────────────────────────────────────────────── */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
      skin: 'clean',
      openEffect: 'fade',
      closeEffect: 'fade'
    });
  }


  /* ─────────────────────────────────────────────────
     CONTACT FORM
  ───────────────────────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const btnText    = submitBtn?.querySelector('.btn-text');
  const btnSpinner = submitBtn?.querySelector('.btn-spinner');

  // Mark select as having value for styling
  const projectSelect = document.getElementById('project');
  projectSelect?.addEventListener('change', () => {
    if (projectSelect.value) projectSelect.classList.add('has-value');
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e05c5c';
        valid = false;
        setTimeout(() => { field.style.borderColor = ''; }, 2500);
      }
    });
    if (!valid) return;

    // Show loading state
    btnText.hidden = true;
    btnSpinner.hidden = false;
    submitBtn.disabled = true;

    /* — To actually send emails, sign up at formspree.io,
         create a form, and replace the URL below with your form endpoint:
         e.g. https://formspree.io/f/YOUR_FORM_ID
         Then replace the simulated delay with:
         const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
           method: 'POST',
           body: new FormData(form),
           headers: { 'Accept': 'application/json' }
         });
    — */

    // Simulated async submit (replace with real endpoint above)
    await new Promise(r => setTimeout(r, 1400));

    btnText.hidden = false;
    btnSpinner.hidden = true;
    submitBtn.disabled = false;

    form.style.display = 'none';
    successMsg.hidden = false;

    // Reset after 8s
    setTimeout(() => {
      form.reset();
      form.style.display = '';
      successMsg.hidden = true;
      projectSelect?.classList.remove('has-value');
    }, 8000);
  });


  /* ─────────────────────────────────────────────────
     FOOTER YEAR
  ───────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ─────────────────────────────────────────────────
     KITCHEN CARD — cursor text swap
  ───────────────────────────────────────────────── */
  document.querySelectorAll('.kitchen-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      ring?.classList.add('is-hovering');
    });
    card.addEventListener('mouseleave', () => {
      ring?.classList.remove('is-hovering');
    });
  });

});

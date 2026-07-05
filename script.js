document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Collapse mobile nav on link click ---------- */
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        new bootstrap.Collapse(menu).hide();
      }
    });
  });

  /* ---------- Scroll reveal animation (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  /* ---------- Animate skill bars once visible ---------- */
  const skillBars = document.querySelectorAll('.skill-bar span');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'scaleX(1)';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => {
    bar.style.transform = 'scaleX(0)';
    barObserver.observe(bar);
  });

  /* ---------- Counter animation for hero stats ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const duration = 900;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.ceil(current);
      }
    }, stepTime);
  }

  /* ---------- Contact form submission (front-end only demo) ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);
  });

  /* ---------- Smooth active nav highlight on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

});

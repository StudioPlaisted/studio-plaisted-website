// Studio Plaisted — Main JS

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Nav hide on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    if (currentScroll > lastScroll) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
  } else {
    nav.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
}, { passive: true });

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((el) => revealObserver.observe(el));
  }
  // Fallback: ensure all reveal elements become visible after 1.5s
  setTimeout(() => {
    revealElements.forEach((el) => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }, 1500);
}

// Accordion toggle (services page)
document.querySelectorAll('.step-header').forEach((header) => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.timeline-item.active').forEach((openItem) => {
      openItem.classList.remove('active');
      openItem.querySelector('.step-header').setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
      item.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
    }
  });
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

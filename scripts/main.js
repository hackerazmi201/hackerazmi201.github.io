// ================================
// MAIN JAVASCRIPT – CLEAN VERSION
// ================================

// Global flags
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

// ================================
// DOM READY
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ================================
// APP INITIALIZER
// ================================
function initializeApp() {
    hideLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeProjectFilters();
    initializeContactForm();
    initializeModals();
    initializeStatsCounter();

    // 3D INIT (DESKTOP ONLY)
    if (!isMobile && window.initialize3DScenes) {
        setTimeout(() => window.initialize3DScenes(), 150);
    }

    // Mobile fallback animation
    if (isMobile) {
        initMatrixRain();
    }
}

// ================================
// LOADING SCREEN
// ================================
function hideLoadingScreen() {
    const loader = document.getElementById('loadingScreen');
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1500);
}

// ================================
// NAVIGATION
// ================================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('href').slice(1);
            scrollToSection(id);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            navMenu?.classList.remove('active');
            menuToggle?.classList.remove('active');
        });
    });

    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = document.querySelector('.terminal-header')?.offsetHeight || 0;
    window.scrollTo({
        top: section.offsetTop - offset,
        behavior: 'smooth'
    });
}

// ================================
// GSAP SCROLL ANIMATIONS
// ================================
function initializeScrollAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%'
            }
        });
    });

    gsap.utils.toArray('.stat-card, .service-card, .project-card, .timeline-item, .certificate-card')
        .forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: i * 0.05,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%'
                }
            });
        });
}

// ================================
// PROJECT FILTERS
// ================================
function initializeProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.display = show ? 'block' : 'none';
            });
        });
    });
}

// ================================
// CONTACT FORM
// ================================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            });

            const data = await res.json();
            showToast(data.success ? 'Message sent!' : 'Failed to send', data.success ? 'success' : 'error');
            if (data.success) form.reset();
        } catch {
            showToast('Network error', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message >';
        }
    });
}

// ================================
// MODALS
// ================================
function initializeModals() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAllModals();
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
}

// ================================
// STATS COUNTER
// ================================
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            animateCount(e.target);
            observer.unobserve(e.target);
        });
    }, { threshold: 0.6 });

    stats.forEach(s => observer.observe(s));
}

function animateCount(el) {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// ================================
// MOBILE MATRIX FALLBACK
// ================================
function initMatrixRain() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    hero.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.opacity = '0.12';

    function resize() {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const chars = '01';
    const size = 14;
    const columns = Math.floor(canvas.width / size);
    const drops = Array(columns).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${size}px monospace`;

        drops.forEach((y, i) => {
            ctx.fillText(chars[Math.random() * 2 | 0], i * size, y * size);
            drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
        });
    }, 50);
}

// ================================
// RESIZE HANDLER
// ================================
window.addEventListener('resize', debounce(() => {
    isMobile = window.innerWidth <= 768;
    isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
}, 300));

// ================================
// UTIL
// ================================
function debounce(fn, delay) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

// ================================
// EXPORTS
// ================================
window.scrollToSection = scrollToSection;
window.closeAllModals = closeAllModals;

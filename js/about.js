/* управление шапкой */
function initHeaderScroll() {
    // На мобильных устройствах отключаем скрытие шапки
    if (window.innerWidth <= 768) return;

    const header = document.getElementById('main-header');
    const compact = document.getElementById('compact-header');
    if (!header || !compact) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('hidden');
            compact.classList.add('visible');
        } else {
            header.classList.remove('hidden');
            compact.classList.remove('visible');
        }
    });

    compact.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
/*-------------------------------------------------------*/

/* данные и рендер достижений */
const statsData = [
    { number: '15+', label: 'Проектов' },
    { number: '4 года', label: 'Опыта' },
    { number: '32', label: 'Счастливых клиентов' },
    { number: '100%', label: 'Доверие' }
];

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container) return;

    container.innerHTML = statsData.map(stat => `
        <div class="stat-card">
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
}
/*-------------------------------------------------------*/

/* данные и рендер услуг */
const shortServices = [
    { name: 'Лендинги', desc: 'Посадочные страницы под ключ', icon: 'fa-file-alt' },
    { name: 'Веб-приложения', desc: 'Сложные сервисы и кабинеты', icon: 'fa-globe' },
    { name: 'Сайт-визитка', desc: 'Представительство в сети', icon: 'fa-building' }
];

function renderShortServices() {
    const container = document.getElementById('services-preview');
    if (!container) return;

    container.innerHTML = shortServices.map(service => `
        <div class="service-preview-card">
            <i class="fas ${service.icon}"></i>
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
        </div>
    `).join('');
}
/*-------------------------------------------------------*/

/* данные и рендер портфолио */
const shortPortfolio = [
    { name: 'GreenCart', desc: 'Список покупок с умной статистикой', icon: 'fa-list-check' },
    { name: 'Аналитика дашборд', desc: 'Бизнес-метрики и графики', icon: 'fa-chart-line' }
];

function renderShortPortfolio() {
    const container = document.getElementById('portfolio-preview');
    if (!container) return;

    container.innerHTML = shortPortfolio.map(proj => `
        <div class="portfolio-preview-card">
            <div class="card-img">
                <i class="fas ${proj.icon}" style="font-size: 40px; color: #2e7d32;"></i>
            </div>
            <h3>${proj.name}</h3>
            <p>${proj.desc}</p>
        </div>
    `).join('');
}
/*-------------------------------------------------------*/

/* анимации при скроле */
function initAboutAnimations() {
    const animatedElements = document.querySelectorAll('.about-hero-container, .stats-grid, .services-preview, .portfolio-preview, .service-preview-card, .portfolio-preview-card, .stat-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}
/*-------------------------------------------------------*/

/* бергер меню */
function initBurger() {
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');

    if (!burger || !mobileMenu || !overlay) return;

    function closeMenu() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        burger.classList.add('active');
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
/*-------------------------------------------------------*/

/* ъзапуск функций */
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();          // Логика скрытия шапки
    renderStats();               // Рендер достижений
    renderShortServices();       // Рендер услуг
    renderShortPortfolio();      // Рендер портфолио
    initAboutAnimations();       // Анимации при скролле
    initBurger();                // Бургер-меню
});
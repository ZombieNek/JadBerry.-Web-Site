

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


/* анимации при скроле */
function initScrollAnimations() {
    const cards = document.querySelectorAll('.portfolio-card, .service-card, .review-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}
/*-------------------------------------------------------*/


/* модальное окно */
function initModal() {
    const modal = document.getElementById('projectsModal');
    const closeBtn = document.querySelector('.modal-close');
    const modalBtn = document.querySelector('.modal-btn');
    const demoBtn = document.getElementById('demoBtn');

    if (!modal) return;

    // Кнопка "Все проекты"
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBtn) modalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
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

    // Закрываем при клике на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
/*-------------------------------------------------------*/


/* запуск функций */
window.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();      // Логика скрытия шапки
    initScrollAnimations();  // Анимация карточек
    initModal();             // Модальное окно
    initBurger();            // Бургер-меню
});


/* шапка */
const header = document.getElementById('main-header');
const compact = document.getElementById('compact-header');

// На мобилках (≤ 768px) отключаем скрытие шапки
if (window.innerWidth > 768 && header && compact) {
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
} else if (header && compact) {
    // На мобилках: маленькую шапку скрываем, большая всегда видна
    compact.style.display = 'none';
    header.classList.remove('hidden');
}
/*-------------------------------------------------------*/

/* переход на github */
document.addEventListener('DOMContentLoaded', function () {
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function () {
            window.open('https://github.com/ZombieNek/ListFlow', '_blank');
        });
    }
});
/*-------------------------------------------------------*/

/* анимация появления при скролле */
const animatedElements = document.querySelectorAll('.info-block, .principle-card, .conclusion-block');

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
/*-------------------------------------------------------*/

/* бургер меню */
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

/* хапуск функций */
document.addEventListener('DOMContentLoaded', () => {
    initBurger();   // Бургер-меню
});
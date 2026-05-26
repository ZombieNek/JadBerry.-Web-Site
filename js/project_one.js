// Шапка при скролле
const header = document.getElementById('main-header');
const compact = document.getElementById('compact-header');

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

// Кнопка перехода на GitHub
document.addEventListener('DOMContentLoaded', function () {
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function () {
            window.open('https://github.com/ZombieNek/ListFlow', '_blank');
        });
    }
});

// Плавное появление элементов
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
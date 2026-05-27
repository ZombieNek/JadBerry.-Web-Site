

/* управление шапкой */
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

    compact.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} else if (header && compact) {
    // На мобилках: маленькую шапку скрываем, большая всегда видна
    compact.style.display = 'none';
    header.classList.remove('hidden');
}
/*-------------------------------------------------------*/

/* данные объявлений */
const itemsData = [
    {
        name: 'Фигурные коньки',
        type: 'Коньки',
        location: 'Парк Горького, Москва',
        price: '300 ₽ / час',
        owner: 'Анна',
        ownerAvatar: 'А',
        icon: 'fa-skating'
    },
    {
        name: 'Горные лыжи 160 см',
        type: 'Лыжи',
        location: 'Шерегеш, Кемерово',
        price: '1000 ₽ / день',
        owner: 'Максим',
        ownerAvatar: 'М',
        icon: 'fa-person-skiing'
    },
    {
        name: 'Электросамокат Ninebot',
        type: 'Самокат',
        location: 'м. Динамо, Москва',
        price: '200 ₽ / час',
        owner: 'Дмитрий',
        ownerAvatar: 'Д',
        icon: 'fa-scooter'
    },
    {
        name: 'Роликовые коньки',
        type: 'Ролики',
        location: 'Сокольники, Москва',
        price: '250 ₽ / час',
        owner: 'Елена',
        ownerAvatar: 'Е',
        icon: 'fa-roller-skating'
    },
    {
        name: 'Сноуборд 155 см',
        type: 'Сноуборд',
        location: 'Красная Поляна, Сочи',
        price: '1200 ₽ / день',
        owner: 'Сергей',
        ownerAvatar: 'С',
        icon: 'fa-person-snowboarding'
    },
    {
        name: 'Детские коньки',
        type: 'Коньки',
        location: 'ВДНХ, Москва',
        price: '150 ₽ / час',
        owner: 'Мария',
        ownerAvatar: 'М',
        icon: 'fa-child'
    }
];
/*-------------------------------------------------------*/

/* рендер обявлений */
function renderItems() {
    const container = document.getElementById('items-grid');
    if (!container) return;

    container.innerHTML = itemsData.map(item => `
        <div class="item-card">
            <div class="item-icon"><i class="fas ${item.icon}"></i></div>
            <h3>${item.name}</h3>
            <div class="item-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>
            <div class="item-price">${item.price}</div>
            <div class="item-footer">
                <div class="owner"><i class="fas fa-user-circle"></i> ${item.owner}</div>
                <button class="contact-btn" data-item="${item.name}">Связаться</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = btn.dataset.item;
            alert(`📱 Связь с владельцем "${itemName}"\n\nВ реальном приложении здесь открывается чат. Пока это демо-версия.`);
        });
    });
}
/*-------------------------------------------------------*/

/* модальное окно */
function initDemoModal() {
    const modal = document.getElementById('demoModal');
    const demoBtn = document.getElementById('demoBtn');
    const closeBtn = document.querySelector('#demoModal .modal-close');
    const modalBtn = document.querySelector('#demoModal .modal-btn');

    if (!modal || !demoBtn) return;

    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

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

/* анимации при скролле */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.info-block, .principle-card, .item-card, .tech-item, .conclusion-block');

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

/* запуск функций  */
document.addEventListener('DOMContentLoaded', () => {
    renderItems();       // Рендер объявлений
    initAnimations();    // Анимация появления элементов
    initDemoModal();     // Модальное окно демо-бронирования
    initBurger();        // Бургер-меню
});

/*-------------------------------------------------------*/
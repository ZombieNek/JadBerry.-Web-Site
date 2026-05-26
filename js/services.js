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

// Функция проверки email на реальные домены
function validateEmail(email) {
    const allowedDomains = ['gmail.com', 'yandex.ru', 'mail.ru', 'bk.ru', 'list.ru', 'inbox.ru', 'rambler.ru', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = email.split('@')[1];
    if (!domain) return false;
    return allowedDomains.includes(domain.toLowerCase());
}

// Данные для услуг
const servicesData = [
    {
        name: 'Сайт-визитка',
        desc: 'Лаконичный одностраничный сайт для презентации компании, услуги или портфолио. Быстрая разработка, адаптивный дизайн, современный стиль.',
        price: 'от 25 000 ₽',
        icon: 'fa-file-alt'
    },
    {
        name: 'Корпоративный сайт',
        desc: 'Многостраничный сайт с блогом, галереей, картой и формами связи. Подходит для компаний и организаций любого масштаба.',
        price: 'от 60 000 ₽',
        icon: 'fa-building'
    },
    {
        name: 'Интернет-магазин',
        desc: 'Полноценный интернет-магазин с корзиной, фильтрацией, личным кабинетом и интеграцией с системами оплаты.',
        price: 'от 120 000 ₽',
        icon: 'fa-shopping-cart'
    },
    {
        name: 'Мультиплатформенное приложение (HAML)',
        desc: 'Разработка приложений для iOS, Android и Web на HAML. Единая кодовая база, быстрый запуск, нативный опыт использования.',
        price: 'от 150 000 ₽',
        icon: 'fa-mobile-alt'
    },
    {
        name: 'База данных (SQL)',
        desc: 'Проектирование и разработка реляционных баз данных. Оптимизация запросов, нормализация, резервное копирование.',
        price: 'от 40 000 ₽',
        icon: 'fa-database'
    },
    {
        name: 'Полное сопровождение',
        desc: 'Техническая поддержка, доработки, консультации. Помощь на всех этапах — от идеи до запуска и дальнейшего развития.',
        price: 'договорная',
        icon: 'fa-headset'
    }
];

// Рендер услуг
function renderServices() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    container.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-icon"><i class="fas ${service.icon}"></i></div>
            <h3>${service.name}</h3>
            <p class="service-desc">${service.desc}</p>
            <div class="service-price">${service.price}</div>
        </div>
    `).join('');
}

// Данные для примеров работ
const worksData = [
    {
        name: 'FitTrack Fitness',
        desc: 'Мобильное приложение для отслеживания тренировок и питания',
        type: 'Приложение (HAML)',
        icon: 'fa-heartbeat'
    },
    {
        name: 'EcoMarket',
        desc: 'Интернет-магазин экотоваров с корзиной и оплатой',
        type: 'Интернет-магазин',
        icon: 'fa-leaf'
    },
    {
        name: 'LawyerPro',
        desc: 'Корпоративный сайт для юридической компании',
        type: 'Корпоративный сайт',
        icon: 'fa-gavel'
    }
];

// Рендер примеров работ
function renderWorks() {
    const container = document.getElementById('works-grid');
    if (!container) return;

    container.innerHTML = worksData.map(work => `
        <div class="work-card">
            <div class="work-image">
                <i class="fas ${work.icon}"></i>
            </div>
            <div class="work-info">
                <h3>${work.name}</h3>
                <p>${work.desc}</p>
                <span class="work-tag">${work.type}</span>
            </div>
        </div>
    `).join('');
}

// Данные для отзывов
const reviewsData = [
    {
        text: 'Отличная работа! Сайт получился именно таким, как я хотела. Всё сделано быстро, качественно, с вниманием к деталям. Рекомендую!',
        author: 'Анна К.',
        project: 'Интернет-магазин EcoMarket'
    },
    {
        text: 'Разработали для нас приложение под iOS и Android за 2 месяца. Ребята настоящие профессионалы, всегда на связи, помогали с идеями. Спасибо!',
        author: 'Дмитрий В.',
        project: 'FitTrack Fitness'
    },
    {
        text: 'Проектирование базы данных для нашего CRM провели на высшем уровне. Всё чётко, структурированно, с документацией. Обращусь ещё.',
        author: 'Елена М.',
        project: 'CRM система'
    }
];

// Рендер отзывов
function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container) return;

    container.innerHTML = reviewsData.map(review => `
        <div class="review-card">
            <p class="review-text">“${review.text}”</p>
            <div class="review-author">${review.author}</div>
            <div class="review-project">${review.project}</div>
        </div>
    `).join('');
}

// Форма заявки с модальным окном
function initForm() {
    const form = document.getElementById('service-form');
    const modal = document.getElementById('successModal');

    if (!form) return;

    // Функция закрытия модалки
    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const service = document.getElementById('service-select')?.value || '';
        const message = document.getElementById('message')?.value.trim() || '';

        // Валидация
        if (name === '') {
            alert('Пожалуйста, введите ваше имя');
            return;
        }

        if (email === '') {
            alert('Пожалуйста, введите ваш email');
            return;
        }

        if (!validateEmail(email)) {
            alert('Пожалуйста, используйте реальный email (gmail.com, yandex.ru, mail.ru и т.д.)');
            return;
        }

        if (service === '') {
            alert('Пожалуйста, выберите услугу');
            return;
        }

        // Если всё ок — открываем модальное окно
        if (modal) {
            modal.style.display = 'flex';
        } else {
            alert(`Спасибо, ${name}! Ваша заявка на услугу "${service}" принята.`);
        }

        form.reset();

        // Обработчики закрытия модалки
        const closeBtn = modal?.querySelector('.modal-close');
        const modalBtn = modal?.querySelector('.modal-btn');

        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        if (modalBtn) {
            modalBtn.onclick = closeModal;
        }
        if (modal) {
            window.onclick = (event) => {
                if (event.target === modal) closeModal();
            };
        }
    });
}

// Анимация появления элементов
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .work-card, .review-card, .form-block');

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

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderWorks();
    renderReviews();
    initForm();
    initAnimations();
});

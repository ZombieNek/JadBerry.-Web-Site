/* управление шапкой */
const header = document.getElementById('header');
const compact = document.getElementById('compactheader');

// отключение сокрытия на телефонах
if (window.innerWidth > 768 && header && compact) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
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
    compact.style.display = 'none';
}
/*-------------------------------------------------------*/

/* данные постов */
const postsData = [
    {
        id: 1,
        author: 'Никита',
        avatar: 'Н',
        date: '15 мая 2025',
        category: 'Разработка',
        title: 'Запуск проекта ListFlow',
        content: 'Рад сообщить, что приложение для списка покупок ListFlow вышло в закрытое бета-тестирование! Основные функции: создание списков, категории товаров, отметка о покупке, сохранение в localStorage. Если хотите поучаствовать в тестировании — пишите в комментариях!',
        likes: 12,
        comments: [
            { id: 1, author: 'Анна', text: 'Поздравляю! С нетерпением жду релиза!', date: '15 мая 2025, 14:23' },
            { id: 2, author: 'Дмитрий', text: 'Отличная новость! Можно где-то посмотреть демо?', date: '15 мая 2025, 16:45' }
        ]
    },
    {
        id: 2,
        author: 'Никита',
        avatar: 'Н',
        date: '10 мая 2025',
        category: 'Дизайн',
        title: 'Обновление стилей на сайте',
        content: 'Полностью обновил дизайн jadBerry! Теперь сайт выполнен в едином стиле со стеклянными карточками, плавными анимациями и зелёными акцентами. Как вам новая версия? Буду рад обратной связи.',
        likes: 8,
        comments: [
            { id: 1, author: 'Елена', text: 'Выглядит очень современно! Особенно нравится эффект стекла.', date: '10 мая 2025, 18:30' }
        ]
    },
    {
        id: 3,
        author: 'Никита',
        avatar: 'Н',
        date: '5 мая 2025',
        category: 'Технологии',
        title: 'Почему я выбрал HAML для кроссплатформенной разработки',
        content: 'HAML позволяет писать приложения под iOS, Android и Web из одной кодовой базы. Это экономит время и ресурсы. В этом посте делюсь своим опытом и рассказываю о плюсах и минусах подхода.',
        likes: 24,
        comments: [
            { id: 1, author: 'Сергей', text: 'Интересно, а как с производительностью на сложных задачах?', date: '6 мая 2025, 09:15' },
            { id: 2, author: 'Никита', text: 'Сергей, производительность отличная — HAML компилируется в нативный код. Напишу отдельный пост с бенчмарками.', date: '6 мая 2025, 11:00' },
            { id: 3, author: 'Мария', text: 'Спасибо за статью! Очень полезно.', date: '7 мая 2025, 20:30' }
        ]
    },
    {
        id: 4,
        author: 'Никита',
        avatar: 'Н',
        date: '28 апреля 2025',
        category: 'Новости',
        title: 'Планы на следующий месяц',
        content: 'Рассказываю, над чем работаю сейчас: доделываю страницу блога с лайками и комментариями, начинаю работу над вторым проектом — сайтом-визиткой для ListFlow. Также в планах интеграция с Telegram-ботом. Следите за обновлениями!',
        likes: 15,
        comments: [
            { id: 1, author: 'Алексей', text: 'Telegram-бот звучит интересно! Ждём)', date: '29 апреля 2025, 10:45' }
        ]
    }
];
/*-------------------------------------------------------*/

/* local storage */
function loadLikes() {
    const saved = localStorage.getItem('blogLikes');
    if (saved) return JSON.parse(saved);
    const initial = {};
    postsData.forEach(post => { initial[post.id] = post.likes; });
    return initial;
}

function saveLikes(likes) {
    localStorage.setItem('blogLikes', JSON.stringify(likes));
}

function loadComments() {
    const saved = localStorage.getItem('blogComments');
    if (saved) return JSON.parse(saved);
    const initial = {};
    postsData.forEach(post => { initial[post.id] = [...post.comments]; });
    return initial;
}

function saveComments(comments) {
    localStorage.setItem('blogComments', JSON.stringify(comments));
}

let userLiked = JSON.parse(localStorage.getItem('blogUserLiked') || '{}');
let likes = loadLikes();
let comments = loadComments();

function saveUserLiked() {
    localStorage.setItem('blogUserLiked', JSON.stringify(userLiked));
}
/*-------------------------------------------------------*/

/* вспомогательные функции */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* рендер постов */
function renderPosts() {
    const container = document.getElementById('posts-grid');
    if (!container) return;

    container.innerHTML = postsData.map(post => {
        const postComments = comments[post.id] || [];
        const isLiked = userLiked[post.id] || false;
        const currentLikes = likes[post.id] || 0;

        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-author">
                        <div class="author-avatar">${post.avatar}</div>
                        <div>
                            <div class="author-name">${post.author}</div>
                            <div class="post-date">${post.date}</div>
                        </div>
                    </div>
                    <div class="post-category">${post.category}</div>
                </div>
                <h2 class="post-title">${post.title}</h2>
                <div class="post-content">${post.content}</div>
                <div class="post-stats">
                    <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${currentLikes}</span>
                    </button>
                    <button class="comment-toggle-btn" data-id="${post.id}">
                        <i class="fas fa-comment"></i>
                        <span class="comment-count">${postComments.length}</span>
                    </button>
                </div>
                <div class="comments-section" id="comments-${post.id}" style="display: none;">
                    <div class="comments-title">Комментарии (${postComments.length})</div>
                    <div class="comments-list">
                        ${postComments.map(comment => `
                            <div class="comment-item">
                                <div class="comment-avatar">${comment.author.charAt(0)}</div>
                                <div class="comment-body">
                                    <div class="comment-author">${comment.author}</div>
                                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                                    <div class="comment-date">${comment.date}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="add-comment-form">
                        <input type="text" class="comment-input" placeholder="Написать комментарий..." data-id="${post.id}">
                        <button class="submit-comment" data-id="${post.id}">Отправить</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    attachEventHandlers();
}
/*-------------------------------------------------------*/

/* обработчик событий */
function attachEventHandlers() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.removeEventListener('click', handleLike);
        btn.addEventListener('click', handleLike);
    });

    document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
        btn.removeEventListener('click', handleToggleComments);
        btn.addEventListener('click', handleToggleComments);
    });

    document.querySelectorAll('.submit-comment').forEach(btn => {
        btn.removeEventListener('click', handleSubmitComment);
        btn.addEventListener('click', handleSubmitComment);
    });

    document.querySelectorAll('.comment-input').forEach(input => {
        input.removeEventListener('keypress', handleCommentKeypress);
        input.addEventListener('keypress', handleCommentKeypress);
    });
}

function handleLike(e) {
    const btn = e.currentTarget;
    const postId = parseInt(btn.dataset.id);

    if (userLiked[postId]) {
        likes[postId]--;
        delete userLiked[postId];
        btn.classList.remove('liked');
    } else {
        likes[postId] = (likes[postId] || 0) + 1;
        userLiked[postId] = true;
        btn.classList.add('liked');
    }

    const likeSpan = btn.querySelector('.like-count');
    if (likeSpan) likeSpan.textContent = likes[postId];
    saveLikes(likes);
    saveUserLiked();
}

function handleToggleComments(e) {
    const btn = e.currentTarget;
    const postId = btn.dataset.id;
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
    }
}

function handleSubmitComment(e) {
    const btn = e.currentTarget;
    const postId = parseInt(btn.dataset.id);
    const input = document.querySelector(`.comment-input[data-id="${postId}"]`);
    const commentText = input?.value.trim();

    if (!commentText) return;

    const newComment = {
        id: Date.now(),
        author: 'Гость',
        text: commentText,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    if (!comments[postId]) comments[postId] = [];
    comments[postId].push(newComment);
    saveComments(comments);

    const oldScroll = window.scrollY;
    renderPosts();
    window.scrollTo(0, oldScroll);

    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) commentsSection.style.display = 'block';
}

function handleCommentKeypress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = e.currentTarget;
        const postId = parseInt(input.dataset.id);
        const submitBtn = document.querySelector(`.submit-comment[data-id="${postId}"]`);
        if (submitBtn) submitBtn.click();
    }
}
/*-------------------------------------------------------*/

/* анимации при скролле */
function initAnimations() {
    const posts = document.querySelectorAll('.post-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    posts.forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = 'all 0.6s ease';
        observer.observe(post);
    });
}
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

/* запуск функций*/
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();        // Рендер постов
    initAnimations();     // Анимация появления
    initBurger();         // Бургер-меню
});
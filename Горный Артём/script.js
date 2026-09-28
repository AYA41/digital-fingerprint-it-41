/* ============================================================
   0. УПРАВЛЕНИЕ ТЕМОЙ
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Синхронизируем иконку с текущим состоянием (тема уже применена inline-скриптом в <head>)
function updateToggleAria() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Включить светлую тему' : 'Включить тёмную тему'
    );
}

themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';

    if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

    updateToggleAria();
});

// Реагируем на смену системной темы, если пользователь не выбрал вручную
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme')) return; // пользователь выбрал вручную
    if (e.matches) {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
    updateToggleAria();
});

updateToggleAria();

/* ============================================================
   1. ДАННЫЕ МИФОВ
   ============================================================ */
const myths = [
    {
        myth: 'Мой Wi-Fi защищён, потому что у меня сложный пароль',
        truth: 'Пароль — лишь первый барьер. Если используется устаревший протокол WEP или WPA, сеть взламывается за минуты. Нужен WPA2 или WPA3, длина пароля от 12 символов и отключённый WPS.'
    },
    {
        myth: 'Скрытие имени сети (SSID) делает её невидимой для хакеров',
        truth: 'Скрытый SSID легко обнаруживается специальными сканерами. Это создаёт ложное чувство безопасности. Лучше потратить время на шифрование и сложный пароль.'
    },
    {
        myth: 'Публичный Wi-Fi в кафе безопасен, если там есть пароль',
        truth: 'Пароль лишь ограничивает доступ, но трафик внутри сети часто не шифруется. Злоумышленник в той же сети может перехватывать данные (Man-in-the-Middle). Используйте VPN.'
    },
    {
        myth: 'Я просто сижу в интернете — меня не взломают',
        truth: 'Атаки бывают пассивными: вас не взламывают, а просто собирают данные. Через уязвимости роутера злоумышленник может перенаправлять трафик на фишинговые сайты.'
    },
    {
        myth: 'WPS — удобная и безопасная функция',
        truth: 'WPS уязвим к перебору PIN-кода — 8 цифр часто взламываются за часы. Многие роутеры не отключают WPS полностью. Лучше отключить WPS и подключаться вручную.'
    },
    {
        myth: 'Если сеть называется так же, как моя домашняя, это она и есть',
        truth: 'Это «злой двойник» (Evil Twin). Мошенник создаёт точку доступа с тем же именем, и весь ваш трафик идёт через него. Не подключайтесь к открытым сетям с знакомыми именами.'
    }
];

/* ============================================================
   2. ГЕНЕРАЦИЯ КАРТОЧЕК МИФОВ
   ============================================================ */
const mythsGrid = document.getElementById('mythsGrid');

myths.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'myth-card';
    card.innerHTML = `
        <span class="myth-card__badge myth-card__badge--myth">Миф</span>
        <h3 class="myth-card__title">«${item.myth}»</h3>
        <p class="myth-card__text">
            ${item.truth}
        </p>
        <div class="myth-card__hint">Нажмите, чтобы увидеть правду →</div>
    `;

    const textEl = card.querySelector('.myth-card__text');
    const badgeEl = card.querySelector('.myth-card__badge');
    const hintEl = card.querySelector('.myth-card__hint');

    textEl.style.display = 'none';

    card.addEventListener('click', () => {
        const isFlipped = card.classList.toggle('flipped');

        if (isFlipped) {
            badgeEl.textContent = 'Реальность';
            badgeEl.className = 'myth-card__badge myth-card__badge--truth';
            textEl.style.display = 'block';
            hintEl.textContent = '← Вернуться к мифу';
        } else {
            badgeEl.textContent = 'Миф';
            badgeEl.className = 'myth-card__badge myth-card__badge--myth';
            textEl.style.display = 'none';
            hintEl.textContent = 'Нажмите, чтобы увидеть правду →';
        }
    });

    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);

    mythsGrid.appendChild(card);
});

/* ============================================================
   3. ТАБЫ В РАЗДЕЛЕ СОВЕТОВ
   ============================================================ */
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

/* ============================================================
   4. ТЕСТ
   ============================================================ */
const quizData = [
    {
        question: 'Правда ли, что скрытие SSID делает сеть невидимой?',
        answers: ['Да', 'Нет', 'Только для старых устройств'],
        correct: 1
    },
    {
        question: 'Какой протокол шифрования самый безопасный?',
        answers: ['WEP', 'WPA', 'WPA2 / WPA3'],
        correct: 2
    },
    {
        question: 'Что делать, если вы подключились к публичному Wi-Fi?',
        answers: [
            'Зайти в банк — это же удобно',
            'Использовать VPN и не вводить важные данные',
            'Ничего, это безопасно'
        ],
        correct: 1
    },
    {
        question: 'WPS — это...',
        answers: ['Безопасная функция', 'Уязвимость', 'Протокол шифрования'],
        correct: 1
    },
    {
        question: 'Evil Twin — это...',
        answers: ['Вирус', 'Поддельная точка доступа', 'Тип шифрования'],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizBox = document.getElementById('quizBox');
const quizResult = document.getElementById('quizResult');
const quizQuestion = document.getElementById('quizQuestion');
const quizAnswers = document.getElementById('quizAnswers');
const quizNext = document.getElementById('quizNext');
const quizCounter = document.getElementById('quizCounter');
const progressBar = document.getElementById('progressBar');
const resultScore = document.getElementById('resultScore');
const resultText = document.getElementById('resultText');
const quizRestart = document.getElementById('quizRestart');

function loadQuestion() {
    answered = false;
    quizNext.disabled = true;
    quizNext.textContent = 'Далее';

    const q = quizData[currentQuestion];
    quizQuestion.textContent = q.question;
    quizCounter.textContent = `Вопрос ${currentQuestion + 1} из ${quizData.length}`;
    progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;

    quizAnswers.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer';
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        quizAnswers.appendChild(btn);
    });
}

function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;

    const correct = quizData[currentQuestion].correct;
    const allBtns = quizAnswers.querySelectorAll('.answer');

    allBtns.forEach((b, i) => {
        b.disabled = true;
        if (i === correct) b.classList.add('correct');
        if (i === index && i !== correct) b.classList.add('wrong');
    });

    if (index === correct) score++;

    quizNext.disabled = false;
}

quizNext.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.style.display = 'none';
    quizResult.style.display = 'block';

    resultScore.textContent = `${score} / ${quizData.length}`;

    let text = '';
    if (score === quizData.length) {
        text = 'Отлично! Вы отлично разбираетесь в безопасности Wi-Fi.';
    } else if (score >= quizData.length * 0.6) {
        text = 'Хороший результат! Но есть что улучшить — изучите советы выше.';
    } else {
        text = 'Стоит внимательнее изучить материал. Начните с раздела «Мифы».';
    }
    resultText.textContent = text;
}

quizRestart.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizResult.style.display = 'none';
    quizBox.style.display = 'block';
    loadQuestion();
});

loadQuestion();

/* ============================================================
   5. БУРГЕР-МЕНЮ
   ============================================================ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

/* ============================================================
   6. ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ СКРОЛЛЕ
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section__title, .section__subtitle, .tabs, .tab-content, .quiz, .resources-grid')
    .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
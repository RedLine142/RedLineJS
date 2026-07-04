/*
==================================================
 RedLineJS v2.0
 Автор: RedLine
 Расширенная версия для RedFox Quest
==================================================
*/

const RedLine = {

    version: "2.0",
    prefix: "RL",

    // ==========================================
    // Служебные функции
    // ==========================================

    hello() {
        console.log(`%c🚀 RedLineJS v${this.version} загружен!`, 
            'color: #FF6B6B; font-size: 16px; font-weight: bold;');
        console.log('%c📦 Доступные функции:', 'font-weight: bold;');
        console.log('  • get() - получить элемент');
        console.log('  • show/hide/toggle() - управление видимостью');
        console.log('  • text/html() - изменение содержимого');
        console.log('  • css/addClass() - работа со стилями');
        console.log('  • hoverText/hoverImage() - эффекты наведения');
        console.log('  • olympic() - создание олимпийской сетки');
        console.log('  • 💡 НОВОЕ: on(), ajax(), storage(), toast()');
        console.log('  • 🎮 НОВОЕ: gameCode(), findCode(), levelInfo()');
        return this;
    },

    // ==========================================
    // Работа с элементами (улучшенная)
    // ==========================================

    get(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`⚠️ RedLineJS: элемент '${id}' не найден.`);
            return null;
        }
        return element;
    },

    // Поддержка селекторов CSS
    qs(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ RedLineJS: селектор '${selector}' не найден.`);
            return null;
        }
        return element;
    },

    qsa(selector) {
        return document.querySelectorAll(selector);
    },

    show(id) {
        const element = this.get(id);
        if (!element) return this;
        element.style.display = "";
        return this;
    },

    hide(id) {
        const element = this.get(id);
        if (!element) return this;
        element.style.display = "none";
        return this;
    },

    toggle(id) {
        const element = this.get(id);
        if (!element) return this;
        element.style.display = element.style.display === "none" ? "" : "none";
        return this;
    },

    text(id, value) {
        const element = this.get(id);
        if (!element) return this;
        element.textContent = value;
        return this;
    },

    html(id, value) {
        const element = this.get(id);
        if (!element) return this;
        element.innerHTML = value;
        return this;
    },

    css(id, property, value) {
        const element = this.get(id);
        if (!element) return this;
        element.style[property] = value;
        return this;
    },

    addClass(id, className) {
        const element = this.get(id);
        if (!element) return this;
        element.classList.add(className);
        return this;
    },

    removeClass(id, className) {
        const element = this.get(id);
        if (!element) return this;
        element.classList.remove(className);
        return this;
    },

    toggleClass(id, className) {
        const element = this.get(id);
        if (!element) return this;
        element.classList.toggle(className);
        return this;
    },

    // ==========================================
    // Работа с событиями (НОВОЕ)
    // ==========================================

    on(selector, event, callback) {
        const elements = this.qsa(selector);
        elements.forEach(el => {
            el.addEventListener(event, callback);
        });
        return this;
    },

    // ==========================================
    // Работа с AJAX (НОВОЕ)
    // ==========================================

    ajax(options) {
        const defaults = {
            method: 'GET',
            url: '',
            data: null,
            headers: {},
            success: null,
            error: null,
            beforeSend: null
        };

        const config = { ...defaults, ...options };

        return new Promise((resolve, reject) => {
            if (config.beforeSend) config.beforeSend();

            const xhr = new XMLHttpRequest();
            xhr.open(config.method, config.url, true);

            // Устанавливаем заголовки
            Object.keys(config.headers).forEach(key => {
                xhr.setRequestHeader(key, config.headers[key]);
            });

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = xhr.responseText;
                    try {
                        response = JSON.parse(response);
                    } catch (e) {}
                    
                    if (config.success) config.success(response);
                    resolve(response);
                } else {
                    if (config.error) config.error(xhr.statusText);
                    reject(xhr.statusText);
                }
            };

            xhr.onerror = function() {
                if (config.error) config.error('Ошибка сети');
                reject('Ошибка сети');
            };

            const data = config.data ? JSON.stringify(config.data) : null;
            xhr.send(data);
        });
    },

    // ==========================================
    // Работа с localStorage (НОВОЕ)
    // ==========================================

    storage: {
        set(key, value) {
            try {
                localStorage.setItem('RL_' + key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('Ошибка сохранения:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const data = localStorage.getItem('RL_' + key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },

        remove(key) {
            localStorage.removeItem('RL_' + key);
        },

        clear() {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('RL_')) {
                    localStorage.removeItem(key);
                }
            });
        }
    },

    // ==========================================
    // Уведомления (НОВОЕ)
    // ==========================================

    toast(message, type = 'info', duration = 3000) {
        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            warning: '#FFC107',
            info: '#2196F3'
        };

        const toast = document.createElement('div');
        toast.className = 'rl-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${colors[type] || '#333'};
            color: white;
            border-radius: 8px;
            z-index: 99999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: rlSlideIn 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'rlSlideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return this;
    },

    // ==========================================
    // 🎮 Функции для RedFox Quest (НОВОЕ)
    // ==========================================

    // Получить информацию об уровне
    levelInfo() {
        const title = document.querySelector('.game-title');
        const level = document.querySelector('h1 strong');
        
        return {
            game: title ? title.textContent : 'Неизвестно',
            level: level ? level.textContent : 'Неизвестно',
            timeSpent: window.time_spent || 0,
            timeLeft: window.time_left || 0,
            taskId: document.querySelector('input[name="task_id"]')?.value || null,
            isActive: document.querySelector('.level_time') !== null
        };
    },

    // Проверить код
    checkCode(code) {
        const form = document.querySelector('.enter');
        const input = document.querySelector('#code');
        const submitBtn = document.querySelector('.enter button');

        if (!form || !input || !submitBtn) {
            this.toast('❌ Форма ввода не найдена', 'error');
            return false;
        }

        input.value = code;
        submitBtn.click();
        
        this.toast(`🔍 Проверка кода: ${code}`, 'info', 1500);
        return true;
    },

    // Найти код на странице (поиск по тексту)
    findCode() {
        const patterns = [
            /[A-Z]{2,}/g,        // Заглавные буквы
            /[0-9]{4,}/g,        // Числа из 4+ цифр
            /[A-Z0-9]{4,}/g,     // Смешанные
        ];

        const bodyText = document.body.textContent;
        let found = [];

        patterns.forEach(pattern => {
            const matches = bodyText.match(pattern);
            if (matches) {
                found = [...found, ...matches];
            }
        });

        // Уникальные значения
        found = [...new Set(found)];

        if (found.length > 0) {
            this.toast(`🔍 Найдено возможных кодов: ${found.length}`, 'info');
            console.log('Возможные коды:', found);
        } else {
            this.toast('❌ Кодов не найдено', 'warning');
        }

        return found;
    },

    // Автоматически подставить найденный код
    autoFillCode() {
        const codes = this.findCode();
        if (codes.length > 0) {
            const input = document.querySelector('#code');
            if (input) {
                input.value = codes[0];
                this.toast(`✅ Подставлен код: ${codes[0]}`, 'success');
            }
        }
        return this;
    },

    // ==========================================
    // Эффекты наведения (улучшенные)
    // ==========================================

    hoverText(id, replaceText = "ЗАМЕНА") {
        const element = this.get(id);
        if (!element) return this;

        const originalText = element.textContent;

        element.addEventListener('mouseenter', () => {
            element.textContent = replaceText;
            element.dataset.hovering = 'true';
        });

        element.addEventListener('mouseleave', () => {
            element.textContent = originalText;
            element.dataset.hovering = 'false';
        });

        return this;
    },

    hoverImage(id, replaceSrc) {
        const element = this.get(id);
        if (!element) return this;

        // Проверяем, что это изображение
        if (element.tagName !== 'IMG') {
            console.warn('Элемент не является изображением');
            return this;
        }

        const originalSrc = element.src;

        // Если replaceSrc не указан, используем стандартный
        if (!replaceSrc) {
            replaceSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FF6B6B"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="white" font-size="20"%3E?%3C/text%3E%3C/svg%3E';
        }

        element.addEventListener('mouseenter', () => {
            element.src = replaceSrc;
        });

        element.addEventListener('mouseleave', () => {
            element.src = originalSrc;
        });

        return this;
    },

    // ==========================================
    // Олимпийка (улучшенная)
    // ==========================================

    olympic(options) {
        const container = this.get(options.id);
        if (!container) return this;

        container.innerHTML = '';
        
        const type = options.type || 8;
        const data = options.data || [];
        const onCellClick = options.onCellClick || null;

        let current = type;
        let number = 1;

        while (current >= 1) {
            const column = document.createElement('div');
            column.className = 'rl-olympic-column';

            for (let i = 0; i < current; i++) {
                const cell = document.createElement('div');
                cell.className = 'rl-olympic-cell';
                cell.id = 'cell-' + number;
                
                // Если есть данные для ячейки
                if (data[number - 1]) {
                    cell.textContent = data[number - 1];
                } else {
                    cell.textContent = number;
                }

                // Обработчик клика
                if (onCellClick) {
                    cell.addEventListener('click', () => {
                        onCellClick(number, cell);
                    });
                }

                column.appendChild(cell);
                number++;
            }

            container.appendChild(column);
            current = Math.floor(current / 2);
        }

        // Добавляем стили, если их нет
        if (!document.getElementById('rl-olympic-style')) {
            const style = document.createElement('style');
            style.id = 'rl-olympic-style';
            style.textContent = `
                .rl-olympic {
                    display: flex;
                    gap: 25px;
                    align-items: flex-start;
                    padding: 20px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 12px;
                    overflow-x: auto;
                }
                .rl-olympic-column {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    gap: 12px;
                }
                .rl-olympic-cell {
                    width: 170px;
                    height: 42px;
                    border: 2px solid #555;
                    background: #222;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    transition: all 0.3s;
                    cursor: default;
                    user-select: none;
                }
                .rl-olympic-cell:hover {
                    transform: scale(1.05);
                    border-color: #777;
                }
                .rl-olympic-cell.opened {
                    background: #2f7d32;
                    font-weight: bold;
                    border-color: #4CAF50;
                    box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
                }
                .rl-olympic-cell.eliminated {
                    background: #7d2f2f;
                    border-color: #F44336;
                    opacity: 0.5;
                }
                .rl-olympic-cell.winner {
                    background: #FFC107;
                    color: #000;
                    font-weight: bold;
                    border-color: #FFC107;
                    box-shadow: 0 0 30px rgba(255, 193, 7, 0.5);
                    animation: rlPulse 1s infinite;
                }
                @keyframes rlPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes rlSlideIn {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes rlSlideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        container.classList.add('rl-olympic');
        return this;
    },

    // ==========================================
    // Анимации (НОВОЕ)
    // ==========================================

    animate(id, animation, duration = 500) {
        const element = this.get(id);
        if (!element) return this;

        const animations = {
            fadeIn: [
                { opacity: 0 },
                { opacity: 1 }
            ],
            fadeOut: [
                { opacity: 1 },
                { opacity: 0 }
            ],
            slideDown: [
                { transform: 'translateY(-20px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            slideUp: [
                { transform: 'translateY(20px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            pulse: [
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ],
            shake: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ]
        };

        const keyframes = animations[animation];
        if (!keyframes) {
            console.warn(`Анимация '${animation}' не найдена`);
            return this;
        }

        element.animate(keyframes, {
            duration: duration,
            easing: 'ease-in-out'
        });

        return this;
    },

    // ==========================================
    // Создание задания для RedFox (НОВОЕ)
    // ==========================================

    createTask(options) {
        const container = document.querySelector('.task_text');
        if (!container) {
            this.toast('❌ Контейнер задания не найден', 'error');
            return this;
        }

        const defaults = {
            title: 'Задание',
            description: '',
            hints: [],
            codes: [],
            onSuccess: null,
            onError: null
        };

        const config = { ...defaults, ...options };

        // Создаем HTML
        container.innerHTML = `
            <div class="rl-task">
                <div class="rl-task-header">
                    <h3>🔍 ${config.title}</h3>
                    <div class="rl-task-status">Активно</div>
                </div>
                <div class="rl-task-body">
                    <div class="rl-task-description">${config.description}</div>
                    ${config.hints.length > 0 ? `
                        <div class="rl-task-hints">
                            <button class="rl-hint-btn">💡 Подсказка</button>
                            <div class="rl-hint-box" style="display:none;">
                                ${config.hints.map(h => `<p>• ${h}</p>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <div class="rl-task-input">
                        <input type="text" class="rl-code-input" placeholder="Введите код...">
                        <button class="rl-check-btn">Проверить</button>
                        <div class="rl-task-result"></div>
                    </div>
                </div>
            </div>
        `;

        // Добавляем стили для задания
        const style = document.createElement('style');
        style.textContent = `
            .rl-task {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 20px;
                margin: 10px 0;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .rl-task-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            .rl-task-header h3 {
                margin: 0;
                color: #fff;
            }
            .rl-task-status {
                color: #4CAF50;
                font-size: 14px;
            }
            .rl-task-description {
                color: #ddd;
                line-height: 1.6;
                margin-bottom: 15px;
            }
            .rl-hint-btn {
                background: #2196F3;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                margin-bottom: 10px;
                transition: all 0.3s;
            }
            .rl-hint-btn:hover {
                transform: scale(1.05);
                opacity: 0.9;
            }
            .rl-hint-box {
                background: rgba(33, 150, 243, 0.1);
                border-left: 3px solid #2196F3;
                padding: 10px 15px;
                margin-bottom: 15px;
                border-radius: 4px;
                color: #64B5F6;
            }
            .rl-task-input {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                align-items: center;
            }
            .rl-code-input {
                flex: 1;
                min-width: 200px;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 6px;
                padding: 10px 15px;
                color: #fff;
                font-size: 16px;
                transition: all 0.3s;
            }
            .rl-code-input:focus {
                outline: none;
                border-color: #4CAF50;
                box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
            }
            .rl-check-btn {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 10px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s;
            }
            .rl-check-btn:hover {
                transform: scale(1.05);
                background: #43A047;
            }
            .rl-task-result {
                width: 100%;
                margin-top: 10px;
                font-weight: bold;
                padding: 10px;
                border-radius: 6px;
                display: none;
            }
            .rl-task-result.success {
                display: block;
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid #4CAF50;
                color: #4CAF50;
            }
            .rl-task-result.error {
                display: block;
                background: rgba(244, 67, 54, 0.2);
                border: 1px solid #F44336;
                color: #F44336;
            }
            .rl-task-result.info {
                display: block;
                background: rgba(33, 150, 243, 0.2);
                border: 1px solid #2196F3;
                color: #64B5F6;
            }
        `;
        document.head.appendChild(style);

        // Обработчики
        const hintBtn = container.querySelector('.rl-hint-btn');
        const hintBox = container.querySelector('.rl-hint-box');
        const codeInput = container.querySelector('.rl-code-input');
        const checkBtn = container.querySelector('.rl-check-btn');
        const resultDiv = container.querySelector('.rl-task-result');

        if (hintBtn && hintBox) {
            hintBtn.addEventListener('click', () => {
                const isVisible = hintBox.style.display !== 'none';
                hintBox.style.display = isVisible ? 'none' : 'block';
                hintBtn.textContent = isVisible ? '💡 Подсказка' : '🔒 Скрыть подсказку';
            });
        }

        if (checkBtn && codeInput && resultDiv) {
            const checkCode = () => {
                const code = codeInput.value.trim().toUpperCase();
                
                if (!code) {
                    resultDiv.textContent = '⚠️ Введите код';
                    resultDiv.className = 'rl-task-result info';
                    resultDiv.style.display = 'block';
                    return;
                }

                if (config.codes.includes(code)) {
                    resultDiv.textContent = '✅ Правильный код!';
                    resultDiv.className = 'rl-task-result success';
                    resultDiv.style.display = 'block';
                    
                    if (config.onSuccess) {
                        config.onSuccess(code);
                    }
                    
                    // Отправляем в форму
                    this.checkCode(code);
                } else {
                    resultDiv.textContent = '❌ Неверный код. Попробуйте еще раз';
                    resultDiv.className = 'rl-task-result error';
                    resultDiv.style.display = 'block';
                    
                    if (config.onError) {
                        config.onError(code);
                    }
                }
            };

            checkBtn.addEventListener('click', checkCode);
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') checkCode();
            });
            codeInput.focus();
        }

        return this;
    },

    // ==========================================
    // Инициализация для RedFox (НОВОЕ)
    // ==========================================

    init() {
        this.hello();
        
        // Добавляем информацию об уровне в консоль
        const info = this.levelInfo();
        console.log('📊 Информация об уровне:', info);
        
        // Добавляем горячие клавиши
        document.addEventListener('keydown', (e) => {
            // Alt+1 - показать задание
            if (e.altKey && e.key === '1') {
                const taskTab = document.querySelector('#task');
                if (taskTab) taskTab.click();
                this.toast('📖 Задание', 'info', 1000);
            }
            // Alt+2 - показать подсказки
            if (e.altKey && e.key === '2') {
                const hintsTab = document.querySelector('#hints');
                if (hintsTab) hintsTab.click();
                this.toast('💡 Подсказки', 'info', 1000);
            }
            // Alt+3 - показать найденные коды
            if (e.altKey && e.key === '3') {
                const codesTab = document.querySelector('#found-codes');
                if (codesTab) codesTab.click();
                this.toast('🔑 Найденные коды', 'info', 1000);
            }
            // Alt+C - фокус на поле ввода
            if (e.altKey && e.key === 'c') {
                const input = document.querySelector('#code');
                if (input) {
                    input.focus();
                    input.select();
                    this.toast('⌨️ Поле ввода', 'info', 1000);
                }
            }
        });

        console.log('%c🎮 Готово! Используйте Alt+1-3 для переключения вкладок', 
            'color: #4CAF50; font-weight: bold;');

        return this;
    }
};

// Автоматическая инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RedLine.init());
} else {
    RedLine.init();
}

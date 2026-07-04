/*
==================================================
 RedLineJS
 Автор: RedLine
 Версия: 1.0
==================================================
*/

const RedLine = {
    version: "1.0",

    // Приветствие
    hello() {
        console.log("✅ RedLineJS успешно загружен!");
        return this;
    },

    // Получить элемент по ID
    get(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn("⚠️ RedLineJS: элемент '" + id + "' не найден.");
            return null;
        }
        return element;
    },

    // Показать элемент
    show(id) {
        const element = this.get(id);
        if (!element) return this;
        element.style.display = "";
        return this;
    },

    // Скрыть элемент
    hide(id) {
        const element = this.get(id);
        if (!element) return this;
        element.style.display = "none";
        return this;
    },

    // Переключить видимость
    toggle(id) {
        const element = this.get(id);
        if (!element) return this;
        if (element.style.display === "none") {
            element.style.display = "";
        } else {
            element.style.display = "none";
        }
        return this;
    },

    // Изменить текст
    text(id, value) {
        const element = this.get(id);
        if (!element) return this;
        element.textContent = value;
        return this;
    },

    // Изменить HTML
    html(id, value) {
        const element = this.get(id);
        if (!element) return this;
        element.innerHTML = value;
        return this;
    },

    // Изменить CSS
    css(id, property, value) {
        const element = this.get(id);
        if (!element) return this;
        element.style[property] = value;
        return this;
    },

    // Добавить класс
    addClass(id, className) {
        const element = this.get(id);
        if (!element) return this;
        element.classList.add(className);
        return this;
    },

    // Эффект наведения на текст (замена текста)
    hoverText(id, replaceText) {
        const element = this.get(id);
        if (!element) return this;
        
        const originalText = element.textContent;
        const newText = replaceText || "ЗАМЕНА";
        
        element.addEventListener("mouseenter", function() {
            this.textContent = newText;
        });
        
        element.addEventListener("mouseleave", function() {
            this.textContent = originalText;
        });
        
        return this;
    },

    // Эффект наведения (изменение цвета) - НОВАЯ ФУНКЦИЯ ДЛЯ ВАС!
    hoverColor(id, colorOn, colorOff) {
        const element = this.get(id);
        if (!element) return this;
        
        const originalColor = colorOff || "#FFD700";
        const newColor = colorOn || "#FF0000";
        
        // Сохраняем исходный цвет
        const savedColor = element.style.color || originalColor;
        
        element.addEventListener("mouseenter", function() {
            this.style.color = newColor;
            this.style.transform = "scale(1.1)";
            this.style.transition = "all 0.3s ease";
        });
        
        element.addEventListener("mouseleave", function() {
            this.style.color = savedColor;
            this.style.transform = "scale(1)";
        });
        
        console.log("✅ RedLineJS: эффект наведения на цвет применен к #" + id);
        return this;
    },

    // Эффект наведения на картинку
    hoverImage(id, replaceSrc) {
        const element = this.get(id);
        if (!element || element.tagName !== 'IMG') return this;
        
        const originalSrc = element.src;
        const newSrc = replaceSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FF6B6B"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="white" font-size="20"%3E?%3C/text%3E%3C/svg%3E';
        
        element.addEventListener("mouseenter", function() {
            this.src = newSrc;
        });
        
        element.addEventListener("mouseleave", function() {
            this.src = originalSrc;
        });
        
        return this;
    }
};

// Автозапуск
RedLine.hello();

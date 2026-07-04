const RedLine = {
    version: "1.0",
    hello() {
        console.log("RedLineJS успешно загружен!");
        return this;
    },
    get(id) {
        const element = document.getElementById(id);
        if (!element) console.warn("Элемент '" + id + "' не найден.");
        return element;
    },
    show(id) {
        const element = this.get(id);
        if (element) element.style.display = "";
        return this;
    },
    hide(id) {
        const element = this.get(id);
        if (element) element.style.display = "none";
        return this;
    },
    toggle(id) {
        const element = this.get(id);
        if (element) {
            element.style.display = element.style.display === "none" ? "" : "none";
        }
        return this;
    },
    text(id, value) {
        const element = this.get(id);
        if (element) element.textContent = value;
        return this;
    },
    html(id, value) {
        const element = this.get(id);
        if (element) element.innerHTML = value;
        return this;
    },
    css(id, property, value) {
        const element = this.get(id);
        if (element) element.style[property] = value;
        return this;
    },
    addClass(id, className) {
        const element = this.get(id);
        if (element) element.classList.add(className);
        return this;
    },
    removeClass(id, className) {
        const element = this.get(id);
        if (element) element.classList.remove(className);
        return this;
    },
    hoverColor(id, colorOn, colorOff) {
        const element = this.get(id);
        if (!element) return this;
        const originalColor = colorOff || "#FFD700";
        const newColor = colorOn || "#FF0000";
        element.addEventListener("mouseenter", function() {
            this.style.color = newColor;
            this.style.transform = "scale(1.1)";
            this.style.borderBottomColor = newColor;
        });
        element.addEventListener("mouseleave", function() {
            this.style.color = originalColor;
            this.style.transform = "scale(1)";
            this.style.borderBottomColor = originalColor;
        });
        return this;
    }
};

RedLine.hello();

/*
==================================================
 RedLineJS

 Автор: RedLine

 Версия: 1.0

 История изменений

 1.0
- создана библиотека
- hello()
- get()
- show()
- hide()

==================================================
*/

const RedLine = {

    version: "1.0",

    // ==========================================
    // Служебные функции
    // ==========================================

    hello() {

        console.log("RedLineJS успешно загружен!");

    },
	
	
	
		get(id) {

		const element = document.getElementById(id);

		if (!element) {

        console.warn("RedLineJS: элемент '" + id + "' не найден.");

        return null;

		}

		return element;

		},
		
		
		    // ==========================================
			// Работа с элементами
			// ==========================================
		
		// Показать элемент
		show(id) {

		const element = this.get(id);

		if (!element) return;

		element.style.display = "";

		},


		hide(id) {

		const element = this.get(id);

		if (!element) return;

		element.style.display = "none";

		},



		toggle(id) {

			const element = this.get(id);

			if (!element) return;

			if (element.style.display === "none") {

				element.style.display = "";

			} else {

				element.style.display = "none";

			}

		},

		// Изменить текст элемента
		text(id, value) {

			const element = this.get(id);

			if (!element) return;

			element.textContent = value;

		},


		// Изменить HTML содержимое элемента
		html(id, value) {

			const element = this.get(id);

			if (!element) return;

			element.innerHTML = value;

		},

		// Изменить CSS-свойство элемента
		css(id, property, value) {

			const element = this.get(id);

			if (!element) return;

			element.style[property] = value;

		},

		// Добавить CSS-класс
		addClass(id, className) {

			const element = this.get(id);

			if (!element) return;

			element.classList.add(className);

		},

		// ==========================================
		// Эффекты наведения
		// ==========================================


		// Замена текста при наведении мышки
		hoverText(id) {

			const element = this.get(id);

			if (!element) return;


			// Запоминаем исходный текст
			const originalText = element.textContent;


			// Текст, который появится при наведении!!!!!!!!!!!!!
			const replaceText = "ЗАМЕНА";


			// Наведение мышки
			element.addEventListener(
				"mouseenter",
				() => {

					element.textContent = replaceText;

				}
			);

		// ==========================================
		// В HTML:-->>    <div id="secret">исходный текст</div> <script src="RedLineJS.js"></script> <script> RedLine.hoverText("secret"); </script>
		// ==========================================

			// Уход мышки
			element.addEventListener(
				"mouseleave",
				() => {

					element.textContent = originalText;

				}
			);


		},

		// ==========================================
		// Эффекты наведения
		// ==========================================


		// Замена картинки при наведении мышки
		hoverImage(id) {

			const element = this.get(id);

			if (!element) return;


			// Запоминаем исходную картинку
			const originalSrc = element.src;


			// Картинка при наведении
			const replaceSrc = "C:\Users\RedLine\Desktop\ОБЪЕКТ 47 АНОМАЛИЯ\deb62d5c-f822-4154-a78f-fb49f01817ff.png";


			// Наведение мышки
			element.addEventListener(
				"mouseenter",
				() => {

					element.src = replaceSrc;

				}
			);



			// Уход мышки
			element.addEventListener(
				"mouseleave",
				() => {

					element.src = originalSrc;

				}
			);


		},

		// ==========================================
		// Олимпийка
		// ==========================================

		// Создать олимпийку
		olympic(options) {

			const container = this.get(options.id);

			if (!container) return;

			// очищаем контейнер
			container.innerHTML = "";

			// количество стартовых ячеек
			const start = options.type || 8;

			let current = start;
			let number = 1;

			while (current >= 1) {

				const column = document.createElement("div");
				column.className = "rl-olympic-column";

				for (let i = 0; i < current; i++) {

					const cell = document.createElement("div");

					cell.className = "rl-olympic-cell";

					cell.id = "cell-" + number;

					cell.textContent = number;

					column.appendChild(cell);

					number++;

				}

				container.appendChild(column);

				current = Math.floor(current / 2);

			}

			// если стили ещё не добавлены
			if (!document.getElementById("rl-olympic-style")) {

				const style = document.createElement("style");

				style.id = "rl-olympic-style";

				style.textContent = `
				
				.rl-olympic{
					display:flex;
					gap:25px;
					align-items:flex-start;
				}

				.rl-olympic-column{
					display:flex;
					flex-direction:column;
					justify-content:space-around;
					gap:12px;
				}

				.rl-olympic-cell{

					width:170px;
					height:42px;

					border:1px solid #777;

					background:#222;

					color:#fff;

					font-family:Arial;

					font-size:16px;

					display:flex;

					align-items:center;

					justify-content:center;

					border-radius:6px;

					transition:.3s;

				}

				.rl-olympic-cell.opened{

					background:#2f7d32;

					font-weight:bold;

				}

				`;

				document.head.appendChild(style);

			}

			container.classList.add("rl-olympic");

		},

};
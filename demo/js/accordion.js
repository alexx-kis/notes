"use strict";

let tabs = document.querySelectorAll(".acc__tab"); //табы
let sections = document.querySelectorAll(".acc__section"); // секция
let contents = document.querySelectorAll(".acc__content"); //раскрывающиеся контенты внтури табов

for (let i = 0; i < contents.length; i++) {
	sections[i].addEventListener("click", function () {
		let active = document.querySelector(".acc__content--active"); //поиск открытого контента
		let open = document.querySelector(".acc__tab--open"); //поиск открытого таба

		//если есть активный контент и его высота не равна 0
		if (
			contents[i].classList.contains("acc__content--active") &&
			contents[i].style.maxHeight != null
		) {
			//удалить пустой класс активности у контента
			contents[i].classList.remove("acc__content--active");

			//удалить класс активности у вкладки (плюсик)
			tabs[i].classList.remove("acc__tab--open");

			//закрыть контент
			contents[i].style.maxHeight = null;
		} else {
			//добавить класс контенту
			contents[i].classList.add("acc__content--active");

			//добавить класс активности вкладке
			tabs[i].classList.add("acc__tab--open");

			//открыть контент
			contents[i].style.maxHeight = contents[i].scrollHeight + "px";

			//если есть открытые контенты на странице
			if (active) {
				//удалить класс у контента
				active.classList.remove("acc__content--active");

				//удалить класс у открытой вкладки
				open.classList.remove("acc__tab--open");

				//закрыть контент
				active.style.maxHeight = null;
			}
		}
	});
}

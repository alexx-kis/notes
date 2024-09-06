'use strict';

let swiper = new Swiper('.swiper', {
	// Параметры слайдера
	loop: true,
	spaceBetween: 10,
	// slidesPerView: 2,
	mousewheel: true,
	// centeredSlides: true,
	speed: 600,

	navigation: {
		nextEl: ".slider__arrow--next",
		prevEl: ".slider__arrow--prev",
	},

});

let itemTitles = document.querySelectorAll('.about__item-title');
let itemContents = document.querySelectorAll('.about__item-code');

for (let i = 0; i < itemTitles.length; i++) {
	itemTitles[i].addEventListener('click', function () {
		if (itemContents[i].style.maxHeight) {
			itemContents[i].style.maxHeight = null;
		} else {
			itemContents[i].style.maxHeight = itemContents[i].scrollHeight + "px";
		}
	});
}

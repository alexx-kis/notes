# noUiSlider #

<a href='https://refreshless.com/nouislider/slider-values/'>Документация noUiSlider</a>

* - это библиотека, которая предоставляет слайдер типа input type='range', но с расширенными возможностями
* например, можно сделать два бегунка на слайдере

* стили нужно прописать самому

## Инициализация ##

* создать div с id='slider'

		<div class="level-form__slider" id="slider"></div>

* подключить файл стилей и скрипт

		<link rel="stylesheet" href="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.css">

		<script src="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.js"></script>

* создать переменную элемента слайдера

		const sliderElement = document.querySelector('.level-form__slider');

* инициализировать слайдер

		noUiSlider.create(sliderElement, {
  		range: {
				min: 0,
				max: 100,
			},
			start: 80,
		});

* первый параметр - элемент слайдера, второй - объект с настройками
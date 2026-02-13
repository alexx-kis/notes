# noUiSlider

<a href='https://refreshless.com/nouislider/slider-values/'>Документация noUiSlider</a>

- это библиотека, которая предоставляет слайдер типа input type='range', но с расширенными возможностями
- например, можно сделать два бегунка на слайдере

- стили нужно прописать самому

## Инициализация

- создать `div` с `id='slider'`

```html
<div class="level-form__slider" id="slider"></div>
```

- подключить файл стилей и скрипт

```html
<link rel="stylesheet" href="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.css" />

<script src="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.js"></script>
```

- создать переменную элемента слайдера

```js
const sliderElement = document.querySelector('.level-form__slider');
```

- инициализировать слайдер

```js
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});
```

- первый параметр - элемент слайдера, второй - объект с настройками
- настройки:
  - range - диапазон возможных значений
  - min - минимальное значение
  - max - максимальное значение
  - start - начальное значение на слайдере
  - step - шаг слайдера
  - connect - указывает, с какой стороны закрашивать слайдер

### ПРИВЯЗКА СЛАЙДЕР К ИНПУТУ СО ЗНАЧЕНИЕМ

- найти на странице элемент инпут

```js
const valueElement = document.querySelector('.level-form__value');
```

- для слайдера назначить обработчик события, в котором значение слайдера будет записываться в инпут

```js
sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});
```

- начальное значение в поле ввода нужно будет записать самостоятельно

```js
valueElement.value = 80;
```

- чтобы изменять настройки слайдера по какому-то действию, нужно, например на чекбокс, повестить обработчик

```js
specialElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(80);
  }
});
```

### Форматирование значений

- добавить в объект настроек слайдера

```js
      format: {
      	to: function (value) {
      		if (Number.isInteger(value)) {
      			return value.toFixed(0);
      		}
      		return value.toFixed(1);
      	},
      	from: function (value) {
      		return parseFloat(value);
      	},
      },
```

- метод `.format.to()` нужен для форматирования значения из слайдера и вывода его где-либо
- метод `.format.from()` нужен для форматирования значения для слайдера. Этот метод должен строго возвращать число, поэтому используем `parseFloat()`

## Блокировка слайдера

- элементу слайдера нужно добавить атрибут disabled со значением true. А чтобы разблокировать слайдер, этот атрибут надо убрать

```js
sliderElement.setAttribute('disabled', true);

sliderElement.removeAttribute('disabled');
```

# Практическая польза замыканий

- Замыкания удобны, когда нужно "запомнить" какие-то переменные между вызовами функций
- Задача: написать функцию-генератор для получения уникальных идентификаторов

- Функция для генерации значений, созданная в результате работы другой функции:

```js
function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId++;
    return lastGeneratedId;
  };
}
```

- запишем в генератор в переменную

```js
const generatePhotoId = createIdGenerator();
```

- любой дальнейший вызов функции-генератора `generatePhotoId` должен возвращать идентификатор на единицу больше предыдущего

- получается, что нужно место, где будет сохраняться значение предыдущего идентификатора после каждого вызова `generatePhotoId()` - в этом поможет замыкание

- объявим в замыкании переменную last GeneratedId (стр 7) - она будет доступна возвращаемой функции return function () {}, но недоступна снаружи

- теперь можно возвращать эту переменную уже из генератора (стр 11)
- перед возвращением переменой её нужно увеличит на единицу (стр 10)

```js
generatePhotoId(); вернёт 1
generatePhotoId(); вернёт 2
generatePhotoId(); вернет 3
```

- универсальность такого подхода в том, что можно создавать сколько угодно генераторов, и они не будут мешать друг другу - у каждого генератора будет своя переменная `lastGeneratedId`

- поэтому генераторы, созданные `generateCommentId()`, начинаются с 1 и не сбивают `generatePhotoId()`

```js
const generateCommentId = createIdGenerator();

generateCommentId(); вернёт 1
```

### Функция-генератор для получения случайных идентификаторов из диапазона, которые не повторяются:

- сначала нужна функция для получения случайного целого числа из диапазона

```js
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
```

- сам генератор будет собираться аналогичным образом

```js
function createRandomIdFromRangeGenerator(min, max) {
	массив, куда будут попадать уже созданные идентификаторы
	const previousValues = [];

	return function () {

		1. получить случайное целое положительное число
		let currentValue = getRandomInteger(min, max);

		2. проверить на уникальность, если такое число уже было, повторить шаг 1
		if (previousValues.length >= (max - min + 1)) {
			console.error('перебраны все числа из диапазона')
			return null;
		}
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(min, max);
		}

		3. запомнить полученное значение
		previousValues.push(currentValue);

		4. вернуть результат
		return currentValue;
	}
}
```

- создадим генератор

```js
const generatePhotoId2 = createRandomIdFromRangeGenerator(1, 5);

console.log(generatePhotoId2());
console.log(generatePhotoId2());
console.log(generatePhotoId2());
console.log(generatePhotoId2());
console.log(generatePhotoId2());
console.log(generatePhotoId2());
```

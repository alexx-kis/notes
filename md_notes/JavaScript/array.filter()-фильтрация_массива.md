# Array.prototype.filter() #

* метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции
 
## Синтаксис ##

	// стрелочная функция
	filter((element) => { ... } )
	filter((element, index) => { ... } )
	filter((element, index, array) => { ... } )

	// коллбэк-функция
	filter(callbackFn)
	filter(callbackFn, thisArg)

	// встроенная коллбэк-функция
	filter(function callbackFn(element) { ... })
	filter(function callbackFn(element, index) { ... })
	filter(function callbackFn(element, index, array){ ... })
	filter(function callbackFn(element, index, array) { ... }, thisArg)

## Параметры ##
### callbackFn ###
* функция-предикат, которая будет вызвана для проверки каждого элемента массива. Если функция возвращает true, то элемент остаётся в массиве, если false, то удаляется

* принимает три аргумента:

	- element - текущий обрабатываемый элемент в массиве

	-	indexНеобязательный - индекс текущего обрабатываемого элемента в массиве

	-	 arrayНеобязательный - обрабатываемый массив, на котором был вызван метод filter()

	-	 thisArgНеобязательный - значение, используемое в качестве this при вызове коллбэк-функции callbackFn

### Возвращаемое значение ###
* вернётся новый массив с элементами, которые прошли проверку. Если ни один элемент не прошёл проверку, то будет возвращён пустой массив

## Описание ##

* метод filter() вызывает переданную функцию callback один раз для каждого элемента, присутствующего в массиве, и создаёт новый массив со всеми значениями, для которых функция callback вернула значение, которое может быть приведено к true
* функция callback вызывается только для индексов массива с уже определёнными значениями; она не вызывается для индексов, которые были удалены или которым значения никогда не присваивались
* элементы массива, не прошедшие проверку функцией callback, просто пропускаются и не включаются в новый массив

* Функция callback вызывается с тремя аргументами:
	- значение элемента
	- индекс элемента
	- массив, по которому осуществляется проход

* если в метод filter() был передан параметр thisArg, при вызове callback он будет использоваться в качестве значения this. В противном случае в качестве значения this будет использоваться значение undefined. В конечном итоге, значение this, наблюдаемое из функции callback, определяется согласно обычным правилам определения this.

* метод filter() не изменяет массив, для которого он был вызван

* элементы массива, обрабатываемые методом filter(), устанавливается до первого вызова функции callback
* элементы, добавленные в массив после начала выполнения метода filter(), либо изменённые в процессе выполнения, не будут обработаны функцией callback
* соответствующим образом, если существующие элементы удаляются из массива, они также не будут обработаны

* предупреждение: одновременное изменение элементов, описанное в предыдущем параграфе, часто приводит к труднопонимаемому коду, поэтому не рекомендуется делать это (за исключением особых случаев)

## Примеры ##
### Фильтрация всех маленьких значений ###
* Следующий пример использует filter() для создания отфильтрованного массива, все элементы которого больше или равны 10, а все меньшие 10 удалены.

		function isBigEnough(value) {
			return value >= 10;
		}

		let filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
		// массив filtered теперь содержит [12, 130, 44]

### Найти все простые числа в массиве ###
* следующий пример возвращает все простые числа в массиве:

		const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

		function isPrime(num) {
			for (let i = 2; num > i; i++) {
				if (num % i == 0) {
					return false;
				}
			}
			return num > 1;
		}

		console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]


### Фильтрация неверных записей в JSON ###
* в следующем примере метод filter() используется для создания отфильтрованного JSON-объекта, все элементы которого содержат ненулевое числовое поле id

		let arr = [
			{ id: 15 },
			{ id: -1 },
			{ id: 0 },
			{ id: 3 },
			{ id: 12.2 },
			{},
			{ id: null },
			{ id: NaN },
			{ id: "undefined" },
		];

		let invalidEntries = 0;

		function filterByID(item) {
			if (Number.isFinite(item.id) && item.id !== 0) {
				return true;
			}
			invalidEntries++;
			return false;
		}

		let arrByID = arr.filter(filterByID);

		console.log("Отфильтрованный массив\n", arrByID);
		// Отфильтрованный массив
		// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

		console.log("Количество некорректных элементов = ", invalidEntries);
		// Количество некорректных элементов = 5


### Поиск в массиве ###
* в следующем примере filter() используется для фильтрации содержимого массива на основе входных данных

		var fruits = ["apple", "banana", "grapes", "mango", "orange"];

		/**
		* Элементы массива фильтруется на основе критериев поиска (query)
		*/
		function filterItems(query) {
			return fruits.filter(function (el) {
				return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
			});
		}

		console.log(filterItems("ap")); // ['apple', 'grapes']
		console.log(filterItems("an")); // ['banana', 'mango', 'orange']


## Реализация с использованием ES2015 ##

		const fruits = ["apple", "banana", "grapes", "mango", "orange"];

		/**
		* Элементы массива фильтруется на основе критериев поиска (query)
		*/
		const filterItems = (arr, query) => {
			return arr.filter(
				(el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1,
			);
		};

		console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
		console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']


## Модификация изначального массива (изменение, добавление и удаление) ##
* в следующих примерах проверяется поведение метода filter при изменении массива

		// изменение всех элементов
		let words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];

		const modifiedWords = words.filter((word, index, arr) => {
			arr[index + 1] += " extra";
			return word.length < 6;
		});

		console.log(modifiedWords);
		// обратите внимание, что есть три слова длиной менее 6, но так как они были изменены,
		// возвращается одно слово ['spray']

		// добавление новых элементов
		words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];
		const appendedWords = words.filter((word, index, arr) => {
			arr.push("new");
			return word.length < 6;
		});

		console.log(appendedWords);
		// только три слова удовлетворяют условию, хотя `words` теперь имеет куда больше слов,
		// длинной меньше 6 символов: ['spray', 'limit', 'elite']

		// удаление элементов
		words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];
		const deleteWords = words.filter((word, index, arr) => {
			arr.pop();
			return word.length < 6;
		});

		console.log(deleteWords);
		// заметьте, что 'elite' не получено, так как удалено из `words` до того,
		// как filter смог получить его: ['spray', 'limit']
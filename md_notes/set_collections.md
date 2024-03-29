# КОЛЛЕКЦИИ SET #

* set - коллекция для хранения уникальных значений любого типа: одно и то же значение нельзя добавить в Set больше одного раза

* Set - это неиндексированная коллекция, положить элемент в коллекцию можно, но достать нельзя
* по элементам можно итерироваться


## СОЗДАНИЕ КОЛЛЕКЦИИ ##

1. создать пустую коллекцию и потом добавлять элементы

		const set = new Set();

2. сразу заполнить коллекцию массивом значений

		const set = new Set([element1, element2, element3]);
		
		// {element1, element2, element3}


* добавить элемент 

		set.add('element');

* удалить элемент

		set.delete('element');
		
* проверить, есть ли элемент в коллекции

		set.has('element');	// true

* очистить коллекцию

		set.clear();

* узнать размер коллекции (аналогично array.length)

		set.size

* перебор коллекции

		set.forEach(elem => {
			//...
		})

		или

		for (let elem of set) {
			//...
		}

## ОСОБЕННОСТИ РАБОТЫ С ДАННЫМИ В КОЛЛЕКЦИИ SET ##

* Set использует строгое сравнение для проверки на дубликаты, при добавлении примитивов приведения типов нет, строка '1' и число 1 оба добавятся

* объектные типы данных хранятся по ссылке, поэтому добавить два разных объекта с одинаковым содержимым можно, а один и тот же объект - нельзя

## на практике ##

* с помощью коллекции Set можно создать из массива с повторяющимися элементами массив с уникальными элементами

		const noUniq = [1, 1, 2, 3, 4, 4, 5, 2, 1];
		const uniq = [...newSet(noUniq)];	// [1, 2, 3, 4, 5]
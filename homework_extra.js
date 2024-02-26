/*
В этой задаче вам нужно проанализировать данные — вычислить повторы каждого слова.

Создайте функцию getRepeats с одним параметром. В этот параметр будет приходить массив данных.

Функция должна возвращать объект, в котором указано сколько раз каждое слово встречается в массиве.
*/

const words = ['hello', 'wall', 'house', 'five', 'wall', 'wall', 'five', 'hello', 'house'];

const getRepeats = (arr) => {
	const obj = {};
	for (let i = 0; i < arr.length; i++) {
		// let elem = arr[i];
		let count = 0;
		for (let j = 0; j < arr.length; j++) {
			console.log(arr[j]);
			if (arr[i] = arr[j]) {
				count++;
				// obj[arr[i]] = count;
			}
		}
	}
	return obj;
}

// console.log(getRepeats(words));

getRepeats(words);
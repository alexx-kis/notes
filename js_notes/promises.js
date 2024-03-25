// Промисы

// Промис - объект, в который параметром передаётся функция, внутри которой нужно размещать асинхронный код

// const promise = new Promise(() => {
// 	//асинхронный код
// });

// после объявления промиса и записи его в переменную в каком-то другом месте кода можно применить к этой переменной метод then, передав в него функцию с кодом, который должен выполниться по завершении асинхронного кода в промисе

// promise.then(() => {
// 	//выполнится после завершения асинхронного кода промиса
// });

// пример
// пусть есть асинхронный код:

// setTimeout(() => {
// 	const result = [1, 2, 3, 4, 5];
// }, 3000);

// пусть для этого кода нужно решить основную задачу асинхронности - выполнить некоторый код после срабатывания таймера, при этом мы не хотим размещать этот код в самом таймере и хотим, чтобы в этот код попал результат из таймера
// такую задачу можно решить и через коллбэки
// а можно через промис
// для этого нужно обернуть асинхронный код в промис:

// const promise = new Promise(() => {
// 	setTimeout(() => {
// 		const result = [1, 2, 3, 4, 5];
// 	}, 3000);
// });

// однако этого недостаточно, нужно в явном виде указать, что асинхронный код завершился
// для этого есть специальная функция завершения, которая автоматически попадает в первый параметр функции, если он указан:

// const promise = new Promise((resolve) => { // этот параметр - resolve
// 	setTimeout(() => {
// 		const result = [1, 2, 3, 4, 5];
// 	}, 3000);
// });

// с помощью функции завершения resolve можно явно указать промису, что асинхронный код завершился
// для этого нужно вызвать эту функцию в нужном месте

// const promise = new Promise((resolve) => { // этот параметр - resolve
// 	setTimeout(() => {
// 		const result = [1, 2, 3, 4, 5];
// 		resolve() //завершаем промис
// 	}, 3000);
// });

// при этом мы хотим передать вовне результат асинхронного кода, его можно передать параметром функции завершения resolve

// const promise = new Promise((resolve) => { // этот параметр - resolve
// 	setTimeout(() => {
// 		const result = [1, 2, 3, 4, 5];
// 		resolve(result); //передаём результат
// 	}, 3000);
// });

// теперь в любом другом месте можно вызвать метод then для промиса:

// promise.then(() => {
// 	//сработает по завершении промиса
// });

// результат работы промиса попадает в первый параметр функции, если его указать:

// promise.then((result) => {
// 	console.log(result)
// });


// Исключительные ситуации в промисах

// в случае возникновения исключения нужно отклонить промис с помощью специальной функции отклонения reject, которая автоматически попадает во второй параметр функции промиса:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		//асинхронный код
// 	}, 3000);
// });

// внутри функции промиса нужно вызвать resolve, если всё прошло штатно, либо reject, если возникло исключение:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		let isError = false;

// 		if (!isError) {
// 			resolve('успех');
// 		} else {
// 			reject('error in promise');
// 		}
// 	}, 3000);
// });

// затем в методе then параметрами нужно передать не одну, а две функции: первая сработает, если промис сработал штатно (resolve), а вторая - если промис сработал с ошибкой (reject)

// promise.then(
// 	(result) => {
// 		console.log(result);
// 	}, (error) => {
// 		console.log(error);
// 	}
// );

//1 промис возвращает результат деления 1 на случайное число от 0 до 5, если 1 / 0, то выводится ошибка:

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const promise = new Promise((resolve, reject) => {
// 	const randomInt = getRandomInt(0, 5);
// 	if (randomInt == 0) {
// 		reject('результат деления на 0');
// 	} else {
// 		const result = 1 / randomInt;
// 		resolve(result);
// 	}
// });

// promise.then(
// 	(result) => {
// 		console.log(result);
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );


// Объект с ошибкой промиса

// более принято в функцию reject передавать не строку с ошибкой, а объект с ошибкой:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject(new Error('error in promise'));
// 	}, 3000);
// });

// можно так же выбрасывать объекты с ошибками с помощью throw - это будет эквивалентно передаче их в reject:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		throw new Error('error in promise');
// 	}, 3000);
// });


// Отдельный перехват исключений в промисах

// в then можно указать только функцию-обработчик исключительной ситуации, передав вместо первого параметра null

// promise.then(null, (error) => {
// 	console.log(error);
// });

// в таком случае удобнее воспользоваться сокращённым синтаксисом через метод catch:

// promise.catch((error) => {
// 	console.log(error);
// });


// Состояние промиса

// промис может находиться в одном их трёх состояний
// при создании промис находится в ожидании (pending), а затем может стать исполненным (fulfilled), вернув полученный результат, или отклонённым (rejected), вернув причину отказа

// состояния fulfilled и rejected неизменны: если промис перешёл в одно из этих состояний, то он уже не сможет перейти в другое


// Цепочки промисов

// пусть есть промис:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('string');
// 	}, 3000);
// });

// по завершении промиса выведем его результат в консоль:

// promise.then((result) => {
// 	console.log(result);
// });

// теперь выведем результат не сразу, а как-то изменим его и вернём через return:

// promise.then((result) => {
// 	return result + '!';
// });

// в этом случае можно к результату then применить ещё один then, создав тем самым цепочку методов
// при этом в результат следующего метода будет попадать то, что вернул через return предыдущий:

// promise.then((result) => {
// 	return result + '!';
// }).then((result) => {
// 	console.log(result); //string!
// });

// таким образом можно построить цепочку какой-угодно длины:

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		return result + '2';
// 	})
// 	.then((result) => {
// 		return result + '3';
// 	})
// 	.then((result) => {
// 		console.log(result); //выведет 'string123'
// 	});


// Промисы внутри цепочки промисов

// функции цепочки могут также возвращать другие промисы
// в этом случае результат этого промиса попадёт в следующий then:

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		return new Promise(function (resolve) {
// 			resolve(result + '2'); //этот результат попадет в следующий then
// 		});
// 	})
// 	.then((result) => {
// 		return result + '3';
// 	})
// 	.then((result) => {
// 		console.log(result); //выведет 'string123'
// 	});


// Исключения в цепочках промисов

// пусть по каким-то причинам промис завершится с ошибкой:

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject('error');
// 	}, 3000);
// });

// в этом случае выполнение кода сразу перейдёт к тому then, в котором есть функция-обработчик ошибки, либо к первому catch, смотря, что встретится раньше

// пример

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then(
// 		(result) => {
// 			return result + '2';
// 		},
// 		(error) => {
// 			// выполнение сразу перейдет сюда
// 		}
// 	)
// 	.then((result) => {
// 		console.log(result);
// 	});

// или

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		return result + '2';
// 	})
// 	.catch((error) => {
// 		// выполнение сразу перейдет сюда
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	});

// функция-обработчик имеет два варианта действий: если она справилась с исключительной ситуацией, то может вернуть результат через return и выполнение продолжится дальше по цепочке
// если же она не справилась с ошибкой, то может или ничего не возвращать, или выбросить исключение через throw
// в этом случае выполнение перейдет к следующему перехватчику ошибки (в then или catch - что встретится раньше)

// как правило, все ошибки цепочки перехватываются в одном месте: в конце цепочки размещается catch:

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		return result + '2';
// 	})
// 	.catch((error) => {
// 		// попадем сюда в случае ошибки
// 	});

// при этом исключение может возникнуть в самом промисе, либо выброшено через throw в любом звене цепочки:

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		if (всеХорошо) {
// 			return result + '2';
// 		} else {
// 			throw new Error('ошибка'); // переходим к ближайшему перехватчику
// 		}
// 	})
// 	.then((result) => {
// 		return result + '3';
// 	})
// 	.catch((error) => {
// 		// ближайший перехватчик
// 	});

// catch нужен именно для диагностики ошибки: она решаема или нет
// если ошибка решаема, то catch должен передать ее решение следующему за собой then
// а если не решаема (или данный catch просто не знает как ее решить), то мы должны или ничего не вернуть или бросить исключение:

// promise
// 	.then((result) => {
// 		return result + '1';
// 	})
// 	.then((result) => {
// 		return result + '2';
// 	})
// 	.catch((error) => {
// 		if (ошибкаРешаема) {
// 			return 'данные'; // отправляем на следующий then;
// 		} else {
// 			// ничего не возвращаем или бросаем исключение
// 		}
// 	})
// 	.then((result) => {
// 		// тут решаем ошибку
// 	});


// Работа с массивами промисов

// метод Promise.all() позволяет выполнить код по окончанию всех промисов, переданных ему в виде массива, а метод Promise.race() дожидается загрузки первого промиса из массива, отбрасывая остальные

// оба метода своим результатом возвращают новый промис
// для метода Promise.all() результатом этого промиса будет массив результатов всех переданных промисов (порядок результатов соответствует порядку промисов в массиве), а для Promise.race() - результат первого сработавшего промиса

// пусть есть массив промисов:

// const promises = [
// 	new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(1);
// 		}, 1000);
// 	}),
// 	new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(2);
// 		}, 2000);
// 	}),
// 	new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(3);
// 		}, 3000);
// 	})
// ];

// с помощью Promise.race() дождёмся окончания загрузки первого из промисов:

// Promise.race(promises).then((result) => {
// 	console.log(result);
// });

// если хотя бы один из промисов в массиве будет отклонён, то промис с результатом сразу же перейдёт в состояние rejected
//поэтому возникшее исключение можно поймать через catch

// Promise.all(promises)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});


// Создание сработавших промисов

// иногда может понадобиться создать уже выполненный промис
// для этого существует два метода:
// 1. Promise.resolve() создаёт успешно выполненный промис
// 2. Promise.reject() создаёт отклонённый промис

// параметром эти методы получают то, что станет результатом или ошибкой промиса соответственно

// когда может понадобиться

// пусть есть функция, которая параметром принимает число, что-то с ним делает асинхронно и возвращает промис с результатом

// const func = (number) => {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(number ** 2);
// 		}, 3000);
// 	});
// };

// func(5).then((result) => {
// 	console.log(result);
// });

// пусть теперь асинхронная операция совершается только если передано число больше нуля, иначе результатом функции будет 0

// const func = (number) => {
// 	if (number > 0) {
// 		return new Promise((resolve) => {
// 			setTimeout(() => {
// 				resolve(num ** 2);
// 			}, 3000);
// 		});
// 	} else {
// 		return 0;
// 	}
// };

// теперь получается, что функция возвращает или промис, или число
// из-за этого больше невозможно применить метод then к результату функции, так как в случае возврата функцией числа получится ошибка:

// func(0).then((result) => { //ошибка - применение метода then к нулю

// });

// исправить проблему поможет Promise.resolve:

// const func = (number) => {
// 	if (number > 0) {
// 		return new Promise((resolve) => {
// 			setTimeout(() => {
// 				resolve(num ** 2);
// 			}, 3000);
// 		});
// 	} else {
// 		return Promise.resolve(0); // возвращает промис, а не число
// 	}
// };

// пусть теперь для переданного числа возвращается 0, а для чисел меньше 0 - исключение: используем метод Promise.reject():

// const func = (number) => {
// 	if (number > 0) {
// 		return new Promise((resolve) => {
// 			setTimeout(() => {
// 				resolve(number ** 2);
// 			}, 3000);
// 		});
// 	} else if (number === 0) {
// 		return Promise.resolve(0);
// 	} else {
// 		return Promise.reject('incorrect number'); // отклонённый промис
// 	}
// };

// func(-1).then((result) => {
// 	console.log(result);
// });


// Промисификация асинхронного кода

// так как промисы появились не так давно, некоторый асинхронный функционал может не поддерживать промисы
// в этом случае полезно создать над таким кодом оболочку в виде промиса, так как пользоваться промисами гораздо удобнее
// такое преобразование называют

// например функционал, который не поддерживает промисы - загрузка картинок

// const image = document.createElement('img');
// image.src = 'img.png';

// image.addEventListener('load', () => {
// 	document.body.append(image);
// });

// image.addEventListener('error', () => {
// 	console.log('image load error');
// });

// выполним промисификацию этого кода, обернув его в функцию, возвращающую промис

// const loadImage = (path) => {
// 	return new Promise((resolve, reject) => {
// 		const image = document.createElement('img');
// 		image.src = path;

// 		image.addEventListener('load', () => {
// 			resolve(image);
// 		});
// 		image.addEventListener('error', () => {
// 			reject(new Error('image "' + path + '"  load error'));
// 		});
// 	});
// };

// функцией можно воспользоваться следующим образом:

// loadImage('img.png')
// 	.then((image) => {
// 		document.body.append(image);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});


// Проблема promise hell
// https://code.mu/ru/javascript/book/supreme/promises/promise-hell/

// Промисы в синхронном стиле
// https://code.mu/ru/javascript/book/supreme/promises/sync-style/

// Исключения в синхронном стиле
// https://code.mu/ru/javascript/book/supreme/promises/sync-style-exceptions/

const number1 = 10;
const number2 = 40;

const promise = new Promise((resolve, reject) => {
	if (number1 > number2) {
		resolve(number1 - number2);
	} else {
		throw { name: 'myError', message: 'my error message' };
	}
});

promise.then((result) => {
	console.log(result);
}).catch((error) => {
	console.log(error.name, error.message);
}).finally(() => {
	console.log('promise ended');
});
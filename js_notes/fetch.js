fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
	.then((response) => {
		return response.json();
	})
	.then((array) => {
		console.log(array.length);
	})

const getSquareRoot = (number) => {
	if (number >= 0) {
		return Math.sqrt(number);
	}
	throw { name: 'MathError', message: 'Getting square root from number that is below 0 is impossible' };
};

try {
	const result = getSquareRoot(-2);
	console.log(result);
} catch (error) {
	console.log(error.name);
	console.log(error.message);
}
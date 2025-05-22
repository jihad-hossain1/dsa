/**
 * ====== Linear Time
 */

for (let i = 0; i < 5; i++) {
	console.log('i:', i);
}

/**
 * =====
 */

const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
	console.log('i:', numbers[i]);
}

/**
 * =====
 */

function printNumbers(numbers) {
	for (let i = 0; i < numbers.length; i++) {
		console.log('i:', numbers[i]);
	}
}

function sumNumbers(numbers) {
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) {
		sum += numbers[i];
	}
	return sum;
}

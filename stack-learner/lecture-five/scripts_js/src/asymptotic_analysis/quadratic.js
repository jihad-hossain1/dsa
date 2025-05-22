/**
 * ==== Quadratic
 */

function printStars() {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			console.log('*');
		}
		console.log('');
	}
}

/**
 * ===
 */

function printStars(n) {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			console.log('*');
		}
	}
}

/**
 * ====
 */

function sortNumbers(numbers) {
	for (let i = 0; i < numbers.length - 1; i++) {
		for (let j = 0; j < numbers.length - 1; j++) {
			if (numbers[j] > numbers[j + 1]) {
				const temp = numbers[j];
				numbers[j] = numbers[j + 1];
				numbers[j + 1] = temp;
			}
		}
	}
}

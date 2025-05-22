/**
 * Constant Time
 */

const name = 'John';
const age = 20;

const num1 = 20;
const num2 = 10;

const sum = num1 + num2;
console.log('Sum:', sum);

const result = ((num1 + num2) * (num1 + num2)) / (num1 - num2);
console.log('Result:', result);

/**
 * =====
 */

const numbers = [1, 2, 3, 4, 5];
const a = numbers[0];
const b = numbers[1];

numbers[2] = 6;
const c = numbers[2];

numbers[3] = numbers[2] * numbers[4];
const d = numbers[3];

const bigSum = a + b + c + d;
console.log('Big Sum:', bigSum);

numbers.push(6);

/**
 * =====
 */

if (numbers.length > 0 && result > bigSum) {
	console.log('Result is greater than bigSum');
}

if (numbers.length > 0) {
	const first = numbers[0];
	console.log('First:', first);
} else {
	console.log('No numbers');
}

/**
 * =====
 */

for (let i = 0; i < 5; i++) {
	console.log('i:', i);
}

function printNumbers() {
	for (let i = 0; i < 5; i++) {
		console.log('i:', i);
	}
}

function sumBigNumbers(num1, num2) {
	const bigSum = (num1 + num2) * (num1 + num2);
	return bigSum;
}

function manyOperations() {
	// Fixed array
	const arr = [1, 2, 3, 4, 5];

	let smallSum = 0;
	for (let i = 0; i < arr.length; i++) {
		smallSum += arr[i];
	}

	let bigSum = 0;
	for (let i = 0; i < arr.length; i++) {
		bigSum += arr[i] * arr[i];
	}

	for (let i = 0; i < arr.length; i++) {
		console.log('i:', arr[i]);
	}

	return bigSum / smallSum;
}

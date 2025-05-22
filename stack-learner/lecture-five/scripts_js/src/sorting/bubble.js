function bubbleSort(arr = []) {
	console.time('Bubble Sort Bad');
	let operationCount = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap the elements
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
			operationCount++;
		}
	}
	console.log(`Operation Count Bad: ${operationCount}`);
	console.timeEnd('Bubble Sort Bad');
	return arr;
}

function generateRandomArray(length = 10000) {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(Math.floor(Math.random() * 100) + 1);
	}
	return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90, 21, 32, 67, 45, 89, 76, 34, 23];
const arr2 = [64, 34, 25, 12, 22, 11, 90, 21, 32, 67, 45, 89, 76, 34, 23];
const sortedArr = [11, 12, 21, 22, 23, 25, 32, 34, 34, 45, 64, 67, 76, 89, 90];
// console.log(bubbleSort(arr));

// Good Implementation
function bubbleSortGood(arr = []) {
	console.time('Bubble Sort Good');
	const n = arr.length;
	let swap;
	let operationCount = 0;

	for (let i = 0; i < n - 1; i++) {
		swap = false;
		for (let j = 0; j < n - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap the elements
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				swap = true;
			}
			operationCount++;
		}
		if (!swap) break;
	}
	console.log(`Operation Count Good: ${operationCount}`);
	console.timeEnd('Bubble Sort Good');
	return arr;
}

const randomArray = generateRandomArray(100000);
const randomArray1 = [...randomArray];
const randomArray2 = [...randomArray];

bubbleSort(randomArray1);
console.log('\n--------------------------------\n');
bubbleSortGood(randomArray2);

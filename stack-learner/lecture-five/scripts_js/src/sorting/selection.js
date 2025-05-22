function selectionSort(arr = []) {
	const n = arr.length;

	// Outer loop will be used for swapping
	for (let i = 0; i < n - 1; i++) {
		let maxIndex = i; // 0

		// find the minimum index
		for (let j = i + 1; j < n; j++) {
			if (arr[j] > arr[maxIndex]) {
				maxIndex = j;
			}
		}

		if (maxIndex !== i) {
			[arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
		}
	}

	return arr;
}

// [4, 2, 5, 3, 1]
// i = 3; minIndex = 3;
// Arr[i] = 5;
// Arr[minIndex] < arr[i] = [1, 2, 5, 3, 4]
// Arr[minIndex] < arr[i] = [1, 2, 3, 5, 4]

function generateRandomArray(length = 10000) {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(Math.floor(Math.random() * 100) + 1);
	}
	return arr;
}

const arr = generateRandomArray(10);
console.log('Before Sorting:', arr);

console.log('\n--------------------------------\n');

const sortedArr = selectionSort(arr);
console.log('After Sorting:', sortedArr);

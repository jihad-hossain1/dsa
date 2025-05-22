function insertionSort(arr = []) {
	const n = arr.length;

	// i = 3; j = 2

	for (let i = 1; i < n; i++) {
		const current = arr[i];
		let j = i - 1;

		while (j >= 0 && arr[j] > current) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = current;
		console.log(`i=${i} j=${j} arr=${arr}`);
	}

	return arr;
}

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

const sortedArr = insertionSort(arr);
console.log('After Sorting:', sortedArr);

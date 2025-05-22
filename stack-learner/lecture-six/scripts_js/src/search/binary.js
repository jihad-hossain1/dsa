function binarySearch(arr = [], key) {
	let low = 0; // first index of the array
	let high = arr.length - 1; // last index of the array
	let numberOfComparisons = 0;

	while (low <= high) {
		numberOfComparisons++;
		// find the middle index
		const mid = Math.floor((low + high) / 2);

		// check if this is the targeted element
		if (arr[mid] === key) {
			console.log(`Number of comparisons: ${numberOfComparisons}`);
			return mid;
		}

		if (arr[mid] > key) {
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}

	console.log(`Number of comparisons: ${numberOfComparisons}`);
	return -1;
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // sorted and uniform
const target = 110;

const arr2 = [10, 15, 17, 20, 22, 30, 35, 40, 45, 50, 300, 500, 1000, 10000]; // sorted and non-uniform

// const index = binarySearch(arr, target);
// console.log(index);

function interpolationSearch(arr = [], key) {
	let low = 0; // first index of the array
	let high = arr.length - 1; // last index of the array

	while (low <= high) {
		// find the middle index
		const mid = Math.floor(
			low + ((key - arr[low]) / (arr[high] - arr[low])) * (high - low)
		);

		console.log('Position:', mid);

		// check if this is the targeted element
		if (arr[mid] === key) {
			return mid;
		}

		if (arr[mid] > key) {
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}
	return -1;
}

/**
 * Formula= low + ((target - arr[low]) / (arr[high] - arr[low])) * (high - low)
 */

console.log(interpolationSearch(arr2, 15));

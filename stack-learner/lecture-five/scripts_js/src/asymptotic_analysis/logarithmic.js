/**
 * ==== Logarithmic
 */

function binarySearch(numbers, target) {
	let left = 0;
	let right = numbers.length - 1;
	let steps = 0;

	while (left <= right) {
		steps++;
		const mid = Math.floor((left + right) / 2);
		if (numbers[mid] === target) {
			console.log(`Total steps: ${steps}`);
			return mid;
		} else if (numbers[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	console.log(`Total steps: ${steps}`);
	return -1;
}

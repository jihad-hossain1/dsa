function linearSearch(arr, target) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i; // Return the index of the target
		}
	}
	return -1; // Return -1 if the target is not found
}

// Example usage:
const array = [5, 3, 8, 4, 2];
const target = 8;
const result = linearSearch(array, target);
console.log(result); // Output: 2

function linearSearchLinkedList(head, target) {
	let current = head;
	let index = 0;

	while (current !== null) {
		if (current.value === target) {
			return index; // Found the target, return its index
		}
		current = current.next; // Move to the next node
		index++;
	}
	return -1; // Target not found
}

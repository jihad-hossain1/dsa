const DEFAULT_CAPACITY = 10;

class CustomArray {
	constructor(capacity = DEFAULT_CAPACITY) {
		this.capacity = capacity;
		this.length = 0;
		this.array = new Array(capacity);
	}

	// Constant Time + space
	push(value) {
		this.array[this.length++] = value;
	}

	// Linear Time O(n)
	insert(index, value) {
		this.#checkIndex(index);

		// Last item
		if (index === this.length) {
			return this.push(value);
		}

		// Others
		for (let i = this.length; i > index; i--) {
			this.array[i] = this.array[i - 1];
		}

		this.array[index] = value;
		this.length++;
	}

	// Linear Time O(n) - Space Complexity (O(n))
	copy() {
		const newArray = new Array(this.capacity);
		for (let i = 0; i < this.length; i++) {
			newArray[i] = this.array[i];
		}
		return newArray;
	}

	remove(index) {
		this.#checkIndex(index);

		const element = this.array[index];

		if (index === this.array.length - 1) {
			this.array[index] = undefined;
			this.length--;
			return element;
		}

		for (let i = index; i < this.length; i++) {
			this.array[i] = this.array[i + 1];
		}

		this.length--;
		return element;
	}

	#checkIndex(index) {
		if (index < 0 || index > this.length) {
			throw new Error('Index is out of bounds');
		}
	}
}

[1, 2, 3, 4, 5, 0, 0, 0, 0, 0];

const arr = new CustomArray();
// arr.push(1);
// arr.push(2);
// arr.push(3);
// arr.push(4);
// arr.push(5);
arr.insert(0, 99);
arr.insert(0, 66);
arr.insert(0, 33);
arr.insert(0, 22);
arr.push(11);
arr.push(23);
arr.insert(arr.length, 11);
console.log(arr.array);
console.log('Length:', arr.length);

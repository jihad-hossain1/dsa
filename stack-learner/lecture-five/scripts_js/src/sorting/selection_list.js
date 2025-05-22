class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(value) {
		const newNode = new Node(value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		let current = this.head;
		while (current.next) {
			current = current.next;
		}

		current.next = newNode;
	}

	sort() {
		if (!this.head || !this.head.next) return;

		let current = this.head;
		while (current) {
			let minNode = current;
			let nextNode = current.next;

			while (nextNode) {
				if (nextNode.value < minNode.value) {
					minNode = nextNode;
				}
				nextNode = nextNode.next;
			}

			if (minNode !== current) {
				[current.value, minNode.value] = [minNode.value, current.value];
			}

			current = current.next;
		}
	}

	printList() {
		let current = this.head;
		const values = [];
		while (current) {
			values.push(current.value);
			current = current.next;
		}
		console.log(values.join(' -> '));
	}
}

const list = new LinkedList();
function generateRandomArray(length = 10000) {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(Math.floor(Math.random() * 100) + 1);
	}
	return arr;
}

const arr = generateRandomArray(20);
arr.forEach((value) => list.append(value));

console.log('Before Sorting:');
list.printList();

list.sort();

console.log('After Sorting:');
list.printList();

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

		let swapped;

		do {
			swapped = false;
			let current = this.head;

			while (current.next) {
				if (current.value > current.next.value) {
					[current.value, current.next.value] = [
						current.next.value,
						current.value,
					];
					swapped = true;
				}
				current = current.next;
			}
		} while (swapped);
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
list.append(4);
list.append(2);
list.append(5);
list.append(1);
list.append(3);

console.log('Before Sorting:');
list.printList();

list.sort();

console.log('After Sorting:');
list.printList();

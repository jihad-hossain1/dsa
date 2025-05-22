class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	append(data) {
		const newNode = new Node(data);
		this.size++;

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

	// Time: O(1), Space: O(1)
	prepend(data) {
		const newNode = new Node(data);
		this.size++;

		if (!this.head) {
			this.head = newNode;
			return;
		}

		newNode.next = this.head;
		this.head = newNode;
	}

	toString() {
		let current = this.head;
		let result = '';

		while (current) {
			const arrow = current.next ? ' -> ' : '';
			result += `${current.data}${arrow}`;
			current = current.next;
		}

		return result;
	}

	insert(data, index) {
		if (index < 0 || index > this.size) {
			throw new Error('Invalid index');
		}

		if (index === 0) {
			this.prepend(data);
			return;
		}

		if (index === this.size) {
			this.append(data); // can be replaceable using tail pointer
			return;
		}

		const newNode = new Node(data);
		this.size++;

		let current = this.head;
		let previous = null;
		let count = 0;

		while (count < index) {
			previous = current;
			current = current.next;
			count++;
		}

		newNode.next = current;
		previous.next = newNode;
	}
}

const list = new SinglyLinkedList();
list.prepend(10);
list.prepend(20);
list.prepend(30);
list.append(40);
list.insert(50, 2);

console.log(list.toString());

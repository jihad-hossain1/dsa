class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedListQueue {
	constructor() {
		this.front = null;
		this.rear = null;
	}

	enqueue(data) {
		const newNode = new Node(data);

		// If the head is empty and this is the first node
		if (!this.front) {
			this.front = this.rear = newNode;
			return;
		}

		this.rear.next = newNode;
		this.rear = newNode;
	}

	dequeue() {
		if (!this.front) {
			throw new Error('Queue is empty');
		}

		const value = this.front.value;
		this.front = this.front.next;

		if (!this.front) this.rear = null;

		return value;
	}

	peek() {
		return this.front ? this.front.value : null;
	}
}

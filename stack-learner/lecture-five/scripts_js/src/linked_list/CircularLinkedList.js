class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class CircularLinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	insert(data) {
		const newNode = new Node(data);
		this.size++;

		// If the list is empty
		if (!this.head) {
			this.head = newNode;
			newNode.next = this.head;
			return;
		}

		// If the list is not empty
		let current = this.head;

		// Traverse the list until you find the head
		while (current.next !== this.head) {
			current = current.next;
		}

		current.next = newNode;
		newNode.next = this.head;
	}

	remove(data) {
		// early return if there is no head
		if (!this.head) {
			return false;
		}

		let current = this.head;
		let prev = null;

		// Handle case where data is in head node
		if (current.data === data) {
			if (this.size === 1) {
				this.head = null;
			} else {
				// Find last node to update its next pointer
				let last = this.head;
				while (last.next !== this.head) {
					last = last.next;
				}
				this.head = this.head.next;
				last.next = this.head;
			}
			this.size--;
			return true;
		}

		// Search for data in other nodes
		do {
			prev = current;
			current = current.next;
			if (current.data === data) {
				prev.next = current.next;
				this.size--;
				return true;
			}
		} while (current !== this.head);

		return false;
	}
}

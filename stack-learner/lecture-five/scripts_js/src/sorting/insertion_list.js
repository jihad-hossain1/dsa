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

		const dummy = new Node(0);
		dummy.next = this.head;
		let current = this.head;

		while (current && current.next) {
			if (current.value <= current.next.value) {
				current = current.next;
				continue;
			}

			const toInsert = current.next;
			current.next = toInsert.next;

			let prev = dummy;
			while (prev.next.value <= toInsert.value) {
				prev = prev.next;
			}

			toInsert.next = prev.next;
			prev.next = toInsert;
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

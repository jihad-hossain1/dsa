class Node<T> {
	constructor(
		public data: T,
		public prev: Node<T> | null = null,
		public next: Node<T> | null = null
	) {}
}

class History<T> {
	private head: Node<T> | null = null;
	private current: Node<T> | null = null;
	private capacity: number;
	private size = 0;

	constructor(capacity = 100) {
		this.capacity = capacity;
	}

	push(state: T) {
		const newNode = new Node(state);

		// If the list is empty, set the new node as the head and current
		if (!this.head) {
			this.head = newNode;
			this.current = newNode;
			this.size = 1;
			return;
		}

		if (this.current) {
			this.current.next = null; // breakdown the redo chain
			// TODO: need to adjust the size
			this.recalculateSize();
			newNode.prev = this.current; // link the new node to the previous current node
			this.current.next = newNode; // link the previous current node to the new node
		}

		this.current = newNode;
		this.size++;

		if (this.size > this.capacity) {
			this.head = this.head.next;
			if (this.head) {
				this.head.prev = null;
			}
			this.size--;
		}
	}
	undo(): T | null {
		if (!this.current?.prev) return null;
		this.current = this.current.prev;
		return this.current.data;
	}

	redo(): T | null {
		if (!this.current?.next) return null;
		this.current = this.current.next;
		return this.current.data;
	}

	getCurrent(): T | null {
		return this.current?.data ?? null;
	}

	canUndo() {
		return !!this.current?.prev;
	}

	canRedo() {
		return !!this.current?.next;
	}

	private recalculateSize() {
		let count = 0;
		let temp = this.head;

		while (temp && temp !== this.current?.next) {
			count++;
			temp = temp.next;
		}

		this.size = count;
	}
}

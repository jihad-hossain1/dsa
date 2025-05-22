class ArrayQueue {
	constructor(capacity = 10) {
		this.capacity = capacity;
		this.queue = new Array(capacity);
		this.size = 0;
	}

	// O(1)
	enqueue(data) {
		if (this.size >= this.capacity) {
			throw new Error('Queue is full');
		}
		this.queue[this.size++] = data;
	}

	// O(n)
	dequeue() {
		if (this.size === 0) {
			throw new Error('Queue is empty');
		}

		const front = this.queue[0];
		for (let i = 1; i < this.size; i++) {
			this.queue[i - 1] = this.queue[1];
		}
		this.size--;
		return front;
	}

	peek() {
		return this.size > 0 ? this.queue[size] : null;
	}
}

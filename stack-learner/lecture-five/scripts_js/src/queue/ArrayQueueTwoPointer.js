class ArrayQueueTwoPointer {
	constructor(size = 10) {
		this.queue = new Array(size);
		this.front = 0;
		this.rear = 0;
		this.size = 0;
	}

	enqueue(data) {
		if (this.rear === this.size) {
			throw new Error('Queue is full');
		}
		this.queue[this.rear++] = data;
	}

	dequeue() {
		if (this.front === this.rear) {
			throw new Error('Queue is empty');
		}

		const value = this.queue[this.front];
		this.queue[this.front++] = undefined;
		return value;
	}
}

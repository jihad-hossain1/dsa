class ArrayCircularQueue {
	constructor(size = 10) {
		this.queue = new Array(size);
		this.size = size;
		this.front = 0;
		this.rear = 0;
		this.count = 0;
	}

	enqueue(data) {
		if (this.count === this.size) {
			throw new Error('Queue is full');
		}

		this.queue[this.rear] = data;
		this.rear = (this.rear + 1) % this.size;
		this.count++;
	}

	dequeue() {
		if (this.count === 0) {
			throw new Error('Queue is empty');
		}

		const value = this.queue[this.front];
		this.front = (this.front + 1) % this.size;
		this.count--;

		return value;
	}

	peek() {
		return this.count > 0 ? this.queue[this.front] : null;
	}
}

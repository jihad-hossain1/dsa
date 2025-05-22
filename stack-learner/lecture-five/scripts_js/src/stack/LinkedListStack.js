class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedListStack {
	constructor(maxSize = 10) {
		this.top = null;
		this.maxSize = maxSize;
		this.size = 0;
	}

	push(data) {
		if (this.size >= this.maxSize) {
			throw new Error('Stack overflow');
		}

		const newNode = new Node(data);
		newNode.next = this.top;
		this.top = newNode;
		this.size++;
	}

	pop() {
		if (this.size === 0) {
			throw new Error('Stack underflow');
		}

		const data = this.top.data;
		this.top = this.top.next;
		this.size--;
		return data;
	}

	peek() {
		return this.top ? this.top.data : null;
	}
}

const stack = new LinkedListStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(8);
stack.push(9);
stack.push(10);

console.log(JSON.stringify(stack.top, null, 2));

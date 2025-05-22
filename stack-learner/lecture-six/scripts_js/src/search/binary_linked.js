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

	getMiddle(start, end) {
		if (!start) return null;

		let slow = start;
		let fast = start;

		while (fast !== end && fast.next !== end) {
			slow = slow.next;
			fast = fast.next.next;
		}

		return slow;
	}

	binarySearch(key) {
		let start = this.head;
		let end = null;

		while (start !== end) {
			const mid = this.getMiddle(start, end);
			if (!mid) return -1;

			if (mid.value === key) return mid;

			if (mid.value > target) {
				end = mid;
			} else {
				start = mid.next;
			}
		}

		return -1;
	}
}

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
linkedList.append(40);
linkedList.append(50);
linkedList.append(60);
linkedList.append(70);

const target = 50;
const result = linkedList.binarySearch(target);
console.log(result ? result.value : 'Not Found'); // Output: 50

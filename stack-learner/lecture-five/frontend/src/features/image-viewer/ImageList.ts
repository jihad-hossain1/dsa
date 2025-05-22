export class ImageNode {
	public data: string;
	public next: ImageNode | null;
	public prev: ImageNode | null;

	constructor(data: string) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

export class ImageList {
	private head: ImageNode | null = null;
	private current: ImageNode | null = null;

	append(data: string) {
		const newNode = new ImageNode(data);

		if (!this.head) {
			this.head = newNode;
			this.current = this.head;
			return;
		}

		let current = this.head;
		while (current.next) {
			current = current.next;
		}

		current.next = newNode;
		newNode.prev = current;
	}

	next() {
		if (this.hasNext()) {
			this.current = this.current!.next;
			return this.current!.data;
		}
		return null;
	}

	hasNext() {
		return !!this.current && this.current.next !== null;
	}

	prev() {
		if (this.hasPrev()) {
			this.current = this.current!.prev;
			return this.current!.data;
		}
		return null;
	}

	hasPrev() {
		return !!this.current && this.current.prev !== null;
	}

	getCurrentImage() {
		return this.current?.data || null;
	}
}

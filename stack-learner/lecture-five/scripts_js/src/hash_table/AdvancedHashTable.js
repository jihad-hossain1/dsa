class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	insert(key, value) {
		const newNode = new Node(key, value);

		if (!this.head) {
			this.head = newNode;
			return;
		}

		newNode.next = this.head;
		this.head = newNode;
	}

	find(key) {
		if (!this.head) return null;

		let current = this.head;
		while (current) {
			if (current.key === key) return current.value;
			current = current.next;
		}

		return null;
	}

	remove(key) {
		if (!this.head) return null;

		if (this.head.key === key) {
			this.head = this.head.next;
			return;
		}

		let current = this.head;
		let previous = null;

		while (current && current.key !== key) {
			previous = current;
			previous = current;
			current = current.next;
		}

		if (current) {
			previous.next = current.next;
		}

		return null;
	}

	*entries() {
		let current = this.head;
		while (current) {
			yield [current.key, current.value];
			current = current.next;
		}
	}
}

export class HashTable {
	#keys;
	constructor(size = 53) {
		this.table = new Array(size);
		this.size = size;
		this.count = 0;
		this.#keys = new Set();
	}

	set(key, value) {
		if (this.count / this.size >= 0.5) {
			this.#resize(this.size * 2);
		}

		const index = this.#hash(key);
		if (!this.table[index]) {
			this.table[index] = new LinkedList();
		}

		const bucket = this.table[index];
		const existing = bucket.find(key);

		if (!existing) {
			this.count++;
			this.#keys.add(key);
		}

		bucket.insert(key, value);
	}

	get(key) {
		const index = this.#hash(key);
		const bucket = this.table[index];

		if (!bucket) return null;
		return bucket.find(key);
	}

	keys() {
		return Array.from(this.#keys);
	}

	/**
	 *
	 * Table Size = m, Elements = n : m x n ~= n
	 */
	values() {
		const values = [];
		for (let bucket of this.table) {
			if (bucket) {
				for (let [_, value] of bucket.entries()) {
					values.push(value);
				}
			}
		}

		return values;
	}

	entries() {
		const all = [];
		for (let bucket of this.table) {
			if (bucket) {
				for (let entry of bucket.entries()) {
					all.push(entry);
				}
			}
		}

		return all;
	}

	#hash(key = '') {
		let hash = 5381;
		for (let ch of key) {
			hash = (hash * 33) ^ ch.charCodeAt(0);
		}

		return Math.abs(hash) % this.size;
	}

	#resize(newSize) {
		const oldTable = this.table;
		this.size = newSize;
		this.table = new Array(newSize);
		this.count = 0;

		for (let bucket of oldTable) {
			if (bucket) {
				for (let [key, value] of bucket.entries()) {
					this.set(key, value);
				}
			}
		}
	}
}

const hashTable = new HashTable(2);

hashTable.set('name', 'John');
hashTable.set('age', 30);
hashTable.set('city', 'Dhaka');
hashTable.set('country', 'Bangladesh');
hashTable.set('job', 'Developer');
hashTable.set('hobby', 'Reading');
hashTable.set('favoriteColor', 'Blue');

// console.log(hashTable.keys());
// console.log(hashTable.values());
// console.log(hashTable.entries());

/**
 * ====
 */

class HashSet {
	constructor() {
		this.data = new HashTable();
	}

	add(value) {
		if (this.has(value)) return;
		this.data.set(value.toString(), true);
	}

	get(value) {
		return this.data.get(value.toString());
	}

	has(value) {
		return !!this.data.get(value.toString());
	}

	values() {
		return this.data.keys();
	}
}

const hashSet = new HashSet();

hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(1);

const hashSet2 = new HashSet();

hashSet2.add(1);
hashSet2.add(2);
hashSet2.add(4);
hashSet2.add(5);
hashSet2.add(6);

const hashSet3 = new HashSet();
hashSet3.add(1);
hashSet3.add(2);

console.log(hashSet.values());
console.log(hashSet2.values());

function union(setA, setB) {
	const result = new HashSet();

	for (let value of setA.values()) {
		result.add(value);
	}

	for (let value of setB.values()) {
		result.add(value);
	}

	return result;
}

function intersection(setA, setB) {
	const result = new HashSet();

	for (let value of setA.values()) {
		if (setB.has(value)) result.add(value);
	}

	return result;
}

function difference(setA, setB) {
	const result = new HashSet();

	for (let value of setA.values()) {
		if (!setB.has(value)) result.add(value);
	}

	return result;
}

function subset(setA, setB) {
	for (let value of setA.values()) {
		if (!setB.has(value)) return false;
	}

	return true;
}

// console.log(union(hashSet, hashSet2).values());
// console.log(intersection(hashSet, hashSet2).values());
console.log(difference(hashSet, hashSet2).values());
console.log(subset(hashSet3, hashSet));

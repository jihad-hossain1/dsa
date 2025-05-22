class SimpleHashTable {
	constructor() {
		this.size = 15;
		this.table = new Array(this.size);
	}

	#hash(key = '') {
		let hash = 999;
		for (let char of key) {
			hash += char.charCodeAt(0);
		}
		console.log(key, hash, hash % this.size);
		return hash % this.size;
	}

	set(key, value) {
		const index = this.#hash(key);
		this.table[index] = value;
	}

	get(key) {
		const index = this.#hash(key);
		return this.table[index];
	}

	remove(key) {
		const index = this.#hash(key);
		this.table[index] = undefined;
	}
}

const hashTable = new SimpleHashTable();

hashTable.set('city', 'New York');
hashTable.set('address', '123 Main St');
hashTable.set('email', 'john@gmail.com');
hashTable.set('name', 'John');
hashTable.set('age', 20);

console.log(hashTable.table);

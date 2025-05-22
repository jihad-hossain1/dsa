import { HashTable } from './AdvancedHashTable';

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

console.log(hashSet.values());

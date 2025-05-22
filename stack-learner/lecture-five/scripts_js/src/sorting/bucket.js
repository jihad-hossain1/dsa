function bucketSort(arr = []) {
	const n = arr.length;
	if (n <= 0) return arr;

	const buckets = Array.from({ length: n }, () => []);
	for (let i = 0; i < n; i++) {
		const index = Math.floor(arr[i] * n);
		buckets[index].push(arr[i]);
	}

	console.log('buckets', buckets);
	return buckets.flatMap((bucket) => bucket.sort((a, b) => a - b));
}

const arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];

const sortedArr = bucketSort(arr);
// console.log(sortedArr);

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class SortedLinkedList {
	constructor() {
		this.head = null;
	}

	insert(value) {
		const newNode = new Node(value);
		if (!this.head || value < this.head.val) {
			newNode.next = this.head;
			this.head = newNode;
			return;
		}
		let current = this.head;
		while (current.next && current.next.val < value) {
			current = current.next;
		}
		newNode.next = current.next;
		current.next = newNode;
	}

	toArray() {
		const result = [];
		let curr = this.head;
		while (curr) {
			result.push(curr.val);
			curr = curr.next;
		}
		return result;
	}
}

function bucketSortWithLinkedList(arr = []) {
	const n = arr.length;
	if (n <= 0) return arr;

	const buckets = Array.from({ length: n }, () => new SortedLinkedList());

	for (let i = 0; i < n; i++) {
		const index = Math.floor(arr[i] * n);
		buckets[index].insert(arr[i]);
	}

	// console.log('buckets', JSON.stringify(buckets, null, 2));

	return buckets.flatMap((bucket) => bucket.toArray());
}

const sortedArrWithLinkedList = bucketSortWithLinkedList(arr);
// console.log(sortedArrWithLinkedList);

// O (n^2)

// In the case of array
// Insertion cost: O(1)
// Sorting cost: O(n log n)

// 100 Elements
// 20 buckets
// 5 elements per bucket

// On average O(n)

/**
 * const students = [
  { name: "Alice", roll: 1, score: 87 },
  { name: "Bob", roll: 2, score: 92 },
  { name: "Charlie", roll: 3, score: 78 },
  ...
 */

const students = [
	{ name: 'Alice', roll: 1, score: 76 },
	{ name: 'Bob', roll: 2, score: 85 },
	{ name: 'Charlie', roll: 3, score: 45 },
	{ name: 'David', roll: 4, score: 89 },
	{ name: 'Emma', roll: 5, score: 67 },
	{ name: 'Frank', roll: 6, score: 72 },
	{ name: 'Grace', roll: 7, score: 83 },
	{ name: 'Henry', roll: 8, score: 38 },
	{ name: 'Ivy', roll: 9, score: 77 },
	{ name: 'Jack', roll: 10, score: 90 },
	{ name: 'Kate', roll: 11, score: 55 },
	{ name: 'Liam', roll: 12, score: 69 },
	{ name: 'Mia', roll: 13, score: 81 },
	{ name: 'Noah', roll: 14, score: 33 },
	{ name: 'Olivia', roll: 15, score: 88 },
	{ name: 'Peter', roll: 16, score: 73 },
	{ name: 'Quinn', roll: 17, score: 61 },
	{ name: 'Ryan', roll: 18, score: 79 },
	{ name: 'Sarah', roll: 19, score: 66 },
	{ name: 'Tom', roll: 20, score: 44 },
	{ name: 'Uma', roll: 21, score: 87 },
	{ name: 'Victor', roll: 22, score: 71 },
	{ name: 'Wendy', roll: 23, score: 82 },
	{ name: 'Xavier', roll: 24, score: 58 },
	{ name: 'Yara', roll: 25, score: 75 },
	{ name: 'Zack', roll: 26, score: 63 },
	{ name: 'Amy', roll: 27, score: 86 },
	{ name: 'Ben', roll: 28, score: 42 },
	{ name: 'Chloe', roll: 29, score: 78 },
	{ name: 'Dan', roll: 30, score: 70 },
	{ name: 'Eva', roll: 31, score: 84 },
	{ name: 'Felix', roll: 32, score: 51 },
	{ name: 'Gina', roll: 33, score: 74 },
	{ name: 'Hugo', roll: 34, score: 39 },
	{ name: 'Iris', roll: 35, score: 80 },
	{ name: 'Jake', roll: 36, score: 57 },
	{ name: 'Kim', roll: 37, score: 68 },
	{ name: 'Leo', roll: 38, score: 47 },
	{ name: 'Maya', roll: 39, score: 85 },
	{ name: 'Nick', roll: 40, score: 62 },
	{ name: 'Olive', roll: 41, score: 49 },
	{ name: 'Paul', roll: 42, score: 77 },
	{ name: 'Rose', roll: 43, score: 36 },
	{ name: 'Sam', roll: 44, score: 88 },
	{ name: 'Tina', roll: 45, score: 54 },
	{ name: 'Uri', roll: 46, score: 65 },
	{ name: 'Vera', roll: 47, score: 43 },
	{ name: 'Will', roll: 48, score: 59 },
	{ name: 'Xena', roll: 49, score: 41 },
	{ name: 'Yuki', roll: 50, score: 52 },
];

function bucketSortForStudents(students = []) {
	const k = students.length / 2;
	const buckets = Array.from({ length: k }, () => []);

	for (const student of students) {
		const index = Math.floor(student.score / (100 / k));
		buckets[index].push(student);
	}

	console.log('buckets', JSON.stringify(buckets, null, 2));

	return buckets.flatMap((bucket) => bucket.sort((a, b) => a.score - b.score));
}

const sortedStudents = bucketSortForStudents(students);
console.log(sortedStudents);

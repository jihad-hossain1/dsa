/**
 * === Domination Rule
 */

function complexFunction(arr) {
	const x = binarySearch(arr, target); // log n

	arr.sort(); // n log n

	for (const x of arr) {
		doSomething(x); // n
	}

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			process(i, j); // n^2
		}
	}

	for (const a of arr) {
		for (const b of arr) {
			check(a, b); // n^2
		}
	}

	for (const i of arr) {
		for (const j of arr) {
			for (const k of arr) {
				process(i, j, k); // n^3
			}
		}
	}
}

// log n + n log n + n + n^2 + n^2 + n^3
// n^3

// n = 10
// 3 + 30 + 10 + 100 + 1000 = 1143

// n = 100
// 3 + 300 + 100 + 10000 + 1000000 = 1111303

// n = 1000
// 3 + 3000 + 1000 + 1000000 + 1000000000 = 1001001003

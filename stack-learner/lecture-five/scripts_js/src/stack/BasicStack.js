const MAX_SIZE = 10;
const stack = new Array(MAX_SIZE);
let top = -1;

function push(value) {
	if (top >= MAX_SIZE - 1) {
		throw new Error('Stack Overflow');
	}
	stack[++top] = value;
}

function pop() {
	if (top < 0) {
		throw new Error('Stack Underflow');
	}
	return stack[top--];
}

function peek() {
	if (top < 0) {
		throw new Error('Stack Underflow');
	}

	return stack[top];
}

push(1);
push(2);
push(3);
push(99);

console.log('Peek', peek()); // 99
console.log('Pop', pop()); // 99
console.log('Pop', pop()); // 3
console.log('Pop', pop()); // 2

console.log('Stack', stack); //
console.log('Top', top);

// [99, 2, 3, 1]
// Current Stack = [1, 2, 3, 99, empty]
// [1]
// [2, 1]
// [3, 2, 1]
// [99, 3, 2, 1]
// [55, 99, 3, 2, 1]

push(55);
console.log('Stack', stack); //
console.log('Top', top);

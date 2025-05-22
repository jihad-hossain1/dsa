const users = [
	{ id: 1, name: 'John', email: 'john@example.com' },
	{ id: 2, name: 'Jane', email: 'jane@example.com' },
	{ id: 3, name: 'Jim', email: 'jim@example.com' },
	{ id: 4, name: 'Jill', email: 'jill@example.com' },
];

const userIdIndex = {};
const emailIndex = {};
const nameIndex = {};

const buildIndexes = () => {
	for (const user of users) {
		userIdIndex[user.id] = user;
		emailIndex[user.email] = user;
		nameIndex[user.name] = user;
	}
};

buildIndexes();

// console.log(emailIndex['jane@example.com ']);

const data = {
	1: { id: 1, content: 'Hello world' },
	2: { id: 2, content: 'Hello Bangladesh' },
	3: { id: 3, content: 'Hello Dhaka' },
	4: { id: 4, content: 'Welcome to Bangladesh' },
	5: { id: 5, content: 'Welcome to Dhaka' },
	6: { id: 6, content: 'Bangladesh is a beautiful country in the world' },
	7: { id: 7, content: 'Dhaka is the capital of Bangladesh' },
};

const invertedIndex = {
	hello: [1, 2, 3],
	world: [1, 6],
	bangladesh: [2, 4, 6, 7],
	dhaka: [3, 5, 7],
	welcome: [4, 5],
	beautiful: [6],
	country: [6],
	capital: [7],
};

const ids = invertedIndex['bangla'];
const result = ids?.map((id) => data[id]);
console.log(result);

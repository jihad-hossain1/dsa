import { useState } from 'react';

// Node class for LinkedList implementation
class Node {
	data: string;
	next: Node | null;

	constructor(data: string) {
		this.data = data;
		this.next = null;
	}
}

// Stack implementation using LinkedList
class Stack {
	top: Node | null;

	constructor() {
		this.top = null;
	}

	push(data: string) {
		const newNode = new Node(data);
		newNode.next = this.top;
		this.top = newNode;
	}

	pop(): string {
		if (!this.top) return '';
		const data = this.top.data;
		this.top = this.top.next;
		return data;
	}
}

// InfixToPostfix converter class
class InfixToPostfix {
	precedence: { [key: string]: number };
	associativity: { [key: string]: string };

	constructor() {
		this.precedence = {
			'+': 1,
			'-': 1,
			'*': 2,
			'/': 2,
			'%': 2,
			'^': 3,
		};
		this.associativity = {
			'+': 'left',
			'-': 'left',
			'*': 'left',
			'/': 'left',
			'%': 'left',
			'^': 'right',
		};
	}

	isOperator(char: string): boolean {
		return Object.keys(this.precedence).includes(char);
	}

	toPostfix(expression: string): string {
		const output = new Stack();
		const stack = new Stack();
		const tokens = expression.replace(/\s+/g, '').split('');

		for (const token of tokens) {
			// If token is a number, add it directly to output
			if (!isNaN(Number(token))) {
				output.push(token);
			}
			// If token is an operator, handle operator precedence rules
			else if (this.isOperator(token)) {
				// Pop operators from stack and add to output while:
				// 1. Stack is not empty
				// 2. Top of stack is an operator
				// 3. Current operator is left associative and has lower/equal precedence OR
				//    Current operator is right associative and has lower precedence
				while (
					stack.top !== null &&
					this.isOperator(stack.top.data) &&
					((this.associativity[token] === 'left' &&
						this.precedence[token] <= this.precedence[stack.top.data]) ||
						(this.associativity[token] === 'right' &&
							this.precedence[token] < this.precedence[stack.top.data]))
				) {
					output.push(stack.pop());
				}
				// Push current operator to stack
				stack.push(token);
			}
			// If token is left parenthesis, push to stack
			else if (token === '(') {
				stack.push(token);
			}
			// If token is right parenthesis, pop and output everything until matching left parenthesis
			else if (token === ')') {
				while (stack.top !== null && stack.top.data !== '(') {
					output.push(stack.pop());
				}
				// Discard the left parenthesis
				if (stack.top !== null && stack.top.data === '(') {
					stack.pop();
				}
			}
		}

		while (stack.top !== null) {
			if (stack.top.data === '(' || stack.top.data === ')') {
				return 'Invalid Expression';
			}
			output.push(stack.pop());
		}

		let result = '';
		while (output.top !== null) {
			result = output.pop() + result;
		}

		return result;
	}

	evaluatePostfix(postfix: string): number {
		const stack = new Stack();
		const tokens = postfix.split('');

		for (const token of tokens) {
			if (!isNaN(Number(token))) {
				stack.push(token);
			} else if (this.isOperator(token)) {
				const b = Number(stack.pop());
				const a = Number(stack.pop());

				switch (token) {
					case '+':
						stack.push((a + b).toString());
						break;
					case '-':
						stack.push((a - b).toString());
						break;
					case '*':
						stack.push((a * b).toString());
						break;
					case '/':
						stack.push((a / b).toString());
						break;
					case '%':
						stack.push((a % b).toString());
						break;
					case '^':
						stack.push(Math.pow(a, b).toString());
						break;
				}
			}
		}

		return Number(stack.pop());
	}
}

const InfixCalculator: React.FC = () => {
	const [expression, setExpression] = useState<string>('');
	const [result, setResult] = useState<string>('');

	const handleCalculate = () => {
		const converter = new InfixToPostfix();
		const postfix = converter.toPostfix(expression);

		if (postfix === 'Invalid Expression') {
			setResult('Invalid Expression');
			return;
		}

		const calculatedResult = converter.evaluatePostfix(postfix);
		setResult(`Result: ${calculatedResult}`);
	};

	return (
		<div className='p-5 max-w-4xl mx-auto'>
			<h2 className='text-2xl font-bold mb-4'>Infix Expression Calculator</h2>
			<div className='flex gap-2 mb-5'>
				<input
					type='text'
					value={expression}
					onChange={(e) => setExpression(e.target.value)}
					placeholder='Enter infix expression (e.g., 3 + 4 * (2 - 1))'
					className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					onClick={handleCalculate}
					className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					Calculate
				</button>
				<button
					onClick={() => setExpression('')}
					className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
				>
					Clear
				</button>
			</div>
			{result && <div className='p-3 bg-gray-100 rounded-md'>{result}</div>}
		</div>
	);
};

export default InfixCalculator;

import { useState } from 'react';

// Node class for Stack implementation
class Node {
	constructor(public data: string, public next: Node | null = null) {}
}

// Stack implementation using LinkedList
class Stack {
	private top: Node | null = null;

	push(data: string) {
		const newNode = new Node(data);
		newNode.next = this.top;
		this.top = newNode;
	}

	pop(): string | null {
		if (!this.top) return null;
		const data = this.top.data;
		this.top = this.top.next;
		return data;
	}

	isEmpty(): boolean {
		return this.top === null;
	}
}

// Type definition for the return value of checkTags function
type TagCheckResult = {
	isValid: boolean;
	message: string;
};

/**
 * Validates HTML tag matching in a given string
 * @param html - String containing HTML tags to validate
 * @returns Object containing validation result and message
 */
const checkTags = (html: string): TagCheckResult => {
	// Initialize stack for tracking opening tags
	const stack = new Stack();
	// Track all opening tags for better error messages
	const openingTags: string[] = [];
	// Buffer for building current tag name
	let currentTag = '';
	// Flag to indicate if we're currently reading a tag
	let isOpenTag = false;

	// Iterate through each character in the input
	for (let i = 0; i < html.length; i++) {
		const char = html[i];

		/**
		 * <h1>Test</h1>
		 */

		// Start of a new tag
		if (char === '<') {
			isOpenTag = true;
			currentTag = '';
			continue;
		}

		// End of current tag
		if (char === '>') {
			isOpenTag = false;
			if (currentTag.startsWith('/')) {
				// Handle closing tag
				const openTag = stack.pop();
				const expectedTag = currentTag.substring(1);

				// Check if tags match
				if (!openTag || openTag !== expectedTag) {
					return {
						isValid: false,
						message: `Mismatched tag: Expected closing tag for ${
							openTag || 'unknown'
						}`,
					};
				}
			} else {
				// Handle opening tag
				stack.push(currentTag);
				openingTags.push(currentTag);
			}
			continue;
		}

		// Build tag name character by character
		if (isOpenTag) {
			currentTag += char;
		}
	}

	// Check if all tags were properly closed
	if (!stack.isEmpty()) {
		return {
			isValid: false,
			message: 'Some tags are not closed properly',
		};
	}

	// All tags matched successfully
	return {
		isValid: true,
		message: 'All tags are properly matched!',
	};
};

const TagMatcher = () => {
	const [input, setInput] = useState('');
	const [message, setMessage] = useState('');
	const [isValid, setIsValid] = useState(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setInput(value);

		if (value.trim() === '') {
			setMessage('');
			return;
		}

		const result = checkTags(value);
		setIsValid(result.isValid);
		setMessage(result.message);
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>HTML Tag Matcher</h1>

			<div className='mb-6'>
				<textarea
					value={input}
					onChange={handleInputChange}
					placeholder='Enter HTML tags (e.g., <div><p>Hello</p></div>)'
					className='w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{message && (
				<div
					className={`p-4 rounded-lg ${
						isValid
							? 'bg-green-100 text-green-700 border border-green-400'
							: 'bg-red-100 text-red-700 border border-red-400'
					}`}
				>
					{message}
				</div>
			)}
		</div>
	);
};

export default TagMatcher;

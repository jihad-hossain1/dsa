import { useState, useCallback, useRef, useEffect } from 'react';

// Node class for LinkedList implementation
class Node<T> {
	constructor(
		public data: T,
		public prev: Node<T> | null = null,
		public next: Node<T> | null = null
	) {}
}

// Doubly LinkedList implementation for history tracking
class History<T> {
	private head: Node<T> | null = null;
	private current: Node<T> | null = null;
	private capacity: number;
	private size: number = 0;

	constructor(capacity: number = 100) {
		this.capacity = capacity;
	}

	push(state: T) {
		const newNode = new Node(state);

		if (!this.head) {
			this.head = newNode;
			this.current = newNode;
			this.size = 1;
			return;
		}

		if (this.current) {
			this.current.next = null; // discard any redo history
			this.recalculateSize(); // recalculate size
			newNode.prev = this.current;
			this.current.next = newNode;
		}

		this.current = newNode;
		this.size++;

		if (this.size > this.capacity) {
			this.head = this.head.next;
			if (this.head) this.head.prev = null;
			this.size--;
		}
	}

	undo(): T | null {
		if (!this.current?.prev) return null;
		this.current = this.current.prev;
		return this.current.data;
	}

	redo(): T | null {
		if (!this.current?.next) return null;
		this.current = this.current.next;
		return this.current.data;
	}

	getCurrent(): T | null {
		return this.current?.data ?? null;
	}

	canUndo(): boolean {
		return !!this.current?.prev;
	}

	canRedo(): boolean {
		return !!this.current?.next;
	}

	private recalculateSize() {
		let count = 0;
		let temp = this.head;
		while (temp && temp !== this.current?.next) {
			count++;
			temp = temp.next;
		}
		this.size = count;
	}
}

type HistoryState<T> = {
	state: T;
	setState: (value: T | ((prev: T) => T)) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
};

export function useHistoryState<T>(
	initialState: T,
	capacity?: number
): HistoryState<T> {
	const [state, setStateInternal] = useState<T>(initialState);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	const historyRef = useRef<History<T>>(new History(capacity));

	useEffect(() => {
		historyRef.current.push(initialState);
	}, []);

	const updateStateFromHistory = (newState: T | null) => {
		if (!newState) return;

		setStateInternal(newState);
		setCanUndo(historyRef.current.canUndo());
		setCanRedo(historyRef.current.canRedo());
	};

	const setState = useCallback((update: T | ((prev: T) => T)) => {
		const newState =
			typeof update === 'function'
				? (update as (prev: T) => T)(historyRef.current.getCurrent() as T)
				: update;

		historyRef.current.push(newState);
		setStateInternal(newState);
		setCanUndo(historyRef.current.canUndo());
		setCanRedo(historyRef.current.canRedo());

		console.log('Current state:', historyRef.current.getCurrent());
	}, []);

	const undo = useCallback(() => {
		const prevState = historyRef.current.undo();
		updateStateFromHistory(prevState);
	}, []);

	const redo = useCallback(() => {
		const nextState = historyRef.current.redo();
		updateStateFromHistory(nextState);
	}, []);

	return { state, setState, undo, redo, canUndo, canRedo };
}

import { useState, useEffect, useRef, useCallback } from 'react';

type Task = {
	text: string;
	processingTime: number;
};

// Node class for Queue implementation
class Node {
	constructor(public data: Task, public next: Node | null = null) {}
}

// Queue implementation using LinkedList
class TaskQueue {
	private front: Node | null = null;
	private rear: Node | null = null;

	enqueue(task: Task) {
		const newNode = new Node(task);

		if (!this.front) {
			this.front = newNode;
			this.rear = newNode;
			return;
		}

		if (this.rear) {
			this.rear.next = newNode;
			this.rear = newNode;
		}
	}

	dequeue(): Task | null {
		if (!this.front) return null;

		const temp = this.front.data;
		this.front = this.front.next;

		if (!this.front) {
			this.rear = null;
		}

		return temp;
	}

	peek(): Task | null {
		return this.front?.data ?? null;
	}

	isEmpty(): boolean {
		return this.front === null;
	}

	toArray(): Task[] {
		const result: Task[] = [];
		let current = this.front;

		while (current) {
			result.push(current.data);
			current = current.next;
		}

		return result;
	}
}

const TaskScheduler = () => {
	const taskQueueRef = useRef<TaskQueue>(new TaskQueue());
	const [queuedTasks, setQueuedTasks] = useState<Task[]>([]);
	const [currentTask, setCurrentTask] = useState<Task | null>(null);
	const [newTaskText, setNewTaskText] = useState('');
	const [newTaskTime, setNewTaskTime] = useState('');
	const [timeLeft, setTimeLeft] = useState(0);

	const processNextTask = useCallback(() => {
		const nextTask = taskQueueRef.current.dequeue();
		if (nextTask) {
			setCurrentTask(nextTask);
			setTimeLeft(nextTask.processingTime);
			setQueuedTasks(taskQueueRef.current.toArray());
		} else {
			setCurrentTask(null);
		}
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (currentTask) {
				if (timeLeft > 0) {
					setTimeLeft((prev) => prev - 1);
				} else {
					setCurrentTask(null);
					processNextTask();
				}
			} else {
				processNextTask();
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [currentTask, timeLeft, processNextTask]);

	const handleAddTask = useCallback(() => {
		if (!newTaskText || !newTaskTime) return;

		const processingTime = parseInt(newTaskTime);
		if (isNaN(processingTime) || processingTime <= 0) return;

		const newTask: Task = {
			text: newTaskText,
			processingTime,
		};

		taskQueueRef.current.enqueue(newTask);
		setQueuedTasks(taskQueueRef.current.toArray());
		setNewTaskText('');
		setNewTaskTime('');
	}, [newTaskText, newTaskTime]);

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Task Scheduler</h1>

			<div className='mb-6 flex gap-4'>
				<input
					type='text'
					value={newTaskText}
					onChange={(e) => setNewTaskText(e.target.value)}
					placeholder='Enter task description'
					className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<input
					type='number'
					value={newTaskTime}
					onChange={(e) => setNewTaskTime(e.target.value)}
					placeholder='Processing time (seconds)'
					className='w-48 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					onClick={handleAddTask}
					className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					Add Task
				</button>
			</div>

			{currentTask && (
				<div className='mb-6 p-4 bg-green-100 border border-green-400 rounded-lg'>
					<h2 className='text-xl font-semibold mb-2'>Currently Processing</h2>
					<p className='mb-1'>{currentTask.text}</p>
					<p>Time remaining: {timeLeft} seconds</p>
				</div>
			)}

			{queuedTasks.length > 0 && (
				<div className='p-4 bg-gray-100 border border-gray-300 rounded-lg'>
					<h2 className='text-xl font-semibold mb-2'>Task Queue</h2>
					<ul className='space-y-2'>
						{queuedTasks.map((task, index) => (
							<li
								key={index}
								className='p-3 bg-white border border-gray-200 rounded-lg'
							>
								<p className='mb-1'>{task.text}</p>
								<p className='text-sm text-gray-600'>
									Processing time: {task.processingTime} seconds
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default TaskScheduler;

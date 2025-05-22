import { useState } from 'react';
import { useHistoryState } from './useHistoryState';

type Task = {
	id: number;
	text: string;
	completed: boolean;
};

const UndoRedoDemo = () => {
	const [newTask, setNewTask] = useState('');
	const {
		state: tasks,
		setState: setTasks,
		undo,
		redo,
		canUndo,
		canRedo,
	} = useHistoryState<Task[]>([]);

	const addTask = () => {
		if (newTask.trim()) {
			setTasks([
				...tasks,
				{
					id: Date.now(),
					text: newTask,
					completed: false,
				},
			]);
			setNewTask('');
		}
	};

	const toggleTask = (id: number) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const deleteTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Task Manager with Undo/Redo</h1>

			<div className='flex gap-2 mb-6'>
				<input
					type='text'
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder='Add a new task'
					className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							addTask();
						}
					}}
				/>
				<button
					onClick={addTask}
					className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					Add Task
				</button>
			</div>

			<div className='flex gap-2 mb-6'>
				<button
					onClick={undo}
					disabled={!canUndo}
					className={`px-4 py-2 rounded-lg ${
						canUndo
							? 'bg-gray-500 text-white hover:bg-gray-600'
							: 'bg-gray-200 text-gray-400 cursor-not-allowed'
					}`}
				>
					Undo
				</button>
				<button
					onClick={redo}
					disabled={!canRedo}
					className={`px-4 py-2 rounded-lg ${
						canRedo
							? 'bg-gray-500 text-white hover:bg-gray-600'
							: 'bg-gray-200 text-gray-400 cursor-not-allowed'
					}`}
				>
					Redo
				</button>
			</div>

			<ul className='space-y-2'>
				{tasks.map((task) => (
					<li
						key={task.id}
						className='flex items-center justify-between p-4 bg-white rounded-lg shadow'
					>
						<div className='flex items-center gap-3'>
							<input
								type='checkbox'
								checked={task.completed}
								onChange={() => toggleTask(task.id)}
								className='w-5 h-5 rounded focus:ring-blue-500'
							/>
							<span
								className={`${
									task.completed
										? 'line-through text-gray-400'
										: 'text-gray-700'
								}`}
							>
								{task.text}
							</span>
						</div>
						<button
							onClick={() => deleteTask(task.id)}
							className='text-red-500 hover:text-red-600'
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UndoRedoDemo;

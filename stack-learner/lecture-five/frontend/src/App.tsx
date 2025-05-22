// import { ImageViewer } from './features/image-viewer/ImageViewer';
// import InfixCalculator from './features/infix_to_postfix/InfixToPostfix';
// import TagMatcher from './features/tag_matcher/TagMatcher';
// import UndoRedoDemo from './features/undo_redo/UndoRedoDemo';

import TaskScheduler from './features/task_scheduler/TaskScheduler';

// import UndoRedoDemo from './features/undo_redo/UndoRedoDemo';

// const images = [
// 	'https://picsum.photos/id/1/200/300',
// 	'https://picsum.photos/id/2/200/300',
// 	'https://picsum.photos/id/3/200/300',
// 	'https://picsum.photos/id/4/200/300',
// 	'https://picsum.photos/id/5/200/300',
// 	'https://picsum.photos/id/6/200/300',
// 	'https://picsum.photos/id/7/200/300',
// 	'https://picsum.photos/id/8/200/300',
// ];

function App() {
	return (
		<div className='container'>
			{/* <div className='flex flex-col items-center justify-center h-screen'>
				<h1 className='text-4xl font-bold'>Hello World</h1>
				<button className='bg-blue-500 text-white my-2 py-2 px-4 rounded-md'>
					Click me
				</button>
			</div> */}
			{/* <ImageViewer images={images} /> */}
			{/* <UndoRedoDemo /> */}
			{/* <TagMatcher /> */}
			{/* <InfixCalculator /> */}
			<TaskScheduler />
		</div>
	);
}

export default App;

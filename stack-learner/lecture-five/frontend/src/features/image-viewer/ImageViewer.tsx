import { useEffect, useState } from 'react';
import { ImageList } from './ImageList';

type ImageViewerProps = {
	images: string[];
};

export const ImageViewer = ({ images }: ImageViewerProps) => {
	const [imageList] = useState(() => {
		const list = new ImageList();
		images.forEach((image) => list.append(image));
		return list;
	});

	const [currentImage, setCurrentImage] = useState<string | null>(null);

	useEffect(() => {
		setCurrentImage(imageList.getCurrentImage());
	}, [imageList]);

	const handleNext = () => {
		const nextImage = imageList.next();
		if (nextImage) {
			setCurrentImage(nextImage);
		}
	};

	const handlePrev = () => {
		const prevImage = imageList.prev();
		if (prevImage) {
			setCurrentImage(prevImage);
		}
	};

	if (!currentImage) {
		return <div>No images available</div>;
	}

	return (
		<div className='image-viewer min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8'>
			<div className='image-container w-full max-w-4xl bg-white rounded-lg shadow-lg p-4'>
				{currentImage && (
					<div className='relative aspect-video'>
						<img
							src={currentImage}
							alt='Current'
							className='absolute inset-0 w-full h-full object-contain rounded-md'
						/>
					</div>
				)}
			</div>
			<div className='controls flex justify-center gap-6 mt-8'>
				<button
					onClick={handlePrev}
					className='nav-button bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full transition duration-200 ease-in-out flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={!imageList.hasPrev()}
				>
					<svg
						className='w-6 h-6 mr-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Previous
				</button>
				<button
					onClick={handleNext}
					className='nav-button bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full transition duration-200 ease-in-out flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={!imageList.hasNext()}
				>
					Next
					<svg
						className='w-6 h-6 ml-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

ImageViewer.displayName = 'ImageViewer';

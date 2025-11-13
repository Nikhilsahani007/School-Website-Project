import { useState } from 'react';
import './Gallery.css';

const IMAGES = [
	'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1523246198646-18f4a9b1d5a0?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1600&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1510070009289-b5bc34383727?q=80&w=1600&auto=format&fit=crop'
];

function Gallery() {
	const [active, setActive] = useState(null);

	return (
		<div className="gallery">
			<div className="container">
				<h1 className="page-title">Campus Gallery</h1>
				<p className="page-subtitle">A glimpse into our vibrant school life</p>

				<div className="gallery-grid">
					{IMAGES.map((src, i) => (
						<button
							key={i}
							className="gallery-item"
							onClick={() => setActive(src)}
							aria-label={`Open image ${i + 1}`}
						>
							<img src={`${src}`} alt="School" loading="lazy" />
						</button>
					))}
				</div>

				{active && (
					<div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
						<div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
							<img src={active} alt="Preview" />
							<button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close">✕</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Gallery;






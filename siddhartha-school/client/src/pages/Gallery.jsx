import { useState } from 'react';
import './Gallery.css';

const IMAGES = [
	'https://chinmayavvdelhi.ac.in/assets/images/gallery/school-gallery-2.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvk63vCTIAV-dmp_qjqZK9HUdAci97Gcl7VQ&s',
	'https://t3.ftcdn.net/jpg/09/28/53/10/360_F_928531048_45ay4GSNYJuTLIHKtuR255O9ndjsHg5x.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeKC5bqjgErl1JppNfOOLNoUUILJzWODgQJA&s',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2__7zEoLJA5hS27VX5pUSdd_1iqYzRRUwQr4R9xsMyAxHUrF60VNGh-OoDao5_Uvz1U8&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReNrSLSDdoihlSjag61LsQJjdx02q2JwH3-forbDCy3x9tI4MJfYnj_g9CBX7dhEvLqNY&usqp=CAU',
	'https://ai.thestempedia.com/wp-content/uploads/2024/12/Sindhi-High-School-5-scaled.jpg',
	'https://indiastemfoundation.org/wp-content/uploads/2024/08/6-17.png',
	'https://npssjpr.com/wp-content/uploads/2024/02/5-essential-skills-student-need-for-their-future.png'
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






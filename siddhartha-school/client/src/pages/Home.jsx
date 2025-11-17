import { useEffect, useState, useRef } from 'react';
import API_BASE_URL from '../config/api';
import './Home.css';

const SLIDER_IMAGES = [
	{
		id: 1,
		url: 'https://content.jdmagicbox.com/comp/medak/s1/9999p8452.8452.171002002641.j2s1/catalogue/siddarth-model-high-school-auto-nagar-medak-secondary-schools-wg6z82d67r.jpg',
		alt: 'School building exterior'
	},
	{
		id: 2,
		url: 'https://scontent.fhyd14-2.fna.fbcdn.net/v/t1.6435-9/89904906_3009591912413722_4096497591691247616_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jODgsOtEOsMQ7kNvwGK1sCb&_nc_oc=AdkFIOwoaU7vQHoYA5ngIgV0S4qO-R_eoLMIHkBnUqewKc6mGMBNWLzngG3dFpvEHxc&_nc_zt=23&_nc_ht=scontent.fhyd14-2.fna&_nc_gid=N7Z4c7szvK2od2Rz5S2BDw&oh=00_AfitAslSRF0BR_486YnXIYYuVqCqQ2WEWRO74-ucp0yOpA&oe=69414B9F',
		alt: 'Students in classroom'
	},
	{
		id: 3,
		url: 'https://indiater.com/wp-content/uploads/2019/02/free-education-website-slider-banner-psd-template.jpg',
		alt: 'School library'
	},
	{
		id: 4,
		url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
		alt: 'School science lab'
	},
	{
		id: 5,
		url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop',
		alt: 'School sports activities'
	},
	{
		id: 6,
		url: 'https://images.unsplash.com/photo-1510070009289-b5bc34383727?q=80&w=1600&auto=format&fit=crop',
		alt: 'School events and celebrations'
	}
];

function Home() {
	const [notices, setNotices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideIntervalRef = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/notices`);
				if (!res.ok) throw new Error('Failed to load notices');
				const data = await res.json();
				setNotices(data);
			} catch (e) {
				setError('Unable to fetch notices at the moment.');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// Auto-slide functionality
	useEffect(() => {
		slideIntervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
		}, 4000);

		return () => {
			if (slideIntervalRef.current) {
				clearInterval(slideIntervalRef.current);
			}
		};
	}, []);

	const goToSlide = (index) => {
		setCurrentSlide(index);
		if (slideIntervalRef.current) {
			clearInterval(slideIntervalRef.current);
		}
		slideIntervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
		}, 4000);
	};

	const nextSlide = () => {
		goToSlide((currentSlide + 1) % SLIDER_IMAGES.length);
	};

	const prevSlide = () => {
		goToSlide((currentSlide - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
	};

	return (
		<div className="home">
			{/* Photo Slider */}
			<section className="photo-slider-section">
				<div className="container">
					<div className="slider-container">
						<button 
							className="slider-arrow slider-arrow-left" 
							onClick={prevSlide}
							aria-label="Previous slide"
						>
							<span>‹</span>
						</button>
						
						<div className="slider-wrapper">
							<div 
								className="slider-track"
								style={{ transform: `translateX(-${currentSlide * 100}%)` }}
							>
								{SLIDER_IMAGES.map((image) => (
									<div key={image.id} className="slider-slide">
										<img 
											src={image.url} 
											alt={image.alt}
											loading="lazy"
										/>
									</div>
								))}
							</div>
						</div>

						<button 
							className="slider-arrow slider-arrow-right" 
							onClick={nextSlide}
							aria-label="Next slide"
						>
							<span>›</span>
						</button>
					</div>

					<div className="slider-dots">
						{SLIDER_IMAGES.map((_, index) => (
							<button
								key={index}
								className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
								onClick={() => goToSlide(index)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Hero Section */}
			<section className="hero">
				<div className="container hero-inner">
					<div className="hero-copy">
						<h1>Shaping Futures with Excellence</h1>
						<p>
							Welcome to Siddhartha Group of Schools — a vibrant learning community where
							students grow in knowledge, character, and confidence.
						</p>
						<div className="hero-actions">
							<a href="/admissions" className="btn btn-primary">Apply for Admission</a>
							<a href="/contact" className="btn btn-secondary">Contact Us</a>
						</div>
					</div>
					<div className="hero-stats">
						<div className="stat">
							<div className="stat-value">40+</div>
							<div className="stat-label">Years of Excellence</div>
						</div>
						<div className="stat">
							<div className="stat-value">100%</div>
							<div className="stat-label">Board Results</div>
						</div>
						<div className="stat">
							<div className="stat-value">50+</div>
							<div className="stat-label">Qualified Teachers</div>
						</div>
						<div className="stat">
							<div className="stat-value">1200+</div>
							<div className="stat-label">Happy Students</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Story */}
			<section className="about-section">
				<div className="container">
					<h2 className="section-title">Our Story</h2>
					<p>
						Established in 1984, Siddhartha Group of Schools has been a beacon of excellence in education 
						for over 41 years. We are committed to nurturing young minds and shaping future leaders 
						through quality education, holistic development, and strong values.
					</p>
					<p>
						With three branches across the region, we provide a supportive and stimulating environment where students can explore 
						their potential, develop critical thinking skills, and prepare for the challenges of 
						tomorrow. Our network of schools ensures quality education is accessible to more communities.
					</p>
				</div>
			</section>

			{/* Management Team */}
			<section className="management-section">
				<div className="container">
					<h2 className="section-title">Our Management Team</h2>
					<p className="section-intro">Meet the dedicated leaders who guide our schools towards excellence</p>
					<div className="management-grid">
						<div className="management-card">
							<div className="management-photo">
								<img 
									src="/assets/Chairman.jpg" 
									alt="Chairman"
									onError={(e) => {
										//e.target.src = 'https://via.placeholder.com/500x800?text=Chairman';
									}}
								/>
							</div>
							<div className="management-info">
								<h3>Chairman</h3>
								<p className="management-name">Mr. K. Indra Reddy</p>
								<p className="management-desc">
									With over 45 years of experience in education, our Chairman has been instrumental in 
									establishing Siddhartha Group of Schools as a beacon of excellence. His vision focuses on 
									holistic development and creating leaders of tomorrow across all our branches.
								</p>
							</div>
						</div>

						<div className="management-card">
							<div className="management-photo">
								<img 
									src="/assets/Vice Chairperson.jpg"
									onError={(e) => {
										//e.target.src = 'https://via.placeholder.com/300x300?text=Vice-Chairman';
									}}
								/>
							</div>
							<div className="management-info">
								<h3>Vice-Chairperson</h3>
								<p className="management-name">Mrs. K. Naga Laxmi</p>
								<p className="management-desc">
									Our Vice-Chairperson brings extensive administrative experience and strategic leadership to 
									the group. She plays a key role in expanding our educational network and ensuring consistent 
									quality across all branches while fostering innovation in teaching and learning.
								</p>
							</div>
						</div>

						<div className="management-card">
							<div className="management-photo">
								<img 
									src="/assets/Director.jpg" 
									alt="Director"
									onError={(e) => {
										//e.target.src = 'https://via.placeholder.com/300x300?text=Director';
									}}
								/>
							</div>
							<div className="management-info">
								<h3>Director</h3>
								<p className="management-name">Mr. S. Nagarjuna Reddy</p>
								<p className="management-desc">
									Our Director brings a wealth of academic expertise and innovative teaching methodologies 
									to the schools. With a Ph.D. in Education and years of experience, he ensures our 
									curriculum meets international standards while maintaining cultural values across all branches.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Vision & Mission */}
			<section className="vision-mission-section">
				<div className="container">
					<div className="vision-mission">
						<div className="vm-card">
							<div className="vm-icon">🎯</div>
							<h2>Our Vision</h2>
							<p>
								To be a leading educational institution that empowers students with knowledge, 
								skills, and values to become responsible global citizens and lifelong learners.
							</p>
						</div>

						<div className="vm-card">
							<div className="vm-icon">🚀</div>
							<h2>Our Mission</h2>
							<p>
								To provide exceptional education that fosters intellectual curiosity, creativity, 
								and character development in a safe, inclusive, and technologically advanced environment.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Branches */}
			<section className="branches-section">
				<div className="container">
					<h2 className="section-title">Our Branches</h2>
					<p className="section-intro">Three locations serving excellence in education</p>
					<div className="branches-grid">
						<div className="branch-card">
							<div className="branch-icon">🏫</div>
							<h3>Siddhartha High School</h3>
							<p className="branch-location">Vanasthalipuram, Hyderabad </p>
							<p className="branch-location">(Near Ganesh Temple)</p>
							<p className="branch-desc">
								Our flagship branch located in the heart of the city, offering comprehensive education 
								from Nursery to Class XII with state-of-the-art facilities and experienced faculty.
							</p>
							<div className="branch-features">
								<span>✓ Full Infrastructure</span>
								<span>✓ Transport Available</span>
								<span>✓ Modern Labs</span>
							</div>
						</div>
						<div className="branch-card">
							<div className="branch-icon">🏛️</div>
							<h3>Siddhartha Model High School</h3>
							<p className="branch-location">Kamala nagar, Vanasthalipuram, Hyderabad</p>
							<p className="branch-desc">
								Our North Branch serves the growing community in the northern region, providing the same 
								quality education and facilities as our main branch with a focus on local community needs.
							</p>
							<div className="branch-features">
								<span>✓ Full Infrastructure</span>
								<span>✓ Transport Available</span>
								<span>✓ Modern Labs</span>
							</div>
						</div>
						<div className="branch-card">
							<div className="branch-icon">🏢</div>
							<h3>Siddhartha Grammar High School</h3>
							<p className="branch-location">Vaidehi Nagar, Vanasthalipuram, Hyderabad</p>
							<p className="branch-desc">
								Our newest branch in the southern district, equipped with modern facilities and innovative 
								teaching methods, continuing our tradition of academic excellence and holistic development.
							</p>
							<div className="branch-features">
								<span>✓ Full Infrastructure</span>
								<span>✓ Transport Available</span>
								<span>✓ Modern Labs</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Facilities */}
			<section className="facilities-section">
				<div className="container">
					<h2 className="section-title">Our Facilities</h2>
					<div className="facilities-list">
						<div className="facility-item">
							<span className="facility-icon">🏫</span>
							<div>
								<h3>Modern Classrooms</h3>
								<p>Smart boards and audio-visual learning equipment</p>
							</div>
						</div>
						<div className="facility-item">
							<span className="facility-icon">🔬</span>
							<div>
								<h3>Science Laboratories</h3>
								<p>Well-equipped physics, chemistry, and biology labs</p>
							</div>
						</div>
						<div className="facility-item">
							<span className="facility-icon">💻</span>
							<div>
								<h3>Computer Labs</h3>
								<p>Latest computers with high-speed internet</p>
							</div>
						</div>
						<div className="facility-item">
							<span className="facility-icon">📚</span>
							<div>
								<h3>Library</h3>
								<p>Extensive collection of books and digital resources</p>
							</div>
						</div>
						<div className="facility-item">
							<span className="facility-icon">⚽</span>
							<div>
								<h3>Sports Complex</h3>
								<p>Playground, courts, and indoor sports facilities</p>
							</div>
						</div>
						<div className="facility-item">
							<span className="facility-icon">🎨</span>
							<div>
								<h3>Activity Rooms</h3>
								<p>Music, art, and dance studios</p>
							</div>
						</div>
						{/* Added Skill Development Program */}
			<div className="facility-item">
				<span className="facility-icon">📈</span>
				<div>
					<h3>Skill Development Program</h3>
					<p>Training in communication, aptitude, coding basics, and essential life skills</p>
				</div>
			</div>

			{/* Added Robotics Facility */}
			<div className="facility-item">
				<span className="facility-icon">🤖</span>
				<div>
					<h3>Robotics Lab</h3>
					<p>Hands-on robotics training with kits, sensors, and programmable microcontrollers</p>
				</div>
			</div>
						<div className="facility-item">
							<span className="facility-icon">🚌</span>
							<div>
								<h3>Transport Facility</h3>
								<p>Safe and reliable school bus service covering all routes with GPS tracking and trained drivers</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Core Values */}
			<section className="values-section">
				<div className="container">
					<h2 className="section-title">Our Core Values</h2>
					<div className="values-grid">
						<div className="value-card">
							<h3>Excellence</h3>
							<p>Striving for the highest standards in academics and character</p>
						</div>
						<div className="value-card">
							<h3>Integrity</h3>
							<p>Upholding honesty, transparency, and ethical behavior</p>
						</div>
						<div className="value-card">
							<h3>Innovation</h3>
							<p>Embracing creativity and modern teaching methodologies</p>
						</div>
						<div className="value-card">
							<h3>Inclusivity</h3>
							<p>Respecting diversity and promoting equal opportunities</p>
						</div>
						<div className="value-card">
							<h3>Collaboration</h3>
							<p>Building strong partnerships between students, teachers, and parents</p>
						</div>
						<div className="value-card">
							<h3>Leadership</h3>
							<p>Developing confident and responsible future leaders</p>
						</div>
					</div>
				</div>
			</section>

			{/* Quick Links */}
			<section className="quick-links">
				<div className="container">
					<h2 className="section-title">Explore More</h2>
					<div className="grid">
						<a href="/academics" className="ql-card">
							<div className="ql-icon">📚</div>
							<h3>Academics</h3>
							<p>Programs and curriculum across all grades</p>
						</a>
						<a href="/gallery" className="ql-card">
							<div className="ql-icon">🏫</div>
							<h3>Campus Life</h3>
							<p>Explore our vibrant campus and activities</p>
						</a>
						<a href="/fees" className="ql-card">
							<div className="ql-icon">💳</div>
							<h3>Fees</h3>
							<p>Class-wise transparent fee structure</p>
						</a>
						<a href="/contact" className="ql-card">
							<div className="ql-icon">✉️</div>
							<h3>Contact</h3>
							<p>Reach out to us for any inquiries</p>
						</a>
					</div>
				</div>
			</section>

			

			{/* Latest Notices */}
			<section className="notices">
				<div className="container">
					<h2 className="section-title">Latest Notices</h2>
					{loading ? (
						<div className="loading">Loading notices...</div>
					) : error ? (
						<div className="error">{error}</div>
					) : notices.length === 0 ? (
						<p className="no-notices">No notices available right now.</p>
					) : (
						<div className="notice-list">
							{notices.map((n) => (
								<div className={`notice-card priority-${n.priority || 'medium'}`} key={n._id || n.title}>
									<div className="notice-header">
										<span className="notice-badge">{(n.priority || 'medium').toUpperCase()}</span>
										<h3>{n.title}</h3>
									</div>
									<p>{n.content}</p>
									<div className="notice-footer">
										<span>{new Date(n.date).toLocaleDateString()}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default Home;

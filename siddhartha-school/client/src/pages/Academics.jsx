import './Academics.css';

function Academics() {
	const programs = [
		{
			title: 'Pre-Primary (Nursery - UKG)',
			desc: 'Play-based learning with foundational literacy and numeracy.',
			icon: '🎈',
			items: ['Phonics & Early Reading', 'Numbers & Shapes', 'Art & Music', 'Gross Motor Skills']
		},
		{
			title: 'Primary (I - V)',
			desc: 'Strong foundation across core subjects and skills.',
			icon: '📘',
			items: ['English & Hindi', 'Mathematics', 'EVS & Computers', 'Sports & Activities']
		},
		{
			title: 'Middle (VI - VIII)',
			desc: 'Conceptual understanding with applied learning.',
			icon: '🧪',
			items: ['Science & Labs', 'Mathematics', 'Social Science', 'Coding Basics']
		},
		{
			title: 'Secondary (IX - X)',
			desc: 'Board exam-focused curriculum with guidance.',
			icon: '🎓',
			items: ['Science/Math Focus', 'Languages', 'Social Science', 'Career Guidance']
		},
		{
			title: 'Senior Secondary (XI - XII)',
			desc: 'Streams with advanced preparation.',
			icon: '🏆',
			items: ['Science / Commerce / Arts', 'Competitive Prep', 'Projects & Seminars', 'Internships']
		},
		{
			title: 'Competitive Exam Preparation',
			desc: 'Specialized coaching for JEE, EAMCET, and other competitive exams.',
			icon: '🎯',
			items: ['JEE (Main & Advanced)', 'EAMCET Preparation', 'Expert Faculty', 'Mock Tests & Practice']
		}
	];

	const highlights = [
		{ icon: '🧑‍🏫', title: 'Qualified Faculty', desc: 'Experienced teachers with modern pedagogy' },
		{ icon: '💻', title: 'Smart Classrooms', desc: 'Audio-visual enabled, tech-integrated learning' },
		{ icon: '🔬', title: 'Well-equipped Labs', desc: 'Hands-on learning in science and computers' },
		{ icon: '📚', title: 'Rich Library', desc: 'Extensive books and digital resources' },
		{ icon: '🤝', title: 'Mentorship', desc: 'Personalized attention and guidance' },
		{ icon: '🏅', title: 'Holistic Growth', desc: 'Co-curricular, sports and arts' }
	];

	return (
		<div className="academics">
			<div className="container">
				<h1 className="page-title">Academics</h1>
				<p className="page-subtitle">Programs designed for every stage of learning</p>

				<section className="programs">
					<div className="program-grid">
						{programs.map((p, index) => {
							const isSecondary = p.title === 'Secondary (IX - X)';
							const isSeniorSecondary = p.title === 'Senior Secondary (XI - XII)';
							const cardClass = isSecondary || isSeniorSecondary ? 'program-card program-card-center' : 'program-card';
							return (
								<div className={cardClass} key={p.title}>
									<div className="program-icon">{p.icon}</div>
									<h3>{p.title}</h3>
									<p className="program-desc">{p.desc}</p>
									<ul className="program-items">
										{p.items.map((i) => (
											<li key={i}>• {i}</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</section>

				<section className="highlights">
					<h2 className="section-title">Why Learn With Us</h2>
					<div className="highlight-grid">
						{highlights.map((h) => (
							<div className="highlight-card" key={h.title}>
								<div className="highlight-icon">{h.icon}</div>
								<h3>{h.title}</h3>
								<p>{h.desc}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

export default Academics;



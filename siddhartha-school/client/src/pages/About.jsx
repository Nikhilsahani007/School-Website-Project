import './About.css';

function About() {
  return (
    <div className="about">
      <div className="container">
        <h1 className="page-title">About Siddhartha Group of Schools</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Established in 1999, Siddhartha Group of Schools has been a beacon of excellence in education 
            for over 25 years. We are committed to nurturing young minds and shaping future leaders 
            through quality education, holistic development, and strong values.
          </p>
          <p>
            With three branches across the region, we provide a supportive and stimulating environment where students can explore 
            their potential, develop critical thinking skills, and prepare for the challenges of 
            tomorrow. Our network of schools ensures quality education is accessible to more communities.
          </p>
        </section>

        <section className="management-section">
          <h2>Our Management Team</h2>
          <p className="section-intro">Meet the dedicated leaders who guide our schools towards excellence</p>
          <div className="management-grid">
            <div className="management-card">
              <div className="management-photo">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                  alt="Chairman"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Chairman';
                  }}
                />
              </div>
              <div className="management-info">
                <h3>Chairman</h3>
                <p className="management-name">Mr. Rajesh Kumar</p>
                <p className="management-desc">
                  With over 30 years of experience in education, our Chairman has been instrumental in 
                  establishing Siddhartha Group of Schools as a beacon of excellence. His vision focuses on 
                  holistic development and creating leaders of tomorrow across all our branches.
                </p>
              </div>
            </div>

            <div className="management-card">
              <div className="management-photo">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" 
                  alt="Vice-Chairman"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Vice-Chairman';
                  }}
                />
              </div>
              <div className="management-info">
                <h3>Vice-Chairman</h3>
                <p className="management-name">Mr. Vikram Singh</p>
                <p className="management-desc">
                  Our Vice-Chairman brings extensive administrative experience and strategic leadership to 
                  the group. He plays a key role in expanding our educational network and ensuring consistent 
                  quality across all branches while fostering innovation in teaching and learning.
                </p>
              </div>
            </div>

            <div className="management-card">
              <div className="management-photo">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" 
                  alt="Director"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Director';
                  }}
                />
              </div>
              <div className="management-info">
                <h3>Director</h3>
                <p className="management-name">Dr. Priya Sharma</p>
                <p className="management-desc">
                  Our Director brings a wealth of academic expertise and innovative teaching methodologies 
                  to the schools. With a Ph.D. in Education and years of experience, she ensures our 
                  curriculum meets international standards while maintaining cultural values across all branches.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="branches-section">
          <h2>Our Branches</h2>
          <p className="section-intro">Three locations serving excellence in education</p>
          <div className="branches-grid">
            <div className="branch-card">
              <div className="branch-icon">🏫</div>
              <h3>Main Branch</h3>
              <p className="branch-location">📍 City Center</p>
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
              <h3>North Branch</h3>
              <p className="branch-location">📍 North District</p>
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
              <h3>South Branch</h3>
              <p className="branch-location">📍 South District</p>
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
        </section>

        <section className="vision-mission">
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
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
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
        </section>

        <section className="facilities-section">
          <h2>Our Facilities</h2>
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
            <div className="facility-item">
              <span className="facility-icon">🚌</span>
              <div>
                <h3>Transport Facility</h3>
                <p>Safe and reliable school bus service covering all routes with GPS tracking and trained drivers</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
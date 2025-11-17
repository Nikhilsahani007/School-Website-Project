import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Siddhartha Group of Schools</h3>
          <p>Excellence in Education Since 1984</p>
          <p style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>Vanasthalipuram, Hyderabad</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span>📘</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span>🐦</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span>📷</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <span>📹</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/fees">Fees</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="footer-info">
            <li>📍 Vanasthalipuram, Hyderabad</li>
            <li>📞 +91 70000 80000</li>
            <li>📧 info@siddharthaschool.edu</li>
            <li>🕐 Mon-Sat: 08:15 AM - 05:30 PM</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to get updates about school events and news.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Siddhartha Group of Schools. All rights reserved.</p>
        <p>Developed with ❤️ by V.N.K Solutions</p>
      </div>
    </footer>
  );
}

export default Footer;
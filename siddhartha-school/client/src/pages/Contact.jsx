import { useState, useMemo } from 'react';
import emailjs from "@emailjs/browser";
import './Contact.css';

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
		inquiryType: 'general'
	});
	
	const [status, setStatus] = useState({ type: '', message: '' });
	const [loading, setLoading] = useState(false);

	const formatPhone = (value) => {
		const digits = value.replace(/\D/g, '').slice(0, 10);
		if (digits.length <= 5) return digits;
		return `${digits.slice(0, 5)} ${digits.slice(5)}`;
	};

	const normalizePhone = (value) => value.replace(/\D/g, '').slice(0, 10);
	const isValidPhone = (value) => normalizePhone(value).length === 10;
	const isValidEmail = (value) =>
		/^(?:[a-zA-Z0-9_'^&+\-])+(?:\.(?:[a-zA-Z0-9_'^&+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value);

	const formValid = useMemo(() => {
		return (
			formData.name.trim().length > 1 &&
			isValidEmail(formData.email) &&
			isValidPhone(formData.phone) &&
			formData.message.trim().length >= 5 &&
			formData.inquiryType
		);
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'phone') {
			setFormData({ ...formData, phone: formatPhone(value) });
			return;
		}
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus({ type: '', message: '' });

		if (!formValid) {
			setStatus({ type: 'error', message: 'Please fill all fields correctly.' });
			setLoading(false);
			return;
		}

		const templateParams = {
			name: formData.name,
			email: formData.email,
			phone: normalizePhone(formData.phone),
			message: formData.message,
			inquiryType: formData.inquiryType,
			submitted_at: new Date().toLocaleString()
		};

		emailjs
			.send(
				"service_ejxlk64",     // Service ID
				"template_pbgbrsv",    // Contact template ID
				templateParams,
				"u2jNvokJMsi6k2f7B"    // Public key
			)
			.then(
				() => {
					setStatus({
						type: "success",
						message: "Thank you! Your message has been sent successfully."
					});

					setFormData({
						name: "",
						email: "",
						phone: "",
						message: "",
						inquiryType: "general"
					});

					setLoading(false);
				},
				(error) => {
					console.error("EmailJS Error:", error);
					setStatus({
						type: "error",
						message: "Failed to send message. Please try again later."
					});
					setLoading(false);
				}
			);
	};

	return (
		<div className="contact">
			<div className="container">
				<h1 className="page-title">Contact Us</h1>
				
				<div className="contact-content">
					<div className="contact-info">
						<h2>Get in Touch</h2>
						<p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

						<div className="info-item">
							<h3>📍 Address</h3>
							<p>Siddhartha Group of Schools<br />Vanasthalipuram<br />Hyderabad</p>
						</div>

						<div className="info-item">
							<h3>📞 Phone</h3>
							<p>+91 70000 80000</p>
						</div>

						<div className="info-item">
							<h3>📧 Email</h3>
							<p>info@siddharthaschool.edu</p>
						</div>

						<div className="info-item">
							<h3>🕐 Office Hours</h3>
							<p>Monday - Saturday: 8:15 AM - 05:30 PM</p>
						</div>
					</div>

					<div className="contact-form-container">
						<form onSubmit={handleSubmit} className="contact-form">
							
							<div className="form-group">
								<label htmlFor="inquiryType">Inquiry Type</label>
								<select
									id="inquiryType"
									name="inquiryType"
									value={formData.inquiryType}
									onChange={handleChange}
								>
									<option value="general">General Inquiry</option>
									<option value="admission">Admission</option>
									<option value="academic">Academic</option>
									<option value="feedback">Feedback</option>
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="name">Full Name</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
								{formData.email && !isValidEmail(formData.email) && (
									<small style={{ color: '#991b1b' }}>Enter a valid email</small>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="phone">Phone Number</label>
								<input
									inputMode="numeric"
									pattern="[0-9 ]*"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									required
								/>
								{formData.phone && !isValidPhone(formData.phone) && (
									<small style={{ color: '#991b1b' }}>Enter 10 digits</small>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									name="message"
									rows="5"
									value={formData.message}
									onChange={handleChange}
									required
								></textarea>
							</div>

							{status.message && (
								<div className={`alert alert-${status.type}`}>
									{status.message}
								</div>
							)}

							<button type="submit" className="btn btn-primary" disabled={loading || !formValid}>
								{loading ? 'Sending...' : 'Send Message'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;

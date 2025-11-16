import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import "./Admissions.css";

function Admissions() {
	const [formData, setFormData] = useState({
		studentName: "",
		parentName: "",
		email: "",
		phone: "",
		class: "",
		previousSchool: "",
		address: "",
	});

	const [status, setStatus] = useState({ type: "", message: "" });
	const [loading, setLoading] = useState(false);

	const formatPhone = (value) => {
		const digits = value.replace(/\D/g, "").slice(0, 10);
		if (digits.length <= 5) return digits;
		return `${digits.slice(0, 5)} ${digits.slice(5)}`;
	};

	const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
	const isValidPhone = (value) => normalizePhone(value).length === 10;
	const isValidEmail = (value) =>
		/^(?:[a-zA-Z0-9_'^&+\-])+(?:\.(?:[a-zA-Z0-9_'^&+\-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value);

	const formValid = useMemo(() => {
		return (
			formData.studentName.trim().length > 1 &&
			formData.parentName.trim().length > 1 &&
			isValidEmail(formData.email) &&
			isValidPhone(formData.phone) &&
			formData.class !== ""
		);
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "phone") {
			setFormData({ ...formData, phone: formatPhone(value) });
			return;
		}
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formValid) {
			setStatus({ type: "error", message: "Please fill all required fields correctly." });
			return;
		}

		setLoading(true);
		setStatus({ type: "", message: "" });

		const templateParams = {
			studentName: formData.studentName,
			parentName: formData.parentName,
			email: formData.email,
			phone: normalizePhone(formData.phone),
			class: formData.class,
			previousSchool: formData.previousSchool || "N/A",
			address: formData.address || "N/A",
		};

		emailjs
			.send(
				"service_ejxlk64",      // Your Service ID
				"template_pbgbrsv",     // Admission Template ID
				templateParams,
				"u2jNvokJMsi6k2f7B"     // Public Key
			)
			.then(
				() => {
					setStatus({
						type: "success",
						message: "Admission inquiry submitted successfully.",
					});

					setFormData({
						studentName: "",
						parentName: "",
						email: "",
						phone: "",
						class: "",
						previousSchool: "",
						address: "",
					});

					setLoading(false);
				},
				(error) => {
					console.error("EmailJS Error:", error);
					setStatus({
						type: "error",
						message: "Submission failed. Please try again later.",
					});
					setLoading(false);
				}
			);
	};

	return (
		<div className="admissions">
			<div className="container">
				<h1 className="page-title">Admissions</h1>
				<p className="page-subtitle">Fill in the form below to inquire about admission</p>

				<div className="admissions-banner">
					<div className="admissions-banner-content">
						<h2>🎉 Admissions Open for Academic Year 2025-26! 🎉</h2>
						<p>We are now accepting applications for all classes from Nursery to Class X. Limited seats available - Apply now!</p>
						<div className="admissions-highlights">
							<span>✓ Early Bird Discount Available</span>
							<span>✓ Scholarships for Meritorious Students</span>
							<span>✓ Sibling Discount</span>
						</div>
					</div>
				</div>

				<div className="admissions-grid">

					<div className="admissions-info">
						<h2>Join Siddhartha Group of Schools</h2>
						<p>We welcome students who are eager to learn and grow. Our admissions team will contact you after reviewing your inquiry.</p>

						<ul className="admissions-points">
							<li>Age-appropriate placement across all grades</li>
							<li>Scholarships and sibling discounts available</li>
							<li>Campus tours on prior appointment</li>
							<li>Transport facility available for all branches</li>
							<li>Choose from any of our three branches</li>
							<li>Now introducing Robotics Program for hands-on innovation</li>
							<li>Skill Development Program to build communication, aptitude, and future-ready skills</li>
						</ul>
					</div>

					<form className="admissions-form" onSubmit={handleSubmit}>
						<div className="form-row">
							<div className="form-group">
								<label htmlFor="studentName">Student Name</label>
								<input
									id="studentName"
									name="studentName"
									value={formData.studentName}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="parentName">Parent/Guardian Name</label>
								<input
									id="parentName"
									name="parentName"
									value={formData.parentName}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
								{formData.email && !isValidEmail(formData.email) && (
									<small style={{ color: "#991b1b" }}>Enter a valid email</small>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="phone">Phone</label>
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
									<small style={{ color: "#991b1b" }}>Enter 10 digits</small>
								)}
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="class">Applying for Class</label>
								<select
									id="class"
									name="class"
									value={formData.class}
									onChange={handleChange}
									required
								>
									<option value="">Select</option>
									<option value="Nursery">Nursery</option>
									<option value="LKG">LKG</option>
									<option value="UKG">UKG</option>
									<option value="I">I</option>
									<option value="II">II</option>
									<option value="III">III</option>
									<option value="IV">IV</option>
									<option value="V">V</option>
									<option value="VI">VI</option>
									<option value="VII">VII</option>
									<option value="VIII">VIII</option>
									<option value="IX">IX</option>
									<option value="X">X</option>
								
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="previousSchool">Previous School (optional)</label>
								<input
									id="previousSchool"
									name="previousSchool"
									value={formData.previousSchool}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="address">Address</label>
							<textarea
								id="address"
								name="address"
								rows="4"
								value={formData.address}
								onChange={handleChange}
							></textarea>
						</div>

						{status.message && (
							<div className={`alert alert-${status.type}`}>
								{status.message}
							</div>
						)}

						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading || !formValid}
						>
							{loading ? "Submitting..." : "Submit Inquiry"}
						</button>
					</form>

				</div>
			</div>
		</div>
	);
}

export default Admissions;

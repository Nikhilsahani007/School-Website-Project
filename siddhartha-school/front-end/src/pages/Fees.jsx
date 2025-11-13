import { useState, useEffect } from 'react';
import './Fees.css';

function Fees() {
  const [feesData, setFeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fees');
      const data = await response.json();
      
      if (response.ok) {
        setFeesData(data);
      } else {
        setError('Failed to load fees data');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fees">
        <div className="container">
          <div className="loading">Loading fees information...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fees">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fees">
      <div className="container">
        <h1 className="page-title">Fee Structure</h1>
        <p className="page-subtitle">Academic Year 2024-2025</p>

        <div className="fees-table-container">
          <table className="fees-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Tuition Fee</th>
                <th>Transport Fee</th>
                <th>Other Fees</th>
                <th>Total (Annual)</th>
              </tr>
            </thead>
            <tbody>
              {feesData.map((fee, index) => (
                <tr key={index}>
                  <td>{fee.class}</td>
                  <td>₹{fee.tuitionFee.toLocaleString()}</td>
                  <td>₹{fee.transportFee.toLocaleString()}</td>
                  <td>₹{fee.otherFees.toLocaleString()}</td>
                  <td className="total">₹{fee.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fees-info">
          <h2>Payment Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Payment Terms</h3>
              <ul>
                <li>Fees can be paid in quarterly installments</li>
                <li>Online payment options available</li>
                <li>5% discount on annual payment</li>
              </ul>
            </div>
            
            <div className="info-card">
              <h3>What's Included</h3>
              <ul>
                <li>Textbooks and study materials</li>
                <li>Access to library and labs</li>
                <li>Sports facilities</li>
                <li>Extracurricular activities</li>
              </ul>
            </div>
            
            <div className="info-card">
              <h3>Additional Information</h3>
              <ul>
                <li>Scholarship programs available</li>
                <li>Sibling discount: 10%</li>
                <li>Late payment charges applicable</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fee-contact">
          <p>For more information about fees and payment options, please contact our accounts department.</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default Fees;
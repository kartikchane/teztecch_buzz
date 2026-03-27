import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitGrievance } from '../utils/api';
import './UtilityPages.css';

const Grievance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grievanceType: '',
    subject: '',
    description: '',
    attachmentUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setTrackingNumber('');

    try {
      const data = await submitGrievance(formData);
      
      setMessage({ 
        type: 'success', 
        text: data.message
      });
      setTrackingNumber(data.trackingNumber);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        grievanceType: '',
        subject: '',
        description: '',
        attachmentUrl: ''
      });
    } catch (error) {
      console.error('Grievance submission error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Unable to submit grievance. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="utility-page grievance-page">
      <div className="page-hero grievance-hero">
        <div className="container">
          <h1>Grievance Redressal</h1>
          <p className="hero-subtitle">We're here to listen and resolve your concerns</p>
          <p className="last-updated">Your feedback helps us improve</p>
        </div>
      </div>

      <div className="container">
        <div className="content-section policy-content">

          {/* Success/Error Message */}
          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.type === 'success' ? '✓ ' : '⚠ '}
              {message.text}
            </div>
          )}

          {/* Introduction Section */}
          <section className="policy-section intro-section">
            <h2>About Our Grievance Redressal Mechanism</h2>
            <p>
              At Teztecch Buzz, we are committed to maintaining the highest standards of quality, 
              integrity, and user satisfaction. We take all concerns, complaints, and grievances 
              seriously and have established a robust mechanism to address them promptly and fairly.
            </p>
            <p>
              This grievance redressal system is designed to provide you with a transparent, 
              efficient, and user-friendly platform to raise your concerns. We ensure that every 
              grievance is acknowledged, investigated, and resolved in a timely manner.
            </p>
          </section>

          {/* What Can You Report */}
          <section className="policy-section">
            <h2>What Can You Report?</h2>
            <div className="report-types-grid">
              <div className="report-card">
                <div className="report-icon">📝</div>
                <h3>Content Issues</h3>
                <p>Inaccurate information, misleading content, or content quality concerns</p>
              </div>
              <div className="report-card">
                <div className="report-icon">🔒</div>
                <h3>Privacy Concerns</h3>
                <p>Unauthorized use of personal data, privacy violations, or data security issues</p>
              </div>
              <div className="report-card">
                <div className="report-icon">⚖️</div>
                <h3>Copyright Issues</h3>
                <p>Intellectual property violations, plagiarism, or unauthorized content use</p>
              </div>
              <div className="report-card">
                <div className="report-icon">🐛</div>
                <h3>Technical Problems</h3>
                <p>Website bugs, broken links, loading issues, or functionality problems</p>
              </div>
              <div className="report-card">
                <div className="report-icon">💬</div>
                <h3>User Conduct</h3>
                <p>Harassment, abusive behavior, spam, or inappropriate comments</p>
              </div>
              <div className="report-card">
                <div className="report-icon">🚫</div>
                <h3>Policy Violations</h3>
                <p>Terms of use violations, community guideline breaches, or other policy issues</p>
              </div>
            </div>
          </section>

          {/* Grievance Officer Information */}
          <section className="policy-section">
            <h2>Grievance Redressal Officer</h2>
            <p>
              In accordance with applicable laws and regulations, we have appointed a dedicated 
              Grievance Redressal Officer to handle all complaints and concerns:
            </p>
            <div className="officer-info-enhanced">
              <div className="officer-detail">
                <div className="detail-icon">👤</div>
                <div className="detail-content">
                  <strong>Officer Name:</strong>
                  <p>Rajesh Kumar Sharma</p>
                </div>
              </div>
              <div className="officer-detail">
                <div className="detail-icon">📧</div>
                <div className="detail-content">
                  <strong>Email:</strong>
                  <p><a href="mailto:grievance@teztecchbuzz.in">grievance@teztecchbuzz.in</a></p>
                </div>
              </div>
              <div className="officer-detail">
                <div className="detail-icon">📞</div>
                <div className="detail-content">
                  <strong>Phone:</strong>
                  <p><a href="tel:+919876543210">+91-98765-43210</a></p>
                </div>
              </div>
              <div className="officer-detail">
                <div className="detail-icon">⏰</div>
                <div className="detail-content">
                  <strong>Response Time:</strong>
                  <p>Within 24-48 hours (Business Days)</p>
                </div>
              </div>
              <div className="officer-detail">
                <div className="detail-icon">🕐</div>
                <div className="detail-content">
                  <strong>Working Hours:</strong>
                  <p>Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </section>

          {/* Grievance Process */}
          <section className="policy-section">
            <h2>How We Handle Your Grievance</h2>
            <div className="process-timeline">
              <div className="timeline-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Submission</h4>
                  <p>Submit your grievance using the form below or via email</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Acknowledgment</h4>
                  <p>Receive confirmation within 24 hours with a tracking number</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Investigation</h4>
                  <p>Our team reviews and investigates your complaint thoroughly</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Resolution</h4>
                  <p>We provide a resolution and communicate the outcome to you</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Follow-up</h4>
                  <p>Follow up to ensure your satisfaction with the resolution</p>
                </div>
              </div>
            </div>
          </section>

          {/* Response Timeframes */}
          <section className="policy-section">
            <h2>Expected Response Timeframes</h2>
            <div className="timeframe-grid">
              <div className="timeframe-item">
                <div className="timeframe-label">Acknowledgment</div>
                <div className="timeframe-value">24 hours</div>
              </div>
              <div className="timeframe-item">
                <div className="timeframe-label">Initial Response</div>
                <div className="timeframe-value">48 hours</div>
              </div>
              <div className="timeframe-item">
                <div className="timeframe-label">Resolution</div>
                <div className="timeframe-value">7-10 days</div>
              </div>
              <div className="timeframe-item">
                <div className="timeframe-label">Complex Issues</div>
                <div className="timeframe-value">15-30 days</div>
              </div>
            </div>
            <p className="disclaimer-text">
              <strong>Note:</strong> Timeframes may vary depending on the complexity of the issue. 
              We will keep you informed throughout the process.
            </p>
          </section>

          {/* Grievance Submission Form */}
          <section className="policy-section form-section">
            <h2>Submit Your Grievance</h2>
            <p className="form-intro">
              Please provide detailed information about your grievance. The more information you 
              provide, the better we can assist you in resolving your concern.
            </p>

            <form onSubmit={handleSubmit} className="grievance-form-enhanced">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="grievanceType">Type of Grievance *</label>
                  <select
                    id="grievanceType"
                    name="grievanceType"
                    value={formData.grievanceType}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select grievance type</option>
                    <option value="Content Issue">Content Related Issue</option>
                    <option value="Privacy Concern">Privacy & Data Concern</option>
                    <option value="Copyright">Copyright/Intellectual Property</option>
                    <option value="Technical Issue">Technical Problem</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject/Title *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Brief summary of your grievance"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Detailed Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Please provide a detailed description of your grievance including:&#10;- What happened?&#10;- When did it occur?&#10;- What is the specific issue?&#10;- What resolution are you seeking?&#10;- Any relevant URLs or references"
                ></textarea>
                <small className="field-hint">Minimum 50 characters recommended for better assistance</small>
              </div>

              <div className="form-group">
                <label htmlFor="attachmentUrl">Supporting Document URL (Optional)</label>
                <input
                  type="url"
                  id="attachmentUrl"
                  name="attachmentUrl"
                  value={formData.attachmentUrl}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="https://example.com/document.pdf"
                />
                <small className="field-hint">
                  If you have screenshots, documents, or other evidence, upload them to a cloud 
                  service and provide the link here
                </small>
              </div>

              <div className="form-disclaimer">
                <p>
                  <strong>Privacy Notice:</strong> The information you provide will be used solely 
                  for addressing your grievance. We respect your privacy and will handle your data 
                  in accordance with our <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Grievance'}
              </button>
            </form>
          </section>

          {/* Alternative Contact Methods */}
          <section className="policy-section">
            <h2>Alternative Ways to Reach Us</h2>
            <p>
              If you prefer not to use the online form, you can also submit your grievance through 
              these alternative channels:
            </p>
            <div className="alternative-methods">
              <div className="method-card">
                <div className="method-icon">📧</div>
                <h4>Email</h4>
                <p>Send detailed grievance to:</p>
                <a href="mailto:grievance@teztecchbuzz.in">grievance@teztecchbuzz.in</a>
              </div>
              <div className="method-card">
                <div className="method-icon">📞</div>
                <h4>Phone</h4>
                <p>Call our grievance hotline:</p>
                <a href="tel:+919876543210">+91-98765-43210</a>
                <small>Mon-Fri, 9 AM - 6 PM IST</small>
              </div>
              <div className="method-card">
                <div className="method-icon">✉️</div>
                <h4>Postal Mail</h4>
                <p>Write to us at:</p>
                <address>
                  Grievance Redressal Officer<br />
                  Teztecch Buzz<br />
                  [Your Complete Address]<br />
                  [City, State - PIN Code]
                </address>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="policy-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>How long does it take to resolve a grievance?</h4>
                <p>
                  Most grievances are resolved within 7-10 business days. Complex issues may take 
                  up to 30 days. We will keep you updated throughout the process.
                </p>
              </div>
              <div className="faq-item">
                <h4>Will I receive a confirmation after submitting?</h4>
                <p>
                  Yes, you will receive an automated email confirmation within 24 hours with a 
                  unique tracking number for your grievance.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I submit an anonymous grievance?</h4>
                <p>
                  While we accept anonymous complaints, providing your contact information helps 
                  us communicate updates and resolution details more effectively.
                </p>
              </div>
              <div className="faq-item">
                <h4>What if I'm not satisfied with the resolution?</h4>
                <p>
                  If you're not satisfied with our response, you can request an escalation by 
                  replying to our resolution email. Your case will be reviewed by senior management.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="policy-section">
            <h2>Legal Compliance</h2>
            <p>
              Our grievance redressal mechanism is established in compliance with:
            </p>
            <ul>
              <li>Information Technology Act, 2000</li>
              <li>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Other applicable Indian laws and regulations</li>
            </ul>
            <p className="disclaimer-text">
              We are committed to resolving grievances in a fair, transparent, and timely manner 
              while ensuring compliance with all applicable legal requirements.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Grievance;

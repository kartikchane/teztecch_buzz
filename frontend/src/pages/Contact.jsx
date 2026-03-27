import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import '../components/BackToHome.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>
      
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have a story to share or want to collaborate? We'd love to hear from you!</p>
            
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>info@teztecchbuzz.com</p>
            </div>
            
            <div className="info-item">
              <h3>📱 Phone</h3>
              <p>+91 98765 43210</p>
            </div>
            
            <div className="info-item">
              <h3>📍 Address</h3>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
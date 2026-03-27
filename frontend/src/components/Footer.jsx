import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../utils/api';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await subscribeNewsletter(name, email);
      setMessage({ type: 'success', text: data.message });
      setName('');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Unable to connect to server. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>STORIES</h3>
            <ul>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/stories?category=startup">Startup</Link></li>
              <li><Link to="/stories?category=travel">Travel</Link></li>
              <li><Link to="/stories?category=farming">Farming</Link></li>
              <li><Link to="/stories?category=education">Education</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>MORE</h3>
            <ul>
              <li><Link to="/advertise">Advertise With Us</Link></li>
              <li><Link to="/work-with-us">Work With Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms of Use</Link></li>
              <li><Link to="/grievance">Grievance</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>CONTACT</h3>
            <div className="contact-info">
              <p className="contact-label">SHARE YOUR STORY:</p>
              <a href="mailto:hello@teztecchbuzz.in" className="contact-email">hello@teztecchbuzz.in</a>
              <p className="contact-label">SEND FEEDBACK:</p>
              <a href="https://www.teztecchbuzz.in" className="contact-link" target="_blank" rel="noopener noreferrer">www.teztecchbuzz.in</a>
              <div className="social-icons">
                <a href="https://www.facebook.com/teztecchbuzz" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/teztecchbuzz" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@teztecchbuzz" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                <a href="https://www.linkedin.com/company/teztecchbuzz" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                <a href="https://twitter.com/teztecchbuzz" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>WEEKLY DIGEST</h3>
            <p className="digest-text">Fill your inbox with positivity!</p>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input 
                type="text" 
                placeholder="Your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
              {message.text && (
                <div className={`subscribe-message ${message.type}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

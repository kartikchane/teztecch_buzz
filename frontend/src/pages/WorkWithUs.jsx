import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UtilityPages.css';

const WorkWithUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    collaborationType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for your interest! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      collaborationType: '',
      message: ''
    });
  };

  return (
    <div className="utility-page work-with-us-page">
      <div className="page-hero work-hero">
        <div className="container">
          <h1>Work With Us</h1>
          <p className="hero-subtitle">Join our mission to inspire positive change through storytelling</p>
        </div>
      </div>

      <div className="container">
        <div className="content-section">
          {/* Introduction Section */}
          <section className="intro-section">
            <h2>Collaborate With Teztecch Buzz</h2>
            <p className="intro-text">
              At Teztecch Buzz, we believe in the power of stories to drive change, inspire action, 
              and create a better tomorrow. Whether you're a content creator, organization, brand, 
              or individual with a passion for positive impact, there are numerous ways to collaborate 
              with us and reach millions of engaged readers worldwide.
            </p>
          </section>

          {/* Collaboration Options Grid */}
          <section className="collaboration-grid">
            <div className="collaboration-card">
              <div className="card-icon">✍️</div>
              <h3>Content Contributors</h3>
              <p>
                Share your stories, insights, and perspectives with our audience. We welcome 
                contributions from writers, photographers, videographers, and multimedia creators.
              </p>
              <ul>
                <li>Flexible contribution schedule</li>
                <li>Fair compensation for published work</li>
                <li>Byline and author profile</li>
                <li>Reach millions of engaged readers</li>
                <li>Editorial support and guidance</li>
                <li>Opportunities for recurring features</li>
              </ul>
              <div className="card-action">
                <Link to="/contact" className="btn-primary">Become a Contributor</Link>
              </div>
            </div>

            <div className="collaboration-card">
              <div className="card-icon">🤝</div>
              <h3>NGOs & Organizations</h3>
              <p>
                Partner with us to amplify your social impact initiatives and success stories. 
                We collaborate with NGOs, social enterprises, and non-profits making a difference.
              </p>
              <ul>
                <li>Feature your initiatives and campaigns</li>
                <li>Co-create impactful content series</li>
                <li>Access to socially-conscious audience</li>
                <li>Custom collaboration packages</li>
                <li>Long-term partnership opportunities</li>
                <li>Multi-platform storytelling</li>
              </ul>
              <div className="card-action">
                <Link to="/contact" className="btn-primary">Partner With Us</Link>
              </div>
            </div>

            <div className="collaboration-card">
              <div className="card-icon">🎯</div>
              <h3>Brands & Advertisers</h3>
              <p>
                Connect with our audience through meaningful brand partnerships and sponsored 
                content that aligns with our mission of positive storytelling.
              </p>
              <ul>
                <li>Native advertising opportunities</li>
                <li>Sponsored content series</li>
                <li>Brand campaigns with social impact</li>
                <li>Custom creative solutions</li>
                <li>Multi-channel promotion</li>
                <li>Detailed analytics and reporting</li>
              </ul>
              <div className="card-action">
                <Link to="/advertise" className="btn-primary">Advertise With Us</Link>
              </div>
            </div>

            <div className="collaboration-card">
              <div className="card-icon">📸</div>
              <h3>Photographers & Videographers</h3>
              <p>
                We're always looking for talented visual storytellers to contribute compelling 
                photography and videography that brings our stories to life.
              </p>
              <ul>
                <li>Feature your visual work</li>
                <li>Credits and portfolio building</li>
                <li>Collaborative creative projects</li>
                <li>Fair compensation rates</li>
                <li>Diverse storytelling opportunities</li>
                <li>Professional networking</li>
              </ul>
              <div className="card-action">
                <Link to="/contact" className="btn-primary">Submit Your Work</Link>
              </div>
            </div>

            <div className="collaboration-card">
              <div className="card-icon">🎓</div>
              <h3>Educational Institutions</h3>
              <p>
                Collaborate with us for student projects, internships, research partnerships, 
                and educational content initiatives.
              </p>
              <ul>
                <li>Internship programs</li>
                <li>Student journalist opportunities</li>
                <li>Research collaborations</li>
                <li>Educational content partnerships</li>
                <li>Campus ambassador programs</li>
                <li>Workshops and training sessions</li>
              </ul>
              <div className="card-action">
                <Link to="/contact" className="btn-primary">Explore Opportunities</Link>
              </div>
            </div>

            <div className="collaboration-card">
              <div className="card-icon">💼</div>
              <h3>Join Our Team</h3>
              <p>
                Looking for a full-time career opportunity? Join our team of passionate 
                storytellers, editors, developers, and changemakers.
              </p>
              <ul>
                <li>Editorial positions</li>
                <li>Content creation roles</li>
                <li>Technical positions</li>
                <li>Marketing and growth</li>
                <li>Business development</li>
                <li>Remote work options</li>
              </ul>
              <div className="card-action">
                <Link to="/career" className="btn-primary">View Open Positions</Link>
              </div>
            </div>
          </section>

          {/* Why Collaborate Section */}
          <section className="why-collaborate">
            <h2>Why Collaborate With Us?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-number">01</div>
                <h3>Wide Reach</h3>
                <p>Access to millions of engaged readers across India and globally</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">02</div>
                <h3>Quality Content</h3>
                <p>Professional editorial team ensuring high-quality storytelling</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">03</div>
                <h3>Social Impact</h3>
                <p>Platform dedicated to positive change and meaningful stories</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">04</div>
                <h3>Multi-Platform</h3>
                <p>Stories published across web, social media, and video platforms</p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="collaboration-form-section">
            <h2>Get in Touch</h2>
            <p className="form-intro">
              Have a unique collaboration idea? Fill out the form below and we'll get back to you within 48 hours.
            </p>
            <form className="collaboration-form" onSubmit={handleSubmit}>
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
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="organization">Organization (if applicable)</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Your organization name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="collaborationType">Type of Collaboration *</label>
                <select
                  id="collaborationType"
                  name="collaborationType"
                  value={formData.collaborationType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select collaboration type</option>
                  <option value="content-contributor">Content Contributor</option>
                  <option value="ngo-partnership">NGO/Organization Partnership</option>
                  <option value="brand-advertising">Brand/Advertising Partnership</option>
                  <option value="photographer-videographer">Photographer/Videographer</option>
                  <option value="educational">Educational Institution</option>
                  <option value="career">Career Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell Us About Your Idea *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe your collaboration idea, project, or how you'd like to work with us..."
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Submit Inquiry
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="contact-info-section">
            <h2>Other Ways to Reach Us</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <h3>Email</h3>
                <p>For partnership inquiries:</p>
                <a href="mailto:partnerships@teztecchbuzz.in">partnerships@teztecchbuzz.in</a>
                <p>For content submissions:</p>
                <a href="mailto:hello@teztecchbuzz.in">hello@teztecchbuzz.in</a>
              </div>
              <div className="contact-method">
                <div className="method-icon">🌐</div>
                <h3>Website</h3>
                <p>Visit our main website:</p>
                <a href="https://www.teztecchbuzz.in" target="_blank" rel="noopener noreferrer">
                  www.teztecchbuzz.in
                </a>
              </div>
              <div className="contact-method">
                <div className="method-icon">📱</div>
                <h3>Social Media</h3>
                <p>Follow and DM us on:</p>
                <div className="social-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;

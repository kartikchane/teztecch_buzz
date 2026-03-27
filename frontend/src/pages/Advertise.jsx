import React, { useState } from 'react';
import './Advertise.css';

const Advertise = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    adType: '',
    budget: '',
    message: ''
  });

  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our advertising team will contact you within 24 hours.');
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      adType: '',
      budget: '',
      message: ''
    });
  };

  const handleBenefitClick = (benefit) => {
    setSelectedBenefit(benefit);
  };

  const closeModal = () => {
    setSelectedBenefit(null);
  };

  const stats = [
    { number: '10M+', label: 'Monthly Readers' },
    { number: '85%', label: 'Engagement Rate' },
    { number: '5M+', label: 'Social Reach' },
    { number: '200+', label: 'Brand Partners' }
  ];

  const adOptions = [
    {
      icon: '📱',
      title: 'Display Advertising',
      description: 'Premium banner placements across high-traffic pages',
      features: [
        'Homepage hero banners',
        'Category page placements',
        'Article sidebar ads',
        'Mobile-optimized formats'
      ],
      pricing: 'From ₹25,000/month'
    },
    {
      icon: '✍️',
      title: 'Sponsored Content',
      description: 'Native advertising that resonates with our audience',
      features: [
        'Branded storytelling',
        'Editorial collaboration',
        'Multi-format content',
        'Social amplification'
      ],
      pricing: 'From ₹50,000/article'
    },
    {
      icon: '📧',
      title: 'Newsletter Sponsorship',
      description: 'Direct access to our engaged subscriber base',
      features: [
        'Dedicated email slots',
        'Banner placements',
        'Sponsored segments',
        'Performance analytics'
      ],
      pricing: 'From ₹35,000/edition'
    },
    {
      icon: '🎯',
      title: 'Custom Campaigns',
      description: 'Tailored solutions for your marketing objectives',
      features: [
        'Integrated campaigns',
        'Video content creation',
        'Event partnerships',
        'Performance reporting'
      ],
      pricing: 'Custom pricing'
    }
  ];

  const benefits = [
    {
      icon: '👥',
      title: 'Quality Audience',
      description: 'Reach decision-makers, entrepreneurs, and socially conscious consumers',
      details: 'Our audience consists of highly engaged professionals, business leaders, and conscious consumers who actively seek inspiration and innovation. With an average session time of 8+ minutes and 65% return visitors, your brand message reaches people who are ready to take action.',
      stats: ['45% Business Owners', '30% C-Level Executives', '25% Young Professionals']
    },
    {
      icon: '📈',
      title: 'Proven Results',
      description: 'Track record of delivering high engagement and conversion rates',
      details: 'Our advertising partners consistently see 3-5x higher engagement compared to industry standards. With conversion rates averaging 4.2% and a 92% brand recall score, we deliver measurable ROI for every campaign.',
      stats: ['85% Engagement Rate', '4.2% Avg Conversion', '92% Brand Recall']
    },
    {
      icon: '🎨',
      title: 'Creative Excellence',
      description: 'Award-winning content team to bring your brand story to life',
      details: 'Our in-house creative team has won 15+ national awards for content marketing excellence. We craft compelling narratives that resonate with audiences and align perfectly with your brand values, ensuring authentic storytelling that drives results.',
      stats: ['15+ Awards Won', '100+ Brands Served', '98% Client Satisfaction']
    },
    {
      icon: '📊',
      title: 'Data-Driven',
      description: 'Comprehensive analytics and reporting for all campaigns',
      details: 'Get real-time insights with our advanced analytics dashboard. Track impressions, clicks, engagement, and conversions with detailed demographic breakdowns. Monthly reports include actionable insights and optimization recommendations.',
      stats: ['Real-time Analytics', 'Custom Reports', 'ROI Tracking']
    }
  ];

  return (
    <div className="advertise-page">
      {/* Hero Section */}
      <section className="advertise-hero">
        <div className="container">
          <div className="hero-badge">PARTNER WITH US</div>
          <h1>Advertise With TezTecch Buzz</h1>
          <p>Connect with millions of engaged readers who are passionate about positive change, innovation, and inspiring stories</p>
          <div className="hero-buttons">
            <a href="#contact-form" className="btn-primary">Get Started</a>
            <a href="#options" className="btn-secondary">View Options</a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="ad-stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0 0 15px', textAlign: 'center' }}>Why Advertise with Us?</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0', textAlign: 'center' }}>Join leading brands who trust TezTecch Buzz to amplify their message</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card"
                onClick={() => handleBenefitClick(benefit)}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefit Details Modal */}
      {selectedBenefit && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-icon">{selectedBenefit.icon}</div>
            <h2>{selectedBenefit.title}</h2>
            <p className="modal-description">{selectedBenefit.details}</p>
            <div className="modal-stats">
              {selectedBenefit.stats.map((stat, idx) => (
                <div key={idx} className="modal-stat-item">
                  <span className="stat-check">✓</span> {stat}
                </div>
              ))}
            </div>
            <button className="modal-cta" onClick={closeModal}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Advertising Options */}
      <section className="ad-options-section" id="options">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0 0 15px', textAlign: 'center' }}>Advertising Solutions</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0', textAlign: 'center' }}>Choose the perfect format to achieve your marketing goals</p>
          </div>
          <div className="ad-options-grid">
            {adOptions.map((option, index) => (
              <div key={index} className="ad-option-card">
                <div className="option-icon">{option.icon}</div>
                <h3>{option.title}</h3>
                <p className="option-description">{option.description}</p>
                <ul className="option-features">
                  {option.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="option-pricing">{option.pricing}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="ad-contact-section" id="contact-form">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Let's Create Something Amazing</h2>
              <p>Fill out the form and our advertising team will contact you within 24 hours to discuss your objectives and craft a customized solution.</p>
              
              <div className="contact-details">
                <div className="detail-item">
                  <div className="detail-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>advertise@teztecchbuzz.com</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">⏰</div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name *</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPerson">Contact Person *</label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="adType">Advertising Type *</label>
                    <select
                      id="adType"
                      name="adType"
                      value={formData.adType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select advertising type</option>
                      <option value="display">Display Advertising</option>
                      <option value="sponsored">Sponsored Content</option>
                      <option value="newsletter">Newsletter Sponsorship</option>
                      <option value="custom">Custom Campaign</option>
                      <option value="package">Multiple Solutions</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Monthly Budget *</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="25-50">₹25,000 - ₹50,000</option>
                      <option value="50-100">₹50,000 - ₹1,00,000</option>
                      <option value="100-250">₹1,00,000 - ₹2,50,000</option>
                      <option value="250+">₹2,50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Campaign Objectives</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your advertising goals, target audience, and campaign objectives..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Inquiry
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advertise;

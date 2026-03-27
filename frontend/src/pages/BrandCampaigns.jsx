import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BrandCampaigns.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BrandCampaigns = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${API_URL}/api/public/testimonials`);
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Continuous auto-scroll effect - smooth left to right
  useEffect(() => {
    if (!scrollContainerRef.current || testimonials.length === 0) return;

    let animationFrameId;
    let isPaused = false;

    const continuousScroll = () => {
      if (scrollContainerRef.current && !isPaused) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth / 2; // Half because we duplicate
        
        // Scroll by 1 pixel for smooth continuous effect
        container.scrollLeft += 1;
        
        // Reset to beginning when reached halfway (seamless loop)
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    // Start continuous scrolling
    animationFrameId = requestAnimationFrame(continuousScroll);

    // Pause on hover
    const container = scrollContainerRef.current;
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [testimonials]);

  const stats = [
    { number: "1M+", label: "Monthly Reach" },
    { number: "85%", label: "Engagement Rate" },
    { number: "50+", label: "Brand Partners" },
    { number: "200+", label: "Campaigns Delivered" }
  ];

  const services = [
    {
      id: 'content',
      title: "Branded Content",
      icon: "📝",
      description: "Authentic storytelling that seamlessly integrates your brand message with inspiring narratives.",
      features: [
        "Custom story articles featuring your brand",
        "Professional photography and videography",
        "SEO-optimized content for maximum reach",
        "Multi-platform distribution",
        "Dedicated editorial team"
      ]
    },
    {
      id: 'video',
      title: "Video Campaigns",
      icon: "🎥",
      description: "Compelling video content that brings your brand story to life and engages audiences emotionally.",
      features: [
        "Documentary-style brand stories",
        "Social media video series",
        "Behind-the-scenes content",
        "Professional production quality",
        "YouTube and social media promotion"
      ]
    },
    {
      id: 'social',
      title: "Social Media Campaigns",
      icon: "📱",
      description: "Strategic social media campaigns that amplify your message and drive meaningful engagement.",
      features: [
        "Multi-platform campaign strategy",
        "Influencer collaborations",
        "Daily content creation and management",
        "Community engagement",
        "Analytics and reporting"
      ]
    },
    {
      id: 'sponsored',
      title: "Sponsored Stories",
      icon: "⭐",
      description: "Feature your initiatives in our popular story sections with guaranteed visibility and engagement.",
      features: [
        "Homepage feature placement",
        "Newsletter inclusion",
        "Social media amplification",
        "Dedicated landing page",
        "Performance metrics"
      ]
    }
  ];

  const caseStudies = [
    {
      brand: "EcoLife Foundation",
      campaign: "Plastic-Free India Movement",
      result: "2M+ impressions, 50K+ engagements",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600"
    },
    {
      brand: "SkillUp Academy",
      campaign: "Rural Education Initiative",
      result: "1.5M+ reach, 30K+ leads",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
    },
    {
      brand: "GreenTech Solutions",
      campaign: "Solar Energy Awareness",
      result: "3M+ views, 100K+ interactions",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "₹50,000",
      duration: "/month",
      features: [
        "2 branded articles per month",
        "Social media promotion",
        "Newsletter feature",
        "Basic analytics",
        "Dedicated account manager"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "₹1,25,000",
      duration: "/month",
      features: [
        "5 branded articles per month",
        "1 video story",
        "Homepage feature",
        "Advanced analytics",
        "Priority support",
        "Quarterly strategy sessions"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "pricing",
      features: [
        "Unlimited content creation",
        "Full video production",
        "Dedicated editorial team",
        "Custom campaign strategy",
        "White-label solutions",
        "API integration"
      ],
      highlighted: false
    }
  ];



  return (
    <div className="brand-campaigns-page">
      {/* Hero Section */}
      <section className="campaigns-hero">
        <div className="container">
          <span className="hero-badge">BRAND PARTNERSHIPS</span>
          <h1>Amplify Your Impact Through Authentic Storytelling</h1>
          <p>Partner with India's leading platform for positive change stories and reach millions of engaged, conscious consumers</p>
          <div className="hero-buttons">
            <a href="#packages" className="btn-primary">View Packages</a>
            <Link to="/contact" className="btn-secondary">Schedule Call</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="why-partner-section" style={{ background: 'linear-gradient(135deg, #00BFA5 0%, #26A69A 100%)', padding: '100px 20px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              color: '#ffffff', 
              fontWeight: '900', 
              fontSize: '3.5rem', 
              textAlign: 'center', 
              marginBottom: '25px',
              lineHeight: '1.2'
            }}>
              Why Partner With TezTecch Buzz?
            </h2>
            <p style={{ 
              color: '#ffffff', 
              fontSize: '1.4rem', 
              textAlign: 'center',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              We connect purpose-driven brands with audiences that care
            </p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Targeted Audience</h3>
              <p>Reach 1M+ monthly readers who are passionate about sustainability, innovation, and social impact</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h3>Authentic Stories</h3>
              <p>We create genuine narratives that resonate, not advertisements that interrupt</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Measurable Results</h3>
              <p>Comprehensive analytics and reporting to track your campaign's performance</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Long-term Partnerships</h3>
              <p>Build lasting relationships with an audience that shares your values</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0 0 15px', textAlign: 'center' }}>Our Services</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0', textAlign: 'center' }}>Comprehensive solutions for your brand storytelling needs</p>
          </div>
          <div className="services-tabs">
            {services.map((service) => (
              <button
                key={service.id}
                className={`tab-btn ${activeTab === service.id ? 'active' : ''}`}
                onClick={() => setActiveTab(service.id)}
              >
                <span className="tab-icon">{service.icon}</span>
                {service.title}
              </button>
            ))}
          </div>
          <div className="services-content">
            {services.map((service) => (
              activeTab === service.id && (
                <div key={service.id} className="service-details">
                  <div className="service-info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <Link to="/contact" className="service-cta">Get Started →</Link>
                  </div>
                  <div className="service-visual">
                    <div className="visual-placeholder">
                      <span className="visual-icon">{service.icon}</span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0 0 15px', textAlign: 'center' }}>Success Stories</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0', textAlign: 'center' }}>See how we've helped brands create impact</p>
          </div>
          <div className="case-studies-grid">
            {caseStudies.map((study, index) => (
              <div key={index} className="case-study-card">
                <div className="case-image">
                  <img src={study.image} alt={study.brand} />
                </div>
                <div className="case-content">
                  <h4>{study.brand}</h4>
                  <p className="campaign-name">{study.campaign}</p>
                  <div className="case-result">
                    <span className="result-icon">📈</span>
                    <span>{study.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="pricing-section" id="packages">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0 0 15px', textAlign: 'center' }}>Choose Your Package</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', margin: '0', textAlign: 'center' }}>Flexible pricing to match your brand's needs</p>
          </div>
          <div className="pricing-grid">
            {packages.map((pkg, index) => (
              <div key={index} className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}>
                {pkg.highlighted && <div className="popular-badge">Most Popular</div>}
                <h3>{pkg.name}</h3>
                <div className="price">
                  <span className="amount">{pkg.price}</span>
                  <span className="duration">{pkg.duration}</span>
                </div>
                <ul className="package-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="package-btn">
                  {pkg.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#00BFA5', margin: '0', textAlign: 'center' }}>What Our Partners Say</h2>
          </div>
          <div className="testimonials-wrapper">
            <button className="scroll-btn scroll-btn-left" onClick={() => scroll('left')} aria-label="Scroll left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div className="testimonials-scroll-container" ref={scrollContainerRef}>
              {loading ? (
                <div className="loading-testimonials">Loading testimonials...</div>
              ) : testimonials.length > 0 ? (
                <>
                  {/* Original testimonials */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`original-${testimonial._id || index}`} className="testimonial-card">
                      <div className="quote-icon">"</div>
                      <p className="testimonial-text">{testimonial.quote}</p>
                      <div className="testimonial-author">
                        <img src={testimonial.image} alt={testimonial.author} />
                        <div className="author-info">
                          <h4>{testimonial.author}</h4>
                          <p>{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate testimonials for seamless loop */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`duplicate-${testimonial._id || index}`} className="testimonial-card">
                      <div className="quote-icon">"</div>
                      <p className="testimonial-text">{testimonial.quote}</p>
                      <div className="testimonial-author">
                        <img src={testimonial.image} alt={testimonial.author} />
                        <div className="author-info">
                          <h4>{testimonial.author}</h4>
                          <p>{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="no-testimonials">No testimonials available</div>
              )}
            </div>
            <button className="scroll-btn scroll-btn-right" onClick={() => scroll('right')} aria-label="Scroll right">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="campaigns-cta">
        <div className="container">
          <h2>Ready to Make an Impact?</h2>
          <p>Let's create a campaign that inspires change and drives results</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">Start Your Campaign</Link>
            <a href="mailto:partnerships@teztecchbuzz.com" className="btn-secondary">
              partnerships@teztecchbuzz.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandCampaigns;
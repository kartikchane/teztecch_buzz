import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import '../components/BackToHome.css';

const About = () => {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & Editor-in-Chief",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      description: "Passionate storyteller with 10+ years in journalism"
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      description: "Expert in social impact stories and documentaries"
    },
    {
      name: "Anita Desai",
      role: "Senior Writer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      description: "Covering sustainability and environmental stories"
    },
    {
      name: "Vikram Singh",
      role: "Video Producer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "Creating impactful visual stories across India"
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "TezTecch Buzz was born with a vision to celebrate positive change" },
    { year: "2021", title: "1M Readers", description: "Reached our first million monthly readers milestone" },
    { year: "2023", title: "Award Winning", description: "Won Best Digital Media Platform for Social Impact" },
    { year: "2025", title: "500+ Stories", description: "Published over 500 inspiring stories from across India" }
  ];

  const impactStats = [
    { number: "1M+", label: "Monthly Readers", icon: "👥" },
    { number: "500+", label: "Stories Published", icon: "📖" },
    { number: "200+", label: "Changemakers Featured", icon: "⭐" },
    { number: "30+", label: "Categories Covered", icon: "🎯" }
  ];

  return (
    <div className="about-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About TezTecch Buzz</h1>
          <p>Celebrating Stories That Inspire Change Across India</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                TezTecch Buzz is India's premier platform dedicated to amplifying positive stories 
                of change, innovation, and social impact. We believe that every story of courage, 
                determination, and positive action deserves to be heard.
              </p>
              <p>
                Through compelling narratives and authentic storytelling, we connect millions of 
                readers with the changemakers, innovators, and everyday heroes who are shaping 
                India's future. Our mission is to inspire action and foster a community of 
                individuals committed to creating positive change.
              </p>
            </div>
            <div className="mission-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" alt="Team collaboration" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="impact-card">
                <div className="impact-icon">{stat.icon}</div>
                <div className="impact-number">{stat.number}</div>
                <div className="impact-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="what-we-do-section">
        <div className="container">
          <h2 className="section-title">What We Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Authentic Storytelling</h3>
              <p>
                We share real, verified stories of individuals and organizations making a 
                tangible difference in their communities across India.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3>Visual Narratives</h3>
              <p>
                Through compelling videos and photo stories, we bring you face-to-face 
                with changemakers and their inspiring journeys.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Diverse Coverage</h3>
              <p>
                From sustainability to education, technology to social impact - we cover 
                30+ categories of positive change happening nationwide.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community Building</h3>
              <p>
                We connect like-minded individuals, organizations, and changemakers to 
                create a network of positive action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="values-title" style={{ color: 'white', fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '60px' }}>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-number">01</div>
              <h3>Authenticity</h3>
              <p>Every story we publish is thoroughly researched and verified. We believe in honest, transparent journalism.</p>
            </div>
            <div className="value-item">
              <div className="value-number">02</div>
              <h3>Impact</h3>
              <p>We focus on stories that create real, measurable change and inspire others to take action.</p>
            </div>
            <div className="value-item">
              <div className="value-number">03</div>
              <h3>Inclusivity</h3>
              <p>We celebrate stories from all corners of India, giving voice to diverse communities and perspectives.</p>
            </div>
            <div className="value-item">
              <div className="value-number">04</div>
              <h3>Innovation</h3>
              <p>We constantly evolve our storytelling methods to engage and inspire our growing audience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="team-intro">
            Our passionate team of journalists, writers, and content creators work tirelessly 
            to bring you inspiring stories from across India.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>
              Be part of India's largest community celebrating positive change. 
              Subscribe to our newsletter and never miss an inspiring story.
            </p>
            <div className="cta-buttons">
              <Link to="/stories" className="cta-btn primary">
                Explore Stories
              </Link>
              <Link to="/contact" className="cta-btn secondary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
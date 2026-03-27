import React from 'react';
import './OurImpact.css';

const OurImpact = () => {
  const impactStats = [
    { number: '10M+', label: 'Monthly Readers' },
    { number: '5000+', label: 'Stories Published' },
    { number: '500+', label: 'Contributors' },
    { number: '100+', label: 'Cities Covered' }
  ];

  const achievements = [
    {
      title: "Digital Literacy Campaign",
      description: "Helped 50,000+ people in rural areas gain digital skills",
      icon: "💻"
    },
    {
      title: "Environmental Initiatives",
      description: "Inspired 100+ communities to adopt sustainable practices",
      icon: "🌱"
    },
    {
      title: "Startup Mentorship",
      description: "Connected 200+ startups with investors and mentors",
      icon: "🚀"
    },
    {
      title: "Education Access",
      description: "Supported scholarship programs reaching 1000+ students",
      icon: "📚"
    }
  ];

  return (
    <div className="impact-page">
      <div className="page-hero">
        <div className="container">
          <h1>Our Impact</h1>
          <p>Creating Positive Change Through Stories</p>
        </div>
      </div>

      <div className="container">
        <section className="impact-stats">
          <h2 className="section-title">Impact by Numbers</h2>
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="achievements-section">
          <h2 className="section-title">Our Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <span className="achievement-icon">{achievement.icon}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <h2 className="section-title">What Our Community Says</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Teztecch Buzz has been instrumental in bringing positive stories to the forefront. Their coverage helped our initiative reach thousands of people."</p>
              <div className="testimonial-author">
                <strong>- Priya Sharma</strong>
                <span>Environmental Activist</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The platform's support helped our startup gain visibility. We're grateful for the opportunity to share our story."</p>
              <div className="testimonial-author">
                <strong>- Rahul Verma</strong>
                <span>Tech Entrepreneur</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"As an educator, I find Teztecch Buzz to be an invaluable resource for inspiring my students with real-world success stories."</p>
              <div className="testimonial-author">
                <strong>- Dr. Anita Desai</strong>
                <span>Professor</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurImpact;

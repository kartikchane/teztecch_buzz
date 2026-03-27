import React from 'react';
import './Career.css';

const Career = () => {
  return (
    <div className="career-page">
      <div className="page-header">
        <h1>Careers at TezTecch Buzz</h1>
        <p>Join our mission to inspire change through storytelling</p>
      </div>
      
      <div className="container">
        <section className="career-content">
          <h2>Work With Us</h2>
          <p>
            We're always looking for passionate storytellers, content creators, and digital 
            enthusiasts who want to make a difference. Join our team and help us spread 
            positive stories that inspire action.
          </p>
          
          <div className="job-openings">
            <h3>Current Openings</h3>
            <p>Check back soon for exciting opportunities!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Career;
import React from 'react';
import './Press.css';

const Press = () => {
  return (
    <div className="press-page">
      <div className="page-header">
        <h1>Press & Media</h1>
        <p>Latest news and press releases</p>
      </div>
      
      <div className="container">
        <section className="press-content">
          <h2>In the News</h2>
          <p>
            TezTecch Buzz has been featured in various publications for our commitment 
            to positive journalism and inspiring storytelling.
          </p>
          
          <div className="press-contact">
            <h3>For Media Inquiries</h3>
            <p>Email: press@teztecchbuzz.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Press;
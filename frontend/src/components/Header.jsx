import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTopics = () => {
    setTopicsOpen(!topicsOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stories?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSubscribeClick = () => {
    setShowSubscribeModal(true);
    setSubscribeMessage('');
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (subscribeEmail && subscribeEmail.includes('@')) {
      setSubscribeMessage('Thank you for subscribing! Check your inbox for confirmation.');
      setTimeout(() => {
        setShowSubscribeModal(false);
        setSubscribeEmail('');
        setSubscribeMessage('');
      }, 2000);
    } else {
      setSubscribeMessage('Please enter a valid email address.');
    }
  };

  return (
    <header className="header">
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="25" cy="25" r="25" fill="#00BFA5"/>
                  <path d="M25 10 L25 30 M18 23 L25 16 L32 23" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-title">TEZTECCH</span>
                <span className="logo-subtitle">BUZZ</span>
                <span className="logo-tagline">Creating Positive Change Through Stories</span>
              </div>
            </Link>
            
            <nav className="main-nav">
              <Link to="/stories">STORIES</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/brand-campaigns">BRAND CAMPAIGNS</Link>
              <Link to="/advertise">ADVERTISE WITH US</Link>
            </nav>

            <div className="header-actions">
              <form className="search-box" onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search stories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-btn" aria-label="Search">
                  🔍
                </button>
              </form>
              <button className="subscribe-btn" onClick={handleSubscribeClick}>SUBSCRIBE</button>
              <button className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`sidebar-menu ${menuOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          <button className="close-sidebar" onClick={() => setMenuOpen(false)}>✕</button>
          <ul className="sidebar-nav">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
            <li className="topics-menu">
              <div className="topics-header" onClick={toggleTopics}>
                <span>TOPICS</span>
                <span className="topics-icon">{topicsOpen ? '−' : '+'}</span>
              </div>
              {topicsOpen && (
                <ul className="topics-submenu">
                  <li><Link to="/stories?category=sustainability" onClick={() => setMenuOpen(false)}>Sustainability</Link></li>
                  <li><Link to="/stories?category=startup" onClick={() => setMenuOpen(false)}>Startup</Link></li>
                  <li><Link to="/stories?category=travel" onClick={() => setMenuOpen(false)}>Travel</Link></li>
                  <li><Link to="/stories?category=farming" onClick={() => setMenuOpen(false)}>Farming</Link></li>
                  <li><Link to="/stories?category=education" onClick={() => setMenuOpen(false)}>Education</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
            <li><Link to="/stories" onClick={() => setMenuOpen(false)}>STORIES</Link></li>
            <li><Link to="/our-impact" onClick={() => setMenuOpen(false)}>OUR IMPACT</Link></li>
            <li><Link to="/brand-campaigns" onClick={() => setMenuOpen(false)}>BRAND CAMPAIGNS</Link></li>
            <li><Link to="/watch-videos" onClick={() => setMenuOpen(false)}>WATCH INSPIRING VIDEOS</Link></li>
            <li><Link to="/advertise" onClick={() => setMenuOpen(false)}>ADVERTISE WITH US</Link></li>
          </ul>
          
          <div className="sidebar-newsletter">
            <h3>Fill your inbox with positivity!</h3>
            <p>The Better India Weekly Digest</p>
            <form className="sidebar-newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="sidebar-subscribe-btn">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <>
          <div className="subscribe-overlay" onClick={() => setShowSubscribeModal(false)}></div>
          <div className="subscribe-modal">
            <button className="close-modal" onClick={() => setShowSubscribeModal(false)}>✕</button>
            <h2>Subscribe to TezTecch Buzz</h2>
            <p>Get the latest inspiring stories delivered to your inbox!</p>
            <form onSubmit={handleSubscribeSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
              />
              <button type="submit" className="modal-subscribe-btn">SUBSCRIBE NOW</button>
            </form>
            {subscribeMessage && (
              <div className={`subscribe-message ${subscribeMessage.includes('Thank you') ? 'success' : 'error'}`}>
                {subscribeMessage}
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

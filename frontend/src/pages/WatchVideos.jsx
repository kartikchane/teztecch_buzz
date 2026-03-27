import React from 'react';
import { Link } from 'react-router-dom';
import './WatchVideos.css';
import '../components/BackToHome.css';

const WatchVideos = () => {

  const allVideos = [
    {
      id: 1,
      title: "Solar Power Revolution in Remote Indian Villages",
      slug: "solar-power-villages",
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      category: "Sustainability",
      categorySlug: "sustainability",
      description: "How renewable energy is transforming rural communities",
      views: "125K",
      duration: "8:45",
      date: "Dec 25, 2025"
    },
    {
      id: 2,
      title: "Crafting Success: Revival of Traditional Indian Handicrafts",
      slug: "handicraft-revival",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      category: "Culture",
      categorySlug: "culture",
      description: "Master artisans keeping ancient crafts alive",
      views: "98K",
      duration: "12:30",
      date: "Dec 20, 2025"
    },
    {
      id: 3,
      title: "From Garage to Glory: India's Startup Success Stories",
      slug: "startup-success",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      category: "Business",
      categorySlug: "business",
      description: "Young entrepreneurs building tomorrow's unicorns",
      views: "156K",
      duration: "15:20",
      date: "Dec 15, 2025"
    },
    {
      id: 4,
      title: "India's First Solar-Powered Village",
      slug: "solar-village",
      thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      category: "Sustainability",
      categorySlug: "sustainability",
      description: "Complete energy independence through solar power",
      views: "145K",
      duration: "10:15",
      date: "Dec 10, 2025"
    },
    {
      id: 5,
      title: "Indian Tech Startup Making Global Impact",
      slug: "tech-startup",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      category: "Technology",
      categorySlug: "technology",
      description: "Innovation that's changing the world",
      views: "112K",
      duration: "11:40",
      date: "Dec 5, 2025"
    },
    {
      id: 6,
      title: "Revolutionary Education Model Transforming Rural India",
      slug: "education-revolution",
      thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      category: "Education",
      categorySlug: "education",
      description: "Bringing quality education to remote villages",
      views: "178K",
      duration: "13:25",
      date: "Nov 30, 2025"
    },
    {
      id: 7,
      title: "Women Entrepreneurs Breaking Barriers",
      slug: "women-entrepreneurs",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
      category: "Business",
      categorySlug: "business",
      description: "Inspiring stories of women leading change",
      views: "134K",
      duration: "9:50",
      date: "Nov 25, 2025"
    },
    {
      id: 8,
      title: "Organic Farming Revolution in India",
      slug: "organic-farming",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      category: "Agriculture",
      categorySlug: "agriculture",
      description: "How farmers are going chemical-free",
      views: "89K",
      duration: "14:15",
      date: "Nov 20, 2025"
    },
    {
      id: 9,
      title: "Clean Water Solutions for Rural Communities",
      slug: "water-solutions",
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      category: "Sustainability",
      categorySlug: "sustainability",
      description: "Innovative water purification systems",
      views: "102K",
      duration: "7:30",
      date: "Nov 15, 2025"
    },
    {
      id: 10,
      title: "Digital India: Transforming Lives Through Technology",
      slug: "digital-india",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      category: "Technology",
      categorySlug: "technology",
      description: "How digital solutions are bridging the divide",
      views: "167K",
      duration: "16:20",
      date: "Nov 10, 2025"
    }
  ];

  return (
    <div className="watch-videos-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <div className="videos-hero">
        <div className="container">
          <h1>Watch Inspiring Videos</h1>
          <p>Discover powerful stories through our curated video collection</p>
        </div>
      </div>

      <div className="container">
        <div className="videos-grid">
          {allVideos.map((video) => (
            <Link to={`/video/${video.slug}`} key={video.id} className="video-card">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="white" width="60" height="60">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <span className="video-duration">{video.duration}</span>
              </div>
              <div className="video-info">
                <span className="video-category">{video.category}</span>
                <h3>{video.title}</h3>
                <p className="video-description">{video.description}</p>
                <div className="video-meta">
                  <span className="views">{video.views} views</span>
                  <span className="date">{video.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchVideos;

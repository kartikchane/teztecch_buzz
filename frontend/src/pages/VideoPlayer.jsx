import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VideoPlayer.css';
import '../components/BackToHome.css';

const VideoPlayer = () => {
  const { slug } = useParams();
  const [relatedVideosCount, setRelatedVideosCount] = useState(3);

  const videos = {
    'solar-power-villages': {
      title: "Solar Power Revolution in Remote Indian Villages",
      category: "Sustainability",
      views: "125K",
      date: "December 25, 2025",
      duration: "8:45",
      videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      description: "Discover how renewable energy is transforming rural communities across India. This inspiring documentary follows the journey of remote villages as they transition to clean, sustainable solar power, bringing electricity and hope to thousands of families.",
      longDescription: "In the remote corners of India, where the national grid has never reached, a quiet revolution is taking place. Villages that have lived in darkness for generations are now powered by the sun. This comprehensive look at India's solar revolution showcases the impact of renewable energy on rural development, education, and quality of life. From solar-powered water pumps to street lights and home electrification, witness the transformation firsthand.",
      tags: ["Solar Energy", "Rural Development", "Sustainability", "Clean Energy", "Innovation"]
    },
    'handicraft-revival': {
      title: "Crafting Success: Revival of Traditional Indian Handicrafts",
      category: "Culture",
      views: "98K",
      date: "December 20, 2025",
      duration: "12:30",
      videoUrl: "https://www.youtube.com/embed/ixmxOlcrlUc",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      description: "Master artisans keeping ancient crafts alive through innovation and dedication. Journey through India's rich handicraft heritage and meet the talented craftspeople preserving centuries-old traditions.",
      longDescription: "India's handicraft industry is experiencing a renaissance. Meet master artisans who are breathing new life into traditional crafts like pottery, weaving, wood carving, and metalwork. These skilled craftspeople are not just preserving ancient techniques – they're innovating, adapting, and finding new markets for their timeless creations. Through their dedication and creativity, they're ensuring that India's rich cultural heritage thrives in the modern world.",
      tags: ["Handicrafts", "Traditional Arts", "Culture", "Heritage", "Artisans"]
    },
    'startup-success': {
      title: "From Garage to Glory: India's Startup Success Stories",
      category: "Business",
      views: "156K",
      date: "December 15, 2025",
      duration: "15:20",
      videoUrl: "https://www.youtube.com/embed/9No-FiEInLA",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      description: "Young entrepreneurs building tomorrow's unicorns from humble beginnings. Explore the inspiring journeys of India's most successful startups and the visionaries behind them.",
      longDescription: "India's startup ecosystem is booming, and this documentary takes you inside the stories of entrepreneurs who started with nothing but an idea and built multi-million dollar companies. From tech innovations to social enterprises, these founders share their struggles, triumphs, and lessons learned on the path to success. Discover what it takes to build a startup in India's dynamic business landscape.",
      tags: ["Startups", "Entrepreneurship", "Business", "Innovation", "Success Stories"]
    },
    'solar-village': {
      title: "India's First Solar-Powered Village",
      category: "Sustainability",
      views: "145K",
      date: "December 10, 2025",
      duration: "10:15",
      videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
      thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      description: "The incredible story of how an entire village became energy independent through solar power.",
      longDescription: "Dharnai, a small village in Bihar, made history by becoming India's first fully solar-powered village. This documentary captures the transformation – from living without electricity for three decades to enjoying 24/7 clean power. See how solar microgrids are changing lives, powering schools, health centers, and businesses.",
      tags: ["Solar Power", "Village Development", "Clean Energy", "Rural India"]
    },
    'tech-startup': {
      title: "Indian Tech Startup Making Global Impact",
      category: "Technology",
      views: "112K",
      date: "December 5, 2025",
      duration: "11:40",
      videoUrl: "https://www.youtube.com/embed/9No-FiEInLA",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      description: "Meet the entrepreneurs changing the world with innovative technology solutions.",
      longDescription: "This is the story of a tech startup from Bangalore that's making waves globally. From AI-powered solutions to innovative SaaS products, discover how Indian tech companies are competing on the world stage and solving real-world problems.",
      tags: ["Technology", "Startups", "AI", "Global Impact"]
    },
    'education-revolution': {
      title: "Revolutionary Education Model Transforming Rural India",
      category: "Education",
      views: "178K",
      date: "November 30, 2025",
      duration: "13:25",
      videoUrl: "https://www.youtube.com/embed/o8NPllzkFhE",
      thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      description: "How one teacher's innovative approach is bringing quality education to remote villages.",
      longDescription: "Meet the teachers and educators who are revolutionizing learning in rural India. Using technology, innovative teaching methods, and community engagement, they're ensuring that every child has access to quality education, regardless of their location or economic background.",
      tags: ["Education", "Rural Development", "Innovation", "Teachers", "Learning"]
    }
  };

  const video = videos[slug] || videos['solar-power-villages'];
  
  // Filter related videos by the same category
  const relatedVideos = Object.entries(videos)
    .filter(([key, vid]) => key !== slug && vid.category === video.category)
    .slice(0, relatedVideosCount);

  return (
    <div className="video-player-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/watch-videos">Videos</Link>
          <span>›</span>
          <span>{video.title}</span>
        </div>

        <div className="video-main-section">
          <div className="video-player-wrapper">
            <div className="video-container">
              <iframe
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-details">
              <div className="video-header">
                <h1>{video.title}</h1>
                <div className="video-actions">
                  <button className="action-btn like-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="action-btn share-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="video-meta">
                <span className="category-badge">{video.category}</span>
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {video.views} views
                </span>
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {video.duration}
                </span>
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {video.date}
                </span>
              </div>

              <div className="video-description">
                <h3>About this video</h3>
                <p className="short-desc">{video.description}</p>
                <p className="long-desc">{video.longDescription}</p>
              </div>

              <div className="video-tags">
                {video.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="related-videos-section">
              <h2>Related Videos</h2>
              <div className="related-videos-list">
                {relatedVideos.map(([key, vid]) => (
                  <Link to={`/video/${key}`} key={key} className="related-video-card">
                    <div className="related-thumbnail">
                      <img src={vid.thumbnail} alt={vid.title} />
                      <span className="duration">{vid.duration}</span>
                      <div className="play-icon">
                        <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="related-info">
                      <h4>{vid.title}</h4>
                      <p className="related-meta">
                        <span className="category">{vid.category}</span>
                        <span>{vid.views} views</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {relatedVideosCount < Object.keys(videos).length - 1 && (
                <button 
                  className="load-more-btn"
                  onClick={() => setRelatedVideosCount(prev => prev + 3)}
                >
                  Load More Videos
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

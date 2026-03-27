import React from 'react';
import { Link } from 'react-router-dom';
import './VideoStories.css';

const VideoStories = () => {
  const videos = [
    {
      id: 1,
      category: "INNOVATION",
      title: "The Future of Sustainable Agriculture: Hydroponics in India",
      image1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      image2: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      slug: "hydroponics-india"
    },
    {
      id: 2,
      category: "STARTUPS",
      title: "From Idea to Impact: Journey of a Social Enterprise in Rural India",
      image1: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
      image2: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400",
      slug: "social-enterprise-rural"
    },
    {
      id: 3,
      category: "CULTURE & ARTS",
      title: "Preserving Heritage: The Art of Traditional Indian Dance Forms",
      image1: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=400",
      image2: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400",
      slug: "traditional-dance-forms"
    },
    {
      id: 4,
      category: "ENVIRONMENT",
      title: "Lighting Up Lives: Solar Power Revolution in Remote Indian Villages",
      image1: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      image2: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
      slug: "solar-power-villages"
    },
    {
      id: 5,
      category: "EDUCATION",
      title: "Digital Classrooms: Transforming Rural Education in India",
      image1: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      image2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
      slug: "digital-education-tribal"
    },
    {
      id: 6,
      category: "HEALTHCARE",
      title: "Mobile Clinics: Bringing Healthcare to Remote Villages",
      image1: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      image2: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
      slug: "free-healthcare-villages"
    },
    {
      id: 7,
      category: "WILDLIFE",
      title: "Conservation Heroes: Protecting India's Endangered Species",
      image1: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400",
      image2: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400",
      slug: "india-new-animal-species"
    },
    {
      id: 8,
      category: "WOMEN EMPOWERMENT",
      title: "Breaking Barriers: Women Entrepreneurs in Rural India",
      image1: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400",
      image2: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
      slug: "legal-aid-women"
    },
    {
      id: 9,
      category: "AGRICULTURE",
      title: "Organic Revolution: Farmers Leading the Change",
      image1: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
      image2: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400",
      slug: "tamil-nadu-organic-farm"
    },
    {
      id: 10,
      category: "TECHNOLOGY",
      title: "Tech for Good: Innovations Solving India's Biggest Challenges",
      image1: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      image2: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
      slug: "smart-device-power-saving"
    },
    {
      id: 11,
      category: "WATER",
      title: "Water Warriors: Communities Fighting Water Scarcity",
      image1: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=400",
      image2: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400",
      slug: "rainwater-harvesting"
    },
    {
      id: 12,
      category: "CRAFTS",
      title: "Handmade Heritage: Reviving Traditional Indian Crafts",
      image1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      image2: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400",
      slug: "lake-weed-paper"
    }
  ];

  return (
    <div className="video-stories-page">
      <div className="page-header">
        <h1>
          <span className="title-icon"></span>
          Video Stories
        </h1>
        <p>Watch inspiring documentaries and stories from across India</p>
      </div>

      <div className="container">
        <div className="video-stories-grid">
          {videos.map((video) => (
            <Link to={`/video/${video.slug}`} key={video.id} className="video-story-card">
              <div className="video-story-images">
                <img src={video.image1} alt={video.title} className="video-img-left" />
                <img src={video.image2} alt={video.title} className="video-img-right" />
                <div className="video-play-icon">
                  <svg viewBox="0 0 24 24" fill="white" width="50" height="50">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="video-story-info">
                <span className="video-story-category">{video.category}</span>
                <h3 className="video-story-title">{video.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoStories;

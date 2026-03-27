import React from 'react';
import { Link } from 'react-router-dom';
import './Shorts.css';

const Shorts = () => {
  const shorts = [
    {
      id: 1,
      title: "Solar Power Village Initiative",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      slug: "solar-power-villages"
    },
    {
      id: 2,
      title: "Youth Entrepreneurs Making Change",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
      slug: "startup-success-story"
    },
    {
      id: 3,
      title: "Beautiful Flora of India",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
      slug: "karonda-gardening"
    },
    {
      id: 4,
      title: "Hibiscus Garden Story",
      image: "https://images.unsplash.com/photo-1598880940371-c756e015faf1?w=400",
      slug: "ayurvedic-farming"
    },
    {
      id: 5,
      title: "Rural Education Revolution",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      slug: "digital-education-tribal"
    },
    {
      id: 6,
      title: "Organic Farming Success",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400",
      slug: "ayurvedic-farming"
    },
    {
      id: 7,
      title: "Wildlife Conservation Efforts",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400",
      slug: "india-new-animal-species"
    },
    {
      id: 8,
      title: "Traditional Crafts Revival",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      slug: "lake-weed-paper"
    },
    {
      id: 9,
      title: "Clean Water Initiatives",
      image: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=400",
      slug: "rainwater-harvesting"
    },
    {
      id: 10,
      title: "Women Empowerment Stories",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400",
      slug: "legal-aid-women"
    },
    {
      id: 11,
      title: "Sustainable Agriculture",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
      slug: "tamil-nadu-organic-farm"
    },
    {
      id: 12,
      title: "Community Health Programs",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      slug: "free-healthcare-villages"
    }
  ];

  return (
    <div className="shorts-page">
      <div className="page-header">
        <h1>
          <span className="title-icon"></span>
          Shorts
        </h1>
        <p>Quick video stories that inspire</p>
      </div>

      <div className="container">
        <div className="shorts-grid">
          {shorts.map((short) => (
            <Link to={`/video/${short.slug}`} key={short.id} className="short-card">
              <div className="short-image">
                <img src={short.image} alt={short.title} />
                <div className="play-icon">
                  <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <h3 className="short-title">{short.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shorts;

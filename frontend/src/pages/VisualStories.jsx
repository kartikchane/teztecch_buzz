import React from 'react';
import { Link } from 'react-router-dom';
import './VisualStories.css';

const VisualStories = () => {
  const visualStories = [
    {
      id: 1,
      title: "This Udaipur Man Built His 3-Storey Dream Home Around a 40-Foot Mango Tree",
      date: "July 20, 2025",
      image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      image2: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400",
      slug: "udaipur-mango-tree-house"
    },
    {
      id: 2,
      title: "India Records 683 New Animal Species in One Year & This State Tops The List",
      date: "July 20, 2025",
      image1: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400",
      image2: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400",
      slug: "india-new-animal-species"
    },
    {
      id: 3,
      title: "Meet The Tamil Nadu Woman Who Mortgaged Her Jewellery to Build an Award-Winning Organic Farm",
      date: "July 19, 2025",
      image1: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
      image2: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400",
      slug: "tamil-nadu-organic-farm"
    },
    {
      id: 4,
      title: "IAS Officers Share 8 Tips To Clear UPSC CSE Without Coaching",
      date: "July 19, 2025",
      image1: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
      image2: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      slug: "ias-upsc-tips"
    },
    {
      id: 5,
      title: "How This Bengaluru Couple Converted Their Terrace Into a Mini Forest With 300 Plants",
      date: "July 18, 2025",
      image1: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      image2: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400",
      slug: "bengaluru-terrace-forest"
    },
    {
      id: 6,
      title: "From Waste to Wonder: Artist Creates Stunning Sculptures From Ocean Plastic",
      date: "July 18, 2025",
      image1: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      image2: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400",
      slug: "ocean-plastic-art"
    },
    {
      id: 7,
      title: "Inside India's First Carbon-Neutral Village in Himachal Pradesh",
      date: "July 17, 2025",
      image1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      image2: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      slug: "carbon-neutral-village"
    },
    {
      id: 8,
      title: "The Last Toddy Tapper: Preserving Kerala's Ancient Palm Wine Tradition",
      date: "July 17, 2025",
      image1: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400",
      image2: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      slug: "kerala-toddy-tapper"
    },
    {
      id: 9,
      title: "The Revival of Handloom: How Weavers in Varanasi Are Embracing Digital Marketing",
      date: "July 16, 2025",
      image1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      image2: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400",
      slug: "varanasi-handloom-digital"
    },
    {
      id: 10,
      title: "A Journey Through Ladakh's Hidden Monasteries",
      date: "July 16, 2025",
      image1: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      image2: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      slug: "ladakh-monasteries"
    },
    {
      id: 11,
      title: "How Chennai's Fisherwomen Are Leading the Fight Against Plastic Pollution",
      date: "July 15, 2025",
      image1: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400",
      image2: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=400",
      slug: "chennai-fisherwomen-plastic"
    },
    {
      id: 12,
      title: "The Incredible Story of India's First All-Women Firefighting Squad",
      date: "July 15, 2025",
      image1: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400",
      image2: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400",
      slug: "women-firefighters"
    }
  ];

  return (
    <div className="visual-stories-page">
      <div className="page-header">
        <div className="container">
          <h1>
            <span className="title-icon"></span>
            Visual Stories
          </h1>
          <p>Explore inspiring photo stories from across India</p>
        </div>
      </div>

      <div className="container">
        <div className="visual-stories-grid">
          {visualStories.map((story) => (
            <Link to={`/story/${story.slug}`} key={story.id} className="visual-story-card">
              <div className="visual-story-images">
                <img src={story.image1} alt={story.title} className="visual-img-left" />
                <img src={story.image2} alt={story.title} className="visual-img-right" />
              </div>
              <div className="visual-story-info">
                <span className="visual-story-date">{story.date}</span>
                <h3 className="visual-story-title">{story.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualStories;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Fetch hero slides
        const heroResponse = await fetch(`${API_URL}/public/hero-slides`);
        const heroData = await heroResponse.json();
        if (heroData.success && heroData.data.length > 0) {
          setHeroSlides(heroData.data);
        } else {
          // Fallback hero slides
          setHeroSlides([
            {
              id: 1,
              category: "CHANGEMAKERS",
              title: "Empowering Communities Through Innovation",
              description: "Discover stories of change and transformation",
              author: "TezTecch Team",
              date: "12 Jan, 2026",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
              slug: "empowering-communities-innovation"
            },
            {
              id: 2,
              category: "SUSTAINABILITY",
              title: "Join the Sustainability Movement",
              description: "Learn how you can make a difference",
              author: "TezTecch Team",
              date: "12 Jan, 2026",
              image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
              slug: "sustainability-movement"
            },
            {
              id: 3,
              category: "FARMING",
              title: "Innovation in Agriculture: The Future of Farming",
              description: "How technology is revolutionizing Indian farming",
              author: "TezTecch Team",
              date: "12 Jan, 2026",
              image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200",
              slug: "innovation-agriculture-future"
            }
          ]);
        }

        // Fetch story counts for all categories
        const storiesResponse = await fetch(`${API_URL}/public/stories?limit=1000`);
        const storiesData = await storiesResponse.json();
        
        // All categories with icons
        const allCategories = [
          { name: 'Sustainability', icon: '🌱', slug: 'sustainability' },
          { name: 'Startup', icon: '🚀', slug: 'startup' },
          { name: 'Travel', icon: '✈️', slug: 'travel' },
          { name: 'Farming', icon: '🌾', slug: 'farming' },
          { name: 'Education', icon: '📚', slug: 'education' },
          { name: 'Culture', icon: '🎭', slug: 'culture' },
          { name: 'Health', icon: '💚', slug: 'health' },
          { name: 'Technology', icon: '💻', slug: 'technology' },
          { name: 'Changemakers', icon: '👥', slug: 'changemakers' },
          { name: 'Parenting', icon: '👨‍👩‍👧‍👦', slug: 'parenting' },
          { name: 'Impact', icon: '💪', slug: 'impact' }
        ];
        
        // Count stories per category
        if (storiesData.success) {
          const counts = {};
          storiesData.data.forEach(story => {
            if (story.category) {
              counts[story.category] = (counts[story.category] || 0) + 1;
            }
          });
          
          // Add counts to categories
          const categoriesWithCounts = allCategories.map(cat => ({
            ...cat,
            storyCount: counts[cat.slug] || 0
          }));
          
          setCategories(categoriesWithCounts);
        } else {
          setCategories(allCategories.map(cat => ({ ...cat, storyCount: 0 })));
        }

        // Fetch recent trending stories (last 10 days)
        const trendingResponse = await fetch(`${API_URL}/public/stories?limit=10`);
        const trendingData = await trendingResponse.json();
        if (trendingData.success && trendingData.data.length > 0) {
          setTrendingStories(trendingData.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [heroSlides.length]);

  // Show only first 8 categories on home page
  const displayedCategories = categories.slice(0, 8);

  // Helper function to format story count
  const formatCount = (count) => {
    if (count === 0) return 'No stories yet';
    if (count === 1) return '1 Story';
    return `${count} Stories`;
  };

  // Show only first 3 trending stories on home page initially
  const displayedTrendingStories = showAllTrending ? trendingStories : trendingStories.slice(0, 3);

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribeMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 5000);
    } else {
      setSubscribeMessage('Please enter a valid email address.');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  const featuredVideos = [
    {
      id: 1,
      title: "Solar Power Revolution in Remote Indian Villages",
      description: "How renewable energy is transforming rural communities",
      duration: "8:45",
      views: "125K",
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      slug: "solar-power-villages"
    },
    {
      id: 2,
      title: "Crafting Success: Revival of Traditional Indian Handicrafts",
      description: "Master artisans keeping ancient crafts alive",
      duration: "12:30",
      views: "98K",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      slug: "handicraft-revival"
    },
    {
      id: 3,
      title: "From Garage to Glory: India's Startup Success Stories",
      description: "Young entrepreneurs building tomorrow's unicorns",
      duration: "15:20",
      views: "156K",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      slug: "startup-success"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <div className="container">
                  <span className="hero-category">{slide.category}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="hero-meta">
                    <span>{slide.author}</span>
                    <span>•</span>
                    <span>{slide.date}</span>
                  </div>
                  <Link to={`/story/${slide.slug}`} className="hero-btn">
                    Read Story
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title" style={{ color: '#00BFA5', textAlign: 'center' }}>Explore by Category</h2>
          <div className="categories-grid">
            {displayedCategories.map((category) => (
              <Link to={`/stories?category=${category.slug}`} key={category._id || category.name} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{formatCount(category.storyCount)}</p>
              </Link>
            ))}
          </div>
          <div className="explore-all-wrapper">
            <Link to="/categories" className="explore-all-btn">
              Explore All Categories
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Stories Section */}
      <section className="trending-stories">
        <div className="container">
          <h2 className="section-title">Trending Stories</h2>
          <div className="stories-grid">
            {displayedTrendingStories.map((story) => (
              <Link to={`/story/${story.slug}`} key={story._id || story.slug} className="story-card">
                <img src={story.imageUrl} alt={story.title} className="story-image" />
                <div className="story-content">
                  <span className="story-category">{story.category}</span>
                  <h3>{story.title}</h3>
                  <p className="story-excerpt">{story.description}</p>
                  <div className="story-meta">
                    <span className="story-date">{new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="story-read-time">{story.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {trendingStories.length > 3 && (
            <div className="explore-all-wrapper">
              {!showAllTrending ? (
                <button onClick={() => setShowAllTrending(true)} className="explore-all-btn">
                  View More Trending Stories
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ) : (
                <button onClick={() => setShowAllTrending(false)} className="explore-all-btn">
                  Show Less
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Watch Videos Section */}
      <section className="video-stories-section">
        <div className="container">
          <div className="section-header-with-description">
            <h2 className="section-title">Watch Inspiring Videos</h2>
            <p className="section-description">Discover powerful stories through our curated video collection</p>
          </div>
          <div className="videos-grid">
            {featuredVideos.map((video) => (
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
                  <h3>{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span className="views">{video.views} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="explore-all-wrapper">
            <Link to="/watch-videos" className="explore-all-btn watch-all-btn">
              <span>WATCH ALL VIDEOS</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Get Inspired Daily</h2>
              <p>Subscribe to receive positive stories and news directly in your inbox</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
            {subscribeMessage && (
              <div className={`subscribe-message ${subscribeMessage.includes('Thank') ? 'success' : 'error'}`}>
                {subscribeMessage}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title stats-title">Impact by Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Stories Published</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Changemakers Featured</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Videos Created</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

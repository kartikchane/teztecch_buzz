import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import '../components/BackToHome.css';

const Categories = () => {
  const [storyCounts, setStoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    { name: 'Environment', icon: '🌍', slug: 'environment' },
    { name: 'Innovation', icon: '💡', slug: 'innovation' },
    { name: 'Social Impact', icon: '🤝', slug: 'social-impact' },
    { name: 'Women Power', icon: '👩', slug: 'women-power' },
    { name: 'Food', icon: '🍲', slug: 'food' },
    { name: 'Sports', icon: '⚽', slug: 'sports' },
    { name: 'Art', icon: '🎨', slug: 'art' },
    { name: 'Music', icon: '🎵', slug: 'music' },
    { name: 'Wildlife', icon: '🦁', slug: 'wildlife' },
    { name: 'Science', icon: '🔬', slug: 'science' },
    { name: 'Architecture', icon: '🏛️', slug: 'architecture' },
    { name: 'Heritage', icon: '🏰', slug: 'heritage' },
    { name: 'Handicraft', icon: '🧵', slug: 'handicraft' },
    { name: 'Fashion', icon: '👗', slug: 'fashion' },
    { name: 'Photography', icon: '📷', slug: 'photography' },
    { name: 'Literature', icon: '📖', slug: 'literature' },
    { name: 'Community', icon: '👥', slug: 'community' },
    { name: 'Youth', icon: '🎓', slug: 'youth' },
    { name: 'Elderly Care', icon: '👴', slug: 'elderly-care' },
    { name: 'Animal Welfare', icon: '🐕', slug: 'animal-welfare' },
    { name: 'Wellness', icon: '🧘', slug: 'wellness' },
    { name: 'Adventure', icon: '🏔️', slug: 'adventure' },
    { name: 'Changemakers', icon: '👥', slug: 'changemakers' },
    { name: 'Parenting', icon: '👨‍👩‍👧‍👦', slug: 'parenting' },
    { name: 'Impact', icon: '💪', slug: 'impact' }
  ];

  useEffect(() => {
    fetchStoryCounts();
  }, []);

  const fetchStoryCounts = async () => {
    try {
      setError(null);
      // Fetch all stories to count by category
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/public/stories?limit=1000`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Count stories per category
        const counts = {};
        data.data.forEach(story => {
          if (story.category) {
            counts[story.category] = (counts[story.category] || 0) + 1;
          }
        });
        setStoryCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching story counts:', error);
      setError('Failed to load categories. Using default data.');
      // Set empty counts so page still shows
      setStoryCounts({});
    } finally {
      setLoading(false);
    }
  };

  const formatCount = (slug) => {
    const count = storyCounts[slug] || 0;
    if (count === 0) return '0 Stories';
    if (count === 1) return '1 Story';
    return `${count} Stories`;
  };

  return (
    <div className="categories-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <div className="categories-header">
        <div className="container">
          <h1>All Categories</h1>
          <p>Discover inspiring stories across all our categories</p>
        </div>
      </div>

      <section className="all-categories-section">
        <div className="container">
          {error && (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: '#fff3cd', 
              color: '#856404',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#00BFA5' }}>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading categories...</p>
            </div>
          ) : (
            <div className="all-categories-grid">
              {allCategories.map((category) => (
                <Link 
                  to={`/stories?category=${category.slug}`} 
                  key={category.slug} 
                  className="category-card"
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{formatCount(category.slug)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;

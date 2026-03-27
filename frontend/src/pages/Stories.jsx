import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Stories.css';
import '../components/BackToHome.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Stories = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [loading, setLoading] = useState(true);
  const [visibleStories, setVisibleStories] = useState(50); // Show all stories initially

  // Generate 10 stories for each category
  const generateStories = () => {
    const categoryData = [
      { name: 'sustainability', displayName: 'Sustainability', topics: ['Solar Energy Villages', 'Waste to Wealth', 'Green Buildings', 'Water Conservation', 'Eco Products', 'Wind Energy', 'Sustainable Farming', 'Carbon Neutral', 'Zero Waste', 'Climate Action'] },
      { name: 'startup', displayName: 'Startup', topics: ['Tech Innovation', 'Rural Startup', 'E-commerce Success', 'Fintech Revolution', 'Health Startup', 'EdTech Platform', 'AgriTech Solution', 'Social Enterprise', 'Food Delivery', 'Green Startup'] },
      { name: 'travel', displayName: 'Travel', topics: ['Hidden Himalayas', 'Coastal Karnataka', 'Northeast Magic', 'Desert Safari', 'Temple Trails', 'Heritage Walks', 'Mountain Treks', 'Beach Paradise', 'Wildlife Safari', 'Road Trip Stories'] },
      { name: 'farming', displayName: 'Farming', topics: ['Organic Revolution', 'Smart Irrigation', 'Crop Innovation', 'Dairy Success', 'Hydroponics Farm', 'Natural Farming', 'Food Processing', 'Farm Technology', 'Sustainable Agri', 'Urban Farming'] },
      { name: 'education', displayName: 'Education', topics: ['Digital Learning', 'Rural Schools', 'STEM Programs', 'Skill Development', 'Free Education', 'Scholarship Stories', 'Teacher Heroes', 'Library Movement', 'Learning Apps', 'Vocational Training'] },
      { name: 'culture', displayName: 'Culture', topics: ['Traditional Arts', 'Folk Music', 'Classical Dance', 'Handicrafts', 'Theater Revival', 'Cinema Stories', 'Literature Fest', 'Cultural Festival', 'Museums', 'Heritage Conservation'] },
      { name: 'health', displayName: 'Health', topics: ['Healthcare Access', 'Mental Wellness', 'Nutrition Drive', 'Fitness Movement', 'Ayurveda Revival', 'Meditation Centers', 'Preventive Care', 'Holistic Health', 'Sports Medicine', 'Wellness Programs'] },
      { name: 'technology', displayName: 'Technology', topics: ['5G Revolution', 'IoT Solutions', 'Cloud Innovation', 'Cybersecurity', 'Mobile Apps', 'AI Solutions', 'Blockchain Tech', 'Quantum Computing', 'AR VR', 'Big Data Analytics'] },
      { name: 'environment', displayName: 'Environment', topics: ['Forest Conservation', 'Wildlife Protection', 'Ocean Cleanup', 'Air Quality', 'Pollution Control', 'Biodiversity', 'Tree Planting', 'River Restoration', 'Habitat Care', 'Climate Action'] },
      { name: 'innovation', displayName: 'Innovation', topics: ['Tech Breakthrough', 'Smart Solutions', 'Medical Innovation', 'Clean Technology', 'Space Innovation', 'Green Innovation', 'Social Innovation', 'Design Thinking', 'Robotics', 'Future Tech'] },
      { name: 'social-impact', displayName: 'Social Impact', topics: ['Community Development', 'Poverty Alleviation', 'Social Justice', 'Inclusive Society', 'NGO Stories', 'Rural Development', 'Urban Planning', 'Public Policy', 'Civic Engagement', 'Change Makers'] },
      { name: 'women-power', displayName: 'Women Power', topics: ['Women Leaders', 'Self Help Groups', 'Skill Training', 'Women Entrepreneurs', 'Education Access', 'Safety Initiatives', 'Political Leaders', 'Economic Freedom', 'Legal Rights', 'Health Programs'] },
      { name: 'food', displayName: 'Food', topics: ['Healthy Eating', 'Local Cuisine', 'Nutrition Programs', 'Food Security', 'Organic Food', 'Street Food', 'Recipe Innovation', 'Food Waste', 'Superfoods', 'Culinary Arts'] },
      { name: 'sports', displayName: 'Sports', topics: ['Cricket Stars', 'Olympic Heroes', 'Grassroots Sports', 'Para Athletes', 'Women in Sports', 'Traditional Games', 'Sports Infrastructure', 'Coaching Programs', 'Youth Training', 'Sports Technology'] },
      { name: 'art', displayName: 'Art', topics: ['Contemporary Art', 'Street Art', 'Installation Art', 'Art Galleries', 'Art Education', 'Digital Art', 'Sculpture', 'Painting', 'Art Festivals', 'Artist Stories'] },
      { name: 'music', displayName: 'Music', topics: ['Classical Music', 'Folk Songs', 'Indie Artists', 'Music Festivals', 'Music Education', 'Traditional Instruments', 'Music Therapy', 'Concert Stories', 'Music Production', 'Young Musicians'] },
      { name: 'wildlife', displayName: 'Wildlife', topics: ['Conservation Projects', 'Animal Rescue', 'Endangered Species', 'Wildlife Sanctuaries', 'Marine Life', 'Bird Conservation', 'Tiger Reserve', 'Wildlife Photography', 'Habitat Protection', 'Animal Welfare'] },
      { name: 'science', displayName: 'Science', topics: ['Research Breakthrough', 'Space Exploration', 'Scientific Discovery', 'Lab Innovation', 'Science Education', 'Climate Science', 'Material Science', 'Neuroscience', 'Physics Advance', 'Chemistry Solutions'] },
      { name: 'architecture', displayName: 'Architecture', topics: ['Modern Buildings', 'Green Architecture', 'Heritage Restoration', 'Urban Design', 'Sustainable Design', 'Innovative Structures', 'Smart Cities', 'Architecture Awards', 'Design Excellence', 'Future Architecture'] },
      { name: 'heritage', displayName: 'Heritage', topics: ['Ancient Monuments', 'Heritage Sites', 'Cultural Heritage', 'Restoration Projects', 'UNESCO Sites', 'Historic Cities', 'Archaeological Finds', 'Heritage Tourism', 'Conservation Efforts', 'Living Heritage'] },
      { name: 'handicraft', displayName: 'Handicraft', topics: ['Traditional Crafts', 'Artisan Stories', 'Handloom Weaving', 'Pottery Art', 'Metalwork', 'Wood Carving', 'Textile Crafts', 'Craft Villages', 'Craft Revival', 'Artisan Cooperatives'] },
      { name: 'fashion', displayName: 'Fashion', topics: ['Sustainable Fashion', 'Designer Stories', 'Fashion Weeks', 'Textile Innovation', 'Traditional Wear', 'Fashion Startups', 'Eco Fashion', 'Fashion Education', 'Fashion Technology', 'Style Icons'] },
      { name: 'photography', displayName: 'Photography', topics: ['Wildlife Photography', 'Portrait Stories', 'Street Photography', 'Landscape Art', 'Documentary Photo', 'Photography Awards', 'Photo Exhibitions', 'Photography Education', 'Digital Photography', 'Photo Journalism'] },
      { name: 'literature', displayName: 'Literature', topics: ['Book Festivals', 'Author Stories', 'Poetry Revival', 'Publishing Stories', 'Reading Initiatives', 'Literary Awards', 'Writing Workshops', 'Book Clubs', 'Digital Publishing', 'Young Writers'] },
      { name: 'community', displayName: 'Community', topics: ['Community Centers', 'Social Cohesion', 'Neighborhood Stories', 'Community Gardens', 'Local Heroes', 'Community Events', 'Volunteer Groups', 'Community Development', 'Local Initiatives', 'Citizen Action'] },
      { name: 'youth', displayName: 'Youth', topics: ['Youth Leaders', 'Student Innovations', 'Campus Stories', 'Youth Movements', 'Young Entrepreneurs', 'Youth Empowerment', 'College Initiatives', 'Youth Activism', 'Career Stories', 'Youth Programs'] },
      { name: 'elderly-care', displayName: 'Elderly Care', topics: ['Senior Citizens', 'Healthcare for Elderly', 'Old Age Homes', 'Active Aging', 'Elderly Empowerment', 'Pension Programs', 'Senior Services', 'Geriatric Care', 'Elderly Rights', 'Age-Friendly Cities'] },
      { name: 'animal-welfare', displayName: 'Animal Welfare', topics: ['Pet Adoption', 'Animal Shelters', 'Stray Care', 'Animal Rights', 'Veterinary Care', 'Animal Rescue', 'Pet Stories', 'Animal Protection', 'Pet Therapy', 'Wildlife Rescue'] },
      { name: 'wellness', displayName: 'Wellness', topics: ['Yoga Practice', 'Meditation Centers', 'Wellness Retreats', 'Holistic Healing', 'Stress Relief', 'Mindfulness', 'Wellness Programs', 'Natural Therapy', 'Wellness Tourism', 'Mental Peace'] },
      { name: 'adventure', displayName: 'Adventure', topics: ['Mountain Climbing', 'River Rafting', 'Trekking Stories', 'Adventure Sports', 'Rock Climbing', 'Paragliding', 'Scuba Diving', 'Adventure Tourism', 'Extreme Sports', 'Adventure Camps'] }
    ];

    const stories = [];
    let id = 1;
    const images = [
      'photo-1542601906990-b4d3fb778b09', 'photo-1544735716-392fe2489ffa', 'photo-1600585154340-be6161a56a0c',
      'photo-1434030216411-0b793f4b4173', 'photo-1481627834876-b7833e8f5570', 'photo-1503676260728-1c00da094a0b',
      'photo-1576091160399-112ba8d25d1d', 'photo-1535957998253-26ae1ef29506', 'photo-1512941937669-90a1b58e7e9c',
      'photo-1507003211169-0a1dd7228f2d', 'photo-1558618666-fcd25c85cd64', 'photo-1556910103-1c02745aae4d',
      'photo-1506905925346-21bda4d32df4', 'photo-1469474968028-56623f02e42e', 'photo-1531206715517-5c0ba140b2b8',
      'photo-1544367567-0f2fcb009e0b', 'photo-1505751172876-fa1923c5c528', 'photo-1509391366360-2e959784a276',
      'photo-1464226184884-fa280b87c399', 'photo-1625246333195-78d9c38ad449', 'photo-1573496359142-b8d87734a5a2',
      'photo-1551836022-d5d88e9218df', 'photo-1582750433449-648ed127bb54', 'photo-1506126613408-eca07ce68773'
    ];

    categoryData.forEach((cat, catIndex) => {
      cat.topics.forEach((topic, topicIndex) => {
        const imageIndex = (catIndex * 10 + topicIndex) % images.length;
        stories.push({
          id: id++,
          title: `${topic}: An Inspiring Story from India`,
          slug: `${cat.name}-${topic.toLowerCase().replace(/\s+/g, '-')}`,
          excerpt: `Discover how ${topic.toLowerCase()} is making a real difference in communities across India. An inspiring journey of change and innovation that's transforming lives.`,
          image: `https://images.unsplash.com/${images[imageIndex]}?w=800`,
          category: cat.displayName,
          categorySlug: cat.name,
          date: `December ${28 - (topicIndex % 28)}, 2025`,
          readTime: `${4 + (topicIndex % 5)} min read`
        });
      });
    });

    return stories;
  };

  const fallbackStories = generateStories();

  const fallbackCategories = [
    { id: 1, name: "Sustainability", slug: "sustainability" },
    { id: 2, name: "Startup", slug: "startup" },
    { id: 3, name: "Travel", slug: "travel" },
    { id: 4, name: "Farming", slug: "farming" },
    { id: 5, name: "Education", slug: "education" },
    { id: 6, name: "Culture", slug: "culture" },
    { id: 7, name: "Health", slug: "health" },
    { id: 8, name: "Technology", slug: "technology" },
    { id: 9, name: "Environment", slug: "environment" },
    { id: 10, name: "Innovation", slug: "innovation" },
    { id: 11, name: "Social Impact", slug: "social-impact" },
    { id: 12, name: "Women Power", slug: "women-power" },
    { id: 13, name: "Food", slug: "food" },
    { id: 14, name: "Sports", slug: "sports" },
    { id: 15, name: "Art", slug: "art" },
    { id: 16, name: "Music", slug: "music" },
    { id: 17, name: "Wildlife", slug: "wildlife" },
    { id: 18, name: "Science", slug: "science" },
    { id: 19, name: "Architecture", slug: "architecture" },
    { id: 20, name: "Heritage", slug: "heritage" },
    { id: 21, name: "Handicraft", slug: "handicraft" },
    { id: 22, name: "Fashion", slug: "fashion" },
    { id: 23, name: "Photography", slug: "photography" },
    { id: 24, name: "Literature", slug: "literature" },
    { id: 25, name: "Community", slug: "community" },
    { id: 26, name: "Youth", slug: "youth" },
    { id: 27, name: "Elderly Care", slug: "elderly-care" },
    { id: 28, name: "Animal Welfare", slug: "animal-welfare" },
    { id: 29, name: "Wellness", slug: "wellness" },
    { id: 30, name: "Adventure", slug: "adventure" }
  ];

  useEffect(() => {
    fetchStories();
  }, [activeCategory]);

  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
      setVisibleStories(50); // Show all stories when category changes
    }
  }, [categoryParam]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      console.log('Fetching stories from:', `${API_URL}/public/stories?limit=300`);
      const storiesRes = await fetch(`${API_URL}/public/stories?limit=300`);
      const storiesData = await storiesRes.json();
      console.log('Stories data received:', storiesData);
      if (storiesData.success && storiesData.data.length > 0) {
        // Map backend data to match frontend structure
        const mappedStories = storiesData.data.map(story => ({
          id: story._id,
          title: story.title,
          slug: story.slug,
          excerpt: story.description || story.excerpt,
          image: story.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
          category: story.category.charAt(0).toUpperCase() + story.category.slice(1),
          categorySlug: story.category,
          date: new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: `${story.readTime || 5} min read`
        }));
        console.log('Mapped stories with images:', mappedStories.map(s => ({ title: s.title, image: s.image })));
        setStories(mappedStories);
      } else {
        console.log('No stories from backend');
        setStories([]);
      }

      const catRes = await fetch(`${API_URL}/public/categories`);
      const catData = await catRes.json();
      if (catData.success) {
        setCategories(catData.data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const displayStories = stories;
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  const activeCategoryName = searchQuery 
    ? `Search Results for "${searchQuery}"` 
    : (activeCategory === 'all' 
      ? 'All Stories' 
      : displayCategories.find(cat => cat.slug === activeCategory)?.name || activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace(/-/g, ' '));

  let filteredStories = activeCategory === 'all' 
    ? displayStories 
    : displayStories.filter(story => story.categorySlug === activeCategory || story.category.toLowerCase() === activeCategory.toLowerCase());

  // Apply search filter if search query exists
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredStories = displayStories.filter(story => 
      story.title.toLowerCase().includes(lowerQuery) || 
      story.excerpt.toLowerCase().includes(lowerQuery) ||
      story.category.toLowerCase().includes(lowerQuery)
    );
  }

  const paginatedStories = filteredStories.slice(0, visibleStories);

  const handleLoadMore = () => {
    setVisibleStories(prev => prev + 10);
  };

  return (
    <div className="stories-page">
      <Link to="/" className="back-to-home-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      <div className="stories-header">
        <h1>{activeCategoryName}</h1>
        <p>Inspiring stories that make a difference across India</p>
      </div>

      <div className="stories-container">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading stories...</p>
          </div>
        ) : paginatedStories.length > 0 ? (
          <>
            <div className="stories-grid">
              {paginatedStories.map((story) => {
                const categoryDisplay = displayCategories.find(cat => cat.slug === story.categorySlug)?.name || story.category;
                return (
                  <Link to={`/story/${story.slug}`} key={story.id} className="story-card">
                    <img src={story.image} alt={story.title} className="story-card-image" />
                    <div className="story-card-content">
                      <span className="story-card-category">{categoryDisplay}</span>
                      <h3 className="story-card-title">{story.title}</h3>
                      <p className="story-card-excerpt">{story.excerpt}</p>
                      <div className="story-card-meta">
                        <span className="story-card-date">{story.date}</span>
                        <span className="story-card-read-time">{story.readTime}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {visibleStories < filteredStories.length && (
              <div className="stories-load-more">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More Stories ({filteredStories.length - visibleStories} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-stories">
            <h3>No stories found in this category</h3>
            <p>Try selecting a different category or view all stories</p>
            <button onClick={() => {
              setActiveCategory('all');
              setVisibleStories(50);
            }} className="load-more-btn" style={{ marginTop: '20px' }}>
              View All Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;

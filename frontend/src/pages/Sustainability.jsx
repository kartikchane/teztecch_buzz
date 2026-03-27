import React from 'react';
import { Link } from 'react-router-dom';
import './Sustainability.css';

const Sustainability = () => {
  const stories = [
    {
      id: 1,
      title: "This Jharkhand Village Cut Crop Losses with Solar Tech — Now It's a Model for 12 Districts",
      date: "29 JUL 2025",
      readTime: "16 MIN READ",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      slug: "jharkhand-solar-tech-village"
    },
    {
      id: 2,
      title: "9 Key Steps India Can Take for a Fair & Inclusive Clean Energy Future",
      date: "29 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
      slug: "india-clean-energy-steps"
    },
    {
      id: 3,
      title: "This Bengaluru Startup Built a Machine That Turns Waste Into Nutrient-Rich Compost in Just 8 Hours",
      date: "29 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      slug: "bengaluru-waste-compost-machine"
    },
    {
      id: 4,
      title: "3 Indian Structures That Replaced Concrete — One's a Bunker Built From Plastic Waste at 14000 Ft",
      date: "29 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      slug: "plastic-waste-structures-india"
    },
    {
      id: 5,
      title: "How This Engineer's Innovation is Helping Villages Store Rainwater Underground",
      date: "28 JUL 2025",
      readTime: "10 MIN READ",
      image: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=400",
      slug: "rainwater-harvesting"
    },
    {
      id: 6,
      title: "Meet the 73-Year-Old Who Has Planted Over 150,000 Trees in 15 Years",
      date: "28 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      slug: "tree-planting-legacy"
    },
    {
      id: 7,
      title: "From Waste to Wonder: Artist Creates Stunning Sculptures From Ocean Plastic",
      date: "27 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
      slug: "ocean-plastic-art"
    },
    {
      id: 8,
      title: "This Kerala Village Achieved Carbon Neutrality — Here's Their Secret",
      date: "27 JUL 2025",
      readTime: "9 MIN READ",
      image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=400",
      slug: "carbon-neutral-village"
    },
    {
      id: 9,
      title: "Zero Waste Living: How This Bengaluru Family Produces Almost No Trash",
      date: "26 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      slug: "zero-waste-family"
    },
    {
      id: 10,
      title: "The Tribal Collective's Organic Honey Business Worth ₹5 Crore Today",
      date: "26 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
      slug: "tribal-honey"
    },
    {
      id: 11,
      title: "How 100 km of Roads Were Built Using Plastic Waste in India",
      date: "25 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400",
      slug: "plastic-road"
    },
    {
      id: 12,
      title: "25-YO Trains 150 Women to Turn Lake Weed Into Sustainable Handmade Paper",
      date: "25 JUL 2025",
      readTime: "9 MIN READ",
      image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=400",
      slug: "lake-weed-paper"
    }
  ];

  return (
    <div className="sustainability-page">
      <div className="page-header">
        <h1>
          <span className="title-icon"></span>
          Sustainability
        </h1>
        <p>Stories of environmental innovation and green initiatives</p>
      </div>

      <div className="container">
        <div className="sustainability-grid">
          {stories.map((story) => (
            <Link to={`/story/${story.slug}`} key={story.id} className="sustainability-card">
              <div className="sustainability-content">
                <span className="sustainability-category">SUSTAINABILITY</span>
                <h3 className="sustainability-title">{story.title}</h3>
                <div className="sustainability-meta">
                  <span className="sustainability-date">{story.date}</span>
                  <span className="sustainability-read-time">{story.readTime}</span>
                </div>
              </div>
              <div className="sustainability-image">
                <img src={story.image} alt={story.title} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;

import React from 'react';
import { Link } from 'react-router-dom';
import './Changemakers.css';

const Changemakers = () => {
  const changemakers = [
    {
      id: 1,
      title: "Meet the 3 Friends Lighting Up 150 Remote Villages With Solar Power",
      date: "18 JUL 2025",
      readTime: "5 MIN READ",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
      slug: "solar-power-villages"
    },
    {
      id: 2,
      title: "This Engineer's Smart Device Cuts Power Wastage by 23%, Saves Lakhs in Bills",
      date: "18 JUL 2025",
      readTime: "4 MIN READ",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
      slug: "smart-device-power-saving"
    },
    {
      id: 3,
      title: "\"It's a Man's Job\": How a One-Day Camp Led This Newsreader to Rescue 800+ Snakes Across Kerala",
      date: "18 JUL 2025",
      readTime: "13 MIN READ",
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600",
      slug: "snake-rescue-kerala"
    },
    {
      id: 4,
      title: "25-YO Trains 150 Women to Turn a Harmful Lake Weed Into Sustainable Handmade Paper",
      date: "18 JUL 2025",
      readTime: "9 MIN READ",
      image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600",
      slug: "lake-weed-paper"
    },
    {
      id: 5,
      title: "How a Retired Teacher Built 500 Rainwater Harvesting Systems for Free",
      date: "17 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=600",
      slug: "rainwater-harvesting"
    },
    {
      id: 6,
      title: "This 28-YO Quit Google to Teach Coding to 10,000 Underprivileged Kids",
      date: "17 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      slug: "coding-for-kids"
    },
    {
      id: 7,
      title: "Mumbai's Dabbawalas Now Deliver Meals to 5,000 Homeless People Daily",
      date: "16 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
      slug: "dabbawalas-homeless"
    },
    {
      id: 8,
      title: "Doctor Couple Provides Free Healthcare to 50,000 Villagers Annually",
      date: "16 JUL 2025",
      readTime: "10 MIN READ",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
      slug: "free-healthcare-villages"
    },
    {
      id: 9,
      title: "Ex-Army Officer Transforms 100 Acres of Barren Land Into Food Forest",
      date: "15 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600",
      slug: "food-forest-army"
    },
    {
      id: 10,
      title: "How This Auto Driver Educated 68 Slum Children With His Savings",
      date: "15 JUL 2025",
      readTime: "5 MIN READ",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
      slug: "auto-driver-education"
    },
    {
      id: 11,
      title: "72-Year-Old Grandmother Teaches Yoga to Over 1,000 Women for Free",
      date: "14 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
      slug: "yoga-grandmother"
    },
    {
      id: 12,
      title: "Young Lawyer Provides Free Legal Aid to 2,000 Women Prisoners",
      date: "14 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600",
      slug: "legal-aid-women"
    }
  ];

  return (
    <div className="changemakers-page">
      <div className="page-header">
        <div className="container">
          <h1>
            <span className="title-icon"></span>
            Changemakers
          </h1>
          <p>Meet the inspiring individuals making a difference in India</p>
        </div>
      </div>

      <div className="container">
        <div className="changemakers-grid">
          {changemakers.map((story) => (
            <Link to={`/story/${story.slug}`} key={story.id} className="changemaker-card">
              <div className="changemaker-image">
                <img src={story.image} alt={story.title} />
              </div>
              <div className="changemaker-info">
                <span className="changemaker-category">CHANGEMAKERS</span>
                <h3 className="changemaker-title">{story.title}</h3>
                <div className="changemaker-meta">
                  <span className="changemaker-date">{story.date}</span>
                  <span className="changemaker-read-time">{story.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Changemakers;

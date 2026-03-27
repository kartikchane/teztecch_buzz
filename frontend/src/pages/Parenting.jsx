import React from 'react';
import { Link } from 'react-router-dom';
import './Parenting.css';

const Parenting = () => {
  const stories = [
    {
      id: 1,
      title: "5 Fun & Educational Activities to Keep Your Kids Engaged This Summer",
      date: "15 JUL 2025",
      readTime: "3 MIN READ",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
      slug: "summer-activities-kids"
    },
    {
      id: 2,
      title: "Raising Resilient Kids: Essential Tips for Modern Parents",
      date: "15 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400",
      slug: "raising-resilient-kids"
    },
    {
      id: 3,
      title: "The Importance of Outdoor Play for Child Development",
      date: "14 JUL 2025",
      readTime: "5 MIN READ",
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400",
      slug: "outdoor-play-development"
    },
    {
      id: 4,
      title: "Navigating Teen Years: Communication Strategies for Parents",
      date: "14 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400",
      slug: "teen-communication-strategies"
    },
    {
      id: 5,
      title: "Screen Time Balance: A Practical Guide for Today's Parents",
      date: "13 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400",
      slug: "screen-time-balance"
    },
    {
      id: 6,
      title: "Building Emotional Intelligence in Children: A Parent's Guide",
      date: "13 JUL 2025",
      readTime: "9 MIN READ",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400",
      slug: "emotional-intelligence-kids"
    },
    {
      id: 7,
      title: "Healthy Eating Habits: Getting Kids to Love Nutritious Food",
      date: "12 JUL 2025",
      readTime: "5 MIN READ",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400",
      slug: "healthy-eating-kids"
    },
    {
      id: 8,
      title: "The Art of Positive Discipline: Gentle Parenting Techniques",
      date: "12 JUL 2025",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400",
      slug: "positive-discipline"
    },
    {
      id: 9,
      title: "Preparing Your Child for School: Tips for a Smooth Transition",
      date: "11 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      slug: "school-preparation-tips"
    },
    {
      id: 10,
      title: "Fostering Creativity: Activities That Spark Imagination",
      date: "11 JUL 2025",
      readTime: "4 MIN READ",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      slug: "fostering-creativity"
    },
    {
      id: 11,
      title: "Sibling Rivalry: Turning Competition into Cooperation",
      date: "10 JUL 2025",
      readTime: "7 MIN READ",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
      slug: "sibling-rivalry-tips"
    },
    {
      id: 12,
      title: "Teaching Financial Literacy to Kids: Start Early, Build Strong",
      date: "10 JUL 2025",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
      slug: "financial-literacy-kids"
    }
  ];

  return (
    <div className="parenting-page">
      <div className="page-header">
        <h1>
          <span className="title-icon"></span>
          Parenting
        </h1>
        <p>Tips, guides, and stories for modern parents</p>
      </div>

      <div className="container">
        <div className="parenting-grid">
          {stories.map((story) => (
            <Link to={`/story/${story.slug}`} key={story.id} className="parenting-card">
              <div className="parenting-content">
                <span className="parenting-category">PARENTING</span>
                <h3 className="parenting-title">{story.title}</h3>
                <div className="parenting-meta">
                  <span className="parenting-date">{story.date}</span>
                  <span className="parenting-read-time">{story.readTime}</span>
                </div>
              </div>
              <div className="parenting-image">
                <img src={story.image} alt={story.title} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parenting;

import mongoose from 'mongoose';
import Testimonial from './models/Testimonial.js';
import dotenv from 'dotenv';

dotenv.config();

const testimonials = [
  {
    quote: "TezTecch Buzz helped us reach millions with our sustainability message. Their authentic storytelling approach resonated perfectly with our target audience.",
    author: "Rajesh Sharma",
    position: "Marketing Director",
    company: "EcoLife Foundation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    order: 1,
    isActive: true
  },
  {
    quote: "The team's dedication to quality content and their engaged community made our campaign a huge success. We saw a 300% increase in brand awareness.",
    author: "Priya Gupta",
    position: "CEO",
    company: "SkillUp Academy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    order: 2,
    isActive: true
  },
  {
    quote: "Working with TezTecch Buzz transformed how we communicate our social impact. Their storytelling expertise is unmatched in the industry.",
    author: "Amit Patel",
    position: "Head of Communications",
    company: "GreenTech Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    order: 3,
    isActive: true
  },
  {
    quote: "The reach and engagement we achieved through TezTecch Buzz exceeded all our expectations. A truly professional and impactful partnership.",
    author: "Sneha Reddy",
    position: "Marketing Manager",
    company: "Clean Water Initiative",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    order: 4,
    isActive: true
  },
  {
    quote: "TezTecch Buzz's platform gave our rural education program the visibility it needed. Their audience truly cares about making a difference.",
    author: "Karthik Menon",
    position: "Program Director",
    company: "Education for All",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    order: 5,
    isActive: true
  },
  {
    quote: "Outstanding collaboration! The content quality and strategic distribution helped us connect with conscious consumers across India.",
    author: "Neha Kapoor",
    position: "Brand Manager",
    company: "Sustainable Fashion Co.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    order: 6,
    isActive: true
  },
  {
    quote: "TezTecch Buzz perfectly captured our mission and amplified it to millions. The impact on our donor engagement has been phenomenal.",
    author: "Vikram Singh",
    position: "Founder",
    company: "Hunger Relief India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    order: 7,
    isActive: true
  },
  {
    quote: "The professionalism and creativity of TezTecch Buzz team is remarkable. They turned our complex tech story into an engaging narrative.",
    author: "Divya Iyer",
    position: "VP Marketing",
    company: "Innovation Labs",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    order: 8,
    isActive: true
  },
  {
    quote: "Best decision we made! TezTecch Buzz helped us launch our social initiative with incredible reach and authentic engagement.",
    author: "Arjun Malhotra",
    position: "CSR Head",
    company: "Tech Giants India",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    order: 9,
    isActive: true
  },
  {
    quote: "Their data-driven approach combined with emotional storytelling created the perfect campaign for our healthcare initiative. Highly recommended!",
    author: "Dr. Meera Krishnan",
    position: "Director",
    company: "HealthCare Access Foundation",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    order: 10,
    isActive: true
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teztecch_buzz');
    console.log('Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials');

    // Insert new testimonials
    const result = await Testimonial.insertMany(testimonials);
    console.log(`✓ Successfully seeded ${result.length} testimonials`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();

import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);

export default HeroSlide;

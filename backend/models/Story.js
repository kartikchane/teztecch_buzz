import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['changemakers', 'parenting', 'sustainability', 'impact', 'startup', 'travel', 'farming', 'education', 'general'],
    default: 'general'
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better search performance
storySchema.index({ title: 'text', content: 'text', tags: 'text' });
storySchema.index({ category: 1, published: 1 });

const Story = mongoose.model('Story', storySchema);

export default Story;

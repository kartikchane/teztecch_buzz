import mongoose from 'mongoose';

const visualStorySchema = new mongoose.Schema({
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
  slides: [{
    imageUrl: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['changemakers', 'parenting', 'sustainability', 'impact', 'general'],
    default: 'general'
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
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
visualStorySchema.index({ title: 'text', description: 'text', tags: 'text' });
visualStorySchema.index({ slug: 1 });
visualStorySchema.index({ category: 1, published: 1 });

const VisualStory = mongoose.model('VisualStory', visualStorySchema);

export default VisualStory;

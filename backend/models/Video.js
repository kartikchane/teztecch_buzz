import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
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
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
    trim: true
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required'],
    trim: true
  },
  duration: {
    type: String,
    default: '0:00'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['shorts', 'stories', 'interviews', 'campaigns', 'general'],
    default: 'general'
  },
  type: {
    type: String,
    enum: ['youtube', 'video', 'short'],
    default: 'video'
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
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
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ slug: 1 });
videoSchema.index({ category: 1, published: 1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;

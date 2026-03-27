import mongoose from 'mongoose';

const pressReleaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['company-news', 'product-launch', 'partnership', 'award', 'event', 'general'],
    default: 'general'
  },
  mediaContact: {
    name: String,
    email: String,
    phone: String
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  tags: [{
    type: String
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const PressRelease = mongoose.model('PressRelease', pressReleaseSchema);

export default PressRelease;

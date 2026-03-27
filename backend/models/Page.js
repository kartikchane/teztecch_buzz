import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  template: {
    type: String,
    enum: ['about', 'career', 'press', 'advertise', 'brand-campaigns', 'work-with-us', 'our-impact', 'privacy-policy', 'terms-of-use', 'custom'],
    default: 'custom'
  },
  sections: [{
    heading: String,
    content: String,
    image: String,
    order: Number
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  featuredImage: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
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

// Update publishedAt when published status changes
pageSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Page = mongoose.model('Page', pageSchema);

export default Page;

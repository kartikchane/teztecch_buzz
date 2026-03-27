import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'TezTecch Buzz'
  },
  tagline: {
    type: String,
    default: 'Stories that Matter'
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'contact@teztecch.com'
  },
  contactPhone: {
    type: String,
    default: ''
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  footerText: {
    type: String,
    default: 'TezTecch Buzz - Stories that inspire and empower'
  },
  copyrightText: {
    type: String,
    default: '© 2025 TezTecch Buzz. All rights reserved.'
  },
  metaDescription: {
    type: String,
    default: 'Discover inspiring stories from India'
  },
  metaKeywords: {
    type: String,
    default: 'stories, india, sustainability, startup, culture'
  }
}, {
  timestamps: true
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;

import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['header', 'footer-stories', 'footer-more'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  openInNewTab: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;

import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster email lookups
subscriberSchema.index({ email: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;

import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    default: null
  },
  grievanceType: {
    type: String,
    required: [true, 'Grievance type is required'],
    enum: ['Content Issue', 'Privacy Concern', 'Copyright', 'Technical Issue', 'Other'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  attachmentUrl: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'in-progress', 'resolved', 'closed'],
    default: 'submitted'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  resolution: {
    type: String,
    trim: true,
    default: null
  },
  notes: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for faster queries
grievanceSchema.index({ trackingNumber: 1 });
grievanceSchema.index({ email: 1, submittedAt: -1 });
grievanceSchema.index({ status: 1 });
grievanceSchema.index({ priority: 1 });

const Grievance = mongoose.model('Grievance', grievanceSchema);

export default Grievance;

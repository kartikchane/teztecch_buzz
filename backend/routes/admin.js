import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';
import Story from '../models/Story.js';
import Video from '../models/Video.js';
import VisualStory from '../models/VisualStory.js';
import Subscriber from '../models/Subscriber.js';
import Contact from '../models/Contact.js';
import Grievance from '../models/Grievance.js';
import User from '../models/User.js';
import SiteSettings from '../models/SiteSettings.js';
import HeroSlide from '../models/HeroSlide.js';
import Category from '../models/Category.js';
import MenuItem from '../models/MenuItem.js';
import Page from '../models/Page.js';
import Job from '../models/Job.js';
import PressRelease from '../models/PressRelease.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Dashboard stats
router.get('/dashboard/stats', authenticate, isAdmin, async (req, res) => {
  try {
    const [
      totalStories,
      publishedStories,
      totalVideos,
      publishedVideos,
      totalVisualStories,
      totalSubscribers,
      activeSubscribers,
      totalContacts,
      pendingContacts,
      totalGrievances,
      pendingGrievances,
      totalUsers
    ] = await Promise.all([
      Story.countDocuments(),
      Story.countDocuments({ published: true }),
      Video.countDocuments(),
      Video.countDocuments({ published: true }),
      VisualStory.countDocuments(),
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ status: 'active' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'pending' }),
      Grievance.countDocuments(),
      Grievance.countDocuments({ status: { $in: ['submitted', 'under-review'] } }),
      User.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        stories: { total: totalStories, published: publishedStories },
        videos: { total: totalVideos, published: publishedVideos },
        visualStories: { total: totalVisualStories },
        subscribers: { total: totalSubscribers, active: activeSubscribers },
        contacts: { total: totalContacts, pending: pendingContacts },
        grievances: { total: totalGrievances, pending: pendingGrievances },
        users: { total: totalUsers }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// ============ STORIES CRUD ============

// Get all stories
router.get('/stories', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, published, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const stories = await Story.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Story.countDocuments(query);

    res.json({
      success: true,
      data: stories,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stories'
    });
  }
});

// Get single story
router.get('/stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('createdBy', 'name email');
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    res.json({ success: true, data: story });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch story'
    });
  }
});

// Create story
router.post('/stories', authenticate, isAdmin, async (req, res) => {
  try {
    const storyData = {
      ...req.body,
      createdBy: req.user._id,
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    const story = new Story(storyData);
    await story.save();

    res.status(201).json({
      success: true,
      message: 'Story created successfully',
      data: story
    });
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create story'
    });
  }
});

// Update story
router.put('/stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.title) {
      updateData.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    res.json({
      success: true,
      message: 'Story updated successfully',
      data: story
    });
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update story'
    });
  }
});

// Delete story
router.delete('/stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete story'
    });
  }
});

// ============ VIDEOS CRUD ============

// Get all videos
router.get('/videos', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, type, published, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (type) query.type = type;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const videos = await Video.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos'
    });
  }
});

// Get single video
router.get('/videos/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('createdBy', 'name email');
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    res.json({ success: true, data: video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video'
    });
  }
});

// Create video
router.post('/videos', authenticate, isAdmin, async (req, res) => {
  try {
    const videoData = {
      ...req.body,
      createdBy: req.user._id,
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    const video = new Video(videoData);
    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create video'
    });
  }
});

// Update video
router.put('/videos/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.title) {
      updateData.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update video'
    });
  }
});

// Delete video
router.delete('/videos/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video'
    });
  }
});

// ============ VISUAL STORIES CRUD ============

// Get all visual stories
router.get('/visual-stories', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, published, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const visualStories = await VisualStory.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await VisualStory.countDocuments(query);

    res.json({
      success: true,
      data: visualStories,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get visual stories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visual stories'
    });
  }
});

// Create visual story
router.post('/visual-stories', authenticate, isAdmin, async (req, res) => {
  try {
    const visualStoryData = {
      ...req.body,
      createdBy: req.user._id,
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    const visualStory = new VisualStory(visualStoryData);
    await visualStory.save();

    res.status(201).json({
      success: true,
      message: 'Visual story created successfully',
      data: visualStory
    });
  } catch (error) {
    console.error('Create visual story error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create visual story'
    });
  }
});

// Update visual story
router.put('/visual-stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.title) {
      updateData.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const visualStory = await VisualStory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!visualStory) {
      return res.status(404).json({
        success: false,
        message: 'Visual story not found'
      });
    }

    res.json({
      success: true,
      message: 'Visual story updated successfully',
      data: visualStory
    });
  } catch (error) {
    console.error('Update visual story error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update visual story'
    });
  }
});

// Delete visual story
router.delete('/visual-stories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const visualStory = await VisualStory.findByIdAndDelete(req.params.id);
    if (!visualStory) {
      return res.status(404).json({
        success: false,
        message: 'Visual story not found'
      });
    }

    res.json({
      success: true,
      message: 'Visual story deleted successfully'
    });
  } catch (error) {
    console.error('Delete visual story error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete visual story'
    });
  }
});

// ============ SUBSCRIBERS MANAGEMENT ============

// Get all subscribers
router.get('/subscribers', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Subscriber.countDocuments(query);

    res.json({
      success: true,
      data: subscribers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers'
    });
  }
});

// Update subscriber status
router.put('/subscribers/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const subscriber = await Subscriber.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'inactive' && { unsubscribedAt: new Date() })
      },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscriber updated successfully',
      data: subscriber
    });
  } catch (error) {
    console.error('Update subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update subscriber'
    });
  }
});

// Delete subscriber
router.delete('/subscribers/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscriber'
    });
  }
});

// ============ CONTACTS MANAGEMENT ============

// Get all contacts
router.get('/contacts', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// Update contact
router.put('/contacts/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = { status, notes };
    
    if (status === 'responded') {
      updateData.respondedAt = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// Delete contact
router.delete('/contacts/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

// ============ GRIEVANCES MANAGEMENT ============

// Get all grievances
router.get('/grievances', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, priority, grievanceType, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (grievanceType) query.grievanceType = grievanceType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { trackingNumber: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const grievances = await Grievance.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Grievance.countDocuments(query);

    res.json({
      success: true,
      data: grievances,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get grievances error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch grievances'
    });
  }
});

// Update grievance
router.put('/grievances/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { status, priority, resolution, adminNotes } = req.body;
    const updateData = { status, priority, resolution, adminNotes };
    
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
    }

    const grievance = await Grievance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    }

    res.json({
      success: true,
      message: 'Grievance updated successfully',
      data: grievance
    });
  } catch (error) {
    console.error('Update grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update grievance'
    });
  }
});

// Delete grievance
router.delete('/grievances/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndDelete(req.params.id);
    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    }

    res.json({
      success: true,
      message: 'Grievance deleted successfully'
    });
  } catch (error) {
    console.error('Delete grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete grievance'
    });
  }
});

// ============ USERS MANAGEMENT ============

// Get all users
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const query = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Update user role
router.put('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// Delete user
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// ========== SITE SETTINGS ROUTES ==========

// Get site settings
router.get('/site-settings', authenticate, isAdmin, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await SiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch site settings' });
  }
});

// Update site settings
router.put('/site-settings', authenticate, isAdmin, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json({ success: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update site settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update site settings' });
  }
});

// ========== HERO SLIDES ROUTES ==========

// Get all hero slides
router.get('/hero-slides', authenticate, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const slides = await HeroSlide.find().sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit);
    const total = await HeroSlide.countDocuments();

    res.json({
      success: true,
      data: slides,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get hero slides error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hero slides' });
  }
});

// Create hero slide
router.post('/hero-slides', authenticate, isAdmin, async (req, res) => {
  try {
    const slide = await HeroSlide.create(req.body);
    res.status(201).json({ success: true, data: slide, message: 'Hero slide created successfully' });
  } catch (error) {
    console.error('Create hero slide error:', error);
    res.status(500).json({ success: false, message: 'Failed to create hero slide' });
  }
});

// Update hero slide
router.put('/hero-slides/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }
    res.json({ success: true, data: slide, message: 'Hero slide updated successfully' });
  } catch (error) {
    console.error('Update hero slide error:', error);
    res.status(500).json({ success: false, message: 'Failed to update hero slide' });
  }
});

// Delete hero slide
router.delete('/hero-slides/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }
    res.json({ success: true, message: 'Hero slide deleted successfully' });
  } catch (error) {
    console.error('Delete hero slide error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete hero slide' });
  }
});

// ========== CATEGORIES ROUTES ==========

// Get all categories
router.get('/categories', authenticate, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find().sort({ order: 1, name: 1 }).skip(skip).limit(limit);
    const total = await Category.countDocuments();

    res.json({
      success: true,
      data: categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// Create category
router.post('/categories', authenticate, isAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category, message: 'Category created successfully' });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

// Update category
router.put('/categories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

// Delete category
router.delete('/categories/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

// ========== MENU ITEMS ROUTES ==========

// Get all menu items
router.get('/menu-items', authenticate, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const menuItems = await MenuItem.find().sort({ type: 1, order: 1 }).skip(skip).limit(limit);
    const total = await MenuItem.countDocuments();

    res.json({
      success: true,
      data: menuItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
  }
});

// Create menu item
router.post('/menu-items', authenticate, isAdmin, async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: menuItem, message: 'Menu item created successfully' });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ success: false, message: 'Failed to create menu item' });
  }
});

// Update menu item
router.put('/menu-items/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, data: menuItem, message: 'Menu item updated successfully' });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ success: false, message: 'Failed to update menu item' });
  }
});

// Delete menu item
router.delete('/menu-items/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete menu item' });
  }
});

// ============ PAGES CRUD ============

// Get all pages
router.get('/pages', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, template, published, search } = req.query;
    const query = {};

    if (template) query.template = template;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const pages = await Page.find(query)
      .populate('createdBy updatedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Page.countDocuments(query);

    res.json({
      success: true,
      data: pages,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pages' });
  }
});

// Get single page by ID
router.get('/pages/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
      .populate('createdBy updatedBy', 'name email');
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch page' });
  }
});

// Create new page
router.post('/pages', authenticate, isAdmin, async (req, res) => {
  try {
    const pageData = {
      ...req.body,
      createdBy: req.user.id
    };

    const page = new Page(pageData);
    await page.save();

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ success: false, message: 'Failed to create page' });
  }
});

// Update page
router.put('/pages/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const page = await Page.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'name email');

    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }

    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ success: false, message: 'Failed to update page' });
  }
});

// Delete page
router.delete('/pages/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.json({ success: true, message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete page' });
  }
});

// ============ JOBS CRUD ============

// Get all jobs
router.get('/jobs', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, department, type, published, search } = req.query;
    const query = {};

    if (department) query.department = department;
    if (type) query.type = type;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(query)
      .populate('createdBy updatedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Job.countDocuments(query);

    res.json({
      success: true,
      data: jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// Get single job by ID
router.get('/jobs/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy updatedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch job' });
  }
});

// Create new job
router.post('/jobs', authenticate, isAdmin, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user.id
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ success: false, message: 'Failed to create job' });
  }
});

// Update job
router.put('/jobs/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'name email');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ success: false, message: 'Failed to update job' });
  }
});

// Delete job
router.delete('/jobs/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete job' });
  }
});

// ============ PRESS RELEASES CRUD ============

// Get all press releases
router.get('/press-releases', authenticate, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, published, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const pressReleases = await PressRelease.find(query)
      .populate('createdBy updatedBy', 'name email')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await PressRelease.countDocuments(query);

    res.json({
      success: true,
      data: pressReleases,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get press releases error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch press releases' });
  }
});

// Get single press release by ID
router.get('/press-releases/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const pressRelease = await PressRelease.findById(req.params.id)
      .populate('createdBy updatedBy', 'name email');
    
    if (!pressRelease) {
      return res.status(404).json({ success: false, message: 'Press release not found' });
    }

    res.json({ success: true, data: pressRelease });
  } catch (error) {
    console.error('Get press release error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch press release' });
  }
});

// Create new press release
router.post('/press-releases', authenticate, isAdmin, async (req, res) => {
  try {
    const pressReleaseData = {
      ...req.body,
      createdBy: req.user.id
    };

    const pressRelease = new PressRelease(pressReleaseData);
    await pressRelease.save();

    res.status(201).json({
      success: true,
      message: 'Press release created successfully',
      data: pressRelease
    });
  } catch (error) {
    console.error('Create press release error:', error);
    res.status(500).json({ success: false, message: 'Failed to create press release' });
  }
});

// Update press release
router.put('/press-releases/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const pressRelease = await PressRelease.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'name email');

    if (!pressRelease) {
      return res.status(404).json({ success: false, message: 'Press release not found' });
    }

    res.json({
      success: true,
      message: 'Press release updated successfully',
      data: pressRelease
    });
  } catch (error) {
    console.error('Update press release error:', error);
    res.status(500).json({ success: false, message: 'Failed to update press release' });
  }
});

// Delete press release
router.delete('/press-releases/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const pressRelease = await PressRelease.findByIdAndDelete(req.params.id);
    if (!pressRelease) {
      return res.status(404).json({ success: false, message: 'Press release not found' });
    }
    res.json({ success: true, message: 'Press release deleted successfully' });
  } catch (error) {
    console.error('Delete press release error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete press release' });
  }
});

// ============ TESTIMONIALS CRUD ============

// Get all testimonials
router.get('/testimonials', authenticate, isAdmin, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

// Get single testimonial
router.get('/testimonials/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonial' });
  }
});

// Create testimonial
router.post('/testimonials', authenticate, isAdmin, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ success: false, message: 'Failed to create testimonial' });
  }
});

// Update testimonial
router.put('/testimonials/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ success: false, message: 'Failed to update testimonial' });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
  }
});

export default router;

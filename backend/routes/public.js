import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import HeroSlide from '../models/HeroSlide.js';
import Category from '../models/Category.js';
import MenuItem from '../models/MenuItem.js';
import Story from '../models/Story.js';
import Video from '../models/Video.js';
import VisualStory from '../models/VisualStory.js';
import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';
import Grievance from '../models/Grievance.js';
import Page from '../models/Page.js';
import Job from '../models/Job.js';
import PressRelease from '../models/PressRelease.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Get site settings (public)
router.get('/site-settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch site settings' });
  }
});

// Get active hero slides (public)
router.get('/hero-slides', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    console.error('Get hero slides error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hero slides' });
  }
});

// Get active categories (public)
router.get('/categories', async (req, res) => {
  try {
    const showOnHomeOnly = req.query.homeOnly === 'true';
    const withCounts = req.query.withCounts === 'true';
    const query = showOnHomeOnly ? { active: true, showOnHome: true } : { active: true };
    
    const categories = await Category.find(query).sort({ order: 1, name: 1 });
    
    // If withCounts is true, add story count for each category
    if (withCounts) {
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const count = await Story.countDocuments({ 
            category: category.slug, 
            published: true 
          });
          return {
            ...category.toObject(),
            storyCount: count
          };
        })
      );
      return res.json({ success: true, data: categoriesWithCounts });
    }
    
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// Get menu items by type (public)
router.get('/menu-items', async (req, res) => {
  try {
    const type = req.query.type; // header, footer-stories, footer-more
    const query = type ? { active: true, type } : { active: true };
    
    const menuItems = await MenuItem.find(query).sort({ order: 1 });
    res.json({ success: true, data: menuItems });
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
  }
});

// Get published stories (public)
router.get('/stories', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = { published: true };

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const stories = await Story.find(query)
      .select('title slug description imageUrl category author readTime views createdAt')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Story.countDocuments(query);

    res.json({
      success: true,
      data: stories,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stories' });
  }
});

// Get single story by slug (public)
router.get('/stories/:slug', async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy');
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    // Increment views
    story.views = (story.views || 0) + 1;
    await story.save();

    res.json({ success: true, data: story });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch story' });
  }
});

// Get published videos (public)
router.get('/videos', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search } = req.query;
    const query = { published: true };

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const videos = await Video.find(query)
      .select('title slug description thumbnail category duration views date')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch videos' });
  }
});

// Get single video by slug (public)
router.get('/videos/:slug', async (req, res) => {
  try {
    const video = await Video.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy');
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Increment views
    video.views = (video.views || 0) + 1;
    await video.save();

    res.json({ success: true, data: video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch video' });
  }
});

// Get published visual stories (public)
router.get('/visual-stories', async (req, res) => {
  try {
    const { page = 1, limit = 12, category } = req.query;
    const query = { published: true };

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    const visualStories = await VisualStory.find(query)
      .select('title slug coverImage category slides views date')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await VisualStory.countDocuments(query);

    res.json({
      success: true,
      data: visualStories,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get visual stories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch visual stories' });
  }
});

// Get single visual story by slug (public)
router.get('/visual-stories/:slug', async (req, res) => {
  try {
    const visualStory = await VisualStory.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy');
    
    if (!visualStory) {
      return res.status(404).json({
        success: false,
        message: 'Visual story not found'
      });
    }

    // Increment views
    visualStory.views = (visualStory.views || 0) + 1;
    await visualStory.save();

    res.json({ success: true, data: visualStory });
  } catch (error) {
    console.error('Get visual story error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch visual story' });
  }
});

// Submit contact form (public)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'pending'
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'You are already subscribed to our newsletter!'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        existingSubscriber.name = name || existingSubscriber.name;
        await existingSubscriber.save();
        return res.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: existingSubscriber
        });
      }
    }

    const subscriber = new Subscriber({
      email,
      name: name || '',
      status: 'active'
    });

    await subscriber.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your inbox for confirmation.',
      data: subscriber
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.'
    });
  }
});

// Submit grievance (public)
router.post('/grievance', async (req, res) => {
  try {
    const { name, email, phone, grievanceType, subject, description, attachmentUrl } = req.body;

    // Validation
    if (!name || !email || !grievanceType || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, grievance type, subject, and description are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Generate tracking number
    const trackingNumber = 'GRV' + Date.now() + Math.floor(Math.random() * 1000);

    const grievance = new Grievance({
      name,
      email,
      phone: phone || null,
      grievanceType,
      subject,
      description,
      attachmentUrl: attachmentUrl || null,
      trackingNumber,
      status: 'submitted',
      priority: 'medium'
    });

    await grievance.save();

    res.status(201).json({
      success: true,
      message: 'Your grievance has been submitted successfully.',
      data: {
        trackingNumber: grievance.trackingNumber,
        grievance
      }
    });
  } catch (error) {
    console.error('Grievance submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit grievance. Please try again.'
    });
  }
});

// Get published page by slug (public)
router.get('/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy -updatedBy');
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch page' });
  }
});

// Get published jobs (public)
router.get('/jobs', async (req, res) => {
  try {
    const { department, type, location } = req.query;
    const query = { published: true };

    if (department) query.department = { $regex: new RegExp(department, 'i') };
    if (type) query.type = type;
    if (location) query.location = { $regex: new RegExp(location, 'i') };

    const jobs = await Job.find(query)
      .select('title slug department location type experience salary applicationDeadline featured')
      .sort({ featured: -1, createdAt: -1 });

    res.json({
      success: true,
      data: jobs,
      total: jobs.length
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// Get single job by slug (public)
router.get('/jobs/:slug', async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy -updatedBy');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment views
    job.views = (job.views || 0) + 1;
    await job.save();

    res.json({ success: true, data: job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch job' });
  }
});

// Get published press releases (public)
router.get('/press-releases', async (req, res) => {
  try {
    const { category, year } = req.query;
    const query = { published: true };

    if (category) query.category = category;
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const pressReleases = await PressRelease.find(query)
      .select('title slug excerpt featuredImage date category featured')
      .sort({ featured: -1, date: -1 });

    res.json({
      success: true,
      data: pressReleases,
      total: pressReleases.length
    });
  } catch (error) {
    console.error('Get press releases error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch press releases' });
  }
});

// Get single press release by slug (public)
router.get('/press-releases/:slug', async (req, res) => {
  try {
    const pressRelease = await PressRelease.findOne({ slug: req.params.slug, published: true })
      .select('-createdBy -updatedBy');
    
    if (!pressRelease) {
      return res.status(404).json({
        success: false,
        message: 'Press release not found'
      });
    }

    // Increment views
    pressRelease.views = (pressRelease.views || 0) + 1;
    await pressRelease.save();

    res.json({ success: true, data: pressRelease });
  } catch (error) {
    console.error('Get press release error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch press release' });
  }
});

// Get active testimonials (public)
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

export default router;

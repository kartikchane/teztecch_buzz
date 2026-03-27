import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Category from './models/Category.js';
import MenuItem from './models/MenuItem.js';
import HeroSlide from './models/HeroSlide.js';

dotenv.config();

const seedInitialData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // ==== CREATE ADMIN USER ====
    console.log('📝 Creating Admin User...');
    const adminEmail = 'admin@teztecch.com';
    const adminPassword = 'Admin@123456'; // CHANGE THIS IN PRODUCTION!
    
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      admin = await User.create({
        name: 'TezTecch Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('   ✅ Admin user created');
      console.log(`   📧 Email: ${adminEmail}`);
      console.log(`   🔑 Password: ${adminPassword}`);
    } else {
      console.log('   ℹ️  Admin user already exists');
    }

    // ==== CREATE CATEGORIES ====
    console.log('\n📝 Creating Categories...');
    const categories = [
      { name: 'Sustainability', slug: 'sustainability', icon: '🌱', description: 'Stories about environmental conservation and sustainable living', color: '#10b981', order: 1, active: true, showOnHome: true },
      { name: 'Startup', slug: 'startup', icon: '🚀', description: 'Entrepreneurship and innovation stories', color: '#3b82f6', order: 2, active: true, showOnHome: true },
      { name: 'Travel', slug: 'travel', icon: '✈️', description: 'Travel experiences and destinations', color: '#f59e0b', order: 3, active: true, showOnHome: true },
      { name: 'Farming', slug: 'farming', icon: '🌾', description: 'Agriculture and farming techniques', color: '#84cc16', order: 4, active: true, showOnHome: true },
      { name: 'Education', slug: 'education', icon: '📚', description: 'Learning and education initiatives', color: '#8b5cf6', order: 5, active: true, showOnHome: true },
      { name: 'Culture', slug: 'culture', icon: '🎭', description: 'Cultural heritage and traditions', color: '#ec4899', order: 6, active: true, showOnHome: true },
      { name: 'Health', slug: 'health', icon: '💚', description: 'Health and wellness stories', color: '#14b8a6', order: 7, active: true, showOnHome: true },
      { name: 'Technology', slug: 'technology', icon: '💻', description: 'Tech innovations and digital transformation', color: '#6366f1', order: 8, active: true, showOnHome: true },
      { name: 'Changemakers', slug: 'changemakers', icon: '👥', description: 'Inspiring changemakers creating social impact', color: '#f97316', order: 9, active: true, showOnHome: false },
      { name: 'Parenting', slug: 'parenting', icon: '👨‍👩‍👧‍👦', description: 'Parenting tips and family stories', color: '#a855f7', order: 10, active: true, showOnHome: false },
      { name: 'Impact', slug: 'impact', icon: '💪', description: 'Social impact and community development', color: '#ef4444', order: 11, active: true, showOnHome: false },
      { name: 'General', slug: 'general', icon: '📰', description: 'General interest stories', color: '#6b7280', order: 12, active: true, showOnHome: false }
    ];

    for (const cat of categories) {
      const existing = await Category.findOne({ slug: cat.slug });
      if (!existing) {
        await Category.create(cat);
        console.log(`   ✅ Created category: ${cat.name}`);
      } else {
        console.log(`   ℹ️  Category exists: ${cat.name}`);
      }
    }

    // ==== CREATE MENU ITEMS ====
    console.log('\n📝 Creating Menu Items...');
    const menuItems = [
      // Header Menu
      { label: 'Home', url: '/', type: 'header', order: 1, active: true, openInNewTab: false },
      { label: 'Stories', url: '/stories', type: 'header', order: 2, active: true, openInNewTab: false },
      { label: 'Videos', url: '/videos', type: 'header', order: 3, active: true, openInNewTab: false },
      { label: 'Changemakers', url: '/changemakers', type: 'header', order: 4, active: true, openInNewTab: false },
      { label: 'About Us', url: '/about', type: 'header', order: 5, active: true, openInNewTab: false },
      { label: 'Contact', url: '/contact', type: 'header', order: 6, active: true, openInNewTab: false },
      
      // Footer - Stories Section
      { label: 'Sustainability', url: '/stories/sustainability', type: 'footer-stories', order: 1, active: true, openInNewTab: false },
      { label: 'Startup', url: '/stories/startup', type: 'footer-stories', order: 2, active: true, openInNewTab: false },
      { label: 'Travel', url: '/stories/travel', type: 'footer-stories', order: 3, active: true, openInNewTab: false },
      { label: 'Farming', url: '/stories/farming', type: 'footer-stories', order: 4, active: true, openInNewTab: false },
      
      // Footer - More Section
      { label: 'About Us', url: '/about', type: 'footer-more', order: 1, active: true, openInNewTab: false },
      { label: 'Careers', url: '/career', type: 'footer-more', order: 2, active: true, openInNewTab: false },
      { label: 'Press', url: '/press', type: 'footer-more', order: 3, active: true, openInNewTab: false },
      { label: 'Contact Us', url: '/contact', type: 'footer-more', order: 4, active: true, openInNewTab: false },
      { label: 'Privacy Policy', url: '/privacy-policy', type: 'footer-more', order: 5, active: true, openInNewTab: false },
      { label: 'Terms of Use', url: '/terms-of-use', type: 'footer-more', order: 6, active: true, openInNewTab: false }
    ];

    for (const item of menuItems) {
      const existing = await MenuItem.findOne({ label: item.label, type: item.type });
      if (!existing) {
        await MenuItem.create(item);
        console.log(`   ✅ Created menu item: ${item.label} (${item.type})`);
      } else {
        console.log(`   ℹ️  Menu item exists: ${item.label} (${item.type})`);
      }
    }

    // ==== CREATE HERO SLIDES ====
    console.log('\n📝 Creating Hero Slides...');
    const heroSlides = [
      {
        title: 'Monsoon Gardening: Grow Tangy Karonda in 6 Easy Steps',
        description: 'Learn how to cultivate this nutritious berry in your garden',
        category: 'FARMING',
        author: 'Natasha Doshi',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
        slug: 'karonda-gardening',
        order: 1,
        active: true
      },
      {
        title: 'Meet the Changemakers: Stories of Social Impact',
        description: 'Inspiring individuals making a difference in their communities',
        category: 'SUSTAINABILITY',
        author: 'Rashi Gupta',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200',
        slug: 'changemakers-impact',
        order: 2,
        active: true
      },
      {
        title: 'From Village to Valley: The Startup Journey',
        description: 'How rural entrepreneurs are revolutionizing Indian business',
        category: 'STARTUP',
        author: 'Anamika Roy',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
        slug: 'startup-success-story',
        order: 3,
        active: true
      }
    ];

    for (const slide of heroSlides) {
      const existing = await HeroSlide.findOne({ slug: slide.slug });
      if (!existing) {
        await HeroSlide.create(slide);
        console.log(`   ✅ Created hero slide: ${slide.title}`);
      } else {
        console.log(`   ℹ️  Hero slide exists: ${slide.title}`);
      }
    }

    console.log('\n🎉 ============================================');
    console.log('✅ Initial data seeding completed successfully!');
    console.log('============================================\n');
    console.log('📝 Next Steps:');
    console.log('   1. Start backend: cd backend && npm run dev');
    console.log('   2. Start frontend: npm run dev');
    console.log('   3. Start admin panel: cd admin && npm run dev');
    console.log(`   4. Admin Login: ${adminEmail} / ${adminPassword}`);
    console.log('\n');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seeder
seedInitialData();

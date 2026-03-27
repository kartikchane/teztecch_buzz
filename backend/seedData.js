import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './models/Story.js';
import Video from './models/Video.js';
import VisualStory from './models/VisualStory.js';
import Category from './models/Category.js';
import HeroSlide from './models/HeroSlide.js';
import Page from './models/Page.js';
import Job from './models/Job.js';
import PressRelease from './models/PressRelease.js';
import MenuItem from './models/MenuItem.js';
import User from './models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get or create admin user
    let adminUser = await User.findOne({ email: 'admin@teztecch.com' });
    if (!adminUser) {
      console.log('Creating admin user...');
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@teztecch.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Using existing admin user');
    }

// Sample Stories - 10 per category with unique relevant images
const stories = [
  // Changemakers Category (10 stories)
  {
    title: 'Empowering Communities Through Innovation',
    slug: 'empowering-communities-innovation',
    description: 'Discover stories of change and transformation across India',
    content: `In villages and cities across India, a quiet revolution is taking place. Communities are coming together to solve local problems through innovation and collaboration.

The Power of Community Action

When individuals unite for a common cause, extraordinary things happen. From setting up community libraries to organizing skill development workshops, ordinary people are creating extraordinary impact.

Digital Empowerment

Technology has become a great equalizer. Community centers are now offering digital literacy programs, teaching everything from basic computer skills to coding. Young and old alike are learning to navigate the digital world.

Social Entrepreneurship

Many communities are developing sustainable business models that address local needs while generating income. These social enterprises are proving that profit and purpose can go hand in hand.

Youth Leadership

The next generation is stepping up. Youth-led initiatives are tackling issues ranging from environmental conservation to mental health awareness.

Collaborative Solutions

By working together, communities are finding innovative solutions to age-old problems. Cooperative farming, shared resources, and collective decision-making are creating resilient communities.

The Road Ahead

As more communities embrace innovation and collaboration, we are witnessing the emergence of a new India - one built on the foundations of community empowerment and inclusive growth.`,
    category: 'changemakers',
    author: 'TezTecch Team',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    tags: ['community', 'innovation', 'empowerment'],
    published: true,
    featured: true,
    readTime: 6,
    views: 2340,
    createdBy: adminUser._id
  },
  {
    title: 'Empowering Rural Women Through Technology',
    slug: 'empowering-rural-women-through-technology',
    description: 'How digital literacy programs are transforming lives in rural India',
    content: 'In the heart of rural Maharashtra, a silent revolution is taking place. Women who once had limited access to education and opportunities are now becoming digital entrepreneurs...',
    category: 'changemakers',
    author: 'Priya Sharma',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    tags: ['women empowerment', 'technology', 'rural development'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1250,
    createdBy: adminUser._id
  },
  {
    title: 'Solar Warriors: Lighting Up Remote Villages',
    slug: 'solar-warriors-lighting-up-remote-villages',
    description: 'Meet the entrepreneurs bringing solar energy to off-grid communities',
    content: 'In the remote villages of Ladakh, a team of young engineers is installing solar panels and changing lives. Their mission is simple: bring light to every home...',
    category: 'changemakers',
    author: 'Rohan Kapoor',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
    tags: ['solar energy', 'innovation', 'rural electrification'],
    published: true,
    featured: false,
    readTime: 7,
    views: 980,
    createdBy: adminUser._id
  },
  {
    title: 'From Waste to Wealth: The Recycling Revolution',
    slug: 'from-waste-to-wealth-recycling-revolution',
    description: 'How waste pickers are becoming environmental heroes',
    content: 'Delhi\'s waste pickers are often invisible, but their contribution to the environment is massive. Now, they\'re organizing into cooperatives and demanding recognition...',
    category: 'changemakers',
    author: 'Kavita Singh',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    tags: ['recycling', 'waste management', 'social enterprise'],
    published: true,
    featured: true,
    readTime: 9,
    views: 1450,
    createdBy: adminUser._id
  },
  {
    title: 'Teaching Tomorrow: Innovating Education in Slums',
    slug: 'teaching-tomorrow-innovating-education-slums',
    description: 'Mobile classrooms bringing quality education to underprivileged children',
    content: 'Armed with tablets and a converted bus, Teach India is reaching children in Mumbai\'s slums. Their innovative approach is proving that education knows no boundaries...',
    category: 'changemakers',
    author: 'Amit Desai',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    tags: ['education', 'innovation', 'children'],
    published: true,
    featured: false,
    readTime: 6,
    views: 780,
    createdBy: adminUser._id
  },
  {
    title: 'Water Warriors: Reviving Ancient Wells',
    slug: 'water-warriors-reviving-ancient-wells',
    description: 'Community initiative restoring traditional water harvesting systems',
    content: 'In drought-prone Rajasthan, villagers are reviving centuries-old step wells. This grassroots movement is solving water scarcity with traditional wisdom...',
    category: 'changemakers',
    author: 'Meera Patel',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800',
    tags: ['water conservation', 'traditional knowledge', 'community action'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1320,
    createdBy: adminUser._id
  },
  {
    title: 'Coding for Change: Tech Training in Tier-3 Cities',
    slug: 'coding-for-change-tech-training-tier3-cities',
    description: 'Breaking barriers with free coding bootcamps in small towns',
    content: 'CodeIndia is bringing Silicon Valley to tier-3 cities. Their free coding bootcamps are creating opportunities for youth who never imagined a tech career...',
    category: 'changemakers',
    author: 'Vikram Rao',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    tags: ['technology', 'education', 'skill development'],
    published: true,
    featured: false,
    readTime: 7,
    views: 920,
    createdBy: adminUser._id
  },
  {
    title: 'Organic Farmers Unite: Building Sustainable Supply Chains',
    slug: 'organic-farmers-unite-sustainable-supply-chains',
    description: 'Farmer cooperatives connecting directly with urban consumers',
    content: 'Kerala\'s organic farmers are cutting out middlemen and connecting directly with consumers through digital platforms. Their story is inspiring farmers nationwide...',
    category: 'changemakers',
    author: 'Lakshmi Nair',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    tags: ['organic farming', 'agriculture', 'supply chain'],
    published: true,
    featured: false,
    readTime: 9,
    views: 1100,
    createdBy: adminUser._id
  },
  {
    title: 'Healthcare on Wheels: Mobile Clinics Reaching Remote Areas',
    slug: 'healthcare-on-wheels-mobile-clinics-remote-areas',
    description: 'Telemedicine vans bringing doctors to doorsteps',
    content: 'In tribal areas of Chhattisgarh, mobile health vans equipped with telemedicine facilities are providing primary healthcare to communities without hospitals...',
    category: 'changemakers',
    author: 'Dr. Suresh Kumar',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    tags: ['healthcare', 'telemedicine', 'rural health'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1580,
    createdBy: adminUser._id
  },
  {
    title: 'Artisan Revival: Preserving Traditional Crafts',
    slug: 'artisan-revival-preserving-traditional-crafts',
    description: 'Young designers collaborating with traditional artisans',
    content: 'A new generation of designers is partnering with traditional artisans to create contemporary products that honor heritage while meeting modern market demands...',
    category: 'changemakers',
    author: 'Nisha Reddy',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    tags: ['traditional crafts', 'design', 'cultural preservation'],
    published: true,
    featured: false,
    readTime: 7,
    views: 890,
    createdBy: adminUser._id
  },
  {
    title: 'Sports for All: Breaking Barriers in Athletics',
    slug: 'sports-for-all-breaking-barriers-athletics',
    description: 'NGO providing sports training to underprivileged youth',
    content: 'From Mumbai\'s slums to national championships - the journey of young athletes who got a chance through Sports4All initiative is inspiring thousands...',
    category: 'changemakers',
    author: 'Coach Rajesh',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
    tags: ['sports', 'youth development', 'athletics'],
    published: true,
    featured: false,
    readTime: 6,
    views: 750,
    createdBy: adminUser._id
  },

  // Parenting Category (10 stories)
  {
    title: 'Sustainable Parenting: Raising Eco-Conscious Kids',
    slug: 'sustainable-parenting-raising-eco-conscious-kids',
    description: 'Simple ways to teach children about environmental responsibility',
    content: 'As parents, we have the unique opportunity to shape the next generation\'s relationship with our planet. Here are practical strategies to raise environmentally conscious children...',
    category: 'parenting',
    author: 'Anjali Mehta',
    imageUrl: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800',
    tags: ['parenting', 'sustainability', 'environment'],
    published: true,
    featured: true,
    readTime: 6,
    views: 890,
    createdBy: adminUser._id
  },
  {
    title: 'Screen Time Balance: Digital Wellness for Kids',
    slug: 'screen-time-balance-digital-wellness-kids',
    description: 'Expert tips on managing children\'s device usage',
    content: 'In today\'s digital age, finding the right balance between screen time and other activities is crucial. Pediatricians and child psychologists share their guidelines...',
    category: 'parenting',
    author: 'Dr. Pooja Iyer',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800',
    tags: ['screen time', 'digital wellness', 'child development'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1240,
    createdBy: adminUser._id
  },
  {
    title: 'Mindful Parenting: Raising Emotionally Intelligent Children',
    slug: 'mindful-parenting-emotionally-intelligent-children',
    description: 'Techniques to nurture emotional intelligence from early age',
    content: 'Emotional intelligence is as important as IQ. Learn how to help your children recognize, understand, and manage their emotions effectively...',
    category: 'parenting',
    author: 'Sneha Gupta',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
    tags: ['emotional intelligence', 'mindfulness', 'child psychology'],
    published: true,
    featured: true,
    readTime: 9,
    views: 1560,
    createdBy: adminUser._id
  },
  {
    title: 'Nutrition 101: Building Healthy Eating Habits',
    slug: 'nutrition-101-building-healthy-eating-habits',
    description: 'Making nutritious food fun and appealing for children',
    content: 'Picky eaters? Food battles? Here\'s how to make healthy eating enjoyable and establish lifelong good nutrition habits in your children...',
    category: 'parenting',
    author: 'Nutritionist Ritu Sharma',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    tags: ['nutrition', 'healthy eating', 'child health'],
    published: true,
    featured: false,
    readTime: 7,
    views: 980,
    createdBy: adminUser._id
  },
  {
    title: 'Reading Together: Building Lifelong Learning',
    slug: 'reading-together-building-lifelong-learning',
    description: 'The magic of shared reading and its impact on development',
    content: 'Reading to your children is more than entertainment - it builds vocabulary, empathy, imagination, and a love for learning. Here\'s how to make the most of story time...',
    category: 'parenting',
    author: 'Librarian Meena Das',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
    tags: ['reading', 'literacy', 'education'],
    published: true,
    featured: false,
    readTime: 6,
    views: 820,
    createdBy: adminUser._id
  },
  {
    title: 'Working Parents Guide: Quality Time Over Quantity',
    slug: 'working-parents-guide-quality-time-quantity',
    description: 'Making the most of limited time with your children',
    content: 'Balancing career and parenting is challenging. Learn how to create meaningful connections with your children even with a busy schedule...',
    category: 'parenting',
    author: 'Career Coach Anita Roy',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    tags: ['work-life balance', 'working parents', 'time management'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1420,
    createdBy: adminUser._id
  },
  {
    title: 'Sibling Harmony: Managing Conflicts and Building Bonds',
    slug: 'sibling-harmony-managing-conflicts-building-bonds',
    description: 'Strategies to reduce sibling rivalry and foster cooperation',
    content: 'Sibling conflicts are normal, but there are ways to minimize fights and help your children develop strong, supportive relationships...',
    category: 'parenting',
    author: 'Family Therapist Kiran Joshi',
    imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800',
    tags: ['siblings', 'family dynamics', 'conflict resolution'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1050,
    createdBy: adminUser._id
  },
  {
    title: 'Creative Play: Unlocking Imagination and Innovation',
    slug: 'creative-play-unlocking-imagination-innovation',
    description: 'Why unstructured play is crucial for child development',
    content: 'In an age of structured activities, free play is more important than ever. Discover how creative play shapes problem-solving, creativity, and resilience...',
    category: 'parenting',
    author: 'Early Childhood Expert Deepa Menon',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    tags: ['creative play', 'child development', 'imagination'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1150,
    createdBy: adminUser._id
  },
  {
    title: 'Teen Years: Navigating Adolescence Together',
    slug: 'teen-years-navigating-adolescence-together',
    description: 'Building trust and communication during teenage years',
    content: 'Adolescence can be turbulent for both teens and parents. Learn how to maintain connection while giving independence during these crucial years...',
    category: 'parenting',
    author: 'Adolescent Counselor Rahul Menon',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800',
    tags: ['teenagers', 'adolescence', 'parent-teen relationship'],
    published: true,
    featured: true,
    readTime: 9,
    views: 1680,
    createdBy: adminUser._id
  },
  {
    title: 'Financial Literacy for Kids: Money Matters Early',
    slug: 'financial-literacy-kids-money-matters-early',
    description: 'Teaching children about money management from young age',
    content: 'Financial education isn\'t taught in most schools, making it a parent\'s responsibility. Here\'s how to teach your children about saving, spending, and investing...',
    category: 'parenting',
    author: 'Financial Advisor Priya Chopra',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    tags: ['financial literacy', 'money management', 'life skills'],
    published: true,
    featured: false,
    readTime: 7,
    views: 940,
    createdBy: adminUser._id
  },

  // Sustainability Category (10 stories)
  {
    title: 'Join the Sustainability Movement',
    slug: 'sustainability-movement',
    description: 'Learn how you can make a difference for our planet',
    content: `Climate change and environmental degradation are the defining challenges of our time. But across India, individuals and communities are rising to meet these challenges head-on.

Every Action Counts

From reducing plastic use to conserving water, small changes in our daily lives can have a massive cumulative impact. The sustainability movement is about making conscious choices every day.

Green Living

More Indians are adopting sustainable lifestyles. Urban gardening, composting, and choosing eco-friendly products are becoming mainstream practices.

Renewable Energy

Solar panels on rooftops, wind energy farms, and biogas plants are transforming how we generate and consume energy. The renewable energy revolution is creating a cleaner future.

Zero Waste Philosophy

The zero waste movement encourages us to refuse, reduce, reuse, recycle, and rot. Communities are setting up waste segregation systems and composting units.

Sustainable Transport

Cycling, carpooling, and using public transport are not just reducing emissions but also creating healthier, happier cities.

Education and Awareness

Schools and colleges are introducing environmental education. Young people are leading climate strikes and awareness campaigns.

Be the Change

The sustainability movement needs everyone. Whether you start a community garden or simply carry a reusable bag, your contribution matters. Together, we can create a sustainable future for generations to come.`,
    category: 'sustainability',
    author: 'TezTecch Team',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    tags: ['sustainability', 'environment', 'climate action'],
    published: true,
    featured: true,
    readTime: 7,
    views: 1890,
    createdBy: adminUser._id
  },
  {
    title: 'Zero Waste Living: A Complete Guide',
    slug: 'zero-waste-living-complete-guide',
    description: 'Transform your lifestyle with these sustainable practices',
    content: `Living a zero-waste lifestyle might seem daunting, but small steps can lead to significant change. This comprehensive guide will help you start your journey toward a more sustainable and fulfilling life.

Understanding Zero Waste

Zero waste is not about perfection—it's about making better choices. The goal is to send nothing to landfill by refusing, reducing, reusing, recycling, and composting everything we can. It's a philosophy that encourages us to redesign our lifestyles to mimic sustainable natural cycles.

The Zero Waste Hierarchy

The zero waste movement follows a simple hierarchy, often called the "5 Rs":

1. Refuse: Say no to things you don't need, especially single-use items
2. Reduce: Minimize what you do need to bring into your home
3. Reuse: Choose reusable alternatives and repair what you already own
4. Recycle: As a last resort, recycle what you cannot refuse, reduce, or reuse
5. Rot: Compost organic waste to return nutrients to the earth

The Environmental Impact

Every year, India generates 62 million tons of waste, with only 43 million tons being collected and 11.9 million tons being treated. The rest ends up in landfills or polluting our environment. The average Indian generates 0.5 kg of waste per day—small individually but massive collectively.

Landfills produce methane, a greenhouse gas 28 times more potent than carbon dioxide. Plastic waste breaks down into microplastics, contaminating our food chain and water supplies. The production and disposal of consumer goods also consume enormous amounts of energy and natural resources.

Week 1: Kitchen Transformation

The kitchen is the perfect starting point for zero waste living, as it's where most household waste originates.

Eliminate Single-Use Items
- Replace plastic bags with cloth produce bags (₹150-300 for a set)
- Switch to reusable food containers instead of plastic wrap and aluminum foil
- Use beeswax wraps for food storage (₹300-500)
- Invest in glass jars for pantry storage (₹50-150 each)
- Choose metal or bamboo utensils over disposable ones

Shop in Bulk
Visit local bulk stores or bring your own containers to:
- Grains, pulses, and flour stores
- Spice merchants
- Dry fruit vendors
- Oil and ghee suppliers

Most shopkeepers are happy to accommodate reusable containers. This reduces packaging waste and often saves money as you're not paying for packaging.

Composting Kitchen Scraps
Start composting vegetable peels, fruit scraps, coffee grounds, and tea leaves. Options include:
- Terrace composting using bins (₹1,500-3,000)
- Vermicomposting with red wiggler worms (₹2,000-4,000)
- Bokashi composting for small spaces (₹2,500-5,000)
- Community composting programs in urban areas

Week 2: Bathroom and Personal Care

The bathroom is another major source of plastic waste and chemical products.

Sustainable Swaps
- Bar soap and shampoo bars replace plastic bottles (₹150-400 each)
- Bamboo toothbrushes replace plastic ones (₹100-200)
- Safety razors replace disposable razors (₹500-1,500 initially, ₹50 for blade refills)
- Menstrual cups or cloth pads replace disposable products (₹300-800 for cup)
- Reusable cotton rounds for makeup removal (₹200-400 for a set)
- DIY cleaning products using vinegar, baking soda, and essential oils

DIY Personal Care Recipes

Face Cleanser: Mix 2 tbsp gram flour, 1 tsp turmeric, and rose water
Body Scrub: Combine coffee grounds with coconut oil
Hair Mask: Blend yogurt with fenugreek powder
Deodorant: Mix coconut oil with baking soda and essential oils

Week 3: Wardrobe Overhaul

Fast fashion is one of the world's largest polluters. The textile industry contributes 10% of global carbon emissions.

Mindful Shopping
- Buy fewer, higher-quality items that last longer
- Choose natural fibers: cotton, linen, wool, silk
- Support local artisans and khadi products
- Shop secondhand at thrift stores or online platforms
- Organize clothing swaps with friends

Care and Repair
- Learn basic sewing to mend tears and replace buttons
- Air-dry clothes instead of using dryers
- Wash clothes less frequently (spot clean when possible)
- Use eco-friendly detergents or soap nuts (₹300-500/kg)
- Donate or repurpose clothes you no longer wear

Week 4: Beyond the Home

Technology and Electronics
- Repair electronics instead of replacing them
- Sell or donate working devices you don't use
- Buy refurbished when possible
- Properly recycle e-waste through authorized centers
- Avoid unnecessary upgrades driven by trends

Transportation Choices
- Walk or cycle for short distances
- Use public transportation whenever possible
- Carpool with colleagues or neighbors
- Maintain vehicles properly for better fuel efficiency
- Consider electric vehicles for the future

Real Success Stories from India

The Patra Family - Mumbai
Meera and Arun Patra reduced their family's waste from 5 kg per week to just 500 grams. "We started with refusing plastic bags at stores. Then we got cloth bags. Before we knew it, we were composting, shopping in bulk, and making our own cleaning products. Our monthly expenses actually decreased by ₹2,000-3,000."

Their children, ages 8 and 11, became so enthusiastic they started a zero-waste club at school, teaching other students about sustainable living.

The Sharma Business - Bangalore
Rajesh Sharma owns a small restaurant that went completely zero waste in 2023. "We partnered with local farms to take our food scraps for composting. We switched to steel containers for takeaway. We buy ingredients in bulk with our own containers. Our waste disposal costs dropped to zero, and customers love our eco-friendly approach."

His restaurant now attracts environmentally conscious customers and has seen a 30% increase in business.

Financial Benefits

Initial Investment
- Reusable shopping bags: ₹500-1,000
- Glass storage containers: ₹2,000-3,000
- Cloth produce bags: ₹300-500
- Personal care items: ₹2,000-3,000
- Composting setup: ₹2,000-5,000
Total: ₹7,000-13,000

Monthly Savings
- No plastic bags: ₹100
- Bulk shopping: ₹1,000-2,000
- Homemade cleaning products: ₹300-500
- Reduced packaging costs: ₹500-800
- Lower waste disposal fees: ₹200-400
Total: ₹2,100-3,800/month

Your investment typically pays for itself within 3-4 months, with ongoing savings thereafter.

Common Challenges and Solutions

"Zero waste products are expensive"
Start with what you have. Use old t-shirts as cleaning rags. Repurpose glass jars for storage. Many zero waste swaps are actually cheaper in the long run.

"My family isn't interested"
Lead by example without preaching. Make it easy and convenient. Share the financial savings. Involve family members in decision-making.

"Zero waste stores aren't available in my area"
Shop at local bulk stores, farmers' markets, and traditional vendors. Many already use minimal packaging. Order online from zero waste stores that ship with minimal packaging.

"I don't have time for this"
Start small. Pick one or two changes and stick with them. Once they become habits, add more. Batch tasks like making cleaning products once a month.

Beyond Personal Change

Individual action is important, but systemic change is necessary for true zero waste society.

Community Action
- Join or start local zero waste groups
- Organize community cleanup drives
- Petition local businesses to reduce packaging
- Support politicians who prioritize environmental policies
- Share your journey on social media to inspire others

Business Influence
- Choose companies with sustainable practices
- Write to brands requesting better packaging
- Support businesses that offer package-free options
- Avoid companies with poor environmental records
- Vote with your wallet

The Ripple Effect

Research shows that when one person adopts sustainable practices, they influence an average of 3-5 people in their social circle. Your zero waste journey inspires others, creating exponential positive impact.

Measuring Your Impact

Track your progress to stay motivated:

Monthly Waste Audit
- Weigh all trash going to landfill
- Note which items you couldn't avoid
- Identify opportunities for improvement
- Celebrate reductions

Annual Impact
One person living zero waste for a year can save:
- 350 plastic bottles
- 1,000 plastic bags
- 300 disposable cups
- 50 kg of packaging waste
- 100 kg CO2 emissions

Your Journey Starts Today

Zero waste living is a journey, not a destination. Every small step matters. Don't aim for perfection—aim for progress. Be patient with yourself and celebrate every positive change.

Remember: You don't need to do everything perfectly. You just need to do something imperfectly but consistently. The planet doesn't need a handful of people doing zero waste perfectly. It needs millions doing it imperfectly.

Resources and Support

Online Communities
- Zero Waste India Facebook groups
- Instagram hashtags: #ZeroWasteIndia #SustainableLiving
- Reddit communities: r/ZeroWaste, r/IndianZeroWaste

Local Resources
- Bulk stores in major cities
- Farmers' markets and mandi
- Local artisan markets
- Community composting programs
- E-waste collection centers

Further Reading
- "Zero Waste Home" by Bea Johnson
- "Plastic-Free" by Beth Terry
- "The Story of Stuff" by Annie Leonard
- Local environmental NGO publications

Start today. Make one change. Then another. Before you know it, you'll be living a zero waste lifestyle that's better for you, your family, and our planet.`,
    category: 'sustainability',
    author: 'Rahul Verma',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    tags: ['zero waste', 'sustainability', 'lifestyle'],
    published: true,
    featured: true,
    readTime: 15,
    views: 2100,
    createdBy: adminUser._id
  },
  {
    title: 'Urban Farming: Growing Food in Small Spaces',
    slug: 'urban-farming-growing-food-small-spaces',
    description: 'Balcony gardens and vertical farming solutions for city dwellers',
    content: 'You don\'t need acres of land to grow your own food. Learn how urban dwellers are transforming balconies, terraces, and windowsills into productive gardens...',
    category: 'sustainability',
    author: 'Gardener Sunita Rao',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    tags: ['urban farming', 'gardening', 'food security'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1340,
    createdBy: adminUser._id
  },
  {
    title: 'Plastic-Free Challenge: 30 Days to Change',
    slug: 'plastic-free-challenge-30-days-change',
    description: 'Step-by-step guide to eliminating single-use plastics',
    content: `Join thousands who have taken the plastic-free pledge. This 30-day challenge provides practical alternatives and helps you break free from plastic dependency.

The Plastic Crisis
Every year, 8 million tons of plastic waste enter our oceans. Marine life mistakes plastic for food, leading to devastating consequences. Microplastics have been found in human blood, placentas, and even in the air we breathe. The time to act is now.

Why 30 Days?
Research shows it takes 21-66 days to form a new habit. Our 30-day challenge gives you enough time to establish sustainable alternatives while providing flexibility for adaptation.

Week 1: Awareness
The first week focuses on understanding your plastic footprint. Track every piece of single-use plastic you encounter - water bottles, shopping bags, food packaging, straws, cutlery. Most participants are shocked to discover they use 100+ single-use plastic items weekly.

Keep a journal documenting each plastic item. Note if alternatives exist and rate the difficulty of replacement (easy/medium/hard). This awareness phase is crucial for identifying low-hanging fruit.

Week 2: Easy Swaps
Now implement simple changes:
- Carry a reusable water bottle everywhere
- Keep cloth shopping bags in your car and purse
- Use a metal or bamboo straw
- Switch to bar soap and shampoo bars
- Buy loose vegetables instead of pre-packaged
- Use beeswax wraps instead of cling film

These swaps require minimal effort but create immediate impact. You'll likely reduce plastic consumption by 40-50% in this week alone.

Week 3: Intermediate Changes
This week tackles tougher challenges:
- Find stores offering package-free bulk foods
- Make your own cleaning products (vinegar, baking soda work wonders)
- Switch to bamboo toothbrushes and silk dental floss
- Buy milk and yogurt in glass bottles with deposit systems
- Start composting to reduce plastic bin liners
- Choose products in paper, glass, or metal packaging

You'll discover shopping takes more planning. Bring multiple containers for bulk purchases. Scout farmers markets where produce is unpackaged.

Week 4: Advanced Commitment
The final week is about lifestyle integration:
- Make your own personal care products (deodorant, moisturizer, toothpaste)
- Find plastic-free options for children's toys and school supplies
- Convince your favorite cafe to accept your reusable cup (many offer discounts)
- Pressure local stores to reduce plastic packaging
- Join or start community initiatives

The Community Aspect
You're not alone. Join local plastic-free groups on social media. Share tips, celebrate wins, and support each other through challenges. Many cities now have plastic-free networks organizing bulk-buying cooperatives and tool libraries.

Real Stories
Meera from Mumbai reduced her family's plastic waste from 15kg to 2kg monthly. "The first two weeks were frustrating. Finding alternatives required time and research. But by week three, it became routine. Now, six months later, I can't imagine going back."

Rajesh, a bachelor in Bangalore, found meal prep challenging. "Ordering food meant plastic containers. I learned to cook, bought glass containers for leftovers, and discovered local restaurants using steel tiffins for delivery. My health improved too."

Cost Analysis
Contrary to popular belief, plastic-free living often saves money:
- Reusable bags: ₹200 (one-time) vs ₹5-10 per trip
- Water bottle: ₹500 (one-time) vs ₹20-30 daily
- Bar soap: ₹80 per month vs ₹150 for liquid soap in plastic
- Bulk purchases: 20-40% cheaper without packaging markup

Initial investment might be ₹2000-3000, but you'll recover costs within 3-4 months.

Common Challenges & Solutions
"Everything comes in plastic!" - Yes, but you have power. Choose products with minimal packaging. Write to manufacturers demanding change. Shop at zero-waste stores.

"I'm too busy" - Start small. Even reducing plastic by 20% makes a difference. Focus on high-impact swaps first.

"My family isn't interested" - Lead by example. Don't preach. Let them witness your success. Children especially respond to ocean pollution facts.

"Alternatives are inconvenient" - Initially, yes. But within weeks, bringing your own bags and bottles becomes automatic.

Beyond Personal Change
Individual action matters, but systemic change is crucial:
- Support businesses committed to plastic reduction
- Vote for politicians prioritizing environmental legislation
- Participate in beach cleanups and community initiatives
- Educate others through social media and conversations
- Pressure corporations to adopt sustainable packaging

The Ripple Effect
When you refuse plastic, you create visibility. The cashier notices. Other shoppers see your cloth bags. Friends admire your stainless steel lunchbox. Each action plants seeds of change.

Research from the University of California found that visible sustainable behaviors encourage others to adopt similar practices. Your plastic-free journey inspires an average of 3-5 people within your social circle.

After 30 Days
Most participants report:
- 60-80% reduction in plastic waste
- ₹500-1000 monthly savings
- Increased awareness of consumption patterns
- Better health from reduced processed food
- Sense of purpose and control
- Stronger community connections

The challenge doesn't end at 30 days - it's just the beginning. You've developed habits and awareness that will last a lifetime.

Your Impact
One person eliminating single-use plastics prevents approximately:
- 167 plastic bottles annually
- 700 plastic bags
- 24 kg of plastic waste from landfills/oceans
- 54 kg of CO2 emissions from plastic production

Multiply this by the thousands taking the challenge, and we're talking about millions of kilograms of plastic diverted from our environment.

Take the Pledge
Are you ready? Join our community of plastic warriors. Download the detailed day-by-day guide with specific actions, recipes for DIY products, and a directory of plastic-free stores in your city.

Remember: Perfect is the enemy of good. You don't need to eliminate 100% of plastic overnight. Every reduction matters. Every choice counts. Every person makes a difference.

Start today. Start small. Start where you are. The planet will thank you.`,
    category: 'sustainability',
    author: 'Eco-Warrior Deepak Singh',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    tags: ['plastic free', 'zero waste', 'environmental action'],
    published: true,
    featured: true,
    readTime: 12,
    views: 2140,
    createdBy: adminUser._id
  },
  {
    title: 'Renewable Energy at Home: Solar Power Success Stories',
    slug: 'renewable-energy-home-solar-power-success',
    description: 'Families sharing their journey to energy independence',
    content: 'Meet Indian families who have installed rooftop solar panels and are now energy independent. Their stories prove renewable energy is both economical and ecological...',
    category: 'sustainability',
    author: 'Energy Expert Anil Kumar',
    imageUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800',
    tags: ['solar energy', 'renewable energy', 'home improvement'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1230,
    createdBy: adminUser._id
  },
  {
    title: 'Composting Made Easy: Turn Waste into Gold',
    slug: 'composting-made-easy-waste-into-gold',
    description: 'Home composting guide for beginners',
    content: 'Kitchen waste doesn\'t have to end up in landfills. Learn how to compost at home and create nutrient-rich soil for your plants while reducing waste...',
    category: 'sustainability',
    author: 'Composting Coach Maya Patel',
    imageUrl: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800',
    tags: ['composting', 'waste management', 'organic gardening'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1120,
    createdBy: adminUser._id
  },
  {
    title: 'Sustainable Fashion: Ethical Clothing Choices',
    slug: 'sustainable-fashion-ethical-clothing-choices',
    description: 'Breaking free from fast fashion and embracing conscious consumerism',
    content: 'The fashion industry is one of the largest polluters. Discover how to build a sustainable wardrobe through thrifting, upcycling, and supporting ethical brands...',
    category: 'sustainability',
    author: 'Fashion Blogger Zara Khan',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    tags: ['sustainable fashion', 'ethical clothing', 'conscious consumerism'],
    published: true,
    featured: true,
    readTime: 9,
    views: 1650,
    createdBy: adminUser._id
  },
  {
    title: 'Water Conservation: Every Drop Counts',
    slug: 'water-conservation-every-drop-counts',
    description: 'Practical tips to reduce water consumption at home',
    content: 'With water scarcity becoming critical, conservation is essential. Learn simple yet effective ways to reduce water usage in daily life and save this precious resource...',
    category: 'sustainability',
    author: 'Environmentalist Kavita Sharma',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800',
    tags: ['water conservation', 'resource management', 'sustainability'],
    published: true,
    featured: false,
    readTime: 6,
    views: 980,
    createdBy: adminUser._id
  },
  {
    title: 'Eco-Tourism: Travel Responsibly',
    slug: 'eco-tourism-travel-responsibly',
    description: 'How to explore the world while minimizing environmental impact',
    content: 'Tourism can harm or help the environment. Discover how to travel sustainably, support local communities, and leave destinations better than you found them...',
    category: 'sustainability',
    author: 'Travel Writer Arjun Menon',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    tags: ['eco-tourism', 'sustainable travel', 'responsible tourism'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1280,
    createdBy: adminUser._id
  },
  {
    title: 'Green Buildings: Sustainable Architecture Revolution',
    slug: 'green-buildings-sustainable-architecture-revolution',
    description: 'Innovative designs creating energy-efficient spaces',
    content: 'Architects are reimagining buildings to be energy-efficient, eco-friendly, and healthy for occupants. Explore cutting-edge green building technologies and designs...',
    category: 'sustainability',
    author: 'Architect Rohan Bhatt',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    tags: ['green buildings', 'sustainable architecture', 'eco-design'],
    published: true,
    featured: true,
    readTime: 10,
    views: 1540,
    createdBy: adminUser._id
  },
  {
    title: 'Climate Action: What Individuals Can Do',
    slug: 'climate-action-what-individuals-can-do',
    description: 'Personal choices that make a difference in fighting climate change',
    content: 'Climate change requires collective action, but individual choices matter. Here\'s how your daily decisions can contribute to a healthier planet...',
    category: 'sustainability',
    author: 'Climate Activist Neha Desai',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
    tags: ['climate action', 'environmental activism', 'personal responsibility'],
    published: true,
    featured: false,
    readTime: 9,
    views: 1720,
    createdBy: adminUser._id
  },

  // Impact Category (10 stories)
  {
    title: 'Microfinance Revolution: Empowering Women Entrepreneurs',
    slug: 'microfinance-revolution-empowering-women-entrepreneurs',
    description: 'How small loans are creating big changes in rural economies',
    content: 'Microfinance institutions are transforming lives by providing small loans to women entrepreneurs. Their success stories are inspiring economic transformation in rural India...',
    category: 'impact',
    author: 'Finance Expert Madhavi Reddy',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
    tags: ['microfinance', 'women empowerment', 'rural economy'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1450,
    createdBy: adminUser._id
  },
  {
    title: 'Community Kitchens: Fighting Hunger Together',
    slug: 'community-kitchens-fighting-hunger-together',
    description: 'Volunteer-run kitchens providing meals to those in need',
    content: 'Across Indian cities, community kitchens are ensuring no one sleeps hungry. Volunteers and donors are creating a network of compassion and nourishment...',
    category: 'impact',
    author: 'Social Worker Rajiv Malhotra',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
    tags: ['hunger relief', 'community service', 'volunteering'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1180,
    createdBy: adminUser._id
  },
  {
    title: 'Skill Development: Vocational Training for Youth',
    slug: 'skill-development-vocational-training-youth',
    description: 'Programs creating employment-ready workforce',
    content: 'Vocational training centers are bridging the skill gap, providing practical training that leads directly to employment. Youth from disadvantaged backgrounds are finding new opportunities...',
    category: 'impact',
    author: 'Trainer Sandeep Kumar',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    tags: ['skill development', 'vocational training', 'employment'],
    published: true,
    featured: true,
    readTime: 9,
    views: 1620,
    createdBy: adminUser._id
  },
  {
    title: 'Mental Health Awareness: Breaking the Stigma',
    slug: 'mental-health-awareness-breaking-stigma',
    description: 'Campaigns normalizing conversations about mental wellness',
    content: 'Mental health organizations are working to remove stigma and make mental healthcare accessible. Their awareness campaigns are changing societal attitudes...',
    category: 'impact',
    author: 'Psychologist Dr. Aisha Khan',
    imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800',
    tags: ['mental health', 'awareness', 'healthcare access'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1390,
    createdBy: adminUser._id
  },
  {
    title: 'Disability Rights: Creating Inclusive Spaces',
    slug: 'disability-rights-creating-inclusive-spaces',
    description: 'Advocates pushing for accessibility and equal opportunities',
    content: 'Disability rights activists are ensuring that public spaces, workplaces, and digital platforms are accessible to all. Their efforts are creating a more inclusive society...',
    category: 'impact',
    author: 'Activist Priya Nair',
    imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800',
    tags: ['disability rights', 'accessibility', 'inclusion'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1050,
    createdBy: adminUser._id
  },
  {
    title: 'Elder Care: Respecting and Supporting Seniors',
    slug: 'elder-care-respecting-supporting-seniors',
    description: 'Initiatives providing dignity and care for elderly citizens',
    content: 'With changing family structures, elder care services are becoming crucial. NGOs and social enterprises are creating solutions that provide seniors with care, companionship, and respect...',
    category: 'impact',
    author: 'Gerontologist Dr. Sunil Joshi',
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800',
    tags: ['elder care', 'senior citizens', 'aging'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1240,
    createdBy: adminUser._id
  },
  {
    title: 'Legal Aid: Justice for the Marginalized',
    slug: 'legal-aid-justice-for-marginalized',
    description: 'Free legal services ensuring access to justice',
    content: 'Legal aid organizations are providing free representation to those who cannot afford lawyers. They\'re ensuring that justice is accessible to all, regardless of economic status...',
    category: 'impact',
    author: 'Lawyer Advocate Ramesh Gupta',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    tags: ['legal aid', 'justice', 'human rights'],
    published: true,
    featured: false,
    readTime: 9,
    views: 1150,
    createdBy: adminUser._id
  },
  {
    title: 'Animal Welfare: Protecting Voiceless Lives',
    slug: 'animal-welfare-protecting-voiceless-lives',
    description: 'Organizations rescuing and rehabilitating animals',
    content: 'Animal welfare groups are rescuing strays, rehabilitating injured wildlife, and advocating for stronger protection laws. Their compassion is creating a kinder world...',
    category: 'impact',
    author: 'Veterinarian Dr. Anjali Das',
    imageUrl: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800',
    tags: ['animal welfare', 'rescue', 'conservation'],
    published: true,
    featured: false,
    readTime: 7,
    views: 990,
    createdBy: adminUser._id
  },
  {
    title: 'Disaster Relief: Communities Coming Together',
    slug: 'disaster-relief-communities-coming-together',
    description: 'Rapid response teams providing emergency assistance',
    content: 'When disasters strike, volunteer networks activate immediately to provide relief. Their organized response saves lives and helps communities rebuild...',
    category: 'impact',
    author: 'Relief Coordinator Vikram Singh',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    tags: ['disaster relief', 'emergency response', 'community resilience'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1480,
    createdBy: adminUser._id
  },
  {
    title: 'Cultural Preservation: Saving Heritage for Future',
    slug: 'cultural-preservation-saving-heritage-future',
    description: 'Efforts to document and preserve indigenous cultures',
    content: 'Anthropologists and cultural activists are working with indigenous communities to preserve languages, traditions, and knowledge systems before they disappear...',
    category: 'impact',
    author: 'Anthropologist Dr. Meera Krishnan',
    imageUrl: 'https://images.unsplash.com/photo-1604651190873-0a691019a3e3?w=800',
    tags: ['cultural preservation', 'heritage', 'indigenous knowledge'],
    published: true,
    featured: false,
    readTime: 9,
    views: 1310,
    createdBy: adminUser._id
  },

  // Startup Category (5 stories)
  {
    title: 'From Garage to Unicorn: The Indian SaaS Revolution',
    slug: 'garage-to-unicorn-indian-saas-revolution',
    description: 'How Indian startups are building billion-dollar software companies',
    content: 'The Indian SaaS industry has grown from $1 billion in 2015 to over $12 billion in 2025. Meet the entrepreneurs who are building world-class software companies from India, competing globally and creating thousands of high-value jobs. From Freshworks to Zoho, these companies prove that Indian startups can build products the world wants to use.',
    category: 'startup',
    author: 'Vikram Malhotra',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    tags: ['SaaS', 'startup', 'technology'],
    published: true,
    featured: true,
    readTime: 8,
    views: 2500,
    createdBy: adminUser._id
  },
  {
    title: 'D2C Brands: Disrupting Traditional Retail',
    slug: 'd2c-brands-disrupting-traditional-retail',
    description: 'Direct-to-consumer startups changing how India shops',
    content: 'Direct-to-consumer brands are bypassing traditional retail channels and reaching customers directly through digital platforms. From beauty products to furniture, Indian D2C startups are building strong brands with loyal customer bases. Learn how brands like Mamaearth, Sugar Cosmetics, and Wow Skin Science grew from zero to hundreds of crores in revenue.',
    category: 'startup',
    author: 'Neha Kapoor',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    tags: ['D2C', 'e-commerce', 'retail'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1850,
    createdBy: adminUser._id
  },
  {
    title: 'EdTech Revolution: Making Quality Education Accessible',
    slug: 'edtech-revolution-quality-education-accessible',
    description: 'How education technology startups are democratizing learning',
    content: 'Indian EdTech startups have transformed education access across the country. BYJU\'S, Unacademy, and Vedantu have made quality education accessible to students in tier-2 and tier-3 cities. With personalized learning, AI-powered content, and affordable pricing, these platforms are leveling the playing field for millions of students.',
    category: 'startup',
    author: 'Professor Rajesh Kumar',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    tags: ['EdTech', 'education', 'innovation'],
    published: true,
    featured: true,
    readTime: 9,
    views: 2200,
    createdBy: adminUser._id
  },
  {
    title: 'Fintech for the Masses: Banking the Unbanked',
    slug: 'fintech-masses-banking-unbanked',
    description: 'Financial technology bringing banking to rural India',
    content: 'Fintech startups are revolutionizing financial inclusion in India. From UPI payments to microloans, these companies are bringing banking services to people who were previously excluded from the formal financial system. Paytm, PhonePe, and BharatPe have made digital payments accessible even in small villages, while startups like CRED and Jupiter are building next-generation banking experiences.',
    category: 'startup',
    author: 'Aarti Mehta',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    tags: ['fintech', 'digital payments', 'financial inclusion'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1950,
    createdBy: adminUser._id
  },
  {
    title: 'AgriTech: Technology Meets Farming',
    slug: 'agritech-technology-meets-farming',
    description: 'Startups bringing innovation to agriculture',
    content: 'AgriTech startups are solving critical problems for Indian farmers. From precision farming using drones to direct market linkages eliminating middlemen, technology is transforming agriculture. DeHaat, Ninjacart, and WayCool are building supply chain infrastructure that ensures farmers get fair prices while consumers get fresh produce. These startups are making farming more profitable and sustainable.',
    category: 'startup',
    author: 'Farmer Leader Suresh Patel',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    tags: ['AgriTech', 'farming', 'technology'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1650,
    createdBy: adminUser._id
  },

  // Travel Category (5 stories)
  {
    title: 'Hidden Gems of Northeast India: A Complete Travel Guide',
    slug: 'hidden-gems-northeast-india-travel-guide',
    description: 'Exploring the unexplored beauty of India\'s northeastern states',
    content: 'Northeast India is a paradise waiting to be discovered. From the living root bridges of Meghalaya to the pristine beaches of Andaman, from the monasteries of Arunachal Pradesh to the tea gardens of Assam, this region offers experiences unlike anywhere else in India. Learn about the unique cultures, stunning landscapes, and adventure opportunities that await in India\'s most underrated travel destination.',
    category: 'travel',
    author: 'Travel Blogger Anjali Roy',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    tags: ['Northeast India', 'travel', 'adventure'],
    published: true,
    featured: true,
    readTime: 10,
    views: 3200,
    createdBy: adminUser._id
  },
  {
    title: 'Spiritual Journey: Temple Towns of South India',
    slug: 'spiritual-journey-temple-towns-south-india',
    description: 'Discovering ancient temples and living traditions',
    content: 'South India\'s temple towns are not just religious sites but living museums of architecture, art, and culture. From Madurai\'s Meenakshi Temple to Tirupati\'s Venkateswara Temple, from Thanjavur\'s Brihadeeswarar Temple to Hampi\'s ruins, these sacred spaces offer insights into centuries of devotion and craftsmanship. Experience early morning pujas, classical music performances, and traditional cuisine in these timeless destinations.',
    category: 'travel',
    author: 'Cultural Guide Lakshmi Iyer',
    imageUrl: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?w=800',
    tags: ['temples', 'spirituality', 'South India'],
    published: true,
    featured: false,
    readTime: 9,
    views: 2450,
    createdBy: adminUser._id
  },
  {
    title: 'Himalayan Adventures: Trekking Through the Roof of the World',
    slug: 'himalayan-adventures-trekking-roof-world',
    description: 'Epic treks in the world\'s highest mountain range',
    content: 'The Himalayas offer some of the world\'s most spectacular trekking experiences. From beginner-friendly trails like Triund to challenging expeditions like Chadar Trek on frozen Zanskar River, there\'s something for every adventure level. Explore alpine meadows, cross high-altitude passes, camp beside pristine lakes, and witness sunrises over snow-capped peaks. This comprehensive guide covers preparation, best seasons, and safety tips for Himalayan trekking.',
    category: 'travel',
    author: 'Mountain Guide Tenzing Sherpa',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    tags: ['Himalayas', 'trekking', 'adventure'],
    published: true,
    featured: true,
    readTime: 11,
    views: 2800,
    createdBy: adminUser._id
  },
  {
    title: 'Coastal Karnataka: Beaches, Forts, and Cuisine',
    slug: 'coastal-karnataka-beaches-forts-cuisine',
    description: 'Exploring India\'s western coastline treasures',
    content: 'Karnataka\'s coastline is a blend of pristine beaches, historic forts, and mouth-watering cuisine. From Gokarna\'s serene beaches to Udupi\'s temple cuisine, from Murudeshwar\'s towering Shiva statue to Mangalore\'s colonial architecture, this region offers diverse experiences. Discover hidden coves, taste authentic Mangalorean seafood, witness sunset at Om Beach, and explore ancient ports that traded with Romans and Arabs.',
    category: 'travel',
    author: 'Food & Travel Writer Shreya Nair',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    tags: ['Karnataka', 'beaches', 'coastal'],
    published: true,
    featured: false,
    readTime: 8,
    views: 2100,
    createdBy: adminUser._id
  },
  {
    title: 'Heritage Walks: Old Delhi\'s Living History',
    slug: 'heritage-walks-old-delhi-living-history',
    description: 'Walking through centuries of Delhi\'s vibrant past',
    content: 'Old Delhi\'s narrow lanes hide centuries of history, culture, and traditions. From Chandni Chowk\'s bustling markets to Jama Masjid\'s peaceful courtyard, from Paranthe Wali Gali\'s legendary food to Kinari Bazaar\'s wedding accessories, every corner tells a story. Join heritage walks led by local historians who bring alive tales of Mughal emperors, freedom fighters, and ordinary people who shaped this extraordinary city.',
    category: 'travel',
    author: 'Heritage Expert Sohail Ahmed',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    tags: ['Delhi', 'heritage', 'history'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1890,
    createdBy: adminUser._id
  },

  // Farming Category (5 stories)
  {
    title: 'Innovation in Agriculture: The Future of Farming',
    slug: 'innovation-agriculture-future',
    description: 'How technology is revolutionizing Indian farming and empowering farmers',
    content: `Indian agriculture is undergoing a technological revolution. Smart farming techniques and innovative practices are transforming how food is grown, making farming more productive and sustainable.

Precision Agriculture

Farmers are now using GPS technology, drones, and sensors to monitor soil health, water levels, and crop growth. This data-driven approach is optimizing resource use and increasing yields.

Drip Irrigation Revolution

Water scarcity is a major challenge, but drip irrigation systems are helping farmers use water efficiently. This technology can reduce water usage by up to 60% while improving crop yields.

Organic Farming Renaissance

There's a growing movement towards organic farming. Farmers are rediscovering traditional practices and combining them with modern knowledge to grow chemical-free crops.

Farm-to-Market Digital Platforms

Mobile apps and e-commerce platforms are connecting farmers directly with consumers and markets, eliminating middlemen and ensuring better prices for farmers.

Agri-Tech Startups

Innovative startups are developing solutions ranging from weather prediction apps to AI-powered pest detection systems, empowering farmers with information and tools.

Cooperative Farming Models

Farmer Producer Organizations (FPOs) are helping small farmers pool resources, share knowledge, and access better markets collectively.

Sustainable Practices

Intercropping, crop rotation, and natural pest management are being revived. These sustainable practices are improving soil health and reducing dependency on chemicals.

Youth in Agriculture

A new generation of educated youth is entering farming with fresh ideas and entrepreneurial spirit, bringing innovation to rural areas.

The Way Forward

With technology and innovation, Indian agriculture is poised for a transformation. The future of farming is smart, sustainable, and prosperous.`,
    category: 'farming',
    author: 'TezTecch Team',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    tags: ['agriculture', 'technology', 'innovation', 'farming'],
    published: true,
    featured: true,
    readTime: 8,
    views: 1560,
    createdBy: adminUser._id
  },
  {
    title: 'Organic Farming Revolution: Chemical-Free Agriculture',
    slug: 'organic-farming-revolution-chemical-free-agriculture',
    description: 'How farmers are transitioning to sustainable organic methods',
    content: 'Organic farming is gaining momentum across India as farmers realize the long-term benefits of chemical-free agriculture. From Sikkim, which became India\'s first fully organic state, to individual farmers in Punjab switching from chemical-intensive to natural farming, the movement is growing. Learn about traditional techniques like crop rotation, natural pest control, and composting that are being rediscovered and modernized for sustainable food production.',
    category: 'farming',
    author: 'Agricultural Scientist Dr. Ramesh Chandra',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    tags: ['organic farming', 'sustainable agriculture', 'chemical-free'],
    published: true,
    featured: true,
    readTime: 9,
    views: 2350,
    createdBy: adminUser._id
  },
  {
    title: 'Drip Irrigation: Water Conservation in Action',
    slug: 'drip-irrigation-water-conservation-action',
    description: 'Smart irrigation systems saving water and boosting yields',
    content: 'Drip irrigation is transforming farming in water-scarce regions. By delivering water directly to plant roots, farmers are reducing water usage by 30-60% while increasing yields by 20-40%. Success stories from Maharashtra, Gujarat, and Karnataka show how this technology is making farming viable even in drought-prone areas. Government subsidies and farmer cooperatives are making drip irrigation accessible to small farmers.',
    category: 'farming',
    author: 'Water Management Expert Kavita Desai',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    tags: ['irrigation', 'water conservation', 'smart farming'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1920,
    createdBy: adminUser._id
  },
  {
    title: 'Crop Diversification: Moving Beyond Rice and Wheat',
    slug: 'crop-diversification-beyond-rice-wheat',
    description: 'Farmers exploring profitable alternative crops',
    content: 'Progressive farmers are breaking away from traditional rice-wheat cycles and experimenting with high-value crops. From quinoa in the Himalayas to dragon fruit in Maharashtra, from avocados in Tamil Nadu to berries in Himachal Pradesh, Indian farmers are proving that diverse crops can be more profitable and sustainable. These success stories are inspiring others to explore new agricultural opportunities.',
    category: 'farming',
    author: 'Farm Innovation Consultant Amit Verma',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    tags: ['crop diversification', 'alternative crops', 'innovation'],
    published: true,
    featured: true,
    readTime: 10,
    views: 2150,
    createdBy: adminUser._id
  },
  {
    title: 'Farm-to-Fork: Direct Marketing Success Stories',
    slug: 'farm-to-fork-direct-marketing-success',
    description: 'Farmers connecting directly with consumers for better prices',
    content: 'By eliminating middlemen, farmers are doubling their incomes while providing fresh produce to urban consumers. Farmer Producer Organizations (FPOs), WhatsApp marketing, and online platforms are enabling direct connections. From milk cooperatives in Gujarat to vegetable farmers in Pune selling directly to apartments, these models prove that farmers can capture more value from their produce.',
    category: 'farming',
    author: 'Agricultural Economist Sunita Rao',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=800',
    tags: ['direct marketing', 'farmer income', 'FPO'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1680,
    createdBy: adminUser._id
  },
  {
    title: 'Integrated Farming: Multiple Income Streams from One Farm',
    slug: 'integrated-farming-multiple-income-streams',
    description: 'Combining crops, livestock, and aquaculture for maximum profit',
    content: 'Integrated farming systems combine crops, dairy, poultry, fish farming, and more on a single farm, creating synergies and multiple income sources. Crop waste feeds cattle, cattle waste enriches fish ponds, and fish waste fertilizes crops. This circular economy model maximizes land use, reduces costs, and provides year-round income. Success stories from Kerala, Andhra Pradesh, and West Bengal demonstrate the power of integration.',
    category: 'farming',
    author: 'Farm Systems Expert Dr. Ashok Patel',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    tags: ['integrated farming', 'diversification', 'sustainable'],
    published: true,
    featured: false,
    readTime: 9,
    views: 1840,
    createdBy: adminUser._id
  },

  // Education Category (5 stories)
  {
    title: 'Digital Classrooms: Technology Transforming Education',
    slug: 'digital-classrooms-technology-transforming-education',
    description: 'How smart classrooms are enhancing learning experiences',
    content: 'Digital classrooms equipped with interactive whiteboards, tablets, and learning management systems are revolutionizing education in India. Students in remote villages now access the same quality content as their urban counterparts. Teachers use multimedia presentations, virtual labs, and gamification to make learning engaging. Schools partnering with tech companies are seeing improved attendance, better comprehension, and higher exam scores.',
    category: 'education',
    author: 'Education Technology Specialist Priya Malhotra',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    tags: ['digital learning', 'technology', 'classroom innovation'],
    published: true,
    featured: true,
    readTime: 8,
    views: 2650,
    createdBy: adminUser._id
  },
  {
    title: 'Mid-Day Meal: Nourishment Beyond the Classroom',
    slug: 'mid-day-meal-nourishment-beyond-classroom',
    description: 'How school meals are combating hunger and boosting enrollment',
    content: 'India\'s Mid-Day Meal Scheme feeds 120 million children daily, making it the world\'s largest school meal program. Beyond nutrition, it\'s increasing enrollment, improving attendance, and reducing dropout rates, especially among girls. Success stories from states like Tamil Nadu and Gujarat show how quality meals can transform not just health but educational outcomes. Local women\'s groups running kitchens are also empowered economically.',
    category: 'education',
    author: 'Social Welfare Researcher Meera Krishnan',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800',
    tags: ['mid-day meal', 'child nutrition', 'education policy'],
    published: true,
    featured: false,
    readTime: 7,
    views: 1950,
    createdBy: adminUser._id
  },
  {
    title: 'Skill Development: Vocational Training for Employment',
    slug: 'skill-development-vocational-training-employment',
    description: 'Bridging the gap between education and employability',
    content: 'Vocational training programs are preparing youth for real-world jobs. From hospitality to healthcare, from IT to automotive, skill development centers are offering industry-relevant training with placement guarantees. ITI modernization, PMKVY certification, and industry partnerships are creating pathways for students who don\'t want traditional college degrees but need marketable skills for good careers.',
    category: 'education',
    author: 'Skill Training Coordinator Vikram Singh',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tags: ['skill development', 'vocational training', 'employment'],
    published: true,
    featured: true,
    readTime: 9,
    views: 2250,
    createdBy: adminUser._id
  },
  {
    title: 'Teacher Training: Building Better Educators',
    slug: 'teacher-training-building-better-educators',
    description: 'Professional development programs transforming teaching quality',
    content: 'Quality education starts with quality teachers. Innovative teacher training programs combining pedagogy, psychology, and technology are producing educators equipped for 21st-century classrooms. From rural schools in Rajasthan to urban institutes in Bangalore, continuous professional development is helping teachers adopt modern teaching methods, handle diverse learners, and use technology effectively.',
    category: 'education',
    author: 'Educator Development Expert Dr. Anjali Sharma',
    imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800',
    tags: ['teacher training', 'professional development', 'education quality'],
    published: true,
    featured: false,
    readTime: 8,
    views: 1780,
    createdBy: adminUser._id
  },
  {
    title: 'Inclusive Education: Learning for All Children',
    slug: 'inclusive-education-learning-all-children',
    description: 'Creating classrooms where every child can thrive',
    content: 'Inclusive education ensures children with disabilities learn alongside their peers in regular schools. Special educators, assistive technologies, and modified curricula are making mainstream education accessible. Success stories from Kerala, Tamil Nadu, and Delhi show how inclusion benefits not just children with disabilities but enriches learning for all students. Schools are becoming truly welcoming spaces where diversity is celebrated.',
    category: 'education',
    author: 'Special Education Advocate Radhika Menon',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    tags: ['inclusive education', 'disability', 'special needs'],
    published: true,
    featured: false,
    readTime: 10,
    views: 2020,
    createdBy: adminUser._id
  }
];

// Sample Videos
const videos = [
  {
    title: 'The Impact of Clean Energy in Rural India',
    slug: 'impact-clean-energy-rural-india',
    description: 'Documentary showcasing solar power transformation',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    duration: '12:45',
    type: 'youtube',
    category: 'stories',
    author: 'TezTecch Team',
    tags: ['solar energy', 'rural development', 'documentary'],
    published: true,
    featured: true,
    views: 5600,
    createdBy: adminUser._id
  },
  {
    title: 'Quick Parenting Tips for Working Parents',
    slug: 'quick-parenting-tips-working-parents',
    description: 'Short video with practical advice',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
    duration: '3:20',
    type: 'short',
    category: 'shorts',
    author: 'Parenting Expert',
    tags: ['parenting', 'work-life balance', 'tips'],
    published: true,
    featured: false,
    views: 3200,
    createdBy: adminUser._id
  }
];

// Sample Visual Stories
const visualStories = [
  {
    title: 'A Day in the Life of a Social Entrepreneur',
    slug: 'day-life-social-entrepreneur',
    description: 'Follow the journey of change-makers',
    slides: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        caption: 'Morning meetings with community leaders',
        order: 1
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
        caption: 'Field visits to project sites',
        order: 2
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
        caption: 'Making impact, one step at a time',
        order: 3
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    category: 'changemakers',
    author: 'TezTecch Stories',
    published: true,
    featured: true,
    views: 4500,
    createdBy: adminUser._id
  }
];

// Sample Categories
const categories = [
  { name: 'Changemakers', slug: 'changemakers', description: 'Stories of inspiring individuals making a difference', active: true },
  { name: 'Parenting', slug: 'parenting', description: 'Tips and insights for modern parents', active: true },
  { name: 'Sustainability', slug: 'sustainability', description: 'Environmental and sustainable living', active: true },
  { name: 'Impact', slug: 'impact', description: 'Social impact stories and initiatives', active: true }
];

// Sample Hero Slides
const heroSlides = [
  {
    title: 'Empowering Communities Through Innovation',
    slug: 'empowering-communities-innovation',
    description: 'Discover stories of change and transformation',
    category: 'CHANGEMAKERS',
    author: 'TezTecch Team',
    date: '12 Jan 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600',
    order: 1,
    active: true
  },
  {
    title: 'Join the Sustainability Movement',
    slug: 'sustainability-movement',
    description: 'Learn how you can make a difference',
    category: 'SUSTAINABILITY',
    author: 'TezTecch Team',
    date: '12 Jan 2026',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600',
    order: 2,
    active: true
  },
  {
    title: 'Innovation in Agriculture: The Future of Farming',
    slug: 'innovation-agriculture-future',
    description: 'How technology is revolutionizing Indian farming',
    category: 'FARMING',
    author: 'TezTecch Team',
    date: '12 Jan 2026',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600',
    order: 3,
    active: true
  }
];

// Sample Pages
const pages = [
  {
    title: 'About Us',
    slug: 'about',
    template: 'about',
    content: '<h1>About TezTecch Buzz</h1><p>We are a platform dedicated to sharing stories of change, innovation, and social impact.</p>',
    metaDescription: 'Learn about TezTecch Buzz and our mission',
    published: true,
    createdBy: adminUser._id
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    template: 'privacy-policy',
    content: '<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>',
    metaDescription: 'TezTecch Buzz Privacy Policy',
    published: true,
    createdBy: adminUser._id
  }
];

// Sample Jobs
const jobs = [
  {
    title: 'Content Writer',
    slug: 'content-writer',
    department: 'Editorial',
    location: 'Mumbai / Remote',
    salary: '₹4-6 LPA',
    jobType: 'full-time',
    experience: '2-4 years',
    description: 'We are looking for a passionate content writer to join our editorial team...',
    requirements: ['Excellent writing skills', 'Experience in digital media', 'Understanding of social impact'],
    applicationEmail: 'careers@teztecch.com',
    published: true,
    featured: true,
    createdBy: adminUser._id
  },
  {
    title: 'Video Editor',
    slug: 'video-editor',
    department: 'Production',
    location: 'Delhi / Hybrid',
    salary: '₹5-7 LPA',
    jobType: 'full-time',
    experience: '3-5 years',
    description: 'Join our production team to create compelling visual stories...',
    requirements: ['Adobe Premiere Pro', 'After Effects', 'Creative storytelling'],
    applicationEmail: 'careers@teztecch.com',
    published: true,
    featured: false,
    createdBy: adminUser._id
  }
];

// Sample Press Releases
const pressReleases = [
  {
    title: 'TezTecch Buzz Launches New Social Impact Platform',
    slug: 'teztecch-launches-impact-platform',
    category: 'company-news',
    date: new Date('2026-01-10'),
    excerpt: 'New platform aims to amplify voices of change-makers across India',
    content: 'Mumbai, January 10, 2026 - TezTecch Buzz announced today the launch of its innovative social impact platform...',
    published: true,
    featured: true,
    createdBy: adminUser._id
  }
];

// Sample Menu Items
const menuItems = [
  { label: 'Home', url: '/', type: 'header', order: 1, active: true },
  { label: 'Stories', url: '/stories', type: 'header', order: 2, active: true },
  { label: 'Videos', url: '/videos', type: 'header', order: 3, active: true },
  { label: 'Visual Stories', url: '/visual-stories', type: 'footer-stories', order: 4, active: true },
  { label: 'About', url: '/about', type: 'footer-more', order: 5, active: true },
  { label: 'Careers', url: '/careers', type: 'footer-more', order: 6, active: true },
  { label: 'Contact', url: '/contact', type: 'footer-more', order: 7, active: true }
];

    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Story.deleteMany({}),
      Video.deleteMany({}),
      VisualStory.deleteMany({}),
      Category.deleteMany({}),
      HeroSlide.deleteMany({}),
      Page.deleteMany({}),
      Job.deleteMany({}),
      PressRelease.deleteMany({}),
      MenuItem.deleteMany({})
    ]);
    console.log('✅ Existing data cleared');

    console.log('📝 Inserting sample data...');
    
    await Story.insertMany(stories);
    console.log('✅ Stories added');

    await Video.insertMany(videos);
    console.log('✅ Videos added');

    await VisualStory.insertMany(visualStories);
    console.log('✅ Visual Stories added');

    await Category.insertMany(categories);
    console.log('✅ Categories added');

    await HeroSlide.insertMany(heroSlides);
    console.log('✅ Hero Slides added');

    await Page.insertMany(pages);
    console.log('✅ Pages added');

    await Job.insertMany(jobs);
    console.log('✅ Jobs added');

    await PressRelease.insertMany(pressReleases);
    console.log('✅ Press Releases added');

    await MenuItem.insertMany(menuItems);
    console.log('✅ Menu Items added');

    console.log('\n🎉 Sample data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Stories: ${stories.length}`);
    console.log(`   - Videos: ${videos.length}`);
    console.log(`   - Visual Stories: ${visualStories.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Hero Slides: ${heroSlides.length}`);
    console.log(`   - Pages: ${pages.length}`);
    console.log(`   - Jobs: ${jobs.length}`);
    console.log(`   - Press Releases: ${pressReleases.length}`);
    console.log(`   - Menu Items: ${menuItems.length}`);
    console.log('\n✨ You can now view data in admin panel and main website!');
    console.log('   Admin Panel: http://localhost:5174');
    console.log('   Main Website: http://localhost:5173');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

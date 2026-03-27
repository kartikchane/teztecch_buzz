import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './StoryDetail.css';
import '../components/BackToHome.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StoryDetail = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStory();
  }, [slug]);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/public/stories/${slug}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        // Map backend data to frontend structure
        const mappedStory = {
          title: data.data.title,
          slug: data.data.slug,
          image: data.data.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
          category: data.data.category.charAt(0).toUpperCase() + data.data.category.slice(1),
          author: data.data.author,
          date: new Date(data.data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: `${data.data.readTime || 5} min read`,
          content: parseContent(data.data.content),
          tags: data.data.tags || [],
          views: data.data.views || 0
        };
        setStory(mappedStory);
      } else {
        setError('Story not found');
      }
    } catch (err) {
      console.error('Error fetching story:', err);
      setError('Failed to load story');
    } finally {
      setLoading(false);
    }
  };

  const parseContent = (content) => {
    // Split content into paragraphs and detect headings
    if (!content) return [];
    
    const lines = content.split('\n').filter(l => l.trim());
    const parsed = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      // Check if line is a heading (short line, no punctuation at end, starts with capital)
      if (trimmed.length < 60 && 
          !trimmed.endsWith('.') && 
          !trimmed.endsWith(',') && 
          !trimmed.endsWith(':') &&
          trimmed[0] === trimmed[0].toUpperCase() &&
          !trimmed.startsWith('-') &&
          !trimmed.match(/^\d+\./) &&
          trimmed.split(' ').length <= 8) {
        parsed.push({
          type: 'heading',
          text: trimmed
        });
      } 
      // Convert list items to paragraphs
      else if (trimmed.length > 0) {
        // Remove bullet points or numbers from the start
        let text = trimmed.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '');
        parsed.push({
          type: 'paragraph',
          text: text
        });
      }
    });
    
    return parsed;
  };

  // Function to generate story content based on slug (fallback)
  const generateStoryContent = (slug) => {
    // Extract category and topic from slug
    const parts = slug.split('-');
    
    // Define category to readable name mapping with multi-word categories
    const categoryMap = {
      'sustainability': { name: 'Sustainability', words: 1 },
      'startup': { name: 'Startup', words: 1 },
      'travel': { name: 'Travel', words: 1 },
      'farming': { name: 'Farming', words: 1 },
      'education': { name: 'Education', words: 1 },
      'culture': { name: 'Culture', words: 1 },
      'health': { name: 'Health', words: 1 },
      'technology': { name: 'Technology', words: 1 },
      'environment': { name: 'Environment', words: 1 },
      'innovation': { name: 'Innovation', words: 1 },
      'social': { name: 'Social Impact', words: 2 },
      'women': { name: 'Women Power', words: 2 },
      'food': { name: 'Food', words: 1 },
      'sports': { name: 'Sports', words: 1 },
      'art': { name: 'Art', words: 1 },
      'music': { name: 'Music', words: 1 },
      'wildlife': { name: 'Wildlife', words: 1 },
      'science': { name: 'Science', words: 1 },
      'architecture': { name: 'Architecture', words: 1 },
      'heritage': { name: 'Heritage', words: 1 },
      'handicraft': { name: 'Handicraft', words: 1 },
      'fashion': { name: 'Fashion', words: 1 },
      'photography': { name: 'Photography', words: 1 },
      'literature': { name: 'Literature', words: 1 },
      'community': { name: 'Community', words: 1 },
      'youth': { name: 'Youth', words: 1 },
      'elderly': { name: 'Elderly Care', words: 2 },
      'animal': { name: 'Animal Welfare', words: 2 },
      'wellness': { name: 'Wellness', words: 1 },
      'adventure': { name: 'Adventure', words: 1 }
    };

    // Detect category and extract topic
    let category = 'General';
    let topicParts = parts;
    
    // Check for single-word categories
    if (categoryMap[parts[0]]) {
      const catData = categoryMap[parts[0]];
      category = catData.name;
      topicParts = parts.slice(catData.words);
    } 
    // Check for two-word categories
    else if (parts.length >= 2) {
      const twoWordKey = parts[0];
      if (categoryMap[twoWordKey] && categoryMap[twoWordKey].words === 2) {
        category = categoryMap[twoWordKey].name;
        topicParts = parts.slice(2);
      }
    }
    
    const topic = topicParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const title = `${topic}: An Inspiring Story from India`;

    // Generate dynamic, engaging content based on category
    const content = [
      {
        type: "paragraph",
        text: `In the heart of India, where tradition meets innovation, the story of ${topic.toLowerCase()} stands as a testament to the transformative power of human determination. This is not just another success story—it's a movement that's reshaping communities, inspiring thousands, and proving that sustainable change is possible when passion meets purpose.`
      },
      {
        type: "heading",
        text: "The Genesis of Change"
      },
      {
        type: "paragraph",
        text: `The journey began in 2020, when a small group of passionate changemakers identified ${topic.toLowerCase()} as a critical solution to challenges facing their community. What started as weekly meetings in a modest community center has evolved into a full-fledged initiative touching thousands of lives across multiple states.`
      },
      {
        type: "paragraph",
        text: `"We were just ordinary people who refused to accept the status quo," recalls Rajesh Kumar, one of the founding members. "We saw a problem, envisioned a solution, and decided to act. ${topic} became our vehicle for creating the change we wanted to see."`
      },
      {
        type: "quote",
        text: `We never imagined our humble beginning would spark a movement. But when you work with genuine care for your community and refuse to give up, extraordinary things happen.`,
        author: "Priya Sharma, Co-founder"
      },
      {
        type: "heading",
        text: "Measurable Impact That Matters"
      },
      {
        type: "paragraph",
        text: `The numbers tell a compelling story, but they only scratch the surface of the real human impact:`
      },
      {
        type: "list",
        items: [
          "Over 15,000 individuals directly benefited across rural and urban areas",
          "Created 500+ sustainable livelihood opportunities for local communities",
          "Reduced environmental footprint by 40% through innovative, eco-friendly practices",
          "Inspired similar initiatives in 22 states across India",
          "Secured partnerships with government bodies, NGOs, and corporate sponsors",
          "Trained 300+ community leaders who now run independent programs",
          "Achieved 85% success rate in meeting project goals and objectives"
        ]
      },
      {
        type: "paragraph",
        text: `But statistics alone don't capture the essence of transformation. Consider Meera Devi, a 45-year-old mother of three from a small village in Uttar Pradesh. Through ${topic.toLowerCase()}, she not only gained new skills but became a trainer herself, now empowering other women in her community. "This changed my entire family's future," she shares with tears of joy.`
      },
      {
        type: "heading",
        text: "Navigating the Challenges"
      },
      {
        type: "paragraph",
        text: `Every transformative journey faces obstacles, and this was no exception. The early days were marked by skepticism from traditionalists, limited financial resources, bureaucratic hurdles, and the challenge of changing deeply ingrained mindsets. Many questioned whether ${topic.toLowerCase()} could truly make a difference.`
      },
      {
        type: "paragraph",
        text: `"The first six months were the hardest," admits Arun Patel, the project coordinator. "We faced rejection, ran out of funds twice, and at one point, our team was down to just five committed individuals. But we believed in our mission."`
      },
      {
        type: "paragraph",
        text: `The breakthrough came when they shifted their approach from top-down implementation to community-driven participation. By involving local residents in every decision, demonstrating quick wins, and remaining flexible in their methods, they built the trust necessary for sustainable change.`
      },
      {
        type: "heading",
        text: "The Power of Community"
      },
      {
        type: "paragraph",
        text: `What distinguishes this initiative is its unwavering commitment to community ownership. Local residents aren't mere beneficiaries—they're co-creators, decision-makers, and ambassadors of change. This participatory approach has been crucial to the project's success and sustainability.`
      },
      {
        type: "paragraph",
        text: `Weekly community meetings, monthly skill-building workshops, and regular feedback sessions ensure every voice is heard. Youth brigades, women's collectives, and elder councils all play vital roles. The initiative has become a living example of grassroots democracy in action.`
      },
      {
        type: "quote",
        text: `This isn't their project for us—it's our project for our future. We own it, we shape it, and we're committed to making it succeed.`,
        author: "Vikram Singh, Community Member"
      },
      {
        type: "heading",
        text: "Building for Sustainability"
      },
      {
        type: "paragraph",
        text: `From day one, sustainability—economic, environmental, and social—has been the cornerstone. The focus isn't on creating dependency but on building lasting capacity. ${topic} serves as a catalyst, not a crutch.`
      },
      {
        type: "list",
        items: [
          "Comprehensive training programs ensuring skills transfer to new generations",
          "Income-generating models that make initiatives financially self-sufficient",
          "Strategic partnerships with local businesses creating mutual value",
          "Open-source documentation enabling replication in other communities",
          "Environmental impact assessments integrated into all activities",
          "Youth mentorship programs securing long-term leadership pipeline",
          "Digital platforms for knowledge sharing and continuous learning"
        ]
      },
      {
        type: "paragraph",
        text: `The initiative now generates 70% of its operational costs through community enterprises, grants, and social impact investments. The goal is 100% financial independence by 2027.`
      },
      {
        type: "heading",
        text: "Recognition and Growth"
      },
      {
        type: "paragraph",
        text: `Success has brought well-deserved recognition. The initiative has received the National Social Impact Award, been featured in leading media outlets, and attracted visits from policy makers and researchers. But the team remains grounded.`
      },
      {
        type: "paragraph",
        text: `"Awards are nice, but our real achievement is the smile on a child's face when their parent comes home with dignity and income," says Sunita Reddy, the communications lead. "That's what drives us."`
      },
      {
        type: "paragraph",
        text: `The expansion roadmap is ambitious yet achievable: reaching 50 districts by 2026, launching an online academy for skills training, creating a national network of practitioners, developing a mobile app for real-time impact tracking, and establishing regional resource centers.`
      },
      {
        type: "heading",
        text: "Vision for Tomorrow"
      },
      {
        type: "paragraph",
        text: `The vision extends far beyond current boundaries. The team is developing a replicable blueprint that any community can adapt, regardless of their specific context or resources. ${topic} is becoming a model for participatory development.`
      },
      {
        type: "paragraph",
        text: `Technology integration is accelerating. A mobile app in development will enable knowledge sharing, real-time collaboration, and impact measurement. AI-powered tools will help optimize strategies based on data insights. Virtual reality experiences will showcase success stories to inspire others.`
      },
      {
        type: "paragraph",
        text: `International interest is growing too. Delegations from Southeast Asia and Africa have visited to learn and adapt the model. "Our dream is to see variations of this work creating impact globally," shares the team.`
      },
      {
        type: "heading",
        text: "Join the Movement"
      },
      {
        type: "paragraph",
        text: `This movement thrives on collective action. Whether you're an individual, organization, or institution, there are numerous ways to contribute:`
      },
      {
        type: "list",
        items: [
          "Volunteer your professional skills (teaching, marketing, tech, finance, etc.)",
          "Become a community ambassador spreading awareness in your network",
          "Provide financial support through one-time or monthly contributions",
          "Partner with your organization for CSR initiatives or skill-sharing programs",
          "Mentor young changemakers and share your expertise",
          "Start a similar initiative in your community using our open-source resources",
          "Join our online community to share ideas and best practices",
          "Advocate for supportive policies with local government"
        ]
      },
      {
        type: "paragraph",
        text: `Visit the initiative's website to learn more, sign up for newsletters, or schedule a visit. Every contribution, no matter how small, creates ripples of positive change.`
      },
      {
        type: "heading",
        text: "A Testament to Hope"
      },
      {
        type: "paragraph",
        text: `The story of ${topic.toLowerCase()} is ultimately about hope—hope that ordinary people can create extraordinary impact, that communities can solve their own problems when empowered, that sustainable development isn't just a buzzword but an achievable reality, and that India's future is being built by thousands of such grassroots initiatives.`
      },
      {
        type: "paragraph",
        text: `As you read this, somewhere in India, a new volunteer is joining the cause, a community is experiencing transformation, a child is dreaming bigger because of newfound opportunities, and the ripple effects of positive change continue to spread.`
      },
      {
        type: "quote",
        text: `Every great movement begins with a small group of committed individuals. ${topic} proves that with dedication, collaboration, and unwavering belief in your mission, anything is possible. The question isn't whether change can happen—it's whether you'll be part of making it happen.`,
        author: "Dr. Anita Desai, Impact Advisor"
      },
      {
        type: "paragraph",
        text: `This is more than a success story. It's an invitation. An invitation to believe in possibility, to act on your convictions, and to join a growing movement of changemakers transforming India one community at a time. The future is being written right now, and there's a pen waiting for you.`
      }
    ];

    const authors = ["Priya Sharma", "Anita Desai", "Rajesh Kumar", "Meera Iyer", "Vikram Singh", "Sunita Reddy", "Arun Patel", "Divya Menon", "Ravi Patel", "Kavita Nair"];
    
    // Category-specific images for better visual appeal
    const categoryImages = {
      'Sustainability': [
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200'
      ],
      'Startup': [
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
        'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200'
      ],
      'Travel': [
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200'
      ],
      'Farming': [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=1200',
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200'
      ],
      'Education': [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200'
      ],
      'Technology': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200'
      ],
      'Health': [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200'
      ],
      'Environment': [
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200',
        'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200'
      ],
      'Women Power': [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200'
      ],
      'Handicraft': [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
        'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200'
      ],
      'Wildlife': [
        'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200',
        'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
        'https://images.unsplash.com/photo-1535338454770-5497d3bf7733?w=1200'
      ],
      'Default': [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5470?w=1200',
        'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=1200'
      ]
    };

    // Get images for the category or use default
    const availableImages = categoryImages[category] || categoryImages['Default'];
    const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];

    return {
      title,
      category,
      author: authors[Math.floor(Math.random() * authors.length)],
      date: "December 20, 2025",
      readTime: `${8 + Math.floor(Math.random() * 5)} min read`,
      image: selectedImage,
      content,
      tags: [category, topic, "Social Impact", "Community", "India", "Changemakers"],
      relatedStories: []
    };
  };

  // Hardcoded featured stories (original content)
  const featuredStories = {
    'tree-planting-legacy': {
      title: "This 73-YO Man Plants 10,000 Trees Every Year to Honor His Late Parents",
      category: "Sustainability",
      author: "Priya Sharma",
      date: "December 20, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
      content: [
        {
          type: "paragraph",
          text: "In a small village in Maharashtra, 73-year-old Ramesh Patil has been quietly creating a green revolution. For the past 15 years, he has planted over 150,000 trees, transforming barren land into lush forests."
        },
        {
          type: "heading",
          text: "A Promise to His Parents"
        },
        {
          type: "paragraph",
          text: "Ramesh's journey began in 2010 when he lost his parents within months of each other. 'My father always loved nature, and my mother believed in giving back to the earth,' he recalls. 'I promised them at their funeral that I would honor their memory by planting trees.'"
        },
        {
          type: "paragraph",
          text: "What started as a personal tribute has now become a mission that has inspired an entire community. Every year, Ramesh plants between 8,000 to 10,000 trees during the monsoon season, carefully selecting native species that thrive in the local climate."
        },
        {
          type: "heading",
          text: "The Impact"
        },
        {
          type: "list",
          items: [
            "Over 150,000 trees planted across 200 acres",
            "Increased groundwater levels by 30% in surrounding areas",
            "Created habitat for 50+ bird species and local wildlife",
            "Inspired 500+ villagers to join the plantation drives",
            "Reduced local temperature by 2-3 degrees Celsius"
          ]
        },
        {
          type: "paragraph",
          text: "The transformation is remarkable. What was once arid land now houses diverse species of trees including neem, banyan, peepal, and fruit-bearing trees like mango and jamun."
        },
        {
          type: "quote",
          text: "Every tree I plant is a prayer for my parents and a gift to future generations.",
          author: "Ramesh Patil"
        },
        {
          type: "heading",
          text: "Community Involvement"
        },
        {
          type: "paragraph",
          text: "Ramesh doesn't work alone. He has organized monthly tree-planting drives where school children, college students, and local residents participate. 'It's important that young people understand their connection to nature,' he says."
        },
        {
          type: "paragraph",
          text: "The local government has now recognized his efforts, providing saplings and support for his initiative. Environmental organizations have also partnered with him to ensure proper care and maintenance of the planted trees."
        },
        {
          type: "heading",
          text: "Looking Ahead"
        },
        {
          type: "paragraph",
          text: "Despite his age, Ramesh shows no signs of slowing down. 'My goal is to reach 250,000 trees before I turn 80,' he shares with a smile. 'And I'm training young volunteers to continue this work long after I'm gone.'"
        },
        {
          type: "paragraph",
          text: "His story is a powerful reminder that one person's dedication can create ripples of change that benefit entire communities and ecosystems for generations to come."
        }
      ],
      tags: ["Environment", "Sustainability", "Social Impact", "Maharashtra", "Plantation"],
      relatedStories: [
        {
          title: "Mumbai Woman Turns Food Waste into Compost",
          slug: "food-waste-compost",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
        },
        {
          title: "Zero Waste Living: Bengaluru Family's Journey",
          slug: "zero-waste-family",
          image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
        }
      ]
    },
    'karonda-gardening': {
      title: "Monsoon Gardening: Grow Tangy Karonda (Indian Cranberry) in 6 Easy Steps",
      category: "Farming",
      author: "Anita Desai",
      date: "December 15, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
      content: [
        {
          type: "paragraph",
          text: "Karonda, also known as Indian cranberry or Carissa carandas, is a hardy shrub that produces delicious, tangy berries. Perfect for the monsoon season, this native Indian plant is not only easy to grow but also packed with nutrients."
        },
        {
          type: "heading",
          text: "Why Grow Karonda?"
        },
        {
          type: "paragraph",
          text: "Karonda is a superfood that's often overlooked. Rich in Vitamin C, iron, and antioxidants, these berries can be eaten fresh, made into pickles, or used in jams and chutneys. The plant is drought-resistant and requires minimal care once established."
        },
        {
          type: "heading",
          text: "Step-by-Step Growing Guide"
        },
        {
          type: "subheading",
          text: "Step 1: Choose the Right Location"
        },
        {
          type: "paragraph",
          text: "Karonda plants thrive in full sunlight and well-drained soil. Select a spot in your garden that receives at least 6 hours of direct sunlight daily. The plant can tolerate partial shade but fruit production will be reduced."
        },
        {
          type: "subheading",
          text: "Step 2: Prepare the Soil"
        },
        {
          type: "paragraph",
          text: "Mix garden soil with compost in a 2:1 ratio. Karonda prefers slightly acidic to neutral soil (pH 6.0-7.5). Add organic matter to improve drainage and nutrient content."
        },
        {
          type: "subheading",
          text: "Step 3: Planting"
        },
        {
          type: "paragraph",
          text: "During monsoon (June-August), dig a hole twice the size of the root ball. Place the sapling and fill with prepared soil mixture. Space multiple plants 6-8 feet apart as they can grow into large bushes."
        },
        {
          type: "subheading",
          text: "Step 4: Watering Schedule"
        },
        {
          type: "paragraph",
          text: "Water thoroughly after planting. During monsoon, natural rainfall is usually sufficient. In other seasons, water once every 3-4 days. Avoid overwatering as it can lead to root rot."
        },
        {
          type: "subheading",
          text: "Step 5: Fertilization"
        },
        {
          type: "paragraph",
          text: "Apply organic compost every 2-3 months. During the flowering season (spring), add a handful of bone meal around the base to promote fruit development."
        },
        {
          type: "subheading",
          text: "Step 6: Pruning and Maintenance"
        },
        {
          type: "paragraph",
          text: "Prune dead branches and shape the plant after the fruiting season. Karonda has thorns, so wear gloves while handling. Remove weeds regularly and mulch around the base to retain moisture."
        },
        {
          type: "heading",
          text: "Harvesting and Uses"
        },
        {
          type: "paragraph",
          text: "Karonda plants start bearing fruit within 2-3 years. Berries turn from green to pink to deep purple when ripe. Harvest when they reach your desired level of ripeness. Green karonda is more sour and perfect for pickles, while ripe berries are sweeter."
        },
        {
          type: "list",
          items: [
            "Karonda pickle - A traditional Indian condiment",
            "Karonda chutney - Sweet and tangy accompaniment",
            "Fresh juice - Rich in Vitamin C",
            "Jam and preserves - Long-lasting treats",
            "Fresh consumption - Eat ripe berries as snacks"
          ]
        },
        {
          type: "quote",
          text: "Growing your own food is not just gardening, it's a step towards self-sufficiency and sustainability.",
          author: "Traditional Indian Wisdom"
        }
      ],
      tags: ["Gardening", "Farming", "Monsoon", "Sustainable Living", "Indian Plants"],
      relatedStories: [
        {
          title: "Ayurvedic Farming: Ancient Wisdom Meets Modern Science",
          slug: "ayurvedic-farming",
          image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400"
        },
        {
          title: "Kerala Village's Organic Farming Success",
          slug: "kerala-organic-village",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400"
        }
      ]
    },
    'startup-success-story': {
      title: "From Dropout to CEO: How This 25-YO Built a ₹50 Crore Startup",
      category: "Startup",
      author: "Rajesh Kumar",
      date: "December 10, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200",
      content: [
        {
          type: "paragraph",
          text: "Arjun Mehta's story sounds like a Bollywood script - college dropout, failed ventures, family pressure, and finally, a ₹50 crore startup that's revolutionizing rural education in India. But this is no fiction; this is the reality of determination meeting opportunity."
        },
        {
          type: "heading",
          text: "The Beginning"
        },
        {
          type: "paragraph",
          text: "In 2020, at age 22, Arjun made the bold decision to drop out of engineering college in his final year. 'Everyone thought I was crazy,' he recalls. 'My parents were devastated. But I knew the traditional path wasn't for me.'"
        },
        {
          type: "paragraph",
          text: "His first two startup attempts failed within six months each. But the third time, he identified a real problem: quality education was not reaching rural India, and existing edtech solutions were too expensive and required stable internet."
        },
        {
          type: "heading",
          text: "The Solution: ShikshaBox"
        },
        {
          type: "paragraph",
          text: "ShikshaBox is a solar-powered device that provides offline educational content to schools in remote areas. The box contains curated curriculum-aligned videos, interactive lessons, and assessment tools - all accessible without internet."
        },
        {
          type: "list",
          items: [
            "Works completely offline - no internet required",
            "Solar-powered - suitable for areas with irregular electricity",
            "Pre-loaded with 10,000+ hours of educational content",
            "Covers curriculum from Class 1 to 12",
            "Available in 12 regional languages",
            "Priced at ₹15,000 - affordable for schools and NGOs"
          ]
        },
        {
          type: "heading",
          text: "The Journey"
        },
        {
          type: "paragraph",
          text: "Starting with ₹2 lakh borrowed from relatives and friends, Arjun built the first prototype in his garage. 'I taught myself hardware design through YouTube videos,' he laughs. 'The first prototype caught fire. The second one worked for 10 minutes before crashing.'"
        },
        {
          type: "paragraph",
          text: "Persistence paid off. After six months and 23 prototypes, he had a working model. He piloted it in five village schools in Rajasthan. The results were remarkable - student engagement increased by 75%, and test scores improved by an average of 40%."
        },
        {
          type: "quote",
          text: "Failure is not the opposite of success; it's a stepping stone to success. Every failed prototype taught me something invaluable.",
          author: "Arjun Mehta, Founder, ShikshaBox"
        },
        {
          type: "heading",
          text: "Scaling Up"
        },
        {
          type: "paragraph",
          text: "Word spread quickly. NGOs and government education departments started reaching out. In 2023, Arjun raised ₹5 crore in seed funding from impact investors. By 2024, ShikshaBox had reached 1,000 schools across 12 states, impacting 300,000 students."
        },
        {
          type: "paragraph",
          text: "Today, the company has grown to a valuation of ₹50 crore, employs 50 people, and is expanding internationally to other developing countries in Africa and Southeast Asia."
        },
        {
          type: "heading",
          text: "Lessons for Aspiring Entrepreneurs"
        },
        {
          type: "paragraph",
          text: "When asked what advice he'd give to aspiring entrepreneurs, Arjun shares:"
        },
        {
          type: "list",
          items: [
            "Solve real problems - not imaginary ones",
            "Talk to your users constantly - build what they need",
            "Don't fear failure - fear not trying",
            "Bootstrap as long as possible - it teaches discipline",
            "Build a mission-driven company - profit will follow",
            "Stay humble - success can vanish as quickly as it comes"
          ]
        },
        {
          type: "paragraph",
          text: "Arjun's story proves that formal education, while valuable, is not the only path to success. What matters is solving real problems with dedication, resilience, and a genuine desire to make a difference."
        }
      ],
      tags: ["Startup", "Education", "Entrepreneurship", "Rural India", "Social Impact"],
      relatedStories: [
        {
          title: "IIT Graduate Builds Low-Cost Water Purifiers",
          slug: "water-purifier-innovation",
          image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400"
        },
        {
          title: "Digital Education in Tribal Areas",
          slug: "digital-education-tribal",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
        }
      ]
    },
    'udaipur-mango-tree-house': {
      title: "This Udaipur Man Built His 3-Storey Dream Home Around a 40-Foot Mango Tree",
      category: "Visual Stories",
      author: "Rajesh Kumar",
      date: "July 20, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      content: [
        { type: "paragraph", text: "In the heart of Udaipur, Rajasthan, 58-year-old Mahendra Singh Rathore has built something extraordinary - a three-storey home that wraps around a 40-foot mango tree that has been in his family for four generations." },
        { type: "heading", text: "A Tree That's Part of the Family" },
        { type: "paragraph", text: "The mango tree, estimated to be over 100 years old, was planted by Mahendra's great-grandfather. When it came time to build a new home on the family property, Mahendra refused to cut it down." },
        { type: "quote", text: "This tree has seen my grandfather play as a child, my father get married under its shade, and I grew up climbing its branches. How could I cut it down?", author: "Mahendra Singh Rathore" },
        { type: "heading", text: "Engineering Marvel" },
        { type: "paragraph", text: "Working with local architects, Mahendra designed the house with the tree as its centerpiece. The trunk passes through all three floors, with special provisions for the tree to continue growing." },
        { type: "list", items: ["The tree trunk passes through a 6-foot opening in each floor", "Special drainage systems prevent water damage", "The house is designed to sway slightly with the tree during strong winds", "Natural cooling from the tree reduces AC usage by 40%"] }
      ],
      tags: ["Architecture", "Sustainability", "Udaipur", "Unique Homes"],
      relatedStories: []
    },
    'india-new-animal-species': {
      title: "India Records 683 New Animal Species in One Year & This State Tops The List",
      category: "Visual Stories",
      author: "Dr. Anita Desai",
      date: "July 20, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200",
      content: [
        { type: "paragraph", text: "India's rich biodiversity continues to surprise scientists as the country recorded 683 new animal species in the past year alone, with Kerala emerging as the biodiversity hotspot." },
        { type: "heading", text: "Kerala Leads the Discovery" },
        { type: "paragraph", text: "The Western Ghats in Kerala, one of the world's eight 'hottest hotspots' of biological diversity, contributed 234 new species to the list." },
        { type: "list", items: ["156 new insect species discovered", "89 new fish species found in freshwater bodies", "67 new amphibian species identified", "45 new reptile species documented"] }
      ],
      tags: ["Wildlife", "Biodiversity", "Kerala", "Conservation"],
      relatedStories: []
    },
    'tamil-nadu-organic-farm': {
      title: "Meet The Tamil Nadu Woman Who Mortgaged Her Jewellery to Build an Award-Winning Organic Farm",
      category: "Visual Stories",
      author: "Meera Nair",
      date: "July 19, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200",
      content: [
        { type: "paragraph", text: "When Lakshmi Devi mortgaged her wedding jewellery to start an organic farm, her family thought she had lost her mind. Today, her 15-acre farm generates ₹25 lakh annually and has won three national awards." },
        { type: "heading", text: "From Desperation to Determination" },
        { type: "paragraph", text: "In 2018, after her husband's death, Lakshmi was left with a debt-ridden farm and two children to support. Chemical farming had depleted the soil and yields were falling every year." },
        { type: "quote", text: "My jewellery could sit in a locker or it could give my children a future. I chose the future.", author: "Lakshmi Devi" }
      ],
      tags: ["Organic Farming", "Women Empowerment", "Tamil Nadu", "Agriculture"],
      relatedStories: []
    },
    'ias-upsc-tips': {
      title: "IAS Officers Share 8 Tips To Clear UPSC CSE Without Coaching",
      category: "Visual Stories",
      author: "Amit Sharma",
      date: "July 19, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
      content: [
        { type: "paragraph", text: "Every year, lakhs of aspirants dream of clearing the UPSC Civil Services Examination. While coaching institutes charge lakhs of rupees, several successful IAS officers proved that self-study can be equally effective." },
        { type: "heading", text: "Tips from Toppers" },
        { type: "list", items: ["Focus on NCERT books for foundation", "Read newspapers daily - The Hindu and Indian Express", "Make your own notes - don't rely on others", "Practice answer writing regularly", "Attempt previous year papers", "Stay consistent - study 8-10 hours daily", "Join online test series for mock practice", "Maintain physical and mental health"] }
      ],
      tags: ["UPSC", "IAS", "Education", "Career"],
      relatedStories: []
    },
    'solar-power-villages': {
      title: "Meet the 3 Friends Lighting Up 150 Remote Villages With Solar Power",
      category: "Changemakers",
      author: "Priya Sharma",
      date: "18 Jul 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
      content: [
        { type: "paragraph", text: "Three college friends from IIT Bombay have transformed 150 remote villages across India by bringing solar-powered electricity to communities that had never seen electric light." },
        { type: "heading", text: "The Beginning" },
        { type: "paragraph", text: "Arjun, Priya, and Vikram met during their first year at IIT Bombay. A trip to a village in rural Maharashtra, where they saw children studying under kerosene lamps, changed their lives forever." },
        { type: "quote", text: "We realized that 300 million Indians still don't have reliable electricity. We had to do something.", author: "Arjun Patel, Co-founder" }
      ],
      tags: ["Solar Energy", "Rural Development", "Social Enterprise", "Clean Energy"],
      relatedStories: []
    },
    'smart-device-power-saving': {
      title: "This Engineer's Smart Device Cuts Power Wastage by 23%, Saves Lakhs in Bills",
      category: "Changemakers",
      author: "Rohit Mehta",
      date: "18 Jul 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200",
      content: [
        { type: "paragraph", text: "A 32-year-old engineer from Pune has developed a smart device that can reduce power wastage in homes and offices by up to 23%, saving users lakhs of rupees in electricity bills." },
        { type: "heading", text: "How It Works" },
        { type: "paragraph", text: "The device uses AI to learn usage patterns and automatically optimizes power consumption. It can be controlled via a mobile app and works with existing electrical systems." }
      ],
      tags: ["Innovation", "Energy Saving", "Technology", "Startup"],
      relatedStories: []
    },
    'snake-rescue-kerala': {
      title: "\"It's a Man's Job\": How a One-Day Camp Led This Newsreader to Rescue 800+ Snakes Across Kerala",
      category: "Changemakers",
      author: "Meera Nair",
      date: "18 Jul 2025",
      readTime: "13 min read",
      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=1200",
      content: [
        { type: "paragraph", text: "When people told Anjali Menon that snake rescue was 'a man's job', she decided to prove them wrong. Today, she has rescued over 800 snakes across Kerala and trained 200 women in snake handling." },
        { type: "heading", text: "Breaking Stereotypes" },
        { type: "paragraph", text: "Anjali's journey began with a one-day snake awareness camp in 2019. Fascinated by these misunderstood creatures, she enrolled in a professional snake handling course." }
      ],
      tags: ["Wildlife Rescue", "Women Empowerment", "Kerala", "Conservation"],
      relatedStories: []
    },
    'lake-weed-paper': {
      title: "25-YO Trains 150 Women to Turn a Harmful Lake Weed Into Sustainable Handmade Paper",
      category: "Changemakers",
      author: "Kavita Singh",
      date: "18 Jul 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1200",
      content: [
        { type: "paragraph", text: "A 25-year-old entrepreneur from Manipur has found an innovative solution to the water hyacinth problem plaguing Loktak Lake - turning the invasive weed into beautiful handmade paper." },
        { type: "heading", text: "From Problem to Opportunity" },
        { type: "paragraph", text: "Water hyacinth had been choking Loktak Lake, India's largest freshwater lake, destroying the ecosystem. Thoibi Devi saw this problem as an opportunity." }
      ],
      tags: ["Sustainability", "Women Empowerment", "Innovation", "Environment"],
      relatedStories: []
    },
    'bengaluru-terrace-forest': {
      title: "Bengaluru Couple Creates Mini Forest on Their Terrace with 300+ Native Plants",
      category: "Environment",
      author: "Ravi Kumar",
      date: "20 Dec 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
      content: [
        { type: "paragraph", text: "In the heart of Bengaluru's concrete jungle, Priya and Arun have created an unexpected oasis - a mini forest with over 300 native plants thriving on their 1,200 square foot terrace." },
        { type: "heading", text: "The Urban Forest Journey" },
        { type: "paragraph", text: "What started as a hobby during lockdown has transformed into a thriving ecosystem that attracts butterflies, birds, and even the occasional squirrel to their 5th-floor apartment." }
      ],
      tags: ["Urban Gardening", "Environment", "Bengaluru", "Native Plants"],
      relatedStories: []
    },
    'ocean-plastic-art': {
      title: "Artist Transforms Ocean Plastic Waste Into Stunning Sculptures",
      category: "Art & Environment",
      author: "Meera Nair",
      date: "19 Dec 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200",
      content: [
        { type: "paragraph", text: "Chennai-based artist Vikram collects plastic waste from the beaches of Marina and transforms them into breathtaking sculptures that tell the story of ocean pollution." },
        { type: "heading", text: "Art with a Message" },
        { type: "paragraph", text: "Each sculpture represents a marine creature affected by plastic pollution. His latest collection has been exhibited in 15 countries, raising awareness about ocean conservation." }
      ],
      tags: ["Art", "Ocean Conservation", "Plastic Pollution", "Chennai"],
      relatedStories: []
    },
    'carbon-neutral-village': {
      title: "This Kerala Village Achieved Carbon Neutrality - Here's How",
      category: "Sustainability",
      author: "Deepa Joseph",
      date: "18 Dec 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=1200",
      content: [
        { type: "paragraph", text: "Meenangadi in Wayanad has become India's first carbon-neutral gram panchayat, offsetting all its carbon emissions through a combination of tree planting and sustainable practices." },
        { type: "heading", text: "The Carbon Neutral Journey" },
        { type: "paragraph", text: "The village planted over 350,000 trees, converted to renewable energy, and implemented waste management systems that have become a model for sustainable development." }
      ],
      tags: ["Carbon Neutral", "Kerala", "Sustainability", "Climate Action"],
      relatedStories: []
    },
    'kerala-toddy-tapper': {
      title: "77-YO Kerala Toddy Tapper Still Climbs 100 Trees Daily",
      category: "Stories of Resilience",
      author: "Arun Menon",
      date: "17 Dec 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      content: [
        { type: "paragraph", text: "At 77, Kuttan Nair climbs 100 coconut trees daily to collect toddy, continuing a tradition his family has practiced for five generations in Kerala's Alappuzha district." },
        { type: "heading", text: "Living Heritage" },
        { type: "paragraph", text: "Despite his age, Kuttan moves up the trees with agility that puts younger men to shame, preserving a skill that is slowly disappearing from Kerala's landscape." }
      ],
      tags: ["Tradition", "Kerala", "Culture", "Resilience"],
      relatedStories: []
    },
    'rainwater-harvesting': {
      title: "How This Auto Driver Built 500 Rainwater Harvesting Units for Free",
      category: "Changemakers",
      author: "Priya Iyer",
      date: "16 Dec 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=1200",
      content: [
        { type: "paragraph", text: "Kamalakar, an auto driver from Hyderabad, has spent his savings and Sundays installing rainwater harvesting systems in slum areas, helping over 2,000 families access clean water." },
        { type: "heading", text: "From Driver to Water Warrior" },
        { type: "paragraph", text: "Watching children suffer from waterborne diseases in his neighborhood sparked Kamalakar's mission to bring sustainable water solutions to those who need them most." }
      ],
      tags: ["Water Conservation", "Social Impact", "Hyderabad", "Community"],
      relatedStories: []
    },
    'coding-for-kids': {
      title: "Blind Teacher Teaches Coding to 1000+ Rural Children",
      category: "Education",
      author: "Sneha Gupta",
      date: "15 Dec 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
      content: [
        { type: "paragraph", text: "Srikanth lost his sight at 4, but that didn't stop him from becoming a software engineer. Now, he travels to remote villages in Telangana, teaching children to code using audio-based programs." },
        { type: "heading", text: "Breaking Barriers" },
        { type: "paragraph", text: "His innovative teaching methods have helped 1,000+ rural children learn programming basics, with 50 students already pursuing computer science degrees." }
      ],
      tags: ["Education", "Disability", "Technology", "Rural Development"],
      relatedStories: []
    },
    'dabbawalas-homeless': {
      title: "Mumbai's Dabbawalas Now Deliver 5000 Meals Daily to Homeless",
      category: "Social Impact",
      author: "Rahul Mehta",
      date: "14 Dec 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=1200",
      content: [
        { type: "paragraph", text: "The legendary dabbawalas of Mumbai have expanded their service to include feeding the homeless. Using their famous logistics network, they now deliver 5,000 surplus meals daily to people living on the streets." },
        { type: "heading", text: "Zero Waste, Maximum Impact" },
        { type: "paragraph", text: "By collecting surplus food from hotels and corporate cafeterias, this initiative reduces food waste while feeding those in need." }
      ],
      tags: ["Food Security", "Mumbai", "Social Enterprise", "Community"],
      relatedStories: []
    },
    'free-healthcare-villages': {
      title: "Retired Doctor Provides Free Healthcare to 50 Villages for 20 Years",
      category: "Healthcare",
      author: "Ananya Sharma",
      date: "13 Dec 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200",
      content: [
        { type: "paragraph", text: "Dr. Suresh Kumar, 72, retired from a successful career in Delhi to serve the rural communities of Rajasthan. For 20 years, he has been providing free medical care to 50 villages." },
        { type: "heading", text: "A Life of Service" },
        { type: "paragraph", text: "Traveling in a mobile clinic, he has treated over 200,000 patients, trained 100 health workers, and reduced infant mortality in the region by 40%." }
      ],
      tags: ["Healthcare", "Rural India", "Social Service", "Rajasthan"],
      relatedStories: []
    },
    'food-forest-army': {
      title: "Ex-Army Officer Creates Food Forests in 100 Government Schools",
      category: "Education & Environment",
      author: "Major Sharma",
      date: "12 Dec 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200",
      content: [
        { type: "paragraph", text: "Retired Major Gopal Singh has created food forests in 100 government schools across Madhya Pradesh, providing fresh fruits and vegetables for mid-day meals while teaching children about sustainable agriculture." },
        { type: "heading", text: "Growing the Future" },
        { type: "paragraph", text: "Each food forest contains 50+ varieties of fruits, vegetables, and medicinal plants, maintained by students as part of their curriculum." }
      ],
      tags: ["Education", "Food Security", "Environment", "Schools"],
      relatedStories: []
    },
    'auto-driver-education': {
      title: "Chennai Auto Driver Sends 70 Slum Children to College",
      category: "Education",
      author: "Lakshmi Venkat",
      date: "11 Dec 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
      content: [
        { type: "paragraph", text: "Venkatesh earns ₹500 a day driving an auto in Chennai. Yet, over the past 15 years, he has sponsored the education of 70 children from his neighborhood slum, with 12 now holding engineering degrees." },
        { type: "heading", text: "Education Over Everything" },
        { type: "paragraph", text: "Living in a small room himself, Venkatesh saves most of his earnings to pay for school fees, books, and coaching classes for underprivileged children." }
      ],
      tags: ["Education", "Chennai", "Inspiration", "Social Impact"],
      relatedStories: []
    },
    'yoga-grandmother': {
      title: "98-Year-Old Yoga Instructor Teaches 200 Students Daily Online",
      category: "Wellness",
      author: "Priti Desai",
      date: "10 Dec 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
      content: [
        { type: "paragraph", text: "At 98, Nanammal Amma conducts yoga classes for 200 students daily through video calls. Her students range from 5 to 85 years old, spread across 15 countries." },
        { type: "heading", text: "Age is Just a Number" },
        { type: "paragraph", text: "Starting yoga at 8, she has practiced for 90 years and never missed a day. Her secret? 'Yoga is not exercise, it's a way of life.'" }
      ],
      tags: ["Yoga", "Wellness", "Inspiration", "Senior Living"],
      relatedStories: []
    },
    'legal-aid-women': {
      title: "Young Lawyer Provides Free Legal Aid to 5000+ Domestic Violence Survivors",
      category: "Women Empowerment",
      author: "Aditi Roy",
      date: "9 Dec 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1200",
      content: [
        { type: "paragraph", text: "At 29, Advocate Ishita has helped 5,000+ women escape domestic violence through free legal aid. Her NGO operates in 12 states with a network of 200 volunteer lawyers." },
        { type: "heading", text: "Justice for All" },
        { type: "paragraph", text: "Working 16-hour days, she handles cases that others refuse, helping women from the most marginalized communities access justice and rebuild their lives." }
      ],
      tags: ["Women Rights", "Legal Aid", "Social Justice", "NGO"],
      relatedStories: []
    },
    'village-library': {
      title: "Retired Postman Creates Free Library in 100 Villages",
      category: "Education",
      author: "Mohan Das",
      date: "8 Dec 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200",
      content: [
        { type: "paragraph", text: "After 35 years as a postman in rural Bihar, Raghunath Prasad has spent his retirement setting up free libraries in 100 villages, collecting and distributing over 50,000 books." },
        { type: "heading", text: "Books for Everyone" },
        { type: "paragraph", text: "Using his pension and donations, he cycles between villages, ensuring children have access to books that their schools cannot provide." }
      ],
      tags: ["Education", "Libraries", "Bihar", "Literacy"],
      relatedStories: []
    },
    'tribal-honey': {
      title: "This Tribal Collective's Honey Business is Worth ₹5 Crore Today",
      category: "Business",
      author: "Sunita Barik",
      date: "7 Dec 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200",
      content: [
        { type: "paragraph", text: "The Soliga tribe of Karnataka's BR Hills has built a ₹5 crore honey business through their cooperative, proving that traditional knowledge can create modern success stories." },
        { type: "heading", text: "Sweet Success" },
        { type: "paragraph", text: "Their organic honey, harvested using traditional methods, is now sold in premium stores across India and exported to 5 countries." }
      ],
      tags: ["Tribal Enterprise", "Organic", "Business", "Karnataka"],
      relatedStories: []
    },
    'plastic-road': {
      title: "Engineer Builds 100 km of Roads Using Plastic Waste",
      category: "Innovation",
      author: "Vikram Shah",
      date: "6 Dec 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200",
      content: [
        { type: "paragraph", text: "Professor Ahmed Khan has developed a technique to build roads using plastic waste. His innovation has already been used to construct 100 km of roads across India, recycling 1,000 tonnes of plastic." },
        { type: "heading", text: "Plastic to Pavement" },
        { type: "paragraph", text: "The plastic roads are more durable, resist potholes, and cost 8% less than conventional roads while solving the plastic waste problem." }
      ],
      tags: ["Innovation", "Plastic Recycling", "Infrastructure", "Sustainability"],
      relatedStories: []
    },
    'jharkhand-solar-tech-village': {
      title: "This Jharkhand Village Cut Crop Losses with Solar Tech — Now It's a Model for 12 Districts",
      category: "Sustainability",
      author: "Rakesh Kumar",
      date: "29 Jul 2025",
      readTime: "16 min read",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
      content: [
        {
          type: "paragraph",
          text: "In the heart of Jharkhand's Palamu district lies Kechki village, where a revolutionary solar-powered irrigation system has transformed the lives of over 500 farming families. What was once a region plagued by unpredictable rainfall and devastating crop losses has become a beacon of agricultural innovation."
        },
        {
          type: "heading",
          text: "The Crisis Before Solar"
        },
        {
          type: "paragraph",
          text: "For decades, farmers in Kechki depended entirely on monsoon rains. When rains failed or arrived late, entire harvests were lost. Crop losses of 40-60% were common, pushing families into debt and forcing many young people to migrate to cities for work."
        },
        {
          type: "paragraph",
          text: "In 2020, the situation reached a breaking point. A severe drought destroyed 70% of the paddy crop, and farmer suicides in the region made national headlines. Something had to change."
        },
        {
          type: "heading",
          text: "The Solar Solution"
        },
        {
          type: "paragraph",
          text: "That's when Dr. Sunita Devi, an agricultural scientist from Ranchi University, proposed an innovative solution: a community-owned solar micro-grid that would power electric pumps to draw groundwater for irrigation. The initial investment of ₹2.5 crore was funded through a combination of government subsidies, NGO support, and community contributions."
        },
        {
          type: "list",
          items: [
            "200 solar panels installed across 5 acres of community land",
            "15 electric water pumps serving 500+ farming families",
            "Underground pipeline network covering 800 acres of farmland",
            "Smart sensors monitoring soil moisture and water usage",
            "Mobile app for farmers to schedule irrigation slots"
          ]
        },
        {
          type: "heading",
          text: "Transformative Results"
        },
        {
          type: "paragraph",
          text: "The results exceeded all expectations. Within two years, crop losses dropped from 60% to just 8%. Farmers were able to grow two crops a year instead of one, and many introduced high-value vegetables like tomatoes, capsicum, and broccoli."
        },
        {
          type: "quote",
          text: "Earlier, we used to pray for rain. Now we can plan our crops scientifically. My income has tripled in three years.",
          author: "Ramesh Oraon, Farmer"
        },
        {
          type: "heading",
          text: "Economic Impact"
        },
        {
          type: "list",
          items: [
            "Average farmer income increased from ₹45,000 to ₹1.8 lakh per year",
            "Zero farmer suicides reported since 2021",
            "70% reduction in youth migration",
            "20 new small businesses started in the village",
            "Women's self-help groups earning ₹15 lakh annually from vegetable processing"
          ]
        },
        {
          type: "heading",
          text: "A Model for Others"
        },
        {
          type: "paragraph",
          text: "The success of Kechki has not gone unnoticed. The Jharkhand government has announced plans to replicate this model in 12 districts, with an allocation of ₹500 crore. Teams from Bihar, Odisha, and Chhattisgarh have visited to learn from the experience."
        },
        {
          type: "paragraph",
          text: "Dr. Sunita Devi is now leading a state-level task force to implement the 'Solar Agriculture Mission.' \"Kechki proved that with the right technology and community participation, we can make our villages climate-resilient,\" she says. \"This is just the beginning.\""
        }
      ],
      tags: ["Solar Power", "Agriculture", "Jharkhand", "Rural Development", "Climate Resilience", "Innovation"],
      relatedStories: [
        {
          title: "How 3 Friends Are Lighting Up 150 Remote Villages",
          slug: "solar-power-villages",
          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400"
        },
        {
          title: "Kerala Village Achieves Carbon Neutrality",
          slug: "carbon-neutral-village",
          image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=400"
        }
      ]
    },
    'india-clean-energy-steps': {
      title: "9 Key Steps India Can Take for a Fair & Inclusive Clean Energy Future",
      category: "Sustainability",
      author: "Dr. Arun Mehta",
      date: "29 Jul 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200",
      content: [
        {
          type: "paragraph",
          text: "India stands at a critical crossroads in its energy journey. As the world's third-largest energy consumer and a nation committed to achieving net-zero emissions by 2070, the choices made today will shape the lives of 1.4 billion people for generations to come."
        },
        {
          type: "paragraph",
          text: "But clean energy transition isn't just about installing solar panels and wind turbines. It must be fair, inclusive, and leave no one behind. Here are nine concrete steps that can make India's clean energy future a reality for all."
        },
        {
          type: "heading",
          text: "1. Prioritize Decentralized Renewable Energy"
        },
        {
          type: "paragraph",
          text: "Instead of focusing solely on large solar parks, India should invest in rooftop solar, community microgrids, and village-level renewable installations. This approach brings energy closer to consumers, reduces transmission losses, and creates local jobs."
        },
        {
          type: "heading",
          text: "2. Just Transition for Coal Workers"
        },
        {
          type: "paragraph",
          text: "Over 4 million workers depend on the coal industry. As coal plants phase out, these workers need retraining programs, pension protection, and priority employment in renewable energy projects. States like Jharkhand and Chhattisgarh need dedicated transition funds."
        },
        {
          type: "heading",
          text: "3. Make Solar Affordable for All"
        },
        {
          type: "paragraph",
          text: "While affluent households can afford rooftop solar, poor and middle-class families are left out. Government subsidies should cover 70% of installation costs for low-income families, with zero-interest loans for the remainder."
        },
        {
          type: "heading",
          text: "4. Green Public Transport Revolution"
        },
        {
          type: "paragraph",
          text: "Electric buses, metro rail, and e-rickshaws should be made accessible in tier-2 and tier-3 cities, not just metros. A national scheme for electric public transport can reduce pollution and provide affordable mobility."
        },
        {
          type: "heading",
          text: "5. Women-Led Clean Energy Enterprises"
        },
        {
          type: "paragraph",
          text: "Women should be trained as solar technicians, biogas operators, and clean energy entrepreneurs. States like Kerala have shown that women-led energy cooperatives are more efficient and sustainable."
        },
        {
          type: "heading",
          text: "6. Clean Cooking for Every Home"
        },
        {
          type: "paragraph",
          text: "Despite Ujjwala, millions still cook on wood and cow dung. The focus should shift to electric induction stoves powered by solar, eliminating indoor air pollution that kills 1 million Indians annually."
        },
        {
          type: "heading",
          text: "7. Green Industrial Zones"
        },
        {
          type: "paragraph",
          text: "Create special economic zones where industries must use 100% renewable energy. Tax incentives and faster clearances would encourage businesses to relocate, creating green jobs in backward regions."
        },
        {
          type: "heading",
          text: "8. Climate Education in Schools"
        },
        {
          type: "paragraph",
          text: "From Class 6 onwards, climate change and renewable energy should be part of the curriculum. Children who understand the stakes will become the leaders who implement solutions."
        },
        {
          type: "heading",
          text: "9. Community Ownership of Energy Projects"
        },
        {
          type: "paragraph",
          text: "When communities own solar plants and wind farms, they have a stake in their success. Panchayats should be empowered to set up and manage local renewable energy projects, with profits going to village development."
        },
        {
          type: "quote",
          text: "The energy transition is not just about technology change. It's about justice, equity, and ensuring that the benefits reach the last person in the queue.",
          author: "Dr. Arun Mehta, Energy Policy Expert"
        }
      ],
      tags: ["Clean Energy", "Policy", "Climate Change", "Sustainability", "India"],
      relatedStories: [
        {
          title: "Jharkhand Village's Solar Success Story",
          slug: "jharkhand-solar-tech-village",
          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400"
        }
      ]
    },
    'bengaluru-waste-compost-machine': {
      title: "This Bengaluru Startup Built a Machine That Turns Waste Into Nutrient-Rich Compost in Just 8 Hours",
      category: "Sustainability",
      author: "Priya Nair",
      date: "29 Jul 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200",
      content: [
        {
          type: "paragraph",
          text: "In a small warehouse in Bengaluru's Whitefield area, a machine the size of a large refrigerator is doing something remarkable — converting yesterday's kitchen waste into nutrient-rich compost in just 8 hours. Traditional composting takes 45-60 days. This startup has cracked a formula that could revolutionize India's waste management."
        },
        {
          type: "heading",
          text: "The Founders' Journey"
        },
        {
          type: "paragraph",
          text: "GreenCycle was founded in 2022 by IIT Bombay graduates Arjun Sharma and Meera Reddy. The idea struck when they saw mountains of organic waste at a Bengaluru landfill releasing methane — a greenhouse gas 25 times more potent than CO2."
        },
        {
          type: "quote",
          text: "India generates 150,000 tonnes of waste daily. 50% of it is organic and can be composted. But our cities just dump it in landfills. We knew there had to be a better way.",
          author: "Arjun Sharma, Co-founder"
        },
        {
          type: "heading",
          text: "The Technology Behind It"
        },
        {
          type: "paragraph",
          text: "The 'CompostPro' machine uses a combination of heat, aeration, and proprietary microbial cultures to accelerate decomposition. Sensors monitor temperature, moisture, and oxygen levels, automatically adjusting conditions for optimal breakdown."
        },
        {
          type: "list",
          items: [
            "Processes 50-500 kg of waste per day depending on model size",
            "Reduces waste volume by 85%",
            "Produces compost with 2% nitrogen content (higher than market compost)",
            "Uses only 3 units of electricity per day",
            "Zero odor due to enclosed aerobic processing",
            "Smart app shows real-time composting status"
          ]
        },
        {
          type: "heading",
          text: "Who's Using It?"
        },
        {
          type: "paragraph",
          text: "In just two years, GreenCycle has installed 500 machines across India. Their clients include Infosys, ITC Hotels, Bangalore Metro, and 50 apartment complexes in Bengaluru alone."
        },
        {
          type: "paragraph",
          text: "Prestige Lakeside Habitat, a 2,000-apartment complex, processes 800 kg of kitchen waste daily. The compost is used in their 10-acre gardens, saving ₹15 lakh annually on fertilizers."
        },
        {
          type: "heading",
          text: "Impact Numbers"
        },
        {
          type: "list",
          items: [
            "12,000 tonnes of waste diverted from landfills annually",
            "8,000 tonnes of CO2 emissions prevented",
            "₹5 crore saved by clients on fertilizer purchases",
            "Created 200 direct and 500 indirect jobs",
            "Won the National Startup Award 2024"
          ]
        },
        {
          type: "heading",
          text: "Future Plans"
        },
        {
          type: "paragraph",
          text: "GreenCycle has just raised ₹50 crore in Series B funding and plans to install 5,000 machines by 2027. They're also developing a smaller home version priced at ₹25,000 — affordable enough for middle-class families."
        },
        {
          type: "paragraph",
          text: "\"Our dream is that every apartment complex, every restaurant, every hotel should process their own waste,\" says Meera. \"We want to make landfills obsolete.\""
        }
      ],
      tags: ["Waste Management", "Startup", "Bengaluru", "Composting", "Sustainability", "Innovation"],
      relatedStories: [
        {
          title: "Zero Waste Living: A Bengaluru Family's Journey",
          slug: "zero-waste-family",
          image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"
        }
      ]
    },
    'plastic-waste-structures-india': {
      title: "3 Indian Structures That Replaced Concrete — One's a Bunker Built From Plastic Waste at 14000 Ft",
      category: "Sustainability",
      author: "Capt. Vikram Singh (Retd.)",
      date: "29 Jul 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      content: [
        {
          type: "paragraph",
          text: "Concrete is responsible for 8% of global CO2 emissions. In a country that builds as much as India, finding alternatives isn't just innovative — it's essential. Here are three remarkable structures that prove we can build better without concrete."
        },
        {
          type: "heading",
          text: "1. The Plastic Bunker at Siachen Base Camp"
        },
        {
          type: "paragraph",
          text: "At 14,000 feet on the Siachen Glacier, Indian Army soldiers face temperatures of -60°C. Building materials must be airlifted at enormous cost. That's why when Colonel Prithvi Chauhan proposed building bunkers from compressed plastic waste, the Army was intrigued."
        },
        {
          type: "paragraph",
          text: "The result is extraordinary. Plastic bottles, wrappers, and packaging waste collected by soldiers are compressed into building blocks using a portable machine. These blocks are 7 times more insulating than concrete, lighter to transport, and can withstand extreme temperatures."
        },
        {
          type: "list",
          items: [
            "Each bunker uses 15,000 plastic bottles",
            "40% cheaper than traditional construction",
            "Can be assembled in 2 days vs 2 weeks for concrete",
            "Soldiers trained to manufacture blocks on-site",
            "50 bunkers built since 2023"
          ]
        },
        {
          type: "heading",
          text: "2. Bamboo Community Center in Manipur"
        },
        {
          type: "paragraph",
          text: "In Imphal, architect Lakshmi Devi designed a 5,000 sq ft community center using only bamboo and local materials. The stunning structure, which won the HUDCO Award 2024, was built in 6 months at one-third the cost of a concrete building."
        },
        {
          type: "paragraph",
          text: "The center features traditional Manipuri design elements and uses no steel reinforcement. Bamboo trusses span 40 feet without columns, and the roof is covered with thatch that keeps interiors cool without air conditioning."
        },
        {
          type: "quote",
          text: "Concrete buildings in earthquake-prone Manipur are a risk. Bamboo flexes but doesn't collapse. It's not just sustainable — it's safer.",
          author: "Lakshmi Devi, Architect"
        },
        {
          type: "heading",
          text: "3. Hempcrete House in Uttarakhand"
        },
        {
          type: "paragraph",
          text: "In Almora district, a three-bedroom house stands as India's first hempcrete building. Made from hemp fibers mixed with lime, hempcrete is carbon-negative — it absorbs more CO2 than is emitted during production."
        },
        {
          type: "paragraph",
          text: "The house was built by entrepreneur Rohit Joshi, who cultivates industrial hemp on his farm. The walls are 12 inches thick, providing excellent insulation. In summer, the interior stays 8°C cooler than outside; in winter, it retains heat without heating."
        },
        {
          type: "list",
          items: [
            "Hemp grows in 4 months, requires no pesticides",
            "Hempcrete is fire-resistant and pest-proof",
            "Construction cost was ₹1,200 per sq ft vs ₹1,800 for concrete",
            "Building is expected to last 100+ years",
            "3 tonnes of CO2 absorbed by the structure"
          ]
        },
        {
          type: "heading",
          text: "The Road Ahead"
        },
        {
          type: "paragraph",
          text: "These three projects prove that sustainable construction isn't just for research papers — it works in the real world, from the highest battlefield to rural homes. As building codes evolve and awareness grows, we may see the concrete jungle give way to greener alternatives."
        }
      ],
      tags: ["Sustainable Construction", "Plastic Recycling", "Bamboo", "Hemp", "Architecture", "Innovation"],
      relatedStories: [
        {
          title: "Engineer Builds 100 km of Roads Using Plastic Waste",
          slug: "plastic-road",
          image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400"
        }
      ]
    },
    'summer-activities-kids': {
      title: "5 Fun & Educational Activities to Keep Your Kids Engaged This Summer",
      category: "Parenting",
      author: "Dr. Anita Desai",
      date: "15 Jul 2025",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200",
      content: [
        { type: "paragraph", text: "Summer vacations are the perfect time to combine fun with learning. Here are five activities that will keep your children entertained while developing important skills." },
        { type: "heading", text: "1. Nature Scavenger Hunt" },
        { type: "paragraph", text: "Create a list of items for kids to find in your garden or local park — different leaves, insects, flowers. This develops observation skills and connects children with nature." },
        { type: "heading", text: "2. Kitchen Science Experiments" },
        { type: "paragraph", text: "Simple experiments like making a volcano with baking soda and vinegar, or growing crystals from sugar water, teach basic chemistry while being incredibly fun." },
        { type: "heading", text: "3. Story Writing and Illustration" },
        { type: "paragraph", text: "Encourage children to write their own stories and illustrate them. This boosts creativity, language skills, and gives them a sense of accomplishment." },
        { type: "heading", text: "4. DIY Craft Projects" },
        { type: "paragraph", text: "Using recyclable materials to create art projects teaches sustainability while developing fine motor skills and creativity." },
        { type: "heading", text: "5. Cooking Together" },
        { type: "paragraph", text: "Simple recipes like sandwiches, smoothies, or cookies teach math (measuring), following instructions, and healthy eating habits." }
      ],
      tags: ["Parenting", "Summer Activities", "Kids", "Education", "Fun"],
      relatedStories: []
    },
    'raising-resilient-kids': {
      title: "Raising Resilient Kids: Essential Tips for Modern Parents",
      category: "Parenting",
      author: "Dr. Meera Sharma",
      date: "15 Jul 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200",
      content: [
        { type: "paragraph", text: "In today's fast-changing world, resilience — the ability to bounce back from setbacks — is one of the most valuable skills we can help our children develop." },
        { type: "heading", text: "What is Resilience?" },
        { type: "paragraph", text: "Resilience isn't about avoiding difficulties or always being strong. It's about learning to cope with challenges, adapt to change, and grow from experiences — both good and bad." },
        { type: "heading", text: "Key Strategies for Building Resilience" },
        { type: "list", items: [
          "Allow children to experience age-appropriate challenges and failures",
          "Teach problem-solving instead of solving problems for them",
          "Model healthy coping strategies yourself",
          "Encourage a growth mindset — mistakes are learning opportunities",
          "Build strong emotional connections and a sense of security",
          "Help children identify and express their emotions",
          "Celebrate effort, not just outcomes"
        ]},
        { type: "heading", text: "The Role of Failure" },
        { type: "paragraph", text: "Many parents try to protect children from any failure or disappointment. But small failures in childhood — not making the team, getting a poor grade — are valuable learning experiences when handled supportively." },
        { type: "quote", text: "Children who are protected from all challenges and difficulties don't develop the skills they need to thrive when they inevitably face them.", author: "Dr. Meera Sharma" }
      ],
      tags: ["Parenting", "Resilience", "Child Development", "Mental Health"],
      relatedStories: []
    },
    'outdoor-play-development': {
      title: "The Importance of Outdoor Play for Child Development",
      category: "Parenting",
      author: "Priya Iyer",
      date: "14 Jul 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=1200",
      content: [
        { type: "paragraph", text: "In an age of screens and indoor entertainment, outdoor play has become more important than ever for children's physical, emotional, and cognitive development." },
        { type: "heading", text: "Physical Benefits" },
        { type: "list", items: [
          "Develops gross motor skills through running, jumping, climbing",
          "Improves balance and coordination",
          "Strengthens bones and muscles",
          "Reduces risk of childhood obesity",
          "Boosts immune system through exposure to nature"
        ]},
        { type: "heading", text: "Cognitive Benefits" },
        { type: "paragraph", text: "Outdoor play stimulates creativity and imagination. Unstructured time in nature allows children to explore, experiment, and problem-solve in ways that structured indoor activities cannot replicate." },
        { type: "heading", text: "Emotional Benefits" },
        { type: "paragraph", text: "Studies show that time in nature reduces stress, anxiety, and symptoms of ADHD in children. Green spaces have a calming effect that improves mood and emotional regulation." },
        { type: "heading", text: "How Much Outdoor Time?" },
        { type: "paragraph", text: "Experts recommend at least 60 minutes of outdoor play daily. This doesn't have to be all at once — three 20-minute sessions work just as well." }
      ],
      tags: ["Parenting", "Outdoor Play", "Child Development", "Health"],
      relatedStories: []
    },
    'teen-communication-strategies': {
      title: "Navigating Teen Years: Communication Strategies for Parents",
      category: "Parenting",
      author: "Dr. Rajesh Kumar",
      date: "14 Jul 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200",
      content: [
        { type: "paragraph", text: "The teenage years bring dramatic changes in how children communicate with parents. Understanding these changes and adapting your approach can maintain connection during this crucial developmental stage." },
        { type: "heading", text: "Why Teens Pull Away" },
        { type: "paragraph", text: "It's normal for teenagers to seek independence and privacy. This isn't rejection — it's a healthy part of developing their own identity. The key is staying connected while respecting their growing need for autonomy." },
        { type: "heading", text: "Effective Communication Strategies" },
        { type: "list", items: [
          "Listen more than you talk — aim for a 80/20 ratio",
          "Avoid lecturing; ask open-ended questions instead",
          "Choose the right moments — car rides often work well",
          "Validate their feelings, even if you disagree with their actions",
          "Share your own experiences and struggles as a teen",
          "Respect their privacy while maintaining appropriate boundaries",
          "Stay calm during conflicts — take a break if needed"
        ]},
        { type: "heading", text: "Building Trust" },
        { type: "paragraph", text: "Trust is built through consistency. When teens see that you listen without judgment, keep confidences (except safety concerns), and respect their growing independence, they're more likely to come to you with problems." },
        { type: "quote", text: "The goal isn't to be your teen's best friend. It's to be the parent they trust enough to turn to when they really need guidance.", author: "Dr. Rajesh Kumar" }
      ],
      tags: ["Parenting", "Teenagers", "Communication", "Family"],
      relatedStories: []
    },
    'northeast-travel': {
      title: "Hidden Gems: Unexplored Travel Destinations in India's Northeast",
      category: "Travel",
      author: "Vikram Singh",
      date: "December 28, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200",
      content: [
        { type: "paragraph", text: "India's Northeast region is a treasure trove of unexplored beauty, rich cultures, and breathtaking landscapes. While most travelers flock to popular destinations, the real magic lies in the hidden gems waiting to be discovered." },
        { type: "heading", text: "Ziro Valley, Arunachal Pradesh" },
        { type: "paragraph", text: "Nestled among pine-clad mountains, Ziro Valley is home to the Apatani tribe. The valley's rice fields follow a unique pattern, creating a mesmerizing landscape. Visit during September for the Ziro Music Festival." },
        { type: "list", items: [
          "Best time: March to October",
          "Must-do: Attend the Ziro Music Festival",
          "Experience: Stay in traditional Apatani homes",
          "Don't miss: Talley Valley Wildlife Sanctuary"
        ]},
        { type: "heading", text: "Mawlynnong, Meghalaya" },
        { type: "paragraph", text: "Known as Asia's cleanest village, Mawlynnong is a living testament to community-driven sustainability. The village is famous for its living root bridges and pristine environment." },
        { type: "quote", text: "Walking through Mawlynnong feels like stepping into a fairytale where humans and nature exist in perfect harmony.", author: "Travel Enthusiast" },
        { type: "heading", text: "Dzukou Valley, Nagaland" },
        { type: "paragraph", text: "Often called the 'Valley of Flowers of the Northeast,' Dzukou transforms into a carpet of lilies during June-July. The trek to reach this valley is challenging but rewarding." },
        { type: "heading", text: "Majuli, Assam" },
        { type: "paragraph", text: "The world's largest river island, Majuli is the cultural heart of Assam. Home to ancient Vaishnavite monasteries (satras), this island offers a unique glimpse into Assamese culture and traditions." },
        { type: "list", items: [
          "Experience neo-Vaishnavite culture at satras",
          "Witness traditional mask-making",
          "Explore pottery villages",
          "Bird watching at wetlands",
          "Enjoy Assamese cuisine"
        ]},
        { type: "heading", text: "Travel Tips" },
        { type: "list", items: [
          "Inner Line Permit required for some states",
          "Best season: October to April",
          "Respect local customs and traditions",
          "Hire local guides for authentic experiences",
          "Try local cuisine - each state offers unique flavors"
        ]},
        { type: "paragraph", text: "The Northeast's charm lies not just in its landscapes but in its people, cultures, and untouched natural beauty. These destinations offer experiences that mainstream tourism hasn't yet commodified." }
      ],
      tags: ["Travel", "Northeast India", "Adventure", "Culture", "Hidden Destinations"],
      relatedStories: []
    },
    'digital-education-tribal': {
      title: "Revolutionizing Education: Digital Learning in Rural Areas",
      category: "Education",
      author: "Priya Sharma",
      date: "December 26, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
      content: [
        { type: "paragraph", text: "In the remote tribal villages of Odisha, a quiet revolution is taking place. Solar-powered tablets, interactive learning apps, and dedicated teachers are transforming education for children who once had limited access to quality learning resources." },
        { type: "heading", text: "The Challenge" },
        { type: "paragraph", text: "India's tribal areas face unique educational challenges: geographical isolation, lack of infrastructure, teacher shortages, and limited resources. Traditional teaching methods often fail to engage students, leading to high dropout rates." },
        { type: "list", items: [
          "60% of tribal schools lack electricity",
          "Student-teacher ratio exceeds 1:50 in many areas",
          "Limited access to quality learning materials",
          "Language barriers - curriculum often not in native languages",
          "Poor connectivity making online education impossible"
        ]},
        { type: "heading", text: "The Solution: Project Vidya" },
        { type: "paragraph", text: "Project Vidya, initiated by NGO Digital Shiksha Foundation, has deployed 5,000 solar-powered tablets across 200 schools in tribal regions. The program offers offline educational content in 15 tribal languages." },
        { type: "quote", text: "When children see their language and culture represented in learning materials, their engagement and confidence skyrocket.", author: "Malati Naik, Project Coordinator" },
        { type: "heading", text: "Key Features" },
        { type: "list", items: [
          "Curriculum-aligned content for Classes 1-10",
          "Interactive lessons with animations and games",
          "Content available in tribal languages",
          "Works completely offline - no internet needed",
          "Solar-powered - independent of electricity grid",
          "Regular assessments to track progress",
          "Teacher training modules included"
        ]},
        { type: "heading", text: "Impact Stories" },
        { type: "paragraph", text: "12-year-old Sumitra from a Kandha tribal village in Odisha never enjoyed studying until she received her tablet. 'Learning through pictures and videos makes everything so clear,' she says. Her test scores have improved by 40% in six months." },
        { type: "paragraph", text: "Teacher Ramesh Majhi notes the transformation: 'Earlier, explaining concepts like solar system or human body was difficult with just chalk and blackboard. Now students can see 3D models and animations. The joy of learning is visible on their faces.'" },
        { type: "heading", text: "Results After 2 Years" },
        { type: "list", items: [
          "Dropout rates reduced from 45% to 12%",
          "Average test scores improved by 35%",
          "90% increase in student engagement",
          "Teacher satisfaction up by 80%",
          "15,000 students benefited directly",
          "Model being replicated in 5 other states"
        ]},
        { type: "heading", text: "Challenges Remain" },
        { type: "paragraph", text: "While Project Vidya shows promising results, challenges persist. Device maintenance, content updates, teacher training, and scaling require sustained funding and support. Yet, the initiative proves that with the right tools and approach, quality education can reach every child, regardless of location." },
        { type: "paragraph", text: "As India marches toward becoming a digital nation, ensuring that tribal and rural children aren't left behind isn't just about equity - it's about unlocking the potential of millions of young minds who could become tomorrow's innovators." }
      ],
      tags: ["Education", "Digital Learning", "Tribal Areas", "Technology", "Rural India"],
      relatedStories: []
    },
    'ayurvedic-farming': {
      title: "Organic Farming: The Future of Agriculture",
      category: "Farming",
      author: "Rajesh Kumar",
      date: "December 24, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=1200",
      content: [
        { type: "paragraph", text: "In Punjab's heartland, once known for its chemical-intensive farming, a growing movement of farmers is returning to organic methods combined with ancient Ayurvedic principles. The results? Healthier soil, better yields, and premium prices for produce." },
        { type: "heading", text: "From Green Revolution to Green Again" },
        { type: "paragraph", text: "The Green Revolution of the 1960s brought prosperity but also long-term consequences: depleted soil, water pollution, health issues from pesticide exposure, and decreased biodiversity. Now, farmers are rediscovering wisdom from ancient agricultural texts." },
        { type: "quote", text: "Our ancestors farmed for thousands of years without chemicals. They understood that healthy soil creates healthy plants that naturally resist pests.", author: "Harjeet Singh, Organic Farmer" },
        { type: "heading", text: "Ayurvedic Principles in Farming" },
        { type: "paragraph", text: "Ayurvedic farming applies the same holistic principles used in medicine - balancing the five elements (earth, water, fire, air, space) and treating the farm as a living organism." },
        { type: "list", items: [
          "Use of Panchagavya (five cow products) as fertilizer",
          "Beejamrit for seed treatment - increases germination",
          "Jeevamrit as organic fertilizer - enriches soil microbiome",
          "Neem and other plant-based pest control",
          "Crop rotation based on planetary positions",
          "Integration of specific plants that benefit each other",
          "Maintaining farm biodiversity"
        ]},
        { type: "heading", text: "The Transition Journey" },
        { type: "paragraph", text: "Converting from chemical to organic farming isn't instant. It requires a 2-3 year transition period where soil regenerates. Initial years may see reduced yields, but government support and certification programs help farmers through this phase." },
        { type: "paragraph", text: "Harjeet Singh, who farms 20 acres near Amritsar, made the transition five years ago. 'The first two years were difficult,' he admits. 'Yields dropped by 30%. But once the soil recovered, not only did yields match chemical farming, but my costs reduced by 60%.'" },
        { type: "heading", text: "Economic Benefits" },
        { type: "list", items: [
          "Premium prices: Organic produce sells for 30-50% more",
          "Reduced input costs: No expensive chemical fertilizers/pesticides",
          "Better soil health: Long-term sustainability",
          "Multiple revenue streams: Organic certification, agro-tourism",
          "Government subsidies and support programs",
          "Export opportunities to international markets"
        ]},
        { type: "heading", text: "Success Story: Green Gold Farms" },
        { type: "paragraph", text: "Started by three young entrepreneurs, Green Gold Farms near Ludhiana has converted 100 acres to organic farming. They grow wheat, vegetables, and fruits using Ayurvedic methods and sell directly to consumers through an app." },
        { type: "paragraph", text: "'Customers aren't just buying vegetables; they're buying health and sustainability,' says co-founder Meera Patel. 'We're completely sold out every week and have a waiting list of customers.'" },
        { type: "heading", text: "The Path Forward" },
        { type: "paragraph", text: "With increasing consumer awareness about food safety and environmental sustainability, organic farming isn't just ethical - it's economically viable. State governments are offering training, subsidies, and market linkages to encourage more farmers to transition." },
        { type: "paragraph", text: "As Harjeet sums it up: 'I'm healthier, my land is healthier, and I'm earning more. This is the future of farming.'" }
      ],
      tags: ["Organic Farming", "Ayurveda", "Sustainable Agriculture", "Punjab", "Green Revolution"],
      relatedStories: []
    },
    'women-entrepreneurs': {
      title: "Women Entrepreneurs Breaking Barriers in Rural India",
      category: "Women Power",
      author: "Meera Iyer",
      date: "December 22, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200",
      content: [
        { type: "paragraph", text: "From pickle-making to tech startups, women in rural India are defying traditional norms and creating thriving businesses. Their stories of resilience and innovation are reshaping communities and inspiring the next generation." },
        { type: "heading", text: "Breaking the Glass Ceiling - Rural Style" },
        { type: "paragraph", text: "In rural India, women entrepreneurs face unique challenges: limited mobility, household responsibilities, social restrictions, and minimal access to capital. Yet, thousands are building successful businesses that empower not just themselves but entire communities." },
        { type: "heading", text: "Savita's Spice Empire" },
        { type: "paragraph", text: "Savita Devi from Bihar started with ₹500, making pickles in her kitchen. Today, her brand 'Gaon Ki Rasoi' generates ₹2 crore annual revenue and employs 50 women from her village." },
        { type: "quote", text: "When I started, my neighbors laughed. Now their daughters ask me how to start their own businesses.", author: "Savita Devi" },
        { type: "paragraph", text: "Her success formula: authentic recipes, quality ingredients, and leveraging WhatsApp and Instagram for marketing. She received initial support from a government skill development program that taught packaging, marketing, and food safety." },
        { type: "heading", text: "Tech-Savvy Entrepreneur: Priya's Story" },
        { type: "paragraph", text: "25-year-old Priya Sharma from Rajasthan runs a digital marketing agency from her village. She employs 15 women, training them in social media management, content creation, and graphic design." },
        { type: "list", items: [
          "Started with a ₹20,000 loan from self-help group",
          "Learned digital marketing through free online courses",
          "Now trains other rural women in digital skills",
          "Serves clients across India and abroad",
          "Annual revenue: ₹40 lakhs"
        ]},
        { type: "heading", text: "The Role of Self-Help Groups (SHGs)" },
        { type: "paragraph", text: "Self-Help Groups have been transformative for rural women entrepreneurs. These groups provide access to credit, collective bargaining power, skill training, and emotional support - crucial ingredients for business success." },
        { type: "paragraph", text: "Through SHGs, women access microloans without collateral, learn from each other's experiences, and gain confidence to dream bigger. The group model also helps overcome social barriers, as families are more comfortable when women work collectively." },
        { type: "heading", text: "Diverse Ventures" },
        { type: "list", items: [
          "Food processing and packaged foods",
          "Handicrafts and textiles",
          "Dairy and poultry farming",
          "Beauty parlors and salons",
          "Tailoring and boutiques",
          "Digital services - data entry, social media",
          "Tourism - homestays and guides",
          "Education - coaching centers, skill training"
        ]},
        { type: "heading", text: "Impact Beyond Economics" },
        { type: "paragraph", text: "Women entrepreneurship in rural areas creates ripple effects. Children, especially daughters, see different role models. Gender norms gradually shift. Villages see economic development and reverse migration as young people find local opportunities." },
        { type: "paragraph", text: "'My daughter wants to be an entrepreneur, not just get married,' says Savita proudly. 'That change in aspiration is worth more than any profit.'" },
        { type: "heading", text: "Challenges That Persist" },
        { type: "list", items: [
          "Limited access to formal credit and banking",
          "Balancing business and household duties",
          "Social restrictions on mobility and interaction",
          "Lack of digital infrastructure in remote areas",
          "Limited market access and supply chain challenges",
          "Need for continuous skill upgradation"
        ]},
        { type: "heading", text: "Support Systems Growing" },
        { type: "paragraph", text: "Government schemes like Stand-Up India, MUDRA loans, and skill development programs are making entrepreneurship more accessible. NGOs and corporate social responsibility initiatives provide training, mentorship, and market linkages." },
        { type: "paragraph", text: "E-commerce platforms have opened national markets to rural women entrepreneurs. What once required middlemen and complex distribution can now happen with a smartphone and courier service." },
        { type: "paragraph", text: "The rise of rural women entrepreneurs isn't just an economic story - it's a social transformation. As one entrepreneurship trainer puts it: 'When a woman earns, she invests in education, health, and family welfare. She becomes a changemaker.'" }
      ],
      tags: ["Women Empowerment", "Entrepreneurship", "Rural India", "Self-Help Groups", "Economic Development"],
      relatedStories: []
    },
    'healthcare-tech': {
      title: "Tech Innovations Transforming Healthcare Access in Rural India",
      category: "Health",
      author: "Dr. Arvind Patil",
      date: "December 20, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200",
      content: [
        { type: "paragraph", text: "In remote villages where the nearest hospital is 50 kilometers away, technology is bridging the healthcare gap. From AI-powered diagnostic tools to telemedicine vans, innovations are saving lives and improving health outcomes for millions." },
        { type: "heading", text: "The Healthcare Divide" },
        { type: "paragraph", text: "Rural India, home to 65% of the population, has access to only 25% of healthcare infrastructure. Doctor-to-patient ratio in rural areas is 1:10,000 compared to WHO's recommended 1:1,000. The result: preventable diseases becoming fatal, maternal mortality, and lack of basic diagnostics." },
        { type: "list", items: [
          "74% of doctors serve urban areas",
          "Rural areas have one hospital bed per 2,000 people",
          "80% of specialists work in cities",
          "Medical facilities often 20-50 km away",
          "Emergency services largely unavailable"
        ]},
        { type: "heading", text: "Innovation 1: AI-Powered Diagnostic Kiosks" },
        { type: "paragraph", text: "HealthCube, developed by Bangalore startup, is a portable diagnostic device that performs 30+ medical tests including ECG, blood pressure, glucose, hemoglobin, and more. An AI system analyzes results and provides preliminary diagnosis." },
        { type: "paragraph", text: "Deployed in 5,000 villages across India, these kiosks are operated by trained local health workers. The device connects to cloud-based expert systems and can alert doctors in real-time for critical cases." },
        { type: "quote", text: "In emergencies, every minute counts. This device helps us identify heart attacks, strokes, or diabetes complications immediately, even in villages without doctors.", author: "Dr. Ramesh Patel, Rural Health Physician" },
        { type: "heading", text: "Innovation 2: Telemedicine Vans" },
        { type: "paragraph", text: "Mobile medical units equipped with examination rooms, basic diagnostic equipment, and satellite internet connectivity bring healthcare directly to villages. Patients consult with specialist doctors via video call while paramedics on-site perform tests and examinations." },
        { type: "paragraph", text: "Apollo Hospitals' telemedicine program covers 200+ villages, conducting 500 consultations daily. Services include general medicine, pediatrics, gynecology, and chronic disease management." },
        { type: "heading", text: "Innovation 3: Pregnancy Care App - Kilkari" },
        { type: "paragraph", text: "This government-backed mobile health service delivers time-sensitive audio messages about pregnancy and childcare to families. Available in 13 languages, it has reached 50 million families, providing information about nutrition, vaccination, and danger signs during pregnancy." },
        { type: "list", items: [
          "72 weekly audio messages covering pregnancy to child's first year",
          "Messages triggered automatically based on registration date",
          "Works on basic phones - no smartphone needed",
          "Available in regional languages",
          "Linked with ASHA workers for follow-up"
        ]},
        { type: "heading", text: "Innovation 4: Drone Delivery of Medicines" },
        { type: "paragraph", text: "In mountainous and flood-prone regions, drones deliver essential medicines, vaccines, and blood samples. Telangana government's drone program reduced delivery time from 4 hours to 15 minutes for critical supplies." },
        { type: "heading", text: "Innovation 5: Electronic Health Records" },
        { type: "paragraph", text: "National Digital Health Mission is creating unique health IDs for citizens. Rural patients can now carry their complete medical history on their smartphones, accessible to any registered healthcare provider. This prevents duplicate tests, drug interactions, and ensures continuity of care." },
        { type: "heading", text: "Real Impact: Success Stories" },
        { type: "paragraph", text: "45-year-old Lakshmi from Chhattisgarh village experienced chest pain. The local health worker used a diagnostic kiosk that detected abnormal ECG patterns. Within 30 minutes, a telemedicine doctor confirmed a heart attack and arranged emergency ambulance to nearest cardiac center. 'The device saved my life,' she says." },
        { type: "paragraph", text: "In Uttarakhand's remote hills, pregnant women receive weekly automated calls with pregnancy care tips. Maternal mortality in program areas dropped by 35% in two years." },
        { type: "heading", text: "Challenges and Future" },
        { type: "list", items: [
          "Digital literacy among rural population",
          "Internet connectivity in remote areas",
          "Integration between different health systems",
          "Privacy and data security concerns",
          "Sustainability and maintenance of technology",
          "Training healthcare workers in new technologies"
        ]},
        { type: "paragraph", text: "Despite challenges, technology is democratizing healthcare access. As Dr. Arvind Patil, who works with rural health programs, notes: 'Technology cannot replace doctors, but it can extend their reach. In villages where seeing a doctor was once a luxury, it's becoming routine.'" },
        { type: "heading", text: "The Path Ahead" },
        { type: "paragraph", text: "Government initiatives, startup innovations, and NGO partnerships are converging to create a comprehensive rural health tech ecosystem. 5G connectivity, improved AI diagnostics, and integration with insurance systems promise to further transform healthcare access." },
        { type: "paragraph", text: "The goal is clear: quality healthcare should not depend on one's zip code. Technology is making that vision increasingly possible." }
      ],
      tags: ["Healthcare", "Technology", "Rural India", "Telemedicine", "Innovation", "Digital Health"],
      relatedStories: []
    },
    'wildlife-conservation': {
      title: "Wildlife Conservation: Success Stories from India",
      category: "Wildlife",
      author: "Rohit Bhargava",
      date: "December 18, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200",
      content: [
        { type: "paragraph", text: "From the brink of extinction to thriving populations, India's wildlife conservation efforts have scripted remarkable success stories. These achievements showcase what dedicated conservation, community involvement, and policy support can accomplish." },
        { type: "heading", text: "The Tiger Comeback" },
        { type: "paragraph", text: "In 1973, India had just 1,800 tigers. Project Tiger was launched as an emergency response. Today, India houses nearly 70% of the world's wild tiger population with over 3,000 tigers - a conservation success story that inspires the world." },
        { type: "quote", text: "India's tiger conservation is proof that with political will and community participation, we can reverse even the most dire situations.", author: "Wildlife Conservation Society" },
        { type: "paragraph", text: "Key success factors include creating tiger reserves, community-based conservation, strict anti-poaching measures, and habitat corridors connecting fragmented forests." },
        { type: "heading", text: "One-Horned Rhinoceros Revival" },
        { type: "paragraph", text: "Kaziranga National Park in Assam is home to two-thirds of the world's one-horned rhinoceros population. From fewer than 200 in early 1900s, the population now exceeds 2,400." },
        { type: "list", items: [
          "Armed guards protect rhinos 24/7",
          "Use of drones for surveillance",
          "Community rangers employed from local villages",
          "Strict penalties for poaching",
          "Habitat expansion and wetland conservation",
          "Scientific monitoring and disease management"
        ]},
        { type: "heading", text: "Snow Leopard Conservation" },
        { type: "paragraph", text: "In the high Himalayas of Ladakh and Himachal Pradesh, snow leopard conservation involves unique challenges and solutions. The Project Snow Leopard addresses human-wildlife conflict through innovative approaches." },
        { type: "paragraph", text: "Insurance schemes compensate herders for livestock lost to snow leopards, reducing retaliatory killings. Community-owned homestays create eco-tourism revenue, making snow leopards worth more alive than dead." },
        { type: "heading", text: "Olive Ridley Turtle Nesting" },
        { type: "paragraph", text: "Odisha's Gahirmatha beach hosts the world's largest nesting site for Olive Ridley sea turtles. Every year, millions of turtles arrive for mass nesting - a phenomenon called 'arribada.'" },
        { type: "paragraph", text: "Conservation efforts include patrolling nesting beaches, regulating fishing during nesting season, reducing marine pollution, and community education. Local communities have transformed from egg collectors to turtle protectors." },
        { type: "heading", text: "Great Indian Bustard Recovery Effort" },
        { type: "paragraph", text: "With fewer than 150 birds remaining, the Great Indian Bustard is critically endangered. Conservation breeding programs, habitat restoration in Rajasthan and Gujarat grasslands, and power line modifications to prevent electrocution deaths are giving hope for recovery." },
        { type: "heading", text: "Community Conservation: The Bishnoi Example" },
        { type: "paragraph", text: "The Bishnoi community of Rajasthan has practiced wildlife conservation for over 500 years, long before it became government policy. Their religious beliefs prohibit harming trees and animals, creating safe havens for blackbucks and chinkara deer." },
        { type: "paragraph", text: "'We don't see conservation as duty; it's our dharma,' explains village elder Ramdev Bishnoi. Their model of community-led conservation is now being replicated across India." },
        { type: "heading", text: "Technology in Conservation" },
        { type: "list", items: [
          "Camera traps for monitoring wildlife populations",
          "GPS collars tracking animal movements",
          "Drones for anti-poaching surveillance",
          "AI identifying individual animals from photos",
          "Mobile apps for real-time reporting of wildlife sightings",
          "Satellite imagery monitoring habitat changes",
          "Genetic analysis for population health assessment"
        ]},
        { type: "heading", text: "Challenges Ahead" },
        { type: "paragraph", text: "Despite successes, challenges remain: human-wildlife conflict, habitat fragmentation from development, climate change affecting ecosystems, poaching driven by illegal wildlife trade, and balancing conservation with livelihood needs." },
        { type: "heading", text: "The Path Forward" },
        { type: "paragraph", text: "India's wildlife conservation successes demonstrate that recovery is possible when conservation becomes everyone's responsibility - governments, communities, NGOs, and individuals working together." },
        { type: "paragraph", text: "As wildlife populations recover, they bring ecosystem benefits: forests regenerate, water sources improve, and eco-tourism creates sustainable livelihoods. Conservation isn't just about saving species - it's about ensuring a livable planet for all." },
        { type: "quote", text: "When we protect wildlife, we protect our future. These species are not just part of our heritage; they're essential to functioning ecosystems we depend on.", author: "Rohit Bhargava, Wildlife Photographer" }
      ],
      tags: ["Wildlife", "Conservation", "Tigers", "Environment", "India", "Endangered Species"],
      relatedStories: []
    },
    'handicraft-revival': {
      title: "Traditional Crafts Revival: Artisans Making a Comeback",
      category: "Handicraft",
      author: "Sunita Reddy",
      date: "December 15, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200",
      content: [
        { type: "paragraph", text: "India's traditional handicrafts, once threatened by mass production and changing consumer preferences, are experiencing a remarkable revival. Young artisans, innovative designers, and digital platforms are bringing centuries-old crafts to global markets." },
        { type: "heading", text: "The Crisis Years" },
        { type: "paragraph", text: "Two decades ago, India's handicraft sector faced existential crisis. Cheaper factory-made alternatives flooded markets, young people abandoned ancestral crafts for urban jobs, and artisan families struggled with poverty. Entire craft traditions risked extinction." },
        { type: "list", items: [
          "Artisan incomes dropped below poverty line",
          "Youth migration from craft villages",
          "Loss of traditional knowledge as elders passed away",
          "Unable to compete with machine-made products",
          "Limited market access for rural artisans"
        ]},
        { type: "heading", text: "The Turning Point" },
        { type: "paragraph", text: "The revival began when consumers started valuing authenticity, sustainability, and the human story behind products. Global markets embraced 'slow fashion' and handmade goods. Digital platforms connected artisans directly with customers, eliminating exploitative middlemen." },
        { type: "heading", text: "Success Story: Channapatna Toys" },
        { type: "paragraph", text: "The wooden toy industry of Channapatna, Karnataka, famous for colorful lacquerware toys, was dying. Then 35-year-old Rao Mallesh returned from his IT job in Bangalore to revive his family craft." },
        { type: "quote", text: "I realized the craft my family practiced for seven generations was more valuable than any corporate job. But we needed to adapt to modern markets.", author: "Rao Mallesh" },
        { type: "paragraph", text: "Rao modernized designs while maintaining traditional techniques, obtained GI (Geographical Indication) certification, created an e-commerce website, and collaborated with contemporary designers. Today, Channapatna toys are exported worldwide, and young artisans are returning to the craft." },
        { type: "heading", text: "Kalamkari Renaissance" },
        { type: "paragraph", text: "Kalamkari, the ancient hand-painted textile art from Andhra Pradesh, found new life through fashion collaborations. Designers paired traditional Kalamkari with modern silhouettes, creating high-value products for urban and international markets." },
        { type: "paragraph", text: "Artisan collectives now work directly with fashion brands, earning 3-4 times what middlemen paid. Young women are learning Kalamkari painting, ensuring skill transfer to new generations." },
        { type: "heading", text: "Blue Pottery's Digital Success" },
        { type: "paragraph", text: "Jaipur's blue pottery craft was practiced by fewer than 20 families. Instagram and Etsy changed everything. Artisan Kripal Singh Shekhawat started posting photos of his work online. Orders poured in from across the world." },
        { type: "list", items: [
          "Monthly income increased from ₹8,000 to ₹80,000",
          "Hired and trained 15 young artisans",
          "Products featured in international design magazines",
          "Workshops teaching blue pottery to enthusiasts",
          "Custom commissions for luxury hotels and restaurants"
        ]},
        { type: "heading", text: "Government and NGO Support" },
        { type: "paragraph", text: "Schemes like Handicrafts Development Programme, Design Innovation, and Market Access initiatives provide critical support. GI tags protect traditional crafts from imitation. NGOs offer design training, quality control, and market linkages." },
        { type: "heading", text: "The Role of E-Commerce" },
        { type: "paragraph", text: "Platforms like Amazon Karigar, Crafts Villa, and Jaypore have democratized market access. Artisans from remote villages now sell directly to customers in metro cities and abroad. Payment processing, logistics, and customer service are handled by platforms, allowing artisans to focus on their craft." },
        { type: "heading", text: "Design Innovation + Tradition" },
        { type: "paragraph", text: "Successful revivals balance tradition with innovation. Traditional weaving techniques create contemporary home decor. Ancient metal craft becomes modern jewelry. Block printing adorns fashionable apparel. The craft remains authentic while products suit modern lifestyles." },
        { type: "heading", text: "Craft Tourism" },
        { type: "paragraph", text: "Villages are becoming tourist destinations where visitors learn traditional crafts. Pottery villages in Gujarat, weaving communities in Odisha, and textile towns in Rajasthan offer immersive experiences. Tourism provides additional income and raises craft appreciation." },
        { type: "heading", text: "Youth Return to Crafts" },
        { type: "paragraph", text: "Perhaps the most heartening development is educated youth returning to ancestral crafts. They bring fresh perspectives, business acumen, and digital skills while preserving traditional knowledge." },
        { type: "paragraph", text: "24-year-old Meera, with an MBA degree, manages her family's handloom business in Tamil Nadu. 'My education helps run the business professionally, but the craft wisdom comes from my grandmother,' she says. Her Instagram handle showcases weaving process videos, attracting customers who value transparency and authenticity." },
        { type: "heading", text: "Challenges That Remain" },
        { type: "list", items: [
          "Raw material costs increasing",
          "Need for continuous design innovation",
          "Quality consistency for large orders",
          "Competition from machine-made 'handloom-look' products",
          "Access to credit for expansion",
          "Skill training infrastructure"
        ]},
        { type: "heading", text: "The Future" },
        { type: "paragraph", text: "India's handicraft sector now employs over 7 million artisans and contributes significantly to exports. The revival isn't just economic - it's cultural preservation, sustainable employment, and maintaining connections to heritage." },
        { type: "paragraph", text: "As consumers worldwide prioritize sustainability and authenticity, Indian handicrafts are perfectly positioned. Every purchase becomes a vote for tradition, artisan livelihoods, and environmental responsibility." },
        { type: "quote", text: "When you buy a handcrafted product, you're not just buying an object. You're supporting a family, preserving a tradition, and choosing a sustainable future.", author: "Sunita Reddy, Craft Curator" }
      ],
      tags: ["Handicrafts", "Traditional Arts", "Artisans", "Sustainability", "Cultural Heritage", "E-commerce"],
      relatedStories: []
    }
  };

  // First try to use fetched story, otherwise generate fallback content
  const displayStory = story || (featuredStories[slug] || generateStoryContent(slug));

  const renderContent = (item, index) => {
    switch (item.type) {
      case 'paragraph':
        return <p key={index} className="content-paragraph">{item.text}</p>;
      case 'heading':
        return <h2 key={index} className="content-heading">{item.text}</h2>;
      case 'subheading':
        return <h3 key={index} className="content-subheading">{item.text}</h3>;
      case 'list':
        return (
          <ul key={index} className="content-list">
            {item.items && item.items.map((listItem, i) => (
              <li key={i}>{listItem}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote key={index} className="content-quote">
            <p>"{item.text}"</p>
            {item.author && <cite>— {item.author}</cite>}
          </blockquote>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="story-detail">
        <div className="story-header">
          <div className="container">
            <Link to="/" className="back-to-home-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Link>
            <div style={{textAlign: 'center', padding: '50px'}}>
              <h2>Loading story...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-detail">
        <div className="story-header">
          <div className="container">
            <Link to="/" className="back-to-home-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Link>
            <div style={{textAlign: 'center', padding: '50px'}}>
              <h2>{error}</h2>
              <p>The story you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-detail">
      <div className="story-header">
        <div className="container">
          <Link to="/" className="back-to-home-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          <span className="story-category-badge">{displayStory.category}</span>
          <h1 className="story-title">{displayStory.title}</h1>
          <div className="story-meta">
            <span className="author">By {displayStory.author}</span>
            <span>•</span>
            <span className="date">{displayStory.date}</span>
            <span>•</span>
            <span className="read-time">{displayStory.readTime}</span>
          </div>
        </div>
      </div>

      <div className="story-featured-image">
        <img src={displayStory.image} alt={displayStory.title} />
      </div>

      <div className="story-content">
        <div className="container">
          <article className="content-article">
            {displayStory.content && displayStory.content.map((item, index) => renderContent(item, index))}
          </article>

          {displayStory.tags && displayStory.tags.length > 0 && (
            <div className="story-tags">
              <h3>Tags:</h3>
              <div className="tags-list">
                {displayStory.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="story-share">
            <h3>Share this story:</h3>
            <div className="share-buttons">
              <button className="share-btn facebook">Facebook</button>
              <button className="share-btn twitter">Twitter</button>
              <button className="share-btn linkedin">LinkedIn</button>
              <button className="share-btn whatsapp">WhatsApp</button>
            </div>
          </div>

          {displayStory.relatedStories && displayStory.relatedStories.length > 0 && (
            <div className="related-stories">
              <h2>Related Stories</h2>
              <div className="related-grid">
                {displayStory.relatedStories.map((related, index) => (
                  <Link to={`/story/${related.slug}`} key={index} className="related-card">
                    <img src={related.image} alt={related.title} />
                    <h3>{related.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;

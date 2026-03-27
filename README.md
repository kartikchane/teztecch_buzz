# Teztecch Buzz - Inspiring Stories Platform

A React-based website clone of Teztecch Buzz, featuring inspiring stories and positive news from across India.

## Features

- 🏠 **Home Page**: Hero section, featured stories, category exploration, and newsletter subscription
- 📰 **Stories**: Browse and filter stories by category (Sustainability, Startup, Travel, Farming, Education)
- ℹ️ **About**: Learn about the platform's mission and values
- 📊 **Our Impact**: View impact statistics and achievements
- 📢 **Advertise**: Information for advertisers with inquiry form
- 📰 **Press Coverage**: Press releases and media mentions
- 📞 **Contact**: Contact form to reach the team
- 💼 **Careers**: Job listings and application form
- 📄 **Utility Pages**: Privacy Policy, Terms of Use, Grievance Redressal, Work With Us

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks (useState)

## Project Structure

```
C:\TezTecch_Buzz\
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx & Home.css
│   │   ├── About.jsx & About.css
│   │   ├── Stories.jsx & Stories.css
│   │   ├── OurImpact.jsx & OurImpact.css
│   │   ├── Advertise.jsx & Advertise.css
│   │   ├── Press.jsx & Press.css
│   │   ├── Contact.jsx & Contact.css
│   │   ├── Career.jsx & Career.css
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfUse.jsx
│   │   ├── Grievance.jsx
│   │   ├── WorkWithUs.jsx
│   │   └── UtilityPages.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Pages & Routes

- `/` - Home page
- `/about` - About Us
- `/stories` - All Stories (with category filtering)
- `/our-impact` - Our Impact
- `/advertise` - Advertise With Us
- `/press` - Press Coverage
- `/contact` - Contact Us
- `/career` - Career Opportunities
- `/privacy-policy` - Privacy Policy
- `/terms-of-use` - Terms of Use
- `/grievance` - Grievance Redressal
- `/work-with-us` - Work With Us

## Features Implemented

### Navigation
- ✅ Responsive header with logo and navigation menu
- ✅ Mobile-friendly hamburger menu
- ✅ Topics dropdown with category links
- ✅ Search button (UI only)
- ✅ Subscribe button

### Footer
- ✅ Social media links (Facebook, Twitter, Instagram, YouTube, LinkedIn)
- ✅ Download app section
- ✅ Newsletter subscription form
- ✅ Category links (Stories section)
- ✅ Utility page links (More section)
- ✅ Contact information
- ✅ All footer links are functional

### Home Page
- ✅ Hero section with call-to-action
- ✅ Featured stories grid with images
- ✅ Category cards for exploration
- ✅ Newsletter subscription
- ✅ All links and images working

### Other Pages
- ✅ Fully functional pages with content
- ✅ Contact forms with validation
- ✅ Responsive design for all screen sizes
- ✅ Consistent styling across pages

## Responsive Design

The website is fully responsive and works on:
- 📱 Mobile devices (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktops (> 1024px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- All navbar links are functional and routed properly
- All footer links are working and navigate to respective pages
- Home page features clickable story cards with images
- Forms include basic validation
- Responsive design implemented for all components

## Future Enhancements

- Backend API integration
- User authentication
- Database integration for stories
- Search functionality
- Comment system
- Social sharing features
- Admin dashboard

## License

This is a demo project created for educational purposes.

## Contact

For questions or feedback, please contact: hello@teztecchbuzz.in

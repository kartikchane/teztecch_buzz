import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Stories from './pages/Stories';
import Categories from './pages/Categories';
import OurImpact from './pages/OurImpact';
import Advertise from './pages/Advertise';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Career from './pages/Career';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Grievance from './pages/Grievance';
import WorkWithUs from './pages/WorkWithUs';
import BrandCampaigns from './pages/BrandCampaigns';
import WatchVideos from './pages/WatchVideos';
import StoryDetail from './pages/StoryDetail';
import VideoPlayer from './pages/VideoPlayer';
import VisualStories from './pages/VisualStories';
import Changemakers from './pages/Changemakers';
import Shorts from './pages/Shorts';
import Sustainability from './pages/Sustainability';
import VideoStories from './pages/VideoStories';
import Parenting from './pages/Parenting';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/story/:slug" element={<StoryDetail />} />
              <Route path="/video/:slug" element={<VideoPlayer />} />
              <Route path="/visual-stories" element={<VisualStories />} />
              <Route path="/changemakers" element={<Changemakers />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/video-stories" element={<VideoStories />} />
              <Route path="/parenting" element={<Parenting />} />
              <Route path="/our-impact" element={<OurImpact />} />
              <Route path="/advertise" element={<Advertise />} />
              <Route path="/brand-campaigns" element={<BrandCampaigns />} />
              <Route path="/watch-videos" element={<WatchVideos />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/career" element={<Career />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/grievance" element={<Grievance />} />
              <Route path="/work-with-us" element={<WorkWithUs />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

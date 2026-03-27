import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stories, setStories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [visualStories, setVisualStories] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    checkAuth();
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'dashboard') {
      fetchData();
    }
  }, [activeTab, currentPage]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      window.location.href = '/';
      return;
    }

    setUser(parsedUser);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/dashboard/stats`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'stories':
          endpoint = '/api/admin/stories';
          break;
        case 'videos':
          endpoint = '/api/admin/videos';
          break;
        case 'visual-stories':
          endpoint = '/api/admin/visual-stories';
          break;
        case 'subscribers':
          endpoint = '/api/admin/subscribers';
          break;
        case 'contacts':
          endpoint = '/api/admin/contacts';
          break;
        case 'grievances':
          endpoint = '/api/admin/grievances';
          break;
        case 'users':
          endpoint = '/api/admin/users';
          break;
        case 'pages':
          endpoint = '/api/admin/pages';
          break;
        case 'jobs':
          endpoint = '/api/admin/jobs';
          break;
        case 'press-releases':
          endpoint = '/api/admin/press-releases';
          break;
        case 'testimonials':
          endpoint = '/api/admin/testimonials';
          break;
        case 'hero-slides':
          endpoint = '/api/admin/hero-slides';
          break;
        case 'categories':
          endpoint = '/api/admin/categories';
          break;
        case 'menu-items':
          endpoint = '/api/admin/menu-items';
          break;
        default:
          return;
      }

      const response = await fetch(`${API_BASE}${endpoint}?page=${currentPage}&limit=10`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();

      if (data.success) {
        switch (activeTab) {
          case 'stories':
            setStories(data.data);
            break;
          case 'videos':
            setVideos(data.data);
            break;
          case 'visual-stories':
            setVisualStories(data.data);
            break;
          case 'subscribers':
            setSubscribers(data.data);
            break;
          case 'contacts':
            setContacts(data.data);
            break;
          case 'grievances':
            setGrievances(data.data);
            break;
          case 'users':
            setUsers(data.data);
            break;
          case 'pages':
            setPages(data.data);
            break;
          case 'jobs':
            setJobs(data.data);
            break;
          case 'press-releases':
            setPressReleases(data.data);
            break;
          case 'testimonials':
            setTestimonials(data.data);
            break;
          case 'hero-slides':
            setHeroSlides(data.data);
            break;
          case 'categories':
            setCategories(data.data);
            break;
          case 'menu-items':
            setMenuItems(data.data);
            break;
        }
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`${API_BASE}/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      if (data.success) {
        alert('Item deleted successfully');
        fetchData();
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  const handleSave = async (formData) => {
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `${API_BASE}/api/admin/${modalType}/${editingItem._id}`
        : `${API_BASE}/api/admin/${modalType}`;

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert(editingItem ? 'Updated successfully' : 'Created successfully');
        closeModal();
        fetchData();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    }
  };

  if (loading && !stats) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h3>Loading Admin Dashboard...</h3>
        <p>Please wait while we fetch your data</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>TezTecch Buzz</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'stories' ? 'active' : ''}
            onClick={() => setActiveTab('stories')}
          >
            📝 Stories
          </button>
          <button 
            className={activeTab === 'videos' ? 'active' : ''}
            onClick={() => setActiveTab('videos')}
          >
            🎥 Videos
          </button>
          <button 
            className={activeTab === 'visual-stories' ? 'active' : ''}
            onClick={() => setActiveTab('visual-stories')}
          >
            🖼️ Visual Stories
          </button>
          <button 
            className={activeTab === 'subscribers' ? 'active' : ''}
            onClick={() => setActiveTab('subscribers')}
          >
            📧 Subscribers
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => setActiveTab('contacts')}
          >
            💬 Contacts
          </button>
          <button 
            className={activeTab === 'grievances' ? 'active' : ''}
            onClick={() => setActiveTab('grievances')}
          >
            🎫 Grievances
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button 
            className={activeTab === 'pages' ? 'active' : ''}
            onClick={() => setActiveTab('pages')}
          >
            📄 Pages
          </button>
          <button 
            className={activeTab === 'jobs' ? 'active' : ''}
            onClick={() => setActiveTab('jobs')}
          >
            💼 Jobs
          </button>
          <button 
            className={activeTab === 'press-releases' ? 'active' : ''}
            onClick={() => setActiveTab('press-releases')}
          >
            📰 Press
          </button>
          <button 
            className={activeTab === 'testimonials' ? 'active' : ''}
            onClick={() => setActiveTab('testimonials')}
          >
            ⭐ Testimonials
          </button>
          <button 
            className={activeTab === 'hero-slides' ? 'active' : ''}
            onClick={() => setActiveTab('hero-slides')}
          >
            🎬 Hero Slides
          </button>
          <button 
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => setActiveTab('categories')}
          >
            🏷️ Categories
          </button>
          <button 
            className={activeTab === 'menu-items' ? 'active' : ''}
            onClick={() => setActiveTab('menu-items')}
          >
            🍔 Menu Items
          </button>
        </nav>
        <div className="admin-user-info">
          <p>👤 {user?.name}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h1>
        </header>

        <div className="admin-body">
          {activeTab === 'dashboard' && stats && (
            <DashboardStats stats={stats} onTabChange={setActiveTab} />
          )}

          {activeTab === 'stories' && (
            <ContentManager
              type="stories"
              data={stories}
              onAdd={() => openModal('stories')}
              onEdit={(item) => openModal('stories', item)}
              onDelete={(id) => handleDelete('stories', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'videos' && (
            <ContentManager
              type="videos"
              data={videos}
              onAdd={() => openModal('videos')}
              onEdit={(item) => openModal('videos', item)}
              onDelete={(id) => handleDelete('videos', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'visual-stories' && (
            <ContentManager
              type="visual-stories"
              data={visualStories}
              onAdd={() => openModal('visual-stories')}
              onEdit={(item) => openModal('visual-stories', item)}
              onDelete={(id) => handleDelete('visual-stories', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'subscribers' && (
            <SubscribersManager
              data={subscribers}
              onDelete={(id) => handleDelete('subscribers', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactsManager
              data={contacts}
              onEdit={(item) => openModal('contacts', item)}
              onDelete={(id) => handleDelete('contacts', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'grievances' && (
            <GrievancesManager
              data={grievances}
              onEdit={(item) => openModal('grievances', item)}
              onDelete={(id) => handleDelete('grievances', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'users' && (
            <UsersManager
              data={users}
              onEdit={(item) => openModal('users', item)}
              onDelete={(id) => handleDelete('users', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'pages' && (
            <ContentManager
              type="pages"
              data={pages}
              onAdd={() => openModal('pages')}
              onEdit={(item) => openModal('pages', item)}
              onDelete={(id) => handleDelete('pages', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'jobs' && (
            <ContentManager
              type="jobs"
              data={jobs}
              onAdd={() => openModal('jobs')}
              onEdit={(item) => openModal('jobs', item)}
              onDelete={(id) => handleDelete('jobs', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'press-releases' && (
            <ContentManager
              type="press-releases"
              data={pressReleases}
              onAdd={() => openModal('press-releases')}
              onEdit={(item) => openModal('press-releases', item)}
              onDelete={(id) => handleDelete('press-releases', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              data={testimonials}
              onAdd={() => openModal('testimonials')}
              onEdit={(item) => openModal('testimonials', item)}
              onDelete={(id) => handleDelete('testimonials', id)}
            />
          )}

          {activeTab === 'hero-slides' && (
            <ContentManager
              type="hero-slides"
              data={heroSlides}
              onAdd={() => openModal('hero-slides')}
              onEdit={(item) => openModal('hero-slides', item)}
              onDelete={(id) => handleDelete('hero-slides', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'categories' && (
            <ContentManager
              type="categories"
              data={categories}
              onAdd={() => openModal('categories')}
              onEdit={(item) => openModal('categories', item)}
              onDelete={(id) => handleDelete('categories', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {activeTab === 'menu-items' && (
            <ContentManager
              type="menu-items"
              data={menuItems}
              onAdd={() => openModal('menu-items')}
              onEdit={(item) => openModal('menu-items', item)}
              onDelete={(id) => handleDelete('menu-items', id)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Dashboard Stats Component - Enhanced with Recent Items
const DashboardStats = ({ stats, onTabChange }) => {
  const [recentStories, setRecentStories] = React.useState([]);
  const [recentVideos, setRecentVideos] = React.useState([]);
  const [recentContacts, setRecentContacts] = React.useState([]);
  const [recentGrievances, setRecentGrievances] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchRecentData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchRecentData = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const [storiesRes, videosRes, contactsRes, grievancesRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/stories?limit=5`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE}/api/admin/videos?limit=5`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE}/api/admin/contacts?limit=5`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE}/api/admin/grievances?limit=5`, { headers: getAuthHeaders() })
      ]);

      const [storiesData, videosData, contactsData, grievancesData] = await Promise.all([
        storiesRes.json(),
        videosRes.json(),
        contactsRes.json(),
        grievancesRes.json()
      ]);

      if (storiesData.success) setRecentStories(storiesData.data);
      if (videosData.success) setRecentVideos(videosData.data);
      if (contactsData.success) setRecentContacts(contactsData.data);
      if (grievancesData.success) setRecentGrievances(grievancesData.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching recent data:', error);
      setLoading(false);
    }
  };
  
  const getPercentage = (value, total) => total > 0 ? Math.round((value / total) * 100) : 0;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h2>Welcome to TezTecch Buzz Admin Panel! 👋</h2>
          <p>Manage your entire website content from this powerful dashboard</p>
          <p className="dashboard-subtitle">Total Content Items: {stats.stories.total + stats.videos.total + stats.visualStories.total}</p>
        </div>
        <div className="quick-stats">
          <div className="quick-stat-item">
            <span className="quick-stat-number">{stats.stories.total + stats.videos.total + stats.visualStories.total}</span>
            <span className="quick-stat-label">Total Content</span>
          </div>
          <div className="quick-stat-item">
            <span className="quick-stat-number">{stats.subscribers.total}</span>
            <span className="quick-stat-label">Subscribers</span>
          </div>
          <div className="quick-stat-item">
            <span className="quick-stat-number">{stats.users.total}</span>
            <span className="quick-stat-label">Users</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-stories">
          <div className="stat-icon">📰</div>
          <div className="stat-content">
            <h3>Stories</h3>
            <p className="stat-number">{stats.stories.total}</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill progress-fill-stories" 
                  style={{ width: `${getPercentage(stats.stories.published, stats.stories.total)}%` }}
                ></div>
              </div>
              <p className="stat-detail">{stats.stories.published} Published ({getPercentage(stats.stories.published, stats.stories.total)}%)</p>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-videos">
          <div className="stat-icon">🎥</div>
          <div className="stat-content">
            <h3>Videos</h3>
            <p className="stat-number">{stats.videos.total}</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill progress-fill-videos" 
                  style={{ width: `${getPercentage(stats.videos.published, stats.videos.total)}%` }}
                ></div>
              </div>
              <p className="stat-detail">{stats.videos.published} Published ({getPercentage(stats.videos.published, stats.videos.total)}%)</p>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-visual">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <h3>Visual Stories</h3>
            <p className="stat-number">{stats.visualStories.total}</p>
            <p className="stat-detail">Interactive Content</p>
          </div>
        </div>

        <div className="stat-card stat-card-subscribers">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>Subscribers</h3>
            <p className="stat-number">{stats.subscribers.total}</p>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill progress-fill-subscribers" 
                  style={{ width: `${getPercentage(stats.subscribers.active, stats.subscribers.total)}%` }}
                ></div>
              </div>
              <p className="stat-detail">{stats.subscribers.active} Active ({getPercentage(stats.subscribers.active, stats.subscribers.total)}%)</p>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-contacts">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>Contacts</h3>
            <p className="stat-number">{stats.contacts.total}</p>
            <div className="stat-badge-group">
              <span className="badge badge-pending">{stats.contacts.pending} Pending</span>
              <span className="badge badge-resolved">{stats.contacts.total - stats.contacts.pending} Resolved</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-grievances">
          <div className="stat-icon">🎫</div>
          <div className="stat-content">
            <h3>Grievances</h3>
            <p className="stat-number">{stats.grievances.total}</p>
            <div className="stat-badge-group">
              <span className="badge badge-pending">{stats.grievances.pending} Pending</span>
              <span className="badge badge-resolved">{stats.grievances.total - stats.grievances.pending} Resolved</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Users</h3>
            <p className="stat-number">{stats.users.total}</p>
            <p className="stat-detail">Registered Users</p>
          </div>
        </div>
      </div>

      {/* Content Overview */}
      <div className="dashboard-row">
        <div className="content-overview-card">
          <h3>📊 Content Overview</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <div className="overview-bar">
                <div className="overview-bar-fill overview-bar-stories" style={{ height: `${(stats.stories.total / (stats.stories.total + stats.videos.total + stats.visualStories.total)) * 100}%` }}></div>
              </div>
              <span className="overview-label">Stories</span>
              <span className="overview-value">{stats.stories.total}</span>
            </div>
            <div className="overview-item">
              <div className="overview-bar">
                <div className="overview-bar-fill overview-bar-videos" style={{ height: `${(stats.videos.total / (stats.stories.total + stats.videos.total + stats.visualStories.total)) * 100}%` }}></div>
              </div>
              <span className="overview-label">Videos</span>
              <span className="overview-value">{stats.videos.total}</span>
            </div>
            <div className="overview-item">
              <div className="overview-bar">
                <div className="overview-bar-fill overview-bar-visual" style={{ height: `${(stats.visualStories.total / (stats.stories.total + stats.videos.total + stats.visualStories.total)) * 100}%` }}></div>
              </div>
              <span className="overview-label">Visual</span>
              <span className="overview-value">{stats.visualStories.total}</span>
            </div>
          </div>
        </div>

        <div className="engagement-card">
          <h3>🔔 Engagement Status</h3>
          <div className="engagement-list">
            <div className="engagement-item">
              <span className="engagement-label">Active Subscribers</span>
              <div className="engagement-progress">
                <div className="engagement-bar">
                  <div className="engagement-fill engagement-fill-high" style={{ width: `${getPercentage(stats.subscribers.active, stats.subscribers.total)}%` }}></div>
                </div>
                <span className="engagement-percent">{getPercentage(stats.subscribers.active, stats.subscribers.total)}%</span>
              </div>
            </div>
            <div className="engagement-item">
              <span className="engagement-label">Published Stories</span>
              <div className="engagement-progress">
                <div className="engagement-bar">
                  <div className="engagement-fill engagement-fill-medium" style={{ width: `${getPercentage(stats.stories.published, stats.stories.total)}%` }}></div>
                </div>
                <span className="engagement-percent">{getPercentage(stats.stories.published, stats.stories.total)}%</span>
              </div>
            </div>
            <div className="engagement-item">
              <span className="engagement-label">Published Videos</span>
              <div className="engagement-progress">
                <div className="engagement-bar">
                  <div className="engagement-fill engagement-fill-good" style={{ width: `${getPercentage(stats.videos.published, stats.videos.total)}%` }}></div>
                </div>
                <span className="engagement-percent">{getPercentage(stats.videos.published, stats.videos.total)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-card">
        <h3>⚡ Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-action-btn quick-action-story" onClick={() => onTabChange('stories')}>
            <span className="quick-action-icon">📝</span>
            <span className="quick-action-text">Manage Stories</span>
          </button>
          <button className="quick-action-btn quick-action-video" onClick={() => onTabChange('videos')}>
            <span className="quick-action-icon">🎬</span>
            <span className="quick-action-text">Manage Videos</span>
          </button>
          <button className="quick-action-btn quick-action-visual" onClick={() => onTabChange('visual-stories')}>
            <span className="quick-action-icon">🖼️</span>
            <span className="quick-action-text">Visual Stories</span>
          </button>
          <button className="quick-action-btn quick-action-manage" onClick={() => onTabChange('subscribers')}>
            <span className="quick-action-icon">📧</span>
            <span className="quick-action-text">Subscribers</span>
          </button>
        </div>
      </div>

      {/* Recent Content Section */}
      <div className="recent-content-section">
        <div className="recent-content-grid">
          {/* Recent Stories */}
          <div className="recent-content-card">
            <div className="recent-header">
              <h3>📰 Recent Stories</h3>
              <button className="view-all-btn" onClick={() => onTabChange('stories')}>View All →</button>
            </div>
            {loading ? (
              <div className="recent-loading">Loading...</div>
            ) : recentStories.length > 0 ? (
              <div className="recent-items-list">
                {recentStories.map(story => (
                  <div key={story._id} className="recent-item">
                    <div className="recent-item-content">
                      <div className="recent-item-title">{story.title}</div>
                      <div className="recent-item-meta">
                        <span className="recent-meta-item">📂 {story.category}</span>
                        <span className="recent-meta-item">✍️ {story.author}</span>
                        <span className="recent-meta-item">📅 {formatDate(story.createdAt)}</span>
                      </div>
                    </div>
                    <div className="recent-item-status">
                      <span className={`status-badge ${story.published ? 'status-published' : 'status-draft'}`}>
                        {story.published ? '✓ Published' : '📝 Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="recent-empty">No stories found. Create your first story!</div>
            )}
          </div>

          {/* Recent Videos */}
          <div className="recent-content-card">
            <div className="recent-header">
              <h3>🎥 Recent Videos</h3>
              <button className="view-all-btn" onClick={() => onTabChange('videos')}>View All →</button>
            </div>
            {loading ? (
              <div className="recent-loading">Loading...</div>
            ) : recentVideos.length > 0 ? (
              <div className="recent-items-list">
                {recentVideos.map(video => (
                  <div key={video._id} className="recent-item">
                    <div className="recent-item-content">
                      <div className="recent-item-title">{video.title}</div>
                      <div className="recent-item-meta">
                        <span className="recent-meta-item">📂 {video.category}</span>
                        <span className="recent-meta-item">⏱️ {video.duration}</span>
                        <span className="recent-meta-item">📅 {formatDate(video.createdAt)}</span>
                      </div>
                    </div>
                    <div className="recent-item-status">
                      <span className={`status-badge ${video.published ? 'status-published' : 'status-draft'}`}>
                        {video.published ? '✓ Published' : '📝 Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="recent-empty">No videos found. Upload your first video!</div>
            )}
          </div>
        </div>

        <div className="recent-content-grid">
          {/* Recent Contacts */}
          <div className="recent-content-card">
            <div className="recent-header">
              <h3>💬 Recent Contacts</h3>
              <button className="view-all-btn" onClick={() => onTabChange('contacts')}>View All →</button>
            </div>
            {loading ? (
              <div className="recent-loading">Loading...</div>
            ) : recentContacts.length > 0 ? (
              <div className="recent-items-list">
                {recentContacts.map(contact => (
                  <div key={contact._id} className="recent-item">
                    <div className="recent-item-content">
                      <div className="recent-item-title">{contact.name}</div>
                      <div className="recent-item-meta">
                        <span className="recent-meta-item">📧 {contact.email}</span>
                        <span className="recent-meta-item">📅 {formatDate(contact.createdAt)}</span>
                      </div>
                      <div className="recent-item-message">{contact.message?.substring(0, 60)}...</div>
                    </div>
                    <div className="recent-item-status">
                      <span className={`status-badge ${contact.status === 'pending' ? 'status-pending' : 'status-resolved'}`}>
                        {contact.status === 'pending' ? '⏳ Pending' : '✓ Resolved'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="recent-empty">No contacts yet.</div>
            )}
          </div>

          {/* Recent Grievances */}
          <div className="recent-content-card">
            <div className="recent-header">
              <h3>🎫 Recent Grievances</h3>
              <button className="view-all-btn" onClick={() => onTabChange('grievances')}>View All →</button>
            </div>
            {loading ? (
              <div className="recent-loading">Loading...</div>
            ) : recentGrievances.length > 0 ? (
              <div className="recent-items-list">
                {recentGrievances.map(grievance => (
                  <div key={grievance._id} className="recent-item">
                    <div className="recent-item-content">
                      <div className="recent-item-title">Ticket #{grievance.trackingNumber}</div>
                      <div className="recent-item-meta">
                        <span className="recent-meta-item">📂 {grievance.category}</span>
                        <span className="recent-meta-item">📅 {formatDate(grievance.createdAt)}</span>
                      </div>
                      <div className="recent-item-message">{grievance.description?.substring(0, 60)}...</div>
                    </div>
                    <div className="recent-item-status">
                      <span className={`status-badge status-${grievance.status}`}>
                        {grievance.status === 'submitted' && '📨 New'}
                        {grievance.status === 'under-review' && '🔍 Review'}
                        {grievance.status === 'resolved' && '✓ Resolved'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="recent-empty">No grievances yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Manager Component
const ContentManager = ({ type, data, onAdd, onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  const getColumns = () => {
    switch(type) {
      case 'pages':
        return { title: 'Title', col2: 'Template', col3: 'Slug', hasViews: false };
      case 'jobs':
        return { title: 'Title', col2: 'Department', col3: 'Location', hasViews: true };
      case 'press-releases':
        return { title: 'Title', col2: 'Category', col3: 'Date', hasViews: true };
      default:
        return { title: 'Title', col2: 'Category', col3: 'Author', hasViews: true };
    }
  };

  const columns = getColumns();

  return (
    <div className="content-manager">
      <div className="manager-header">
        <button onClick={onAdd} className="btn-primary">Add New</button>
      </div>
      {data && data.length > 0 ? (
        <>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>{columns.title}</th>
                  <th>{columns.col2}</th>
                  <th>{columns.col3}</th>
                  <th>Published</th>
                  {columns.hasViews && <th>Views</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>
                      {type === 'pages' ? item.template : 
                       type === 'jobs' ? item.department :
                       type === 'press-releases' ? item.category :
                       item.category}
                    </td>
                    <td>
                      {type === 'pages' ? item.slug :
                       type === 'jobs' ? item.location :
                       type === 'press-releases' ? new Date(item.date).toLocaleDateString() :
                       item.author}
                    </td>
                    <td>
                      <span className={`status-badge ${item.published ? 'status-published' : 'status-draft'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    {columns.hasViews && <td>{item.views || 0}</td>}
                    <td>
                      <button onClick={() => onEdit(item)} className="btn-edit">Edit</button>
                      <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>No {type} yet</h3>
          <p>Click "Add New" to create your first {type}</p>
        </div>
      )}
    </div>
  );
};

// Subscribers Manager
const SubscribersManager = ({ data, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-manager">
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Subscribed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>{new Date(item.subscribedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

// Contacts Manager
const ContactsManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-manager">
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.organization || 'N/A'}</td>
              <td>
                <span className={`status-badge status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(item)} className="btn-edit">View/Edit</button>
                <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

// Grievances Manager
const GrievancesManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-manager">
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Tracking #</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.trackingNumber}</td>
              <td>{item.name}</td>
              <td>{item.grievanceType}</td>
              <td>
                <span className={`status-badge status-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <span className={`status-badge ${item.priority === 'high' ? 'status-draft' : item.priority === 'medium' ? 'status-pending' : 'status-active'}`}>
                  {item.priority}
                </span>
              </td>
              <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(item)} className="btn-edit">View/Edit</button>
                <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

// Users Manager
const UsersManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-manager">
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(item)} className="btn-edit">Edit Role</button>
                <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button 
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button 
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

// Modal Component (simplified - you'll need to expand this)
const Modal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item || {
    title: '',
    description: '',
    content: '',
    category: 'general',
    author: '',
    imageUrl: '',
    thumbnailUrl: '',
    videoUrl: '',
    tags: [],
    published: false,
    featured: false,
    readTime: 5,
    duration: '0:00',
    type: 'video'
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderFormFields = () => {
    if (type === 'stories') {
      return (
        <>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="Enter story title"
            />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              placeholder="Brief description of the story"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              required
              placeholder="Full story content"
              rows="8"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category || 'general'} onChange={handleChange}>
                <option value="general">General</option>
                <option value="changemakers">Changemakers</option>
                <option value="parenting">Parenting</option>
                <option value="sustainability">Sustainability</option>
                <option value="impact">Impact</option>
              </select>
            </div>
            <div className="form-group">
              <label>Read Time (minutes)</label>
              <input
                type="number"
                name="readTime"
                value={formData.readTime || 5}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              required
              placeholder="Author name"
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags?.join(', ') || ''}
              onChange={handleTagsChange}
              placeholder="sustainability, innovation, social impact"
            />
          </div>
          <div className="form-row checkbox-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleChange}
                />
                <span>Published</span>
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (type === 'videos') {
      return (
        <>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="Enter video title"
            />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              placeholder="Brief description of the video"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Video URL *</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl || ''}
              onChange={handleChange}
              required
              placeholder="https://youtube.com/watch?v=... or direct video URL"
            />
          </div>
          <div className="form-group">
            <label>Thumbnail URL *</label>
            <input
              type="url"
              name="thumbnailUrl"
              value={formData.thumbnailUrl || ''}
              onChange={handleChange}
              required
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration || '0:00'}
                onChange={handleChange}
                placeholder="5:30"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type || 'video'} onChange={handleChange}>
                <option value="video">Video</option>
                <option value="youtube">YouTube</option>
                <option value="short">Short</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category || 'general'} onChange={handleChange}>
                <option value="general">General</option>
                <option value="shorts">Shorts</option>
                <option value="stories">Stories</option>
                <option value="interviews">Interviews</option>
                <option value="campaigns">Campaigns</option>
              </select>
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleChange}
                required
                placeholder="Author name"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags?.join(', ') || ''}
              onChange={handleTagsChange}
              placeholder="documentary, inspiration, social change"
            />
          </div>
          <div className="form-row checkbox-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleChange}
                />
                <span>Published</span>
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (type === 'contacts') {
      return (
        <>
          <div className="info-display">
            <p><strong>Name:</strong> {item?.name}</p>
            <p><strong>Email:</strong> {item?.email}</p>
            <p><strong>Phone:</strong> {item?.phone || 'N/A'}</p>
            <p><strong>Organization:</strong> {item?.organization || 'N/A'}</p>
            <p><strong>Type:</strong> {item?.collaborationType || 'N/A'}</p>
            <p><strong>Message:</strong> {item?.message}</p>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status || 'pending'} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Add internal notes..."
              rows="4"
            />
          </div>
        </>
      );
    }

    if (type === 'grievances') {
      return (
        <>
          <div className="info-display">
            <p><strong>Tracking #:</strong> {item?.trackingNumber}</p>
            <p><strong>Name:</strong> {item?.name}</p>
            <p><strong>Email:</strong> {item?.email}</p>
            <p><strong>Phone:</strong> {item?.phone || 'N/A'}</p>
            <p><strong>Type:</strong> {item?.grievanceType}</p>
            <p><strong>Subject:</strong> {item?.subject}</p>
            <p><strong>Description:</strong> {item?.description}</p>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status || 'submitted'} onChange={handleChange}>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority || 'medium'} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Resolution</label>
            <textarea
              name="resolution"
              value={formData.resolution || ''}
              onChange={handleChange}
              placeholder="Enter resolution details..."
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Admin Notes</label>
            <textarea
              name="adminNotes"
              value={formData.adminNotes || ''}
              onChange={handleChange}
              placeholder="Internal notes..."
              rows="3"
            />
          </div>
        </>
      );
    }

    if (type === 'users') {
      return (
        <>
          <div className="info-display">
            <p><strong>Name:</strong> {item?.name}</p>
            <p><strong>Email:</strong> {item?.email}</p>
            <p><strong>Created:</strong> {new Date(item?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role || 'user'} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </>
      );
    }

    if (type === 'pages') {
      return (
        <>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="Page title"
            />
          </div>
          <div className="form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              required
              placeholder="page-url-slug"
            />
          </div>
          <div className="form-group">
            <label>Template</label>
            <select name="template" value={formData.template || 'custom'} onChange={handleChange}>
              <option value="about">About</option>
              <option value="career">Career</option>
              <option value="press">Press</option>
              <option value="advertise">Advertise</option>
              <option value="brand-campaigns">Brand Campaigns</option>
              <option value="work-with-us">Work With Us</option>
              <option value="our-impact">Our Impact</option>
              <option value="privacy-policy">Privacy Policy</option>
              <option value="terms-of-use">Terms of Use</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              required
              placeholder="Page content (HTML supported)"
              rows="10"
            />
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt || ''}
              onChange={handleChange}
              placeholder="Brief excerpt"
              rows="2"
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="published"
                checked={formData.published || false}
                onChange={handleChange}
              />
              <span>Published</span>
            </label>
          </div>
        </>
      );
    }

    if (type === 'jobs') {
      return (
        <>
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="e.g., Senior Content Writer"
            />
          </div>
          <div className="form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              required
              placeholder="job-url-slug"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
                required
                placeholder="e.g., Editorial"
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                required
                placeholder="e.g., Mumbai, India"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Job Type</label>
              <select name="type" value={formData.type || 'full-time'} onChange={handleChange}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience || ''}
                onChange={handleChange}
                placeholder="e.g., 3-5 years"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              placeholder="Job description"
              rows="5"
            />
          </div>
          <div className="form-group">
            <label>Application Email *</label>
            <input
              type="email"
              name="applicationEmail"
              value={formData.applicationEmail || ''}
              onChange={handleChange}
              required
              placeholder="careers@example.com"
            />
          </div>
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleChange}
                />
                <span>Published</span>
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (type === 'press-releases') {
      return (
        <>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              placeholder="Press release title"
            />
          </div>
          <div className="form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              required
              placeholder="press-release-slug"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category || 'general'} onChange={handleChange}>
                <option value="company-news">Company News</option>
                <option value="product-launch">Product Launch</option>
                <option value="partnership">Partnership</option>
                <option value="award">Award</option>
                <option value="event">Event</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt || ''}
              onChange={handleChange}
              placeholder="Brief excerpt"
              rows="2"
            />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              required
              placeholder="Full press release content"
              rows="8"
            />
          </div>
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published || false}
                  onChange={handleChange}
                />
                <span>Published</span>
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (type === 'testimonials') {
      return (
        <>
          <div className="form-group">
            <label>Quote *</label>
            <textarea
              name="quote"
              value={formData.quote || ''}
              onChange={handleChange}
              required
              placeholder="Testimonial quote"
              rows="4"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Author Name *</label>
              <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleChange}
                required
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
                required
                placeholder="Job title"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              required
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Order</label>
              <input
                type="number"
                name="order"
                value={formData.order || 0}
                onChange={handleChange}
                placeholder="Display order"
                min="0"
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive !== false}
                  onChange={handleChange}
                />
                <span>Active</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit' : 'Add New'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {renderFormFields()}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {item ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Testimonials Manager Component
const TestimonialsManager = ({ data, onAdd, onEdit, onDelete }) => {
  return (
    <div className="testimonials-manager">
      <div className="manager-header">
        <button onClick={onAdd} className="btn-primary">Add New Testimonial</button>
      </div>
      {data && data.length > 0 ? (
        <div className="testimonials-grid-admin">
          {data.map(item => (
            <div key={item._id} className="testimonial-admin-card">
              <div className="testimonial-admin-header">
                <img src={item.image} alt={item.author} className="testimonial-admin-image" />
                <div className="testimonial-admin-info">
                  <h3>{item.author}</h3>
                  <p>{item.position}</p>
                  <p className="company">{item.company}</p>
                </div>
              </div>
              <p className="testimonial-admin-quote">"{item.quote}"</p>
              <div className="testimonial-admin-meta">
                <span className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                  {item.isActive ? '✓ Active' : '✕ Inactive'}
                </span>
                <span className="order-badge">Order: {item.order}</span>
              </div>
              <div className="testimonial-admin-actions">
                <button onClick={() => onEdit(item)} className="btn-edit">Edit</button>
                <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No testimonials found. Add your first testimonial!</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };
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
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

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
        case 'hero-slides':
          endpoint = '/api/admin/hero-slides';
          break;
        case 'categories':
          endpoint = '/api/admin/categories';
          break;
        case 'menu-items':
          endpoint = '/api/admin/menu-items';
          break;
        case 'testimonials':
          endpoint = '/api/admin/testimonials';
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
          case 'hero-slides':
            setHeroSlides(data.data);
            break;
          case 'categories':
            setCategories(data.data);
            break;
          case 'menu-items':
            setMenuItems(data.data);
            break;
          case 'testimonials':
            setTestimonials(data.data);
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
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      
      {/* Hamburger button for mobile */}
      <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
          <h2>TezTecch Buzz</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => handleTabChange('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'stories' ? 'active' : ''}
            onClick={() => handleTabChange('stories')}
          >
            📝 Stories
          </button>
          <button 
            className={activeTab === 'videos' ? 'active' : ''}
            onClick={() => handleTabChange('videos')}
          >
            🎥 Videos
          </button>
          <button 
            className={activeTab === 'visual-stories' ? 'active' : ''}
            onClick={() => handleTabChange('visual-stories')}
          >
            🖼️ Visual Stories
          </button>
          <button 
            className={activeTab === 'subscribers' ? 'active' : ''}
            onClick={() => handleTabChange('subscribers')}
          >
            📧 Subscribers
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => handleTabChange('contacts')}
          >
            💬 Contacts
          </button>
          <button 
            className={activeTab === 'grievances' ? 'active' : ''}
            onClick={() => handleTabChange('grievances')}
          >
            🎫 Grievances
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => handleTabChange('users')}
          >
            👥 Users
          </button>
          <button 
            className={activeTab === 'pages' ? 'active' : ''}
            onClick={() => handleTabChange('pages')}
          >
            📄 Pages
          </button>
          <button 
            className={activeTab === 'jobs' ? 'active' : ''}
            onClick={() => handleTabChange('jobs')}
          >
            💼 Jobs
          </button>
          <button 
            className={activeTab === 'press-releases' ? 'active' : ''}
            onClick={() => handleTabChange('press-releases')}
          >
            📰 Press
          </button>
          <button 
            className={activeTab === 'hero-slides' ? 'active' : ''}
            onClick={() => handleTabChange('hero-slides')}
          >
            🎭 Hero Slides
          </button>
          <button 
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => handleTabChange('categories')}
          >
            🏷️ Categories
          </button>
          <button 
            className={activeTab === 'menu-items' ? 'active' : ''}
            onClick={() => handleTabChange('menu-items')}
          >
            📑 Menu Items
          </button>
          <button 
            className={activeTab === 'testimonials' ? 'active' : ''}
            onClick={() => handleTabChange('testimonials')}
          >
            💬 Testimonials
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

          {activeTab === 'testimonials' && (
            <ContentManager
              type="testimonials"
              data={testimonials}
              onAdd={() => openModal('testimonials')}
              onEdit={(item) => openModal('testimonials', item)}
              onDelete={(id) => handleDelete('testimonials', id)}
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
      const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;
      
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
    <>
      {/* Stats Cards Grid */}
      <div className="dashboard-stats">
        <div className="stat-card blue">
          <h3>📝 Stories</h3>
          <div className="stat-number">{stats.stories.total}</div>
          <p>{stats.stories.published} Published • {stats.stories.total - stats.stories.published} Drafts</p>
        </div>

        <div className="stat-card green">
          <h3>🎥 Videos</h3>
          <div className="stat-number">{stats.videos.total}</div>
          <p>{stats.videos.published} Published • {stats.videos.total - stats.videos.published} Drafts</p>
        </div>

        <div className="stat-card purple">
          <h3>🖼️ Visual Stories</h3>
          <div className="stat-number">{stats.visualStories.total}</div>
          <p>Interactive visual content</p>
        </div>

        <div className="stat-card orange">
          <h3>📧 Subscribers</h3>
          <div className="stat-number">{stats.subscribers.total}</div>
          <p>{stats.subscribers.active} Active • {stats.subscribers.total - stats.subscribers.active} Inactive</p>
        </div>

        <div className="stat-card blue">
          <h3>💬 Contacts</h3>
          <div className="stat-number">{stats.contacts.total}</div>
          <p>{stats.contacts.pending} Pending • {stats.contacts.total - stats.contacts.pending} Resolved</p>
        </div>

        <div className="stat-card green">
          <h3>🎫 Grievances</h3>
          <div className="stat-number">{stats.grievances.total}</div>
          <p>{stats.grievances.pending} Pending • {stats.grievances.total - stats.grievances.pending} Resolved</p>
        </div>

        <div className="stat-card purple">
          <h3>👥 Users</h3>
          <div className="stat-number">{stats.users.total}</div>
          <p>Registered users</p>
        </div>

        <div className="stat-card orange">
          <h3>📊 Total Content</h3>
          <div className="stat-number">{stats.stories.total + stats.videos.total + stats.visualStories.total}</div>
          <p>Stories + Videos + Visual</p>
        </div>
      </div>

      {/* Content Overview Section */}
      <div className="content-section" style={{ marginTop: '30px' }}>
        <div className="section-header">
          <h2>📈 Content Overview</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: '0.9' }}>Stories</h3>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '700' }}>{stats.stories.total}</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
              {getPercentage(stats.stories.published, stats.stories.total)}% Published
            </p>
          </div>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)', borderRadius: '12px', color: 'white' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: '0.9' }}>Videos</h3>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '700' }}>{stats.videos.total}</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
              {getPercentage(stats.videos.published, stats.videos.total)}% Published
            </p>
          </div>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '12px', color: 'white' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: '0.9' }}>Visual</h3>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '700' }}>{stats.visualStories.total}</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: '0.9' }}>Interactive content</p>
          </div>
        </div>
      </div>

      {/* Engagement Status */}
      <div className="content-section" style={{ marginTop: '30px' }}>
        <div className="section-header">
          <h2>⚡ Engagement Status</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1f2937' }}>Active Subscribers</h3>
            <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>{stats.subscribers.active}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {getPercentage(stats.subscribers.active, stats.subscribers.total)}%
              </span>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1f2937' }}>Published Stories</h3>
            <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#56ccf2' }}>{stats.stories.published}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {getPercentage(stats.stories.published, stats.stories.total)}%
              </span>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1f2937' }}>Published Videos</h3>
            <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#f093fb' }}>{stats.videos.published}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {getPercentage(stats.videos.published, stats.videos.total)}%
              </span>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#1f2937' }}>Total Users</h3>
            <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#fa709a' }}>{stats.users.total}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="content-section" style={{ marginTop: '30px' }}>
        <div className="section-header">
          <h2>⚡ Quick Actions</h2>
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
          <button onClick={() => onTabChange('stories')} className="action-btn">
            📝 Manage Stories
          </button>
          <button onClick={() => onTabChange('videos')} className="action-btn">
            🎥 Manage Videos
          </button>
          <button onClick={() => onTabChange('visual-stories')} className="action-btn">
            🖼️ Visual Stories
          </button>
          <button onClick={() => onTabChange('subscribers')} className="action-btn">
            📧 Subscribers
          </button>
        </div>
      </div>

      {/* Recent Content Section */}
      <div className="content-section" style={{ marginTop: '30px' }}>
        <div className="section-header">
          <h2>📰 Recent Activity</h2>
        </div>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto 15px' }}></div>
            <p>Loading recent activity...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Recent Stories */}
            <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 Recent Stories
                <button onClick={() => onTabChange('stories')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '14px' }}>
                  View All →
                </button>
              </h3>
              {recentStories.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recentStories.slice(0, 3).map(story => (
                    <div key={story._id} style={{ padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>
                        {story.title.length > 40 ? story.title.substring(0, 40) + '...' : story.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        <span className={`status-badge ${story.published ? 'published' : 'pending'}`}>
                          {story.published ? '✓ Published' : '📝 Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', padding: '20px' }}>No stories found</p>
              )}
            </div>

            {/* Recent Videos */}
            <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎥 Recent Videos
                <button onClick={() => onTabChange('videos')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '14px' }}>
                  View All →
                </button>
              </h3>
              {recentVideos.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recentVideos.slice(0, 3).map(video => (
                    <div key={video._id} style={{ padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>
                        {video.title.length > 40 ? video.title.substring(0, 40) + '...' : video.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        <span className={`status-badge ${video.published ? 'published' : 'pending'}`}>
                          {video.published ? '✓ Published' : '📝 Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', padding: '20px' }}>No videos found</p>
              )}
            </div>

            {/* Recent Contacts */}
            <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💬 Recent Contacts
                <button onClick={() => onTabChange('contacts')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '14px' }}>
                  View All →
                </button>
              </h3>
              {recentContacts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recentContacts.slice(0, 3).map(contact => (
                    <div key={contact._id} style={{ padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>
                        {contact.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        <span className={`status-badge ${contact.status === 'pending' ? 'pending' : 'active'}`}>
                          {contact.status === 'pending' ? '⏳ Pending' : '✓ Resolved'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', padding: '20px' }}>No contacts yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Content Manager Component
const ContentManager = ({ type, data, onAdd, onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  const getColumns = () => {
    switch(type) {
      case 'pages':
        return { title: 'Title', col2: 'Template', col3: 'Slug', hasViews: false, hasImage: false };
      case 'jobs':
        return { title: 'Title', col2: 'Department', col3: 'Location', hasViews: true, hasImage: false };
      case 'press-releases':
        return { title: 'Title', col2: 'Category', col3: 'Date', hasViews: true, hasImage: false };
      case 'stories':
        return { title: 'Title', col2: 'Category', col3: 'Author', hasViews: true, hasImage: true };
      case 'videos':
        return { title: 'Title', col2: 'Category', col3: 'Type', hasViews: true, hasImage: true };
      case 'visual-stories':
        return { title: 'Title', col2: 'Category', col3: 'Author', hasViews: true, hasImage: true };
      case 'hero-slides':
        return { title: 'Title', col2: 'Category', col3: 'Order', hasViews: false, hasImage: true };
      case 'categories':
        return { title: 'Name', col2: 'Slug', col3: 'Order', hasViews: false, hasImage: false };
      case 'menu-items':
        return { title: 'Title', col2: 'Link', col3: 'Order', hasViews: false, hasImage: false };
      default:
        return { title: 'Title', col2: 'Category', col3: 'Author', hasViews: true, hasImage: false };
    }
  };

  const columns = getColumns();

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>📋 {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</h2>
        <button onClick={onAdd} className="add-btn">+ Add New</button>
      </div>
      {data && data.length > 0 ? (
        <>
          <table className="data-table">
            <thead>
              <tr>
                {columns.hasImage && <th>Image</th>}
                <th>{columns.title}</th>
                <th>{columns.col2}</th>
                <th>{columns.col3}</th>
                <th>Status</th>
                {columns.hasViews && <th>Views</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  {columns.hasImage && (
                    <td>
                      <img 
                        src={item.imageUrl || item.image || item.thumbnailUrl || item.coverImage || 'https://via.placeholder.com/60x40?text=No+Image'}
                        alt={item.title}
                        style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }}
                        onError={(e) => e.target.src = 'https://via.placeholder.com/60x40?text=No+Image'}
                      />
                    </td>
                  )}
                  <td style={{ fontWeight: '600', color: '#1f2937', maxWidth: '300px' }}>
                    {(item.title || item.name)?.length > 50 ? (item.title || item.name).substring(0, 50) + '...' : (item.title || item.name)}
                  </td>
                  <td>
                    {type === 'pages' ? item.template : 
                     type === 'jobs' ? item.department :
                     type === 'press-releases' ? item.category :
                     type === 'categories' ? item.slug :
                     type === 'menu-items' ? item.link :
                     item.category}
                  </td>
                  <td>
                    {type === 'pages' ? item.slug :
                     type === 'jobs' ? item.location :
                     type === 'press-releases' ? new Date(item.date).toLocaleDateString() :
                     type === 'categories' ? item.order :
                     type === 'menu-items' ? item.order :
                     item.author}
                  </td>
                  <td>
                    <span className={`status-badge ${item.published || item.isActive !== false ? 'published' : 'pending'}`}>
                      {item.published || item.isActive !== false ? '✓ Active' : '✕ Inactive'}
                    </span>
                  </td>
                  {columns.hasViews && <td style={{ fontWeight: '600', color: '#667eea' }}>{item.views || 0}</td>}
                  <td>
                    <div className="table-actions">
                      <button onClick={() => onEdit(item)} className="edit-btn">Edit</button>
                      <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  <div className="content-section">
    <div className="section-header">
      <h2>📧 Subscribers</h2>
      <div style={{ fontSize: '14px', color: '#6b7280', padding: '8px 16px', background: '#f3f4f6', borderRadius: '8px' }}>
        Total: {data.length}
      </div>
    </div>
    {data && data.length > 0 ? (
      <>
        <table className="data-table">
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
                <td style={{ fontWeight: '600', color: '#1f2937' }}>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <span className={`status-badge ${item.status === 'active' ? 'active' : 'inactive'}`}>
                    {item.status === 'active' ? '✓ Active' : '✕ Inactive'}
                  </span>
                </td>
                <td>{new Date(item.subscribedAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">📧</div>
        <h3>No subscribers yet</h3>
        <p>Subscribers will appear here when users sign up</p>
      </div>
    )}
  </div>
);

// Contacts Manager
const ContactsManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-section">
    <div className="section-header">
      <h2>💬 Contacts</h2>
      <div style={{ fontSize: '14px', color: '#6b7280', padding: '8px 16px', background: '#f3f4f6', borderRadius: '8px' }}>
        Total: {data.length}
      </div>
    </div>
    {data && data.length > 0 ? (
      <>
        <table className="data-table">
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
                <td style={{ fontWeight: '600', color: '#1f2937' }}>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.organization || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${item.status === 'pending' ? 'pending' : 'active'}`}>
                    {item.status === 'pending' ? '⏳ Pending' : '✓ Resolved'}
                  </span>
                </td>
                <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => onEdit(item)} className="view-btn">View</button>
                    <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">💬</div>
        <h3>No contacts yet</h3>
        <p>Contact messages will appear here</p>
      </div>
    )}
  </div>
);

// Grievances Manager
const GrievancesManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-section">
    <div className="section-header">
      <h2>🎫 Grievances</h2>
      <div style={{ fontSize: '14px', color: '#6b7280', padding: '8px 16px', background: '#f3f4f6', borderRadius: '8px' }}>
        Total: {data.length}
      </div>
    </div>
    {data && data.length > 0 ? (
      <>
        <table className="data-table">
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
                <td style={{ fontWeight: '600', color: '#667eea' }}>#{item.trackingNumber}</td>
                <td style={{ fontWeight: '600', color: '#1f2937' }}>{item.name}</td>
                <td>{item.grievanceType}</td>
                <td>
                  <span className={`status-badge ${item.status === 'submitted' ? 'pending' : item.status === 'under-review' ? 'inactive' : 'active'}`}>
                    {item.status === 'submitted' && '📨 New'}
                    {item.status === 'under-review' && '🔍 Review'}
                    {item.status === 'resolved' && '✓ Resolved'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${item.priority === 'high' ? 'inactive' : item.priority === 'medium' ? 'pending' : 'active'}`}>
                    {item.priority === 'high' && '🔴 High'}
                    {item.priority === 'medium' && '🟡 Medium'}
                    {item.priority === 'low' && '🟢 Low'}
                  </span>
                </td>
                <td>{new Date(item.submittedAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => onEdit(item)} className="view-btn">View</button>
                    <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">🎫</div>
        <h3>No grievances yet</h3>
        <p>Grievances will appear here when submitted</p>
      </div>
    )}
  </div>
);

// Users Manager
const UsersManager = ({ data, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="content-section">
    <div className="section-header">
      <h2>👥 Users</h2>
      <div style={{ fontSize: '14px', color: '#6b7280', padding: '8px 16px', background: '#f3f4f6', borderRadius: '8px' }}>
        Total: {data.length}
      </div>
    </div>
    {data && data.length > 0 ? (
      <>
        <table className="data-table">
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
                <td style={{ fontWeight: '600', color: '#1f2937' }}>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <span className={`status-badge ${item.role === 'admin' ? 'inactive' : 'active'}`}>
                    {item.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => onEdit(item)} className="edit-btn">Edit</button>
                    <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
    ) : (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3>No users yet</h3>
        <p>Users will appear here when they register</p>
      </div>
    )}
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button 
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="pagination-btn"
    >
      ← Previous
    </button>
    <span className="page-info">Page {currentPage} of {totalPages}</span>
    <button 
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="pagination-btn"
    >
      Next →
    </button>
  </div>
);

// Modal Component - Complete Form for All Content Types
const Modal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item || {
    title: '',
    name: '',
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
    template: 'default',
    slug: '',
    department: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    experience: '',
    applicationEmail: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    status: 'pending',
    priority: 'medium',
    role: 'user',
    // Category fields
    icon: '',
    color: '#667eea',
    order: 0,
    isActive: true,
    // Menu item fields
    link: '',
    parent: '',
    target: '_self',
    isMegaMenu: false,
    // Testimonial fields
    quote: '',
    position: '',
    company: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
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

    if (type === 'categories') {
      return (
        <>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              placeholder="Category name (e.g., Technology)"
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
              placeholder="category-slug (e.g., technology)"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Brief description of the category"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Icon (emoji or class)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon || ''}
              onChange={handleChange}
              placeholder="🏷️ or icon-class-name"
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input
              type="color"
              name="color"
              value={formData.color || '#667eea'}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input
              type="number"
              name="order"
              value={formData.order || 0}
              onChange={handleChange}
              placeholder="Display order (0, 1, 2, ...)"
            />
          </div>
          <div className="form-row checkbox-row">
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
              placeholder="Enter testimonial quote"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Author Name *</label>
            <input
              type="text"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              required
              placeholder="Author name"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
                required
                placeholder="Job position/title"
              />
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
          </div>
          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              required
              placeholder="https://example.com/author-photo.jpg"
            />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input
              type="number"
              name="order"
              value={formData.order || 0}
              onChange={handleChange}
              placeholder="Display order (0, 1, 2, ...)"
            />
          </div>
          <div className="form-row checkbox-row">
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

    if (type === 'menu-items') {
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
              placeholder="Menu item title"
            />
          </div>
          <div className="form-group">
            <label>Link/Path *</label>
            <input
              type="text"
              name="link"
              value={formData.link || ''}
              onChange={handleChange}
              required
              placeholder="/about or https://example.com"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Parent Menu</label>
              <input
                type="text"
                name="parent"
                value={formData.parent || ''}
                onChange={handleChange}
                placeholder="Leave empty for top-level menu"
              />
            </div>
            <div className="form-group">
              <label>Order</label>
              <input
                type="number"
                name="order"
                value={formData.order || 0}
                onChange={handleChange}
                placeholder="Display order (0, 1, 2, ...)"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Icon (emoji or class)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon || ''}
              onChange={handleChange}
              placeholder="📑 or icon-class-name"
            />
          </div>
          <div className="form-group">
            <label>Target</label>
            <select name="target" value={formData.target || '_self'} onChange={handleChange}>
              <option value="_self">Same Window</option>
              <option value="_blank">New Window</option>
            </select>
          </div>
          <div className="form-row checkbox-row">
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
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isMegaMenu"
                  checked={formData.isMegaMenu || false}
                  onChange={handleChange}
                />
                <span>Mega Menu</span>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (type === 'contacts') {
      return (
        <>
          <div className="view-form">
            <div className="form-group">
              <label>Name</label>
              <p className="view-text">{formData.name}</p>
            </div>
            <div className="form-group">
              <label>Email</label>
              <p className="view-text">{formData.email}</p>
            </div>
            {formData.organization && (
              <div className="form-group">
                <label>Organization</label>
                <p className="view-text">{formData.organization}</p>
              </div>
            )}
            {formData.subject && (
              <div className="form-group">
                <label>Subject</label>
                <p className="view-text">{formData.subject}</p>
              </div>
            )}
            <div className="form-group">
              <label>Message</label>
              <p className="view-text">{formData.message}</p>
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status || 'pending'} onChange={handleChange} required>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Admin Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Add internal notes..."
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Submitted At</label>
              <p className="view-text">{new Date(formData.submittedAt).toLocaleString()}</p>
            </div>
          </div>
        </>
      );
    }

    if (type === 'grievances') {
      return (
        <>
          <div className="view-form">
            <div className="form-group">
              <label>Tracking Number</label>
              <p className="view-text" style={{ fontWeight: '700', color: '#667eea' }}>#{formData.trackingNumber}</p>
            </div>
            <div className="form-group">
              <label>Name</label>
              <p className="view-text">{formData.name}</p>
            </div>
            <div className="form-group">
              <label>Email</label>
              <p className="view-text">{formData.email}</p>
            </div>
            {formData.phone && (
              <div className="form-group">
                <label>Phone</label>
                <p className="view-text">{formData.phone}</p>
              </div>
            )}
            <div className="form-group">
              <label>Grievance Type</label>
              <p className="view-text">{formData.grievanceType}</p>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <p className="view-text">{formData.subject}</p>
            </div>
            <div className="form-group">
              <label>Description</label>
              <p className="view-text">{formData.description}</p>
            </div>
            {formData.attachmentUrl && (
              <div className="form-group">
                <label>Attachment</label>
                <a href={formData.attachmentUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                  View Attachment
                </a>
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status || 'submitted'} onChange={handleChange} required>
                  <option value="submitted">Submitted</option>
                  <option value="under-review">Under Review</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority *</label>
                <select name="priority" value={formData.priority || 'medium'} onChange={handleChange} required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
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
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Admin Notes</label>
              <textarea
                name="adminNotes"
                value={formData.adminNotes || ''}
                onChange={handleChange}
                placeholder="Add internal notes..."
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Submitted At</label>
              <p className="view-text">{new Date(formData.submittedAt).toLocaleString()}</p>
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

export default AdminDashboard;

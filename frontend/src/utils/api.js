// API Client for TezTecch Buzz Frontend
// Centralized API calls with error handling

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Health Check
export async function checkHealth() {
  return apiCall('/health');
}

// Newsletter Subscription
export async function subscribeNewsletter(name, email) {
  return apiCall('/public/subscribe', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  });
}

// Contact Form
export async function submitContact(formData) {
  return apiCall('/public/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

// Grievance Submission
export async function submitGrievance(formData) {
  return apiCall('/public/grievance', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

// Get Subscribers (Admin)
export async function getSubscribers() {
  return apiCall('/subscribers');
}

// Authentication APIs
export async function register(userData) {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function login(credentials) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getProfile(token) {
  return apiCall('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Export API URL for direct access if needed
export { API_URL };

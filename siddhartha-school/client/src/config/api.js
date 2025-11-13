// API Configuration
// This file handles API endpoint configuration for both development and production

const getApiUrl = () => {
  // In production, use the environment variable or default to Render backend URL
  if (import.meta.env.PROD) {
    // Use VITE_API_URL if set, otherwise use the default Render backend URL
    // IMPORTANT: Update this URL to match your actual Render backend URL after deployment
    return import.meta.env.VITE_API_URL || 'https://siddhartha-school-backend.onrender.com';
  }
  // In development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiUrl();

// Helper function to make API calls
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response;
};

export default API_BASE_URL;


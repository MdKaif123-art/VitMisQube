// Base URLs for different environments
const BACKEND_URLS = {
  development: 'http://localhost:5000',
  production: 'https://qp-sphere-backend.onrender.com'  // Replace with your actual Render backend URL
};

// Check if we're running in development or production
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

// Export the API URL based on the environment
export const API_URL = isDevelopment ? BACKEND_URLS.development : BACKEND_URLS.production;

// Export other configuration values
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'QP-Sphere'; 
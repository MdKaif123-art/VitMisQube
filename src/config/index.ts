// Base URLs for different environments
const BACKEND_URLS = {
  development: 'http://localhost:5000',
  production: 'https://vitmisqube.onrender.com'  // Updated to match your deployed backend URL
};

// Check if we're running in development or production
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

// Export the API URL based on the environment
export const API_URL = isDevelopment ? BACKEND_URLS.development : BACKEND_URLS.production;

// Export other configuration values
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'VITMISQUBE';

// Validate configuration
if (!process.env.REACT_APP_GA_MEASUREMENT_ID) {
  console.warn('Google Analytics Measurement ID is not configured');
}

if (!process.env.REACT_APP_DRIVE_API_KEY) {
  console.warn('Google Drive API key is not configured');
}

if (!process.env.REACT_APP_DRIVE_FOLDER_ID) {
  console.warn('Google Drive folder ID is not configured');
} 
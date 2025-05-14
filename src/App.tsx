import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PaperView from './pages/PaperView';
import Footer from './components/Footer';
import Upload from './pages/Upload';
import ErrorBoundary from './components/ErrorBoundary';
import { initializeGA, trackPageView, trackError } from './utils/analytics';

// Analytics wrapper component
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      trackPageView(location.pathname);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }, [location]);

  return null;
};

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  useEffect(() => {
    trackError('app_error', error.message, 'App.tsx');
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#232136]/40 backdrop-blur-sm p-8 rounded-xl border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <h2 className="text-[#00FFFF] text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-white mb-6">
          {error.message || 'The application encountered an unexpected error. Please try refreshing the page.'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#008080]/80 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF]/10 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    try {
      initializeGA();
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen w-full bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 flex flex-col">
          <AnalyticsWrapper />
          <Navbar />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/paper/:id" element={<PaperView />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

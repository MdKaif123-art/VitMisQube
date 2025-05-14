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
import { initializeGA, trackPageView } from './utils/analytics';

// Analytics wrapper component
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <ErrorBoundary>
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

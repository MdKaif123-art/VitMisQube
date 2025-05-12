import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/vitmisqube-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative z-50">
      <nav
        className="bg-black px-4 md:px-6 py-2 md:py-4 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="VitMisQube Logo" 
            className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
            style={{ background: 'transparent' }} 
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#00FFFF] hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-base font-medium">
          <Link to="/" className="text-[#00FFFF] hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-[#00FFFF] hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-[#00FFFF] hover:text-white transition-colors">Contact</Link>
          <Link to="/upload" className="text-[#00FFFF] hover:text-white transition-colors">Upload Papers</Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed md:hidden inset-0 bg-black transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
        }`}
        style={{ 
          top: '64px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.98), rgba(0, 0, 0, 1))'
        }}
      >
        <div className="flex flex-col space-y-6 p-6 border-t border-[#00FFFF]/20 bg-black">
          <Link 
            to="/" 
            className="text-[#00FFFF] hover:text-white transition-colors text-xl font-semibold relative z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-[#00FFFF] hover:text-white transition-colors text-xl font-semibold relative z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-[#00FFFF] hover:text-white transition-colors text-xl font-semibold relative z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/upload" 
            className="text-[#00FFFF] hover:text-white transition-colors text-xl font-semibold relative z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            Upload Papers
          </Link>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[1px] bg-[#00FFFF]/80"
        style={{
          boxShadow: '0 0 8px 0.5px rgba(0, 255, 255, 0.8)'
        }}
      />
    </div>
  );
};

export default Navbar;
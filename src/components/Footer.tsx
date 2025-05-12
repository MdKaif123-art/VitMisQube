import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/vitmisqube-logo.png';

const Footer = () => (
  <footer className="footer bg-black">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 pb-4">
      {/* Logo and description */}
      <div className="flex-1 min-w-[180px]">
        <div className="flex items-center gap-2 mb-2 group">
          <img 
            src={logo} 
            alt="VitMisQube Logo" 
            className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
            style={{ background: 'transparent' }} 
          />
        </div>
        <p className="text-sm text-white opacity-80">Your comprehensive resource for academic papers, exams, and study materials.</p>
      </div>
      {/* Quick Links */}
      <div className="flex-1 min-w-[120px]">
        <div className="font-bold mb-2 text-[#00FFFF]">Quick Links</div>
        <ul className="space-y-1 text-sm">
          <li><Link to="/" className="text-white hover:text-[#00FFFF] transition-colors">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-[#00FFFF] transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="text-white hover:text-[#00FFFF] transition-colors">Contact</Link></li>
          <li><Link to="/upload" className="text-white hover:text-[#00FFFF] transition-colors">Upload Papers</Link></li>
        </ul>
      </div>
      {/* Resources */}
      <div className="flex-1 min-w-[120px]">
        <div className="font-bold mb-2 text-[#00FFFF]">Resources</div>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="text-white hover:text-[#00FFFF] transition-colors">FAQs</a></li>
          <li><a href="#" className="text-white hover:text-[#00FFFF] transition-colors">Upload Guidelines</a></li>
          <li><a href="#" className="text-white hover:text-[#00FFFF] transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
      {/* Contact Us */}
      <div className="flex-1 min-w-[180px]">
        <div className="font-bold mb-2 text-[#00FFFF]">Contact Us</div>
        <ul className="space-y-1 text-sm text-white">
          <li className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4 text-[#00FFFF]" />
            <span className="hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.3)] transition-all cursor-pointer">
              mdkaif196905@gmail.com
            </span>
          </li>
        </ul>
      </div>
    </div>
    <hr className="border-[#008080] opacity-30 my-2" />
    <div className="max-w-7xl mx-auto text-xs text-white opacity-80 flex justify-between items-center pb-2 px-2">
      <span>&copy; 2025 VitMisQube. All rights reserved.</span>
      <span className="opacity-40">{String.fromCharCode(0x1F916)}</span>
    </div>
  </footer>
);

export default Footer;
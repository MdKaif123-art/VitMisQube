import { Link } from 'react-router-dom';
import logo from '../assets/vitmisqube-logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="VitMisQube Logo" className="h-16 w-auto object-contain" style={{ background: 'transparent' }} />
        </Link>
        <div className="flex space-x-6 text-base font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
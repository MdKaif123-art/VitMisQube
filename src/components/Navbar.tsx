import { Link } from 'react-router-dom';
import logo from '../assets/vitmisqube-logo.png';

const Navbar = () => {
  return (
    <div className="relative">
      <nav
        className="bg-black px-6 py-4 flex items-center justify-between rounded-b-2xl z-10"
        style={{
          boxShadow: '0 8px 32px 0 #00FFFF'
        }}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="VitMisQube Logo" className="h-12 w-auto object-contain" style={{ background: 'transparent' }} />
          <span className="text-2xl font-extrabold text-[#00FFFF] tracking-tight"></span>
        </Link>
        <div className="flex space-x-6 text-base font-medium">
          <Link to="/" className="text-[#00FFFF] hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-[#00FFFF] hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-[#00FFFF] hover:text-white transition-colors">Contact</Link>
          <Link to="/upload" className="text-[#00FFFF] hover:text-white transition-colors">Upload Papers</Link>
        </div>
      </nav>
      {/* Glow bar */}
      <div
        className="absolute left-0 right-0 mx-auto"
        style={{
          height: '18px',
          top: '100%',
          borderRadius: '0 0 24px 24px',
          background: 'radial-gradient(ellipse at center, #00FFFF 0%, transparent 80%)',
          filter: 'blur(6px)',
          opacity: 0.7,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default Navbar;
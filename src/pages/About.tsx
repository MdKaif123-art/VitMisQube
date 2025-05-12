import { AcademicCapIcon, FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import createrImg from '../assets/creater.jpg';

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Smart Search',
    desc: 'Quickly find papers by course name or code with our intuitive search functionality.',
  },
  {
    icon: FunnelIcon,
    title: 'Advanced Filtering',
    desc: 'Filter papers by exam type (CAT-1, CAT-2, FAT) to find exactly what you need.',
  },
  {
    icon: ArrowPathIcon,
    title: 'Regular Updates',
    desc: 'Our database is regularly updated with new papers to ensure you always have access to the latest content.',
  },
];

const About = () => (
  <div className="max-w-6xl mx-auto px-2 md:px-6">
    <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-[#00FFFF]">About VitMisQube</h1>
    <p className="text-center text-lg text-white mb-8 max-w-2xl mx-auto">
      Your comprehensive resource for academic papers, helping students prepare for exams with access to past papers.
    </p>

    {/* Mission */}
    <div className="bg-black rounded-xl shadow p-6 mb-10 border border-[#00FFFF]">
      <h2 className="text-2xl font-bold text-[#00FFFF] mb-2">Our Mission</h2>
      <p className="text-white">
        VitMisQube was created with a simple mission: to provide students with easy access to past exam papers, helping them better prepare for their upcoming examinations. We understand the stress and pressure that comes with academic assessments, and we believe that having access to quality study materials can make a significant difference.<br /><br />
        Our platform serves as a centralized repository of past papers across various courses and programs. By organizing these papers and making them easily searchable, we aim to save students valuable time and help them focus on what truly matters - understanding the concepts and preparing effectively.
      </p>
    </div>

    {/* Features */}
    <h2 className="text-2xl font-bold text-center text-[#00FFFF] mb-6">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {features.map((f) => (
        <div key={f.title} className="bg-black rounded-xl shadow border border-[#00FFFF] p-6 flex flex-col items-center text-center hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
          <span className="bg-[#008080]/20 rounded-full p-4 mb-3">
            <f.icon className="w-8 h-8 text-[#00FFFF]" />
          </span>
          <div className="font-bold text-[#00FFFF] mb-1">{f.title}</div>
          <div className="text-white text-sm">{f.desc}</div>
        </div>
      ))}    
    </div>

    {/* Developer */}
    <div className="bg-black rounded-xl shadow p-4 sm:p-8 mb-10 border border-[#00FFFF]">
      <h2 className="text-2xl font-bold text-center text-[#00FFFF] mb-2">About the Developer</h2>
      <p className="text-center text-white mb-6 max-w-2xl mx-auto px-2">
        VitMisQube is an individual initiative developed with dedication and care to support fellow students in their academic journey.
      </p>
      <div className="flex flex-col items-center">
        <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-4 sm:p-8 flex flex-col items-center text-center hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all w-full max-w-xl">
          <img 
            src={createrImg} 
            alt="Mohammed Kaif K" 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mb-4 border-4 border-[#008080] shadow-[0_0_15px_rgba(0,255,255,0.2)]" 
          />
          <div className="font-bold text-[#00FFFF] text-xl sm:text-2xl mb-2">Mohammed Kaif K</div>
          <div className="text-[#00BFFF] text-md sm:text-lg mb-3">Founder & Developer</div>
          <div className="text-white text-sm sm:text-base mb-6 leading-relaxed max-w-md mx-auto">
            As a Software Engineering student at VIT, I understand the challenges students face during exam preparation. 
            VitMisQube was born from my desire to create a centralized, user-friendly platform that makes accessing study 
            materials easier for everyone. My goal is to continuously improve this platform based on student feedback and needs.
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="http://github.com/MdKaif123-art/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-white hover:text-[#00FFFF] bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-[#008080]/30 transition-all duration-300 hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 text-sm sm:text-base">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/k-mohammed-kaif-62510728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-white hover:text-[#00FFFF] bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-[#008080]/30 transition-all duration-300 hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 text-sm sm:text-base">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-white hover:text-[#00FFFF] bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-[#008080]/30 transition-all duration-300 hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 text-sm sm:text-base">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-black rounded-xl shadow p-8 mb-10 text-center border border-[#00FFFF]">
      <h2 className="text-2xl font-bold mb-2 text-[#00FFFF]">Ready to Ace Your Exams?</h2>
      <p className="mb-6 text-white">Start using VitMisQube today and gain access to a comprehensive collection of past papers to help you prepare effectively.</p>
      <a href="/" className="inline-block bg-[#008080] text-[#00FFFF] font-bold px-6 py-3 rounded-full shadow hover:bg-[#008080]/80 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">Search Papers Now</a>
    </div>
  </div>
);

export default About;
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

const team = [
  {
    name: 'Arun Rajput',
    role: 'Founder & Developer',
    bio: 'Computer Science student with a passion for creating tools that help fellow students.',
    img: createrImg,
  },
  {
    name: 'Dr. Sameer Kumar',
    role: 'Faculty Advisor',
    bio: 'Associate Professor helping to curate content and ensure academic integrity.',
    img: createrImg,
  },
  {
    name: 'Priya Gupta',
    role: 'Content Manager',
    bio: 'Ensuring papers are properly categorized and maintaining the database.',
    img: createrImg,
  },
];

const About = () => (
  <div className="max-w-6xl mx-auto px-2 md:px-6">
    <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-blue-900">About VitMisQube</h1>
    <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      Your comprehensive resource for academic papers, helping students prepare for exams with access to past papers.
    </p>

    {/* Mission */}
    <div className="bg-white rounded-xl shadow p-6 mb-10 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Our Mission</h2>
      <p className="text-gray-700">
        VitMisQube was created with a simple mission: to provide students with easy access to past exam papers, helping them better prepare for their upcoming examinations. We understand the stress and pressure that comes with academic assessments, and we believe that having access to quality study materials can make a significant difference.<br /><br />
        Our platform serves as a centralized repository of past papers across various courses and programs. By organizing these papers and making them easily searchable, we aim to save students valuable time and help them focus on what truly matters - understanding the concepts and preparing effectively.
      </p>
    </div>

    {/* Features */}
    <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {features.map((f) => (
        <div key={f.title} className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center text-center">
          <span className="bg-blue-50 rounded-full p-4 mb-3">
            <f.icon className="w-8 h-8 text-blue-400" />
          </span>
          <div className="font-bold text-blue-900 mb-1">{f.title}</div>
          <div className="text-gray-600 text-sm">{f.desc}</div>
        </div>
      ))}
    </div>

    {/* Team */}
    <div className="bg-blue-50 rounded-xl shadow p-8 mb-10 border border-blue-100">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Our Team</h2>
      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        VitMisQube is managed by a dedicated team of students and faculty members who understand the importance of having access to quality study materials.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.name} className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col items-center text-center">
            <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-blue-100 shadow" />
            <div className="font-bold text-blue-900 mb-1">{member.name}</div>
            <div className="text-blue-600 text-sm mb-1">{member.role}</div>
            <div className="text-gray-600 text-xs">{member.bio}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-blue-900 rounded-xl shadow p-8 mb-10 text-center text-white">
      <h2 className="text-2xl font-bold mb-2">Ready to Ace Your Exams?</h2>
      <p className="mb-6">Start using VitMisQube today and gain access to a comprehensive collection of past papers to help you prepare effectively.</p>
      <a href="/" className="inline-block bg-white text-blue-900 font-bold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition">Search Papers Now</a>
    </div>
  </div>
);

export default About; 
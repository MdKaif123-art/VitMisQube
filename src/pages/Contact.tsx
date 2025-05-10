import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    q: 'How do I search for papers?',
    a: 'You can search for papers by entering the course name or course code in the search bar on the home page.',
  },
  {
    q: 'Are all exams available on VitMisQube?',
    a: 'We strive to provide papers for all courses, but availability may vary. The database is regularly updated with new papers.',
  },
  {
    q: 'Can I contribute papers to the platform?',
    a: "Yes! We welcome contributions. Please contact us with the papers you'd like to share, and our team will review them.",
  },
  {
    q: 'I found an error in a paper. How do I report it?',
    a: 'Please use the contact form above to report any errors or issues with specific papers.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    alert('Message sent!');
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-blue-900">Contact Us</h1>
      <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Get in touch with our team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left: Contact Info */}
        <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-4 min-w-[260px]">
          <div className="font-bold text-lg text-blue-900 mb-2">Get in Touch</div>
          <div className="flex items-center gap-3 text-blue-900 font-semibold mb-1">
            <EnvelopeIcon className="w-6 h-6 text-blue-400" />
            Email
          </div>
          <div className="ml-9 text-gray-700 mb-2">contact@vitmisqube.edu</div>
          <div className="flex items-center gap-3 text-blue-900 font-semibold mb-1">
            <PhoneIcon className="w-6 h-6 text-blue-400" />
            Phone
          </div>
          <div className="ml-9 text-gray-700 mb-2">+91 123 456 7890</div>
          <div className="flex items-center gap-3 text-blue-900 font-semibold mb-1">
            <MapPinIcon className="w-6 h-6 text-blue-400" />
            Address
          </div>
          <div className="ml-9 text-gray-700 mb-4">
            VIT University Campus,<br />Vellore, Tamil Nadu,<br />India - 632014
          </div>
          <hr className="my-2 border-blue-100" />
          <div className="font-bold text-blue-900 mb-1">Operating Hours</div>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <div className="flex justify-between w-full"><span>Monday - Friday:</span> <span>9:00 AM - 5:00 PM</span></div>
            <div className="flex justify-between w-full"><span>Saturday:</span> <span>10:00 AM - 2:00 PM</span></div>
            <div className="flex justify-between w-full"><span>Sunday:</span> <span>Closed</span></div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-4">
          <div className="font-bold text-lg text-blue-900 mb-2">Send us a Message</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Mohammed Kaif K"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="mdkaif@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Paper Submission">Paper Submission</option>
              <option value="Report an Issue">Report an Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-field"
              rows={4}
              placeholder="How can we help you?"
              required
            />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2 w-max px-6">
            <PaperAirplaneIcon className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>
      {/* FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div></div>
        <div className="bg-white rounded-xl shadow border border-blue-100 p-6">
          <div className="font-bold text-blue-900 mb-4 text-lg">Frequently Asked Questions</div>
          {faqs.map((faq) => (
            <div key={faq.q} className="mb-4">
              <div className="font-bold text-md text-blue-900 mb-1">{faq.q}</div>
              <div className="text-gray-700 text-sm">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact; 
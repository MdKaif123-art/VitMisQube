import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { API_URL } from '../config';

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

const CONTACT_ENDPOINT = 'http://localhost:5000/send'; // Update if needed

const Contact = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const isFormValid = Object.values(form).every((v) => v.trim() !== '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Please fill in all fields.');
      return;
    }
    setStatus('processing');
    setError(null);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({
          fullName: '',
          email: '',
          mobileNumber: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setStatus('error');
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-[#00FFFF]">Contact Us</h1>
      <p className="text-center text-lg text-white mb-8 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Get in touch with our team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left: Contact Info */}
        <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-6 flex flex-col gap-4 min-w-[260px]">
          <div className="font-bold text-lg text-[#00FFFF] mb-2">Get in Touch</div>
          <div className="flex items-center gap-3 text-[#00FFFF] font-semibold mb-1">
            <EnvelopeIcon className="w-6 h-6 text-[#00BFFF]" />
            Email
          </div>
          <div className="ml-9 text-white mb-2">contact@vitmisqube.edu</div>
          <div className="flex items-center gap-3 text-[#00FFFF] font-semibold mb-1">
            <PhoneIcon className="w-6 h-6 text-[#00BFFF]" />
            Phone
          </div>
          <div className="ml-9 text-white mb-2">+91 123 456 7890</div>
          <div className="flex items-center gap-3 text-[#00FFFF] font-semibold mb-1">
            <MapPinIcon className="w-6 h-6 text-[#00BFFF]" />
            Address
          </div>
          <div className="ml-9 text-white mb-4">
            VIT University Campus,<br />Vellore, Tamil Nadu,<br />India - 632014
          </div>
          <hr className="my-2 border-[#008080]" />
          <div className="font-bold text-[#00FFFF] mb-1">Operating Hours</div>
          <div className="flex flex-col gap-1 text-sm text-white">
            <div className="flex justify-between w-full"><span>Monday - Friday:</span> <span>9:00 AM - 5:00 PM</span></div>
            <div className="flex justify-between w-full"><span>Saturday:</span> <span>10:00 AM - 2:00 PM</span></div>
            <div className="flex justify-between w-full"><span>Sunday:</span> <span>Closed</span></div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="bg-black rounded-xl shadow border border-[#00FFFF] p-6 flex flex-col gap-4">
          <div className="font-bold text-lg text-[#00FFFF] mb-2">Send us a Message</div>
          {status === 'success' && (
            <div className="bg-[#008080]/20 text-[#00FFFF] p-3 rounded-lg mb-4">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === 'error' && error && (
            <div className="bg-red-900/20 text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#00FFFF]">Your Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="bg-black border border-[#008080] text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                placeholder="Mohammed Kaif K"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#00FFFF]">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="bg-black border border-[#008080] text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                placeholder="mdkaif@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#00FFFF]">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              className="bg-black border border-[#008080] text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
              placeholder="+91 1234567890"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#00FFFF]">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="bg-black border border-[#008080] text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
              required
            >
              <option value="" className="bg-black">Select a subject</option>
              <option value="General Inquiry" className="bg-black">General Inquiry</option>
              <option value="Paper Submission" className="bg-black">Paper Submission</option>
              <option value="Report an Issue" className="bg-black">Report an Issue</option>
              <option value="Other" className="bg-black">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#00FFFF]">Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-black border border-[#008080] text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
              rows={4}
              placeholder="How can we help you?"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || status === 'processing'}
            className="bg-[#008080] text-[#00FFFF] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#008080]/80 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all flex items-center gap-2 w-max disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
            {status === 'processing' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      {/* FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div></div>
        <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-6">
          <div className="font-bold text-[#00FFFF] mb-4 text-lg">Frequently Asked Questions</div>
          {faqs.map((faq) => (
            <div key={faq.q} className="mb-4">
              <div className="font-bold text-md text-[#00BFFF] mb-1">{faq.q}</div>
              <div className="text-white text-sm">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
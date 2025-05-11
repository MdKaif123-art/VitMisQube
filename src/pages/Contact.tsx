import { useState } from 'react';
import { EnvelopeIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

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
    <div className="max-w-7xl mx-auto px-2 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-[#00FFFF]">Contact Us</h1>
      <p className="text-center text-lg text-white mb-8 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Get in touch with our team.
      </p>
      
      {/* Container to ensure equal widths */}
      <div className="max-w-[1200px] mx-auto">
        {/* Contact Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* Left: Contact Info */}
          <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-8 flex flex-col gap-4">
            <div className="font-bold text-lg text-[#00FFFF] mb-2">Get in Touch</div>
            <div className="flex items-center gap-3 text-[#00FFFF] font-semibold mb-1">
              <EnvelopeIcon className="w-6 h-6 text-[#00BFFF]" />
              Email
            </div>
            <div className="ml-9 text-white mb-2 hover:text-[#00BFFF] hover:shadow-[0_0_10px_rgba(0,191,255,0.3)] transition-all cursor-pointer">
              mdkaif196905@gmail.com
            </div>
            <div className="ml-9 text-white mb-2"></div>
            <div className="flex items-center gap-3 text-[#00FFFF] font-semibold mb-1">
              <svg className="w-6 h-6 text-[#00BFFF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </div>
            <a href="https://www.linkedin.com/in/k-mohammed-kaif-62510728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="ml-9 text-white mb-2 hover:text-[#00BFFF] transition-colors">
              Mohammed Kaif K
            </a>
            <hr className="my-2 border-[#008080]" />
            <div className="font-bold text-[#00FFFF] mb-1">Paper Verification Process</div>
            <div className="flex flex-col gap-2 text-sm text-white">
              <div className="flex items-start gap-2">
                <span className="text-[#00BFFF] mt-1">•</span>
                <span>Papers are typically verified within 24-48 hours</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#00BFFF] mt-1">•</span>
                <span>We check for correct formatting, readability, and content accuracy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#00BFFF] mt-1">•</span>
                <span>You'll receive a notification once your paper is approved</span>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-8 flex flex-col gap-4">
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
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <div className="bg-black rounded-xl shadow border border-[#00FFFF] p-10 w-full">
            <div className="font-bold text-lg text-[#00FFFF] mb-4">Frequently Asked Questions</div>
            {faqs.map((faq) => (
              <div key={faq.q} className="mb-4">
                <div className="font-bold text-md text-[#00BFFF] mb-1">{faq.q}</div>
                <div className="text-white text-sm">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
import { useState } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { API_URL } from '../config/index';

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

const CONTACT_ENDPOINT = `${API_URL}/send`;  // Use API_URL from config

const Contact = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s]*$/.test(form.fullName)) {
      newErrors.fullName = 'Name should only contain letters and spaces';
    }
    
    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile number validation
    if (!form.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d+$/.test(form.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number should only contain digits';
    } else if (form.mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }
    
    // Subject validation
    if (!form.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 2) {
      newErrors.message = 'Message must be at least 2 characters long';
    } else if (form.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for mobile number
    if (name === 'mobileNumber') {
      // Only allow digits and limit to 10 characters
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setForm(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('processing');

    try {
      console.log('Sending form data:', form);
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        // If response is not JSON, check if it was successful anyway
        if (res.ok) {
          data = { success: true, message: 'Message sent successfully!' };
        } else {
          throw err;
        }
      }

      console.log('Server response:', { status: res.status, data });
      
      // Consider the request successful if either the response is OK or data indicates success
      if (res.ok || data.success) {
        console.log('Form submitted successfully');
        setStatus('success');
        setForm({
          fullName: '',
          email: '',
          mobileNumber: '',
          subject: '',
          message: '',
        });
        setErrors({});
        
        // Show success message for 5 seconds
        setTimeout(() => {
          if (status === 'success') {
            setStatus('idle');
          }
        }, 5000);
      } else {
        console.log('Form submission failed:', data);
        setStatus('error');
        if (data.errors) {
          const serverErrors = data.errors.reduce((acc: {[key: string]: string}, error: string) => {
            if (error.toLowerCase().includes('name')) acc.fullName = error;
            else if (error.toLowerCase().includes('email')) acc.email = error;
            else if (error.toLowerCase().includes('mobile')) acc.mobileNumber = error;
            else if (error.toLowerCase().includes('subject')) acc.subject = error;
            else if (error.toLowerCase().includes('message')) acc.message = error;
            else acc.general = error;
            return acc;
          }, {});
          setErrors(serverErrors);
        } else {
          setErrors({ general: data.message || 'Failed to send message' });
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrors({ general: 'Failed to send message. Please check your connection and try again.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-8 mb-2 tracking-tight text-[#00FFFF]">Contact Us</h1>
      <p className="text-center text-lg text-white mb-8 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you. Get in touch with our team.
      </p>
      
      <div className="max-w-[1200px] mx-auto">
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
          <form onSubmit={handleSubmit} className="bg-black rounded-xl shadow border border-[#00FFFF] p-8 flex flex-col gap-4">
            <div className="font-bold text-lg text-[#00FFFF] mb-2">Send us a Message</div>
            
            {status === 'success' && (
              <div className="bg-[#008080]/20 text-[#00FFFF] p-3 rounded-lg mb-4 flex items-center animate-fadeIn">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {status === 'error' && errors.general && (
              <div className="bg-red-900/20 text-red-400 p-3 rounded-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-1 text-[#00FFFF]">
                  Your Name
                  {errors.fullName && <span className="text-red-400 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`bg-black border ${errors.fullName ? 'border-red-500' : 'border-[#008080]'} text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all`}
                  placeholder="Mohammed Kaif K"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1 text-[#00FFFF]">
                  Your Email
                  {errors.email && <span className="text-red-400 ml-1">*</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`bg-black border ${errors.email ? 'border-red-500' : 'border-[#008080]'} text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all`}
                  placeholder="mdkaif@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-semibold mb-1 text-[#00FFFF]">
                Mobile Number
                {errors.mobileNumber && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                className={`bg-black border ${errors.mobileNumber ? 'border-red-500' : 'border-[#008080]'} text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all`}
                placeholder="+91 1234567890"
              />
              {errors.mobileNumber && (
                <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-1 text-[#00FFFF]">
                Subject
                {errors.subject && <span className="text-red-400 ml-1">*</span>}
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`bg-black border ${errors.subject ? 'border-red-500' : 'border-[#008080]'} text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all`}
              >
                <option value="" className="bg-black">Select a subject</option>
                <option value="General Inquiry" className="bg-black">General Inquiry</option>
                <option value="Paper Submission" className="bg-black">Paper Submission</option>
                <option value="Report an Issue" className="bg-black">Report an Issue</option>
                <option value="Other" className="bg-black">Other</option>
              </select>
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1 text-[#00FFFF]">
                Your Message
                {errors.message && <span className="text-red-400 ml-1">*</span>}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`bg-black border ${errors.message ? 'border-red-500' : 'border-[#008080]'} text-white rounded-lg p-2 w-full focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all`}
                rows={4}
                placeholder="How can we help you?"
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'processing'}
              className="bg-[#008080] text-[#00FFFF] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#008080]/80 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all flex items-center gap-2 w-max disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              {status === 'processing' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
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
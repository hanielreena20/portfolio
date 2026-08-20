import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, Linkedin, Github, Copy, Check, Send, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI/ML Internship & Research Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fills a mailto link so user can send easily
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
            Open to AI/ML engineering internships, graduate research collaborations, academic inquiries, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Channels & Verification */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Copy Button */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Primary Email</span>
                    <span className="text-xs font-bold text-slate-900">Direct Contact</span>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-md transition-colors cursor-pointer shadow-2xs"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-600 font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span className="font-mono">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="block text-sm sm:text-base font-mono font-semibold text-blue-600 hover:underline break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">Phone & Mobile</span>
                  <span className="text-xs font-bold text-slate-900">Direct Call</span>
                </div>
              </div>

              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="block text-sm sm:text-base font-mono font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>

            {/* LinkedIn Card */}
            <a
              id="contact-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Professional Network</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      LinkedIn Profile
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono truncate">
                {PERSONAL_INFO.linkedin}
              </p>
            </a>

            {/* GitHub Card */}
            <a
              id="contact-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">Open Source & Code</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      GitHub Repositories
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono truncate">
                {PERSONAL_INFO.github}
              </p>
            </a>

          </div>

          {/* Right Column: Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Send a Message or Collaboration Request
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Feel free to reach out regarding research lab openings, Summer 2025/2026 internships, or technical inquiries.
              </p>

              {submitted ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center text-blue-900">
                  <Check className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-bold text-base text-slate-900">Opening Email Client...</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Thank you! Your message prompt was routed to your default email application.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-blue-600 underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-mono text-slate-700 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Doe / Recruiter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:border-blue-600 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold font-mono text-slate-700 uppercase mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@university.edu / company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:border-blue-600 focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-700 uppercase mb-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:border-blue-600 focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-700 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Discussing a research project, internship opening, or technical question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via Email</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </FadeInSection>
    </section>
  );
};

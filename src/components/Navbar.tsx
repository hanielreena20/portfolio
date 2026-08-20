import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Github, Linkedin, FileText, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Name & Tag */}
        <button
          id="nav-brand-logo"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-serif font-bold text-xs tracking-tight group-hover:bg-blue-600 transition-all duration-200 shadow-2xs">
            HR
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
              AI/ML • Computer Vision • Research
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 border border-blue-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Links */}
        <div className="hidden md:flex items-center gap-2">
          {/* Download Resume Button in Navbar */}
          <a
            id="nav-download-resume-btn"
            href={PERSONAL_INFO.resumeUrl}
            download="Haniel_Reena_DR_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors cursor-pointer"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Resume</span>
          </a>

          <a
            id="nav-github-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            id="nav-linkedin-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            id="nav-contact-cta"
            onClick={() => handleLinkClick('contact')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-xs cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-1.5">
          <a
            id="nav-mobile-resume-btn"
            href={PERSONAL_INFO.resumeUrl}
            download="Haniel_Reena_DR_Resume.pdf"
            className="p-2 text-slate-700 bg-slate-100 rounded-lg text-xs font-mono flex items-center gap-1 border border-slate-200"
            title="Download Resume"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
          </a>
          <button
            id="nav-contact-mobile-quick"
            onClick={() => handleLinkClick('contact')}
            className="px-2.5 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg"
          >
            Connect
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-bold border border-blue-100'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
            <a
              id="mobile-drawer-download-resume-btn"
              href={PERSONAL_INFO.resumeUrl}
              download="Haniel_Reena_DR_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs font-mono shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Resume PDF</span>
            </a>

            <div className="flex items-center justify-around pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium py-1.5 px-3 rounded-md hover:bg-slate-100"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium py-1.5 px-3 rounded-md hover:bg-slate-100"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium py-1.5 px-3 rounded-md hover:bg-slate-100"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[#F8FAFC] text-slate-600 py-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          
          {/* Left Brand info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                HR
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              AI / ML • Computer Vision • Medical Imaging • Research
            </p>
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Haniel_Reena_DR_Resume.pdf"
              className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-bold"
            >
              <span>Resume (PDF)</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Email</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-blue-600" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={onScrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-xs font-mono text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-3 text-center sm:text-left">
          <div>
            © {currentYear} {PERSONAL_INFO.name}. All research and project data derived from official academic curriculum & publications.
          </div>
          <div>
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};

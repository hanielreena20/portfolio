import React, { useState, useEffect } from 'react';
import { ArrowUp, Download, Mail, Check, Copy, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingActionsProps {
  onScrollToTop: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onScrollToTop }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down more than 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div
      id="floating-actions-bar"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 transition-all duration-300 animate-fadeIn"
      aria-label="Floating quick actions"
    >
      {/* Quick Copy Email Notification pill if active */}
      {copied && (
        <div className="bg-slate-900 text-white text-xs font-mono px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 flex items-center gap-1.5 mb-1 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Email copied!</span>
        </div>
      )}

      {/* Floating Action Cluster */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-lg">
        {/* Download Resume Button */}
        <a
          id="floating-download-resume-btn"
          href={PERSONAL_INFO.resumeUrl}
          download="Haniel_Reena_DR_Resume.pdf"
          aria-label="Download Official Resume PDF"
          title="Download Resume PDF"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline font-mono">Resume PDF</span>
        </a>

        {/* Copy Email Button */}
        <button
          id="floating-copy-email-btn"
          onClick={handleCopyEmail}
          aria-label="Copy Haniel's Email Address"
          title="Copy Email Address"
          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4" />}
        </button>

        {/* Scroll Back to Top Button */}
        <button
          id="floating-back-to-top-btn"
          onClick={onScrollToTop}
          aria-label="Scroll to top of page"
          title="Back to Top"
          className="p-2 text-white bg-slate-900 hover:bg-blue-600 rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

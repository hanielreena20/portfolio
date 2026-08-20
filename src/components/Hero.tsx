import React, { useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, BookOpen, Sparkles, Award, Download, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA } from '../data/portfolioData';
import { ProfilePhoto } from './ProfilePhoto';
import { FadeInSection } from './FadeInSection';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreResearch: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreResearch,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Background Architectural Grid Lines (Subtle) & ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-80" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />

      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Identity & Hero Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 rounded-full mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>AI • Machine Learning • Computer Vision • Research</span>
            </div>

            {/* Main Headline - Name exactly as requested */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5">
              {PERSONAL_INFO.name}
            </h1>

            {/* Supporting Paragraph starting with 'I am...' */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl font-normal">
              {PERSONAL_INFO.summary}
            </p>

            {/* Academic Credential Card */}
            <div className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-5 mb-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Academic Standing</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    {EDUCATION_DATA.degree}
                  </div>
                  <div className="text-xs text-slate-500">
                    {EDUCATION_DATA.institution} • {EDUCATION_DATA.location}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right border-r border-slate-200 pr-3">
                    <div className="text-xs text-slate-400 font-mono uppercase">Timeline</div>
                    <div className="text-xs font-bold text-slate-700 font-mono">
                      {EDUCATION_DATA.expectedGraduation}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg text-center">
                    <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider font-mono">CGPA</div>
                    <div className="text-base sm:text-lg font-extrabold text-blue-600 font-mono">
                      {EDUCATION_DATA.cgpa} <span className="text-xs font-normal text-blue-500">/ 10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons & Quick Links */}
            <div className="flex flex-wrap items-center gap-3 w-full">
              {/* Prominent Download Resume Button */}
              <a
                id="hero-download-resume-btn"
                href={PERSONAL_INFO.resumeUrl}
                download="Haniel_Reena_DR_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <button
                id="hero-explore-projects-btn"
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-publication-btn"
                onClick={onExploreResearch}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-xl transition-all duration-200 shadow-2xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Publication (2026)</span>
              </button>

              {/* Quick Contact & Profile Icons */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <button
                  id="hero-copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy Email Address"
                  className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-mono font-medium text-slate-600 bg-white hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
                  title="Copy Email Address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span className="text-[11px] hidden sm:inline">Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  id="hero-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="p-3 text-slate-600 bg-white hover:text-slate-900 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-2xs"
                  title="View GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  id="hero-linkedin-link"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 text-slate-600 bg-white hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-2xs"
                  title="View LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Vertically-Centered Profile Photo in empty space */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
            <ProfilePhoto variant="circle" />
          </div>

        </div>
      </FadeInSection>
    </section>
  );
};

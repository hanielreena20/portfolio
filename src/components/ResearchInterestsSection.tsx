import React from 'react';
import { RESEARCH_INTERESTS } from '../data/portfolioData';
import { Layers, ShieldAlert, Activity, FileText, Lock, Sparkles, ArrowUpRight } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const ResearchInterestsSection: React.FC = () => {
  const iconMap: Record<string, any> = {
    Layers,
    ShieldAlert,
    Activity,
    FileText,
    Lock,
  };

  return (
    <section id="research-interests" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RESEARCH INQUIRY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Research Interests & Areas of Focus
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
            Key academic and engineering frontiers guiding ongoing investigations, literature reviews, and algorithmic prototypes.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_INTERESTS.map((interest) => {
            const Icon = iconMap[interest.iconName] || Layers;
            return (
              <div
                key={interest.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {interest.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {interest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                  {interest.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-md"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </FadeInSection>
    </section>
  );
};

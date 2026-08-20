import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PRACTICAL INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
            Hands-on engineering experience spanning full-stack web architectures, SQL relational databases, and RESTful API integration.
          </p>
        </div>

        {/* Experience Timeline Item */}
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div
              key={exp.company}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-slate-300 hover:shadow-md transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-bold text-base shrink-0 font-mono">
                    IT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                        {exp.type}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities Grid */}
              <div className="mt-6">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 mb-3">
                  Key Responsibilities & Deliverables:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used Strip */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />
                  Tech Stack:
                </span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 rounded-md border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </FadeInSection>
    </section>
  );
};

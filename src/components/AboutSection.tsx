import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, BookOpen, Sparkles, CheckCircle2, MapPin, Calendar, Award } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BACKGROUND & ACADEMIC STANDING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
            Bridging rigorous computer science foundations with empirical machine learning research and medical-grade visual computing.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Biography & Research Profile */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Research & Engineering Philosophy
              </h3>
              
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a Computer Science Engineering undergraduate at the <strong className="text-slate-900">Institute of Science & Technology, NMV University</strong> (Chennai, India), maintaining a <span className="font-semibold text-blue-600 font-mono">9.1 / 10 CGPA</span>.
                </p>
                <p>
                  My technical focus lies at the convergence of <strong className="text-slate-900">Multimodal Deep Learning</strong>, <strong className="text-slate-900">Computer Vision</strong>, and <strong className="text-slate-900">Medical Image Computing</strong>. I build end-to-end algorithmic pipelines designed to solve challenging industrial and clinical problems — from 3D volumetric organ segmentation and open-world anomaly scoring to abstractive clinical text summarization.
                </p>
                <p>
                  My recent research addresses extreme class imbalance (91:1) in automated industrial X-ray inspection systems, using ResNet-18 transfer learning and Youden Index threshold calibration to slash false alarms by 81.8% while preserving 91.6% defect sensitivity — accepted for publication in 2026.
                </p>
              </div>

              {/* Core Pillars List */}
              <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Empirical Model Benchmarking',
                  'Imbalance-Aware Deep Learning',
                  'Multimodal RGB-XYZ Fusion',
                  'Full-Stack Software Integration',
                ].map((pillar) => (
                  <div key={pillar} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Location & Status Banner */}
            <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex items-center justify-between border border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Location & Affiliation</div>
                  <div className="text-sm font-bold text-white">Chennai, Tamil Nadu, India</div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Available 2025/26
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Education & Coursework Card */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              
              <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-slate-200">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600">
                      Higher Education
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {EDUCATION_DATA.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {EDUCATION_DATA.institution}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-center shrink-0">
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-300">
                    CGPA
                  </span>
                  <span className="text-base sm:text-lg font-extrabold font-mono text-white">
                    {EDUCATION_DATA.cgpa}
                    <span className="text-xs font-semibold text-slate-400">/10</span>
                  </span>
                </div>
              </div>

              {/* Education Meta Details */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Graduation</div>
                    <div className="text-xs font-bold text-slate-800">{EDUCATION_DATA.expectedGraduation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Campus</div>
                    <div className="text-xs font-bold text-slate-800">{EDUCATION_DATA.location}</div>
                  </div>
                </div>
              </div>

              {/* Relevant Coursework Matrix */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Relevant University Coursework
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    8 Core Disciplines
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <div
                      key={course}
                      className="px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-lg transition-colors flex items-center justify-between shadow-2xs"
                    >
                      <span>{course}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </FadeInSection>
    </section>
  );
};

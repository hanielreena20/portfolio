import React, { useState } from 'react';
import { PUBLICATION_DATA } from '../data/portfolioData';
import { BookOpen, Award, CheckCircle2, TrendingDown, Layers, Sparkles, Activity, FileText, Download } from 'lucide-react';
import { AnimatedMetric } from './AnimatedMetric';
import { FadeInSection } from './FadeInSection';

export const PublicationSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // default highlighted at Youden Index optimization

  return (
    <section id="research" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RESEARCH & SCHOLARSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Peer-Reviewed Publication
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
            Addressing extreme class imbalance and false alarm rates in high-throughput industrial automated radiographic inspection.
          </p>
        </div>

        {/* Paper Spotlight Card */}
        <div className="bg-[#F8FAFC] text-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

          {/* Top Status Banner */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                {PUBLICATION_DATA.status}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Release: {PUBLICATION_DATA.year}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deep Learning • Industrial X-Ray Computer Vision</span>
            </div>
          </div>

          {/* Paper Title & Abstract Pitch */}
          <div className="relative z-10 mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {PUBLICATION_DATA.title}
            </h3>
            
            <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed max-w-4xl">
              {PUBLICATION_DATA.coreProblem}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-white border border-blue-200 flex items-start gap-3 shadow-2xs">
              <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold font-mono text-blue-700 uppercase tracking-wider">
                  Core Innovation & Takeaway
                </div>
                <div className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed">
                  {PUBLICATION_DATA.keyInnovation}
                </div>
              </div>
            </div>
          </div>

          {/* Quantitative Validation Metric Grid */}
          <div className="relative z-10 mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Reported Empirical Results on Industrial Inspection Batches</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PUBLICATION_DATA.metrics.map((m) => (
                <div
                  key={m.label}
                  className={`p-3.5 rounded-xl border ${
                    m.highlight
                      ? 'bg-blue-50 border-blue-200 shadow-2xs'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-500">{m.label}</div>
                  <div
                    className={`text-xl font-extrabold font-mono tracking-tight mt-1 ${
                      m.highlight ? 'text-blue-700' : 'text-slate-900'
                    }`}
                  >
                    <AnimatedMetric value={m.value} />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {m.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Research Methodology Pipeline */}
          <div className="relative z-10 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Interactive Research Methodology & Optimization Stages</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                Click any stage to inspect methodology
              </span>
            </div>

            {/* Pipeline Stage Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
              {PUBLICATION_DATA.pipeline.map((p, idx) => (
                <button
                  key={p.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold">{p.step.split('.')[0]}</div>
                  <div className="text-[11px] font-semibold truncate mt-0.5">
                    {p.step.split('.')[1] || p.step}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Stage Deep Dive */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
              <div className="text-xs font-bold font-mono text-blue-700 mb-1">
                {PUBLICATION_DATA.pipeline[activeStep].step}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {PUBLICATION_DATA.pipeline[activeStep].description}
              </p>
            </div>
          </div>

        </div>

      </FadeInSection>
    </section>
  );
};

import React from 'react';
import { CREDIBILITY_METRICS } from '../data/portfolioData';
import { GraduationCap, Layers, BookCheck, Cpu, TrendingDown } from 'lucide-react';
import { AnimatedMetric } from './AnimatedMetric';
import { FadeInSection } from './FadeInSection';

export const CredibilityStrip: React.FC = () => {
  const icons = [
    GraduationCap,
    Layers,
    BookCheck,
    Cpu,
    TrendingDown,
  ];

  return (
    <section id="credibility-strip" className="relative py-8 bg-white text-slate-900 border-y border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {CREDIBILITY_METRICS.map((metric, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={metric.label}
                className="flex flex-col space-y-1.5 border-l-2 border-blue-600 pl-3.5 sm:pl-4"
              >
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-mono font-semibold uppercase tracking-wider">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{metric.label}</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-mono text-slate-900">
                  <AnimatedMetric value={metric.value} />
                </div>
                <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {metric.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </FadeInSection>
    </section>
  );
};

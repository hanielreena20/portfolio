import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Cpu, BookOpen, Eye, BarChart3, Code, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const iconMap: Record<string, any> = {
    Cpu,
    BookOpen,
    Eye,
    BarChart3,
    Code,
  };

  const filteredCategories =
    activeTab === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((cat) => cat.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="skills" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TECHNICAL PROFICIENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technical Skills & Capability Map
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
              Structured core proficiencies derived from hands-on research implementations, biomedical algorithms, and end-to-end model development.
            </p>
          </div>

          {/* Quick Domain Filters */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              All Matrices (5)
            </button>
            <button
              onClick={() => setActiveTab('deep learning')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'deep learning'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              AI & Deep Learning
            </button>
            <button
              onClick={() => setActiveTab('computer vision')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'computer vision'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              Vision & Medical
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = iconMap[category.iconName] || Cpu;
            return (
              <div
                key={category.title}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {category.skills.length} Core Competencies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md shadow-2xs hover:border-blue-300 hover:text-blue-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Domain Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Structured Interactive Capability Hierarchy */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                Capability Architecture Tree
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Applied AI & Systems Pipeline Overview
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              End-to-End Methodologies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-slate-850/80 bg-[#141b2d] p-4 rounded-xl border border-slate-750 border-slate-800">
              <div className="text-xs font-bold text-blue-400 font-mono mb-2">
                1. AI & Deep Learning
              </div>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                <li>↳ ResNet-18 Backbones</li>
                <li>↳ Multimodal RGB-XYZ</li>
                <li>↳ Memory Banks & 3-NN</li>
                <li>↳ Youden Index Tuning</li>
              </ul>
            </div>

            <div className="bg-slate-850/80 bg-[#141b2d] p-4 rounded-xl border border-slate-750 border-slate-800">
              <div className="text-xs font-bold text-blue-400 font-mono mb-2">
                2. Vision & Medical 3D
              </div>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                <li>↳ OrganMNIST3D Slices</li>
                <li>↳ 3D Gaussian Filters</li>
                <li>↳ Multi-Slice Otsu Mask</li>
                <li>↳ OpenCV Video 24 FPS</li>
              </ul>
            </div>

            <div className="bg-slate-850/80 bg-[#141b2d] p-4 rounded-xl border border-slate-750 border-slate-800">
              <div className="text-xs font-bold text-blue-400 font-mono mb-2">
                3. NLP & Transformers
              </div>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                <li>↳ Tesseract OCR Engine</li>
                <li>↳ BART Summarization</li>
                <li>↳ T5 Sequence Models</li>
                <li>↳ ROUGE-1/2/L Metric</li>
              </ul>
            </div>

            <div className="bg-slate-850/80 bg-[#141b2d] p-4 rounded-xl border border-slate-750 border-slate-800">
              <div className="text-xs font-bold text-blue-400 font-mono mb-2">
                4. Data & Threat Intel
              </div>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                <li>↳ UNSW-NB15 Benchmark</li>
                <li>↳ Random Forest & LR</li>
                <li>↳ 10 Attack Profiles</li>
                <li>↳ Gini Feature Ranking</li>
              </ul>
            </div>

            <div className="bg-slate-850/80 bg-[#141b2d] p-4 rounded-xl border border-slate-750 border-slate-800">
              <div className="text-xs font-bold text-blue-400 font-mono mb-2">
                5. Full Stack & Dev
              </div>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                <li>↳ Node.js & REST APIs</li>
                <li>↳ SQL DB Integration</li>
                <li>↳ Git & GitHub CI</li>
                <li>↳ Jupyter & VS Code</li>
              </ul>
            </div>

          </div>
        </div>

      </FadeInSection>
    </section>
  );
};

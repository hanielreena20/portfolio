import React, { useState } from 'react';
import { Project } from '../types';
import { ChevronDown, ChevronUp, Layers, Cpu, Database, CheckCircle2, ArrowUpRight, Activity } from 'lucide-react';
import { AnimatedMetric } from './AnimatedMetric';
import {
  MultimodalAnomalyDemo,
  Kidney3DMedicalDemo,
  MedicalNlpDemo,
  NetworkIdsDemo,
  FaceVisionDemo,
} from './InteractiveDemos';

interface ProjectCardProps {
  project: Project;
  isExpandedDefault?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpandedDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(true);

  const renderInteractiveDemo = () => {
    switch (project.interactiveType) {
      case 'multimodal-anomaly':
        return <MultimodalAnomalyDemo />;
      case 'kidney-3d':
        return <Kidney3DMedicalDemo />;
      case 'medical-nlp':
        return <MedicalNlpDemo />;
      case 'network-ids':
        return <NetworkIdsDemo />;
      case 'face-vision':
        return <FaceVisionDemo />;
      default:
        return null;
    }
  };

  return (
    <article
      id={`project-card-${project.number}`}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
    >
      {/* Top Header Bar with Project Number & Category */}
      <div className="p-6 sm:p-7 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              {project.category}
            </span>
          </div>

          {project.dataset && (
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {project.dataset}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        {/* Short Summary Description */}
        <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Quantitative Results Metric Grid (High-Impact Research Strip) */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 px-6 sm:px-7 py-4">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 mb-3 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>Empirical Evaluation & Quantitative Results</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.results.map((metric) => (
            <div
              key={metric.label}
              className={`p-3 rounded-xl border ${
                metric.highlight
                  ? 'bg-blue-50/80 border-blue-200 shadow-2xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-[11px] text-slate-500 font-mono">{metric.label}</div>
              <div
                className={`text-lg sm:text-xl font-extrabold font-mono tracking-tight mt-0.5 ${
                  metric.highlight ? 'text-blue-700' : 'text-slate-900'
                }`}
              >
                <AnimatedMetric value={metric.value} />
              </div>
              {metric.subtext && (
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Pipeline & Architecture Viewer */}
      <div className="p-6 sm:p-7 border-b border-slate-200/80 bg-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            Interactive Algorithmic Sandbox
          </span>
          <button
            onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold font-mono cursor-pointer"
          >
            {showInteractiveDemo ? 'Hide Sandbox' : 'Open Sandbox'}
          </button>
        </div>

        {showInteractiveDemo && (
          <div className="mt-2 animate-fadeIn">{renderInteractiveDemo()}</div>
        )}
      </div>

      {/* Expandable Technical Depth Section */}
      <div className="px-6 sm:px-7 py-4 bg-[#F8FAFC]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 font-mono py-1 cursor-pointer transition-colors"
        >
          <span>
            {isExpanded ? 'Collapse Technical Approach' : 'Expand Technical Approach & Pipeline Details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 animate-fadeIn">
            
            {/* Problem Statement */}
            <div>
              <h4 className="font-bold text-slate-900 mb-1 font-mono text-xs uppercase tracking-wide">
                Problem Statement
              </h4>
              <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200 text-slate-700">
                {project.problemStatement}
              </p>
            </div>

            {/* Technical Approach Bullet Points */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2 font-mono text-xs uppercase tracking-wide">
                Algorithmic & Engineering Methodology
              </h4>
              <ul className="space-y-2">
                {project.technicalApproach.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pipeline Stages */}
            {project.pipelineSteps && (
              <div>
                <h4 className="font-bold text-slate-900 mb-2 font-mono text-xs uppercase tracking-wide">
                  Execution Pipeline Flow
                </h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {project.pipelineSteps.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2.5 py-1 bg-white text-slate-700 rounded-md font-mono text-[11px] border border-slate-200 shadow-2xs">
                        {step}
                      </span>
                      {idx < project.pipelineSteps!.length - 1 && (
                        <span className="text-blue-500 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Key Engineering Highlights */}
            <div className="bg-blue-50/80 border border-blue-200/80 p-3.5 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-1.5 font-mono text-xs uppercase tracking-wide">
                Key Insights & Craft
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {project.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
      </div>
    </article>
  );
};

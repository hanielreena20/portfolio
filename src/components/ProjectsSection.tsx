import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Layers, Search, X, Tag, RotateCcw } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Multimodal AI & Anomaly Detection',
    'Computer Vision & Medical Imaging',
    'Natural Language Processing & OCR',
    'Cybersecurity & Explainable AI',
  ];

  const suggestedKeywords = [
    'Computer Vision',
    'NLP',
    'Medical Imaging',
    'Multimodal AI',
    'Anomaly Detection',
    'Deep Learning',
    'PyTorch',
  ];

  // Filter projects based on both category and keyword search query
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      // 1. Category check
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      if (!matchesCategory) return false;

      // 2. Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const searchableContent = [
        project.title,
        project.category,
        project.shortDescription,
        project.problemStatement,
        project.dataset,
        ...project.technologies,
        ...project.technicalApproach,
        ...project.keyHighlights,
      ]
        .join(' ')
        .toLowerCase();

      return searchableContent.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  const handleKeywordClick = (keyword: string) => {
    if (searchQuery.toLowerCase() === keyword.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(keyword);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
      <FadeInSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHAT I&apos;VE BUILT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineering & AI Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2">
              Explore 5 applied systems featuring empirical evaluation across medical volumetrics, open-world anomaly scoring, transformer NLP, and network intrusion intelligence.
            </p>
          </div>

          {/* Quick Count Badge */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 font-mono">
              {filteredProjects.length} / {PROJECTS_DATA.length} Projects Shown
            </span>
          </div>
        </div>

        {/* Interactive Search Bar & Keyword Filter Box */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
          
          {/* Main Search Input */}
          <div className="relative flex items-center mb-3.5">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by keyword (e.g. Computer Vision, NLP, Medical Imaging, PyTorch)..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-white focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />

            {searchQuery && (
              <button
                id="clear-project-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-full transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggested Keyword Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-mono text-[11px] font-semibold flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-slate-400" />
              Quick Filters:
            </span>
            {suggestedKeywords.map((kw) => {
              const isSelected = searchQuery.toLowerCase() === kw.toLowerCase();
              return (
                <button
                  key={kw}
                  onClick={() => handleKeywordClick(kw)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  {kw}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8 pb-3 border-b border-slate-200/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-2xs'
              }`}
            >
              {cat === 'All' ? 'All Domains (5)' : cat}
            </button>
          ))}
        </div>

        {/* Projects List or Empty Search State */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpandedDefault={index === 0 || !!searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No projects found
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1 mb-6">
              No projects match your current keyword <span className="font-semibold text-slate-900">&quot;{searchQuery}&quot;</span> in category <span className="font-semibold text-slate-900">&quot;{selectedCategory}&quot;</span>.
            </p>
            <button
              id="reset-project-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}

      </FadeInSection>
    </section>
  );
};

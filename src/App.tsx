import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PublicationSection } from './components/PublicationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ResearchInterestsSection } from './components/ResearchInterestsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // IntersectionObserver to track currently visible section for navbar highlighting
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sectionIds = [
      'hero',
      'about',
      'projects',
      'research',
      'experience',
      'skills',
      'research-interests',
      'contact',
    ];

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Viewport Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Fixed Sticky Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="grow">
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onExploreResearch={() => scrollToSection('research')}
          onContact={() => scrollToSection('contact')}
        />

        {/* High-Impact Credibility Metrics Strip */}
        <CredibilityStrip />

        {/* About & Education (Institute of Science & Technology, NMV University) */}
        <AboutSection />

        {/* 5 Numbered Engineering & AI Projects with Interactive Sandboxes */}
        <ProjectsSection />

        {/* Peer-Reviewed Publication (2026 Accepted X-Ray DL Pipeline) */}
        <PublicationSection />

        {/* Practical Industry Experience (Inertz Technologies) */}
        <ExperienceSection />

        {/* Technical Skills & Interactive Capability Map */}
        <SkillsSection />

        {/* Research Interests & Inquiry Areas */}
        <ResearchInterestsSection />

        {/* Contact & Let's Connect Hub */}
        <ContactSection />
      </main>

      {/* Academic Footer */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* Floating Action Cluster: Back to Top, Resume Download, Copy Email */}
      <FloatingActions onScrollToTop={handleScrollToTop} />
    </div>
  );
}

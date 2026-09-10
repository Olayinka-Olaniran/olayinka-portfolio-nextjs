'use client';

import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SkillsGraph from '@/components/sections/SkillsGraph';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import CommandPalette from '@/components/ui/CommandPalette';

import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import { projects } from '@/data/projectsMetadata';
import { skills } from '@/data/skillsGraphData';
import ScrollProgress from '@/components/ui/ScrollProgress';
import useReveal from '@/hooks/useReveal';

const EMAIL = 'oolaniran853@gmail.com';
const PROJECTS_PER_PAGE = 6;

export default function Home() {
  const activeSection = useScrollSpy(['home', 'skills', 'portfolio', 'contact']);
  const { copy } = useCopyToClipboard();
  const palette = useCommandPalette({
    projects,
    copyEmailAction: () => {
      void copy(EMAIL);
    },
  });
  const [portfolioPage, setPortfolioPage] = useState(0);

  const portfolioPageCount = useMemo(
    () => Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE)),
    []
  );

  // Function to navigate Portfolio to the page containing a specific project
  const navigateToProject = useCallback(
    (projectId: string) => {
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return;
      const targetPage = Math.floor(projectIndex / PROJECTS_PER_PAGE);
      if (targetPage !== portfolioPage) {
        setPortfolioPage(targetPage);
      }
    },
    [portfolioPage]
  );

  useReveal();

  return (
    <>
      <ScrollProgress />
      <Header
        activeSection={activeSection}
        onOpenPalette={palette.open}
      />

      <main className="main-container flex flex-col gap-6 px-3 md:px-7 mx-auto">
        <Hero />
        <SkillsGraph
          skills={skills}
          projects={projects}
          onNavigateToProject={navigateToProject}
        />
        <Portfolio
          projects={projects}
          page={portfolioPage}
          setPage={setPortfolioPage}
          pageCount={portfolioPageCount}
        />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={palette.isOpen}
        onClose={palette.close}
        query={palette.query}
        onQueryChange={palette.setQuery}
        groups={palette.groups}
        activeIndex={palette.activeIndex}
        setActiveIndex={palette.setActiveIndex}
        onExecute={palette.executeCommand}
      />
    </>
  );
}

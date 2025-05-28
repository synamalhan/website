import React , {useMemo } from 'react';
import ProjectCard from './ProjectCard'; 
import { useMediaQuery } from 'react-responsive';
import projects from "./Projects";

const ProjectList = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const staggerMargins = useMemo(() => {
    return projects.map((_, i) => {
      if (isSmallScreen) return i % 2 === 0 ? 0 : 100;
      // On large screen, random margin for odd cards only
      if (i % 2 === 0) return Math.floor(Math.random() * 100);
      // Random margin between 150px and 250px for bigger, more varied stagger
      return Math.floor(Math.random() * 200) +10;
    });
  }, [isSmallScreen]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', // spacing between cards
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {projects.map((proj, i) => (
        <div
          key={i}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: isSmallScreen ? '45%' : '30%',
            marginTop: staggerMargins[i],
            boxSizing: 'border-box',
            transition: 'margin-top 0.3s ease',
          }}
        >
          <ProjectCard
            title={proj.title}
            description={proj.summary}
            details={proj.details}
            image={proj.images}
            links={proj.links}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
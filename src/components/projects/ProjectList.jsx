import React, { useMemo } from 'react';
import ProjectCard from './ProjectCard'; 
import { useMediaQuery } from 'react-responsive';
import projects from "./Projects";

const ProjectList = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const staggerMargins = useMemo(() => {
    return projects.map(() => {
      if (isSmallScreen) {
        // For small screens, no stagger or simple alternating 0 or 50px
        return Math.random() > 0.5 ? 0 : 50;
      }
      // Large screen: random margin between 0 and 100 px for all cards
      return Math.floor(Math.random() * 100);
    });
  }, [isSmallScreen]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
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
            flexBasis: isSmallScreen ? '45%' : '22%', // ~4 cards per row on large screen
            marginTop: staggerMargins[i],
            boxSizing: 'border-box',
            transition: 'margin-top 0.3s ease',
          }}
        >
          <ProjectCard
            title={proj.title}
            badge={proj.badge}
            description={proj.summary}
            details={proj.details}
            image={proj.images}
            links={proj.links}
            techStack={proj.techStack}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;

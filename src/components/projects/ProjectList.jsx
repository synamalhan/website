import React, { useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { useMediaQuery } from 'react-responsive';
import projects from './Projects';

const ProjectList = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  // Apply stagger margin only to 2nd column (index % 2 === 1) on small screens
  const staggerMargins = useMemo(() => {
    return projects.map((_, index) => {
      if (isSmallScreen) {
        return index % 2 === 1 ? 50 : 0;
      } else {
        return index % 2 === 1 ? 80 : 0;
      }
    });
  }, [isSmallScreen]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 10px',
      }}
    >
      {projects.map((proj, i) => (
        <div
          key={i}
          style={{
            marginTop: staggerMargins[i],
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

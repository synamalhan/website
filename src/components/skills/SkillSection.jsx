import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from './SkillBadge';

const skillCategories = {
  'Programming Languages': [
    { skill: 'Python', level: 5 },
    { skill: 'Java', level: 4 },
    { skill: 'C++', level: 4 },
    { skill: 'C', level: 3 },
    { skill: 'R', level: 2 },
    { skill: 'Swift', level: 2 },
    { skill: 'SQL', level: 4 },
  ],
  'Frontend Development': [
    { skill: 'HTML', level: 4 },
    { skill: 'CSS', level: 4 },
    { skill: 'JavaScript', level: 4 },
    { skill: 'TypeScript', level: 3 },
    { skill: 'ReactJS', level: 4 },
    { skill: 'NextJS', level: 3 },
    { skill: 'AngularJS', level: 3 },
    { skill: 'TailwindCSS', level: 4 },
    { skill: 'Figma', level: 3 },
  ],
  'Backend & Database': [
    { skill: 'Node.js', level: 4 },
    { skill: 'MongoDB', level: 4 },
    { skill: 'PostgreSQL', level: 3 },
    { skill: 'Firebase', level: 4 },
    { skill: 'Neo4j', level: 4 },
    { skill: 'GraphQL', level: 3 },
  ],
  'AI & Machine Learning': [
    { skill: 'TensorFlow', level: 4 },
    { skill: 'PyTorch', level: 4 },
    { skill: 'Keras', level: 4 },
    { skill: 'Sklearn', level: 4 },
    { skill: 'Pandas', level: 5 },
    { skill: 'Numpy', level: 5 },
    { skill: 'Matplotlib', level: 4 },
    { skill: 'Plotly', level: 4 },
    { skill: 'OpenAI', level: 3 },
    { skill: 'LangChain', level: 3 },
    { skill: 'RAG', level: 5 },
    { skill: 'LangGraph', level: 3 },
    { skill: 'Generative AI', level: 3 },
    { skill: 'Computer Vision', level: 4 },
  ],
  'Cloud & DevOps': [
    { skill: 'AWS', level: 4 },
    { skill: 'Docker', level: 4 },
    { skill: 'Kubernetes', level: 3 },
    { skill: 'Vercel', level: 4 },
    { skill: 'Streamlit', level: 3 },
  ],
  'Tools & Others': [
    { skill: 'Git', level: 4 },
    { skill: 'Jira', level: 3 },
    { skill: 'Test Automation', level: 3 },
    { skill: 'QA Methodologies', level: 3 },
  ]
};

const getRandomTransform = () => {
  const rotate = Math.floor(Math.random() * 10 - 5);
  const translateX = Math.floor(Math.random() * 10 - 5);
  const translateY = Math.floor(Math.random() * 10 - 5);
  return `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`;
};

const SkillSection = () => {
  return (
    <section
      id="skills"
      style={{
        background: 'linear-gradient(180deg, #00171c 0%, #00141a 100%)',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#a0d8ef',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.2 }}
        style={{
          fontSize: '3rem',
          marginBottom: '30px',
          color: '#92daf7',
          textShadow: '2px 2px 6px rgba(128, 128, 128, 0.8)',
        }}
      >
        Skills & Expertise
      </motion.h2>

<motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        style={{ fontSize:'1.2rem', color: '#a0d8ef', marginBottom: '30px', fontWeight: 500, textAlign: 'center' }}
      >
            A comprehensive overview of my technical skills across various domains
      </motion.div>

      {Object.entries(skillCategories).map(([category, skills]) => (
        <motion.div
          key={category}
          style={{
            marginBottom: '40px',
            maxWidth: '1000px',
            width: '100%',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'center',
            }}
          >
            {skills.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                style={{
                  transform: getRandomTransform(),
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <SkillCard skill={item.skill} level={item.level} category={category} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <style>{`
        @media (max-width: 600px) {
          #skills {
            padding: 20px 10px !important;
          }
          #skills h2 {
            font-size: 2rem !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillSection;

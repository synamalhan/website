// src/components/WorkExperienceList.jsx
import React, { useEffect, useState } from 'react';
import WorkExperienceCard from './WorkExperienceCard';
import jspl from '../../assets/jspl.png';
import asu from '../../assets/asu.png';
import pwc from '../../assets/pwc.png';
import ripik from '../../assets/ripik.svg';
import headstarter from '../../assets/headstarter.avif';
import eyLogo from '../../assets/eyLogo.png'; // replace with your Ernst & Young logo import or image reference

const experiences = [
  {
  title: 'Gen AI Intern',
  company: 'Ernst & Young',
  duration: 'Jun 2025 - Present',
  summary: 'Working on agentic retrieval-augmented generation (RAG) leveraging graph databases and optimizing image generation models for textual imagery.',
  details: (
    <>
      <ul>
        <li><strong>Task 1:</strong> Explored graph understanding and creation using Neo4j and LangGraph to build an agentic RAG system enhancing information retrieval.</li>
        <li><strong>Task 2:</strong> Researched and integrated high-resolution, text-accurate image generation models as alternatives to DALL·E 3 for generating precise workflow visuals.</li>
        <li><strong>Skills:</strong> Gained hands-on experience with graph databases, AI agent development, and advanced image generation techniques.</li>
      </ul>
    </>
  ),
  logo: eyLogo, // replace with your Ernst & Young logo import or image reference
}
,

  {
    title: 'Cloud Front End Developer',
    company: 'Arizona State University AI Cloud Innovation Center',
    duration: 'Aug 2024 - Present',
    summary: 'Built cloud infrastructure with AWS and UI, improving user experience for public sector solutions.',
    details: (
      <>
        <ul>
          <li><strong>Situation:</strong> The CIC needed reliable internal tools for AI/ML innovation tracking and partner collaboration.</li>
          <li><strong>Problem:</strong> Existing systems lacked a user-friendly interface and cloud scalability.</li>
          <li><strong>Action:</strong> Developed cloud-native front-end apps using ReactJS, integrated AWS services (S3, Lambda, Cognito), and built RESTful API connections.</li>
          <li><strong>Result:</strong> Improved user engagement by 30% and reduced support queries by 40% due to enhanced usability.</li>
          <li><strong>Knowledge:</strong> Strengthened AWS CDK skills, frontend-cloud integrations, stakeholder communication, and Agile delivery.</li>
        </ul>
      </>
    ),
    logo: asu,
  },
  {
    title: 'Intern in Digitalization',
    company: 'Jindal Steel and Power Ltd',
    duration: 'May 2024 - July 2024',
    summary: 'Developed full-stack app with AngularJS, Spring Boot, and SQL, improving data retrieval speed by 15%.',
    details: (
      <>
        <ul>
          <li><strong>Situation:</strong> JSPL needed a better way to manage and retrieve operational data across departments.</li>
          <li><strong>Problem:</strong> Manual data processes were inefficient and delayed decision-making.</li>
          <li><strong>Action:</strong> Designed and implemented a full-stack application using AngularJS, Spring Boot, and SQL; deployed via Apache Tomcat.</li>
          <li><strong>Result:</strong> Automated workflows led to a 15% improvement in data retrieval time and a more intuitive user experience.</li>
          <li><strong>Knowledge:</strong> Learned enterprise full-stack development, backend API creation, SQL optimization, and deployment practices.</li>
        </ul>
      </>
    ),
    logo: jspl,
  },
  {
    title: 'Intern in Machine Learning and Data Analytics',
    company: 'Ripik.AI',
    duration: 'July 2024 – Aug 2024',
    summary: 'Engineered algorithms using YOLO and Ultralytics, improving accuracy by 80%.',
    details: (
      <>
        <ul>
          <li><strong>Situation:</strong> Ripik.AI needed AI-powered inspection tools for real-time manufacturing analytics.</li>
          <li><strong>Problem:</strong> Low model precision and misclassification were slowing defect detection.</li>
          <li><strong>Action:</strong> Trained YOLOv5 and Ultralytics models for object detection; built OCR pipelines using Python and OpenCV.</li>
          <li><strong>Result:</strong> Achieved an 80% accuracy boost in detection and a 25% improvement in OCR performance.</li>
          <li><strong>Knowledge:</strong> Gained practical experience in ML lifecycle, annotation tooling, OCR, model training, and error analysis.</li>
        </ul>
      </>
    ),
    logo: ripik,
  },
  {
    title: 'Software Engineering Fellow',
    company: 'Headstarter AI',
    duration: 'July 2024 – Sept 2024',
    summary: 'Built 5+ AI apps using NextJS, OpenAI, Pinecone, StripeAPI, achieving 98% accuracy.',
    details: (
      <>
        <ul>
          <li><strong>Situation:</strong> As part of a fast-paced AI fellowship, I built real-world SaaS tools to solve user-centric problems.</li>
          <li><strong>Problem:</strong> We needed scalable, AI-integrated apps with secure payments and semantic search.</li>
          <li><strong>Action:</strong> Led and contributed to full-stack apps using NextJS, OpenAI API, Pinecone (vector DB), and Stripe for monetization.</li>
          <li><strong>Result:</strong> Shipped 5 apps with 98% accuracy in LLM predictions and integrated real-time search and secure payments.</li>
          <li><strong>Knowledge:</strong> Learned to ship production-ready apps, leverage LLMs, vector search, Stripe, and lead technical teams in agile sprints.</li>
        </ul>
      </>
    ),
    logo: headstarter,
  },
];



const WorkExperienceList = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMarginTop = (index) => {
    if (windowWidth < 768) return 40;     // Small screens
    if (windowWidth < 1024) return 100;   // Medium screens
    return index % 2 === 0 ? 0 : 280;     // Large screens stagger
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {experiences.map((exp, i) => (
        <div
          key={i}
          style={{
            marginTop: getMarginTop(i),
            transition: 'margin-top 0.3s ease',
          }}
        >
          <WorkExperienceCard
            title={exp.title}
            company={exp.company}
            duration={exp.duration}
            summary={exp.summary}
            details={exp.details}
            logo={exp.logo || asu}
          />
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceList;
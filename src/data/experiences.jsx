import jspl from '../assets/jspl.png';
import asu from '../assets/asu.png';
import iu from '../assets/iuLogo.png';
import ripik from '../assets/ripik.svg';
import headstarter from '../assets/headstarter.avif';
import eyLogo from '../assets/eyLogo.png'; // replace with your Ernst & Young logo import or image reference

const experiences = [
{
  title: 'Data Science Intern',
  company: 'Infinite Uptime',
  duration: 'Jul 2025 - Present',
  summary: 'Analyzing real-world process and sensor data to generate actionable insights for predictive maintenance and manufacturing optimization.',
  details: (
    <>
      <ul>
        <li>Explored time-series sensor data to detect anomalies and inefficiencies in industrial equipment using Python and Pandas.</li>
        <li>Applied statistical methods and machine learning (scikit-learn) to model performance trends and identify early warning signs of failure.</li>
        <li>Built interactive visualizations and KPI dashboards using Matplotlib and Power BI to support operational decision-making.</li>
      </ul>
    </>
  ),
  logo: iu, // replace with your Infinite Uptime logo import or image reference
},

  {
  title: 'Gen AI Intern',
  company: 'Ernst & Young',
  duration: 'Jun 2025 - Present',
  summary: 'Working on agentic retrieval-augmented generation (RAG) leveraging graph databases and optimizing image generation models for textual imagery.',
  details: (
    <>
      <ul>
        <li> Collaborated on building visualization-based AI systems for enterprise applications using Retrieval-Augmented Generation (RAG).</li>
        <li> Utilized Neo4j for graph-based data modeling and relationship mapping to improve spatial and contextual insights.</li>
          <li> Developed interactive dashboards and visual workflows to demonstrate AI outputs and knowledge graph structures.</li>
<li> Participated in virtual sprint planning and team reviews, contributing to project documentation and technical presentations. </li>    </ul>
    </>
  ),
  logo: eyLogo, // replace with your Ernst & Young logo import or image reference
},

  {
    title: 'Cloud Front End Developer',
    company: 'Arizona State University AI Cloud Innovation Center',
    duration: 'Aug 2024 - Present',
    summary: 'Built cloud infrastructure with AWS and UI, improving user experience for public sector solutions.',
    details: (
      <>
        <ul>
          <li> Collaborated with cross-functional teams to design UI for public sector applications. </li>
<li> Created wireframes and data visualizations to illustrate spatial usage and cloud workflows. </li>
<li> Regularly reported progress via virtual meetings and managed tasks using cloud-based tools. </li>

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
          <li>  Developed internal data dashboards with AngularJS and Spring Boot. </li>
            <li> Enhanced visual clarity of operational layouts by redesigning space-related UI elements. </li>
<li>Integrated performance metrics and reports into stakeholder presentations. </li>
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
          <li>  Trained object detection models (YOLO), improving accuracy for industrial use cases. </li>
            <li>  Developed OCR models and boosted form recognition performance by 25%. </li>
<li>  Produced dashboards and visual analytics for client reports. </li>
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
          <li>  Built data-rich, interactive AI apps using React, OpenAI APIs, and visualization libraries.</li>
 <li> Led peer reviews and presentation sessions via Zoom, enhancing team collaboration remotely.</li>
<li>  Led 4+ engineering fellows in full-stack development, with coaching from Amazon, Bloomberg, and Capital One engineers.</li>
        </ul>
      </>
    ),
    logo: headstarter,
  },
];


export default experiences;
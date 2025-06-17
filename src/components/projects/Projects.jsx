import PF1 from "../../assets/projects/PF1.jpeg";
import LPD1 from "../../assets/projects/LPD1.jpeg";
import CG from "../../assets/projects/CG.png";
import BF from "../../assets/projects/BF.png";
import SS from "../../assets/projects/SS.png";
import OCR from "../../assets/projects/OCR.png";
import WL from "../../assets/projects/WL.png";
import MX from "../../assets/projects/MX.png";
import OP from "../../assets/projects/OP.png";
import PA from "../../assets/projects/PA.png";
import ED from "../../assets/projects/ED.png";
import G from "../../assets/projects/G.png";



const projects = [
    {
      title: 'Solar System Simulation in A-Frame',
      summary: 'Created an interactive 3D solar system model using A-Frame to understand WebXR concepts and entity-component design.',
      duration: 'May 2025',
      techStack: ['HTML', 'A-Frame', 'WebGL', 'Three.js'],
      details: (
        <>
          <p><strong>Situation:</strong> I wanted to explore 3D web development and understand how VR/AR environments are constructed.</p>
          <p><strong>Problem:</strong> I had no prior experience with A-Frame or spatial rendering techniques.</p>
          <p><strong>Action:</strong> I created a model of the solar system where each planet rotates and orbits the sun, mapped textures using A-Frame assets, and adjusted scaling/camera controls for realism.</p>
          <p><strong>Result:</strong> Successfully developed a browser-based simulation that visually represents orbital mechanics and planetary rotation.</p>
          <p><strong>What I Learned:</strong> Basics of 3D entity hierarchies, texture loading, orbital animation, and component-based architecture in A-Frame.</p>
          <p><strong>Tech Stack:</strong> HTML, A-Frame, WebGL, Three.js</p>
        </>
      ),
    
      links: [
        { label: 'GitHub Repo', url: 'https://github.com/yourusername/a-frame-vr.git' },
      ],
    },
  
    {
      title: 'Last Point Distribution Analysis',
      summary: 'Optimized dispatch operations with K-means clustering and real-time cost calculations, improving delivery efficiency.',
      duration: 'May 2024 – July 2024',
      techStack: ['Python', 'Streamlit', 'K-means Clustering', 'Folium'],
      details: (
        <>
          <p><strong>Situation:</strong> The dispatch team faced inefficient routing and unclear clustering of delivery points.</p>
          <p><strong>Problem:</strong> Poorly defined last-mile delivery zones caused high delivery times and costs.</p>
          <p><strong>Action:</strong> I applied K-means clustering to optimize distribution zones, used Folium for geospatial visualizations, and integrated cost calculators in a Streamlit dashboard.</p>
          <p><strong>Result:</strong> Reduced average delivery path overlap and improved logistical efficiency.</p>
          <p><strong>What I Learned:</strong> Real-world clustering application, map-based insights using Folium, and integrating business cost metrics with ML pipelines.</p>
          <p><strong>Tech Stack:</strong> Python, Streamlit, K-means, Folium</p>
        </>
      ),
      images:LPD1,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/dispatch_optimization_FG_forecasting', },
        ],
      },
  
  
      {
      title: 'Plate Mill FG Forecasting',
      summary: 'Deployed predictive models to forecast finished goods, improving dispatch planning.',
      duration: 'May 2024 – July 2024',
      techStack: ['Python', 'XGBoost', 'ARIMA', 'Prophet', 'Random Forest'],
      images:PF1,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/dispatch_optimization_FG_forecasting' },
        ],
      details: (
        <>
          <p><strong>Situation:</strong> Forecasting was done manually, leading to inefficiencies.</p>
          <p><strong>Problem:</strong> Dispatch planning lacked accurate predictive backing.</p>
          <p><strong>Action:</strong> Trained time series models (ARIMA, Prophet) and ensemble methods (XGBoost, RF) to forecast weekly finished goods inventory.</p>
          <p><strong>Result:</strong> Improved forecast accuracy by 30%, enabling better production scheduling.</p>
          <p><strong>What I Learned:</strong> Handling seasonality in time series, comparing predictive model performance, and delivering actionable insights for supply chain teams.</p>
          <p><strong>Tech Stack:</strong> Python, XGBoost, ARIMA, Prophet, Random Forest</p>
        </>
      ),
    },
  
  
    {
      title: 'CropGenius',
      summary: 'Developed CropGenius to provide 100% accurate crop recommendations using XGBoost and Random Forest.',
      duration: 'July 2024',
      techStack: ['XGBoost', 'Random Forest', 'Streamlit', 'Weather API'],
      details: (
        <>
          <p><strong>Situation:</strong> Farmers needed region-specific crop recommendations based on soil and weather data.</p>
          <p><strong>Problem:</strong> Traditional recommendation systems lacked accuracy and context.</p>
          <p><strong>Action:</strong> Trained ML models using agri-datasets and weather API data, deployed via Streamlit app.</p>
          <p><strong>Result:</strong> Achieved 100% recommendation accuracy on validation datasets and real use cases.</p>
          <p><strong>What I Learned:</strong> API integration in ML apps, agriculture-specific ML pipelines, and building explainable UIs for domain experts.</p>
          <p><strong>Tech Stack:</strong> XGBoost, Random Forest, Streamlit, Weather API</p>
        </>
      ),
      images:CG,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/ai-crop-optimizer' },
        { label: 'Demo', url: 'https://youtu.be/030IplDlcBU' },],
    },
  
    {
      title: 'Blast Furnace Lab Automation',
      summary: 'Developed a full-stack web portal to automate and streamline lab processes, improving data management and operational efficiency.',
      duration: 'Add project duration here',
      techStack: ['AngularJS', 'Spring Boot', 'SQL', 'Apache Tomcat'],
      details: (
        <>
          <p><strong>Situation:</strong> Lab processes in a blast furnace environment were manual and fragmented, causing inefficiencies.</p>
          <p><strong>Problem:</strong> Lack of centralized data management and real-time connectivity across lab operations.</p>
          <p><strong>Action:</strong> Built a comprehensive web portal using AngularJS and Spring Boot, integrated multiple lab workflows, and deployed on scalable cloud platforms.</p>
          <p><strong>Result:</strong> Improved operational efficiency, centralized data access, and enabled scalable, high-performance lab automation.</p>
          <p><strong>What I Learned:</strong> Full-stack web development for industrial applications, system integration, scalable backend architecture, and the importance of collaboration and rigorous testing.</p>
        </>
      ),
      images: BF,
    },
    
  
    {
      title: 'Slab Sizing',
      summary: 'Optimized computer vision algorithms using YOLO, increasing measurement accuracy by 80%.',
      duration: 'June 2024 – Aug 2024',
      techStack: ['Ultralytics', 'YOLO', 'Python', 'FastSAM'],
      details: (
        <>
          <p><strong>Situation:</strong> Manual measurement of steel slabs was time-consuming and inconsistent.</p>
          <p><strong>Problem:</strong> Automated image-based sizing models lacked precision under different lighting and angle conditions.</p>
          <p><strong>Action:</strong> Fine-tuned YOLO and FastSAM models for precise object detection, ran benchmarking tests across multiple conditions.</p>
          <p><strong>Result:</strong> Boosted measurement accuracy by 80% and reduced time-to-insight drastically.</p>
          <p><strong>What I Learned:</strong> Real-world edge cases in CV, model fine-tuning and dataset augmentation techniques for YOLO pipelines.</p>
          <p><strong>Tech Stack:</strong> YOLO, Ultralytics, Python, FastSAM</p>
        </>
      ),
      images:SS,
    },
  
  
    {
      title: 'Options Pricing and Risk Assessment Tool',
      summary: 'Developed financial tool to calculate option pricing using Monte Carlo simulations and Black-Scholes.',
      duration: 'Dec 2024',
      techStack: ['Python', 'Streamlit', 'Monte Carlo', 'Black-Scholes'],
      details: (
        <>
          <p><strong>Situation:</strong> Finance students and analysts needed a simulation-based learning and risk evaluation tool.</p>
          <p><strong>Problem:</strong> Existing tools were either non-interactive or lacked risk measures.</p>
          <p><strong>Action:</strong> Built a Streamlit dashboard to price options using Monte Carlo & Black-Scholes, added VaR/ES risk metrics.</p>
          <p><strong>Result:</strong> Helped users visualize pricing dynamics and perform scenario-based risk analysis.</p>
          <p><strong>What I Learned:</strong> Applied quantitative finance concepts programmatically and learned to simplify financial modeling for UI/UX.</p>
          <p><strong>Tech Stack:</strong> Python, Monte Carlo, Black-Scholes, Streamlit</p>
        </>
      ),
      images:OP,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/option-pricing.git' },
        { label: 'Demo', url: 'https://youtu.be/HZKh0vNGbHU' },],
    },
    {
      title: 'Wildlife Monitoring and Conservation',
      summary: 'Automated detection and monitoring of wildlife using YOLO/Faster R-CNN and SAM/FastSAM for segmentation.',
      duration: 'Dec 2024',
      techStack: ['YOLO', 'Faster R-CNN', 'SAM', 'FastSAM', 'Python'],
      details: (
        <>
          <p><strong>Situation:</strong> Manual tracking of endangered species was inefficient and prone to error.</p>
          <p><strong>Problem:</strong> Needed automated monitoring using satellite and camera trap imagery.</p>
          <p><strong>Action:</strong> Used YOLO/Faster R-CNN for detection, SAM-based models for segmentation, integrated with movement analysis system.</p>
          <p><strong>Result:</strong> Enabled 24/7 monitoring of remote wildlife zones with over 92% accuracy.</p>
          <p><strong>What I Learned:</strong> Model ensemble in CV tasks, wildlife-specific edge cases, importance of scalable ecological solutions.</p>
          <p><strong>Tech Stack:</strong> YOLO, Faster R-CNN, SAM, FastSAM, Python</p>
        </>
      ),
      images:WL,
      
    },
    {
      title: 'Medical Image Analysis for Early Brain Tumor Detection',
      summary: 'Developed CNN model to detect anomalies in medical images (Brain Tumor) using U-Net for segmentation.',
      duration: 'Jan 2025',
      techStack: ['TensorFlow', 'Keras', 'U-Net', 'ResNet', 'VGG'],
      details: (
        <>
          <p><strong>Situation:</strong> Early detection of tumors and fractures in radiology scans was inconsistent.</p>
          <p><strong>Problem:</strong> High false negatives in automated diagnosis models.</p>
          <p><strong>Action:</strong> Trained U-Net for segmentation and ResNet/VGG for classification on MRI and X-ray datasets.</p>
          <p><strong>Result:</strong> Reduced false negative rate by 35% while maintaining over 90% precision.</p>
          <p><strong>What I Learned:</strong> Importance of segmentation before classification, medical data preprocessing challenges, and evaluation techniques.</p>
          <p><strong>Tech Stack:</strong> TensorFlow, Keras, U-Net, ResNet, VGG</p>
        </>
      ),
      images:MX,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/brain-tumor-cnn.git' },
        // { label: 'Demo', url: 'https://youtu.be/BNgE11T8JC0' },
        ],
    
    },
    {
      title: 'Portfolio Analyzer and Stock Prediction Dashboard',
      summary: 'Streamlit app for portfolio management with real-time tracking and ML-driven stock price predictions.',
      duration: 'Dec 2024',
      techStack: ['Python', 'Streamlit', 'Random Forest', 'LSTM', 'Plotly'],
      details: (
        <>
          <p><strong>Situation:</strong> Investors wanted a tool that combined analytics with price forecasting.</p>
          <p><strong>Problem:</strong> Most dashboards lacked predictive capability or usable UI.</p>
          <p><strong>Action:</strong> Built frontend in Streamlit, backend with LSTM/Random Forest models and integrated real-time stock APIs and financial metrics.</p>
          <p><strong>Result:</strong> Delivered daily insights and forecasts with 87% accuracy.</p>
          <p><strong>What I Learned:</strong> End-to-end dashboarding, combining ML forecasts with financial KPIs, user-focused design.</p>
          <p><strong>Tech Stack:</strong> Python, Streamlit, LSTM, Random Forest, Plotly</p>
        </>
      ),
      images:PA,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/stock_pred.git' },
        { label: 'Demo', url: 'https://youtu.be/BNgE11T8JC0' },],
    },
    {
      title: 'OCR Training',
      summary: 'Trained custom OCR models, improving recognition accuracy with Donut model fine-tuning.',
      duration: 'July 2024 – Aug 2024',
      techStack: ['Python', 'Donut Model', 'AWS OCR', 'Azure OCR'],
      details: (
        <>
          <p><strong>Situation:</strong> Existing OCR tools were failing on industry-specific formats like log sheets.</p>
          <p><strong>Problem:</strong> Poor recognition accuracy of critical text fields and symbols.</p>
          <p><strong>Action:</strong> Fine-tuned the Donut transformer-based OCR model, and benchmarked against AWS/Azure OCR APIs.</p>
          <p><strong>Result:</strong> Increased accuracy by over 25% on key form fields.</p>
          <p><strong>What I Learned:</strong> Custom transformer model training, OCR-specific metrics, and evaluation of commercial APIs.</p>
          <p><strong>Tech Stack:</strong> Python, Donut Model, AWS OCR, Azure OCR</p>
        </>
      ),
      images:OCR,
    },
    {
      title: 'Emotion Detection from Images',
      summary: 'Built emotion detection app using Hugging Face RoBERTa model with real-time Streamlit visualization.',
      duration: 'Dec 2024',
      techStack: ['Hugging Face', 'RoBERTa', 'Streamlit', 'Python'],
      details: (
        <>
          <p><strong>Situation:</strong> Needed a real-time tool to detect and quantify user sentiment during feedback collection.</p>
          <p><strong>Problem:</strong> Emotion detection models lacked real-time interactivity and multi-modal feedback.</p>
          <p><strong>Action:</strong> Used RoBERTa for text emotion classification, added image-based emotion scoring, and built an interactive dashboard in Streamlit.</p>
          <p><strong>Result:</strong> Enabled real-time analysis of user mood and engagement from live sessions.</p>
          <p><strong>What I Learned:</strong> Multi-modal analysis, transformer-based NLP, UX design for real-time interaction.</p>
          <p><strong>Tech Stack:</strong> Hugging Face, RoBERTa, Python, Streamlit</p>
        </>
      ),
      images:ED,
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/emotion-detect.git' },
        { label: 'Demo', url: 'https://youtu.be/bKAJgkphZus?si=04CCDq-yPc_1qBbv' },],
    },
    {
      title: 'Front-end Portal',
      summary: 'Built a React portal with reusable components, dynamic filters, and video previews, integrated with REST APIs and deployed on AWS Amplify.',
      duration: 'Add duration here',
      techStack: ['React', 'AWS Amplify', 'REST API', 'JavaScript', 'CSS'],
      details: (
        <>
          <p><strong>Situation:</strong> Needed a scalable portal with rich UX features for data display and video previews.</p>
          <p><strong>Problem:</strong> Existing solutions lacked dynamic filtering and efficient video integration.</p>
          <p><strong>Action:</strong> Developed custom React components, integrated multiple REST endpoints, and deployed on AWS Amplify.</p>
          <p><strong>Result:</strong> Improved user engagement with dynamic data visualization and faster video access.</p>
          <p><strong>What I Learned:</strong> Advanced React component design, API integration, and AWS Amplify deployment.</p>
          <p><strong>Tech Stack:</strong> React, AWS Amplify, REST API</p>
        </>
      ),
    },
  
    {
      title: 'Specialized Chatbot',
      summary: 'Created a React-based chatbot integrated with AWS Amplify and Cognito, with admin flow for DB management and analytics.',
      duration: 'Add duration here',
      techStack: ['React', 'AWS Amplify', 'AWS Cognito', 'AWS Chatbot'],
      details: (
        <>
          <p><strong>Situation:</strong> Needed an intelligent chatbot for customer interaction with admin controls.</p>
          <p><strong>Problem:</strong> Lack of easy admin interface to manage chatbot data and monitor usage analytics.</p>
          <p><strong>Action:</strong> Built chatbot frontend with React and AWS Amplify, implemented Cognito authentication, and created admin flows.</p>
          <p><strong>Result:</strong> Enabled seamless user-chatbot interaction and real-time analytics monitoring.</p>
          <p><strong>What I Learned:</strong> AWS Amplify authentication, chatbot integration, and admin dashboard design.</p>
          <p><strong>Tech Stack:</strong> React, AWS Amplify, AWS Cognito</p>
        </>
      ),
    },
  
    {
      title: 'Chatbot Referral Agent',
      summary: 'Developed a referral chatbot in React with AWS Amplify and Cognito, including an admin portal for referral and data management.',
      duration: 'Add duration here',
      techStack: ['React', 'AWS Amplify', 'AWS Cognito', 'AWS Chatbot'],
      details: (
        <>
          <p><strong>Situation:</strong> Needed a chatbot for referral collection and tracking.</p>
          <p><strong>Problem:</strong> No scalable solution for referral data management and analytics.</p>
          <p><strong>Action:</strong> Built React chatbot with Cognito authentication, created admin portal for referral tracking and analytics.</p>
          <p><strong>Result:</strong> Streamlined referral process with secure data handling and insight generation.</p>
          <p><strong>What I Learned:</strong> Integration of authentication, chatbot UI, and backend analytics.</p>
          <p><strong>Tech Stack:</strong> React, AWS Amplify, AWS Cognito</p>
        </>
      ),
    },
  
    {
      title: 'Content Censoring Solution',
      summary: 'Implemented NLP-based content filtering for text, audio, and video using speech-to-text and Python backend for automated moderation.',
      duration: 'Add duration here',
      techStack: ['Python', 'NLP', 'Speech-to-Text APIs', 'Flask/Django'],
      details: (
        <>
          <p><strong>Situation:</strong> Needed to automatically moderate user-generated content across multiple media types.</p>
          <p><strong>Problem:</strong> Manual moderation was slow and inconsistent.</p>
          <p><strong>Action:</strong> Developed backend with speech-to-text for audio/video, text NLP filters, and customizable rules.</p>
          <p><strong>Result:</strong> Enabled scalable, consistent content moderation with configurable censoring.</p>
          <p><strong>What I Learned:</strong> NLP techniques, audio processing, and building flexible moderation pipelines.</p>
          <p><strong>Tech Stack:</strong> Python, NLP, Speech-to-Text APIs</p>
        </>
      ),
      links: [
    { label: "GitHub Repo", url: "https://github.com/PratGit1606/WhatTheBleep-AutomaticCensor.git" }
  ]
    },
  
    {
      title: 'Portfolio Performance Analyzer',
      summary: 'Built a Streamlit app to input, validate, and visualize stock portfolios with risk-return plots and sector allocation.',
      duration: 'Add duration here',
      techStack: ['Python', 'Streamlit', 'yFinance API', 'Plotly'],
      details: (
        <>
          <p><strong>Situation:</strong> Investors needed a simple tool for portfolio performance visualization.</p>
          <p><strong>Problem:</strong> Lack of interactive, easy-to-use portfolio analysis tools.</p>
          <p><strong>Action:</strong> Developed Streamlit dashboard with CSV/manual input, integrated yFinance, and interactive Plotly charts.</p>
          <p><strong>Result:</strong> Improved user insights into portfolio risk, returns, and sector exposures.</p>
          <p><strong>What I Learned:</strong> API integration, interactive visualization, and Streamlit app deployment.</p>
          <p><strong>Tech Stack:</strong> Python, Streamlit, yFinance, Plotly</p>
        </>
      ),
      links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/portfolio_analyzer" }
  ]
    },
  
    {
      title: 'Customer Segmentation via K-Means',
      summary: 'Applied K-Means clustering on mall customer data to identify marketing segments, visualized clusters with Matplotlib and Plotly.',
      duration: 'Add duration here',
      techStack: ['Python', 'K-Means Clustering', 'Matplotlib', 'Seaborn', 'Plotly'],
      details: (
        <>
          <p><strong>Situation:</strong> Marketing team needed to segment customers for targeted campaigns.</p>
          <p><strong>Problem:</strong> Existing segmentation was manual and imprecise.</p>
          <p><strong>Action:</strong> Used K-Means clustering, elbow method for optimal clusters, and generated cluster visualizations.</p>
          <p><strong>Result:</strong> Enhanced targeted marketing strategies and campaign ROI.</p>
          <p><strong>What I Learned:</strong> Clustering algorithms, cluster evaluation methods, and visualization best practices.</p>
          <p><strong>Tech Stack:</strong> Python, K-Means, Matplotlib, Seaborn, Plotly</p>
        </>
      ),
      links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/customer-segmentation" }
  ]
    },
  
    {
      title: 'Portfolio Optimizer with ESG Integration',
      summary: 'Created a Streamlit app for portfolio optimization under ESG score constraints with interactive visualizations and modern portfolio theory.',
      duration: 'Add duration here',
      techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'ESG Data'],
      details: (
        <>
          <p><strong>Situation:</strong> Investors wanted to optimize portfolios balancing financial returns and ESG scores.</p>
          <p><strong>Problem:</strong> No simple tools to incorporate ESG constraints in portfolio optimization.</p>
          <p><strong>Action:</strong> Developed an app to input portfolios, fetch historical data, optimize using mean-variance, and visualize results.</p>
          <p><strong>Result:</strong> Enabled sustainable investing with quantified risk-return tradeoffs.</p>
          <p><strong>What I Learned:</strong> Portfolio theory application, ESG data integration, and UI for complex financial modeling.</p>
          <p><strong>Tech Stack:</strong> Python, Streamlit, Pandas, NumPy</p>
        </>
      ),
      links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/esg-score-optimizer.git" }
  ]
    },
  
    {
      title: 'Personal Portfolio Website',
      summary: 'Designed and developed a responsive portfolio website to showcase my projects, skills, and creative identity.',
      duration: 'March 2025 – April 2025',
      techStack: ['React', 'Lottie', 'JavaScript', 'GitHub Pages', 'CSS Modules'],
      details: (
        <>
          <p><strong>Situation:</strong> I needed a centralized, professional platform to present my projects, background, and technical capabilities in a personalized and interactive way.</p>
          <p><strong>Problem:</strong> Traditional resumes and static sites felt too limiting for conveying creativity, technical depth, and dynamic content.</p>
          <p><strong>Action:</strong> Built a fully responsive React-based website, integrated Lottie animations for interactive visuals, and deployed via GitHub Pages for easy public access.</p>
          <p><strong>Result:</strong> Created a dynamic, engaging online presence that reflects both my personality and skillset, while making it easy for collaborators and recruiters to explore my work.</p>
          <p><strong>What I Learned:</strong> Component-based UI design, animation integration using Lottie, cross-device responsiveness, and deploying React apps on static hosting platforms like GitHub Pages.</p>
        </>
      ),
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/website.git' },
        { label: 'Live demo', url: 'https://synamalhan.github.io/website/' },
        ],
    },
    {
        title: 'Gamify Life – Productivity To-Do App',
        summary: 'Built a personal productivity tracker with a reward system to gamify daily tasks and monitor indulgences.',
        duration: 'February 2025 – March 2025',
        techStack: ['Python', 'Streamlit', 'Supabase', 'PostgreSQL'],
        details: (
          <>
            <p><strong>Situation:</strong> I wanted a simple yet motivating way to track my productivity, habits, and indulgences without relying on generic apps.</p>
            <p><strong>Problem:</strong> Existing to-do list apps lacked personalization and reward systems tailored to my daily routines and goals.</p>
            <p><strong>Action:</strong> Developed a lightweight Streamlit app backed by Supabase to manage tasks and assign reward points based on task completion, penalties for indulgences, and daily summaries.</p>
            <p><strong>Result:</strong> Improved self-awareness and task consistency through a personalized, gamified approach to productivity tracking.</p>
            <p><strong>What I Learned:</strong> Backend integration using Supabase, state management in Streamlit, user interface design for utility-focused apps, and balancing personal goals with behavioral feedback systems.</p>
          </>
        ),
        images: G, // Replace with your image import variable
      links:[
        { label: 'GitHub Repo', url: 'https://github.com/synamalhan/gamify-life.git' },
        { label: 'Live demo', url: 'https://youtu.be/yQi9CLcjFig' },
        ],
    },
  {
  title: "Project Creator with Local LLM Integration",
  summary: "Automates the creation of formatted project entries for a portfolio website, using a local language model to generate summaries in JSX format.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> This is a personal learning project designed to automate the creation of formatted project entries for a portfolio website.</p>
      <p><b>Problem:</b> The tool uses a free local LLM (via Ollama or similar) for generating project summaries in a consistent JSX format, ensuring minimal manual formatting required.</p>
      <p><b>Action:</b> Given a project README or description text, the tool takes raw input and exports the generated project entry ready to be added into a React projects array.</p>
      <p><b>Result:</b> The result is a well-structured project object that can be directly appended to a React/JSX projects list, maintaining personal portfolio project lists with minimal manual formatting.</p>
      <p><b>What I Learned:</b> New skills or tools learned through this project include integrating local LLMs for generating summaries in JSX format.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/project-formatter.git" },
  ]
},,
  {
  title: "US Census Data Project",
  summary: "Analyzing and visualizing data from the US Census to provide insights into demographic, economic, and geographic trends across the United States.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> This project is focused on analyzing and visualizing data from the US Census.</p>
      <p><b>Problem:</b> To provide insights into demographic, economic, and geographic trends across the United States.</p>
      <p><b>Action:</b> Data collection and preprocessing, exploratory data analysis, interactive visualizations, and customizable reports were built to achieve this goal.</p>
      <p><b>Result:</b> The project provides valuable insights into demographic, economic, and geographic trends across the United States.</p>
      <p><b>What I Learned:</b> New skills and tools were acquired through this project.</p>
      <p><b>Tech Stack:</b>Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/us-census-stats" },
  ]
},
{
  title: "The Untold Legacy of Bayard Rustin",
  summary: "A digital tribute to one of the most influential yet overlooked figures in the American civil rights movement.",
  techStack: ["React", "Javacript", "Vercel", "Tailwind CSS"],
  details: (
    <>
      <p><b>Situation:</b> Hackathon focused on exploring and celebrating history.</p>
      <p><b>Problem:</b> Highlighting lesser-known figures who have made significant contributions to society.</p>
      <p><b>Action:</b> Created a digital tribute to Bayard Rustin, an unsung hero of the civil rights movement.</p>
      <p><b>Result:</b> Shed light on the importance of recognizing all voices in history, especially those who have been marginalized.</p>
      <p><b>What I Learned:</b> New skills and tools gained through using React for a dynamic and interactive user experience, Tailwind CSS for rapid and responsive design, and JavaScript (ES6+) for logic and interactivity.</p>
      <p><b>Tech Stack:</b> React, Javascript</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/hackstory.git" } // Note: GitHub repo URL is not provided in the README
  ]
},
{
  title: "Finance Helper",
  summary: "A personal project designed to simplify and automate common financial tasks.",
  techStack: ["Streamlit", "Python", "LLM", "FRED API"],
  details: (
    <>
      <p><b>Situation:</b> Many people struggle to keep track of their spending and savings.</p>
      <p><b>Problem:</b> Manual financial management can be challenging.</p>
      <p><b>Action:</b> Finance Helper provides an easy-to-use tool to automate expense tracking, budget management, and financial analytics.</p>
      <p><b>Result:</b> Empowering users to make informed financial decisions and achieve their financial goals.</p>
      <p><b>What I Learned:</b> Created a project for a new demographic</p>
      <p><b>Tech Stack:</b> Streamlit, Python, LLM, FRED API</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/finance-assist" },
  ]
},
{
  title: "Career Pilot",
  summary: "A personal project designed to help users navigate and manage their career growth, job applications, and professional development.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> As a professional looking to advance in my career, I wanted to create a tool that helps me stay organized and focused.</p>
      <p><b>Problem:</b> Managing job applications, setting career goals, and keeping track of progress can be overwhelming without a centralized system.</p>
      <p><b>Action:</b> I built Career Pilot, a web application that allows users to track job applications and interviews, set career goals and milestones, organize professional documents and notes, and visualize progress with charts and timelines.</p>
      <p><b>Result:</b> With Career Pilot, users can gain clarity on their career path, streamline their job search process, and make data-driven decisions for future growth.</p>
      <p><b>What I Learned:</b> I learned about the importance of user-centered design, the value of project management tools, and the power of data visualization in helping professionals achieve their goals.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/career-pilot" },
  ]
},
{
  title: "Haunted Escape Room (React)",
  summary: "A silly little horror escape room game built with React — full of creaky doors, creepy riddles, and a time limit that’ll trap you forever... or at least until you refresh.",
  techStack: ["React", "CSS", "MP3 sound effects", "Local images"],
  details: (
    <>
      <p><b>Situation:</b> You’re trapped in a haunted house and must solve a series of eerie puzzles before time runs out.</p>
      <p><b>Problem:</b> If you guess wrong, the ghosts get louder. If you guess right, the door creaks open and you move on.</p>
      <p><b>Action:</b> Finish all rooms to escape... or join the spirits.</p>
      <p><b>Result:</b> A final “You Escaped!” screen</p>
      <p><b>What I Learned:</b> Just a fun project to pass time.</p>
      <p><b>Tech Stack:</b> React, CSS, MP3 sound effects, Local images</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/escape-room" }
  ]
},
  {
  title: "The Ten Dollar Founding Father Without a Father",
  summary: "An agentic Retrieval-Augmented Generation (RAG) system built for fun, using the characters from Hamilton: The Musical as its knowledge base.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> This project is an agentic Retrieval-Augmented Generation (RAG) system built for fun, using the characters from *Hamilton: The Musical* as its knowledge base.</p>
      <p><b>Problem:</b> None specified</p>
      <p><b>Action:</b> Built using Neo4j Database, Streamlit, Ollama, and LangGraph.</p>
      <p><b>Result:</b> Provided an interactive web interface for agentic workflows and RAG pipelines.</p>
      <p><b>What I Learned:</b> New skills or tools not specified</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/the-ten-dollar-founding-father-without-a-father-got-a-lot-further-by-working-a-lot-harder.git" },
  ]
},
{
  title: "MindScape — Your Personalized Wellness Companion",
  summary: "A full-stack AI-powered wellness journal built by students, for students. It uses sentiment analysis and local LLMs (via Ollama) to suggest personalized, mindful actions to help you navigate your emotional landscape.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> Students built a full-stack AI-powered wellness journal.</p>
      <p><b>Problem:</b> To provide students with a personalized wellness companion that utilizes sentiment analysis and local LLMs to suggest mindful actions.</p>
      <p><b>Action:</b> Built a full-stack AI-powered wellness journal using React for the frontend, FastAPI for the backend, HuggingFace Transformers for sentiment detection, Ollama + Mistral LLM for agentic suggestions, and Python for overall development.</p>
      <p><b>Result:</b> A personalized wellness companion that suggests mindful actions based on user entries and sentiments.</p>
      <p><b>What I Learned:</b> New skills in React, FastAPI, HuggingFace Transformers, Ollama + Mistral LLM, and Python.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/mind-scape" },
  ]
},
{
  title: "Wellness Journal",
  summary: "A simple and colorful iOS app to track your daily mood and thoughts.",
  techStack: ["SwiftUI", "Xcode"],
  details: (
    <>
      <p><b>Situation:</b> Built with SwiftUI, this app helps you journal your feelings easily and keep past entries organized.</p>
      <p><b>Problem:</b> None specified</p>
      <p><b>Action:</b> Allows users to select their mood using emoji buttons, write notes in a clean text editor, save entries locally on the device, view past entries in a colorful list, and more.</p>
      <p><b>Result:</b> Users can easily track their daily moods and thoughts, with features like responsive UI and customizable colors.</p>
      <p><b>What I Learned:</b> Not specified</p>
      <p><b>Tech Stack:</b> SwiftUI, Xcode</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/wellness-journal-ios.git" }
  ]
},
  {
  title: "TapFast – A Rapid Tapping Game for Apple Watch",
  summary: "A lightweight, fast-paced tapping game designed for watchOS. The goal is simple: tap the circle as many times as you can in 5 seconds. It's a fun way to test your reaction speed and challenge your friends — right from your wrist!",
  techStack: ["SwiftUI", "WatchKit", "Xcode 15+"],
  details: (
    <>
      <p><b>Situation:</b> A rapid tapping game designed for watchOS.</p>
      <p><b>Problem:</b> None mentioned.</p>
      <p><b>Action:</b> Built with SwiftUI, WatchKit, and Xcode 15+.</p>
      <p><b>Result:</b> A fun way to test your reaction speed and challenge your friends — right from your wrist!</p>
      <p><b>What I Learned:</b> Building a watchOS game using SwiftUI and WatchKit.</p>
      <p><b>Tech Stack:</b> SwiftUI, WatchKit, Xcode 15+</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/tap-fast-watch-OS.git" }
  ]
},
{
  title: "Mental Health Bridge",
  summary: "A Streamlit app to help simulate and improve sensitive conversations about mental health between children and their parents.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> Many parents and children struggle to talk about mental health due to generational gaps, emotional barriers, and different communication styles.</p>
      <p><b>Problem:</b> This tool helps you practice, prepare, and improve those difficult conversations with empathy and realism.</p>
      <p><b>Action:</b> Uses Ollama to run the Mistral model locally, providing real-time responses powered by a prompt-based interaction with the model.</p>
      <p><b>Result:</b> Enhances emotional understanding using AI.</p>
      <p><b>What I Learned:</b> New skills or tools include fine-tuning the simulated behavior using sensitivity level, common reactions, and preferred tone.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/mental-bridge" }
  ]
},

{
  title: "AI Research Paper Summarizer",
  summary: "An interactive web app to generate concise summaries of research papers in PDF format using state-of-the-art AI models.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> An interactive web app to generate concise summaries of research papers in PDF format using state-of-the-art AI models.</p>
      <p><b>Problem:</b> Extracting full text from large documents for reliable summarization.</p>
      <p><b>Action:</b> Generate abstractive summaries using HuggingFace's BART model and adjustable summary length and chunk size via sidebar controls.</p>
      <p><b>Result:</b> Preview extracted text and generated summary within the app, and download the summary as a plain text file.</p>
      <p><b>What I Learned:</b> Built with Streamlit for a responsive and clean UI.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/research-paper-summarizer" },
  ]
},
{
  title: "Streamlit Resume Builder with PDF Export",
  summary: "A clean, no-fuss interface to build, edit, organize, and export your resume without the hassle of formatting issues or clunky document editors.",
  techStack: ["Streamlit", "fpdf", "streamlit-pdf-viewer", "Python"],
  details: (
    <>
      <p><b>Situation:</b> A clean, no-fuss interface to build, edit, organize, and export your resume without the hassle of formatting issues or clunky document editors.</p>
      <p><b>Problem:</b> I always dreaded the process of updating my resume — messing with formatting, spacing, ordering, and layout in Word or LaTeX.</p>
      <p><b>Action:</b> This app was built as a better way to manage resume content: No worrying about line breaks or alignment. Just enter your details, adjust order, and export a clean, professional PDF. Update JSON once and reuse forever.</p>
      <p><b>Result:</b> A simple, intuitive interface that makes updating your resume a breeze!</p>
      <p><b>What I Learned:</b> The importance of streamlining the resume-building process and providing users with a seamless experience.</p>
      <p><b>Tech Stack:</b> Streamlit, fpdf, streamlit-pdf-viewer, Python</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/resume-formatter" }
  ]
},
{
  title: "CareSketch",
  summary: "AI-powered care planning assistant built for social good.",
  techStack: ["Streamlit", "Ollama", "Plotly", "FPDF/ReportLab", "Custom rule-based logic"],
  details: (
    <>
      <p><b>Situation:</b> An AI-powered care planning assistant built for social good.</p>
      <p><b>Problem:</b> Helps caregivers create personalized, goal-based daily care plans from natural language descriptions, enriched with emotion-aware context, risk detection, interactive scheduling, and exportable summaries.</p>
      <p><b>Action:</b> Built during the Hack the Vibe 2025 hackathon, CareSketch focuses on empowering non-technical caregivers to deliver thoughtful, informed, and emotionally supportive care.</p>
      <p><b>Result:</b> CareSketch generates detailed care plans from simple English descriptions, customizable based on goals (e.g., pain relief, mobility) and emotional state.</p>
      <p><b>What I Learned:</b> New skills or tools include conversational emotional support, risk detection, interactive timeline, PDF export, and a beautiful UI.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/care-sketch" },
  ]
},
{
  title: "Ocean Pollution Tracker",
  summary: "A project aimed at monitoring, visualizing, and raising awareness about pollution in the world's oceans.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> The ocean is facing a significant problem due to human activities.</p>
      <p><b>Problem:</b> Pollution in the ocean has severe impacts on marine life, ecosystems, and ultimately, our planet.</p>
      <p><b>Action:</b> This project collects, analyzes, and displays data related to various types of ocean pollutants, helping users understand the impact and distribution of pollution globally.</p>
      <p><b>Result:</b> The application provides interactive maps, analytics dashboards, and educational resources to raise awareness and promote action against ocean pollution.</p>
      <p><b>What I Learned:</b> This project taught me about data collection, API integration, and the importance of visualization in understanding complex environmental issues.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/ocean-pollution-tracker" }
  ]
},

];

  export default projects;
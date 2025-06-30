const projects = [
  {
  badge: "",
  title: "FrozenLake Q-Learning Agent",
  summary: "A simple yet effective reinforcement learning agent that learns to navigate the FrozenLake environment using Q-Learning.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> A simple yet effective reinforcement learning agent was trained to navigate a frozen 4x4 grid and reach the goal while avoiding holes.</p>
      <p><b>Problem:</b> The agent had to learn to balance exploration vs exploitation to successfully solve the FrozenLake environment using the Q-Learning algorithm.</p>
      <p><b>Action:</b> The agent used a Q-table based learning loop to train an optimal policy for navigating the grid and reaching the goal.</p>
      <p><b>Result:</b> The agent successfully learned to reach the goal with near-perfect consistency after training on 20,000 episodes.</p>
      <p><b>What I Learned:</b> How Q-learning works under the hood, the importance of balancing exploration vs exploitation, how to tune hyperparameters for convergence, and visualizing RL performance using reward curves.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/frozenlake-q-learning.git" }
  ]
},{
  badge: "🎨",
  title: "K-Means Image Compressor",
  summary: "A Streamlit app that compresses images using K-Means clustering by reducing the number of unique colors. Perfect for visualizing how unsupervised learning works!",
  techStack: ["Streamlit", "scikit-learn", "PIL", "NumPy"],
  details: (
    <>
      <p><b>Situation:</b> A Streamlit app that compresses images using K-Means clustering by reducing the number of unique colors.</p>
      <p><b>Problem:</b> Each pixel is treated as a point in 3D RGB space. K-Means groups pixels into k clusters based on color similarity.</p>
      <p><b>Action:</b> Each pixel is replaced by the centroid color of its cluster. The image is reconstructed with fewer unique colors, reducing file size.</p>
      <p><b>Result:</b> Perfect for visualizing how unsupervised learning works!</p>
      <p><b>What I Learned:</b> Built with ❤️ using Streamlit, scikit-learn, PIL, and NumPy.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/k-means-image-compressor.git" },
  ]
},{
  badge: "",
  title: "GitHub LinkedIn Post Generator",
  summary: "Transform your GitHub activity into engaging LinkedIn posts using AI! This Streamlit application fetches your recent GitHub repositories and commits, then uses Ollama (local LLM) to generate professional LinkedIn posts.",
  techStack: ["Python", "Ollama"],
  details: (
    <>
      <p><b>Situation:</b> Fetches repositories, commits, and README content</p>
      <p><b>Problem:</b> Analyze activity within any date range</p>
      <p><b>Action:</b> Select spotlight vs supporting projects</p>
      <p><b>Result:</b> Uses Ollama for human-sounding LinkedIn posts</p>
      <p><b>What I Learned:</b> Includes emojis, highlights, links, and hashtags</p>
      <p><b>Tech Stack:</b> Python 3.8+, Ollama</p>
    </>
  ),
  links: [
    { label: "GitHub Repository", url: "https://github.com/synamalhan/git-post" },
  ]
},{
  badge: "",
  title: "FaceTrack - Advanced Facial Recognition Attendance System",
  summary: "A cutting-edge facial recognition attendance management system combining modern web technologies with AI-powered biometric identification.",
  techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  details: (
    <>
      <p><b>Situation:</b> A need for a reliable and efficient attendance tracking solution.</p>
      <p><b>Problem:</b> Traditional methods of attendance tracking were time-consuming, error-prone, and lacked real-time analytics.</p>
      <p><b>Action:</b> Developed an AI-powered facial recognition attendance management system with a stunning dark purple interface designed for professional environments.</p>
      <p><b>Result:</b> Achieved accurate, real-time attendance tracking, comprehensive reporting, and enhanced employee experience.</p>
      <p><b>What I Learned:</b> New skills in AI-powered biometric identification, TypeScript development, and responsive design.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/facial-attendance" },
  ]
},{
  badge: "",
  title: "Drag & Drop JSON Editor",
  summary: "A simple React application for visually editing JSON data using drag-and-drop. Easily rearrange, add, or remove fields in your JSON structure.",
  techStack: ["React", "Node.js"],
  details: (
    <>
      <p><b>Situation:</b> A simple React application for visually editing JSON data.</p>
      <p><b>Problem:</b> To provide an intuitive way to create, edit, and manage JSON data.</p>
      <p><b>Action:</b> Built a React app that allows users to drag and drop fields, add or remove fields dynamically, and preview the JSON in real-time.</p>
      <p><b>Result:</b> A user-friendly application for editing JSON data, making it easier for developers to manage their project's configuration files.</p>
      <p><b>What I Learned:</b> React, Node.js, npm</p>
      <p><b>Tech Stack:</b> React, Node.js, npm</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/drag-drop-json" },
  ]
},{
  badge: "🏆 Hackathon Winner 🏆",
  title: "EduFlex+ Educational Learning Platform",
  summary: "A modern, AI-powered educational platform that adapts to your emotional state and learning style. Built with React, TypeScript, and integrated with Ollama for local AI processing.",
  techStack: ["React", "TypeScript"],
  details: (
    <>
      <p><b>Situation:</b> A modern, AI-powered educational platform.</p>
      <p><b>Problem:</b> None mentioned.</p>
      <p><b>Action:</b> Built with React, TypeScript, and integrated with Ollama for local AI processing.</p>
      <p><b>Result:</b> Adapts to your emotional state and learning style.</p>
      <p><b>What I Learned:</b> New skills or tools not mentioned.</p>
      <p><b>Tech Stack:</b> React, TypeScript, Tailwind CSS, Framer Motion, React Router, Lucide React</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/eduflex-plus" },
  ]
},{
  badge: "",
  title: "CuraMind - AI-Powered Mental Health Support",
  summary: "Empathetic, multilingual mental health chatbot that works offline",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> Empathetic, multilingual mental health chatbot designed to provide accessible, empathetic mental health assistance to users worldwide.</p>
      <p><b>Problem:</b> Mental health support is expensive and not available 24/7, language barriers exist, offline limitations hinder access, immediate help is needed for crisis situations, and users need to track their emotional wellbeing over time.</p>
      <p><b>Action:</b> Built an innovative mental health support chatbot that works offline, supports multiple languages, and provides empathetic responses tailored to user's emotional state.</p>
      <p><b>Result:</b> Provides accessible, inclusive, and personalized mental health assistance to users worldwide.</p>
      <p><b>What I Learned:</b> New skills in AI/ML, natural language processing, and human-computer interaction.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/curamind" },
  ]
},{
    badge: "🏆 Hackathon Winner 🏆",
title: "CareSketch",
    summary: "AI-powered care planning assistant built for social good.",
    duration: undefined,
    techStack: ["Streamlit","Ollama","Plotly","FPDF/ReportLab","Custom rule-based logic"],
    details: (<>
  <p><strong>Situation:</strong>  An AI-powered care planning assistant built for social good.</p>
  <p><strong>Problem:</strong>  Helps caregivers create personalized, goal-based daily care plans from natural language descriptions, enriched with emotion-aware context, risk detection, interactive scheduling, and exportable summaries.</p>
  <p><strong>Action:</strong>  Built during the Hack the Vibe 2025 hackathon, CareSketch focuses on empowering non-technical caregivers to deliver thoughtful, informed, and emotionally supportive care.</p>
  <p><strong>Result:</strong>  CareSketch generates detailed care plans from simple English descriptions, customizable based on goals (e.g., pain relief, mobility) and emotional state.</p>
  <p><strong>What I Learned:</strong>  New skills or tools include conversational emotional support, risk detection, interactive timeline, PDF export, and a beautiful UI.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/care-sketch"
  }
]
  },
  {
    badge: "💼 Internship Project 💼",
title: "Text-Optimized Image Generation Model",
    summary: "Custom-trained diffusion model optimized for rendering clean text in images.",
    duration: undefined,
    techStack: ["Python","HuggingFace","Diffusers","PyTorch","LoRA","Stable Diffusion"],
    details: (<>
  <p><strong>Situation:</strong>  Most generative models struggle to render readable text, especially for posters, infographics, or form layouts.</p>
  <p><strong>Problem:</strong>  Needed a model that could reliably generate images with embedded text (labels, signs, form fields) without visual artifacts.</p>
  <p><strong>Action:</strong>  Fine-tuned a Stable Diffusion model with LoRA on a curated dataset of labeled visuals, including mock forms and text-heavy UI components. Implemented specialized loss functions to prioritize text clarity.</p>
  <p><strong>Result:</strong>  Achieved significantly higher OCR accuracy and visual clarity in generated samples compared to baseline SD models, useful for OCR training data and UI prototyping.</p>
  <p><strong>What I Learned:</strong>  Gained hands-on experience with diffusion model finetuning, LoRA adapters, and domain-specific prompt engineering for visual clarity.</p>
  <p><strong>Tech Stack:</strong>  Python, HuggingFace, Diffusers, PyTorch, LoRA, Stable Diffusion</p>
</>),
    links: []
  },
  {
    badge: "💼 Internship Project 💼",
title: "Credit Risk RAG Model",
    summary: "RAG-based credit risk assessment system using LangGraph and Neo4j.",
    duration: undefined,
    techStack: ["Python","Streamlit","Neo4j","LangGraph","Ollama","Pandas"],
    details: (<>
  <p><strong>Situation:</strong>  Financial institutions need contextual credit insights combining structured data and regulatory knowledge.</p>
  <p><strong>Problem:</strong>  Traditional ML models lack explainability and fail to incorporate dynamic knowledge like economic updates or policy changes.</p>
  <p><strong>Action:</strong>  Built a Retrieval-Augmented Generation (RAG) system using LangGraph for reasoning, Ollama for LLM inference, Neo4j for a knowledge graph of credit rules and relationships, and Streamlit for an interactive UI.</p>
  <p><strong>Result:</strong>  Delivered explainable credit decisions with dynamic reasoning paths and interactive inspection of graph-based factors.</p>
  <p><strong>What I Learned:</strong>  Learned how to design modular RAG workflows using LangGraph, build domain-specific graph schemas in Neo4j, and connect them to LLM pipelines.</p>
  <p><strong>Tech Stack:</strong>  Python, Streamlit, Neo4j, LangGraph, Ollama, Pandas</p>
</>),
    links: []
  },
  {
    badge: "",
title: "AI Research Paper Summarizer",
    summary: "An interactive web app to generate concise summaries of research papers in PDF format using state-of-the-art AI models.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  An interactive web app to generate concise summaries of research papers in PDF format using state-of-the-art AI models.</p>
  <p><strong>Problem:</strong>  Extracting full text from large documents for reliable summarization.</p>
  <p><strong>Action:</strong>  Generate abstractive summaries using HuggingFace's BART model and adjustable summary length and chunk size via sidebar controls.</p>
  <p><strong>Result:</strong>  Preview extracted text and generated summary within the app, and download the summary as a plain text file.</p>
  <p><strong>What I Learned:</strong>  Built with Streamlit for a responsive and clean UI.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/research-paper-summarizer"
  }
]
  },
  {
    badge: "",
title: "MediHub Platform",
    summary: "The Future of Medical Education",
    duration: undefined,
    techStack: ["React","TypeScript","Vite","Tailwind CSS","Zustand","Supabase"],
    details: (<>
  <p><strong>Situation:</strong>  The MediHub platform is a modern, AI-powered web platform designed for medical students and professionals.</p>
  <p><strong>Problem:</strong>  The platform consolidates patient simulators, adaptive flashcards, research summarization, mnemonics, deadline tracking, and advanced analytics into a single, intelligent system.</p>
  <p><strong>Action:</strong>  Built with React, TypeScript, Vite, Tailwind CSS, Zustand, and Supabase, MediHub leverages state-of-the-art AI/ML models and a robust subscription/paywall system to deliver a best-in-class learning experience.</p>
  <p><strong>Result:</strong>  The platform provides a comprehensive and engaging educational experience for medical professionals and students.</p>
  <p><strong>What I Learned:</strong>  Developed new skills in AI/ML, React, and Supabase.</p>
  <p><strong>Tech Stack:</strong>  React, TypeScript, Vite, Tailwind CSS, Zustand, Supabase</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/medi-hub.git"
  }
]
  },
  {
    badge: "💼 Internship Project 💼",
title: "Last Point Distribution Analysis",
    summary: "Optimized dispatch operations with K-means clustering and real-time cost calculations, improving delivery efficiency.",
    duration: "May 2024 – July 2024",
    techStack: ["Python","Streamlit","K-means Clustering","Folium"],
    details: (<>
  <p><strong>Situation:</strong>  The dispatch team faced inefficient routing and unclear clustering of delivery points.</p>
  <p><strong>Problem:</strong>  Poorly defined last-mile delivery zones caused high delivery times and costs.</p>
  <p><strong>Action:</strong>  I applied K-means clustering to optimize distribution zones, used Folium for geospatial visualizations, and integrated cost calculators in a Streamlit dashboard.</p>
  <p><strong>Result:</strong>  Reduced average delivery path overlap and improved logistical efficiency.</p>
  <p><strong>What I Learned:</strong>  Real-world clustering application, map-based insights using Folium, and integrating business cost metrics with ML pipelines.</p>
  <p><strong>Tech Stack:</strong>  Python, Streamlit, K-means, Folium</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/dispatch_optimization_FG_forecasting"
  }
]
  },
  {
    badge: "💼 Internship Project 💼",
title: "Blast Furnace Lab Automation",
    summary: "Developed a full-stack web portal to automate and streamline lab processes, improving data management and operational efficiency.",
    duration: "Add project duration here",
    techStack: ["AngularJS","Spring Boot","SQL","Apache Tomcat"],
    details: (<>
  <p><strong>Situation:</strong>  Lab processes in a blast furnace environment were manual and fragmented, causing inefficiencies.</p>
  <p><strong>Problem:</strong>  Lack of centralized data management and real-time connectivity across lab operations.</p>
  <p><strong>Action:</strong>  Built a comprehensive web portal using AngularJS and Spring Boot, integrated multiple lab workflows, and deployed on scalable cloud platforms.</p>
  <p><strong>Result:</strong>  Improved operational efficiency, centralized data access, and enabled scalable, high-performance lab automation.</p>
  <p><strong>What I Learned:</strong>  Full-stack web development for industrial applications, system integration, scalable backend architecture, and the importance of collaboration and rigorous testing.</p>
</>),
    links: undefined
  },
  {
    badge: "💼 Internship Project 💼",
title: "Plate Mill FG Forecasting",
    summary: "Deployed predictive models to forecast finished goods, improving dispatch planning.",
    duration: "May 2024 – July 2024",
    techStack: ["Python","XGBoost","ARIMA","Prophet","Random Forest"],
    details: (<>
  <p><strong>Situation:</strong>  Forecasting was done manually, leading to inefficiencies.</p>
  <p><strong>Problem:</strong>  Dispatch planning lacked accurate predictive backing.</p>
  <p><strong>Action:</strong>  Trained time series models (ARIMA, Prophet) and ensemble methods (XGBoost, RF) to forecast weekly finished goods inventory.</p>
  <p><strong>Result:</strong>  Improved forecast accuracy by 30%, enabling better production scheduling.</p>
  <p><strong>What I Learned:</strong>  Handling seasonality in time series, comparing predictive model performance, and delivering actionable insights for supply chain teams.</p>
  <p><strong>Tech Stack:</strong>  Python, XGBoost, ARIMA, Prophet, Random Forest</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/dispatch_optimization_FG_forecasting"
  }
]
  },
  {
    badge: "🏆 Hackathon Winner 🏆",
title: "CropGenius",
    summary: "Developed CropGenius to provide 100% accurate crop recommendations using XGBoost and Random Forest.",
    duration: "July 2024",
    techStack: ["XGBoost","Random Forest","Streamlit","Weather API"],
    details: (<>
  <p><strong>Situation:</strong>  Farmers needed region-specific crop recommendations based on soil and weather data.</p>
  <p><strong>Problem:</strong>  Traditional recommendation systems lacked accuracy and context.</p>
  <p><strong>Action:</strong>  Trained ML models using agri-datasets and weather API data, deployed via Streamlit app.</p>
  <p><strong>Result:</strong>  Achieved 100% recommendation accuracy on validation datasets and real use cases.</p>
  <p><strong>What I Learned:</strong>  API integration in ML apps, agriculture-specific ML pipelines, and building explainable UIs for domain experts.</p>
  <p><strong>Tech Stack:</strong>  XGBoost, Random Forest, Streamlit, Weather API</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/ai-crop-optimizer"
  },
  {
    "label": "Demo",
    "url": "https://youtu.be/030IplDlcBU"
  }
]
  },
  {
  badge: "",
  title: "NutriSnap Food Nutrition Database",
  summary: "A simple and structured database mapping common food items to their average macronutrient values per 100 grams, designed to work with object detection outputs from a custom-trained YOLOv8 model that recognizes 43 different food classes.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> This repository contains `food_db.csv`, a simple and structured database mapping common food items to their average macronutrient values per 100 grams.</p>
      <p><b>Problem:</b> It is designed to work with object detection outputs from a custom-trained YOLOv8 model that recognizes 43 different food classes.</p>
      <p><b>Action:</b> The database contains the following columns: `name`, `calories`, `protein`, `carbs`, and `fat`.</p>
      <p><b>Result:</b> This allows for enrichment of YOLO detection results with nutritional values in the NutriSnap app.</p>
      <p><b>What I Learned:</b> New skills or tools learned during this project include training a custom YOLOv8 model using Ultralytics and evaluating precision, recall, and mAP.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/nutri-snap" },
        { label: "Colab Notebook", url: "https://colab.research.google.com/drive/1Y5GDv7qWGL0madaaDbmPs7X2Bj17yo0x?usp=sharing" },

  ]
},
  {
    badge: "💼 Internship Project 💼",
title: "Slab Sizing",
    summary: "Optimized computer vision algorithms using YOLO, increasing measurement accuracy by 80%.",
    duration: "June 2024 – Aug 2024",
    techStack: ["Ultralytics","YOLO","Python","FastSAM"],
    details: (<>
  <p><strong>Situation:</strong>  Manual measurement of steel slabs was time-consuming and inconsistent.</p>
  <p><strong>Problem:</strong>  Automated image-based sizing models lacked precision under different lighting and angle conditions.</p>
  <p><strong>Action:</strong>  Fine-tuned YOLO and FastSAM models for precise object detection, ran benchmarking tests across multiple conditions.</p>
  <p><strong>Result:</strong>  Boosted measurement accuracy by 80% and reduced time-to-insight drastically.</p>
  <p><strong>What I Learned:</strong>  Real-world edge cases in CV, model fine-tuning and dataset augmentation techniques for YOLO pipelines.</p>
  <p><strong>Tech Stack:</strong>  YOLO, Ultralytics, Python, FastSAM</p>
</>),
    links: undefined
  },
  {
    badge: "",
title: "Options Pricing and Risk Assessment Tool",
    summary: "Developed financial tool to calculate option pricing using Monte Carlo simulations and Black-Scholes.",
    duration: "Dec 2024",
    techStack: ["Python","Streamlit","Monte Carlo","Black-Scholes"],
    details: (<>
  <p><strong>Situation:</strong>  Finance students and analysts needed a simulation-based learning and risk evaluation tool.</p>
  <p><strong>Problem:</strong>  Existing tools were either non-interactive or lacked risk measures.</p>
  <p><strong>Action:</strong>  Built a Streamlit dashboard to price options using Monte Carlo & Black-Scholes, added VaR/ES risk metrics.</p>
  <p><strong>Result:</strong>  Helped users visualize pricing dynamics and perform scenario-based risk analysis.</p>
  <p><strong>What I Learned:</strong>  Applied quantitative finance concepts programmatically and learned to simplify financial modeling for UI/UX.</p>
  <p><strong>Tech Stack:</strong>  Python, Monte Carlo, Black-Scholes, Streamlit</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/option-pricing.git"
  },
  {
    "label": "Demo",
    "url": "https://youtu.be/HZKh0vNGbHU"
  }
]
  },
  {
    badge: "",
title: "Wildlife Monitoring and Conservation",
    summary: "Automated detection and monitoring of wildlife using YOLO/Faster R-CNN and SAM/FastSAM for segmentation.",
    duration: "Dec 2024",
    techStack: ["YOLO","Faster R-CNN","SAM","FastSAM","Python"],
    details: (<>
  <p><strong>Situation:</strong>  Manual tracking of endangered species was inefficient and prone to error.</p>
  <p><strong>Problem:</strong>  Needed automated monitoring using satellite and camera trap imagery.</p>
  <p><strong>Action:</strong>  Used YOLO/Faster R-CNN for detection, SAM-based models for segmentation, integrated with movement analysis system.</p>
  <p><strong>Result:</strong>  Enabled 24/7 monitoring of remote wildlife zones with over 92% accuracy.</p>
  <p><strong>What I Learned:</strong>  Model ensemble in CV tasks, wildlife-specific edge cases, importance of scalable ecological solutions.</p>
  <p><strong>Tech Stack:</strong>  YOLO, Faster R-CNN, SAM, FastSAM, Python</p>
</>),
    links: undefined
  },
  {
    badge: "",
title: "Medical Image Analysis for Early Brain Tumor Detection",
    summary: "Developed CNN model to detect anomalies in medical images (Brain Tumor) using U-Net for segmentation.",
    duration: "Jan 2025",
    techStack: ["TensorFlow","Keras","U-Net","ResNet","VGG"],
    details: (<>
  <p><strong>Situation:</strong>  Early detection of tumors and fractures in radiology scans was inconsistent.</p>
  <p><strong>Problem:</strong>  High false negatives in automated diagnosis models.</p>
  <p><strong>Action:</strong>  Trained U-Net for segmentation and ResNet/VGG for classification on MRI and X-ray datasets.</p>
  <p><strong>Result:</strong>  Reduced false negative rate by 35% while maintaining over 90% precision.</p>
  <p><strong>What I Learned:</strong>  Importance of segmentation before classification, medical data preprocessing challenges, and evaluation techniques.</p>
  <p><strong>Tech Stack:</strong>  TensorFlow, Keras, U-Net, ResNet, VGG</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/brain-tumor-cnn.git"
  }
]
  },
  {
    badge: "",
title: "Portfolio Analyzer and Stock Prediction Dashboard",
    summary: "Streamlit app for portfolio management with real-time tracking and ML-driven stock price predictions.",
    duration: "Dec 2024",
    techStack: ["Python","Streamlit","Random Forest","LSTM","Plotly"],
    details: (<>
  <p><strong>Situation:</strong>  Investors wanted a tool that combined analytics with price forecasting.</p>
  <p><strong>Problem:</strong>  Most dashboards lacked predictive capability or usable UI.</p>
  <p><strong>Action:</strong>  Built frontend in Streamlit, backend with LSTM/Random Forest models and integrated real-time stock APIs and financial metrics.</p>
  <p><strong>Result:</strong>  Delivered daily insights and forecasts with 87% accuracy.</p>
  <p><strong>What I Learned:</strong>  End-to-end dashboarding, combining ML forecasts with financial KPIs, user-focused design.</p>
  <p><strong>Tech Stack:</strong>  Python, Streamlit, LSTM, Random Forest, Plotly</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/stock_pred.git"
  },
  {
    "label": "Demo",
    "url": "https://youtu.be/BNgE11T8JC0"
  }
]
  },
  {
    badge: "💼 Internship Project 💼",
title: "OCR Training",
    summary: "Trained custom OCR models, improving recognition accuracy with Donut model fine-tuning.",
    duration: "July 2024 – Aug 2024",
    techStack: ["Python","Donut Model","AWS OCR","Azure OCR"],
    details: (<>
  <p><strong>Situation:</strong>  Existing OCR tools were failing on industry-specific formats like log sheets.</p>
  <p><strong>Problem:</strong>  Poor recognition accuracy of critical text fields and symbols.</p>
  <p><strong>Action:</strong>  Fine-tuned the Donut transformer-based OCR model, and benchmarked against AWS/Azure OCR APIs.</p>
  <p><strong>Result:</strong>  Increased accuracy by over 25% on key form fields.</p>
  <p><strong>What I Learned:</strong>  Custom transformer model training, OCR-specific metrics, and evaluation of commercial APIs.</p>
  <p><strong>Tech Stack:</strong>  Python, Donut Model, AWS OCR, Azure OCR</p>
</>),
    links: undefined
  },
  {
    badge: "",
title: "Emotion Detection from Images",
    summary: "Built emotion detection app using Hugging Face RoBERTa model with real-time Streamlit visualization.",
    duration: "Dec 2024",
    techStack: ["Hugging Face","RoBERTa","Streamlit","Python"],
    details: (<>
  <p><strong>Situation:</strong>  Needed a real-time tool to detect and quantify user sentiment during feedback collection.</p>
  <p><strong>Problem:</strong>  Emotion detection models lacked real-time interactivity and multi-modal feedback.</p>
  <p><strong>Action:</strong>  Used RoBERTa for text emotion classification, added image-based emotion scoring, and built an interactive dashboard in Streamlit.</p>
  <p><strong>Result:</strong>  Enabled real-time analysis of user mood and engagement from live sessions.</p>
  <p><strong>What I Learned:</strong>  Multi-modal analysis, transformer-based NLP, UX design for real-time interaction.</p>
  <p><strong>Tech Stack:</strong>  Hugging Face, RoBERTa, Python, Streamlit</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/emotion-detect.git"
  },
  {
    "label": "Demo",
    "url": "https://youtu.be/bKAJgkphZus?si=04CCDq-yPc_1qBbv"
  }
]
  },
  {
  badge: "",
title: "AI-Powered Symptom Checker",
  summary: "An interactive, AI-enhanced health tool that allows users to input symptoms and receive potential condition predictions, care advice, and real-time guidance through an integrated chatbot powered by Ollama.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> An interactive, AI-enhanced health tool that allows users to input symptoms and receive potential condition predictions, care advice, and real-time guidance through an integrated chatbot powered by Ollama.</p>
      <p><b>Problem:</b> Users can't easily get accurate symptom-based condition predictions without consulting a doctor.</p>
      <p><b>Action:</b> Built an interactive, AI-enhanced health tool that allows users to input symptoms and receive potential condition predictions, care advice, and real-time guidance through an integrated chatbot powered by Ollama.</p>
      <p><b>Result:</b> Users can get accurate symptom-based condition predictions without consulting a doctor.</p>
      <p><b>What I Learned:</b> New skills or tools used.</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/symptom-checker" },
  ]
},
  {
    badge: "",
title: "Front-end Portal",
    summary: "Built a React portal with reusable components, dynamic filters, and video previews, integrated with REST APIs and deployed on AWS Amplify.",
    duration: "Add duration here",
    techStack: ["React","AWS Amplify","REST API","JavaScript","CSS"],
    details: (<>
  <p><strong>Situation:</strong>  Needed a scalable portal with rich UX features for data display and video previews.</p>
  <p><strong>Problem:</strong>  Existing solutions lacked dynamic filtering and efficient video integration.</p>
  <p><strong>Action:</strong>  Developed custom React components, integrated multiple REST endpoints, and deployed on AWS Amplify.</p>
  <p><strong>Result:</strong>  Improved user engagement with dynamic data visualization and faster video access.</p>
  <p><strong>What I Learned:</strong>  Advanced React component design, API integration, and AWS Amplify deployment.</p>
  <p><strong>Tech Stack:</strong>  React, AWS Amplify, REST API</p>
</>),
    links: undefined
  },
  {
    badge: "",
title: "Specialized Chatbot",
    summary: "Created a React-based chatbot integrated with AWS Amplify and Cognito, with admin flow for DB management and analytics.",
    duration: "Add duration here",
    techStack: ["React","AWS Amplify","AWS Cognito","AWS Chatbot"],
    details: (<>
  <p><strong>Situation:</strong>  Needed an intelligent chatbot for customer interaction with admin controls.</p>
  <p><strong>Problem:</strong>  Lack of easy admin interface to manage chatbot data and monitor usage analytics.</p>
  <p><strong>Action:</strong>  Built chatbot frontend with React and AWS Amplify, implemented Cognito authentication, and created admin flows.</p>
  <p><strong>Result:</strong>  Enabled seamless user-chatbot interaction and real-time analytics monitoring.</p>
  <p><strong>What I Learned:</strong>  AWS Amplify authentication, chatbot integration, and admin dashboard design.</p>
  <p><strong>Tech Stack:</strong>  React, AWS Amplify, AWS Cognito</p>
</>),
    links: undefined
  },
  {
    badge: "",
title: "Chatbot Referral Agent",
    summary: "Developed a referral chatbot in React with AWS Amplify and Cognito, including an admin portal for referral and data management.",
    duration: "Add duration here",
    techStack: ["React","AWS Amplify","AWS Cognito","AWS Chatbot"],
    details: (<>
  <p><strong>Situation:</strong>  Needed a chatbot for referral collection and tracking.</p>
  <p><strong>Problem:</strong>  No scalable solution for referral data management and analytics.</p>
  <p><strong>Action:</strong>  Built React chatbot with Cognito authentication, created admin portal for referral tracking and analytics.</p>
  <p><strong>Result:</strong>  Streamlined referral process with secure data handling and insight generation.</p>
  <p><strong>What I Learned:</strong>  Integration of authentication, chatbot UI, and backend analytics.</p>
  <p><strong>Tech Stack:</strong>  React, AWS Amplify, AWS Cognito</p>
</>),
    links: undefined
  },
  {
  badge: "",
  title: "GitHub LinkedIn Post Generator",
  summary: "Transform your GitHub activity into engaging LinkedIn posts using AI! This Streamlit application fetches your recent GitHub repositories and commits, then uses Ollama (local LLM) to generate professional LinkedIn posts.",
  techStack: ["React", "Python", "Flask"],
  details: (
    <>
      <p><b>Situation:</b> Fetches repositories, commits, and README content</p>
      <p><b>Problem:</b> Analyze activity within any date range</p>
      <p><b>Action:</b> Select spotlight vs supporting projects</p>
      <p><b>Result:</b> Uses Ollama for human-sounding LinkedIn posts</p>
      <p><b>What I Learned:</b> Includes emojis, highlights, links, and hashtags</p>
      <p><b>Tech Stack:</b> React, Python, Flask</p>
    </>
  ),
  links: [
    { label: "GitHub Repo", url: "https://github.com/synamalhan/git-post" },
  ]
},
  {
    badge: "",
title: "Content Censoring Solution",
    summary: "Implemented NLP-based content filtering for text, audio, and video using speech-to-text and Python backend for automated moderation.",
    duration: "Add duration here",
    techStack: ["Python","NLP","Speech-to-Text APIs","Flask/Django"],
    details: (<>
  <p><strong>Situation:</strong>  Needed to automatically moderate user-generated content across multiple media types.</p>
  <p><strong>Problem:</strong>  Manual moderation was slow and inconsistent.</p>
  <p><strong>Action:</strong>  Developed backend with speech-to-text for audio/video, text NLP filters, and customizable rules.</p>
  <p><strong>Result:</strong>  Enabled scalable, consistent content moderation with configurable censoring.</p>
  <p><strong>What I Learned:</strong>  NLP techniques, audio processing, and building flexible moderation pipelines.</p>
  <p><strong>Tech Stack:</strong>  Python, NLP, Speech-to-Text APIs</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/PratGit1606/WhatTheBleep-AutomaticCensor.git"
  }
]
  },
  {
    badge: "",
title: "Portfolio Performance Analyzer",
    summary: "Built a Streamlit app to input, validate, and visualize stock portfolios with risk-return plots and sector allocation.",
    duration: "Add duration here",
    techStack: ["Python","Streamlit","yFinance API","Plotly"],
    details: (<>
  <p><strong>Situation:</strong>  Investors needed a simple tool for portfolio performance visualization.</p>
  <p><strong>Problem:</strong>  Lack of interactive, easy-to-use portfolio analysis tools.</p>
  <p><strong>Action:</strong>  Developed Streamlit dashboard with CSV/manual input, integrated yFinance, and interactive Plotly charts.</p>
  <p><strong>Result:</strong>  Improved user insights into portfolio risk, returns, and sector exposures.</p>
  <p><strong>What I Learned:</strong>  API integration, interactive visualization, and Streamlit app deployment.</p>
  <p><strong>Tech Stack:</strong>  Python, Streamlit, yFinance, Plotly</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/portfolio_analyzer"
  }
]
  },
  {
    badge: "",
title: "Customer Segmentation via K-Means",
    summary: "Applied K-Means clustering on mall customer data to identify marketing segments, visualized clusters with Matplotlib and Plotly.",
    duration: "Add duration here",
    techStack: ["Python","K-Means Clustering","Matplotlib","Seaborn","Plotly"],
    details: (<>
  <p><strong>Situation:</strong>  Marketing team needed to segment customers for targeted campaigns.</p>
  <p><strong>Problem:</strong>  Existing segmentation was manual and imprecise.</p>
  <p><strong>Action:</strong>  Used K-Means clustering, elbow method for optimal clusters, and generated cluster visualizations.</p>
  <p><strong>Result:</strong>  Enhanced targeted marketing strategies and campaign ROI.</p>
  <p><strong>What I Learned:</strong>  Clustering algorithms, cluster evaluation methods, and visualization best practices.</p>
  <p><strong>Tech Stack:</strong>  Python, K-Means, Matplotlib, Seaborn, Plotly</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/customer-segmentation"
  }
]
  },
  {
    badge: "",
title: "Portfolio Optimizer with ESG Integration",
    summary: "Created a Streamlit app for portfolio optimization under ESG score constraints with interactive visualizations and modern portfolio theory.",
    duration: "Add duration here",
    techStack: ["Python","Streamlit","Pandas","NumPy","ESG Data"],
    details: (<>
  <p><strong>Situation:</strong>  Investors wanted to optimize portfolios balancing financial returns and ESG scores.</p>
  <p><strong>Problem:</strong>  No simple tools to incorporate ESG constraints in portfolio optimization.</p>
  <p><strong>Action:</strong>  Developed an app to input portfolios, fetch historical data, optimize using mean-variance, and visualize results.</p>
  <p><strong>Result:</strong>  Enabled sustainable investing with quantified risk-return tradeoffs.</p>
  <p><strong>What I Learned:</strong>  Portfolio theory application, ESG data integration, and UI for complex financial modeling.</p>
  <p><strong>Tech Stack:</strong>  Python, Streamlit, Pandas, NumPy</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/esg-score-optimizer.git"
  }
]
  },
  {
    badge: "",
title: "Personal Portfolio Website",
    summary: "Designed and developed a responsive portfolio website to showcase my projects, skills, and creative identity.",
    duration: "March 2025 – April 2025",
    techStack: ["React","Lottie","JavaScript","GitHub Pages","CSS Modules"],
    details: (<>
  <p><strong>Situation:</strong>  I needed a centralized, professional platform to present my projects, background, and technical capabilities in a personalized and interactive way.</p>
  <p><strong>Problem:</strong>  Traditional resumes and static sites felt too limiting for conveying creativity, technical depth, and dynamic content.</p>
  <p><strong>Action:</strong>  Built a fully responsive React-based website, integrated Lottie animations for interactive visuals, and deployed via GitHub Pages for easy public access.</p>
  <p><strong>Result:</strong>  Created a dynamic, engaging online presence that reflects both my personality and skillset, while making it easy for collaborators and recruiters to explore my work.</p>
  <p><strong>What I Learned:</strong>  Component-based UI design, animation integration using Lottie, cross-device responsiveness, and deploying React apps on static hosting platforms like GitHub Pages.</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/website.git"
  },
  {
    "label": "Live demo",
    "url": "https://synamalhan.github.io/website/"
  }
]
  },
  {
    badge: "",
title: "Gamify Life – Productivity To-Do App",
    summary: "Built a personal productivity tracker with a reward system to gamify daily tasks and monitor indulgences.",
    duration: "February 2025 – March 2025",
    techStack: ["Python","Streamlit","Supabase","PostgreSQL"],
    details: (<>
  <p><strong>Situation:</strong>  I wanted a simple yet motivating way to track my productivity, habits, and indulgences without relying on generic apps.</p>
  <p><strong>Problem:</strong>  Existing to-do list apps lacked personalization and reward systems tailored to my daily routines and goals.</p>
  <p><strong>Action:</strong>  Developed a lightweight Streamlit app backed by Supabase to manage tasks and assign reward points based on task completion, penalties for indulgences, and daily summaries.</p>
  <p><strong>Result:</strong>  Improved self-awareness and task consistency through a personalized, gamified approach to productivity tracking.</p>
  <p><strong>What I Learned:</strong>  Backend integration using Supabase, state management in Streamlit, user interface design for utility-focused apps, and balancing personal goals with behavioral feedback systems.</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/gamify-life.git"
  },
  {
    "label": "Live demo",
    "url": "https://youtu.be/yQi9CLcjFig"
  }
]
  },
  {
    badge: "",
title: "Project Creator with Local LLM Integration",
    summary: "Automates the creation of formatted project entries for a portfolio website, using a local language model to generate summaries in JSX format.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  This is a personal learning project designed to automate the creation of formatted project entries for a portfolio website.</p>
  <p><strong>Problem:</strong>  The tool uses a free local LLM (via Ollama or similar) for generating project summaries in a consistent JSX format, ensuring minimal manual formatting required.</p>
  <p><strong>Action:</strong>  Given a project README or description text, the tool takes raw input and exports the generated project entry ready to be added into a React projects array.</p>
  <p><strong>Result:</strong>  The result is a well-structured project object that can be directly appended to a React/JSX projects list, maintaining personal portfolio project lists with minimal manual formatting.</p>
  <p><strong>What I Learned:</strong>  New skills or tools learned through this project include integrating local LLMs for generating summaries in JSX format.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/project-formatter.git"
  }
]
  },
  {
    badge: "",
title: "US Census Data Project",
    summary: "Analyzing and visualizing data from the US Census to provide insights into demographic, economic, and geographic trends across the United States.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  This project is focused on analyzing and visualizing data from the US Census.</p>
  <p><strong>Problem:</strong>  To provide insights into demographic, economic, and geographic trends across the United States.</p>
  <p><strong>Action:</strong>  Data collection and preprocessing, exploratory data analysis, interactive visualizations, and customizable reports were built to achieve this goal.</p>
  <p><strong>Result:</strong>  The project provides valuable insights into demographic, economic, and geographic trends across the United States.</p>
  <p><strong>What I Learned:</strong>  New skills and tools were acquired through this project.</p>
  <p><strong>Tech Stack:</strong> Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/us-census-stats"
  }
]
  },
  {
    badge: "",
title: "The Untold Legacy of Bayard Rustin",
    summary: "A digital tribute to one of the most influential yet overlooked figures in the American civil rights movement.",
    duration: undefined,
    techStack: ["React","Javacript","Vercel","Tailwind CSS"],
    details: (<>
  <p><strong>Situation:</strong>  Hackathon focused on exploring and celebrating history.</p>
  <p><strong>Problem:</strong>  Highlighting lesser-known figures who have made significant contributions to society.</p>
  <p><strong>Action:</strong>  Created a digital tribute to Bayard Rustin, an unsung hero of the civil rights movement.</p>
  <p><strong>Result:</strong>  Shed light on the importance of recognizing all voices in history, especially those who have been marginalized.</p>
  <p><strong>What I Learned:</strong>  New skills and tools gained through using React for a dynamic and interactive user experience, Tailwind CSS for rapid and responsive design, and JavaScript (ES6+) for logic and interactivity.</p>
  <p><strong>Tech Stack:</strong>  React, Javascript</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/hackstory.git"
  }
]
  },
  {
    badge: "",
title: "Finance Helper",
    summary: "A personal project designed to simplify and automate common financial tasks.",
    duration: undefined,
    techStack: ["Streamlit","Python","LLM","FRED API"],
    details: (<>
  <p><strong>Situation:</strong>  Many people struggle to keep track of their spending and savings.</p>
  <p><strong>Problem:</strong>  Manual financial management can be challenging.</p>
  <p><strong>Action:</strong>  Finance Helper provides an easy-to-use tool to automate expense tracking, budget management, and financial analytics.</p>
  <p><strong>Result:</strong>  Empowering users to make informed financial decisions and achieve their financial goals.</p>
  <p><strong>What I Learned:</strong>  Created a project for a new demographic</p>
  <p><strong>Tech Stack:</strong>  Streamlit, Python, LLM, FRED API</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/finance-assist"
  }
]
  },
  {
    badge: "",
title: "Career Pilot",
    summary: "A personal project designed to help users navigate and manage their career growth, job applications, and professional development.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  As a professional looking to advance in my career, I wanted to create a tool that helps me stay organized and focused.</p>
  <p><strong>Problem:</strong>  Managing job applications, setting career goals, and keeping track of progress can be overwhelming without a centralized system.</p>
  <p><strong>Action:</strong>  I built Career Pilot, a web application that allows users to track job applications and interviews, set career goals and milestones, organize professional documents and notes, and visualize progress with charts and timelines.</p>
  <p><strong>Result:</strong>  With Career Pilot, users can gain clarity on their career path, streamline their job search process, and make data-driven decisions for future growth.</p>
  <p><strong>What I Learned:</strong>  I learned about the importance of user-centered design, the value of project management tools, and the power of data visualization in helping professionals achieve their goals.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/career-pilot"
  }
]
  },
  {
    badge: "",
title: "Haunted Escape Room (React)",
    summary: "A silly little horror escape room game built with React — full of creaky doors, creepy riddles, and a time limit that’ll trap you forever... or at least until you refresh.",
    duration: undefined,
    techStack: ["React","CSS","MP3 sound effects","Local images"],
    details: (<>
  <p><strong>Situation:</strong>  You’re trapped in a haunted house and must solve a series of eerie puzzles before time runs out.</p>
  <p><strong>Problem:</strong>  If you guess wrong, the ghosts get louder. If you guess right, the door creaks open and you move on.</p>
  <p><strong>Action:</strong>  Finish all rooms to escape... or join the spirits.</p>
  <p><strong>Result:</strong>  A final “You Escaped!” screen</p>
  <p><strong>What I Learned:</strong>  Just a fun project to pass time.</p>
  <p><strong>Tech Stack:</strong>  React, CSS, MP3 sound effects, Local images</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/escape-room"
  }
]
  },
  {
    badge: "",
title: "The Ten Dollar Founding Father Without a Father",
    summary: "An agentic Retrieval-Augmented Generation (RAG) system built for fun, using the characters from Hamilton: The Musical as its knowledge base.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  This project is an agentic Retrieval-Augmented Generation (RAG) system built for fun, using the characters from *Hamilton: The Musical* as its knowledge base.</p>
  <p><strong>Problem:</strong>  None specified</p>
  <p><strong>Action:</strong>  Built using Neo4j Database, Streamlit, Ollama, and LangGraph.</p>
  <p><strong>Result:</strong>  Provided an interactive web interface for agentic workflows and RAG pipelines.</p>
  <p><strong>What I Learned:</strong>  New skills or tools not specified</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/the-ten-dollar-founding-father-without-a-father-got-a-lot-further-by-working-a-lot-harder.git"
  }
]
  },
  {
    badge: "",
title: "MindScape — Your Personalized Wellness Companion",
    summary: "A full-stack AI-powered wellness journal built by students, for students. It uses sentiment analysis and local LLMs (via Ollama) to suggest personalized, mindful actions to help you navigate your emotional landscape.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  Students built a full-stack AI-powered wellness journal.</p>
  <p><strong>Problem:</strong>  To provide students with a personalized wellness companion that utilizes sentiment analysis and local LLMs to suggest mindful actions.</p>
  <p><strong>Action:</strong>  Built a full-stack AI-powered wellness journal using React for the frontend, FastAPI for the backend, HuggingFace Transformers for sentiment detection, Ollama + Mistral LLM for agentic suggestions, and Python for overall development.</p>
  <p><strong>Result:</strong>  A personalized wellness companion that suggests mindful actions based on user entries and sentiments.</p>
  <p><strong>What I Learned:</strong>  New skills in React, FastAPI, HuggingFace Transformers, Ollama + Mistral LLM, and Python.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/mind-scape"
  }
]
  },
  {
    badge: "",
title: "Wellness Journal",
    summary: "A simple and colorful iOS app to track your daily mood and thoughts.",
    duration: undefined,
    techStack: ["SwiftUI","Xcode"],
    details: (<>
  <p><strong>Situation:</strong>  Built with SwiftUI, this app helps you journal your feelings easily and keep past entries organized.</p>
  <p><strong>Problem:</strong>  None specified</p>
  <p><strong>Action:</strong>  Allows users to select their mood using emoji buttons, write notes in a clean text editor, save entries locally on the device, view past entries in a colorful list, and more.</p>
  <p><strong>Result:</strong>  Users can easily track their daily moods and thoughts, with features like responsive UI and customizable colors.</p>
  <p><strong>What I Learned:</strong>  Not specified</p>
  <p><strong>Tech Stack:</strong>  SwiftUI, Xcode</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/wellness-journal-ios.git"
  }
]
  },
  {
    badge: "",
title: "TapFast – A Rapid Tapping Game for Apple Watch",
    summary: "A lightweight, fast-paced tapping game designed for watchOS. The goal is simple: tap the circle as many times as you can in 5 seconds. It's a fun way to test your reaction speed and challenge your friends — right from your wrist!",
    duration: undefined,
    techStack: ["SwiftUI","WatchKit","Xcode 15+"],
    details: (<>
  <p><strong>Situation:</strong>  A rapid tapping game designed for watchOS.</p>
  <p><strong>Problem:</strong>  None mentioned.</p>
  <p><strong>Action:</strong>  Built with SwiftUI, WatchKit, and Xcode 15+.</p>
  <p><strong>Result:</strong>  A fun way to test your reaction speed and challenge your friends — right from your wrist!</p>
  <p><strong>What I Learned:</strong>  Building a watchOS game using SwiftUI and WatchKit.</p>
  <p><strong>Tech Stack:</strong>  SwiftUI, WatchKit, Xcode 15+</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/tap-fast-watch-OS.git"
  }
]
  },
  {
    badge: "",
title: "Mental Health Bridge",
    summary: "A Streamlit app to help simulate and improve sensitive conversations about mental health between children and their parents.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  Many parents and children struggle to talk about mental health due to generational gaps, emotional barriers, and different communication styles.</p>
  <p><strong>Problem:</strong>  This tool helps you practice, prepare, and improve those difficult conversations with empathy and realism.</p>
  <p><strong>Action:</strong>  Uses Ollama to run the Mistral model locally, providing real-time responses powered by a prompt-based interaction with the model.</p>
  <p><strong>Result:</strong>  Enhances emotional understanding using AI.</p>
  <p><strong>What I Learned:</strong>  New skills or tools include fine-tuning the simulated behavior using sensitivity level, common reactions, and preferred tone.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/mental-bridge"
  }
]
  },
  {
    badge: "",
title: "Streamlit Resume Builder with PDF Export",
    summary: "A clean, no-fuss interface to build, edit, organize, and export your resume without the hassle of formatting issues or clunky document editors.",
    duration: undefined,
    techStack: ["Streamlit","fpdf","streamlit-pdf-viewer","Python"],
    details: (<>
  <p><strong>Situation:</strong>  A clean, no-fuss interface to build, edit, organize, and export your resume without the hassle of formatting issues or clunky document editors.</p>
  <p><strong>Problem:</strong>  I always dreaded the process of updating my resume — messing with formatting, spacing, ordering, and layout in Word or LaTeX.</p>
  <p><strong>Action:</strong>  This app was built as a better way to manage resume content: No worrying about line breaks or alignment. Just enter your details, adjust order, and export a clean, professional PDF. Update JSON once and reuse forever.</p>
  <p><strong>Result:</strong>  A simple, intuitive interface that makes updating your resume a breeze!</p>
  <p><strong>What I Learned:</strong>  The importance of streamlining the resume-building process and providing users with a seamless experience.</p>
  <p><strong>Tech Stack:</strong>  Streamlit, fpdf, streamlit-pdf-viewer, Python</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/resume-formatter"
  }
]
  },
  {
    badge: "",
title: "Ocean Pollution Tracker",
    summary: "A project aimed at monitoring, visualizing, and raising awareness about pollution in the world's oceans.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  The ocean is facing a significant problem due to human activities.</p>
  <p><strong>Problem:</strong>  Pollution in the ocean has severe impacts on marine life, ecosystems, and ultimately, our planet.</p>
  <p><strong>Action:</strong>  This project collects, analyzes, and displays data related to various types of ocean pollutants, helping users understand the impact and distribution of pollution globally.</p>
  <p><strong>Result:</strong>  The application provides interactive maps, analytics dashboards, and educational resources to raise awareness and promote action against ocean pollution.</p>
  <p><strong>What I Learned:</strong>  This project taught me about data collection, API integration, and the importance of visualization in understanding complex environmental issues.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/ocean-pollution-tracker"
  }
]
  },
  {
    badge: "",
title: "NeuroTrack",
    summary: "A SwiftUI-based cognitive training app that helps users improve their memory and focus through a fun memory-matching game, integrating with Apple HealthKit to log mindful sessions and track cognitive activity over time.",
    duration: undefined,
    techStack: ["Swift","SwiftUI","HealthKit","Xcode"],
    details: (<>
  <p><strong>Situation:</strong>  A cognitive training app that helps users improve their memory and focus.</p>
  <p><strong>Problem:</strong>  Users were struggling to find engaging and effective brain-training tools.</p>
  <p><strong>Action:</strong>  Built a SwiftUI-based app with interactive memory match games, HealthKit integration for logging mindfulness sessions, and adaptive game logic with score tracking.</p>
  <p><strong>Result:</strong>  Users can track their cognitive activity over time, improving focus and memory skills.</p>
  <p><strong>What I Learned:</strong>  Developed expertise in SwiftUI, HealthKit, and Xcode.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/neurotrack"
  }
]
  },
  {
    badge: "",
title: "PulseGuardian: Real-Time Stress Monitor",
    summary: "Heart rate variability-based stress detection app for Apple Watch and iPhone.",
    duration: undefined,
    techStack: ["Swift","WatchKit","HealthKit","SwiftUI"],
    details: (<>
  <p><strong>Situation:</strong>  With rising stress levels and wearable health tech adoption, I aimed to build a real-time stress monitoring solution.</p>
  <p><strong>Problem:</strong>  Users lacked an accessible, continuous method to detect stress and respond with guided relief strategies.</p>
  <p><strong>Action:</strong>  Built a watchOS and iOS app that used HealthKit to monitor HRV, detected stress patterns, and sent alerts to trigger guided breathing sessions.</p>
  <p><strong>Result:</strong>  Enabled seamless Watch-to-iPhone communication with a 92% stress detection accuracy during tests, and real-time biometric feedback for users.</p>
  <p><strong>What I Learned:</strong>  Deepened experience with HealthKit, WatchConnectivity, and building real-time, cross-device Apple health solutions.</p>
  <p><strong>Tech Stack:</strong>  Swift, WatchKit, HealthKit, SwiftUI</p>
</>),
    links: []
  },
  {
    badge: "",
title: "MoodSync: Voice Journal with Emotion Detection",
    summary: "Voice journaling app with CoreML-powered emotion detection and mood tracking.",
    duration: undefined,
    techStack: ["Swift","CoreML","AVFoundation","Speech"],
    details: (<>
  <p><strong>Situation:</strong>  Emotional wellness journaling apps often lack natural input methods and intelligent mood analysis.</p>
  <p><strong>Problem:</strong>  Users found traditional journaling tedious and emotion tracking inconsistent or non-personalized.</p>
  <p><strong>Action:</strong>  Built an iOS app that uses AVFoundation for voice recording, Speech framework for transcription, and CoreML for sentiment classification.</p>
  <p><strong>Result:</strong>  Delivered a hands-free journaling experience with auto-tagged moods and visual emotional trends over time.</p>
  <p><strong>What I Learned:</strong>  Gained practical knowledge in CoreML integration, audio preprocessing, and user-friendly visualization of emotion data.</p>
  <p><strong>Tech Stack:</strong>  Swift, CoreML, AVFoundation, Speech</p>
</>),
    links: []
  },
  {
    badge: "",
title: "LensOCR: AI-Enhanced Document Scanner",
    summary: "iOS document scanner with real-time OCR and table extraction using Vision.",
    duration: undefined,
    techStack: ["Swift","Vision","CoreML","UIKit"],
    details: (<>
  <p><strong>Situation:</strong>  Many mobile scanners fail with non-standard documents like tables or require heavy post-processing.</p>
  <p><strong>Problem:</strong>  Needed a lightweight, on-device solution for scanning, correcting, and extracting structured data from physical documents.</p>
  <p><strong>Action:</strong>  Built a UIKit-based scanner app using Vision for real-time edge detection and OCR, and CoreML for table structure inference and export formatting.</p>
  <p><strong>Result:</strong>  Achieved high OCR accuracy across varied lighting and angles, with PDF export and table-friendly outputs.</p>
  <p><strong>What I Learned:</strong>  Gained expertise in Apple Vision framework, custom CoreML OCR models, and camera pipeline optimization.</p>
  <p><strong>Tech Stack:</strong>  Swift, Vision, CoreML, UIKit</p>
</>),
    links: []
  },
  {
    badge: "",
title: "AI-Powered Symptom Checker",
    summary: "Streamlit web app that uses a machine learning model to predict possible diseases based on user-selected symptoms.",
    duration: undefined,
    techStack: ["React","Python","Flask"],
    details: (<>
  <p><strong>Situation:</strong>  AI-powered symptom checker for predicting possible diseases.</p>
  <p><strong>Problem:</strong>  Develop a web app that uses machine learning to predict possible diseases based on user-selected symptoms.</p>
  <p><strong>Action:</strong>  Built a Streamlit web app that integrates a RandomForestClassifier model to suggest top 3 possible conditions with confidence scores, and displays disease descriptions and precautions.</p>
  <p><strong>Result:</strong>  A functional web app that provides users with a list of symptoms, predicted diseases, and relevant information.</p>
  <p><strong>What I Learned:</strong>  Implemented machine learning in Python using scikit-learn, and learned to integrate it with Streamlit for web application development.</p>
  <p><strong>Tech Stack:</strong>  React, Python, Flask</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/synamalhan/symptom-checker"
  }
]
  },
  {
    badge: "",
title: "Solar System Simulation in A-Frame",
    summary: "Created an interactive 3D solar system model using A-Frame to understand WebXR concepts and entity-component design.",
    duration: "May 2025",
    techStack: ["HTML","A-Frame","WebGL","Three.js"],
    details: (<>
  <p><strong>Situation:</strong>  I wanted to explore 3D web development and understand how VR/AR environments are constructed.</p>
  <p><strong>Problem:</strong>  I had no prior experience with A-Frame or spatial rendering techniques.</p>
  <p><strong>Action:</strong>  I created a model of the solar system where each planet rotates and orbits the sun, mapped textures using A-Frame assets, and adjusted scaling/camera controls for realism.</p>
  <p><strong>Result:</strong>  Successfully developed a browser-based simulation that visually represents orbital mechanics and planetary rotation.</p>
  <p><strong>What I Learned:</strong>  Basics of 3D entity hierarchies, texture loading, orbital animation, and component-based architecture in A-Frame.</p>
  <p><strong>Tech Stack:</strong>  HTML, A-Frame, WebGL, Three.js</p>
</>),
    links: [
  {
    "label": "GitHub Repo",
    "url": "https://github.com/yourusername/a-frame-vr.git"
  }
]
  },
  
];

export default projects;
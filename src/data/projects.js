export const categorizedProjects = [
    {
        title: "Machine Learning & AI",
        type: "ml",
        colors: ["#22d3ee", "#8b5cf6"],
        tags: ["TensorFlow", "PyTorch", "NLP", "RL"],
        projects: [
            {
                title: "FrozenLake Q-Learning Agent",
                motivation: "A reinforcement learning agent that learns to navigate the FrozenLake environment using Q-Learning.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: A simple yet effective reinforcement learning agent was trained to navigate a frozen 4x4 grid. Problem: The agent had to balance exploration vs exploitation using the Q-Learning algorithm. Action: Used a Q-table based learning loop to train an optimal policy. Result: Learned to reach the goal with near-perfect consistency after 20,000 episodes.",
                link: "https://github.com/synamalhan/frozenlake-q-learning.git"
            },
            {
                title: "K-Means Image Compressor",
                motivation: "Compressing images using K-Means clustering by reducing the number of unique colors.",
                techStack: ["Streamlit", "scikit-learn", "PIL", "NumPy"],
                details: "Situation: A Streamlit app that compresses images by reducing unique colors. Problem: Treating pixels as points in 3D RGB space to group by similarity. Action: Replaced pixels with cluster centroid colors to reduce file size. Result: Effective visualization of unsupervised learning in action.",
                link: "https://github.com/synamalhan/k-means-image-compressor.git"
            },
            {
                title: "Credit Risk RAG Model",
                motivation: "RAG-based credit risk assessment system using LangGraph and Neo4j.",
                techStack: ["Python", "Streamlit", "Neo4j", "LangGraph"],
                details: "Situation: Financial institutions need contextual insights combining structured data and regulatory knowledge. Problem: Traditional ML models lack explainability for dynamic knowledge. Action: Built a RAG system using LangGraph for reasoning and Neo4j for credit rule relationships. Result: Delivered explainable credit decisions with dynamic reasoning paths.",
                link: ""
            },
            {
                title: "Text-Optimized Image Generation Model",
                motivation: "Custom-trained diffusion model optimized for rendering clean text in images.",
                techStack: ["Python", "HuggingFace", "PyTorch", "LoRA"],
                details: "Situation: Most generative models struggle to render readable text for UI components. Problem: Needed a model that could reliably generate labels and form fields. Action: Fine-tuned Stable Diffusion with LoRA on curated labeled visuals. Result: Achieved significantly higher OCR accuracy in generated samples.",
                link: ""
            },
            {
                title: "Emotion Detection from Images",
                motivation: "Real-time emotion detection app using Hugging Face RoBERTa model.",
                techStack: ["Hugging Face", "RoBERTa", "Streamlit", "Python"],
                details: "Situation: Needed a real-time tool to quantify user sentiment during sessions. Problem: Emotion models lacked real-time interactivity. Action: Used RoBERTa for classification and built a Streamlit dashboard. Result: Enabled real-time analysis of user mood and engagement.",
                link: "https://github.com/synamalhan/emotion-detect.git"
            },
            {
                title: "Medical Image Analysis for Early Brain Tumor Detection",
                motivation: "CNN model to detect and segment anomalies in medical images using U-Net.",
                techStack: ["TensorFlow", "Keras", "U-Net", "ResNet"],
                details: "Situation: Early detection of tumors in radiology scans was inconsistent. Problem: High false negatives in automated diagnosis. Action: Trained U-Net for segmentation and ResNet for classification. Result: Reduced false negative rate by 35% while maintaining high precision.",
                link: "https://github.com/synamalhan/brain-tumor-cnn.git"
            },
            {
                title: "Portfolio Analyzer and Stock Prediction Dashboard",
                motivation: "Portfolio management with real-time tracking and ML-driven forecasts.",
                techStack: ["Python", "Streamlit", "Random Forest", "LSTM"],
                details: "Situation: Investors wanted analytics combined with price forecasting. Problem: Most dashboards lacked predictive capability. Action: Built backend with LSTM/Random Forest and integrated real-time stock APIs. Result: Delivered daily forecasts with 87% accuracy.",
                link: "https://github.com/synamalhan/stock_pred.git"
            },
            {
                title: "Slab Sizing",
                motivation: "Optimizing computer vision algorithms using YOLO for industrial measurement.",
                techStack: ["Ultralytics", "YOLO", "Python", "FastSAM"],
                details: "Situation: Manual measurement of steel slabs was time-consuming. Problem: Automated models lacked precision under varied lighting. Action: Fine-tuned YOLO and FastSAM models for precise detection. Result: Boosted measurement accuracy by 80%.",
                link: ""
            },
            {
                title: "Customer Segmentation via K-Means",
                motivation: "Applying K-Means clustering on mall customer data to identify marketing segments.",
                techStack: ["Python", "K-Means", "Matplotlib", "Seaborn"],
                details: "Situation: Marketing teams needed to segment customers for targeted campaigns. Problem: Manual segmentation was imprecise. Action: Used K-Means clustering and elbow method to find optimal groups. Result: Enhanced targeted marketing strategies and ROI.",
                link: "https://github.com/synamalhan/customer-segmentation"
            },
            {
                title: "Options Pricing and Risk Assessment Tool",
                motivation: "Financial tool to calculate option pricing using Monte Carlo and Black-Scholes.",
                techStack: ["Python", "Streamlit", "Monte Carlo", "Black-Scholes"],
                details: "Situation: Finance students needed a simulation-based learning tool. Problem: Existing tools were non-interactive. Action: Built a Streamlit dashboard with VaR/ES risk metrics. Result: Helped users visualize pricing dynamics and scenario-based risk.",
                link: "https://github.com/synamalhan/option-pricing.git"
            },
            {
                title: "Portfolio Optimizer with ESG Integration",
                motivation: "Portfolio optimization under ESG score constraints using modern portfolio theory.",
                techStack: ["Python", "Streamlit", "Pandas", "NumPy"],
                details: "Situation: Investors wanted to balance financial returns and ESG impacts. Problem: No simple tools to incorporate ESG constraints. Action: Developed an app to optimize portfolios using mean-variance and ESG data. Result: Enabled sustainable investing with quantified tradeoffs.",
                link: "https://github.com/synamalhan/esg-score-optimizer.git"
            },
            {
                title: "Finance Helper",
                motivation: "Simplifying and automating common financial tasks using local LLMs.",
                techStack: ["Streamlit", "Python", "LLM", "FRED API"],
                details: "Situation: People struggle to track spending and savings effectively. Problem: Manual financial management is challenging. Action: Provided tools for expense tracking and budget analytics. Result: Empowered users to make informed financial decisions.",
                link: "https://github.com/synamalhan/finance-assist"
            },
            {
                title: "AI Researcher Paper Summarizer",
                motivation: "Generate concise summaries of research papers using state-of-the-art AI.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Navigating large research PDFs is time-consuming. Problem: Extracting full text for reliable summarization. Action: Used BART models to generate abstractive summaries with user controls. Result: Provided previews and downloads for research summaries.",
                link: "https://github.com/synamalhan/research-paper-summarizer"
            }
        ]
    },
    {
        title: "Full Stack Applications",
        type: "fullstack",
        colors: ["#f472b6", "#fb923c"],
        tags: ["React", "Node.js", "Vite", "Supabase"],
        projects: [
            {
                title: "FaceTrack - Advanced Facial Recognition Attendance System",
                motivation: "Facial recognition attendance management system combining AI and biometrics.",
                techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
                details: "Situation: Traditional attendance tracking was time-consuming and error-prone. Problem: Lacked real-time analytics and efficiency. Action: Developed an AI-powered system with a dark purple professional UI. Result: Achieved accurate real-time tracking and reporting.",
                link: "https://github.com/synamalhan/facial-attendance"
            },
            {
                title: "EduFlex+ Educational Learning Platform",
                motivation: "AI-powered educational platform that adapts to emotional state and learning style.",
                techStack: ["React", "TypeScript", "Tailwind CSS"],
                details: "Situation: Modern education needs personalization. Problem: Adapting to individual student vibes. Action: Built with React/TS and integrated Ollama for local AI processing. Result: Created a platform that adapts to user emotions and learning styles.",
                link: "https://github.com/synamalhan/eduflex-plus"
            },
            {
                title: "CuraMind - AI-Powered Mental Health Support",
                motivation: "Empathetic, multilingual mental health chatbot that works offline.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Mental health support is expensive and not always available. Problem: Language barriers and offline limitations. Action: Built a multilingual chatbot providing empathetic responses. Result: Provided accessible and personalized mental health assistance.",
                link: "https://github.com/synamalhan/curamind"
            },
            {
                title: "MediHub Platform",
                motivation: "Modern AI-powered medical education platform for students and professionals.",
                techStack: ["React", "TypeScript", "Vite", "Supabase"],
                details: "Situation: Medical education tools are often fragmented. Problem: Need for a consolidated intelligent system. Action: Integrated simulators, flashcards, and analytics into one platform. Result: Delivered a best-in-class learning experience for medical pros.",
                link: "https://github.com/synamalhan/medi-hub.git"
            },
            {
                title: "Front-end Portal",
                motivation: "React portal with reusable components and dynamic filters for enterprise data.",
                techStack: ["React", "AWS Amplify", "REST API", "JavaScript"],
                details: "Situation: Needed a scalable portal for data display and video previews. Problem: Existing solutions lacked dynamic filtering. Action: Developed custom components and integrated multiple REST endpoints. Result: Improved engagement with dynamic visualization and video access.",
                link: ""
            },
            {
                title: "Specialized Chatbot",
                motivation: "React-based chatbot with AWS Amplify and Cognito for admin management.",
                techStack: ["React", "AWS Amplify", "AWS Cognito"],
                details: "Situation: Needed an intelligent chatbot with admin data controls. Problem: Lack of monitoring and management analytics. Action: Built frontend with React/Amplify and implemented Cognito auth. Result: Enabled seamless user interaction and real-time monitoring.",
                link: ""
            },
            {
                title: "Chatbot Referral Agent",
                motivation: "Referral chatbot for secure data handling and analytics insights.",
                techStack: ["React", "AWS Amplify", "AWS Cognito"],
                details: "Situation: Needed a scalable solution for referral tracking. Problem: No easy way to manage referral data. Action: Built React chatbot with Cognito auth and an admin portal. Result: Streamlined referral process with secure data handling.",
                link: ""
            },
            {
                title: "Career Pilot",
                motivation: "Helping users navigate and manage career growth and job applications.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Advance in career requires organization. Problem: Overwhelming to track applications and milestones. Action: Built application to track interviews, goals, and professional documents. Result: Gained clarity on career paths and streamlined job searches.",
                link: "https://github.com/synamalhan/career-pilot"
            },
            {
                title: "MindScape — Your Personalized Wellness Companion",
                motivation: "AI-powered wellness journal using sentiment analysis to suggest mindful actions.",
                techStack: ["React", "Python", "FastAPI", "HuggingFace"],
                details: "Situation: Students need specialized emotional support. Problem: Navigating emotional landscapes requires guidance. Action: Built full-stack app using FastAPI and Transformers for sentiment detection. Result: Suggests personalized mindful actions based on journals.",
                link: "https://github.com/synamalhan/mind-scape"
            }
        ]
    },
    {
        title: "Data Visualization & Analytics",
        type: "default",
        colors: ["#4ade80", "#22d3ee"],
        tags: ["Plotly", "D3.js", "Pandas", "Folium"],
        projects: [
            {
                title: "Last Point Distribution Analysis",
                motivation: "Optimized dispatch operations with K-means and real-time cost calculations.",
                techStack: ["Python", "Streamlit", "K-means", "Folium"],
                details: "Situation: Dispatch team faced inefficient routing and unclear clustering. Problem: Poorly defined last-mile zones. Action: Applied K-means to optimize zones and Folium for geospatial visualization. Result: Reduced path overlap and improved logistical efficiency.",
                link: "https://github.com/synamalhan/dispatch_optimization_FG_forecasting"
            },
            {
                title: "US Census Data Project",
                motivation: "Analyzing demographic, economic, and geographic trends across the USA.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Understanding broad demographic shifts requires large-scale analysis. Problem: Visualizing US Census trends intuitively. Action: Built exploratory data analysis tools and interactive visualizations. Result: Provided valuable insights into US economic and geographic trends.",
                link: "https://github.com/synamalhan/us-census-stats"
            },
            {
                title: "Blast Furnace Lab Automation",
                motivation: "Full-stack portal to automate and streamline industrial lab processes.",
                techStack: ["AngularJS", "Spring Boot", "SQL"],
                details: "Situation: Lab processes were manual and fragmented. Problem: Lack of centralized data across lab operations. Action: Built a web portal integrating multiple lab workflows on cloud platforms. Result: Improved operational efficiency and centralized data access.",
                link: ""
            },
            {
                title: "Plate Mill FG Forecasting",
                motivation: "Predictive models to forecast finished goods for better dispatch planning.",
                techStack: ["Python", "XGBoost", "ARIMA", "Prophet"],
                details: "Situation: Manual forecasting led to supply chain inefficiencies. Problem: Dispatch lacked accurate predictive backing. Action: Trained time series and ensemble models for weekly inventory forecasting. Result: Improved accuracy by 30% for production scheduling.",
                link: "https://github.com/synamalhan/dispatch_optimization_FG_forecasting"
            },
            {
                title: "Portfolio Performance Analyzer",
                motivation: "Input, validate, and visualize stock portfolios with risk-return metrics.",
                techStack: ["Python", "Streamlit", "yFinance", "Plotly"],
                details: "Situation: Investors needed a simple tool for portfolio visualization. Problem: Lack of interactive tools for asset analysis. Action: Developed Streamlit dashboard with yFinance integration and sector plots. Result: Improved user insights into risk, returns, and exposures.",
                link: "https://github.com/synamalhan/portfolio_analyzer"
            },
            {
                title: "Ocean Pollution Tracker",
                motivation: "Monitoring and raising awareness about global ocean pollution.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Ocean pollution has severe impacts on marine ecosystems. Problem: Understanding pollutant distribution globally. Action: Collected and analyzed data to display in interactive maps and dashboards. Result: Raised awareness and promoted action via data visibility.",
                link: "https://github.com/synamalhan/ocean-pollution-tracker"
            }
        ]
    },
    {
        title: "Computer Vision",
        type: "vision",
        colors: ["#818cf8", "#c084fc"],
        tags: ["OpenCV", "YOLO", "FastSAM", "Roboflow"],
        projects: [
            {
                title: "NutriSnap Food Nutrition Database",
                motivation: "Mapping food items to macronutrient values using YOLOv8 recognition.",
                techStack: ["React", "Python", "Flask", "YOLOv8"],
                details: "Situation: Needed a way to map object detection outputs to nutritional data. Problem: Recognizing 43 food classes and enrichment. Action: Trained custom YOLOv8 model and mapped results to a nutritional CSV. Result: Allows enrichment of detection results with calorie and macro info.",
                link: "https://github.com/synamalhan/nutri-snap"
            },
            {
                title: "Wildlife Monitoring and Conservation",
                motivation: "Automated detection and monitor of wildlife using YOLO and SAM.",
                techStack: ["YOLO", "Faster R-CNN", "SAM", "FastSAM"],
                details: "Situation: Manual tracking of endangered species was inefficient. Problem: Needed 24/7 monitoring of remote wildlife zones. Action: Used YOLO/Faster R-CNN for detection and SAM for segmentation. Result: Enabled automated monitoring with over 92% accuracy.",
                link: ""
            },
            {
                title: "OCR Training",
                motivation: "Improving recognition accuracy with Donut model fine-tuning.",
                techStack: ["Python", "Donut Model", "AWS OCR", "Azure OCR"],
                details: "Situation: Industrial log sheets are hard for standard OCR models. Problem: Poor recognition of critical text fields and symbols. Action: Fine-tuned Donut transformer models and benchmarked against commercial APIs. Result: Increased accuracy by over 25% on form fields.",
                link: ""
            }
        ]
    },
    {
        title: "iOS/Swift Projects",
        type: "ios",
        colors: ["#f97316", "#e040fb"],
        tags: ["SwiftUI", "CoreML", "HealthKit", "WatchKit"],
        projects: [

            {
                "title": "Health Metrics Dashboard",
                "motivation": "Centralized dashboard to monitor health metrics seamlessly across iPhone and Apple Watch.",
                "techStack": ["SwiftUI", "HealthKit", "MVVM", "Swift Concurrency", "Secure Enclave", "Keychain", "XCTest"],
                "details": "Situation: Users want a single interface to view health metrics. Problem: Data scattered between devices. Action: Built SwiftUI app with MVVM architecture, HealthKit integration, and async data fetching. Result: Real-time, secure, and privacy-focused dashboard that scales with new metrics.",
                "link": "https://github.com/synamalhan/health-metrics-dashboard.git"
            },
            {
                "title": "Continuous Activity Tracking System",
                "motivation": "Intelligently track user activity and adapt daily recommendations using on-device ML.",
                "techStack": ["iOS", "watchOS", "CoreMotion", "CoreBluetooth", "Combine", "BGTaskScheduler", "Core Data", "Core ML", "Swift Concurrency"],
                "details": "Situation: Users want personalized activity insights and recommendations. Problem: Activity data is continuous, noisy, and battery-sensitive. Action: Captured motion data via CoreMotion, integrated wearables via CoreBluetooth, and used Core ML for adaptive activity suggestions. Result: Real-time, battery-efficient activity tracking with dynamic ML-driven recommendations.",
                "link": "https://github.com/synamalhan/continuous-activity-tracking.git"
            },
            {
                "title": "Sleep Pattern Analysis App",
                "motivation": "Analyze sleep patterns while preserving privacy and providing meaningful trends.",
                "techStack": ["iOS", "watchOS", "CoreMotion", "SwiftUI", "Combine", "MVVM", "Core Data"],
                "details": "Situation: Users want to track sleep quality without compromising privacy. Problem: Sleep data is sensitive and requires accurate detection. Action: Implemented sliding-window motion detection, local aggregation, and SwiftUI visualizations. Result: Users receive interactive nightly, weekly, and monthly sleep insights fully processed on-device.",
                "link": "https://github.com/synamalhan/sleep-pattern-analysis.git"
            },

            {
                title: "Wellness Journal",
                motivation: "Simple and colorful iOS app to track daily mood and thoughts.",
                techStack: ["SwiftUI", "Xcode"],
                details: "Situation: Need a clean space to journal feelings. Problem: Keeping entries organized and engaging. Action: Built SwiftUI app with emoji selection and local data persistence. Result: Users can easily track moods with a responsive, colorful UI.",
                link: "https://github.com/synamalhan/wellness-journal-ios.git"
            },
            {
                title: "TapFast – A Rapid Tapping Game for Apple Watch",
                motivation: "Fast-paced tapping game to test reaction speed on watchOS.",
                techStack: ["SwiftUI", "WatchKit", "Xcode"],
                details: "Situation: Fun way to test coordination on wearable devices. Problem: Lightweight interaction design for Watch. Action: Built with SwiftUI and WatchKit for high-performance tapping logic. Result: Challenge friends and test reactions from the wrist.",
                link: "https://github.com/synamalhan/tap-fast-watch-OS.git"
            },
            {
                title: "NeuroTrack",
                motivation: "Cognitive training app improving memory through fun matching games.",
                techStack: ["Swift", "SwiftUI", "HealthKit", "Xcode"],
                details: "Situation: Users need engaging brain-training tools. Problem: Tracking cognitive activity over time. Action: Built SwiftUI app with HealthKit integration to log mindful sessions. Result: Users track cognitive health and improve memory skills.",
                link: "https://github.com/synamalhan/neurotrack"
            },
            {
                title: "PulseGuardian: Real-Time Stress Monitor",
                motivation: "Heart rate variability-based stress detection for Watch and iPhone.",
                techStack: ["Swift", "WatchKit", "HealthKit", "SwiftUI"],
                details: "Situation: Continuous stress monitoring is a key health metric. Problem: Needs real-time detection and relief strategies. Action: Monitored HRV via HealthKit to trigger guided breathing. Result: Achieved 92% detection accuracy in cross-device tests.",
                link: ""
            },
            {
                title: "MoodSync: Voice Journal with Emotion Detection",
                motivation: "Voice journaling with CoreML-powered mood tracking.",
                techStack: ["Swift", "CoreML", "AVFoundation", "Speech"],
                details: "Situation: Traditional journaling can be tedious. Problem: Inconsistent mood analysis. Action: Used AVFoundation and Speech framework for hands-free sentiment classification. Result: Auto-tagged moods and visualized emotional trends over time.",
                link: ""
            },
            {
                title: "LensOCR: AI-Enhanced Document Scanner",
                motivation: "iOS document scanner with real-time OCR and table extraction.",
                techStack: ["Swift", "Vision", "CoreML", "UIKit"],
                details: "Situation: Mobile scanners often fail with complex table structures. Problem: Need for structured data extraction on-device. Action: Used Apple Vision for edge detection and CoreML for table inference. Result: High accuracy scans with PDF and structured output.",
                link: ""
            }
        ]
    },
    {
        title: "Hackathon Winners",
        type: "hackathon",
        colors: ["#facc15", "#ef4444"],
        tags: ["Winner", "Innovation", "Social Good"],
        projects: [
            {
                title: "CareSketch",
                motivation: "AI-powered care planning assistant built for social good.",
                techStack: ["Streamlit", "Ollama", "Plotly", "FPDF"],
                details: "Situation: Caregivers need help planning personalized daily tasks. Problem: Traditional planning is manual and lacks emotional context. Action: Built during Hack the Vibe 2025 to create goal-based care plans. Result: Empowered caregivers with emotion-aware, exportable summaries.",
                link: "https://github.com/synamalhan/care-sketch"
            },
            {
                title: "CropGenius",
                motivation: "100% accurate crop recommendations using XGBoost and Weather API.",
                techStack: ["XGBoost", "Random Forest", "Streamlit", "Weather API"],
                details: "Situation: Farmers need region-specific Soil-based crop advice. Problem: Traditional systems lacked precision. Action: Trained models using agri-datasets and live weather data. Result: Achieved perfectly accurate recommendations on validation cases.",
                link: "https://github.com/synamalhan/ai-crop-optimizer"
            }
        ]
    },
    {
        title: "Creative / Fun / Games",
        type: "creative",
        colors: ["#facc15", "#22d3ee"],
        tags: ["React", "Three.js", "A-Frame", "Storytelling"],
        projects: [
            {
                title: "Haunted Escape Room (React)",
                motivation: "Atmospheric horror escape room built with React and custom sound.",
                techStack: ["React", "CSS", "MP3 Audio"],
                details: "Situation: Trapped in a haunted house with eerie puzzles. Problem: Increasing difficulty and spectral interference. Action: Solve riddles to open doors and escape the spirits. Result: A fun, browser-based escape experience with immersive cues.",
                link: "https://github.com/synamalhan/escape-room"
            },
            {
                title: "Personal Portfolio Website",
                motivation: "Responsive portfolio showing technical skills and creative identity.",
                techStack: ["React", "Lottie", "GitHub Pages"],
                details: "Situation: Needed a personalized platform to showcase complex work. Problem: Static resumes are too limiting. Action: Built a fully responsive React site with Lottie animations. Result: Created a dynamic presence reflecting my hybrid skillset.",
                link: "https://github.com/synamalhan/website.git"
            },
            {
                title: "Gamify Life – Productivity To-Do App",
                motivation: "Productivity tracker with a reward system to gamify tasks and habits.",
                techStack: ["Python", "Streamlit", "Supabase", "PostgreSQL"],
                details: "Situation: Simple to-do apps lack motivation. Problem: Need for habit behavioral feedback. Action: Backed by Supabase to assign reward points and penalties. Result: Improved consistency through a personalized gamified approach.",
                link: "https://github.com/synamalhan/gamify-life.git"
            },
            {
                title: "The Untold Legacy of Bayard Rustin",
                motivation: "Digital tribute to an overlooked figure in the civil rights movement.",
                techStack: ["React", "JavaScript", "Tailwind CSS"],
                details: "Situation: Hackathon celebrating history and marginalized voices. Problem: Highlight unsung heroes of social change. Action: Created a dynamic multimedia tribute using React and Tailwind. Result: Shed light on Rustin's immense impact on history.",
                link: "https://github.com/synamalhan/hackstory.git"
            },
            {
                title: "Solar System Simulation in A-Frame",
                motivation: "Interactive 3D solar system model exploring WebXR and entity-component design.",
                techStack: ["HTML", "A-Frame", "WebGL", "Three.js"],
                details: "Situation: Exploration of 3D web and VR environment construction. Problem: No prior experience with spatial rendering. Action: Mapped planetary textures and orbits using A-Frame components. Result: Browser-based simulation of real orbital mechanics.",
                link: "https://github.com/synamalhan/a-frame-vr.git"
            }
        ]
    },
    {
        title: "Utilities & Tools",
        type: "tools",
        colors: ["#94a3b8", "#cbd5e1"],
        tags: ["Automation", "LLM", "Efficiency"],
        projects: [
            {
                title: "GitHub LinkedIn Post Generator",
                motivation: "Transform GitHub activity into engaging LinkedIn posts using local AI.",
                techStack: ["Python", "Ollama", "Streamlit"],
                details: "Situation: Sharing dev work on social media is time-consuming. Problem: Need for human-sounding summaries of commits. Action: Uses Ollama to fetch repo activity and generate narratives. Result: Highlights projects with emojis and professional formatting.",
                link: "https://github.com/synamalhan/git-post"
            },
            {
                title: "Drag & Drop JSON Editor",
                motivation: "Visually edit JSON data with intuitive drag-and-drop fields.",
                techStack: ["React", "Node.js"],
                details: "Situation: Manual JSON editing is error-prone. Problem: Provide a more visual and intuitive structure management. Action: Built React app to rearrange and add fields dynamically. Result: Simplified config file management for developers.",
                link: "https://github.com/synamalhan/drag-drop-json"
            },
            {
                title: "Project Creator with Local LLM Integration",
                motivation: "Automates formatted project entries for portfolio websites using LLMs.",
                techStack: ["React", "Python", "Flask"],
                details: "Situation: Updating portfolio projects requires consistent formatting. Problem: Manual JSX creation is repetitive. Action: Uses Ollama to generate summary strings in consistent formats. Result: Minimal manual effort needed to add and update entries.",
                link: "https://github.com/synamalhan/project-formatter.git"
            },
            {
                title: "Streamlit Resume Builder with PDF Export",
                motivation: "Build and export professional resumes without formatting hassle.",
                techStack: ["Streamlit", "fpdf", "Python"],
                details: "Situation: Dreaded process of fixing layout issues in Word/LaTeX. Problem: Need for separation of content and formatting. Action: Created JSON-backed builder that exports clean, professional PDFs. Result: Intuitive interface makes updating resumes simple.",
                link: "https://github.com/synamalhan/resume-formatter"
            },
            {
                title: "Content Censoring Solution",
                motivation: "NLP-based moderation for text, audio, and video content.",
                techStack: ["Python", "NLP", "Speech-to-Text"],
                details: "Situation: Automate moderation for user-generated content. Problem: Manual moderation is slow and inconsistent. Action: Speech-to-text filters combined with NLP rules. Result: Scalable moderation with configurable censoring parameters.",
                link: "https://github.com/PratGit1606/WhatTheBleep-AutomaticCensor.git"
            }
        ]
    }
];

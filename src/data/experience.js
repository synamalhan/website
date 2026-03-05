import jspl from '../assets/jspl.png';
import asu from '../assets/asu.png';
import iu from '../assets/iuLogo.png';
import ripik from '../assets/ripik.svg';
import headstarter from '../assets/headstarter.png';
import eyLogo from '../assets/eyLogo.png';
import mps from '../assets/mps.png';

export const EXPERIENCES = [
    {
        role: "Research Assistant",
        company: "Make Programming Simple Lab (MPS Lab)",
        years: "Jul 2025 – Oct 2025",
        desc: "Conducting research in Intelligent Transportation Systems (ITS), neural networks, and scalable machine learning systems.",
        details: [
            "Worked on Deep Learning applications for Intelligent Transportation Systems including real-time traffic prediction.",
            "Designed and trained neural networks (CNNs, RNNs, LSTMs) for time-series forecasting and anomaly detection.",
            "Compared classical ML algorithms vs deep learning models on large-scale transportation datasets.",
            "Collaborated on research papers and built reproducible ML pipelines."
        ],
        techStack: [
            "Python",
            "PyTorch",
            "TensorFlow",
            "NumPy",
            "Scikit-learn",
            "Deep Learning",
            "Time Series Modeling"
        ],
        logo: mps
    },

    {
        role: "Data Science Intern",
        company: "Infinite Uptime",
        years: "Jul 2025 - Sep 2025",
        desc: "Analyzed industrial sensor data for predictive maintenance and manufacturing optimization.",
        details: [
            "Explored time-series sensor data to detect anomalies and inefficiencies.",
            "Applied statistical modeling and machine learning to identify failure patterns.",
            "Built dashboards and KPI visualizations for operational insights."
        ],
        techStack: [
            "Python",
            "Pandas",
            "Scikit-learn",
            "Matplotlib",
            "Power BI",
            "Time-Series Analysis"
        ],
        logo: iu
    },

    {
        role: "Gen AI Intern",
        company: "Ernst & Young",
        years: "Jun 2025 - Aug 2025",
        desc: "Built enterprise AI solutions using Retrieval-Augmented Generation and graph databases.",
        details: [
            "Developed RAG-based systems for enterprise AI workflows.",
            "Modeled knowledge graphs and relationships using Neo4j.",
            "Built dashboards visualizing AI outputs and knowledge graph insights.",
            "Contributed to sprint planning, documentation, and technical presentations."
        ],
        techStack: [
            "Python",
            "RAG",
            "Neo4j",
            "Graph Databases",
            "Generative AI",
            "LangChain",
            "Prompt Engineering"
        ],
        logo: eyLogo
    },

    {
        role: "Cloud Front End Developer",
        company: "Arizona State University AI Cloud Innovation Center",
        years: "Aug 2024 - Aug 2025",
        desc: "Developed cloud-based applications and improved UI for public sector solutions.",
        details: [
            "Designed UI interfaces for public sector applications.",
            "Created wireframes and visualizations for spatial usage and cloud workflows.",
            "Collaborated across teams using cloud-based project management tools."
        ],
        techStack: [
            "React",
            "JavaScript",
            "AWS",
            "Cloud Architecture",
            "UI/UX Design",
            "Data Visualization"
        ],
        logo: asu
    },

    {
        role: "Intern in Digitalization",
        company: "Jindal Steel and Power Ltd",
        years: "May 2024 - July 2024",
        desc: "Built internal dashboards improving operational data retrieval and visualization.",
        details: [
            "Developed internal dashboards using AngularJS and Spring Boot.",
            "Improved UI layouts for operational visualization.",
            "Integrated performance metrics and reports into stakeholder systems."
        ],
        techStack: [
            "AngularJS",
            "Spring Boot",
            "Java",
            "SQL",
            "REST APIs",
            "Full Stack Development"
        ],
        logo: jspl
    },

    {
        role: "Intern in Machine Learning and Data Analytics",
        company: "Ripik.AI",
        years: "July 2024 – Aug 2024",
        desc: "Developed computer vision and OCR systems for industrial applications.",
        details: [
            "Trained YOLO object detection models for industrial use cases.",
            "Built OCR models improving document recognition accuracy.",
            "Created dashboards and analytics for client reporting."
        ],
        techStack: [
            "Python",
            "YOLO",
            "Ultralytics",
            "OpenCV",
            "Computer Vision",
            "Deep Learning"
        ],
        logo: ripik
    },

    {
        role: "Software Engineering Fellow",
        company: "Headstarter AI",
        years: "July 2024 – Sept 2024",
        desc: "Built multiple AI applications using modern full-stack technologies.",
        details: [
            "Developed AI-powered apps using React, OpenAI APIs, and visualization tools.",
            "Led peer reviews and engineering presentations.",
            "Mentored engineering fellows in full-stack development."
        ],
        techStack: [
            "Next.js",
            "React",
            "OpenAI API",
            "Pinecone",
            "Stripe API",
            "Full Stack Development"
        ],
        logo: headstarter
    }
];

export default EXPERIENCES;
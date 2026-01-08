// Portfolio Data - Structured content from CV

export interface PersonalInfo {
  name: string;
  title: string;
  titles: string[]; // For rotating animation
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  details?: string[];
  role: string[];
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  honors?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResearchRole {
  title: string;
  institution: string;
  period: string;
}

// Personal Information
export const personalInfo: PersonalInfo = {
  name: "Alejandro Quijada Leyton",
  title: "Full-Stack Engineer | Backend Engineer | HCI Researcher | Game Developer",
  titles: [
    "Full-Stack Engineer",
    "Backend Engineer",
    "HCI Researcher",
    "Game Developer"
  ],
  email: "alejandroquijadaleyton@gmail.com",
  linkedin: "https://www.linkedin.com/in/alejandro-quijada-b364b5235/",
  github: "https://github.com/aleql",
  portfolio: "https://eye-search.ucl.ac.uk"
};

// Professional Summary
export const professionalSummary = "Senior Full-Stack and Backend Engineer with more than ten years of experience building scalable, production-grade systems across AI-driven web platforms, data-intensive pipelines, and game development. Strong background in Unity gameplay systems, backend architecture, distributed systems, and optimization workflows. Experienced Human-Computer Interaction researcher with academic publications and long-term research collaborations in serious games and therapeutic applications. Proven ability to lead technical initiatives, collaborate with multidisciplinary teams, and deliver robust systems using modern cloud infrastructure and CI/CD practices.";

export const coreStrengths = [
  "Backend architecture and scalable systems",
  "Gameplay systems and interactive applications",
  "UX and HCI-driven development",
  "Research-informed design and evaluation",
  "AI-assisted optimization and LLM-driven pipelines"
];

// Skills organized by category
export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: ["C#", "C", "C++", "Python", "Java", "Ruby", "JavaScript", "TypeScript", "Rust", "SQL", "PHP"]
  },
  {
    category: "Frameworks & Tools",
    items: ["Unity", "React", "Node.js", "Flask", "Django", "Vue", "Tailwind CSS", "Unreal Engine", "Godot", "Ruby on Rails"]
  },
  {
    category: "Data & Machine Learning",
    items: ["PyTorch", "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "Apache Spark", "Apache Beam", "Hadoop", "FAISS"]
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS (EC2, Lambda, S3, DynamoDB)", "GCP (BigQuery, Dataflow, Vertex AI, Gemini)", "MongoDB", "MySQL", "PostgreSQL", "Apache Kafka", "Docker"]
  },
  {
    category: "Specializations",
    items: ["Full-Stack Development", "Backend Systems", "Game Development", "HCI Research", "Gamification", "Big Data ETL", "LLM Integration", "Distributed Systems"]
  }
];

// Professional Experience
export const experiences: Experience[] = [
  {
    company: "Rvere",
    role: "Senior Backend Engineer",
    period: "Apr 2025 – Present",
    description: [
      "Led performance and scalability improvements for AI-powered web applications",
      "Designed and implemented optimization pipelines using FAISS for semantic search and Gemini-based LLM workflows for automated code and asset transformations",
      "Built robust testing infrastructure for LLM-driven optimization and transformation pipelines",
      "Developed backend services with Python and React, deployed through CI/CD pipelines on Google Cloud Platform",
      "Contributed to product design discussions and development of custom LLM models focused on optimization of Shopify-based websites"
    ],
    technologies: ["Python", "Node.js", "MySQL", "AWS (EC2, DynamoDB, Lambda, S3)", "LLM integration libraries (Aider, claude-code, gemini-cli)", "GCP (Gemini, Vertex AI)", "BigQuery", "React"]
  },
  {
    company: "University of Oxford, Medical Sciences Division",
    role: "Full-Stack Developer",
    period: "Jul 2024 – Apr 2025",
    location: "Oxford, United Kingdom",
    description: [
      "Developed and maintained the Multi-Dimensional Viewer (MDV), a platform for analyzing, annotating, and sharing multi-dimensional biological data",
      "Designed and implemented full-stack architecture using React, TypeScript, Node.js, Python, Flask, Apache Kafka, and PostgreSQL",
      "Collaborated with researchers across the Medical Sciences Division to implement computational methods for biological data analysis",
      "Improved application performance and user experience through optimized data ingestion and visualization pipelines"
    ],
    technologies: ["React", "TypeScript", "Node.js", "Python", "Flask", "Apache Kafka", "PostgreSQL", "Polars", "Dask", "Celery"]
  },
  {
    company: "23People – Equifax",
    role: "Software Engineer",
    period: "Dec 2023 – Jul 2024",
    description: [
      "Built and optimized Big Data ETL pipelines using Google Cloud Platform services including BigQuery and Dataflow",
      "Implemented scalable data processing systems using Apache Beam, Python, and Flask",
      "Collaborated with distributed teams handling large-scale financial and credit datasets"
    ],
    technologies: ["Python", "Flask", "Apache Spark", "Apache Beam", "GCP (BigQuery, Dataflow)"]
  },
  {
    company: "UCL Institute of Cognitive Neuroscience",
    role: "Full-Stack Developer & UX Designer",
    period: "Jan 2020 – Aug 2023",
    location: "London, United Kingdom",
    description: [
      "Full-Stack and Game Developer on Alex Leff's team, contributing to therapeutic applications including Eye-Search, ReadRight, and iTalk",
      "Led Human-Computer Interaction research and the complete redesign of Eye-Search, a gamified, open-source, self-guided web-based therapy for hemianopia",
      "Applied gamification techniques to improve user adherence, engagement, and long-term retention in clinical web-based therapies",
      "Conducted user studies and quantitative data analysis to evaluate engagement metrics and therapeutic outcomes",
      "Modernized legacy Flash-based systems and migrated applications to Unity WebGL, integrating cloud-based backends to improve performance and scalability"
    ],
    technologies: ["Python", "Unity WebGL", "Node.js", "MySQL", "AWS (EC2, DynamoDB, Lambda, S3)", "SAS", "R"],
    link: "https://eye-search.ucl.ac.uk"
  },
  {
    company: "Gamaga – Kongregate",
    role: "Software Engineer",
    period: "Apr 2023 – Aug 2023",
    description: [
      "Developed gameplay systems for the MMO RPG Bit Heroes Quest using Unity and C#",
      "Integrated backend systems using Java, PHP, and AWS services",
      "Collaborated closely with designers, artists, and QA to deliver stable, production-ready features",
      "Participated in code reviews and CI/CD workflow improvements",
      "Created builds for Steam, iOS, Android, Windows, and WebGL platforms",
      "Responsible for deployment processes and server maintenance"
    ],
    technologies: ["Unity 3D", "C#", "Java", "PHP", "AWS (Lambda, DynamoDB, S3)"]
  },
  {
    company: "Incremental SPA",
    role: "Full-Stack Developer",
    period: "Jan 2019 – Jan 2019",
    description: [
      "Platform for big data analysis and synchronization of education data for school management",
      "Full-Stack development and implementation of Big Data ETL pipelines"
    ],
    technologies: ["Ruby on Rails", "Python", "Node.js", "MongoDB", "Vue", "GCP (App Engine, Compute Engine, Cloud Storage, BigQuery)"]
  },
  {
    company: "Project ALeRCE (NLHPC)",
    role: "Backend Developer",
    period: "Jun 2018 – Dec 2018",
    description: [
      "Developed backend systems for ALeRCE, a real-time astronomical alert broker processing data from the Zwicky Transient Facility (ZTF)",
      "Worked on high-throughput data pipelines using distributed systems and streaming architectures"
    ],
    technologies: ["Python", "Node.js", "MongoDB", "Apache Kafka", "Apache Spark"],
    link: "https://alerce.science"
  },
  {
    company: "GERO Institute",
    role: "Game Developer",
    period: "Jul 2017 – Dec 2017",
    description: [
      "Developed serious video games focused on Alzheimer's disease prevention",
      "Worked on Sinapp, an educational game promoting healthy cognitive habits through gameplay systems"
    ],
    technologies: ["Unity 3D"]
  },
  {
    company: "Newtenberg",
    role: "Software Engineer Intern",
    period: "Jan 2016 – Mar 2016",
    description: [
      "Developed data visualization software for public infrastructure and state digitalization projects in Chile",
      "Worked on systems for managing large collections of data and improving communication with citizens"
    ],
    technologies: ["Three.js", "JavaScript", "Python"]
  }
];

// Notable Projects
export const projects: Project[] = [
  {
    title: "Eye-Search",
    subtitle: "Gamified Web-Based Therapy for Hemianopia",
    description: "A free, open, self-guided, web-based therapeutic intervention designed to support patients with hemianopia, a visual impairment caused by damage to visual processing areas of the brain.",
    details: [
      "Improves visual search speed and accuracy through structured practice and compensatory strategies",
      "Features intrinsic and extrinsic reward systems based on daily tasks with in-game items",
      "Includes NPC companion to increase social relatedness and user motivation",
      "Implements spaced practice mechanics to support motor skill learning and long-term retention",
      "Research collaboration between University of Chile and University College London"
    ],
    role: ["Full-Stack Developer", "Gameplay Systems Developer", "UX Designer", "HCI Researcher"],
    technologies: ["Unity WebGL", "Node.js", "MySQL", "AWS", "React"],
    liveUrl: "https://eye-search.ucl.ac.uk",
    featured: true
  },
  {
    title: "ReadRight",
    subtitle: "Therapeutic Application for Hemianopic Alexia",
    description: "A practice-based therapy application designed to improve reading speed in patients with Hemianopic Alexia, featuring structured reading exercises combined with progress tracking.",
    details: [
      "Real-time data collection and progress visualization",
      "Clinician access to patient performance metrics",
      "Backend architecture enabling seamless system integration"
    ],
    role: ["Backend Developer", "Full-Stack Contributor"],
    technologies: ["Unity", "React", "Node.js", "WebGL"],
    featured: true
  },
  {
    title: "COANIQUEM Rehabilitation Games",
    subtitle: "Serious Games and VR for Pediatric Burn Rehabilitation",
    description: "Two rehabilitation-focused applications developed for COANIQUEM, a non-profit institution dedicated to the rehabilitation of children with burn injuries.",
    details: [
      "VR application for social reintegration sessions in controlled simulated environments",
      "Motion-based game capturing joint range-of-motion data during play",
      "Provides therapists with measurable indicators to track patient progress",
      "Developed in collaboration with rehabilitation specialists"
    ],
    role: ["Game Designer", "Gameplay Developer", "UX Researcher"],
    technologies: ["Unity 3D", "R", "Python"],
    featured: true
  },
  {
    title: "ALeRCE",
    subtitle: "Astronomical Alert Broker for ZTF Data",
    description: "Real-time alert broker that processes astronomical events from the Zwicky Transient Facility (ZTF). The system classifies and distributes transient alerts at scale for the astronomical community.",
    role: ["Backend Developer"],
    technologies: ["Python", "Node.js", "MongoDB", "Apache Kafka", "Apache Spark"],
    liveUrl: "https://alerce.science",
    featured: true
  },
  {
    title: "Sinapp / Sinapp2D",
    subtitle: "Educational Serious Game for Alzheimer's Disease Prevention",
    description: "A mobile serious game teaching children and the general audience about lifestyle habits that contribute to cognitive health and Alzheimer's disease prevention.",
    details: [
      "Player maintains and expands a neuronal network over character's lifespan",
      "Balances four core activities: physical exercise, reading, sports, and healthy diet",
      "Educational message reinforced through mechanics rather than exposition"
    ],
    role: ["Gameplay Programmer"],
    technologies: ["Unity 3D"],
    featured: false
  },
  {
    title: "Education Data Platform",
    subtitle: "Large-Scale Education Data Synchronization and Analytics",
    description: "Platform designed for analysis and synchronization of large-scale education data used in school management systems, handling real-time data ingestion, transformation, and reporting.",
    details: [
      "Scalable microservices architecture",
      "Supports thousands of concurrent users",
      "Continuous data updates across multiple institutions"
    ],
    role: ["Backend and Full-Stack Developer"],
    technologies: ["Vue", "Ruby on Rails", "Python", "Node.js", "MongoDB", "GCP"],
    featured: false
  }
];

// Education
export const education: Education[] = [
  {
    degree: "Master in Game Design and Development",
    institution: "European University of Madrid",
    period: "2026 – 2027"
  },
  {
    degree: "Master of Science in Computer Science",
    institution: "University of Chile",
    period: "2022",
    honors: "Graduated with highest honors"
  },
  {
    degree: "Bachelor of Engineering in Civil Computer Science",
    institution: "University of Chile",
    period: "2018",
    honors: "Graduated with highest honors"
  }
];

// Research & Academic Roles
export const researchRoles: ResearchRole[] = [
  {
    title: "Honorary Researcher",
    institution: "UCL Institute of Cognitive Neuroscience, University College London",
    period: "Jul 2020 – Present"
  },
  {
    title: "Human-Computer Interaction Researcher",
    institution: "Department of Computer Science, University of Chile",
    period: "Mar 2020 – Present"
  },
  {
    title: "Game UX Researcher and Game Developer",
    institution: "University of Chile Department of Computer Science",
    period: "Oct 2023 – Present"
  }
];

// Teaching Experience
export const teaching = {
  title: "Head Teacher, Algorithms and Data Structures",
  institution: "University of Chile",
  period: "2024",
  responsibilities: [
    "Designed and delivered undergraduate-level coursework on algorithms, data structures, and problem solving",
    "Mentored students on algorithmic thinking, complexity analysis, and code quality"
  ]
};

// Areas of Expertise
export const areasOfExpertise = [
  "Full-Stack Development",
  "Backend Systems and Architecture",
  "AI and LLM-Based Optimization",
  "Game Design and Game Development",
  "Gameplay Systems",
  "Human-Computer Interaction",
  "Gamification",
  "Data Science and Machine Learning",
  "Big Data and Distributed Systems",
  "UX Research and Research and Development"
];

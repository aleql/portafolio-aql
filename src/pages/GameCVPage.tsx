import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Github, Linkedin, Mail, Gamepad2, Wrench, Trophy, Layers,
  Code2, Zap, Box, GraduationCap, Award, Users, Target, Cpu, Sparkles, ChevronDown,
  MapPin, BookOpen, ArrowRight
} from 'lucide-react';

const contact = {
  name: 'Alejandro Quijada Leyton',
  title: 'Gameplay Engineer | Game Developer | HCI Researcher',
  email: 'alejandroquijadaleyton@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alejandro-quijada-b364b5235/',
  github: 'https://github.com/aleql',
  portfolio: 'https://eye-search.co.uk/'
};

const stats = [
  { label: 'Years Experience', value: '10+', icon: Zap },
  { label: 'Shipped Games', value: '6+', icon: Gamepad2 },
  { label: 'Platforms', value: '5+', icon: Box }
];

const strengths = [
  { text: 'Unity (C#) production development across multiple platforms', icon: Code2 },
  { text: 'Gameplay systems, progression mechanics, and player loops', icon: Target },
  { text: 'Player-focused UX/HCI research and playtesting workflows', icon: Users },
  { text: 'Backend services for live features, analytics, and multiplayer', icon: Cpu },
  { text: 'Cross-platform delivery (WebGL, Steam, iOS, Android, Windows)', icon: Layers },
  { text: 'Serious games and therapeutic gamification', icon: Sparkles }
];

// Full experience list with game-related flag
const allExperience = [
  {
    title: 'Senior Backend Engineer',
    company: 'Rvere',
    period: 'Apr 2025 - Present',
    location: 'Toronto, Canada',
    isGameRelated: false,
    highlights: [
      'Led performance and scalability improvements for AI-powered web applications',
      'Designed optimization pipelines using FAISS for semantic search and Gemini-based LLM workflows',
      'Built testing infrastructure for LLM-driven optimization pipelines',
      'Developed backend services with Python and React on Google Cloud Platform'
    ],
    technologies: ['Python', 'Node.js', 'MySQL', 'AWS', 'GCP (Gemini, Vertex AI)', 'React']
  },
  {
    title: 'Full-Stack Developer',
    company: 'University of Oxford, Medical Sciences Division',
    period: 'Jul 2024 - Apr 2025',
    location: 'Oxford, United Kingdom',
    isGameRelated: false,
    highlights: [
      'Developed Multi-Dimensional Viewer (MDV) for analyzing multi-dimensional biological data',
      'Full-stack architecture with React, TypeScript, Node.js, Python, Flask, Apache Kafka',
      'Collaborated with researchers to implement computational methods for biological data analysis'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'Flask', 'Apache Kafka', 'PostgreSQL']
  },
  {
    title: 'Software Engineer',
    company: '23People - Equifax',
    period: 'Dec 2023 - Jul 2024',
    location: 'Latam',
    isGameRelated: false,
    highlights: [
      'Built and optimized Big Data ETL pipelines using Google Cloud Platform',
      'Implemented scalable data processing systems using Apache Beam',
      'Collaborated with distributed teams handling large-scale financial datasets'
    ],
    technologies: ['Python', 'Flask', 'Apache Spark', 'Apache Beam', 'GCP (BigQuery, Dataflow)']
  },
  {
    title: 'Full-Stack & Game Developer',
    company: 'UCL Institute of Cognitive Neuroscience',
    period: 'Jan 2020 - Aug 2023',
    location: 'London, United Kingdom',
    isGameRelated: true,
    gameHighlight: 'Therapeutic Games & Gamification',
    highlights: [
      'Led complete redesign of Eye-Search, a gamified web-based therapy for hemianopia',
      'Built progression systems, daily rewards, NPC companion mechanics, and engagement loops',
      'Applied gamification techniques to improve user adherence and long-term retention',
      'Migrated legacy Flash-based systems to Unity WebGL with cloud-based backends',
      'Conducted user studies and data analysis to evaluate engagement metrics'
    ],
    technologies: ['Unity WebGL', 'C#', 'Node.js', 'MySQL', 'AWS', 'React', 'R', 'SAS'],
    link: 'https://eye-search.co.uk/'
  },
  {
    title: 'Software Engineer - Gameplay',
    company: 'Gamaga - Kongregate',
    period: 'Apr 2023 - Aug 2023',
    location: 'Latam-USA (Remote)',
    isGameRelated: true,
    gameHighlight: 'MMO RPG Development',
    highlights: [
      'Developed gameplay systems for MMO RPG Bit Heroes Quest using Unity and C#',
      'Integrated backend systems using Java, PHP, and AWS for live content delivery',
      'Collaborated with designers, artists, and QA to deliver production-ready features',
      'Created builds for Steam, iOS, Android, Windows, and WebGL platforms',
      'Responsible for deployment processes and server maintenance'
    ],
    technologies: ['Unity 3D', 'C#', 'Java', 'PHP', 'AWS (Lambda, DynamoDB, S3)']
  },
  {
    title: 'Full-Stack Developer',
    company: 'Incremental SPA',
    period: 'Jan 2019',
    location: 'Chile',
    isGameRelated: false,
    highlights: [
      'Platform for big data analysis and synchronization of education data',
      'Full-Stack development and implementation of Big Data ETL pipelines'
    ],
    technologies: ['Ruby on Rails', 'Python', 'Node.js', 'MongoDB', 'Vue', 'GCP']
  },
  {
    title: 'Backend Developer',
    company: 'Project ALeRCE (NLHPC)',
    period: 'Jun 2018 - Dec 2018',
    location: 'Chile',
    isGameRelated: false,
    highlights: [
      'Developed backend for ALeRCE, a real-time astronomical alert broker',
      'Worked on high-throughput data pipelines using distributed systems'
    ],
    technologies: ['Python', 'Node.js', 'MongoDB', 'Apache Kafka', 'Apache Spark'],
    link: 'https://alerce.science'
  },
  {
    title: 'Game Developer',
    company: 'GERO Institute',
    period: 'Jul 2017 - Dec 2017',
    location: 'Chile',
    isGameRelated: true,
    gameHighlight: 'Serious Games',
    highlights: [
      'Developed Sinapp, an educational serious game for Alzheimer\'s disease prevention',
      'Designed gameplay loops teaching healthy cognitive habits through mechanics'
    ],
    technologies: ['Unity 3D', 'C#']
  },
  {
    title: 'Software Engineer Intern',
    company: 'Newtenberg',
    period: 'Jan 2016 - Mar 2016',
    location: 'Chile',
    isGameRelated: false,
    highlights: [
      'Developed data visualization software for public infrastructure projects',
      'Worked on systems for managing large data collections'
    ],
    technologies: ['Three.js', 'JavaScript', 'Python']
  }
];

// Game projects with links to detail pages
const gameProjects = [
  {
    title: 'Bit Heroes Quest',
    slug: null, // No detail page yet
    subtitle: 'MMO RPG - Kongregate',
    role: 'Gameplay Engineer',
    period: 'Apr 2023 - Aug 2023',
    description: 'Mobile and desktop MMO RPG with live ops features, daily content, and cross-platform progression.',
    highlights: [
      'Implemented core gameplay systems and live content features',
      'Backend integration for multiplayer and progression sync',
      'Multi-platform builds: Steam, iOS, Android, Windows, WebGL'
    ],
    technologies: ['Unity', 'C#', 'Java', 'AWS'],
    featured: true
  },
  {
    title: 'Eye-Search',
    slug: 'eye-search',
    subtitle: 'Gamified Therapeutic Application',
    role: 'Full-Stack & Gameplay Systems Developer',
    period: '2020 - 2023',
    description: 'Open-source, gamified web therapy for hemianopia. Research collaboration between UCL and University of Chile.',
    highlights: [
      'Complete gamification redesign improving patient adherence',
      'Progression systems, daily rewards, NPC companion mechanics',
      'Published HCI research on therapeutic gamification'
    ],
    technologies: ['Unity WebGL', 'Node.js', 'MySQL', 'AWS', 'React'],
    link: 'https://eye-search.co.uk/',
    featured: true
  },
  {
    title: 'COANIQUEM VR Social Reintegration',
    slug: 'coaniquem',
    subtitle: 'VR Serious Game',
    role: 'Game Designer & Developer',
    period: '2019 - Present',
    description: 'VR application for pediatric burn rehabilitation, placing children in controlled social scenarios.',
    highlights: [
      'VR environments simulating social situations',
      'Therapist observation tools for behavioral analysis',
      'Validated with rehabilitation specialists'
    ],
    technologies: ['Unity VR', 'C#'],
    featured: true
  },
  {
    title: 'ReadRight',
    slug: 'readright',
    subtitle: 'Therapeutic Reading Application',
    role: 'Backend Developer & Full-Stack Contributor',
    period: '2020 - 2023',
    description: 'Practice-based therapy for Hemianopic Alexia with structured reading exercises and clinician dashboards.',
    highlights: [
      'Backend architecture for real-time data collection',
      'Clinician access to patient performance metrics',
      'Integration with clinical workflows'
    ],
    technologies: ['Unity', 'React', 'Node.js', 'WebGL'],
    link: 'https://readright.ucl.ac.uk/',
    featured: true
  },
  {
    title: 'COANIQUEM Motion Rehab Game',
    slug: 'coaniquem',
    subtitle: 'Motion-Based Rehabilitation',
    role: 'Gameplay Developer & UX Researcher',
    period: '2019 - Present',
    description: 'Motion-capture game for joint mobility rehabilitation, turning physical therapy into engaging gameplay.',
    highlights: [
      'Real-time joint range-of-motion tracking',
      'Gamified exercises with progress metrics'
    ],
    technologies: ['Unity 3D', 'C#', 'R', 'Python'],
    featured: false
  },
  {
    title: 'Sinapp / Sinapp2D',
    slug: 'sinapp',
    subtitle: 'Educational Serious Game',
    role: 'Gameplay Programmer',
    period: '2017',
    description: 'Mobile game teaching Alzheimer\'s prevention through lifestyle habits and neuronal network mechanics.',
    highlights: [
      'Gameplay loops reinforcing healthy cognitive habits',
      'Activity balancing mechanics'
    ],
    technologies: ['Unity 3D', 'C#'],
    featured: false
  }
];

const gameSkillCategories = [
  {
    category: 'Game Engines & Tools',
    icon: Gamepad2,
    items: ['Unity (Expert)', 'Unreal Engine 5', 'Godot', 'Unity WebGL', 'Unity VR']
  },
  {
    category: 'Programming',
    icon: Code2,
    items: ['C#', 'C++', 'Python', 'JavaScript/TypeScript', 'Java', 'PHP']
  },
  {
    category: 'Gameplay Systems',
    icon: Target,
    items: ['Progression Design', 'Combat Systems', 'AI Behavior', 'Economy Balancing', 'Live Ops Features']
  },
  {
    category: 'Game UX & Design',
    icon: Users,
    items: ['Player-Centric Design', 'Playtesting', 'UI Systems', 'Gamification', 'Retention Strategies']
  },
  {
    category: 'Backend & Live Services',
    icon: Cpu,
    items: ['AWS (Lambda, DynamoDB, S3)', 'Node.js', 'MySQL', 'Player Analytics', 'CI/CD Pipelines']
  },
  {
    category: 'Platforms',
    icon: Layers,
    items: ['Steam', 'iOS', 'Android', 'Windows', 'WebGL', 'VR']
  }
];

const education = [
  {
    degree: 'Master in Game Design and Development',
    institution: 'European University of Madrid, Creative Campus',
    period: '2025 - Expected 2026 Q4',
    description: 'Technology-focused program on game engine development and gameplay systems.',
    focus: [
      'Unreal Engine 5 (C++/Blueprint) & Unity (C#)',
      'Gameplay loops, progression mechanics, combat systems, AI behavior',
      'Level design, spatial theory, environmental storytelling',
      'UX for games, playtesting methodologies',
      'Multiplayer architecture, network programming',
      'F2P design, ethical monetization, economy balancing'
    ],
    current: true,
    isGameRelated: true
  },
  {
    degree: 'Master of Science in Computer Science (HCI Focus)',
    institution: 'University of Chile',
    period: '2022',
    honors: 'Graduated with highest honors',
    description: 'Specialized in Human-Computer Interaction, gamification, and interactive systems design.',
    focus: [
      'HCI theory, usability, user-centered design',
      'Gamification theory and game design elements',
      'Motivation, engagement, and adherence in interactive applications',
      'Research methods for interactive computing'
    ],
    isGameRelated: true
  },
  {
    degree: 'Bachelor of Engineering in Computer Science',
    institution: 'University of Chile',
    period: '2018',
    honors: 'Graduated with highest honors',
    isGameRelated: false
  }
];

const researchRoles = [
  {
    title: 'Game UX Researcher & Developer',
    institution: 'University of Chile, Department of Computer Science',
    period: 'Oct 2023 - Present',
    description: 'VR serious games for pediatric rehabilitation and motion-based therapeutic games.',
    isGameRelated: true
  },
  {
    title: 'Honorary Researcher',
    institution: 'UCL Institute of Cognitive Neuroscience',
    period: 'Jul 2020 - Present',
    description: 'Research on gamification in therapeutic applications and serious games.',
    isGameRelated: true
  },
  {
    title: 'HCI Researcher',
    institution: 'University of Chile, Department of Computer Science',
    period: 'Mar 2020 - Present',
    description: 'Human-Computer Interaction research with focus on gamification and engagement.',
    isGameRelated: true
  }
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
  }
};

export default function GameCVPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-game-dark">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-game-darker dark:via-game-dark dark:to-game-darker" />
        <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-40" />
        <div className="absolute inset-0 hex-pattern opacity-30 dark:opacity-50" />

        {/* Animated scan line */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary-500/10 to-transparent blur-sm"
        />

        {/* Floating hexagons */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              position: 'absolute',
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            className="w-12 h-12 md:w-20 md:h-20"
          >
            <div className="w-full h-full border-2 border-primary-500 dark:border-primary-400 opacity-20 dark:opacity-30"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            />
          </motion.div>
        ))}

        {/* Particle dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="w-1 h-1 md:w-2 md:h-2 bg-accent-500 dark:bg-accent-400 rounded-full"
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-game-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-game-border"
      >
        <div className="container mx-auto px-4 max-w-6xl py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Full Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 border-2 border-transparent dark:border-primary-500/30 hover:bg-gray-200 dark:hover:bg-game-border transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 border-2 border-transparent dark:border-primary-500/30 hover:bg-gray-200 dark:hover:bg-game-border transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 border-2 border-transparent dark:border-primary-500/30 hover:bg-gray-200 dark:hover:bg-game-border transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            {/* Game Dev Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400 border-2 border-accent-500/30 dark:border-accent-500/50 rounded-full px-4 py-2 mb-8"
            >
              <Gamepad2 size={18} className="animate-pulse" />
              <span className="text-sm font-semibold font-mono uppercase tracking-wider">Game Developer CV</span>
            </motion.div>

            {/* Name with glitch effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-game text-gray-900 dark:text-white relative inline-block">
                <span className="relative z-10 dark:text-glow-lg">{contact.name}</span>
                <span className="absolute inset-0 text-primary-500 dark:text-primary-400 opacity-70 animate-glitch hidden dark:inline"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
                  {contact.name}
                </span>
                <span className="absolute inset-0 text-accent-500 dark:text-accent-400 opacity-70 animate-glitch hidden dark:inline"
                  style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', animationDelay: '0.1s' }}>
                  {contact.name}
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <div className="h-16 md:h-20 mb-10 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 text-xl md:text-3xl lg:text-4xl font-semibold font-game"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-accent-600 dark:text-accent-400"
                >
                  <Gamepad2 size={36} />
                </motion.div>
                <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-neon-pink bg-clip-text text-transparent dark:from-primary-400 dark:via-accent-400 dark:to-neon-pink">
                  {contact.title}
                </span>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-500/20 dark:from-accent-500/30 dark:to-primary-500/30 blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-white/80 dark:bg-game-card/80 backdrop-blur-sm border-2 border-accent-500/30 dark:border-accent-500/50 rounded-sm p-4 md:p-6 corner-cut">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <stat.icon className="text-accent-600 dark:text-accent-400" size={20} />
                      <div className="text-2xl md:text-3xl font-bold font-mono text-accent-600 dark:text-accent-400 dark:text-glow">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-mono">
                      {stat.label}
                    </div>
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-accent-500 dark:border-accent-400" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary-500 dark:border-primary-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500/5 to-transparent dark:via-accent-500/10 rounded-lg blur-xl" />
                <p className="relative text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 py-6 border-l-2 border-r-2 border-accent-500/30 dark:border-accent-500/50">
                  <span className="text-accent-600 dark:text-accent-400 font-semibold">Gameplay Engineer</span> with 10+ years building
                  <span className="text-primary-600 dark:text-primary-400 font-semibold"> production game systems</span>,
                  <span className="text-neon-green dark:text-neon-green font-semibold"> serious games</span>, and
                  <span className="text-neon-pink dark:text-neon-pink font-semibold"> therapeutic applications</span>.
                  Unity expert with shipped titles across mobile, desktop, and web platforms.
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.button
                onClick={() => scrollToSection('experience')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 font-semibold font-mono uppercase tracking-wider text-white overflow-hidden group corner-cut"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 dark:from-accent-500 dark:to-primary-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  <Gamepad2 size={20} />
                  View Experience
                </span>
              </motion.button>

              <motion.a
                href={`mailto:${contact.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 font-semibold font-mono uppercase tracking-wider group corner-cut"
              >
                <div className="absolute inset-0 border-2 border-accent-600 dark:border-accent-500 group-hover:shadow-neon-lg transition-all" />
                <div className="absolute inset-0 bg-accent-500/10 dark:bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-accent-600 dark:text-accent-400 flex items-center gap-2">
                  <Mail size={20} />
                  Contact Me
                </span>
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              onClick={() => scrollToSection('strengths')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1.5, duration: 0.5 },
                y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }}
              className="text-gray-400 dark:text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ChevronDown size={32} className="dark:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            </motion.button>
          </div>
        </section>

        {/* Core Strengths */}
        <section id="strengths" className="py-20 px-4 bg-white/50 dark:bg-game-darker/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Trophy className="text-accent-500 dark:text-accent-400" />
                Core Strengths
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Combining technical expertise with player-focused design and research-driven development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strengths.map((strength, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-primary-500/10 dark:from-accent-500/20 dark:to-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative bg-white/80 dark:bg-game-card/80 backdrop-blur-sm border-2 border-gray-200 dark:border-game-border rounded-lg p-5 hover:border-accent-500/50 dark:hover:border-accent-500/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-accent-500/10 dark:bg-accent-500/20 rounded-lg text-accent-600 dark:text-accent-400">
                        <strength.icon size={20} />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{strength.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Experience - Game roles highlighted */}
        <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-game-dark">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Zap className="text-primary-600 dark:text-primary-400" />
                Professional Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Full career history - <span className="text-accent-600 dark:text-accent-400 font-semibold">game-related roles highlighted</span>
              </p>
            </motion.div>

            <div className="relative">
              {allExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative pl-8 pb-12 last:pb-0 ${
                    exp.isGameRelated
                      ? 'border-l-2 border-accent-500/50 dark:border-accent-500/70'
                      : 'border-l-2 border-gray-300/50 dark:border-gray-600/50'
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 shadow-md ${
                      exp.isGameRelated
                        ? 'bg-accent-600 dark:bg-accent-400 border-white dark:border-game-dark dark:shadow-neon'
                        : 'bg-gray-400 dark:bg-gray-500 border-white dark:border-game-dark'
                    }`}
                  />

                  <div className={`backdrop-blur-sm border-2 rounded-lg p-6 transition-all ${
                    exp.isGameRelated
                      ? 'bg-accent-50/80 dark:bg-game-card/90 border-accent-500/30 dark:border-accent-500/50 hover:border-accent-500/50 dark:hover:border-accent-500/70'
                      : 'bg-white/80 dark:bg-game-card/60 border-gray-200 dark:border-game-border hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    {/* Game-related badge */}
                    {exp.isGameRelated && (
                      <div className="flex items-center gap-2 mb-3">
                        <Gamepad2 className="text-accent-500 dark:text-accent-400" size={16} />
                        <span className="text-xs font-semibold font-mono uppercase tracking-wider text-accent-600 dark:text-accent-400 bg-accent-500/10 dark:bg-accent-500/20 px-2 py-1 rounded-full">
                          {exp.gameHighlight || 'Game Development'}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold font-game text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-lg font-semibold ${
                            exp.isGameRelated
                              ? 'text-accent-600 dark:text-accent-400'
                              : 'text-primary-600 dark:text-primary-400'
                          }`}>
                            {exp.company}
                          </span>
                          {exp.link && (
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.period}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1 justify-end mt-1">
                          <MapPin size={14} />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 flex gap-2">
                          <span className={exp.isGameRelated ? 'text-accent-600 dark:text-accent-400' : 'text-primary-600 dark:text-primary-400'}>-</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-sm rounded-full border ${
                            exp.isGameRelated
                              ? 'bg-accent-500/10 dark:bg-accent-500/20 text-accent-700 dark:text-accent-300 border-accent-500/30'
                              : 'bg-gray-100 dark:bg-game-dark text-gray-600 dark:text-gray-400 border-gray-200 dark:border-game-border'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Projects - Clickable */}
        <section id="projects" className="py-20 px-4 bg-white/50 dark:bg-game-darker/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Trophy className="text-neon-yellow dark:text-neon-yellow" />
                Game Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Click on projects to view full details
              </p>
            </motion.div>

            {/* Featured Projects */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {gameProjects.filter(p => p.featured).map((project, index) => {
                const ProjectWrapper = project.slug ? Link : 'div';
                const wrapperProps = project.slug
                  ? { to: `/project/${project.slug}` }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-500/20 dark:from-accent-500/30 dark:to-primary-500/30 blur-xl group-hover:blur-2xl transition-all" />
                    <ProjectWrapper
                      {...wrapperProps}
                      className={`relative block bg-white/90 dark:bg-game-card/90 backdrop-blur-sm border-2 border-accent-500/30 dark:border-accent-500/50 rounded-lg p-6 h-full ${
                        project.slug ? 'cursor-pointer hover:border-accent-500 dark:hover:border-accent-400' : ''
                      }`}
                    >
                      {/* Featured badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="text-neon-yellow fill-neon-yellow dark:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" size={20} />
                          <span className="text-sm font-semibold font-mono uppercase tracking-wider text-neon-yellow">Featured</span>
                        </div>
                        {project.slug && (
                          <ArrowRight size={20} className="text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="text-xl font-bold font-game text-gray-900 dark:text-white">{project.title}</h3>
                            <p className="text-accent-600 dark:text-accent-400 font-medium">{project.subtitle}</p>
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.role} | {project.period}</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex gap-2">
                            <span className="text-accent-600 dark:text-accent-400">-</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 border border-primary-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* View details hint */}
                      {project.slug && (
                        <div className="mt-4 pt-4 border-t border-accent-500/20 dark:border-accent-500/30">
                          <span className="text-sm text-accent-600 dark:text-accent-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Full Details
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      )}

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-500 dark:border-accent-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-500 dark:border-primary-400" />
                    </ProjectWrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Other Projects */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameProjects.filter(p => !p.featured).map((project, index) => {
                const ProjectWrapper = project.slug ? Link : 'div';
                const wrapperProps = project.slug
                  ? { to: `/project/${project.slug}` }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProjectWrapper
                      {...wrapperProps}
                      className={`block bg-white/80 dark:bg-game-card/80 backdrop-blur-sm border-2 border-gray-200 dark:border-game-border rounded-lg p-5 h-full transition-all ${
                        project.slug ? 'cursor-pointer hover:border-accent-500/50 dark:hover:border-accent-500/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold font-game text-gray-900 dark:text-white">{project.title}</h3>
                        {project.slug && (
                          <ArrowRight size={16} className="text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      <p className="text-accent-600 dark:text-accent-400 text-sm font-medium mb-2">{project.subtitle}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{project.role} | {project.period}</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-game-dark text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-game-border"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                      {project.slug && (
                        <p className="text-xs text-accent-600 dark:text-accent-400 mt-3">Click for details</p>
                      )}
                    </ProjectWrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-game-dark">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Wrench className="text-primary-600 dark:text-primary-400" />
                Technical Skills
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tools, technologies, and expertise for game development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameSkillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 dark:bg-game-card/80 backdrop-blur-sm border-2 border-gray-200 dark:border-game-border rounded-lg p-5 hover:border-primary-500/30 dark:hover:border-primary-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg text-primary-600 dark:text-primary-400">
                      <category.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold font-game text-gray-900 dark:text-white">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-game-dark text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-game-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="py-20 px-4 bg-white/50 dark:bg-game-darker/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <GraduationCap className="text-accent-600 dark:text-accent-400" />
                Education
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Academic background - <span className="text-accent-600 dark:text-accent-400 font-semibold">game-relevant degrees highlighted</span>
              </p>
            </motion.div>

            <div className="space-y-6 mb-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative backdrop-blur-sm border-2 rounded-lg p-6 ${
                    edu.isGameRelated
                      ? 'bg-accent-50/80 dark:bg-game-card/90 border-accent-500/50 dark:border-accent-500/70'
                      : 'bg-white/80 dark:bg-game-card/60 border-gray-200 dark:border-game-border'
                  }`}
                >
                  {edu.current && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-accent-500/10 dark:bg-accent-500/20 rounded-full">
                      <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">Currently Enrolled</span>
                    </div>
                  )}

                  {edu.isGameRelated && !edu.current && (
                    <div className="flex items-center gap-2 mb-3">
                      <Gamepad2 className="text-accent-500 dark:text-accent-400" size={16} />
                      <span className="text-xs font-semibold font-mono uppercase tracking-wider text-accent-600 dark:text-accent-400">
                        Game-Relevant
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold font-game text-gray-900 dark:text-white mb-1 pr-32">
                    {edu.degree}
                  </h3>
                  <p className={`font-medium mb-1 ${edu.isGameRelated ? 'text-accent-600 dark:text-accent-400' : 'text-primary-600 dark:text-primary-400'}`}>
                    {edu.institution}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{edu.period}</p>

                  {edu.honors && (
                    <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-3">
                      <Award size={16} />
                      <span>{edu.honors}</span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>
                  )}

                  {edu.focus && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Program Focus:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {edu.focus.map((item, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex gap-2">
                            <span className={edu.isGameRelated ? 'text-accent-600 dark:text-accent-400' : 'text-primary-600 dark:text-primary-400'}>-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Research Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold font-game text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <BookOpen className="text-primary-600 dark:text-primary-400" />
                Research & Academic Roles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchRoles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`backdrop-blur-sm border-2 rounded-lg p-5 ${
                      role.isGameRelated
                        ? 'bg-accent-50/80 dark:bg-game-card/90 border-accent-500/30 dark:border-accent-500/50'
                        : 'bg-white/80 dark:bg-game-card/80 border-gray-200 dark:border-game-border'
                    }`}
                  >
                    {role.isGameRelated && (
                      <div className="flex items-center gap-1 mb-2">
                        <Gamepad2 className="text-accent-500 dark:text-accent-400" size={14} />
                        <span className="text-xs text-accent-600 dark:text-accent-400 font-semibold">Game-Related</span>
                      </div>
                    )}
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{role.title}</h4>
                    <p className={`font-medium text-sm mb-1 ${role.isGameRelated ? 'text-accent-600 dark:text-accent-400' : 'text-primary-600 dark:text-primary-400'}`}>
                      {role.institution}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{role.period}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{role.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-20 px-4 bg-gradient-to-br from-accent-600 to-primary-600 dark:from-accent-700 dark:to-primary-700 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 hex-pattern opacity-10" />

          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-game text-white mb-6">
                Let's Build Something Great
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Looking for a gameplay engineer with production experience, research background, and passion for player-focused design?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href={`mailto:${contact.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-accent-600 font-semibold font-mono uppercase tracking-wider rounded-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Mail size={20} />
                  Get in Touch
                </motion.a>

                <motion.a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-semibold font-mono uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.a>

                <motion.a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-semibold font-mono uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-900 dark:bg-game-darker border-t border-gray-800 dark:border-game-border">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-gray-400 text-sm">
              {new Date().getFullYear()} {contact.name} - Game Developer Portfolio
            </p>
            <Link
              to="/"
              className="text-primary-400 hover:text-primary-300 text-sm mt-2 inline-block"
            >
              View Full Portfolio
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code2, Cpu, Zap, Box } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personalInfo.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-game-darker dark:via-game-dark dark:to-game-darker scanlines">
      {/* Animated grid and hex pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-100">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 hex-pattern opacity-50" />

        {/* Animated scan effect */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary-500/10 to-transparent blur-sm"
        />

        {/* Floating hexagons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              position: 'absolute',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            className="w-16 h-16 md:w-24 md:h-24"
          >
            <div className="w-full h-full border-2 border-primary-500 dark:border-primary-400 opacity-20 dark:opacity-30"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            />
          </motion.div>
        ))}

        {/* Particle dots */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
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
            className="w-1 h-1 md:w-2 md:h-2 bg-primary-500 dark:bg-primary-400 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 crt-glow">
        <div className="text-center">
          {/* Tech indicator badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-primary-500/10 dark:bg-primary-500/20 border-2 border-primary-500 dark:border-primary-400 rounded-sm text-primary-700 dark:text-primary-400 font-mono text-sm backdrop-blur-sm relative corner-cut"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Box size={16} />
            </motion.div>
            <span className="uppercase tracking-wider">10+ Years • Full-Stack • Backend • Game Dev</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </motion.div>

          {/* Name with intense glitch and glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-game text-gray-900 dark:text-white mb-2 relative inline-block">
              <span className="relative z-10 dark:text-glow-lg">
                {personalInfo.name}
              </span>
              {/* Multiple glitch layers for more effect */}
              <span className="absolute inset-0 text-primary-500 dark:text-primary-400 opacity-70 animate-glitch hidden dark:inline" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
                {personalInfo.name}
              </span>
              <span className="absolute inset-0 text-accent-500 dark:text-accent-400 opacity-70 animate-glitch hidden dark:inline" style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', animationDelay: '0.1s' }}>
                {personalInfo.name}
              </span>
              <span className="absolute inset-0 text-neon-green dark:text-neon-green opacity-40 animate-glitch hidden dark:inline" style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)', animationDelay: '0.2s' }}>
                {personalInfo.name}
              </span>
            </h1>
          </motion.div>

          {/* Rotating Title with enhanced visuals */}
          <div className="h-24 md:h-28 mb-10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent dark:via-primary-500/10 blur-xl" />
            <motion.div
              key={titleIndex}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 text-2xl md:text-4xl lg:text-5xl font-semibold font-game relative"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-primary-600 dark:text-primary-400"
              >
                {titleIndex === 0 && <Code2 size={48} />}
                {titleIndex === 1 && <Cpu size={48} />}
                {titleIndex === 2 && <Zap size={48} />}
                {titleIndex === 3 && <Box size={48} />}
              </motion.div>
              <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-neon-pink bg-clip-text text-transparent dark:from-primary-400 dark:via-accent-400 dark:to-neon-pink dark:text-glow-lg">
                {personalInfo.titles[titleIndex]}
              </span>
            </motion.div>
          </div>

          {/* Professional stats with gaming UI */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-3xl mx-auto"
          >
            {[
              { label: 'Projects', value: '50+', icon: Box },
              { label: 'Experience', value: '10Y+', icon: Zap },
              { label: 'Technologies', value: '25+', icon: Code2 }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 dark:from-primary-500/30 dark:to-accent-500/30 blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/80 dark:bg-game-card/80 backdrop-blur-sm border-2 border-primary-500/30 dark:border-primary-500/50 rounded-sm p-4 md:p-6 corner-cut">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="text-primary-600 dark:text-primary-400" size={20} />
                    <div className="text-3xl md:text-4xl font-bold font-mono text-primary-600 dark:text-primary-400 dark:text-glow">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary-500 dark:border-primary-400" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-accent-500 dark:border-accent-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Description with enhanced styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto mb-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent dark:via-primary-500/10 rounded-lg blur-xl" />
            <p className="relative text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 py-6 border-l-2 border-r-2 border-primary-500/30 dark:border-primary-500/50">
              Building <span className="text-primary-600 dark:text-primary-400 font-semibold">scalable systems</span>,
              <span className="text-accent-600 dark:text-accent-400 font-semibold"> AI-driven platforms</span>, and
              <span className="text-neon-green dark:text-neon-green font-semibold"> therapeutic games</span>.
              Specializing in backend architecture, Unity development, and HCI research.
            </p>
          </motion.div>

          {/* Social Links with enhanced UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            {[
              { icon: Github, href: personalInfo.github },
              { icon: Linkedin, href: personalInfo.linkedin },
              { icon: Mail, href: `mailto:${personalInfo.email}` },
              { icon: ExternalLink, href: personalInfo.portfolio }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.icon !== Mail ? "_blank" : undefined}
                rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/30 blur-lg group-hover:blur-xl transition-all" />
                <div className="relative p-4 bg-white dark:bg-game-card rounded-sm border-2 border-gray-200 dark:border-primary-500/30 text-gray-700 dark:text-primary-400 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 corner-cut">
                  <social.icon size={24} />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary-500 dark:border-primary-400" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* CTAs with gaming UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 font-semibold font-mono uppercase tracking-wider text-white overflow-hidden group corner-cut"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-500 dark:to-accent-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 border-2 border-primary-400 dark:border-primary-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={20} />
                View Projects
              </span>
            </motion.button>

            <motion.a
              href="/cv.pdf"
              download="CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 font-semibold font-mono uppercase tracking-wider group corner-cut"
            >
              <div className="absolute inset-0 bg-transparent" />
              <div className="absolute inset-0 border-2 border-primary-600 dark:border-primary-500 group-hover:shadow-neon-lg transition-all" />
              <div className="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-primary-600 dark:text-primary-400 flex items-center gap-2">
                <Code2 size={20} />
                Download CV
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator with enhanced UI */}
      <motion.button
        onClick={() => scrollToSection('summary')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
      >
        <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/30 blur-xl group-hover:blur-2xl transition-all" />
        <div className="relative text-gray-400 dark:text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <ChevronDown size={32} className="dark:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        </div>
      </motion.button>
    </section>
  );
}

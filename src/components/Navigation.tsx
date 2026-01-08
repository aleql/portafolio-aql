import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useActiveSection, useScrollProgress } from '../hooks/useScrollAnimation';
import { useDarkMode } from '../hooks/useDarkMode';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'summary', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sections.map(s => s.id));
  const scrollProgress = useScrollProgress();
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* XP Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-neon-green origin-left z-50 shadow-neon"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${isScrolled
            ? 'bg-white/90 dark:bg-game-dark/95 backdrop-blur-md shadow-lg dark:shadow-game border-b border-gray-200 dark:border-game-border py-3'
            : 'bg-transparent py-6'
          }
        `}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold font-game text-gray-900 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">AQL</span>
              <span className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 relative
                    ${activeSection === section.id
                      ? 'text-primary-600 dark:text-primary-400 dark:bg-primary-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-game-card'
                    }
                  `}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
                    />
                  )}
                </button>
              ))}

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 hover:bg-gray-200 dark:hover:bg-game-border transition-colors border-2 border-transparent dark:border-primary-500/30 dark:shadow-neon"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <a
                href="mailto:alejandroquijadaleyton@gmail.com"
                className="ml-2 px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg dark:shadow-neon relative overflow-hidden group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Dark Mode Toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 border-2 border-transparent dark:border-primary-500/30"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[72px] left-0 right-0 bg-white dark:bg-game-dark shadow-lg z-30 md:hidden border-t border-b border-gray-200 dark:border-game-border backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  px-4 py-3 rounded-lg font-medium text-left transition-all relative overflow-hidden
                  ${activeSection === section.id
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 border-l-4 border-primary-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-game-card'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
            <a
              href="mailto:alejandroquijadaleyton@gmail.com"
              className="px-4 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-medium text-center hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg dark:shadow-neon"
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}

import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-game-darker text-gray-300 dark:text-gray-400 py-12 border-t-2 border-gray-800 dark:border-primary-500/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold font-game text-white dark:text-primary-400 mb-4 dark:text-glow">
              {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ')[personalInfo.name.split(' ').length - 1]}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Building scalable systems, therapeutic applications, and engaging gameplay experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-game text-white dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['summary', 'experience', 'projects', 'skills', 'education'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(section);
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.offsetTop - offset;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-primary-400 transition-colors capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold font-game text-white dark:text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={18} />
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 dark:bg-game-card rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500/20 dark:border-2 dark:border-transparent dark:hover:border-primary-500 transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 dark:bg-game-card rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500/20 dark:border-2 dark:border-transparent dark:hover:border-primary-500 transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 dark:bg-game-card rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500/20 dark:border-2 dark:border-transparent dark:hover:border-primary-500 transition-all"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-primary-500/20 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-600 flex items-center justify-center gap-2">
            © {currentYear} {personalInfo.name}. Built with <Heart size={16} className="text-red-500 fill-red-500 dark:text-neon-pink dark:fill-neon-pink" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

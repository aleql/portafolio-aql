import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/portfolio';
import ImageGallery from '../components/common/ImageGallery';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Footer from '../components/Footer';
import { useDarkMode } from '../hooks/useDarkMode';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useDarkMode();

  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-game-dark">
        <div className="text-center">
          <h1 className="text-4xl font-game text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-game-dark">
      {/* Navigation Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-game-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-game-border"
      >
        <div className="container mx-auto px-4 max-w-7xl py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/#projects')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-600 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </motion.button>

          <motion.button
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-game-card text-gray-700 dark:text-primary-400 hover:bg-gray-200 dark:hover:bg-game-border transition-colors border-2 border-transparent dark:border-primary-500/30"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-game text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-primary-600 dark:text-primary-400">
                  {project.subtitle}
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-lg dark:shadow-neon"
                  >
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-500/10 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery + Overview Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ImageGallery
                images={project.images}
                alt={project.title}
                className="sticky top-24"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card glow hover={false}>
                <h2 className="text-2xl font-game text-gray-900 dark:text-white mb-4">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>
                {project.duration && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="text-primary-500" />
                    <span className="font-medium">{project.duration}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Details Section */}
          {project.details && project.details.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <Card hover={false}>
                <h2 className="text-2xl font-game text-gray-900 dark:text-white mb-6">Key Details</h2>
                <ul className="space-y-4">
                  {project.details.map((detail, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-primary-500 dark:text-primary-400 font-bold mt-0.5">&#9656;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Highlights Grid */}
          {project.highlights && project.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-game text-gray-900 dark:text-white mb-6">Highlights</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {project.highlights.map((highlight, i) => (
                  <Card key={i} delay={i * 0.1}>
                    <div className="text-primary-500 dark:text-primary-400 text-2xl mb-3">&#10022;</div>
                    <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Role & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <Card hover={false}>
              <h3 className="text-xl font-game text-gray-900 dark:text-white mb-4">My Role</h3>
              <div className="flex flex-wrap gap-2">
                {project.role.map((r, i) => (
                  <Badge key={i} text={r} variant="accent" />
                ))}
              </div>
            </Card>
            <Card hover={false}>
              <h3 className="text-xl font-game text-gray-900 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} text={tech} variant="neon" />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Project Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-between items-center pt-8 border-t-2 border-gray-200 dark:border-game-border"
          >
            {prevProject ? (
              <Link
                to={`/project/${prevProject.slug}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-sm text-gray-500 dark:text-gray-500 block">Previous</span>
                  <span className="font-medium">{prevProject.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject && (
              <Link
                to={`/project/${nextProject.slug}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group text-right"
              >
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-500 block">Next</span>
                  <span className="font-medium">{nextProject.title}</span>
                </div>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

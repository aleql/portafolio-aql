import { Link } from 'react-router-dom';
import Section from './common/Section';
import Card from './common/Card';
import Badge from './common/Badge';
import ImageGallery from './common/ImageGallery';
import { projects } from '../data/portfolio';
import { ExternalLink, Trophy, ArrowRight } from 'lucide-react';

export default function Projects() {
  const visibleProjects = projects.filter(p => !p.hidden);
  const featuredProjects = visibleProjects.filter(p => p.featured);
  const additionalProjects = visibleProjects.filter(p => !p.featured);

  return (
    <Section
      id="projects"
      title="Notable Projects"
      subtitle="Showcasing impactful work in therapeutic applications, game development, and distributed systems"
      className="bg-white dark:bg-game-dark"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <Card key={index} delay={index * 0.1} glow>
            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="mb-4 -mx-6 -mt-6">
                <ImageGallery
                  images={project.images}
                  alt={project.title}
                  autoRotateInterval={5000}
                />
              </div>
            )}

            {project.featured && (
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="text-neon-yellow fill-neon-yellow dark:drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" size={20} />
                <span className="text-sm font-semibold font-mono uppercase tracking-wider text-neon-yellow">Featured Project</span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold font-game text-gray-900 dark:text-white">{project.title}</h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex-shrink-0"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              <p className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">{project.subtitle}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Role:</p>
                <div className="flex flex-wrap gap-2">
                  {project.role.map((r, i) => (
                    <Badge key={i} text={r} variant="accent" />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} text={tech} variant="neon" />
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <Link
                to={`/project/${project.slug}`}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg font-medium hover:bg-primary-500/20 dark:hover:bg-primary-500/30 transition-colors group border border-primary-500/30"
              >
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Other Projects */}
      {additionalProjects.length > 0 && (
        <>
          <h3 className="text-3xl font-bold font-game text-gray-900 dark:text-white mt-16 mb-8">Additional Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalProjects.map((project, index) => (
              <Card key={index} delay={index * 0.1}>
                {/* Small Image Gallery for non-featured */}
                {project.images && project.images.length > 0 && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <ImageGallery
                      images={project.images}
                      alt={project.title}
                      autoRotateInterval={6000}
                    />
                  </div>
                )}
                <h4 className="text-xl font-bold font-game text-gray-900 dark:text-white mb-2">{project.title}</h4>
                <p className="text-md font-medium text-primary-600 dark:text-primary-400 mb-3">{project.subtitle}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <Badge key={i} text={tech} variant="gray" />
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">+{project.technologies.length - 4} more</span>
                  )}
                </div>
                {/* View Details Button */}
                <Link
                  to={`/project/${project.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-game-card text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-game-border transition-colors group border border-gray-200 dark:border-game-border"
                >
                  View Details
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

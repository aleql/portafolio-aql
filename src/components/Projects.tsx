import Section from './common/Section';
import Card from './common/Card';
import Badge from './common/Badge';
import { projects } from '../data/portfolio';
import { ExternalLink, Trophy } from 'lucide-react';

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);

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

              {project.details && (
                <ul className="space-y-2 mb-4">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Role:</p>
                <div className="flex flex-wrap gap-2">
                  {project.role.map((r, i) => (
                    <Badge key={i} text={r} variant="accent" />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} text={tech} variant="neon" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Other Projects */}
      {projects.filter(p => !p.featured).length > 0 && (
        <>
          <h3 className="text-3xl font-bold font-game text-gray-900 dark:text-white mt-16 mb-8">Additional Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <Card key={index} delay={index * 0.1}>
                <h4 className="text-xl font-bold font-game text-gray-900 dark:text-white mb-2">{project.title}</h4>
                <p className="text-md font-medium text-primary-600 dark:text-primary-400 mb-3">{project.subtitle}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <Badge key={i} text={tech} variant="gray" />
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">+{project.technologies.length - 4} more</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

import Section from './common/Section';
import Timeline, { TimelineItem } from './common/Timeline';
import Badge from './common/Badge';
import { experiences } from '../data/portfolio';
import { ExternalLink, MapPin } from 'lucide-react';

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional journey building scalable systems and impactful applications"
      className="bg-gray-50 dark:bg-game-darker"
    >
      <Timeline>
        {experiences.map((exp, index) => (
          <TimelineItem key={index} index={index}>
            <div className="mb-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-2xl font-bold font-game text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      {exp.company}
                    </span>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.period}</p>
                  {exp.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1 justify-end mt-1">
                      <MapPin size={14} />
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1.5">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <Badge key={i} text={tech} variant="primary" />
              ))}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}

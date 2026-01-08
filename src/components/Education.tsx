import Section from './common/Section';
import Card from './common/Card';
import { education, teaching, researchRoles } from '../data/portfolio';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <Section
      id="education"
      title="Education & Academia"
      subtitle="Academic background, teaching, and research roles"
      className="bg-white dark:bg-game-dark"
    >
      {/* Education */}
      <div className="mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold font-game text-gray-900 dark:text-white mb-6 flex items-center gap-3"
        >
          <GraduationCap className="text-primary-600 dark:text-primary-400" />
          Education
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="mb-3">
                <h4 className="text-lg font-bold font-game text-gray-900 dark:text-white mb-1">{edu.degree}</h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{edu.institution}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{edu.period}</p>
              </div>
              {edu.honors && (
                <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-400">
                  <Award size={16} />
                  <span>{edu.honors}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Teaching Experience */}
      <div className="mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold font-game text-gray-900 dark:text-white mb-6 flex items-center gap-3"
        >
          <BookOpen className="text-primary-600 dark:text-primary-400" />
          Teaching Experience
        </motion.h3>
        <Card hover={false}>
          <div className="mb-4">
            <h4 className="text-2xl font-bold font-game text-gray-900 dark:text-white mb-1">{teaching.title}</h4>
            <p className="text-primary-600 dark:text-primary-400 font-medium text-lg">{teaching.institution}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{teaching.period}</p>
          </div>
          <ul className="space-y-2">
            {teaching.responsibilities.map((resp, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 flex gap-2">
                <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Research Roles */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold font-game text-gray-900 dark:text-white mb-6 flex items-center gap-3"
        >
          <Award className="text-primary-600 dark:text-primary-400" />
          Research & Academic Roles
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-6">
          {researchRoles.map((role, index) => (
            <Card key={index} delay={index * 0.1}>
              <h4 className="text-xl font-bold font-game text-gray-900 dark:text-white mb-2">{role.title}</h4>
              <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">{role.institution}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{role.period}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

import Section from './common/Section';
import Card from './common/Card';
import Badge from './common/Badge';
import { skills, areasOfExpertise } from '../data/portfolio';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      subtitle="Technical skills and areas of specialization"
      className="bg-gray-50 dark:bg-game-darker"
    >
      {/* Technical Skills */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {skills.map((skillCategory, index) => (
          <Card key={index} delay={index * 0.1} hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-accent-600 dark:text-accent-400" size={20} />
              <h3 className="text-xl font-bold font-game text-gray-900 dark:text-white">{skillCategory.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill, i) => (
                <Badge key={i} text={skill} variant="primary" />
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Areas of Expertise */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold font-game text-gray-900 dark:text-white mb-6"
        >
          Areas of Expertise
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areasOfExpertise.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white dark:bg-game-card border-2 border-gray-200 dark:border-primary-500/30 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-md dark:hover:shadow-neon transition-all duration-200 cursor-pointer"
            >
              <p className="text-gray-800 dark:text-gray-200 font-medium text-center">{area}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

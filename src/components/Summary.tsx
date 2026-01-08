import Section from './common/Section';
import { motion } from 'framer-motion';
import { professionalSummary, coreStrengths } from '../data/portfolio';
import { CheckCircle2 } from 'lucide-react';

export default function Summary() {
  return (
    <Section
      id="summary"
      title="About Me"
      subtitle="Passionate about building scalable systems and impactful user experiences"
      className="bg-white dark:bg-game-dark"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {professionalSummary}
          </p>
        </motion.div>

        {/* Core Strengths */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-1"
        >
          <h3 className="text-2xl font-bold font-game text-gray-900 dark:text-white mb-4">Core Strengths</h3>
          <ul className="space-y-3">
            {coreStrengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-700 dark:text-gray-300">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}

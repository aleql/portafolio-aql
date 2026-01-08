import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-4 relative ${className}`}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-game text-gray-900 dark:text-white mb-3 relative inline-block">
            {title}
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mt-4">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

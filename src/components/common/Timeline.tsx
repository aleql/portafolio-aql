import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  children: ReactNode;
  index: number;
}

export function TimelineItem({ children, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-gray-200 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md"
      />
      {children}
    </motion.div>
  );
}

interface TimelineProps {
  children: ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

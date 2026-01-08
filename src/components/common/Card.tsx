import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glow?: boolean;
}

export default function Card({ children, className = '', hover = true, delay = 0, glow = false }: CardProps) {
  const hoverAnimation = hover ? {
    whileHover: { scale: 1.03, y: -6 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      {...hoverAnimation}
      className={`
        relative overflow-hidden
        bg-white dark:bg-game-card
        rounded-lg border-2 border-gray-200 dark:border-game-border p-6
        shadow-sm hover:shadow-xl dark:hover:shadow-neon
        transition-all duration-300
        ${glow ? 'dark:shadow-game hover:dark:shadow-neon-lg' : ''}
        ${hover ? 'hover:border-primary-300 dark:hover:border-primary-500' : ''}
        ${className}
      `}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary-500 to-transparent" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-primary-500 to-transparent" />
      </div>

      {children}
    </motion.div>
  );
}

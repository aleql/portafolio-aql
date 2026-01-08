import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'accent' | 'gray' | 'neon';
  className?: string;
}

export default function Badge({ text, variant = 'gray', className = '' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-500/50',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 border-accent-200 dark:border-accent-500/50',
    gray: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    neon: 'bg-transparent dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-400 dark:border-primary-500 dark:shadow-neon'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        inline-block px-3 py-1 rounded-md text-xs font-semibold font-mono uppercase tracking-wider
        border transition-all duration-200
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {text}
    </motion.span>
  );
}

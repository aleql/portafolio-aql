import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  autoRotateInterval?: number;
  className?: string;
}

export default function ImageGallery({
  images,
  alt,
  autoRotateInterval = 5000,
  className = ''
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [images, autoRotateInterval, isPaused]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  if (!images || images.length === 0) {
    return (
      <div className={`relative aspect-video bg-game-card border-2 border-game-border rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400 text-center">
          <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
          <span className="text-sm">No images available</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-video bg-gray-100 dark:bg-game-card border-2 border-gray-200 dark:border-game-border overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={`${import.meta.env.BASE_URL}${images[currentIndex].replace(/^\//, '')}`}
            alt={`${alt} - Image ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </AnimatePresence>

        {/* Corner accents matching Card component */}
        <div className="absolute top-0 right-0 w-12 h-12 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary-500 to-transparent" />
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-primary-500 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 opacity-30 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-primary-500 to-transparent" />
        </div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-primary-500 w-6 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                  : 'bg-white/60 w-2 hover:bg-white/80'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

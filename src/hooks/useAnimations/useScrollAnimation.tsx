import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom' | 'none';

interface ScrollAnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  type = 'fadeIn',
  duration = 0.7,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  // Animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay } },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      if (!triggerOnce) controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return {
    ref,
    controls,
    variants: variants[type],
    Motion: motion.div,
  };
};

export default useScrollAnimation;
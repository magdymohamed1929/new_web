import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

type AnimationType = 
  | 'fadeIn' 
  | 'slideUp' 
  | 'slideLeft' 
  | 'slideRight' 
  | 'slideDown'
  | 'zoom' 
  | 'zoomOut'
  | 'flipX'
  | 'flipY'
  | 'rotateIn'
  | 'bounceIn'
  | 'elastic'
  | 'wave'
  | 'blur'
  | 'none';

interface ScrollAnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  springConfig?: {
    type: "spring";
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export const useScrollAnimation = ({
  type = 'fadeIn',
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  stagger = false,
  springConfig,
}: ScrollAnimationProps = {}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const getAnimationVariants = () => {
    const springTransition = springConfig || {
      type: "spring",
      damping: 25,
      stiffness: 120,
      mass: 1,
    };

    const smoothTransition = {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth animation
    };

    const transition = springConfig ? springTransition : smoothTransition;

    const variants = {
      fadeIn: {
        hidden: { 
          opacity: 0,
          filter: "blur(2px)"
        },
        visible: { 
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            ...transition,
            opacity: { duration: duration * 0.8, delay }
          }
        }
      },
      slideUp: {
        hidden: { 
          opacity: 0, 
          y: 60,
          filter: "blur(4px)"
        },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: {
            ...transition,
            delay: stagger ? delay : delay,
          }
        }
      },
      slideDown: {
        hidden: { 
          opacity: 0, 
          y: -60,
          filter: "blur(4px)"
        },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition
        }
      },
      slideLeft: {
        hidden: { 
          opacity: 0, 
          x: 80,
          filter: "blur(6px)"
        },
        visible: { 
          opacity: 1, 
          x: 0,
          filter: "blur(0px)",
          transition
        }
      },
      slideRight: {
        hidden: { 
          opacity: 0, 
          x: -80,
          filter: "blur(6px)"
        },
        visible: { 
          opacity: 1, 
          x: 0,
          filter: "blur(0px)",
          transition
        }
      },
      zoom: {
        hidden: { 
          opacity: 0, 
          scale: 0.6,
          filter: "blur(8px)"
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)",
          transition: {
            ...transition,
            scale: { ...transition, delay: delay + 0.1 }
          }
        }
      },
      zoomOut: {
        hidden: { 
          opacity: 0, 
          scale: 1.4,
          filter: "blur(10px)"
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)",
          transition
        }
      },
      flipX: {
        hidden: { 
          opacity: 0, 
          rotateX: 90,
          transformPerspective: 1000
        },
        visible: { 
          opacity: 1, 
          rotateX: 0,
          transformPerspective: 1000,
          transition
        }
      },
      flipY: {
        hidden: { 
          opacity: 0, 
          rotateY: 90,
          transformPerspective: 1000
        },
        visible: { 
          opacity: 1, 
          rotateY: 0,
          transformPerspective: 1000,
          transition
        }
      },
      rotateIn: {
        hidden: { 
          opacity: 0, 
          rotate: -180,
          scale: 0.5
        },
        visible: { 
          opacity: 1, 
          rotate: 0,
          scale: 1,
          transition
        }
      },
      bounceIn: {
        hidden: { 
          opacity: 0, 
          scale: 0.3,
          y: -30
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay
          }
        }
      },
      elastic: {
        hidden: { 
          opacity: 0, 
          scale: 0,
          rotate: -180
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          rotate: 0,
          transition: {
            type: "spring",
            damping: 8,
            stiffness: 100,
            delay
          }
        }
      },
      wave: {
        hidden: { 
          opacity: 0, 
          y: 20,
          skewY: 5
        },
        visible: { 
          opacity: 1, 
          y: 0,
          skewY: 0,
          transition: {
            ...transition,
            y: {
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay
            }
          }
        }
      },
      blur: {
        hidden: { 
          opacity: 0, 
          filter: "blur(20px)",
          scale: 1.1
        },
        visible: { 
          opacity: 1, 
          filter: "blur(0px)",
          scale: 1,
          transition: {
            duration: duration * 1.2,
            delay,
            ease: "easeOut"
          }
        }
      },
      none: {
        hidden: {},
        visible: {}
      }
    };

    return variants[type];
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
    variants: getAnimationVariants(),
    Motion: motion.div,
    inView,
  };
};

export default useScrollAnimation;
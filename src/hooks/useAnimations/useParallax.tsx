import { useRef, useEffect, useState } from 'react';

interface ParallaxConfig {
  speed: number; // Speed of the parallax effect (0.1 to 1)
  direction?: 'vertical' | 'horizontal' | 'both';
  reverse?: boolean; // Reverse the parallax direction
}

export const useParallax = ({
  speed = 0.3,
  direction = 'vertical',
  reverse = false,
}: ParallaxConfig) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInViewport, setIsInViewport] = useState(false);

  // Clamp the speed value between 0.1 and 1
  const clampedSpeed = Math.min(Math.max(speed, 0.1), 1);
  
  // Reverse effect if needed
  const effectiveSpeed = reverse ? -clampedSpeed : clampedSpeed;

  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    // Create intersection observer to check when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '50px 0px 50px 0px' }
    );
    
    observer.observe(element);
    
    return () => observer.unobserve(element);
  }, [ref.current]);

  useEffect(() => {
    if (!isInViewport) return;
    
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const elementCenter = elementTop + ref.current.offsetHeight / 2;
      const windowCenter = window.innerHeight / 2;
      const relativePosition = elementCenter - windowCenter;
      
      if (direction === 'vertical' || direction === 'both') {
        setPosition(prev => ({
          ...prev,
          y: relativePosition * effectiveSpeed,
        }));
      }
      
      if (direction === 'horizontal' || direction === 'both') {
        // Use scroll progress percentage for horizontal movement
        const scrollProgress = elementTop / window.innerHeight;
        setPosition(prev => ({
          ...prev,
          x: scrollProgress * 100 * effectiveSpeed, // multiply by 100 for more noticeable effect
        }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [effectiveSpeed, direction, isInViewport]);

  // CSS transform string based on the position
  const transform = `translate3d(${direction === 'vertical' ? 0 : position.x}px, ${direction === 'horizontal' ? 0 : position.y}px, 0)`;
    
  return { ref, transform, position };
};

export default useParallax;
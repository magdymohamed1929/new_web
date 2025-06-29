import { useEffect, useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: string;
  offset?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { duration = 1000, easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', offset = 0 } = options;

  const smoothScrollTo = useCallback((targetId: string | number) => {
    let target: Element | null = null;
    
    if (typeof targetId === 'string') {
      target = document.getElementById(targetId) || document.querySelector(targetId);
    } else {
      // Scroll to specific position
      const startPosition = window.pageYOffset;
      const targetPosition = targetId - offset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Custom easing function
        const ease = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const easedProgress = ease(progress);
        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
      return;
    }

    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Enhanced easing with multiple options
      const easingFunctions = {
        'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        'ease-in': (t: number) => t * t,
        'ease-out': (t: number) => t * (2 - t),
        'cubic-bezier': (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      };
      
      const easedProgress = easing.includes('cubic-bezier') 
        ? easingFunctions['cubic-bezier'](progress)
        : easingFunctions['ease-in-out'](progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [duration, easing, offset]);

  // Auto-smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        if (targetId) {
          smoothScrollTo(targetId);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [smoothScrollTo]);

  return { smoothScrollTo };
};

export default useSmoothScroll;
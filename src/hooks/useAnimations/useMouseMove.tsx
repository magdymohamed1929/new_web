import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseMoveConfig {
  sensitivity?: number;
  ease?: number;
}

export const useMouseMove = ({
  sensitivity = 0.05,
  ease = 0.1,
}: UseMouseMoveConfig = {}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [animatedPosition, setAnimatedPosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  // Track if we're on a touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Check if we're on a touch device on mount
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      targetX = (e.clientX - window.innerWidth / 2) * sensitivity;
      targetY = (e.clientY - window.innerHeight / 2) * sensitivity;
      
      setMousePosition({ x: targetX, y: targetY });
    };
    
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        // Beta is tilt front-to-back (limited to ±90°)
        // Gamma is tilt left-to-right (limited to ±90°)
        targetX = (e.gamma / 90) * window.innerWidth * sensitivity * 0.5;
        targetY = (e.beta / 90) * window.innerHeight * sensitivity * 0.5;
        
        setMousePosition({ x: targetX, y: targetY });
      }
    };
    
    // Set up animation loop for smooth movement
    const animate = () => {
      // Apply easing for smooth motion
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      
      setAnimatedPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animate();
    
    // Add event listeners based on device type
    if (isTouchDevice) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sensitivity, ease, isTouchDevice]);
  
  return { position: animatedPosition, rawPosition: mousePosition, isTouchDevice };
};

export default useMouseMove;
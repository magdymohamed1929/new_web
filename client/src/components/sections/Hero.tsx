import { Button } from "@/components/ui/button";
import { useMouseMove } from "@/hooks/useAnimations/useMouseMove";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";

export const Hero = () => {
  const { t, isRTL } = useLanguage();
  const { position } = useMouseMove({ sensitivity: 0.02 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax gradient effect
  useEffect(() => {
    if (!heroRef.current) return;
    
    const updateGradientPosition = () => {
      const x = 50 + position.x * 2;
      const y = 50 + position.y * 2;
      heroRef.current!.style.backgroundPosition = `${x}% ${y}%`;
    };
    
    updateGradientPosition();
  }, [position]);
  
  // Enhanced text animations
  const headingAnimation = useScrollAnimation({
    type: "blur",
    duration: 1.2,
    delay: 0.2,
  });
  
  const subtitleAnimation = useScrollAnimation({
    type: "wave",
    duration: 1.0,
    delay: 0.5,
  });
  
  const buttonsAnimation = useScrollAnimation({
    type: "elastic",
    duration: 0.8,
    delay: 0.8,
  });

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center pt-20"
    >
      {/* Background elements */}
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent bg-[length:100%_100%] transition-all duration-300 ease-out"
      />
      
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Animated dots decoration */}
      <div 
        className="absolute top-20 right-[20%] w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${position.x * -0.5}px, ${position.y * -0.5}px)`,
        }}
      />
      
      <div 
        className="absolute bottom-20 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${position.x * 0.2}px, ${position.y * 0.2}px)`,
        }}
      />
      
      <div className="container mx-auto px-4 z-10 pt-10">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <motion.h1
            ref={headingAnimation.ref}
            animate={headingAnimation.controls}
            initial="hidden"
            variants={headingAnimation.variants}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            {t('hero.title')}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary block">
              {t('hero.subtitle')} {t('hero.highlight')}
            </span>
          </motion.h1>
          
          <motion.p
            ref={subtitleAnimation.ref}
            animate={subtitleAnimation.controls}
            initial="hidden"
            variants={subtitleAnimation.variants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div
            ref={buttonsAnimation.ref}
            animate={buttonsAnimation.controls}
            initial="hidden"
            variants={buttonsAnimation.variants}
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white"
            >
              {t('hero.cta.primary')}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>
        </div>
        
        {/* Floating cards */}
        <div className="mt-20 relative h-64 hidden md:block">
          {[
            { title: 'Web Development', icon: '💻', x: '10%', y: '20%', delay: 0 },
            { title: 'Mobile Apps', icon: '📱', x: '70%', y: '50%', delay: 0.1 },
            { title: 'UI/UX Design', icon: '🎨', x: '25%', y: '60%', delay: 0.2 },
            { title: 'Laravel', icon: '⚙️', x: '85%', y: '15%', delay: 0.3 },
            { title: 'Flutter', icon: '📊', x: '50%', y: '70%', delay: 0.4 },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="absolute glassmorphism rounded-xl p-3 flex items-center gap-3 w-44"
              style={{ 
                left: card.x, 
                top: card.y,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { 
                  delay: card.delay + 0.8,
                  duration: 0.6
                }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-2xl">{card.icon}</div>
              <div className="font-medium text-sm">{card.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.6 } }}
        >
          <motion.div 
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ 
              y: [0, 12, 0], 
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
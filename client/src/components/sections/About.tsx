import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";
import { CheckCircle, Zap, Shield, Globe, Users, Award } from "lucide-react";

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
}

const StatItem = ({ value, label, delay = 0 }: StatItemProps) => {
  const animation = useScrollAnimation({
    type: "zoom",
    duration: 0.5,
    delay,
  });

  return (
    <motion.div
      ref={animation.ref}
      animate={animation.controls}
      initial="hidden"
      variants={animation.variants}
      className="text-center"
    >
      <div className="font-display font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard = ({ icon, title, description, delay = 0 }: ValueCardProps) => {
  const animation = useScrollAnimation({
    type: "slideUp",
    duration: 0.5,
    delay,
  });

  return (
    <motion.div
      ref={animation.ref}
      animate={animation.controls}
      initial="hidden"
      variants={animation.variants}
      className="flex flex-col items-center text-center p-6 rounded-lg border border-muted bg-card hover:shadow-md transition-shadow"
    >
      <div className="text-primary w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

export const About = () => {
  const { t, isRTL } = useLanguage();
  
  const titleAnimation = useScrollAnimation({
    type: "bounceIn",
    duration: 0.8,
    delay: 0.1,
  });
  
  const descriptionAnimation = useScrollAnimation({
    type: "wave",
    duration: 0.7,
    delay: 0.3,
  });
  
  const imageAnimation = useScrollAnimation({
    type: isRTL ? "slideLeft" : "slideRight",
    duration: 0.8,
    delay: 0.3,
  });
  
  const contentAnimation = useScrollAnimation({
    type: isRTL ? "slideRight" : "slideLeft",
    duration: 0.8,
    delay: 0.3,
  });
  
  const checklistItems = [
    "Transparent development process",
    "On-time delivery commitment",
    "Scalable and future-proof solutions", 
    "Post-launch support and maintenance",
    "Regular progress updates",
    "Clear and fair pricing structure"
  ];

  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description: "We push boundaries to create cutting-edge solutions that give our clients a competitive edge."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality",
      description: "Our meticulous attention to detail ensures premium quality in every aspect of our work."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Reliability",
      description: "We deliver on our promises with consistent performance and unwavering dependability."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "We work closely with our clients, valuing their input throughout the development process."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to customer service."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleAnimation.ref}
            animate={titleAnimation.controls}
            initial="hidden"
            variants={titleAnimation.variants}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            {t('about.subtitle')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('about.title')}</span>
          </motion.h2>
          
          <motion.p
            ref={descriptionAnimation.ref}
            animate={descriptionAnimation.controls}
            initial="hidden"
            variants={descriptionAnimation.variants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t('about.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* About image */}
          <motion.div
            ref={imageAnimation.ref}
            animate={imageAnimation.controls}
            initial="hidden"
            variants={imageAnimation.variants}
            className="relative"
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-tr from-primary/20 via-accent/20 to-secondary/20 border border-primary/20 flex items-center justify-center p-10">
              <div className="text-center">
                <div className="text-5xl mb-4">🚀</div>
                <div className="text-xl font-medium">Crafting Digital Excellence</div>
                <div className="text-muted-foreground mt-2">Since 2018</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-accent opacity-20"></div>
          </motion.div>
          
          {/* About content */}
          <motion.div
            ref={contentAnimation.ref}
            animate={contentAnimation.controls}
            initial="hidden"
            variants={contentAnimation.variants}
          >
            <h3 className="text-2xl font-display font-bold mb-4">
              Lovable Tech is a premium software development company.
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Founded in 2018, we've grown from a small team of passionate developers to a full-service agency delivering exceptional digital solutions to clients worldwide. Our mission is to transform ideas into powerful, scalable, and user-friendly applications that drive business growth.
            </p>
            
            <p className="text-muted-foreground mb-6">
              With expertise in web development, mobile applications, UX/UI design, and e-commerce solutions, we pride ourselves on creating products that not only meet but exceed client expectations.
            </p>
            
            <div className="space-y-3 mb-8">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Learn More About Us
            </Button>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <StatItem value="50+" label="Clients Worldwide" delay={0} />
          <StatItem value="100+" label="Projects Delivered" delay={0.1} />
          <StatItem value="10+" label="Industries Served" delay={0.2} />
          <StatItem value="5+" label="Years of Excellence" delay={0.3} />
        </div>
        
        {/* Our values */}
        <div className="mb-10">
          <h3 className="text-2xl font-display font-bold text-center mb-10">Our Values</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <ValueCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
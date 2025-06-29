import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Smartphone, Palette, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => {
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
    >
      <Card className="h-full border-muted/50 hover:border-primary/50 transition-colors overflow-hidden group hover:shadow-md">
        <CardHeader className="relative">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-muted opacity-20 group-hover:bg-primary/20 transition-colors" />
          <div className="text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <ul className="space-y-2">
            {getFeaturesList(title).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="group w-full justify-between">
            <span>Learn more</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const getFeaturesList = (service: string): string[] => {
  const features: Record<string, string[]> = {
    "Web Development": [
      "Responsive website design",
      "Progressive web applications",
      "Web portals and platforms",
      "API integrations"
    ],
    "Mobile Apps": [
      "Native iOS and Android apps",
      "Cross-platform development",
      "App store optimization",
      "Push notification systems"
    ],
    "UI/UX Design": [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design systems",
      "Usability testing"
    ],
    "Backend Development": [
      "API development",
      "Database architecture",
      "Authentication systems",
      "Cloud infrastructure"
    ],
    "E-commerce": [
      "Custom storefronts",
      "Payment gateway integration",
      "Inventory management",
      "Customer analytics"
    ],
    "Flutter Development": [
      "Cross-platform apps",
      "Beautiful UI components",
      "Fast development cycles",
      "Backend integrations"
    ]
  };
  
  return features[service] || [];
};

export const Services = () => {
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

  const services = [
    { 
      titleKey: "services.webDev.title", 
      descriptionKey: "services.webDev.description",
      icon: <Code className="h-6 w-6" />,
    },
    { 
      titleKey: "services.mobileDev.title", 
      descriptionKey: "services.mobileDev.description",
      icon: <Smartphone className="h-6 w-6" />,
    },
    { 
      titleKey: "services.uiux.title", 
      descriptionKey: "services.uiux.description",
      icon: <Palette className="h-6 w-6" />,
    },
    { 
      titleKey: "services.consulting.title", 
      descriptionKey: "services.consulting.description",
      icon: <Code className="h-6 w-6" />,
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleAnimation.ref}
            animate={titleAnimation.controls}
            initial="hidden"
            variants={titleAnimation.variants}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            {t('services.subtitle')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('services.title')}</span>
          </motion.h2>
          
          <motion.p
            ref={descriptionAnimation.ref}
            animate={descriptionAnimation.controls}
            initial="hidden"
            variants={descriptionAnimation.variants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t('services.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={t(service.titleKey)}
              description={t(service.descriptionKey)}
              icon={service.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
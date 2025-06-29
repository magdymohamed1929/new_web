import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

// Define categories and projects
const categories = ["All", "Web", "Mobile", "E-commerce", "Design"];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // This would be a path to the image
  category: string[];
  technologies: string[];
  link: string;
  github?: string;
}

// Sample projects data
const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Learning Platform",
    description: "A complete learning management system with course creation, enrollment, and progress tracking.",
    image: "/assets/images/project-1.jpg", // This would be replaced with actual images
    category: ["Web", "E-commerce"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "Health & Fitness App",
    description: "Mobile application for tracking workouts, nutrition, and personal wellness goals.",
    image: "/assets/images/project-2.jpg",
    category: ["Mobile"],
    technologies: ["Flutter", "Firebase", "RESTful API"],
    link: "#"
  },
  {
    id: 3,
    title: "Real Estate Marketplace",
    description: "Property listing platform with advanced search, virtual tours, and agent connections.",
    image: "/assets/images/project-3.jpg",
    category: ["Web", "E-commerce"],
    technologies: ["Vue.js", "Laravel", "MySQL"],
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Restaurant Ordering System",
    description: "Streamlined ordering process for restaurants with kitchen dashboard and inventory management.",
    image: "/assets/images/project-4.jpg",
    category: ["Web", "Mobile"],
    technologies: ["React Native", "Express.js", "MongoDB"],
    link: "#"
  },
  {
    id: 5,
    title: "Travel Companion App",
    description: "Trip planning and itinerary management with local recommendations and booking capabilities.",
    image: "/assets/images/project-5.jpg",
    category: ["Mobile", "Design"],
    technologies: ["Swift", "Node.js", "PostgreSQL"],
    link: "#"
  },
  {
    id: 6,
    title: "Brand Identity System",
    description: "Comprehensive brand design including logo, color palette, typography, and usage guidelines.",
    image: "/assets/images/project-6.jpg",
    category: ["Design"],
    technologies: ["Adobe CC", "Figma", "Brand Strategy"],
    link: "#"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const animation = useScrollAnimation({
    type: "slideUp",
    duration: 0.5,
    delay: index * 0.1,
  });

  // Placeholder image with gradient for demo purposes
  const gradientStyle = {
    background: `linear-gradient(120deg, hsl(${(index * 40) % 360}, 80%, 65%), hsl(${(index * 40 + 60) % 360}, 80%, 65%))`,
  };

  return (
    <motion.div
      ref={animation.ref}
      animate={animation.controls}
      initial="hidden"
      variants={animation.variants}
      className="group"
    >
      <div className="rounded-lg overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg relative">
        {/* Project Image */}
        <div className="h-52 relative overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full"
            style={gradientStyle}
          >
            {/* This is a placeholder. In production, use an actual image */}
            <div className="h-full w-full flex items-center justify-center text-primary-foreground text-4xl font-bold">
              {project.title.charAt(0)}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <div className="flex gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="secondary">
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="secondary">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-xl font-semibold mb-2">{project.title}</h3>
            <a 
              href={project.link} 
              className="text-primary h-6 w-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <Badge key={i} variant="outline" className="bg-muted/50">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="bg-muted/50">
                +{project.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("All");
  
  const filteredProjects = activeTab === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(activeTab));
    
  const titleAnimation = useScrollAnimation({
    type: "flipY",
    duration: 0.8,
    delay: 0.1,
  });
  
  const descriptionAnimation = useScrollAnimation({
    type: "elastic",
    duration: 0.7,
    delay: 0.3,
  });

  return (
    <section id="work" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleAnimation.ref}
            animate={titleAnimation.controls}
            initial="hidden"
            variants={titleAnimation.variants}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Work</span>
          </motion.h2>
          
          <motion.p
            ref={descriptionAnimation.ref}
            animate={descriptionAnimation.controls}
            initial="hidden"
            variants={descriptionAnimation.variants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Browse our collection of projects showcasing our expertise and the innovative solutions we've delivered for our clients.
          </motion.p>
        </div>
        
        <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
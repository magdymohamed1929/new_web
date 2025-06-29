import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";
import { LinkedinIcon, TwitterIcon, GithubIcon, MailIcon } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "CEO & Lead Developer",
    bio: "Full-stack developer with 10+ years of experience leading complex projects and innovations in web technologies.",
    image: "/assets/images/team-1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "sarah@lovabletech.com"
    }
  },
  {
    name: "Michael Chen",
    role: "CTO & Backend Specialist",
    bio: "Expert in scalable architecture with extensive experience in cloud infrastructure and database optimization.",
    image: "/assets/images/team-2.jpg",
    social: {
      linkedin: "#",
      github: "#",
      email: "michael@lovabletech.com"
    }
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Design Lead",
    bio: "Award-winning designer focused on creating intuitive, accessible, and visually stunning user experiences.",
    image: "/assets/images/team-3.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      email: "elena@lovabletech.com"
    }
  },
  {
    name: "David Kim",
    role: "Mobile Development Lead",
    bio: "Mobile specialist with expertise in Flutter, React Native, and native iOS/Android development.",
    image: "/assets/images/team-4.jpg",
    social: {
      github: "#",
      linkedin: "#",
      email: "david@lovabletech.com"
    }
  }
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  const animation = useScrollAnimation({
    type: "slideUp",
    duration: 0.5,
    delay: index * 0.1,
  });
  
  // Generate gradient colors based on index for placeholder images
  const gradientStyle = {
    background: `linear-gradient(120deg, hsl(${(index * 50) % 360}, 70%, 75%), hsl(${(index * 50 + 40) % 360}, 70%, 65%))`
  };

  return (
    <motion.div
      ref={animation.ref}
      animate={animation.controls}
      initial="hidden"
      variants={animation.variants}
      className="group"
    >
      <div className="rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors">
        {/* Member Image */}
        <div className="h-64 relative overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full"
            style={gradientStyle} 
          >
            {/* This is a placeholder. In production, use real team member photos */}
            <div className="h-full w-full flex items-center justify-center text-primary-foreground text-6xl font-bold">
              {member.name.charAt(0)}
            </div>
          </div>
          
          {/* Social Links Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-3">
              {member.social.linkedin && (
                <a 
                  href={member.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
              
              {member.social.twitter && (
                <a 
                  href={member.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
              )}
              
              {member.social.github && (
                <a 
                  href={member.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              
              {member.social.email && (
                <a 
                  href={`mailto:${member.social.email}`}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Member Info */}
        <div className="p-6">
          <h3 className="font-display font-semibold text-xl">{member.name}</h3>
          <p className="text-primary text-sm mb-3">{member.role}</p>
          <p className="text-muted-foreground text-sm">{member.bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const Team = () => {
  const { t, isRTL } = useLanguage();
  
  const titleAnimation = useScrollAnimation({
    type: "rotateIn",
    duration: 0.8,
    delay: 0.1,
  });
  
  const descriptionAnimation = useScrollAnimation({
    type: "blur",
    duration: 0.7,
    delay: 0.3,
  });

  return (
    <section id="team" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            ref={titleAnimation.ref}
            animate={titleAnimation.controls}
            initial="hidden"
            variants={titleAnimation.variants}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            {t('team.subtitle')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('team.title')}</span>
          </motion.h2>
          
          <motion.p
            ref={descriptionAnimation.ref}
            animate={descriptionAnimation.controls}
            initial="hidden"
            variants={descriptionAnimation.variants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t('team.description')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Interested in joining our team? We're always looking for talented individuals who are passionate about technology.
          </p>
          <motion.a 
            href="#careers"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View Open Positions 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.16669 7H12.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 1.16667L12.8333 7.00001L7 12.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Team;
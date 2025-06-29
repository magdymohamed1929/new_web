import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useAnimations/useScrollAnimation";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Lovable Tech transformed our outdated platform into a cutting-edge system that our customers love. Their attention to detail and commitment to quality is unmatched.",
    name: "Jessica Martinez",
    role: "CTO",
    company: "FinTech Solutions Inc.",
  },
  {
    quote: "Working with the team at Lovable Tech was a game-changer for our startup. They delivered our MVP ahead of schedule, allowing us to secure additional funding sooner than expected.",
    name: "Robert Chen",
    role: "Co-founder",
    company: "Spark Innovations",
  },
  {
    quote: "The e-commerce platform they built for us increased our conversion rates by 40%. Their UX expertise and technical knowledge created a seamless shopping experience.",
    name: "Amanda Williams",
    role: "Marketing Director",
    company: "Urban Lifestyle Brands",
  },
  {
    quote: "As a healthcare provider, security and reliability are paramount. Lovable Tech delivered a system that not only meets our strict compliance requirements but is also intuitive for our staff.",
    name: "Dr. Michael Turner",
    role: "Medical Director",
    company: "Health Partners Network",
  },
  {
    quote: "From concept to execution, the team demonstrated exceptional creativity and technical skill. Our new website has significantly improved our brand perception.",
    name: "Sarah Johnson",
    role: "CEO",
    company: "Design Collective",
  },
  {
    quote: "Their dedication to understanding our unique business challenges resulted in custom software that streamlined our operations and reduced costs by 30%.",
    name: "Thomas Rodriguez",
    role: "Operations Manager",
    company: "Global Logistics",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="h-full bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6 text-primary">
        <Quote size={36} strokeWidth={1} />
      </div>
      
      <p className="text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
      
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={testimonial.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {testimonial.name.charAt(0)}
            {testimonial.name.split(' ')[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const titleAnimation = useScrollAnimation({
    type: "slideUp",
    duration: 0.6,
  });
  
  const descriptionAnimation = useScrollAnimation({
    type: "slideUp",
    duration: 0.6,
    delay: 0.2,
  });
  
  const carouselAnimation = useScrollAnimation({
    type: "fadeIn",
    duration: 0.8,
    delay: 0.3,
  });

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            ref={titleAnimation.ref}
            animate={titleAnimation.controls}
            initial="hidden"
            variants={titleAnimation.variants}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Testimonials</span>
          </motion.h2>
          
          <motion.p
            ref={descriptionAnimation.ref}
            animate={descriptionAnimation.controls}
            initial="hidden"
            variants={descriptionAnimation.variants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Hear what our clients say about working with us and the results we've achieved together.
          </motion.p>
        </div>
        
        <motion.div
          ref={carouselAnimation.ref}
          animate={carouselAnimation.controls}
          initial="hidden"
          variants={carouselAnimation.variants}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="mr-2" />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
        
        <div className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-full shadow-md hover:shadow-xl transition-shadow"
            >
              Start Your Project 
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.16669 7H12.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 1.16667L12.8333 7.00001L7 12.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
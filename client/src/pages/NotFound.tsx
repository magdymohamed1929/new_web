import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();
  
  // Redirect after 10 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, [navigate]);
  
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              404
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            You'll be redirected to the home page in a few seconds.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
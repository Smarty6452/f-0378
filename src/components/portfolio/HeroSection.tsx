
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Star, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onContinue: () => void;
  onEasterEgg: () => void;
}

const HeroSection = ({ onContinue, onEasterEgg }: HeroSectionProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  // Easter egg trigger
  useEffect(() => {
    if (clickCount >= 5) {
      onEasterEgg();
      setClickCount(0);
    }
  }, [clickCount, onEasterEgg]);

  // Generate random stars for background
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated stars background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-70"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hero content */}
      <motion.div
        className="text-center z-10 bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-red-500/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="mb-2 inline-block"
          onClick={() => setClickCount(clickCount + 1)}
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          <img 
            src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png" 
            alt="Rohit Bharti" 
            className="w-32 h-32 rounded-full border-4 border-red-500 mx-auto mb-4 cursor-pointer hover:border-yellow-400 transition-colors duration-300"
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The Journey of Rohit Bharti
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Welcome to my digital adventure! I'm a passionate web developer specializing in React.js, Redux, JavaScript, Node.js, and more. Explore my journey through an interactive experience.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button 
            size="lg" 
            onClick={onContinue}
            className="bg-red-600 hover:bg-red-700 text-white group"
          >
            Start Adventure <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            onClick={() => window.open("https://github.com/thecodingrohit", "_blank")}
          >
            View Github
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Rocket animation */}
      <motion.div
        className="absolute bottom-10 right-10 text-yellow-500"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Rocket size={48} />
      </motion.div>
    </div>
  );
};

export default HeroSection;

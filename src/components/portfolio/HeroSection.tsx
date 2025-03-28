
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Star, ArrowRight, Sparkles, Globe, Code } from "lucide-react";

interface HeroSectionProps {
  onContinue: () => void;
  onEasterEgg: () => void;
}

const HeroSection = ({ onContinue, onEasterEgg }: HeroSectionProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const [meteors, setMeteors] = useState<{ id: number; x: number; y: number; duration: number; delay: number }[]>([]);

  // Easter egg trigger
  useEffect(() => {
    if (clickCount >= 5) {
      onEasterEgg();
      setClickCount(0);
    }
  }, [clickCount, onEasterEgg]);

  // Generate random stars for background
  useEffect(() => {
    const newStars = Array.from({ length: 75 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5, // Size between 0.5 and 1
      delay: Math.random() * 3, // Random delay
    }));
    setStars(newStars);
    
    // Generate random meteors
    const newMeteors = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2, // Duration between 2 and 5
      delay: Math.random() * 15, // Random delay
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden animated-bg">
      {/* Animated stars background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full star-twinkle"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.size > 0.8 ? 
              'linear-gradient(45deg, rgba(255,204,0,1), rgba(255,255,255,0.8))' : 
              'rgba(255, 255, 255, 0.8)'
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
      
      {/* Meteors */}
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{ 
            left: `${meteor.x}%`, 
            top: `${meteor.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: meteor.delay, duration: 0.1 }}
        >
          <motion.div 
            className="meteor"
            animate={{
              x: ['-100px', '300px'],
              y: ['0px', '200px'],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: meteor.duration,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.7, 1],
              delay: meteor.delay % 5, // Modulo to keep delays manageable
            }}
          />
        </motion.div>
      ))}

      {/* Hero content */}
      <motion.div
        className="text-center z-10 bg-black/40 p-8 rounded-lg backdrop-blur-md border border-red-500/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <motion.div
          className="mb-2 inline-block relative"
          onClick={() => setClickCount(clickCount + 1)}
          whileHover={{ rotate: 5, scale: 1.05 }}
          whileTap={{ rotate: 10, scale: 0.95 }}
        >
          {/* Glow effect around image */}
          <motion.div 
            className="absolute inset-0 rounded-full blur-md" 
            animate={{ 
              boxShadow: ['0 0 15px rgba(234,56,76,0.5)', '0 0 25px rgba(255,204,0,0.5)', '0 0 15px rgba(234,56,76,0.5)'] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <img 
            src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png" 
            alt="Rohit Bharti" 
            className="w-32 h-32 rounded-full border-4 border-red-500 mx-auto mb-4 cursor-pointer hover:border-yellow-400 transition-colors duration-300 relative z-10"
          />
          
          {/* Sparkle effects */}
          <motion.div 
            className="absolute -top-1 -right-1 text-yellow-400"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-1 -left-1 text-red-400"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={20} />
          </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 gradient-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The Journey of Rohit Bharti
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span className="text-yellow-400">Welcome to my digital adventure!</span> I'm a passionate web developer specializing in <span className="text-red-400">React.js</span>, <span className="text-yellow-400">Redux</span>, <span className="text-blue-400">JavaScript</span>, <span className="text-green-400">Node.js</span>, and more. Explore my journey through an interactive experience.
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
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white group shadow-lg shadow-red-500/30 glow-button"
          >
            Start Adventure <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 glow-button"
            onClick={() => window.open("https://github.com/thecodingrohit", "_blank")}
          >
            <Globe className="mr-2 h-4 w-4" /> View Github
          </Button>
        </motion.div>
        
        {/* Tech icons floating */}
        <div className="mt-8 flex justify-center gap-6">
          <motion.div 
            className="text-red-500 float-animation"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code size={30} />
          </motion.div>
          
          <motion.div 
            className="text-yellow-500 float-animation"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Code size={30} />
          </motion.div>
          
          <motion.div 
            className="text-blue-500 float-animation"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Code size={30} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Rocket animation */}
      <motion.div
        className="absolute bottom-10 right-10 text-yellow-500"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
          filter: ['drop-shadow(0 0 8px rgba(255,204,0,0.3))', 'drop-shadow(0 0 15px rgba(255,204,0,0.5))', 'drop-shadow(0 0 8px rgba(255,204,0,0.3))']
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

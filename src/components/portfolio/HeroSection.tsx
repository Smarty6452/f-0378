
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Star, ArrowRight, Sparkles, Globe, Code, Github, Linkedin, Mail, Phone } from "lucide-react";

interface HeroSectionProps {
  onContinue: () => void;
  onEasterEgg: () => void;
}

const HeroSection = ({ onContinue, onEasterEgg }: HeroSectionProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const [meteors, setMeteors] = useState<{ id: number; x: number; y: number; duration: number; delay: number }[]>([]);
  const [hovered, setHovered] = useState(false);

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

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com/thecodingrohit", color: "text-white" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/rohit-bharti-", color: "text-blue-400" },
    { icon: <Mail className="h-5 w-5" />, url: "mailto:rohitbharti326452@gmail.com", color: "text-red-400" },
    { icon: <Phone className="h-5 w-5" />, url: "tel:+17429990414", color: "text-green-400" },
  ];

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

      {/* Main content container with subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-6xl mx-auto px-4 md:px-0"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Profile info */}
          <motion.div 
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              The Journey of <br className="hidden md:block" />Rohit Bharti
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-200 mb-6 max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-yellow-400">Welcome to my digital adventure!</span> I'm a passionate web developer specializing in <span className="text-red-400">React.js</span>, <span className="text-yellow-400">Redux</span>, <span className="text-blue-400">JavaScript</span>, <span className="text-green-400">Node.js</span>, and more.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
            >
              <Button 
                size="lg" 
                onClick={onContinue}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white group shadow-lg shadow-red-500/30 glow-button relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Adventure <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 glow-button relative overflow-hidden group"
                onClick={() => window.open("https://github.com/thecodingrohit", "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" /> View Github
                </span>
              </Button>
            </motion.div>
            
            {/* Social links */}
            <motion.div 
              className="flex justify-center md:justify-start gap-5 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} hover:text-yellow-400 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/10 hover:border-yellow-500/50 hover:scale-110`}
                  whileHover={{ y: -3, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right side - Profile image with animations */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="relative"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onClick={() => setClickCount(clickCount + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background circles */}
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-yellow-500/10 to-red-500/10 blur-lg"
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Glow effect around image */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-md" 
                animate={{ 
                  boxShadow: hovered ? 
                    ['0 0 25px rgba(234,56,76,0.7)', '0 0 35px rgba(255,204,0,0.7)', '0 0 25px rgba(234,56,76,0.7)'] :
                    ['0 0 15px rgba(234,56,76,0.5)', '0 0 25px rgba(255,204,0,0.5)', '0 0 15px rgba(234,56,76,0.5)']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Profile image */}
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png" 
                  alt="Rohit Bharti" 
                  className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-red-500 mx-auto cursor-pointer hover:border-yellow-400 transition-colors duration-300 relative z-10 object-cover"
                />
                
                {/* Animated tech icons floating around */}
                <div className="absolute inset-0 -z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ 
                        left: `${Math.sin(i/5 * Math.PI * 2) * 120 + 50}%`, 
                        top: `${Math.cos(i/5 * Math.PI * 2) * 120 + 50}%`,
                      }}
                      animate={{
                        x: [0, 10, 0, -10, 0],
                        y: [0, -10, 0, 10, 0],
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    >
                      {/* Tech icons */}
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full 
                        ${i % 3 === 0 ? 'bg-red-500/80' : i % 3 === 1 ? 'bg-yellow-500/80' : 'bg-blue-500/80'}`}
                      >
                        <Code size={20} className="text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
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
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Tech tags marquee effect */}
        <motion.div
          className="mt-16 md:mt-10 overflow-hidden w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "linear",
            }}
          >
            {['React.js', 'Redux', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs', 'Git', 'UI/UX', 'Problem Solving', 'Team Player', 'Enthusiastic Learner']
              .map((tech, i) => (
                <div key={i} className="bg-gradient-to-r from-red-900/30 to-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/10 text-red-200 shadow-lg inline-block">
                  {tech}
                </div>
              ))
            }
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Rocket animation */}
      <motion.div
        className="absolute bottom-10 right-10 text-yellow-500 z-10"
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

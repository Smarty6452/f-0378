
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/portfolio/HeroSection";
import JourneyPath from "@/components/portfolio/JourneyPath";
import SkillsTree from "@/components/portfolio/SkillsTree";
import ProjectsShowcase from "@/components/portfolio/ProjectsShowcase";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import NavControls from "@/components/portfolio/NavControls";
import { Flame } from "lucide-react";

// Define the sections/levels of the portfolio journey
type Section = "hero" | "journey" | "skills" | "projects" | "about" | "contact";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("hero");
  const [unlocked, setUnlocked] = useState<Section[]>(["hero"]);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Easter egg function
  const handleEasterEgg = () => {
    toast({
      title: "Easter Egg Found! 🚀",
      description: "You've unlocked a hidden animation!",
      variant: "default",
    });

    // Add any special animation or effect here
    const rocketEl = document.createElement("div");
    rocketEl.innerHTML = `<div class="rocket-animation"><span>🚀</span></div>`;
    document.body.appendChild(rocketEl);

    setTimeout(() => {
      document.body.removeChild(rocketEl);
    }, 3000);
  };

  // Function to unlock next section
  const unlockSection = (section: Section) => {
    if (!unlocked.includes(section)) {
      setUnlocked([...unlocked, section]);
      toast({
        title: "New Level Unlocked! 🎮",
        description: `You've unlocked the ${section.charAt(0).toUpperCase() + section.slice(1)} section!`,
        variant: "default",
      });
    }
    setCurrentSection(section);
  };

  // Handle navigation
  const navigate = (section: Section) => {
    if (unlocked.includes(section) || section === "hero") {
      setCurrentSection(section);
    } else {
      toast({
        title: "Level Locked! 🔒",
        description: "Complete the current level to unlock this section.",
        variant: "destructive",
      });
    }
  };

  if (!loaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-yellow-400 animate-pulse flex flex-col items-center">
          <Flame className="w-16 h-16 mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold">Loading Rohit's Adventure...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1F2C] min-h-screen text-white overflow-hidden" ref={containerRef}>
      {/* Top navigation controls */}
      <NavControls 
        currentSection={currentSection} 
        unlocked={unlocked} 
        onNavigate={navigate} 
      />
      
      {/* Main content area with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20 
          }}
          className="container mx-auto p-4 pt-20"
        >
          {currentSection === "hero" && (
            <HeroSection 
              onContinue={() => unlockSection("journey")} 
              onEasterEgg={handleEasterEgg} 
            />
          )}
          
          {currentSection === "journey" && (
            <JourneyPath 
              onComplete={() => unlockSection("skills")} 
            />
          )}
          
          {currentSection === "skills" && (
            <SkillsTree 
              onComplete={() => unlockSection("projects")} 
            />
          )}
          
          {currentSection === "projects" && (
            <ProjectsShowcase 
              onComplete={() => unlockSection("about")} 
            />
          )}
          
          {currentSection === "about" && (
            <AboutSection 
              onComplete={() => unlockSection("contact")} 
            />
          )}
          
          {currentSection === "contact" && (
            <ContactSection />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Index;


import { motion } from "framer-motion";

interface NavControlsProps {
  currentSection: string;
  unlocked: string[];
  onNavigate: (section: any) => void;
}

const NavControls = ({ currentSection, unlocked, onNavigate }: NavControlsProps) => {
  const navigationItems = [
    { id: "hero", label: "Intro" },
    { id: "journey", label: "Journey" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/80 backdrop-blur-md border-b border-red-500/30"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="mr-3"
          >
            <img 
              src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png" 
              alt="Rohit" 
              className="w-8 h-8 rounded-full border border-red-500"
            />
          </motion.div>
          <h1 className="text-lg font-bold">
            <span className="text-white">Rohit</span>
            <span className="text-red-500">Bharti</span>
          </h1>
        </div>
        
        <div className="hidden md:flex space-x-1">
          {navigationItems.map((item) => {
            const isUnlocked = unlocked.includes(item.id);
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                disabled={!isUnlocked}
                className={`px-3 py-1 rounded-md text-sm transition-all relative
                  ${isActive 
                    ? 'text-white font-medium' 
                    : isUnlocked 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {!isUnlocked && (
                  <span className="ml-1 text-xs">🔒</span>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="md:hidden">
          <select
            value={currentSection}
            onChange={(e) => onNavigate(e.target.value)}
            className="bg-transparent text-white border border-red-500/50 rounded px-2 py-1 text-sm"
          >
            {navigationItems.map((item) => (
              <option
                key={item.id}
                value={item.id}
                disabled={!unlocked.includes(item.id)}
                className="bg-[#1A1F2C] text-white"
              >
                {item.label} {!unlocked.includes(item.id) && "🔒"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavControls;

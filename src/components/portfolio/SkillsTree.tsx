
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  ArrowRight, 
  Leaf, 
  Rocket, 
  Cpu, 
  Layers, 
  PenTool, 
  Database, 
  Globe, 
  Search, 
  Cloud, 
  Sparkles 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SkillsTreeProps {
  onComplete: () => void;
}

interface Skill {
  id: string;
  name: string;
  icon: JSX.Element;
  level: number;
  category: "frontend" | "backend" | "design" | "other";
  unlocked: boolean;
  position: { x: number; y: number };
}

interface MemoryCard {
  id: number;
  skillId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SkillsTree = ({ onComplete }: SkillsTreeProps) => {
  const [skills, setSkills] = useState<Skill[]>([
    // Frontend skills
    { id: "react", name: "React.js", icon: <Layers className="text-cyan-400" />, level: 90, category: "frontend", unlocked: true, position: { x: 30, y: 20 } },
    { id: "redux", name: "Redux", icon: <Cpu className="text-purple-400" />, level: 85, category: "frontend", unlocked: false, position: { x: 20, y: 30 } },
    { id: "js", name: "JavaScript", icon: <Code className="text-yellow-400" />, level: 90, category: "frontend", unlocked: false, position: { x: 40, y: 30 } },
    { id: "html", name: "HTML5", icon: <Code className="text-orange-400" />, level: 95, category: "frontend", unlocked: false, position: { x: 15, y: 40 } },
    { id: "css", name: "CSS3", icon: <PenTool className="text-blue-400" />, level: 90, category: "frontend", unlocked: false, position: { x: 25, y: 40 } },
    { id: "tailwind", name: "Tailwind", icon: <Sparkles className="text-sky-400" />, level: 85, category: "frontend", unlocked: false, position: { x: 35, y: 40 } },
    
    // Backend skills
    { id: "node", name: "Node.js", icon: <Database className="text-green-400" />, level: 80, category: "backend", unlocked: false, position: { x: 70, y: 20 } },
    { id: "express", name: "Express.js", icon: <Rocket className="text-gray-400" />, level: 75, category: "backend", unlocked: false, position: { x: 60, y: 30 } },
    { id: "mongo", name: "MongoDB", icon: <Database className="text-green-400" />, level: 70, category: "backend", unlocked: false, position: { x: 80, y: 30 } },
    { id: "sql", name: "SQL", icon: <Database className="text-blue-400" />, level: 65, category: "backend", unlocked: false, position: { x: 65, y: 40 } },
    
    // Design & Other skills
    { id: "figma", name: "Figma", icon: <PenTool className="text-pink-400" />, level: 75, category: "design", unlocked: false, position: { x: 50, y: 60 } },
    { id: "seo", name: "SEO", icon: <Search className="text-yellow-400" />, level: 70, category: "other", unlocked: false, position: { x: 40, y: 70 } },
    { id: "git", name: "Git/GitHub", icon: <Cloud className="text-purple-400" />, level: 85, category: "other", unlocked: false, position: { x: 60, y: 70 } },
  ]);

  const [unlockedCount, setUnlockedCount] = useState(1);
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  // Check if all skills are unlocked
  useEffect(() => {
    const unlocked = skills.every(skill => skill.unlocked);
    setAllUnlocked(unlocked);
    setUnlockedCount(skills.filter(skill => skill.unlocked).length);
  }, [skills]);

  // Initialize memory game
  const initializeMemoryGame = () => {
    const unlockedSkills = skills.filter(skill => skill.unlocked);
    // Get 4 random skills (or less if not enough unlocked)
    const gameSkills = [...unlockedSkills]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(4, unlockedSkills.length));
    
    // Create pairs of cards
    const cardPairs = gameSkills.flatMap(skill => [
      { id: Math.random(), skillId: skill.id, isFlipped: false, isMatched: false },
      { id: Math.random(), skillId: skill.id, isFlipped: false, isMatched: false }
    ]);
    
    // Shuffle the cards
    setMemoryCards(cardPairs.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedPairs(0);
    setShowMemoryGame(true);
  };

  // Handle card flip
  const handleCardFlip = (cardIndex: number) => {
    if (
      isCheckingMatch || 
      flippedCards.length >= 2 || 
      memoryCards[cardIndex].isFlipped || 
      memoryCards[cardIndex].isMatched
    ) {
      return;
    }

    // Flip the card
    const updatedCards = [...memoryCards];
    updatedCards[cardIndex].isFlipped = true;
    setMemoryCards(updatedCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);
    
    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsCheckingMatch(true);
      
      const firstCardIndex = newFlippedCards[0];
      const secondCardIndex = newFlippedCards[1];
      
      if (memoryCards[firstCardIndex].skillId === memoryCards[secondCardIndex].skillId) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...memoryCards];
          updatedCards[firstCardIndex].isMatched = true;
          updatedCards[secondCardIndex].isMatched = true;
          setMemoryCards(updatedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => prev + 1);
          setIsCheckingMatch(false);
          
          // Check if all pairs are matched
          if (matchedPairs + 1 === memoryCards.length / 2) {
            // Game completed - unlock a random locked skill
            const lockedSkills = skills.filter(skill => !skill.unlocked);
            if (lockedSkills.length > 0) {
              const randomIndex = Math.floor(Math.random() * lockedSkills.length);
              unlockSkill(lockedSkills[randomIndex].id);
              toast({
                title: "Memory Game Completed! 🎮",
                description: `You've unlocked the ${lockedSkills[randomIndex].name} skill!`,
                variant: "default",
              });
            }
            setShowMemoryGame(false);
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...memoryCards];
          updatedCards[firstCardIndex].isFlipped = false;
          updatedCards[secondCardIndex].isFlipped = false;
          setMemoryCards(updatedCards);
          setFlippedCards([]);
          setIsCheckingMatch(false);
        }, 1000);
      }
    }
  };

  // Handle unlocking a skill
  const unlockSkill = (id: string) => {
    setSkills(prev => 
      prev.map(skill => {
        if (skill.id === id) {
          return { ...skill, unlocked: true };
        }
        return skill;
      })
    );
  };

  // Check if a skill can be unlocked (adjacent to an unlocked skill)
  const canUnlock = (id: string) => {
    const skill = skills.find(s => s.id === id);
    if (!skill || skill.unlocked) return false;
    
    // Get adjacent skills based on position
    const adjacentSkills = skills.filter(s => {
      const xDiff = Math.abs(s.position.x - skill.position.x);
      const yDiff = Math.abs(s.position.y - skill.position.y);
      
      // Consider adjacent if within a certain distance and in the same category
      return (
        s.unlocked && 
        ((xDiff <= 15 && yDiff <= 15) || s.category === skill.category)
      );
    });
    
    return adjacentSkills.length > 0;
  };

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
          Skills Tree
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Unlock my skills by connecting adjacent nodes in the skill tree or play the memory game to unlock skills faster!
        </p>
        <div className="mt-4 font-mono text-yellow-500">
          Skills Unlocked: {unlockedCount} / {skills.length}
        </div>
        
        {unlockedCount > 1 && !showMemoryGame && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2"
          >
            <Button 
              onClick={initializeMemoryGame}
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            >
              Play Memory Game to Unlock Skills Faster 🎮
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Memory Game */}
      <AnimatePresence>
        {showMemoryGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md mx-auto mb-8 py-4 px-2 bg-black/60 rounded-lg border border-yellow-500/50"
          >
            <h3 className="text-xl font-bold text-center text-yellow-400 mb-4">
              Match Skill Cards
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
              {memoryCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={`relative h-20 cursor-pointer rounded-md ${
                    card.isFlipped || card.isMatched 
                      ? 'pointer-events-none' 
                      : 'hover:shadow-md hover:shadow-yellow-500/20'
                  }`}
                  onClick={() => handleCardFlip(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-md flex items-center justify-center text-white"
                    initial={false}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                      opacity: card.isFlipped || card.isMatched ? 0 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl">?</span>
                  </motion.div>
                  <motion.div
                    className={`absolute inset-0 w-full h-full rounded-md flex items-center justify-center 
                      ${card.isMatched 
                        ? 'bg-gradient-to-br from-green-800 to-green-900 border border-green-500/50' 
                        : 'bg-gradient-to-br from-red-800 to-red-900 border border-red-500/50'
                      }`}
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 0 : -180,
                      opacity: card.isFlipped || card.isMatched ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {skills.find(skill => skill.id === card.skillId)?.icon}
                    <span className="text-xs absolute bottom-1">
                      {skills.find(skill => skill.id === card.skillId)?.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowMemoryGame(false)}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Return to Skills Tree
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Tree Visualization */}
      {!showMemoryGame && (
        <div className="relative w-full h-[60vh] bg-gradient-to-b from-[#151822] to-[#1D1F2C] rounded-xl border border-red-500/20 overflow-hidden">
          {/* Background grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(234,56,76,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          
          {/* Connection lines between skills */}
          <svg className="absolute inset-0 w-full h-full">
            {skills.filter(skill => skill.unlocked).map(skill => {
              // Draw lines to adjacent unlocked skills
              return skills.filter(s => 
                s.unlocked && 
                s.id !== skill.id && 
                (s.category === skill.category || Math.abs(s.position.x - skill.position.x) <= 15)
              ).map(targetSkill => (
                <motion.line
                  key={`${skill.id}-${targetSkill.id}`}
                  x1={`${skill.position.x}%`}
                  y1={`${skill.position.y}%`}
                  x2={`${targetSkill.position.x}%`}
                  y2={`${targetSkill.position.y}%`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  stroke="url(#skillGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  filter="drop-shadow(0 0 5px rgba(234,56,76,0.5))"
                />
              ));
            })}
            
            {/* Define gradient for lines */}
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea384c" />
                <stop offset="50%" stopColor="#FFCC00" />
                <stop offset="100%" stopColor="#FEF7CD" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Skill nodes */}
          {skills.map(skill => (
            <motion.div
              key={skill.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                ${skill.unlocked 
                ? 'scale-100 opacity-100' 
                : canUnlock(skill.id)
                  ? 'scale-90 opacity-70 hover:scale-95 hover:opacity-90'
                  : 'scale-75 opacity-40'}
              `}
              style={{
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
              }}
              onClick={() => canUnlock(skill.id) && unlockSkill(skill.id)}
              whileHover={{ scale: skill.unlocked || canUnlock(skill.id) ? 1.1 : 0.8 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: skill.unlocked ? 1 : canUnlock(skill.id) ? 0.9 : 0.75,
                opacity: skill.unlocked ? 1 : canUnlock(skill.id) ? 0.7 : 0.4 
              }}
              transition={{ 
                duration: 0.5, 
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <div 
                className={`flex flex-col items-center justify-center p-2 rounded-lg w-28 h-28
                  ${skill.unlocked 
                    ? 'bg-black/70 backdrop-blur-sm border-2 shadow-lg' 
                    : canUnlock(skill.id)
                      ? 'bg-black/50 backdrop-blur-sm border border-red-500/50'
                      : 'bg-black/30 border border-gray-700'}
                  ${skill.category === 'frontend' && skill.unlocked ? 'border-red-500 shadow-red-500/30' : ''}
                  ${skill.category === 'backend' && skill.unlocked ? 'border-yellow-500 shadow-yellow-500/30' : ''}
                  ${skill.category === 'design' && skill.unlocked ? 'border-cyan-500 shadow-cyan-500/30' : ''}
                  ${skill.category === 'other' && skill.unlocked ? 'border-green-500 shadow-green-500/30' : ''}
                `}
              >
                <motion.div 
                  className="mb-1"
                  animate={{ 
                    rotate: skill.unlocked ? [0, -5, 5, -5, 0] : 0 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                >
                  {skill.icon}
                </motion.div>
                <div className="text-sm font-semibold mb-1">{skill.name}</div>
                
                {skill.unlocked && (
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full
                        ${skill.category === 'frontend' ? 'bg-gradient-to-r from-red-600 to-red-400' : ''}
                        ${skill.category === 'backend' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : ''}
                        ${skill.category === 'design' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' : ''}
                        ${skill.category === 'other' ? 'bg-gradient-to-r from-green-600 to-green-400' : ''}
                      `}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                )}
                
                <div className="text-xs mt-1">
                  {skill.unlocked ? (
                    <span className="font-mono">{skill.level}%</span>
                  ) : canUnlock(skill.id) ? (
                    <span className="animate-pulse text-yellow-400">Click to unlock</span>
                  ) : (
                    <span>Locked</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Category labels */}
          <div className="absolute top-2 left-4 text-white font-semibold opacity-60">Frontend</div>
          <div className="absolute top-2 right-4 text-white font-semibold opacity-60">Backend</div>
          <div className="absolute bottom-2 left-4 text-white font-semibold opacity-60">Design</div>
          <div className="absolute bottom-2 right-4 text-white font-semibold opacity-60">Other</div>
        </div>
      )}

      {/* Complete section button */}
      {allUnlocked && (
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            size="lg" 
            onClick={onComplete}
            className="bg-gradient-to-r from-red-600 via-yellow-600 to-red-600 hover:from-red-700 hover:via-yellow-700 hover:to-red-700 text-white shadow-lg shadow-red-600/20"
          >
            Complete Skills Tree & View Projects <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SkillsTree;

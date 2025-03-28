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
  Sparkles,
  Star,
  Award,
  Zap
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
  const [showStarGame, setShowStarGame] = useState(false);
  const [starScore, setStarScore] = useState(0);
  const [clickedStars, setClickedStars] = useState<number[]>([]);

  // Check if all skills are unlocked
  useEffect(() => {
    const unlocked = skills.every(skill => skill.unlocked);
    setAllUnlocked(unlocked);
    setUnlockedCount(skills.filter(skill => skill.unlocked).length);
  }, [skills]);

  // Initialize memory game (SIMPLER VERSION)
  const initializeMemoryGame = () => {
    // Always use the same 3 pairs for easier gameplay
    const gameSkillIds = ["react", "js", "html"];
    
    // Create pairs of cards
    const cardPairs = gameSkillIds.flatMap(skillId => [
      { id: Math.random(), skillId, isFlipped: false, isMatched: false },
      { id: Math.random(), skillId, isFlipped: false, isMatched: false }
    ]);
    
    // Shuffle the cards (but not too much for easier gameplay)
    const shuffledCards = [...cardPairs];
    // Simple shuffle that keeps pairs somewhat close to each other
    for (let i = 0; i < shuffledCards.length; i += 2) {
      const swapIndex = i + (Math.random() > 0.5 ? 2 : 0);
      if (swapIndex < shuffledCards.length) {
        [shuffledCards[i], shuffledCards[swapIndex]] = [shuffledCards[swapIndex], shuffledCards[i]];
      }
    }
    
    setMemoryCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setShowMemoryGame(true);
    setShowStarGame(false); // Hide star game if showing memory game
  };

  // Initialize star collection game
  const initializeStarGame = () => {
    setShowStarGame(true);
    setShowMemoryGame(false); // Hide memory game if showing star game
    setStarScore(0);
    setClickedStars([]);
  };

  // Handle star click in star game
  const handleStarClick = (starIndex: number) => {
    if (clickedStars.includes(starIndex)) return;
    
    setClickedStars(prev => [...prev, starIndex]);
    setStarScore(prev => prev + 1);
    
    // When player collects 5 stars, unlock a skill
    if (starScore + 1 >= 5) {
      const lockedSkills = skills.filter(skill => !skill.unlocked);
      if (lockedSkills.length > 0) {
        const randomIndex = Math.floor(Math.random() * lockedSkills.length);
        unlockSkill(lockedSkills[randomIndex].id);
        toast({
          title: "Star Challenge Completed! ⭐",
          description: `You've unlocked the ${lockedSkills[randomIndex].name} skill!`,
          variant: "default",
        });
        setShowStarGame(false);
      }
    }
  };

  // Handle card flip - SIMPLIFIED for easier gameplay
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
            // Game completed - unlock TWO random locked skills (making it more rewarding)
            const lockedSkills = skills.filter(skill => !skill.unlocked);
            if (lockedSkills.length > 0) {
              // Unlock first skill
              const randomIndex1 = Math.floor(Math.random() * lockedSkills.length);
              unlockSkill(lockedSkills[randomIndex1].id);
              
              // If there are more locked skills, unlock a second one
              const remainingLockedSkills = skills.filter(skill => !skill.unlocked && skill.id !== lockedSkills[randomIndex1].id);
              if (remainingLockedSkills.length > 0) {
                const randomIndex2 = Math.floor(Math.random() * remainingLockedSkills.length);
                unlockSkill(remainingLockedSkills[randomIndex2].id);
                toast({
                  title: "Memory Game Completed! 🎮",
                  description: `Great job! You've unlocked TWO new skills!`,
                  variant: "default",
                });
              } else {
                toast({
                  title: "Memory Game Completed! 🎮",
                  description: `You've unlocked the ${lockedSkills[randomIndex1].name} skill!`,
                  variant: "default",
                });
              }
            }
            setShowMemoryGame(false);
          }
        }, 800);
      } else {
        // No match - EASIER GAMEPLAY: give players more time to see cards
        setTimeout(() => {
          const updatedCards = [...memoryCards];
          updatedCards[firstCardIndex].isFlipped = false;
          updatedCards[secondCardIndex].isFlipped = false;
          setMemoryCards(updatedCards);
          setFlippedCards([]);
          setIsCheckingMatch(false);
        }, 1500); // Longer time to see cards
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

  // NEW FEATURE: Allow unlocking skills with a one-click action (no adjacency required)
  // This will make it much easier to complete the skills tree
  const handleDirectUnlock = () => {
    // Get all locked skills
    const lockedSkills = skills.filter(skill => !skill.unlocked);
    if (lockedSkills.length > 0) {
      // Unlock a random skill
      const randomIndex = Math.floor(Math.random() * lockedSkills.length);
      unlockSkill(lockedSkills[randomIndex].id);
      toast({
        title: "New Skill Unlocked! 🌟",
        description: `You've unlocked the ${lockedSkills[randomIndex].name} skill!`,
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-glow bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Skills Tree
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Collect skills by playing mini-games! Unlock all skills to complete this section.
        </p>
        <div className="mt-4 font-mono text-yellow-500">
          Skills Unlocked: {unlockedCount} / {skills.length}
        </div>
        
        {/* Game selection buttons */}
        {!showMemoryGame && !showStarGame && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex flex-wrap justify-center gap-3"
          >
            <Button 
              onClick={initializeMemoryGame}
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            >
              <Cpu className="w-4 h-4 mr-2" /> Play Memory Match Game
            </Button>
            
            <Button 
              onClick={initializeStarGame}
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <Star className="w-4 h-4 mr-2" /> Play Star Collection Game
            </Button>
            
            <Button 
              onClick={handleDirectUnlock}
              variant="outline" 
              className="border-green-500 text-green-500 hover:bg-green-500/10"
            >
              <Zap className="w-4 h-4 mr-2" /> Instant Skill Unlock
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Star Collection Game */}
      <AnimatePresence>
        {showStarGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-3xl mx-auto mb-8 py-6 px-4 bg-gradient-to-br from-black/80 to-red-900/20 rounded-lg border border-yellow-500/30"
          >
            <h3 className="text-xl font-bold text-center text-yellow-400 mb-4">
              <Star className="inline-block mr-2 text-yellow-400" /> Collect 5 Stars to Unlock a Skill!
            </h3>
            <div className="text-center mb-4">Stars Collected: {starScore}/5</div>
            
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-black/50 border border-red-500/20">
              {Array.from({ length: 15 }).map((_, index) => {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const size = Math.random() * 1 + 1;
                const delay = Math.random() * 3;
                
                return (
                  <motion.div
                    key={index}
                    className={`absolute cursor-pointer ${clickedStars.includes(index) ? 'opacity-0' : 'opacity-100'}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => handleStarClick(index)}
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      filter: [
                        'drop-shadow(0 0 5px rgba(255,204,0,0.5))',
                        'drop-shadow(0 0 10px rgba(255,204,0,0.8))',
                        'drop-shadow(0 0 5px rgba(255,204,0,0.5))'
                      ]
                    }}
                    transition={{
                      duration: 2 + delay,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Star 
                      className="text-yellow-400" 
                      size={20 + size * 10} 
                      fill="rgba(255, 204, 0, 0.8)"
                    />
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowStarGame(false)}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Return to Skills Tree
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Game - SIMPLIFIED AND IMPROVED */}
      <AnimatePresence>
        {showMemoryGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md mx-auto mb-8 py-6 px-4 bg-gradient-to-br from-black/80 to-red-900/20 rounded-lg border border-yellow-500/30"
          >
            <h3 className="text-xl font-bold text-center text-yellow-400 mb-4">
              <Award className="inline-block mr-2" /> Match Skill Cards
            </h3>
            <div className="text-center mb-4 text-yellow-200">
              Pairs Matched: {matchedPairs}/{memoryCards.length/2}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
              {memoryCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={`relative h-24 cursor-pointer rounded-md ${
                    card.isFlipped || card.isMatched 
                      ? 'pointer-events-none' 
                      : 'hover:shadow-md hover:shadow-yellow-500/40'
                  }`}
                  onClick={() => handleCardFlip(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900/80 to-black border-2 border-red-500/30 rounded-md flex items-center justify-center text-white"
                    initial={false}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                      opacity: card.isFlipped || card.isMatched ? 0 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl font-bold gradient-text">?</span>
                  </motion.div>
                  <motion.div
                    className={`absolute inset-0 w-full h-full rounded-md flex flex-col items-center justify-center p-2 
                      ${card.isMatched 
                        ? 'bg-gradient-to-br from-green-800/90 to-green-900/70 border-2 border-green-500/50' 
                        : 'bg-gradient-to-br from-yellow-800/90 to-red-900/70 border-2 border-yellow-500/50'
                      }`}
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{
                      rotateY: card.isFlipped || card.isMatched ? 0 : -180,
                      opacity: card.isFlipped || card.isMatched ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-3xl mb-1">
                      {skills.find(skill => skill.id === card.skillId)?.icon}
                    </div>
                    <span className="text-xs font-medium text-center">
                      {skills.find(skill => skill.id === card.skillId)?.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
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

      {/* Skills Tree Visualization - Only show when not playing games */}
      {!showMemoryGame && !showStarGame && (
        <div className="relative w-full h-[60vh] bg-gradient-to-b from-[#151822] to-[#1D1F2C] rounded-xl border border-red-500/20 overflow-hidden">
          {/* Background grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(234,56,76,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          
          {/* Connection lines between skills - simplified connections */}
          <svg className="absolute inset-0 w-full h-full">
            {skills.filter(skill => skill.unlocked).map(skill => {
              // Draw lines to adjacent unlocked skills
              return skills.filter(s => 
                s.unlocked && 
                s.id !== skill.id && 
                (s.category === skill.category)
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
                : 'scale-90 opacity-70 hover:scale-95 hover:opacity-90'}
              `}
              style={{
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
              }}
              whileHover={{ scale: skill.unlocked ? 1.1 : 0.9 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: skill.unlocked ? 1 : 0.85,
                opacity: skill.unlocked ? 1 : 0.6 
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
                    : 'bg-black/50 backdrop-blur-sm border border-red-500/50'}
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
                  ) : (
                    <span className="text-yellow-400">Play games to unlock!</span>
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


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight, Leaf } from "lucide-react";

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

const SkillsTree = ({ onComplete }: SkillsTreeProps) => {
  const [skills, setSkills] = useState<Skill[]>([
    // Frontend skills
    { id: "react", name: "React.js", icon: <Code />, level: 90, category: "frontend", unlocked: true, position: { x: 30, y: 20 } },
    { id: "redux", name: "Redux", icon: <Code />, level: 85, category: "frontend", unlocked: false, position: { x: 20, y: 30 } },
    { id: "js", name: "JavaScript", icon: <Code />, level: 90, category: "frontend", unlocked: false, position: { x: 40, y: 30 } },
    { id: "html", name: "HTML5", icon: <Code />, level: 95, category: "frontend", unlocked: false, position: { x: 15, y: 40 } },
    { id: "css", name: "CSS3", icon: <Code />, level: 90, category: "frontend", unlocked: false, position: { x: 25, y: 40 } },
    { id: "tailwind", name: "Tailwind", icon: <Code />, level: 85, category: "frontend", unlocked: false, position: { x: 35, y: 40 } },
    
    // Backend skills
    { id: "node", name: "Node.js", icon: <Code />, level: 80, category: "backend", unlocked: false, position: { x: 70, y: 20 } },
    { id: "express", name: "Express.js", icon: <Code />, level: 75, category: "backend", unlocked: false, position: { x: 60, y: 30 } },
    { id: "mongo", name: "MongoDB", icon: <Code />, level: 70, category: "backend", unlocked: false, position: { x: 80, y: 30 } },
    { id: "sql", name: "SQL", icon: <Code />, level: 65, category: "backend", unlocked: false, position: { x: 65, y: 40 } },
    
    // Design & Other skills
    { id: "figma", name: "Figma", icon: <Code />, level: 75, category: "design", unlocked: false, position: { x: 50, y: 60 } },
    { id: "seo", name: "SEO", icon: <Leaf />, level: 70, category: "other", unlocked: false, position: { x: 40, y: 70 } },
    { id: "git", name: "Git/GitHub", icon: <Code />, level: 85, category: "other", unlocked: false, position: { x: 60, y: 70 } },
  ]);

  const [unlockedCount, setUnlockedCount] = useState(1);
  const [allUnlocked, setAllUnlocked] = useState(false);

  // Check if all skills are unlocked
  useEffect(() => {
    const unlocked = skills.every(skill => skill.unlocked);
    setAllUnlocked(unlocked);
    setUnlockedCount(skills.filter(skill => skill.unlocked).length);
  }, [skills]);

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
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Skills Tree</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Unlock my skills by connecting adjacent nodes in the skill tree. Explore my tech ecosystem!
        </p>
        <div className="mt-4 font-mono text-yellow-500">
          Skills Unlocked: {unlockedCount} / {skills.length}
        </div>
      </motion.div>

      {/* Skills Tree Visualization */}
      <div className="relative w-full h-[60vh] bg-[#151822] rounded-xl border border-red-500/20 overflow-hidden">
        {/* Background grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(234,56,76,0.05) 1px, transparent 1px)",
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            ));
          })}
          
          {/* Define gradient for lines */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea384c" />
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
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: skill.unlocked ? 1 : canUnlock(skill.id) ? 0.9 : 0.75,
              opacity: skill.unlocked ? 1 : canUnlock(skill.id) ? 0.7 : 0.4 
            }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={`flex flex-col items-center justify-center p-2 rounded-lg w-28 h-28
                ${skill.unlocked 
                  ? 'bg-black/60 border-2 border-yellow-500 shadow-lg shadow-yellow-500/20' 
                  : canUnlock(skill.id)
                    ? 'bg-black/40 border border-red-500/50'
                    : 'bg-black/20 border border-gray-700'}
                ${skill.category === 'frontend' && skill.unlocked ? 'text-red-400' : ''}
                ${skill.category === 'backend' && skill.unlocked ? 'text-yellow-400' : ''}
                ${skill.category === 'design' && skill.unlocked ? 'text-cyan-400' : ''}
                ${skill.category === 'other' && skill.unlocked ? 'text-green-400' : ''}
              `}
            >
              <div className="mb-1">{skill.icon}</div>
              <div className="text-sm font-semibold mb-1">{skill.name}</div>
              
              {skill.unlocked && (
                <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full
                      ${skill.category === 'frontend' ? 'bg-red-500' : ''}
                      ${skill.category === 'backend' ? 'bg-yellow-500' : ''}
                      ${skill.category === 'design' ? 'bg-cyan-500' : ''}
                      ${skill.category === 'other' ? 'bg-green-500' : ''}
                    `}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              )}
              
              <div className="text-xs mt-1">
                {skill.unlocked ? `${skill.level}%` : canUnlock(skill.id) ? 'Click to unlock' : 'Locked'}
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
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Complete Skills Tree & View Projects <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SkillsTree;

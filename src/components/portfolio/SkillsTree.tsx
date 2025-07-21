import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  ArrowRight, 
  Layers, 
  Cpu, 
  PenTool, 
  Database, 
  Search, 
  Cloud, 
  Sparkles, 
  Award 
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

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  skillId: string;
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
    { id: "express", name: "Express.js", icon: <Database className="text-gray-400" />, level: 75, category: "backend", unlocked: false, position: { x: 60, y: 30 } },
    { id: "mongo", name: "MongoDB", icon: <Database className="text-green-400" />, level: 70, category: "backend", unlocked: false, position: { x: 80, y: 30 } },
    { id: "sql", name: "SQL", icon: <Database className="text-blue-400" />, level: 65, category: "backend", unlocked: false, position: { x: 65, y: 40 } },
    // Design & Other skills
    { id: "figma", name: "Figma", icon: <PenTool className="text-pink-400" />, level: 75, category: "design", unlocked: false, position: { x: 50, y: 60 } },
    { id: "seo", name: "SEO", icon: <Search className="text-yellow-400" />, level: 70, category: "other", unlocked: false, position: { x: 40, y: 70 } },
    { id: "git", name: "Git/GitHub", icon: <Cloud className="text-purple-400" />, level: 85, category: "other", unlocked: false, position: { x: 60, y: 70 } },
  ]);

  const [unlockedCount, setUnlockedCount] = useState(1);
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [showQuizGame, setShowQuizGame] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Predefined quiz questions tied to skills
  const quizQuestions: QuizQuestion[] = [
    {
      question: "Which library is used for building dynamic UIs in JavaScript?",
      options: ["React.js", "Node.js", "MongoDB", "Figma"],
      correctAnswer: "React.js",
      skillId: "react",
    },
    {
      question: "Which tool is used for state management in React applications?",
      options: ["Express", "Redux", "SQL", "Tailwind"],
      correctAnswer: "Redux",
      skillId: "redux",
    },
    {
      question: "Which language is the backbone of web development?",
      options: ["Python", "JavaScript", "Ruby", "PHP"],
      correctAnswer: "JavaScript",
      skillId: "js",
    },
    {
      question: "Which technology is used for structuring web content?",
      options: ["CSS", "HTML5", "JavaScript", "Node.js"],
      correctAnswer: "HTML5",
      skillId: "html",
    },
    {
      question: "Which tool is used for styling web pages?",
      options: ["HTML5", "CSS3", "Figma", "SEO"],
      correctAnswer: "CSS3",
      skillId: "css",
    },
    {
      question: "Which framework simplifies CSS styling with utility classes?",
      options: ["Bootstrap", "Tailwind", "React", "Express"],
      correctAnswer: "Tailwind",
      skillId: "tailwind",
    },
    {
      question: "Which runtime is used for server-side JavaScript?",
      options: ["Node.js", "React", "MongoDB", "SQL"],
      correctAnswer: "Node.js",
      skillId: "node",
    },
    {
      question: "Which framework is used for building APIs with Node.js?",
      options: ["React", "Express.js", "Figma", "Redux"],
      correctAnswer: "Express.js",
      skillId: "express",
    },
    {
      question: "Which database is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      correctAnswer: "MongoDB",
      skillId: "mongo",
    },
    {
      question: "Which language is used for querying relational databases?",
      options: ["JavaScript", "SQL", "Python", "CSS"],
      correctAnswer: "SQL",
      skillId: "sql",
    },
    {
      question: "Which tool is used for designing user interfaces?",
      options: ["Figma", "Node.js", "SEO", "Git"],
      correctAnswer: "Figma",
      skillId: "figma",
    },
    {
      question: "Which practice improves website visibility on search engines?",
      options: ["SEO", "CSS", "JavaScript", "Figma"],
      correctAnswer: "SEO",
      skillId: "seo",
    },
    {
      question: "Which tool is used for version control?",
      options: ["Git/GitHub", "React", "MongoDB", "Tailwind"],
      correctAnswer: "Git/GitHub",
      skillId: "git",
    },
  ];

  // Check if all skills are unlocked
  useEffect(() => {
    const unlocked = skills.every(skill => skill.unlocked);
    setAllUnlocked(unlocked);
    setUnlockedCount(skills.filter(skill => !skill.unlocked).length);
  }, [skills]);

  // Initialize quiz game
  const startQuizGame = () => {
    // Select a random question for a locked skill
    const lockedSkills = skills.filter(skill => !skill.unlocked);
    if (lockedSkills.length === 0) {
      toast({
        title: "All Skills Unlocked!",
        description: " Indiana Jones " 
      });
      return;
    }
    const availableQuestions = quizQuestions.filter(q => lockedSkills.some(s => s.id === q.skillId));
    if (availableQuestions.length === 0) return;
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setShowQuizGame(true);
  };

  // Handle quiz answer
  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;

    if (answer === currentQuestion.correctAnswer) {
      // Unlock the corresponding skill
      const skill = skills.find(s => s.id === currentQuestion.skillId);
      if (skill && !skill.unlocked) {
        setSkills(prev =>
          prev.map(s =>
            s.id === currentQuestion.skillId ? { ...s, unlocked: true } : s
          )
        );
        setQuizScore(prev => prev + 1);
        toast({
          title: "Correct Answer! 🎉",
          description: `You've unlocked the ${skill.name} skill!`,
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Try again!",
        variant: "destructive",
      });
    }
    // Move to next question or end game
    const lockedSkills = skills.filter(skill => !skill.unlocked);
    if (lockedSkills.length > 0) {
      const availableQuestions = quizQuestions.filter(q => lockedSkills.some(s => s.id === q.skillId));
      const nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setCurrentQuestion(nextQuestion);
    } else {
      setShowQuizGame(false);
    }
  };

  // Direct unlock for testing or skipping
  const handleDirectUnlock = () => {
    const lockedSkills = skills.filter(skill => !skill.unlocked);
    if (lockedSkills.length === 0) {
      toast({
        title: "No Skills to Unlock",
        description: "All skills are already unlocked!",
        variant: "default",
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * lockedSkills.length);
    setSkills(prev =>
      prev.map(skill =>
        skill.id === lockedSkills[randomIndex].id
          ? { ...skill, unlocked: true }
          : skill
      )
    );
    toast({
      title: "Skill Unlocked! 🌟",
      description: `You've unlocked the ${lockedSkills[randomIndex].name} skill!`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-400">Skills & Expertise</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Test your knowledge with a quick quiz to unlock my skills!
        </p>
        <Button
          variant="ghost"
          onClick={onComplete}
          className="mt-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
        >
          Skip this section →
        </Button>
      </motion.div>

      {/* Quiz Game */}
      <AnimatePresence>
        {showQuizGame && currentQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md mx-auto mb-8 py-6 px-4 bg-gradient-to-br from-black/80 to-red-900/20 rounded-lg border border-yellow-500/30"
          >
            <h3 className="text-xl font-bold text-center text-yellow-400 mb-4">
              <Award className="inline-block mr-2" /> Skill Quiz
            </h3>
            <div className="text-center mb-4 text-yellow-200">
              Score: {quizScore}/{skills.length}
            </div>
            <div className="text-center mb-4 text-white">
              {currentQuestion.question}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white"
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setShowQuizGame(false)}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Return to Skills Tree
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Tree Visualization */}
      {!showQuizGame && (
        <div className="relative w-full h-[60vh] bg-gradient-to-b from-[#151822] to-[#1D1F2C] rounded-xl border border-red-500/20 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(234,56,76,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <svg className="absolute inset-0 w-full h-full">
            {skills
              .filter(skill => skill.unlocked)
              .map(skill =>
                skills
                  .filter(
                    s => s.unlocked && s.id !== skill.id && s.category === skill.category
                  )
                  .map(targetSkill => (
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
                  ))
              )}
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea384c" />
                <stop offset="50%" stopColor="#FFCC00" />
                <stop offset="100%" stopColor="#FEF7CD" />
              </linearGradient>
            </defs>
          </svg>
          {skills.map(skill => (
            <motion.div
              key={skill.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                ${skill.unlocked ? "scale-100 opacity-100" : "scale-90 opacity-70 hover:scale-95 hover:opacity-90"}
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
                opacity: skill.unlocked ? 1 : 0.6,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <div
                className={`flex flex-col items-center justify-center p-2 rounded-lg w-28 h-28
                  ${skill.unlocked
                    ? "bg-black/70 backdrop-blur-sm border-2 shadow-lg"
                    : "bg-black/50 backdrop-blur-sm border border-red-500/50"}
                  ${skill.category === "frontend" && skill.unlocked ? "border-red-500 shadow-red-500/30" : ""}
                  ${skill.category === "backend" && skill.unlocked ? "border-yellow-500 shadow-yellow-500/30" : ""}
                  ${skill.category === "design" && skill.unlocked ? "border-cyan-500 shadow-cyan-500/30" : ""}
                  ${skill.category === "other" && skill.unlocked ? "border-green-500 shadow-green-500/30" : ""}
                `}
              >
                <motion.div
                  className="mb-1"
                  animate={{
                    rotate: skill.unlocked ? [0, -5, 5, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                >
                  {skill.icon}
                </motion.div>
                <div className="text-sm font-semibold mb-1">{skill.name}</div>
                {skill.unlocked && (
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full
                        ${skill.category === "frontend" ? "bg-gradient-to-r from-red-600 to-red-400" : ""}
                        ${skill.category === "backend" ? "bg-gradient-to-r from-yellow-600 to-yellow-400" : ""}
                        ${skill.category === "design" ? "bg-gradient-to-r from-cyan-600 to-cyan-400" : ""}
                        ${skill.category === "other" ? "bg-gradient-to-r from-green-600 to-green-400" : ""}
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
                    <span className="text-yellow-400">Play quiz to unlock!</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="absolute top-2 left-4 text-white font-semibold opacity-60">Frontend</div>
          <div className="absolute top-2 right-4 text-white font-semibold opacity-60">Backend</div>
          <div className="absolute bottom-2 left-4 text-white font-semibold opacity-60">Design</div>
          <div className="absolute bottom-2 right-4 text-white font-semibold opacity-60">Other</div>
        </div>
      )}

      {/* Game controls */}
      {!showQuizGame && (
        <div className="text-center mt-6">
          <Button
            onClick={startQuizGame}
            className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white mr-4"
          >
            Start Quiz Game
          </Button>
          <Button
            variant="outline"
            onClick={handleDirectUnlock}
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          >
            Unlock Random Skill
          </Button>
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
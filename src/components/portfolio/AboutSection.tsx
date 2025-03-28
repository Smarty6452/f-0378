import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Lightbulb, Leaf, Award, Trophy } from "lucide-react";

interface AboutSectionProps {
  onComplete: () => void;
}

const AboutSection = ({ onComplete }: AboutSectionProps) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const paragraphs = [
    {
      id: "intro",
      title: "Who Am I?",
      content: "I'm Rohit Bharti, a passionate web developer with a flair for creativity and a keen eye for detail. I specialize in React.js, JavaScript, and Node.js, combining technical expertise with innovative thinking to create engaging digital experiences.",
      icon: <User className="w-10 h-10 text-red-500" />,
    },
    {
      id: "passion",
      title: "My Passion",
      content: "From coding to design, I find joy in expressing ideas through the fusion of technology and aesthetics. I believe in clean, maintainable code and user-centered design principles that elevate the digital experience.",
      icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
    },
    {
      id: "growth",
      title: "Growth Mindset",
      content: "I'm committed to continuous learning and growth. Whether it's mastering a new framework, improving accessibility standards, or refining my design skills, I embrace every opportunity to expand my knowledge.",
      icon: <Leaf className="w-10 h-10 text-green-500" />,
    },
    {
      id: "achievements",
      title: "Achievements",
      content: "Throughout my career, I've successfully delivered impactful projects, including hotel management systems, learning platforms, and authentication systems, always focusing on quality, performance, and user experience.",
      icon: <Trophy className="w-10 h-10 text-yellow-500" />,
    },
    {
      id: "philosophy",
      title: "My Philosophy",
      content: "I believe in turning concepts into captivating digital experiences through collaboration and innovation. My approach combines technical precision with creative problem-solving to deliver solutions that exceed expectations.",
      icon: <Award className="w-10 h-10 text-red-500" />,
    },
  ];

  useEffect(() => {
    if (currentParagraph >= paragraphs.length) {
      setIsComplete(true);
    }
  }, [currentParagraph, paragraphs.length]);

  const revealNextParagraph = () => {
    if (currentParagraph < paragraphs.length) {
      setCurrentParagraph(prev => prev + 1);
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
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-400">About Me</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Get to know me beyond the code - my interests, values, and what drives me.
        </p>
        
        <Button 
          variant="ghost" 
          onClick={onComplete}
          className="mt-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
        >
          Skip this section →
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 mb-6 relative rounded-lg overflow-hidden border-4 border-red-500 shadow-lg shadow-red-500/20">
            <img 
              src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png" 
              alt="Rohit Bharti" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-xl font-bold text-white">Rohit Bharti</h3>
              <p className="text-gray-200 text-sm">Web Developer | Problem Solver | Creator</p>
            </div>
          </div>
          
          <div className="space-y-2 text-center">
            <p className="text-white">Currently located in <span className="text-yellow-400">Kitchener, Ontario, Canada</span></p>
            <p className="text-gray-300">Pursuing Web Development at Conestoga College</p>
          </div>
        </motion.div>

        {/* Story cards */}
        <div className="space-y-4">
          {paragraphs.slice(0, currentParagraph).map((paragraph, index) => (
            <motion.div
              key={paragraph.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-black/40 border-red-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-black/60 p-3 rounded-full">
                      {paragraph.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">{paragraph.title}</h3>
                      <p className="text-gray-300">{paragraph.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {currentParagraph < paragraphs.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: paragraphs.slice(0, currentParagraph).length * 0.2 }}
              className="text-center mt-6"
            >
              <Button 
                onClick={revealNextParagraph}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Reveal More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fun facts section - Only shown when all paragraphs are revealed */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12 bg-black/30 p-6 rounded-lg border border-yellow-500/30"
        >
          <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">Fun Facts About Me</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I sketch in my free time as a creative outlet
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I enjoy exploring new technologies and frameworks
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I'm passionate about creating user-friendly interfaces
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I speak English and Hindi fluently
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I love organizing community campaigns
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">•</span> I enjoy mentoring team members
            </li>
          </ul>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              onClick={onComplete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Complete My Story & Connect With Me <ArrowRight className="ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutSection;

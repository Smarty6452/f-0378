
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Briefcase, ArrowRight } from "lucide-react";

interface JourneyPathProps {
  onComplete: () => void;
}

// Define the career timeline data
interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  unlocked: boolean;
}

const JourneyPath = ({ onComplete }: JourneyPathProps) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: "job-1",
      title: "Junior Frontend Developer",
      company: "Unmetered Technologies",
      period: "Apr 2024 - Aug 2024",
      description: "Improved Revcatalyst hotel PMS with custom UI components, boosting user engagement by 20%. Replaced third-party libraries with tailored solutions, including custom Toastify notifications and dynamic tables.",
      skills: ["React.js", "Tailwind", "API Integration", "Performance Optimization"],
      unlocked: true,
    },
    {
      id: "job-2",
      title: "Frontend Developer Intern",
      company: "Gauge.ro",
      period: "Mar 2023 - Jul 2023",
      description: "Designed and developed interactive user-friendly interfaces using ReactJS and Tailwind. Implemented SEO strategies and performance enhancements, boosting website traffic and rankings.",
      skills: ["ReactJS", "Tailwind", "SEO", "API Integration", "LMS Development"],
      unlocked: false,
    },
    {
      id: "job-3",
      title: "ReactJS Intern",
      company: "Cloud4Code",
      period: "Jun 2022 - Dec 2022",
      description: "Developed dynamic pages using Ant Design for a car rental project (SkyCar). Utilized Trello and Slack for efficient task management. Contributed to a chatbot project, enhancing UI components.",
      skills: ["ReactJS", "Ant Design", "Project Management", "Chatbot Development"],
      unlocked: false,
    },
    {
      id: "job-4",
      title: "Security Guard",
      company: "Allied Universal",
      period: "Feb 2025 - Present",
      description: "Currently working as a security guard while pursuing education. Developing strong communication and problem-solving skills.",
      skills: ["Problem Solving", "Communication", "Security", "Customer Service"],
      unlocked: false,
    },
  ]);

  const [progress, setProgress] = useState(0);
  const [allUnlocked, setAllUnlocked] = useState(false);

  // Check if all items are unlocked
  useEffect(() => {
    const unlocked = timelineItems.every(item => item.unlocked);
    setAllUnlocked(unlocked);
    
    // Calculate progress
    const unlockCount = timelineItems.filter(item => item.unlocked).length;
    setProgress((unlockCount / timelineItems.length) * 100);
  }, [timelineItems]);

  // Handle unlocking a timeline item
  const unlockItem = (id: string) => {
    setTimelineItems(prev => 
      prev.map(item => {
        // Find the current unlocked item index
        const currentUnlockedIndex = prev.findIndex(i => i.id === id);
        
        // Only allow unlocking the next item in sequence
        if (item.id === id) {
          return { ...item, unlocked: true };
        }
        
        // If the next item exists and current item is unlocked, unlock the next item
        const nextIndex = currentUnlockedIndex + 1;
        if (nextIndex < prev.length && item.id === prev[nextIndex].id && prev[currentUnlockedIndex].unlocked) {
          return { ...item, unlocked: true };
        }
        
        return item;
      })
    );
  };

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Career Timeline</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Navigate through my professional journey. Unlock each milestone to advance!
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full mb-10 max-w-4xl mx-auto">
        <motion.div 
          className="bg-gradient-to-r from-red-500 to-yellow-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Journey path - Timeline view */}
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-500/30" />

        {/* Timeline items */}
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative mb-16 ${index % 2 === 0 ? "pr-8 md:text-right md:ml-auto md:mr-[50%]" : "pl-8 md:ml-[50%]"}`}
          >
            {/* Timeline dot */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 
                ${item.unlocked ? "bg-yellow-500 border-red-500" : "bg-gray-700 border-gray-600"}`}
            />

            <Card 
              className={`w-full md:w-[90%] transition-all duration-300 
                ${item.unlocked ? "bg-black/40 border-red-500/50" : "bg-black/20 border-gray-700 filter grayscale"}`}
            >
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className={item.unlocked ? "text-white" : "text-gray-400"}>
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Briefcase className="w-4 h-4 mr-1" /> 
                      {item.company}
                    </CardDescription>
                  </div>
                  <Badge className={`${item.unlocked ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700"}`}>
                    <Calendar className="w-3 h-3 mr-1" /> 
                    {item.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${item.unlocked ? "text-gray-300" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.skills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className={item.unlocked ? "bg-red-900/30 text-red-200" : "bg-gray-800 text-gray-400"}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {!item.unlocked && index > 0 && timelineItems[index - 1].unlocked && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => unlockItem(item.id)}
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                  >
                    Unlock <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                )}
                {item.unlocked && index === 0 && !timelineItems[1].unlocked && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => unlockItem(timelineItems[1].id)}
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                  >
                    Continue Journey <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
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
            Complete Journey & Unlock Skills <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default JourneyPath;

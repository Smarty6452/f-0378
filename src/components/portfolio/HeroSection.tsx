import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-red-900/20" />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="w-64 h-64 lg:w-80 lg:h-80">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-red-500 opacity-30 blur-xl"
              />
              <img
                src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png"
                alt="Rohit Bharti"
                className="relative w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-2xl"
              />
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-bold mb-4"
            >
              Hi, I'm <span className="text-blue-400">Rohit Bharti</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl text-gray-300 mb-6"
            >
              Full-Stack Developer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-400 mb-8 leading-relaxed"
            >
              Passionate about building scalable web apps with MERN, TypeScript, and AI. 
              Open to work and Colloborate. Let's build something amazing!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="/Rohit_Bharti_Resume.pdf" download>
                  <Download className="w-5 h-5 mr-2" /> Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-900/50">
                <a href="https://wa.me/17429990414" target="_blank">
                  <Phone className="w-5 h-5 mr-2" /> WhatsApp
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Smarty6452" target="_blank">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/rohit-bharti-/" target="_blank">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
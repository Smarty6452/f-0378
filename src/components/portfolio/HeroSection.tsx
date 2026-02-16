import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download, MapPin, ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="w-56 h-56 lg:w-72 lg:h-72 relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-60 blur-md" />
              <img
                src="/lovable-uploads/49a17589-9665-46c7-9c6f-4b0c0e8b75ac.png"
                alt="Rohit Bharti - Full-Stack Developer"
                className="relative w-full h-full rounded-full object-cover border-2 border-border shadow-2xl"
              />
            </div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap"
            >
              ✦ Open to Work
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-accent tracking-widest uppercase mb-3"
            >
              Full-Stack Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              Building Scalable{" "}
              <span className="text-primary">Web & AI</span>{" "}
              Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl"
            >
              React · Next.js · Node.js · TypeScript · MongoDB — 3+ years crafting performant web apps with clean code and modern architecture.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6 justify-center lg:justify-start"
            >
              <MapPin className="w-4 h-4" />
              Kitchener, Ontario, Canada
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" asChild>
                <a href="#projects">
                  <ExternalLink className="w-4 h-4 mr-2" /> View Projects
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/Rohit_Bharti_Resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
                <a href="https://wa.me/17429990414" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-2 justify-center lg:justify-start"
            >
              {[
                { href: "https://github.com/Smarty6452", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/rohit-bharti-/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:rohitbharti326452@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Button key={label} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary text-xs">
                <a href="https://www.hackerrank.com/profile/rohit_21910374" target="_blank" rel="noopener noreferrer">
                  HackerRank
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

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Download, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message Sent!", description: "I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Let's Connect</h2>
          <p className="text-muted-foreground">Open to Full-Stack, Frontend, and Software Engineer roles.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="p-5 rounded-xl border border-border bg-card space-y-4">
              <a href="mailto:rohitbharti326452@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" /> rohitbharti326452@gmail.com
              </a>
              <a href="https://wa.me/17429990414" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> +1 (742) 999-0414 · WhatsApp
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Kitchener, Ontario, Canada
              </div>
              <a href="/Rohit_Bharti_Resume.pdf" download className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Download className="w-4 h-4 flex-shrink-0" /> Download Resume (PDF)
              </a>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/Smarty6452" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.linkedin.com/in/rohit-bharti-/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.hackerrank.com/profile/rohit_21910374" target="_blank" rel="noopener noreferrer">
                  HackerRank
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Availability: 24 hours/week, hybrid (flexible schedule). Languages: English (Fluent), Hindi (Native).
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-border bg-card space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-muted/50"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-muted/50"
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-muted/50 min-h-[120px]"
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

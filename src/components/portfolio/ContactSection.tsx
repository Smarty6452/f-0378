import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      toast({ title: "Message Sent!", description: "I'll reply soon!" });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-black" id="contact">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-blue-400"
        >
          Let's Connect
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-900/30 to-black border-blue-700 p-6">
            <h3 className="text-xl font-bold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <a href="mailto:rohitbharti326452@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                <Mail /> rohitbharti326452@gmail.com
              </a>
              <a href="https://wa.me/17429990414" className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                <Phone /> +1 (742) 999-0414
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin /> Kitchener, ON, Canada
              </div>
              <a href="/Rohit_Bharti_Resume.pdf" download className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                <Download /> Download CV
              </a>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Smarty6452"><Github /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/rohit-bharti-/"><Linkedin /></a>
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-black border-red-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-black/50 border-blue-700 text-white"
              />
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-black/50 border-blue-700 text-white"
              />
              <Textarea
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-black/50 border-blue-700 text-white min-h-32"
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
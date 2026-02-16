import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sweta Akshi",
    title: "Technology Learning Manager",
    quote: "Rohit mastered the MERN stack with exceptional dedication. An outstanding student who consistently delivered quality work.",
  },
  {
    name: "Kunwar Khurmi",
    title: "Professor, Conestoga College",
    quote: "Scored 90% in Mobile App Development. Reliable, hardworking, and consistently demonstrates strong technical skills.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Testimonials</h2>
          <p className="text-muted-foreground">What colleagues and mentors say.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <p className="text-muted-foreground text-sm italic leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Calendar, Zap, ThumbsUp, Shield } from "lucide-react";

export function About() {
  const stats = [
    { value: "Competitive", label: "Pricing", icon: DollarSign },
    { value: "Flexible", label: "Payment Terms", icon: Calendar },
    { value: "100%", label: "Flexibility", icon: Zap },
    // { value: "98%", label: "Client Satisfaction", icon: ThumbsUp },
    { value: "Certified", label: "Quality Assurance", icon: Shield },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Empowering Global <br />
              <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                Supply Chains
              </span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              BluePeak Global Exports stands at the intersection of quality and scale. We are a premier logistics and trade partner, bridging continents with essential commodities. Our rigorous quality assurance and tech-enabled logistics ensure your supply chain never falters.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              From the fertile fields of agriculture to advanced chemical manufacturing, we provide end-to-end export solutions characterized by absolute reliability and unprecedented transparency.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl backdrop-blur-sm hover:border-primary/50 transition-colors group relative overflow-hidden min-w-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 shrink-0" />
                <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 truncate">{stat.value}</div>
                <div className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider leading-tight sm:leading-normal">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

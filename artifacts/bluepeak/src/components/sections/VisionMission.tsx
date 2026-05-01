import React from "react";
import { motion } from "framer-motion";
import { Target, Compass } from "lucide-react";

export function VisionMission() {
  const visionMission = [
    {
      icon: Target,
      title: "Vision",
      description: "To establish BluePeak Global Exports as a distinguished name in international trade, delivering excellence through precision sourcing and building enduring global partnerships."
    },
    {
      icon: Compass,
      title: "Mission",
      description: "To bridge markets and opportunities by offering carefully sourced products, dependable logistics, and uncompromising quality standards empowering businesses across borders with confidence and consistency."
    }
  ];

  return (
    <section id="vision-mission" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Our <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Direction</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Guided by a clear vision and purposeful mission, we continue to lead with integrity and innovation
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {visionMission.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:-translate-y-2"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/40 group-hover:to-primary/20 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Beaker, ShieldCheck, PlaneTakeoff } from "lucide-react";

export function Process() {
  const steps = [
    { icon: MessageSquare, title: "Inquiry", desc: "Consultation & Requirement Analysis" },
    { icon: Beaker, title: "Sampling", desc: "Quality Verification & Approvals" },
    { icon: ShieldCheck, title: "Quality Check", desc: "Rigorous Pre-shipment Inspection" },
    { icon: PlaneTakeoff, title: "Shipment", desc: "Secure Global Transit" }
  ];

  return (
    <section id="process" className="py-32 bg-[#050B14] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            The <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Blueprint</span>
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">Our streamlined protocol for international fulfillment.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connecting Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-white/10 hidden md:block" />
          <motion.div 
            className="absolute top-12 left-0 h-1 bg-primary hidden md:block shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#0a1526] border-2 border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)] relative">
                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

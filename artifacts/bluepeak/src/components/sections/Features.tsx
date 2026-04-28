import React from "react";
import { motion } from "framer-motion";
import { Leaf, PackageSearch, Tag, Ship } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Leaf,
      title: "Eco-Friendly Packaging",
      description: "Sustainable, compliant packaging solutions minimizing environmental footprint while maximizing cargo safety."
    },
    {
      icon: PackageSearch,
      title: "Trial Sample Availability",
      description: "Verify quality firsthand. We offer expedited sample shipping for definitive pre-order evaluation."
    },
    {
      icon: Tag,
      title: "White Labeling Support",
      description: "Comprehensive OEM capabilities. Seamlessly integrate our premium products into your brand ecosystem."
    },
    {
      icon: Ship,
      title: "Global Shipping Logistics",
      description: "End-to-end freight management, customs clearance, and real-time tracking across international waters."
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Strategic <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Advantages</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

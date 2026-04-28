import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Products() {
  const categories = [
    {
      id: "agriculture",
      title: "Agriculture",
      description: "Premium grade commodities sourced from certified farms globally.",
      items: ["Golden Grains", "Vibrant Spices", "Fresh Fruits & Vegetables", "Organic Seeds"],
      image: "/images/agriculture.png"
    },
    {
      id: "leather",
      title: "Leather",
      description: "Exquisite craftsmanship meeting international luxury standards.",
      items: ["Premium Footwear", "Luxury Bags", "Handcrafted Wallets", "Raw Hides"],
      image: "/images/leather.png"
    },
    {
      id: "textiles",
      title: "Textiles",
      description: "High-quality fabrics for fashion and industrial applications.",
      items: ["Woven Fabrics", "Finished Garments", "Industrial Yarns", "Sustainable Cotton"],
      image: "/images/textiles.png"
    },
    {
      id: "chemicals",
      title: "Chemicals",
      description: "Industrial and lab-grade compounds with strict safety compliance.",
      items: ["Industrial Solvents", "Lab Reagents", "Agrochemicals", "Polymers"],
      image: "/images/chemicals.png"
    }
  ];

  return (
    <section id="products" className="py-24 bg-[#020813] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Our Global <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Portfolio</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Diverse sectors. Unified standards. Discover our range of export-ready products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group perspective"
            >
              <Card className="bg-white/5 border-white/10 overflow-hidden transform-gpu transition-transform duration-500 hover:rotate-x-2 hover:-rotate-y-2 hover:shadow-[0_20px_50px_rgba(0,240,255,0.15)] relative h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
                
                <div className="h-64 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                  />
                </div>
                
                <CardContent className="relative z-20 -mt-20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{cat.title}</h3>
                  <p className="text-white/70 mb-6">{cat.description}</p>
                  <ul className="space-y-3">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-center text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 shadow-[0_0_10px_rgba(0,240,255,0.5)] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

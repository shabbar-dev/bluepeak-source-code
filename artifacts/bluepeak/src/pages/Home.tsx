import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VisionMission } from "@/components/sections/VisionMission";
import { Products } from "@/components/sections/Products";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <Products />
      <Features />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}

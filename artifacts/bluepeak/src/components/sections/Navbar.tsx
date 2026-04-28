import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
        <div className="h-16 w-16 rounded-md flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.25)]">
  <img
    src="/bluepeak-logo-source.png"
    alt="BluePeak Global Exports icon"
    className="h-14 w-14 object-contain"
  />
</div>
          <div className="leading-none">
            <p className="text-2xl font-black tracking-wide text-white drop-shadow-lg">BluePeak</p>
            <p className="text-sm font-bold tracking-widest text-[#6BFF9A] uppercase">Global Exports</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-left gap-8 text-sm font-medium text-white/70">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#products" className="hover:text-primary transition-colors">Products</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#process" className="hover:text-primary transition-colors">Process</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}

import React from "react";
import { Link } from "wouter";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  // const certifications = ["ISO 9001", "FSSAI", "APEDA", "GOTS", "ISO 14001"];

  return (
    <footer className="bg-[#02050A] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            {/* <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-black text-lg">
                B
              </div>
              BluePeak
            </Link> */}
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
            <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
              Your trusted partner in international trade. Delivering excellence across Agriculture, Leather, Textiles, and Chemicals globally.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/bluepeak-exports/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/bluepeak_export" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-white/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/bluepeakglobalexports?igsh=NTMxanN1djEwcWlr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-white/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-primary hover:bg-white/10 transition-colors">
                <Facebook className="w-5 h-5" />
              </a> */}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-white/60">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-3 text-white/60">
              <li><a href="#products" className="hover:text-primary transition-colors">Agriculture</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Leather Goods</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Textiles</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Chemicals</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* <div className="flex flex-wrap gap-3">
            {certifications.map(cert => (
              <span key={cert} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                {cert}
              </span>
            ))}
          </div> */}
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} BluePeak Global Exports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

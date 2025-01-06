import React from "react";
import { Sparkles } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-bold text-2xl relative group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-swedish-blue/10 to-swedish-yellow/10 blur-sm opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
      <span className="text-swedish-blue font-extrabold relative">Start</span>
      <span className="text-swedish-blue/90 font-extrabold relative">Sweden</span>
      <Sparkles className="inline-block w-4 h-4 ml-1 text-swedish-yellow/80 animate-pulse" />
    </div>
  );
};

export default Logo;
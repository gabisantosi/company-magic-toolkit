import React from "react";
import { Star } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-bold text-2xl flex items-center gap-2 ${className}`}>
      <Star className="w-8 h-8 text-swedish-yellow" />
      <span className="text-swedish-blue">StartSweden</span>
    </div>
  );
};

export default Logo;
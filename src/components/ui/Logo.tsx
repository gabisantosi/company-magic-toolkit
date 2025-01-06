import React from "react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-bold text-2xl ${className}`}>
      <span className="text-swedish-yellow">Start</span>
      <span className="text-swedish-blue">Sweden</span>
    </div>
  );
};

export default Logo;

import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      <div className="relative">
        <div className="bg-primary w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
          <span className="material-icons text-white text-2xl relative z-10">account_balance</span>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white dark:border-dark"></div>
      </div>
      <div className="flex flex-col">
        <span className={`text-2xl font-display font-extrabold tracking-tight leading-none ${light ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          NEXO
        </span>
        <span className="text-primary font-display font-bold text-[10px] tracking-[0.3em] uppercase leading-none mt-1">
          TRIBUTARIO
        </span>
      </div>
    </div>
  );
};

export default Logo;

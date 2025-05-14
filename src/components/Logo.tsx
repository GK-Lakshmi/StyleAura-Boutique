
import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
};

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md' 
}) => {
  // Determine size class
  const sizeClass = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  }[size];

  // Determine color class
  const colorClass = variant === 'white' ? 'text-white' : 'text-aura-dark-purple';

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <span className={`font-playfair font-bold ${sizeClass} ${colorClass} tracking-tight`}>
          Style<span className="text-aura-gold">Aura</span>
        </span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-2/3 bg-gradient-to-r from-aura-gold to-aura-purple"></span>
      </div>
    </Link>
  );
};

export default Logo;

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  href
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-300 ease-in-out";
  
  const variants = {
    primary: "bg-brand-black text-white hover:bg-brand-charcoal",
    outline: "border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white",
    ghost: "text-brand-charcoal hover:bg-black/5"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

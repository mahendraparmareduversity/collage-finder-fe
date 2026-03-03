import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/40 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-cta hover:bg-cta-hover text-white py-3 px-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cta/30',
    secondary:
      'bg-transparent border-2 border-primary/40 text-neutral-on-dark py-3 px-5 hover:bg-primary/20',
    outline:
      'bg-transparent border-2 border-cta text-cta hover:bg-cta hover:text-white py-3 px-5',
    ghost:
      'bg-transparent text-cta hover:bg-cta/10 py-3 px-5',
  };

  const sizes = {
    sm: 'text-sm py-2 px-4',
    md: 'text-sm',
    lg: 'text-base py-3 px-6',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

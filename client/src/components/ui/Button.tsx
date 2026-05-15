import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          {
            primary:
              'bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] active:bg-[#2a2a2a]',
            secondary:
              'border border-[#0a0a0a] text-[#0a0a0a] bg-white hover:bg-[#f5f5f5] active:bg-[#e5e5e5]',
            ghost:
              'text-[#6b6b6b] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] active:bg-[#e5e5e5]',
          }[variant],
          {
            sm: 'text-xs px-3 py-1.5 gap-1.5',
            md: 'text-sm px-4 py-2 gap-2',
            lg: 'text-base px-5 py-2.5 gap-2',
          }[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

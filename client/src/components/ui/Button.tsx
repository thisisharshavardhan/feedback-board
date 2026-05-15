import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl select-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          {
            primary:
              'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] active:scale-[0.98]',
            secondary:
              'bg-white/[0.08] border border-white/[0.15] text-white/80 hover:bg-white/[0.13] hover:text-white hover:border-white/25 active:scale-[0.98] backdrop-blur-sm',
            ghost:
              'text-white/55 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]',
            danger:
              'bg-red-500/70 border border-red-400/30 text-white hover:bg-red-500/90 shadow-[0_0_16px_rgba(239,68,68,0.25)] active:scale-[0.98]',
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

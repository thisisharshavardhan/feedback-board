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
              'bg-white text-[#080808] hover:bg-white/90 active:scale-[0.98] shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
            secondary:
              'bg-white/[0.06] border border-white/[0.10] text-white/65 hover:bg-white/[0.10] hover:text-white/85 hover:border-white/[0.18] active:scale-[0.98]',
            ghost:
              'text-white/45 hover:text-white/80 hover:bg-white/[0.07] active:bg-white/[0.10]',
            danger:
              'bg-red-500/[0.12] border border-red-500/[0.22] text-red-400 hover:bg-red-500/[0.22] hover:text-red-300 active:scale-[0.98]',
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

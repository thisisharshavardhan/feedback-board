import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm text-white/85 bg-white/[0.05] border rounded-xl outline-none',
            'placeholder:text-white/18 transition-all duration-200',
            error
              ? 'border-red-500/40 focus:ring-1 focus:ring-red-500/20 focus:border-red-500/50'
              : 'border-white/[0.09] focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/10',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400/80">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

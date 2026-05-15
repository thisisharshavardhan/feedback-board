import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-white/65">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm text-white bg-white/[0.06] border rounded-xl outline-none resize-none',
            'placeholder:text-white/20 backdrop-blur-sm',
            'transition-all duration-200',
            error
              ? 'border-red-400/50 focus:ring-1 focus:ring-red-400/30 focus:bg-white/[0.09]'
              : 'border-white/[0.10] focus:border-violet-500/55 focus:ring-1 focus:ring-violet-500/15 focus:bg-white/[0.09]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400/90">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

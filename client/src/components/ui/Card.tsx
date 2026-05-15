import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white/[0.05] backdrop-blur-md border border-white/[0.09] rounded-2xl transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

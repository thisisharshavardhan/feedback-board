import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-[#e5e5e5] rounded-xl transition-shadow duration-150',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

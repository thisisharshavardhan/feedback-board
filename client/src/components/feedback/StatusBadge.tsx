import { FeedbackStatus } from '../../api/types';
import { cn } from '../../utils/cn';

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; dot: string; container: string; text: string }> = {
  open: {
    label: 'Open',
    dot: 'bg-[#d4d4d4]',
    container: 'bg-white border border-[#e5e5e5]',
    text: 'text-[#6b6b6b]',
  },
  in_progress: {
    label: 'In Progress',
    dot: 'bg-[#0a0a0a]',
    container: 'bg-[#0a0a0a]',
    text: 'text-white',
  },
  done: {
    label: 'Done',
    dot: 'bg-[#a3a3a3]',
    container: 'bg-[#f5f5f5] border border-[#e5e5e5]',
    text: 'text-[#6b6b6b]',
  },
  closed: {
    label: 'Closed',
    dot: 'bg-[#e0e0e0]',
    container: 'bg-white border border-[#ebebeb]',
    text: 'text-[#a3a3a3]',
  },
};

interface StatusBadgeProps {
  status: FeedbackStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, dot, container, text } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
        container,
        text,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dot)} />
      {label}
    </span>
  );
}

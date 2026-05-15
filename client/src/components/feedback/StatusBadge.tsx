import { FeedbackStatus } from '../../api/types';
import { cn } from '../../utils/cn';

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; dot: string; container: string; text: string }> = {
  open: {
    label: 'Open',
    dot: 'bg-cyan-400',
    container: 'bg-cyan-500/10 border border-cyan-500/20',
    text: 'text-cyan-300',
  },
  in_progress: {
    label: 'In Progress',
    dot: 'bg-violet-400',
    container: 'bg-violet-500/10 border border-violet-500/20',
    text: 'text-violet-300',
  },
  done: {
    label: 'Done',
    dot: 'bg-emerald-400',
    container: 'bg-emerald-500/10 border border-emerald-500/20',
    text: 'text-emerald-300',
  },
  closed: {
    label: 'Closed',
    dot: 'bg-white/20',
    container: 'bg-white/[0.04] border border-white/10',
    text: 'text-white/35',
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
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
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

import { FeedbackStatus } from '../../api/types';
import { cn } from '../../utils/cn';

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; dot: string; container: string; text: string }> = {
  open: {
    label: 'Open',
    dot: 'bg-sky-400',
    container: 'bg-sky-500/[0.08] border border-sky-500/[0.16]',
    text: 'text-sky-400/85',
  },
  in_progress: {
    label: 'In Progress',
    dot: 'bg-indigo-400',
    container: 'bg-indigo-500/[0.08] border border-indigo-500/[0.16]',
    text: 'text-indigo-400/85',
  },
  done: {
    label: 'Done',
    dot: 'bg-emerald-400',
    container: 'bg-emerald-500/[0.08] border border-emerald-500/[0.16]',
    text: 'text-emerald-400/85',
  },
  closed: {
    label: 'Closed',
    dot: 'bg-white/[0.18]',
    container: 'bg-white/[0.03] border border-white/[0.08]',
    text: 'text-white/28',
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
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium',
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

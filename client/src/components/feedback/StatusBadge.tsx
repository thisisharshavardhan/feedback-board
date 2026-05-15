import { Badge } from '../ui/Badge';
import { FeedbackStatus } from '../../api/types';
import { cn } from '../../utils/cn';

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  done: 'Done',
  closed: 'Closed',
};

const STATUS_STYLES: Record<FeedbackStatus, string> = {
  open: 'border border-[#e5e5e5] text-[#6b6b6b] bg-white',
  in_progress: 'bg-[#0a0a0a] text-white',
  done: 'bg-[#f5f5f5] text-[#0a0a0a]',
  closed: 'border border-[#e5e5e5] text-[#a3a3a3] bg-white',
};

interface StatusBadgeProps {
  status: FeedbackStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={cn(STATUS_STYLES[status], className)}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}

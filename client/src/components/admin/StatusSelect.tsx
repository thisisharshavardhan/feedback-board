import { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { FeedbackStatus } from '../../api/types';
import { updateFeedbackStatus } from '../../api/feedback';
import { cn } from '../../utils/cn';

const STATUSES: { value: FeedbackStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'closed', label: 'Closed' },
];

interface StatusSelectProps {
  feedbackId: string;
  currentStatus: FeedbackStatus;
  adminKey: string;
  onSuccess: () => void;
}

export function StatusSelect({
  feedbackId,
  currentStatus,
  adminKey,
  onSuccess,
}: StatusSelectProps) {
  const [loading, setLoading] = useState(false);

  async function handleChange(value: string) {
    if (value === currentStatus || loading) return;
    setLoading(true);
    try {
      await updateFeedbackStatus(feedbackId, value as FeedbackStatus, adminKey);
      onSuccess();
    } catch {
      // silently fail — user will see stale status
    } finally {
      setLoading(false);
    }
  }

  return (
    <RadixSelect.Root value={currentStatus} onValueChange={handleChange} disabled={loading}>
      <RadixSelect.Trigger
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#e5e5e5] bg-white text-[#6b6b6b]',
          'hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors outline-none',
          loading && 'opacity-60 cursor-not-allowed'
        )}
        aria-label="Change status"
      >
        <RadixSelect.Value />
        <ChevronDown className="w-3 h-3" />
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="z-50 bg-white border border-[#e5e5e5] rounded-xl shadow-lg p-1 min-w-[140px]"
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.Viewport>
            {STATUSES.map(({ value, label }) => (
              <RadixSelect.Item
                key={value}
                value={value}
                className={cn(
                  'flex items-center justify-between gap-2 px-3 py-2 text-xs rounded-lg cursor-pointer outline-none',
                  'text-[#0a0a0a] hover:bg-[#f5f5f5]',
                  'data-[highlighted]:bg-[#f5f5f5]'
                )}
              >
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <Check className="w-3 h-3 text-[#0a0a0a]" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

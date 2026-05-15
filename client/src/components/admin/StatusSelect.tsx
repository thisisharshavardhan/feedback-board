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

export function StatusSelect({ feedbackId, currentStatus, adminKey, onSuccess }: StatusSelectProps) {
  const [loading, setLoading] = useState(false);

  async function handleChange(value: string) {
    if (value === currentStatus || loading) return;
    setLoading(true);
    try {
      await updateFeedbackStatus(feedbackId, value as FeedbackStatus, adminKey);
      onSuccess();
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <RadixSelect.Root value={currentStatus} onValueChange={handleChange} disabled={loading}>
      <RadixSelect.Trigger
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg',
          'bg-white/[0.07] border border-white/[0.12] text-white/60',
          'hover:bg-white/[0.11] hover:text-white/90 hover:border-white/20 transition-all duration-150 outline-none',
          loading && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Change status"
      >
        <RadixSelect.Value />
        <ChevronDown className="w-3 h-3" />
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="z-50 bg-[#0e0e22]/95 backdrop-blur-xl border border-white/[0.10] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-1 min-w-[150px]"
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
                  'text-white/70 hover:text-white hover:bg-white/[0.08]',
                  'data-[highlighted]:bg-white/[0.08] data-[highlighted]:text-white'
                )}
              >
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <Check className="w-3 h-3 text-violet-400" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

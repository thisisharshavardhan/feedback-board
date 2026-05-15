import { useFilter } from '../../context/FilterContext';
import { FeedbackStatus, SortOrder } from '../../api/types';
import { cn } from '../../utils/cn';

const STATUS_OPTIONS: { value: FeedbackStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'closed', label: 'Closed' },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'top', label: 'Top voted' },
];

export function FilterSidebar() {
  const { state, setStatus, setSort } = useFilter();

  return (
    <aside className="w-52 flex-shrink-0">
      <div className="sticky top-20 flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2.5">
            Status
          </p>
          <div className="flex flex-col gap-0.5">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatus(value)}
                className={cn(
                  'text-left px-3 py-2 rounded-lg text-sm transition-colors duration-100',
                  state.status === value
                    ? 'bg-[#0a0a0a] text-white font-medium'
                    : 'text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2.5">
            Sort by
          </p>
          <div className="flex flex-col gap-0.5">
            {SORT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSort(value)}
                className={cn(
                  'text-left px-3 py-2 rounded-lg text-sm transition-colors duration-100',
                  state.sort === value
                    ? 'bg-[#0a0a0a] text-white font-medium'
                    : 'text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

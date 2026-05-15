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
  { value: 'newest', label: 'Newest first' },
  { value: 'top', label: 'Top voted' },
];

function SidebarButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-100 font-medium',
        active
          ? 'bg-[#0a0a0a] text-white'
          : 'text-[#6b6b6b] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]'
      )}
    >
      {children}
    </button>
  );
}

export function FilterSidebar() {
  const { state, setStatus, setSort } = useFilter();

  return (
    <aside className="w-48 flex-shrink-0">
      <div className="sticky top-[calc(3.5rem+1px)] flex flex-col gap-6 pt-1">
        <div>
          <p className="text-[10px] font-semibold text-[#b0b0b0] uppercase tracking-widest mb-2 px-3">
            Status
          </p>
          <div className="flex flex-col gap-0.5">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <SidebarButton
                key={value}
                active={state.status === value}
                onClick={() => setStatus(value)}
              >
                {label}
              </SidebarButton>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#b0b0b0] uppercase tracking-widest mb-2 px-3">
            Sort by
          </p>
          <div className="flex flex-col gap-0.5">
            {SORT_OPTIONS.map(({ value, label }) => (
              <SidebarButton
                key={value}
                active={state.sort === value}
                onClick={() => setSort(value)}
              >
                {label}
              </SidebarButton>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

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
        'w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-all duration-150',
        active
          ? 'bg-white/[0.07] text-white/82 font-medium'
          : 'text-white/32 font-normal hover:text-white/62 hover:bg-white/[0.04]'
      )}
    >
      {children}
    </button>
  );
}

export function FilterSidebar() {
  const { state, setStatus, setSort } = useFilter();

  return (
    <aside className="w-44 flex-shrink-0">
      <div className="sticky top-6 flex flex-col gap-5">
        <div>
          <p className="text-[10px] font-semibold text-white/18 uppercase tracking-widest mb-1.5 px-2.5">
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
          <p className="text-[10px] font-semibold text-white/18 uppercase tracking-widest mb-1.5 px-2.5">
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

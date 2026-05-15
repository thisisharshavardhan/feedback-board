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
        'w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 font-medium',
        active
          ? 'bg-white/[0.10] text-white border border-white/[0.14]'
          : 'text-white/45 hover:text-white/80 hover:bg-white/[0.06]'
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
      <div className="sticky top-6 flex flex-col gap-1">
        <div className="bg-white/[0.04] backdrop-blur-md border border-white/[0.07] rounded-2xl p-3 flex flex-col gap-4">
          <div>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-2 px-1">
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

          <div className="border-t border-white/[0.06]" />

          <div>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-2 px-1">
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
      </div>
    </aside>
  );
}

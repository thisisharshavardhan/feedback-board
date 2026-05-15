import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onSubmitClick: () => void;
}

export function Header({ onSubmitClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0a0a0a] tracking-tight">
            Feedback
          </span>
        </div>
        <Button size="sm" onClick={onSubmitClick}>
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Submit Feedback
        </Button>
      </div>
    </header>
  );
}

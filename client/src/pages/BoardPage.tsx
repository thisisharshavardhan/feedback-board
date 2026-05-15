import { useState } from 'react';
import { FilterSidebar } from '../components/layout/FilterSidebar';
import { FeedbackList } from '../components/feedback/FeedbackList';
import { FeedbackForm } from '../components/feedback/FeedbackForm';
import { ToastContainer, useToast } from '../components/ui/Toast';
import { Header } from '../components/layout/Header';
import { useFeedback } from '../hooks/useFeedback';
import { useFilter } from '../context/FilterContext';

export function BoardPage() {
  const [formOpen, setFormOpen] = useState(false);
  const { state } = useFilter();
  const { items, loading, error, refetch } = useFeedback(state.status, state.sort);
  const toast = useToast();

  function handleDelete(_id: string) {
    refetch();
    toast.success('Feedback deleted');
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <Header onSubmitClick={() => setFormOpen(true)} />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <FilterSidebar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-widest">
                {loading
                  ? 'Loading…'
                  : `${items.length} ${items.length === 1 ? 'post' : 'posts'}`}
              </p>
            </div>
            <FeedbackList
              items={items}
              loading={loading}
              error={error}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <FeedbackForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={() => {
          refetch();
          toast.success('Feedback submitted — thanks!');
        }}
      />

      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}

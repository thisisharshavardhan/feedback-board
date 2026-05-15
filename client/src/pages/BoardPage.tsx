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

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onSubmitClick={() => setFormOpen(true)} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          <FilterSidebar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-[#0a0a0a]">
                {items.length > 0 && !loading
                  ? `${items.length} ${items.length === 1 ? 'post' : 'posts'}`
                  : 'Feedback'}
              </h2>
            </div>
            <FeedbackList items={items} loading={loading} error={error} />
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

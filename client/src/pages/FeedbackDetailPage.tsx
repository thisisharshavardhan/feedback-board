import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFeedbackDetail } from '../hooks/useFeedbackDetail';
import { FeedbackDetail } from '../components/feedback/FeedbackDetail';
import { Spinner } from '../components/ui/Spinner';
import { Header } from '../components/layout/Header';
import { ToastContainer, useToast } from '../components/ui/Toast';

export function FeedbackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { item, loading, error, refetch } = useFeedbackDetail(id!);
  const toast = useToast();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onSubmitClick={() => {}} />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to board
        </Link>

        {loading && (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="py-20 text-center">
            <p className="text-sm text-red-500 font-medium">Failed to load feedback</p>
            <p className="text-xs text-[#a3a3a3] mt-1">{error}</p>
          </div>
        )}

        {item && (
          <FeedbackDetail
            item={item}
            onStatusChange={() => {
              refetch();
              toast.success('Status updated');
            }}
          />
        )}
      </div>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}

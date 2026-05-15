import { useParams, Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans">
      <Header onSubmitClick={() => {}} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/35 hover:text-white/70 transition-colors mb-7"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to board
        </Link>

        {loading && (
          <div className="flex justify-center py-24">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <div className="py-24 text-center">
            <p className="text-sm text-red-400 font-medium">Failed to load feedback</p>
            <p className="text-xs text-white/30 mt-1">{error}</p>
          </div>
        )}

        {item && (
          <FeedbackDetail
            item={item}
            onStatusChange={() => {
              refetch();
              toast.success('Status updated');
            }}
            onDelete={() => navigate('/')}
          />
        )}
      </div>

      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}

import { useForm } from 'react-hook-form';
import { Dialog } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { useSubmitFeedback } from '../../hooks/useSubmitFeedback';
import { validateTitle, validateDescription } from '../../validation/feedback';

interface FormValues {
  title: string;
  description: string;
}

interface FeedbackFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function FeedbackForm({ open, onOpenChange, onSuccess }: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { submitting, error, submit } = useSubmitFeedback();

  async function onSubmit(values: FormValues) {
    await submit(values.title, values.description, () => {
      reset();
      onOpenChange(false);
      onSuccess();
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!submitting) {
          onOpenChange(o);
          if (!o) reset();
        }
      }}
      title="Submit Feedback"
      description="Share an idea, report a bug, or request a feature."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="A short, clear summary"
          error={errors.title?.message}
          {...register('title', {
            validate: (v) => validateTitle(v) === true ? true : validateTitle(v) as string,
          })}
        />
        <Textarea
          label="Description"
          placeholder="Describe the idea or issue in detail…"
          rows={5}
          error={errors.description?.message}
          {...register('description', {
            validate: (v) =>
              validateDescription(v) === true ? true : validateDescription(v) as string,
          })}
        />
        {error && <p className="text-xs text-red-400/90">{error}</p>}
        <div className="flex justify-end gap-3 pt-1">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!submitting) {
                onOpenChange(false);
                reset();
              }
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

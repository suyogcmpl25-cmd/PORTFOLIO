import { useEffect, useState } from 'react';
import { X, Send, Loader2, AlertCircle } from 'lucide-react';
import type { AuditFormData } from '@/types';
import { submitAuditRequest } from '@/lib/supabase';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: AuditFormData = {
  name: '',
  email: '',
  automation: '',
  website: '',
};

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [form, setForm] = useState<AuditFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.automation) return;

    setStatus('submitting');
    setErrorMessage('');

    const result = await submitAuditRequest(form);

    if (result.success) {
      setStatus('success');
      setForm(EMPTY_FORM);
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass =
    'w-full bg-ink-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-ink-50 placeholder-ink-300 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/30 transition-all';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="glass-strong rounded-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-300 hover:text-ink-50 transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center mx-auto mb-5">
              <Send className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink-50 mb-2">
              Request Received
            </h3>
            <p className="text-sm text-ink-200">
              Thank you. I'll review your request and get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                <span className="section-label text-accent-400">Free Audit</span>
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-ink-50 mb-2">
                Book a Free Automation Audit
              </h3>
              <p className="text-sm text-ink-200 leading-relaxed">
                Tell me what your business is doing manually. I'll identify where automation could save time and improve the process.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono tracking-widest text-ink-300 mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-ink-300 mb-2">
                  BUSINESS EMAIL
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@business.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-ink-300 mb-2">
                  WHAT WOULD YOU LIKE TO AUTOMATE?
                </label>
                <textarea
                  value={form.automation}
                  onChange={(e) => setForm({ ...form, automation: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Tell me what you're currently doing manually..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest text-ink-300 mb-2">
                  WEBSITE <span className="text-ink-400 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className={inputClass}
                  placeholder="https://yourbusiness.com"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Request Audit
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

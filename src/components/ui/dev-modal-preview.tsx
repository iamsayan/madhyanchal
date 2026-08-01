'use client';

import { useState } from 'react';
import { NativeModal } from '@/components/ui/native-modal';
import { CheckCircle2, History, RefreshCw, Sparkles, X } from 'lucide-react';

export function DevModalPreview() {
  const [activeModal, setActiveModal] = useState<
    'success' | 'error' | 'info' | null
  >(null);

  // Only render in development mode or if forced
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Floating Development Trigger Badge (Bottom Right) */}
      <div className="fixed right-4 bottom-20 z-[999] flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-900/90 p-1.5 pl-3.5 text-xs font-bold text-amber-400 shadow-2xl backdrop-blur-xl sm:bottom-6">
        <span className="flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-400" />
          Modal Playground
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveModal('success')}
            className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400 transition-colors hover:bg-emerald-500/30"
          >
            Success
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('error')}
            className="rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-1 text-[11px] font-bold text-rose-400 transition-colors hover:bg-rose-500/30"
          >
            Error
          </button>
          <button
            type="button"
            onClick={() => setActiveModal('info')}
            className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-400 transition-colors hover:bg-amber-500/30"
          >
            Info
          </button>
        </div>
      </div>

      {/* DEMO SUCCESS MODAL */}
      <NativeModal
        isOpen={activeModal === 'success'}
        onClose={() => setActiveModal(null)}
        variant="success"
        title="Payment Successful! (Preview)"
        description="Demo preview of native app subscription receipt modal."
        details={[
          { label: 'Amount Paid', value: '₹1,500', highlight: true },
          { label: 'Payment ID', value: 'pay_DEMO123456789', copyable: true },
          { label: 'Gateway', value: 'Razorpay' },
        ]}
        secondaryButton={{
          label: 'Check Status',
          onClick: () => setActiveModal(null),
          icon: <History className="h-4 w-4" />,
        }}
        primaryButton={{
          label: 'Pay Again',
          onClick: () => setActiveModal(null),
          icon: <RefreshCw className="h-4 w-4" />,
        }}
      />

      {/* DEMO ERROR MODAL */}
      <NativeModal
        isOpen={activeModal === 'error'}
        onClose={() => setActiveModal(null)}
        variant="error"
        title="Payment Error (Preview)"
        description="Transaction timed out or payment was cancelled by user."
        primaryButton={{
          label: 'Close & Retry',
          onClick: () => setActiveModal(null),
        }}
      />

      {/* DEMO INFO MODAL */}
      <NativeModal
        isOpen={activeModal === 'info'}
        onClose={() => setActiveModal(null)}
        variant="info"
        title="Fully Paid (Preview)"
        description="All subscription dues for 2026 have been settled in full."
        details={[
          { label: 'Total Contribution', value: '₹2,400', highlight: true },
          { label: 'Status', value: 'ACTIVE MEMBER' },
        ]}
        primaryButton={{
          label: 'View Receipt',
          onClick: () => setActiveModal(null),
        }}
      />
    </>
  );
}

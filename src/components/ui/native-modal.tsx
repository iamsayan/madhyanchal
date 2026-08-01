'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';
import {
  Check,
  CheckCircle2,
  Copy,
  Info,
  ShieldCheck,
  Trophy,
  XCircle,
} from 'lucide-react';

export interface NativeModalDetailItem {
  label: string;
  value: string;
  copyable?: boolean;
  highlight?: boolean;
}

export interface NativeModalActionButton {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface NativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  badgeIcon?: ReactNode;
  details?: NativeModalDetailItem[];
  primaryButton?: NativeModalActionButton;
  secondaryButton?: NativeModalActionButton;
  children?: ReactNode;
}

export function NativeModal({
  isOpen,
  onClose,
  variant = 'success',
  title,
  description,
  badgeIcon,
  details,
  primaryButton,
  secondaryButton,
  children,
}: NativeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = useCallback((text: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  }, []);

  if (!mounted) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          borderBeam: { from: '#f43f5e', to: '#fb7185' },
          badgeBg:
            'border-rose-500/30 bg-rose-500/10 text-rose-500 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-400',
          borderColor: 'border-rose-500/30 dark:border-rose-500/40',
          defaultIcon: <XCircle className="h-10 w-10 text-rose-500" />,
        };
      case 'info':
      case 'warning':
        return {
          borderBeam: { from: '#f59e0b', to: '#fbbf24' },
          badgeBg:
            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-400',
          borderColor: 'border-amber-500/30 dark:border-amber-500/40',
          defaultIcon: <Trophy className="h-10 w-10 text-amber-500" />,
        };
      case 'success':
      default:
        return {
          borderBeam: { from: '#10b981', to: '#34d399' },
          badgeBg:
            'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shadow-lg shadow-emerald-500/20 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-400',
          borderColor: 'border-emerald-500/30 dark:border-emerald-500/40',
          defaultIcon: <CheckCircle2 className="h-10 w-10 animate-bounce text-emerald-500" />,
        };
    }
  };

  const vStyles = getVariantStyles();

  const renderButton = (btn: NativeModalActionButton, isPrimary: boolean) => {
    const baseClasses = isPrimary
      ? 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 py-3.5 px-4 text-xs font-black tracking-wider text-stone-950 uppercase shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]'
      : 'inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 px-4 text-xs font-bold text-slate-800 shadow-xs transition-all hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-stone-900 dark:text-slate-200 dark:hover:bg-stone-800';

    if (btn.href) {
      return (
        <Link key={btn.label} href={btn.href} className={baseClasses} onClick={onClose}>
          {btn.icon}
          <span>{btn.label}</span>
        </Link>
      );
    }

    return (
      <button
        key={btn.label}
        type="button"
        onClick={() => {
          if (btn.onClick) btn.onClick();
          else onClose();
        }}
        className={baseClasses}
      >
        {btn.icon}
        <span>{btn.label}</span>
      </button>
    );
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-4">
          {/* Backdrop Touch & Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xl"
          />

          {/* Native Mobile Bottom Sheet / Desktop Dialog */}
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className={`relative z-10 w-full max-w-md overflow-hidden rounded-t-[2.5rem] border ${vStyles.borderColor} bg-white/95 p-6 pb-[calc(1.75rem+env(safe-area-inset-bottom,0px))] text-center shadow-2xl backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8 sm:pb-8 dark:bg-stone-950/95`}
          >
            <BorderBeam
              size={160}
              duration={6}
              colorFrom={vStyles.borderBeam.from}
              colorTo={vStyles.borderBeam.to}
            />

            {/* Mobile Native Drag Handle Bar */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300 sm:hidden dark:bg-slate-700" />

            {/* Badge Icon */}
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${vStyles.badgeBg}`}
            >
              {badgeIcon || vStyles.defaultIcon}
            </div>

            {/* Header Text */}
            <div className="space-y-1.5 pt-3">
              <h3 className="font-paytone text-2xl tracking-tight text-slate-900 dark:text-white">
                {title}
              </h3>
              {description && (
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {description}
                </p>
              )}
            </div>

            {/* Custom Content Slot */}
            {children}

            {/* Receipt / Details Box */}
            {details && details.length > 0 && (
              <div className="my-4 space-y-3 rounded-2xl border border-slate-200/90 bg-slate-50/90 p-4 text-left text-xs shadow-xs dark:border-white/10 dark:bg-stone-900/80">
                {details.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between ${
                      idx !== details.length - 1
                        ? 'border-b border-slate-200/80 pb-2.5 dark:border-white/10'
                        : 'pt-0.5'
                    }`}
                  >
                    <span className="text-[10.5px] font-black tracking-wider text-slate-500 uppercase dark:text-slate-400">
                      {item.label}
                    </span>
                    {item.copyable ? (
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        <span>{item.value}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.value, idx)}
                          className="rounded-md p-1 transition-colors hover:bg-slate-200/60 dark:hover:bg-white/10"
                          title={`Copy ${item.label}`}
                        >
                          {copiedIndex === idx ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                          )}
                        </button>
                      </div>
                    ) : item.highlight ? (
                      <span className="font-paytone text-xl text-emerald-600 dark:text-emerald-400">
                        {item.value}
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {(primaryButton || secondaryButton) && (
              <div className="flex gap-2.5 pt-2">
                {secondaryButton && renderButton(secondaryButton, false)}
                {primaryButton && renderButton(primaryButton, true)}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

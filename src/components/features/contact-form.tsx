'use client';

import { useActionState, useEffect, useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';
import { submitContactForm } from '@/app/actions/form';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state?.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setClientErrors({});
    }
  }, [state?.success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (clientErrors[name]) {
      setClientErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    if (clientErrors[fieldName]) return clientErrors[fieldName];
    if (state?.errors && state.errors[fieldName]?.length) {
      return state.errors[fieldName][0];
    }
    return undefined;
  };

  return (
    <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-white/12 p-4 sm:p-7 backdrop-blur-2xl transition-all duration-300">
      <BorderBeam size={140} duration={6} colorFrom="#f59e0b" colorTo="#fef08a" />

      {state?.success ? (
        <div className="py-8 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-paytone text-lg sm:text-xl text-slate-900 dark:text-white">
            Message Sent Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            {state.message || 'Thank you for reaching out to Madhyanchal Sarbajanin. Our team will get back to you shortly.'}
          </p>
          <Button
            type="button"
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-full text-xs font-bold px-5 mt-2 cursor-pointer"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form action={formAction} className="space-y-3.5 sm:space-y-4" noValidate>
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="_honeypot"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {state?.success === false && state.message && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Full Name - Row 1 */}
          <div className="space-y-1">
            <label htmlFor="contact-name" className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
              Your Full Name <span className="text-amber-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Swapan Banerjee"
              required
              className="w-full rounded-lg border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {getFieldError('name') && (
              <p className="text-[10px] font-bold text-red-500">{getFieldError('name')}</p>
            )}
          </div>

          {/* Email & Phone - Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Email Address */}
            <div className="space-y-1">
              <label htmlFor="contact-email" className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full rounded-lg border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {getFieldError('email') && (
                <p className="text-[10px] font-bold text-red-500">{getFieldError('email')}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label htmlFor="contact-phone" className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98300 00000"
                className="w-full rounded-lg border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {getFieldError('phone') && (
                <p className="text-[10px] font-bold text-red-500">{getFieldError('phone')}</p>
              )}
            </div>
          </div>

          {/* Subject - Row 3 */}
          <div className="space-y-1">
            <label htmlFor="contact-subject" className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
              Inquiry Subject <span className="text-amber-500">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Sponsorship / General Query"
              required
              className="w-full rounded-lg border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {getFieldError('subject') && (
              <p className="text-[10px] font-bold text-red-500">{getFieldError('subject')}</p>
            )}
          </div>

          {/* Message - Row 4 */}
          <div className="space-y-1">
            <label htmlFor="contact-message" className="block text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
              Message / Inquiry Details <span className="text-amber-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your inquiry message here..."
              required
              className="w-full rounded-lg border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
            {getFieldError('message') && (
              <p className="text-[10px] font-bold text-red-500">{getFieldError('message')}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            variant="primary"
            size="lg"
            className="w-full rounded-full text-xs sm:text-sm font-bold min-h-[44px] cursor-pointer mt-2 active:scale-[0.98] transition-transform duration-150 shadow-none"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending Message...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" /> Send Message Now
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

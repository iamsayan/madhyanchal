'use client';

import { useActionState, useEffect, useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';
import { submitContactForm } from '@/app/actions/form';
import { useRouteContext } from '@/hooks/use-route-context';

export function ContactForm() {
  const { isDurgaPuja } = useRouteContext();

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null
  );

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
    <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-7 dark:border-white/12">
      <BorderBeam
        size={140}
        duration={6}
        colorFrom="#f59e0b"
        colorTo="#fef08a"
      />

      {state?.success ? (
        <div className="space-y-3 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-paytone text-lg text-slate-900 sm:text-xl dark:text-white">
            Message Sent Successfully!
          </h3>
          <p className="mx-auto max-w-sm text-xs text-slate-600 sm:text-sm dark:text-slate-300">
            {state.message ||
              'Thank you for reaching out to Madhyanchal Sarbajanin. Our team will get back to you shortly.'}
          </p>
          <Button
            type="button"
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-2 cursor-pointer rounded-full px-5 text-xs font-bold"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form
          action={formAction}
          className="flex flex-1 flex-col justify-between space-y-3.5 sm:space-y-4"
          noValidate
        >
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
            <label
              htmlFor="contact-name"
              className="block text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-300"
            >
              Your Full Name <span className="text-amber-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Your name"
              required
              className="w-full rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:text-sm dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
            {getFieldError('name') && (
              <p className="text-[10px] font-bold text-red-500">
                {getFieldError('name')}
              </p>
            )}
          </div>

          {/* Email & Phone - Row 2 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {/* Email Address */}
            <div className="space-y-1">
              <label
                htmlFor="contact-email"
                className="block text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-300"
              >
                Email Address <span className="text-amber-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@gmail.com"
                required
                className="w-full rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:text-sm dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
              />
              {getFieldError('email') && (
                <p className="text-[10px] font-bold text-red-500">
                  {getFieldError('email')}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label
                htmlFor="contact-phone"
                className="block text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-300"
              >
                Phone Number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98300 00000"
                className="w-full rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:text-sm dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
              />
              {getFieldError('phone') && (
                <p className="text-[10px] font-bold text-red-500">
                  {getFieldError('phone')}
                </p>
              )}
            </div>
          </div>

          {/* Hidden input to automatically detect Puja mode from Route Context */}
          <input
            type="hidden"
            name="puja"
            value={isDurgaPuja ? 'Durga Puja' : 'Jagadhatri Puja'}
          />

          {/* Subject - Row 3 */}
          <div className="space-y-1">
            <label
              htmlFor="contact-subject"
              className="block text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-300"
            >
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
              className="w-full rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:text-sm dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
            {getFieldError('subject') && (
              <p className="text-[10px] font-bold text-red-500">
                {getFieldError('subject')}
              </p>
            )}
          </div>

          {/* Message - Row 4 */}
          <div className="space-y-1">
            <label
              htmlFor="contact-message"
              className="block text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-300"
            >
              Message / Inquiry Details{' '}
              <span className="text-amber-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your inquiry message here..."
              required
              className="w-full resize-none rounded-lg border border-slate-300/80 bg-white/90 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:text-sm dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
            {getFieldError('message') && (
              <p className="text-[10px] font-bold text-red-500">
                {getFieldError('message')}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            variant="primary"
            size="lg"
            className="mt-2 min-h-[44px] w-full cursor-pointer rounded-full text-xs font-bold shadow-none transition-transform duration-150 active:scale-[0.98] sm:text-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Message Now
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

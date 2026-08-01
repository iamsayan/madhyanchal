'use server';

import cockpit from '@/lib/client';

export interface ContactFormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const honeypot = formData.get('_honeypot') as string;

  // Check honeypot (website/honeypot field must be empty for humans)
  if (honeypot) {
    console.warn('Bot submission blocked via Cockpit honeypot field.');
    return {
      success: true,
      message:
        'Thank you! Your message has been sent successfully. We will get back to you shortly.',
    };
  }

  // Validate fields
  const errors: Record<string, string[]> = {};

  if (!name || name.trim() === '') {
    errors.name = ['Name is required'];
  }

  if (!email || !email.includes('@')) {
    errors.email = ['A valid email address is required'];
  }

  if (!subject || subject.trim() === '') {
    errors.subject = ['Inquiry subject is required'];
  }

  if (!message || message.trim() === '') {
    errors.message = ['Message is required'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const token = process.env.CONTACT_FORM_TOKEN!;
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      _honeypot: honeypot || '',
      submittedAt: new Date().toISOString(),
    };

    // Submit via Cockpit's submitInbox helper
    const response = await cockpit.submitInbox(token, payload);

    if (response && response.success) {
      return {
        success: true,
        message:
          'Thank you! Your message has been sent successfully. We will get back to you shortly.',
      };
    } else {
      console.error(
        'Cockpit inbox submission response was not successful:',
        response
      );
      return {
        success: false,
        message:
          'There was an issue submitting your request. Please try again later or contact us directly via WhatsApp/Email.',
      };
    }
  } catch (error) {
    console.error('Error in submitContactForm action:', error);
    return {
      success: false,
      message:
        'A network error occurred. Please check your connection and try again.',
    };
  }
}

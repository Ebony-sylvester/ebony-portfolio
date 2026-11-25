// Pure helpers for the contact form, kept out of the component so they're testable.

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(m: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  if (!m.name.trim()) errors.name = 'Enter your name.';
  if (!EMAIL.test(m.email.trim())) errors.email = 'Enter an email address I can reply to.';
  if (m.message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.';
  return errors;
}

/**
 * Netlify Forms takes a urlencoded POST naming the form. The matching static
 * form in index.html is what tells Netlify the form exists at deploy time.
 */
export function netlifyFormBody(m: ContactMessage, honeypot: string): string {
  return new URLSearchParams({
    'form-name': 'contact',
    'bot-field': honeypot,
    name: m.name.trim(),
    email: m.email.trim(),
    message: m.message.trim(),
  }).toString();
}

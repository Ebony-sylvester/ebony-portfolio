import { netlifyFormBody, validateContact } from './contact-form';

describe('validateContact', () => {
  const ok = { name: 'Sam', email: 'sam@example.com', message: 'Would love to chat about a role.' };

  it('accepts a complete message', () => {
    expect(validateContact(ok)).toEqual({});
  });

  it('flags each missing or invalid field with a fix', () => {
    const errors = validateContact({ name: ' ', email: 'not-an-email', message: 'hi' });
    expect(errors.name).toBe('Enter your name.');
    expect(errors.email).toContain('email address');
    expect(errors.message).toContain('10 characters');
  });
});

describe('netlifyFormBody', () => {
  it('names the form and trims every field', () => {
    const body = new URLSearchParams(netlifyFormBody({ name: ' Sam ', email: ' sam@example.com ', message: ' Hello there! ' }, ''));
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('name')).toBe('Sam');
    expect(body.get('email')).toBe('sam@example.com');
    expect(body.get('message')).toBe('Hello there!');
    expect(body.get('bot-field')).toBe('');
  });
});

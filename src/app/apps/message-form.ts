import { Component, signal } from '@angular/core';
import { PROFILE } from '../data/resume';
import { ContactErrors, ContactMessage, netlifyFormBody, validateContact } from './contact-form';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/** Sends a message through Netlify Forms, which emails it to me. */
@Component({
  selector: 'app-message-form',
  template: `
    @if (status() === 'sent') {
      <div class="done bevel-in" role="status">
        <strong>Message sent.</strong> Thanks, {{ sentTo() }}. I'll reply to your email soon.
        <button type="button" class="btn" (click)="reset()">Send another</button>
      </div>
    } @else {
      <form novalidate (submit)="send($event)">
        <!-- Spam trap: people never see or fill this. -->
        <p class="trap" aria-hidden="true">
          <label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off" #trap /></label>
        </p>
        <label for="cf-name">Your name</label>
        <input id="cf-name" #name autocomplete="name" [attr.aria-invalid]="!!errors().name" aria-describedby="cf-name-err" (input)="clear('name')" />
        <p class="err" id="cf-name-err">{{ errors().name }}</p>

        <label for="cf-email">Your email</label>
        <input id="cf-email" #email type="email" autocomplete="email" [attr.aria-invalid]="!!errors().email" aria-describedby="cf-email-err" (input)="clear('email')" />
        <p class="err" id="cf-email-err">{{ errors().email }}</p>

        <label for="cf-msg">Message</label>
        <textarea id="cf-msg" #msg rows="5" [attr.aria-invalid]="!!errors().message" aria-describedby="cf-msg-err" (input)="clear('message')"></textarea>
        <p class="err" id="cf-msg-err">{{ errors().message }}</p>

        @if (status() === 'failed') {
          <p class="fail" role="alert">
            The message didn't send. Email me directly at <a [href]="'mailto:' + myEmail">{{ myEmail }}</a>.
          </p>
        }
        <button class="btn primary" type="submit" [disabled]="status() === 'sending'">
          {{ status() === 'sending' ? 'Sending…' : 'Send message' }}
        </button>
      </form>
    }
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
    }
    label {
      font-family: var(--font-ui);
      font-size: 15px;
      margin-top: 8px;
    }
    input,
    textarea {
      font: inherit;
      font-size: 15px;
      padding: 6px 8px;
      border: 0;
      background: var(--paper);
      box-shadow:
        inset -1px -1px 0 var(--light),
        inset 1px 1px 0 var(--mid),
        inset 2px 2px 0 var(--dark);
      resize: vertical;
    }
    [aria-invalid='true'] {
      outline: 2px solid var(--accent);
    }
    .err {
      min-height: 18px;
      font-size: 13px;
      color: var(--accent);
    }
    .fail {
      margin: 6px 0 10px;
      font-size: 14px;
    }
    form > .btn {
      align-self: flex-start;
      margin-top: 4px;
    }
    .trap {
      position: absolute;
      left: -9999px;
    }
    .done {
      background: var(--note);
      padding: 14px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  `,
})
export class MessageForm {
  // Not named `email`: the template's #email input ref would shadow it.
  protected readonly myEmail = PROFILE.email;
  protected readonly status = signal<Status>('idle');
  protected readonly errors = signal<ContactErrors>({});
  protected readonly sentTo = signal('');

  protected async send(e: Event): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const field = (id: string) => (form.querySelector<HTMLInputElement>(`#${id}`)?.value ?? '');
    const message: ContactMessage = { name: field('cf-name'), email: field('cf-email'), message: field('cf-msg') };

    const errors = validateContact(message);
    this.errors.set(errors);
    if (Object.keys(errors).length) return;

    this.status.set('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyFormBody(message, form.querySelector<HTMLInputElement>('[name=bot-field]')?.value ?? ''),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.sentTo.set(message.name.trim());
      this.status.set('sent');
    } catch {
      // Offline, or running locally where there's no Netlify to receive it.
      this.status.set('failed');
    }
  }

  protected clear(key: keyof ContactMessage): void {
    if (this.errors()[key]) this.errors.update((e) => ({ ...e, [key]: undefined }));
  }

  protected reset(): void {
    this.errors.set({});
    this.status.set('idle');
  }
}

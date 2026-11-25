import { Component, signal } from '@angular/core';
import { PROFILE } from '../data/resume';
import { PixelIcon } from '../os/pixel-icon';
import { MessageForm } from './message-form';

@Component({
  selector: 'app-contact',
  imports: [PixelIcon, MessageForm],
  template: `
    <div class="pane">
      <div class="head">
        <app-pixel-icon name="mail" [size]="56" />
        <p>I'm looking for frontend roles on web or mobile apps, and IT support roles. Send a message and I'll reply by email.</p>
      </div>
      <div class="email bevel-in">
        <span>{{ p.email }}</span>
        <button type="button" class="btn" (click)="copy()">{{ copied() ? 'Copied' : 'Copy' }}</button>
      </div>
      <div class="links">
        <a class="btn primary" [href]="'mailto:' + p.email">Send an email</a>
        <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a class="btn" [href]="p.github" target="_blank" rel="noopener">GitHub</a>
      </div>
      <h3>Send a message</h3>
      <app-message-form />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .head {
      display: flex;
      gap: 16px;
      align-items: center;
      font-size: 17px;
    }
    .email {
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 6px 6px 12px;
      background: var(--chrome-hi);
      font-size: 15px;
      word-break: break-all;
    }
    .email span {
      flex: 1;
    }
    h3 {
      margin-top: 20px;
      font-family: var(--font-ui);
      font-weight: 500;
      font-size: 18px;
      color: var(--title-a);
      border-bottom: 1px solid var(--mid);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
  `,
})
export class ContactApp {
  protected readonly p = PROFILE;
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      // Clipboard blocked (insecure origin or permissions): the address is on screen to select.
    }
  }
}

import { Service, inject, signal } from '@angular/core';
import { Analytics } from './analytics';

const RESUME_PATH = '/resume';

/**
 * Whether the plain recruiter view is showing instead of the desktop.
 * It has its own URL (/resume) so it can be linked to directly; Netlify's
 * SPA redirect serves index.html there.
 */
@Service()
export class ViewState {
  private readonly analytics = inject(Analytics);
  readonly resume = signal(location.pathname === RESUME_PATH);

  constructor() {
    addEventListener('popstate', () => this.resume.set(location.pathname === RESUME_PATH));
  }

  openResume(): void {
    if (!this.resume()) history.pushState(null, '', RESUME_PATH);
    this.resume.set(true);
    this.analytics.event('view/resume', 'Resume');
  }

  closeResume(): void {
    if (this.resume()) history.pushState(null, '', '/');
    this.resume.set(false);
  }
}

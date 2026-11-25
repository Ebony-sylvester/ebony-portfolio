import { Service, signal } from '@angular/core';

const RESUME_PATH = '/resume';

/**
 * Whether the plain recruiter view is showing instead of the desktop.
 * It has its own URL (/resume) so it can be linked to directly; Netlify's
 * SPA redirect serves index.html there.
 */
@Service()
export class ViewState {
  readonly resume = signal(location.pathname === RESUME_PATH);

  constructor() {
    addEventListener('popstate', () => this.resume.set(location.pathname === RESUME_PATH));
  }

  openResume(): void {
    if (!this.resume()) history.pushState(null, '', RESUME_PATH);
    this.resume.set(true);
  }

  closeResume(): void {
    if (this.resume()) history.pushState(null, '', '/');
    this.resume.set(false);
  }
}

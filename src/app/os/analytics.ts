import { Service } from '@angular/core';

/**
 * Your GoatCounter site code, e.g. 'ebony' for https://ebony.goatcounter.com.
 * Sign up free at goatcounter.com, then set it here. While it's null, nothing loads.
 */
export const GOATCOUNTER_CODE: string | null = 'ebony';

interface GoatCounter {
  count(vars: { path: string; title?: string; event?: boolean }): void;
}

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/**
 * Privacy-friendly visit counts: no cookies, no personal data, so no consent
 * banner. Counts page views plus which windows visitors open.
 */
@Service()
export class Analytics {
  private readonly enabled = !!GOATCOUNTER_CODE && !['localhost', '127.0.0.1'].includes(location.hostname);

  constructor() {
    if (!this.enabled) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset['goatcounter'] = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
    document.head.appendChild(s);
  }

  /** Records that a visitor opened something, e.g. event('window/casestudy'). */
  event(path: string, title?: string): void {
    if (this.enabled) window.goatcounter?.count({ path, title, event: true });
  }
}

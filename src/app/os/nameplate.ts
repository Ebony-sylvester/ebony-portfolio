import { Component } from '@angular/core';
import { PROFILE } from '../data/resume';

/**
 * Name and title painted on the wallpaper, so who this is stays clear even
 * with every window closed.
 */
@Component({
  selector: 'app-nameplate',
  template: `
    <p class="name">{{ p.name }}</p>
    <p class="title">Software engineer and IT support</p>
  `,
  styles: `
    :host {
      position: absolute;
      top: 18px;
      right: 24px;
      text-align: right;
      color: var(--light);
      pointer-events: none;
      user-select: none;
    }
    .name {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 30px;
      line-height: 1;
      text-shadow: 2px 2px 0 var(--dark);
    }
    .title {
      margin-top: 6px;
      font-size: 15px;
      text-shadow: 1px 1px 0 var(--dark);
    }
    @media (max-width: 720px) {
      :host {
        display: none;
      }
    }
  `,
  host: { 'aria-hidden': 'true' },
})
export class Nameplate {
  protected readonly p = PROFILE;
}

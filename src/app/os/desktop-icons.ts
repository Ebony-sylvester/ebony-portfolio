import { Component, inject, signal } from '@angular/core';
import { PROFILE } from '../data/resume';
import { APPS, AppId, DESKTOP_ORDER } from './apps';
import { PixelIcon } from './pixel-icon';
import { WindowManager } from './window-manager';

/**
 * Desktop shortcuts. Like the real thing, a click selects and a double-click
 * opens; Enter and a touch tap open straight away.
 */
@Component({
  selector: 'app-desktop-icons',
  imports: [PixelIcon],
  template: `
    @for (id of order; track id) {
      <button
        type="button"
        class="icon"
        [class.selected]="selected() === id"
        (pointerup)="tap($event, id)"
        (dblclick)="wm.open(id)"
        (keydown.enter)="wm.open(id)"
      >
        <app-pixel-icon [name]="apps[id].icon" [size]="40" />
        <span>{{ apps[id].label }}</span>
      </button>
    }
    @if (resume; as href) {
      <a class="icon" [href]="href" target="_blank" rel="noopener">
        <app-pixel-icon name="doc" [size]="40" />
        <span>Resume.pdf</span>
      </a>
    }
  `,
  styles: `
    :host {
      position: absolute;
      top: 12px;
      left: 8px;
      bottom: calc(var(--taskbar-h) + 8px);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 6px 4px;
    }
    .icon {
      width: 92px;
      padding: 6px 4px;
      border: 0;
      background: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      text-decoration: none;
    }
    span {
      font-family: var(--font-ui);
      font-size: 14px;
      line-height: 1.2;
      color: var(--light);
      text-align: center;
      padding: 1px 4px;
      text-shadow: 1px 1px 0 var(--dark);
    }
    .selected span {
      background: var(--title-a);
      outline: 1px dotted var(--accent-soft);
      text-shadow: none;
    }
    .selected app-pixel-icon {
      filter: drop-shadow(0 0 0 var(--title-a)) saturate(0.6) brightness(0.8);
    }
    @media (max-width: 720px) {
      :host {
        right: 8px;
        bottom: auto;
        flex-direction: row;
        justify-content: center;
      }
      .icon {
        width: 84px;
      }
    }
  `,
})
export class DesktopIcons {
  protected readonly wm = inject(WindowManager);
  protected readonly apps = APPS;
  protected readonly order = DESKTOP_ORDER;
  protected readonly resume = PROFILE.resumePdf;
  protected readonly selected = signal<AppId | null>(null);

  protected tap(e: PointerEvent, id: AppId): void {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      this.wm.open(id);
      return;
    }
    this.selected.set(id);
  }
}

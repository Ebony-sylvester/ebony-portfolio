import { Component, ElementRef, afterNextRender, inject, output } from '@angular/core';
import { PROFILE } from '../data/resume';
import { APPS, AppId, DESKTOP_ORDER } from './apps';
import { PixelIcon } from './pixel-icon';

@Component({
  selector: 'app-start-menu',
  imports: [PixelIcon],
  template: `
    <div class="banner" aria-hidden="true"><span>Ebony<b>OS</b> 26</span></div>
    <ul role="menu" aria-label="Start">
      @for (id of order; track id) {
        <li role="none">
          <button type="button" role="menuitem" (click)="launch.emit(id)">
            <app-pixel-icon [name]="apps[id].icon" [size]="24" />
            {{ apps[id].label }}
          </button>
        </li>
      }
      <li role="separator" class="sep"></li>
      @if (resume; as href) {
        <li role="none">
          <a role="menuitem" [href]="href" target="_blank" rel="noopener" (click)="dismiss.emit()">
            <app-pixel-icon name="doc" [size]="24" />
            Resume (PDF)
          </a>
        </li>
      }
      <li role="none">
        <button type="button" role="menuitem" (click)="shutDown.emit()">
          <app-pixel-icon name="computer" [size]="24" />
          Shut down…
        </button>
      </li>
    </ul>
  `,
  styles: `
    :host {
      position: fixed;
      left: 4px;
      bottom: calc(var(--taskbar-h) - 2px);
      z-index: 9001;
      display: flex;
      padding: 3px;
      min-width: 250px;
      transform-origin: bottom left;
      animation: rise 160ms steps(4, end);
    }
    @keyframes rise {
      from { clip-path: inset(100% 0 0 0); }
      to { clip-path: inset(0 0 0 0); }
    }
    .banner {
      width: 34px;
      background: linear-gradient(0deg, var(--title-a), var(--title-b));
      color: var(--light);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 10px;
    }
    .banner span {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-family: var(--font-ui);
      font-size: 22px;
      letter-spacing: 0.02em;
    }
    .banner b {
      color: var(--accent-soft);
      font-weight: 600;
    }
    ul {
      list-style: none;
      padding: 2px;
      flex: 1;
    }
    button, a {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 7px 14px 7px 8px;
      border: 0;
      background: none;
      font-family: var(--font-ui);
      font-size: 16px;
      color: var(--ink);
      text-decoration: none;
      cursor: pointer;
      text-align: left;
    }
    button:hover, a:hover, button:focus-visible, a:focus-visible {
      background: var(--title-a);
      color: var(--light);
      outline: none;
    }
    .sep {
      height: 2px;
      margin: 4px 2px;
      border-top: 1px solid var(--mid);
      border-bottom: 1px solid var(--light);
    }
  `,
  host: { id: 'start-menu', class: 'bevel-out', '(keydown.escape)': 'dismiss.emit()' },
})
export class StartMenu {
  readonly launch = output<AppId>();
  readonly shutDown = output<void>();
  readonly dismiss = output<void>();

  protected readonly apps = APPS;
  protected readonly order = DESKTOP_ORDER;
  protected readonly resume = PROFILE.resumePdf;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    afterNextRender(() => host.nativeElement.querySelector<HTMLElement>('[role=menuitem]')?.focus());
  }
}

import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { APPS } from './apps';
import { PixelIcon } from './pixel-icon';
import { WindowManager } from './window-manager';

const clockFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

@Component({
  selector: 'app-taskbar',
  imports: [PixelIcon],
  template: `
    <button
      type="button"
      class="btn start"
      [attr.aria-pressed]="startOpen()"
      aria-haspopup="menu"
      aria-controls="start-menu"
      (click)="toggleStart.emit()"
    >
      <app-pixel-icon name="heart" [size]="20" />
      Start
    </button>
    <div class="tasks" role="group" aria-label="Open windows">
      @for (w of wm.windows(); track w.id) {
        <button
          type="button"
          class="btn task"
          [attr.aria-pressed]="wm.activeId() === w.id"
          (click)="wm.taskbarClick(w.id)"
        >
          <app-pixel-icon [name]="apps[w.id].icon" [size]="16" />
          <span class="task-label">{{ apps[w.id].label }}</span>
        </button>
      }
    </div>
    <div class="tray bevel-in">
      <app-pixel-icon name="floppy" [size]="16" />
      <time>{{ time() }}</time>
    </div>
  `,
  host: { role: 'navigation', 'aria-label': 'Taskbar' },
  styles: `
    :host {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--taskbar-h);
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 4px 3px;
      background: var(--chrome);
      box-shadow: inset 0 1px 0 var(--chrome-hi), inset 0 2px 0 var(--light);
    }
    .start {
      font-weight: 600;
      padding-left: 8px;
    }
    .tasks {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 4px;
      overflow: hidden;
    }
    .task {
      min-width: 0;
      max-width: 170px;
      flex: 1 1 0;
      justify-content: flex-start;
    }
    .task[aria-pressed='true'] {
      background: var(--chrome-hi);
      font-weight: 600;
    }
    .task-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .tray {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 32px;
      padding: 0 10px;
      font-family: var(--font-ui);
      font-size: 14px;
    }
    @media (max-width: 720px) {
      .task {
        flex: 0 0 auto;
        padding: 4px 8px;
      }
      .task-label {
        display: none;
      }
      .tray app-pixel-icon {
        display: none;
      }
    }
  `,
})
export class Taskbar {
  readonly startOpen = input(false);
  readonly toggleStart = output<void>();

  protected readonly wm = inject(WindowManager);
  protected readonly apps = APPS;
  protected readonly time = signal(clockFormat.format(Date.now()));

  constructor() {
    const id = setInterval(() => this.time.set(clockFormat.format(Date.now())), 15_000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}

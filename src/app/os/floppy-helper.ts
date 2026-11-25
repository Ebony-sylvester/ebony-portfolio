import { Component, computed, inject, output, signal } from '@angular/core';
import { AppId } from './apps';
import { PixelIcon } from './pixel-icon';
import { WindowManager } from './window-manager';

interface Tip {
  text: string;
  action?: { label: string; app: AppId };
}

// Flop, the desktop helper. Each tip points at one thing worth opening.
const TIPS: Tip[] = [
  { text: 'Hi! I’m Flop. Looks like you’re hiring. Want the short version?', action: { label: 'See experience', app: 'experience' } },
  { text: 'Ebony’s photo QA work took a clean-room pass rate from 52% to 92%.', action: { label: 'Show me', app: 'experience' } },
  { text: 'Psst: the terminal takes real commands. Try typing "help".', action: { label: 'Open terminal', app: 'terminal' } },
  { text: 'This whole desktop is Angular. Ebony learned it to build this.', action: { label: 'See projects', app: 'projects' } },
];

@Component({
  selector: 'app-floppy-helper',
  imports: [PixelIcon],
  template: `
    <div class="bubble" role="status">
      <p>{{ tip().text }}</p>
      <div class="actions">
        @if (tip().action; as a) {
          <button type="button" class="btn primary" (click)="wm.open(a.app)">{{ a.label }}</button>
        }
        <button type="button" class="btn" (click)="next()">Another tip</button>
      </div>
      <button type="button" class="x" aria-label="Hide Flop" (click)="dismiss.emit()">×</button>
    </div>
    <button type="button" class="flop" aria-label="Next tip from Flop" (click)="next()">
      <app-pixel-icon name="floppy" [size]="64" />
    </button>
  `,
  styles: `
    :host {
      position: absolute;
      right: 18px;
      bottom: calc(var(--taskbar-h) + 14px);
      z-index: 8000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      max-width: 300px;
      animation: pop 420ms cubic-bezier(0.3, 1.6, 0.5, 1) both;
    }
    @keyframes pop {
      from { transform: translateY(30px) scale(0.6); opacity: 0; }
    }
    .bubble {
      position: relative;
      background: var(--note);
      border: 2px solid var(--dark);
      padding: 12px 28px 12px 14px;
      font-size: 15px;
      line-height: 1.45;
      box-shadow: 4px 4px 0 rgba(38, 35, 45, 0.35);
    }
    .bubble::after {
      content: '';
      position: absolute;
      right: 26px;
      bottom: -12px;
      border: 6px solid transparent;
      border-top: 6px solid var(--dark);
      border-left: 6px solid var(--dark);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .actions .btn {
      font-size: 14px;
      min-height: 28px;
      padding: 2px 10px;
    }
    .x {
      position: absolute;
      top: 2px;
      right: 4px;
      border: 0;
      background: none;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      color: var(--ink-soft);
      padding: 2px 6px;
    }
    .flop {
      border: 0;
      background: none;
      padding: 0;
      cursor: pointer;
      animation: bob 2.4s ease-in-out infinite;
    }
    @keyframes bob { 50% { transform: translateY(-5px) rotate(-3deg); } }
    @media (max-width: 720px) {
      :host {
        right: 10px;
        left: 10px;
        max-width: none;
      }
    }
  `,
})
export class FloppyHelper {
  readonly dismiss = output<void>();
  protected readonly wm = inject(WindowManager);
  private readonly index = signal(0);
  protected readonly tip = computed(() => TIPS[this.index()]);

  protected next(): void {
    this.index.update((i) => (i + 1) % TIPS.length);
  }
}

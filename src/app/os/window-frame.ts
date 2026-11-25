import { Component, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { APPS } from './apps';
import { PixelIcon } from './pixel-icon';
import { OpenWindow, WindowManager } from './window-manager';

const TASKBAR_H = 44;
const ICON_COLUMN = 112;
const MOBILE = '(max-width: 720px)';

/**
 * One draggable window. Position uses the CSS `translate` property so the
 * open/close/minimize animations can use `transform` without fighting it.
 */
@Component({
  selector: 'app-window',
  imports: [PixelIcon],
  templateUrl: './window-frame.html',
  styleUrl: './window-frame.css',
  host: {
    class: 'bevel-out',
    role: 'dialog',
    tabindex: '-1',
    '[attr.aria-labelledby]': 'titleId()',
    '[attr.aria-hidden]': 'win().minimized',
    '[class.active]': 'active()',
    '[class.max]': 'win().maximized',
    '[class.min]': 'win().minimized',
    '[class.dragging]': 'dragging()',
    '[style.z-index]': 'win().z',
    '[style.width.px]': 'def().width',
    '[style.height.px]': 'def().height',
    '[style.translate]': 'pos().x + "px " + pos().y + "px"',
    '(pointerdown)': 'wm.focus(win().id)',
    '(keydown.escape)': 'wm.close(win().id)',
  },
})
export class WindowFrame {
  readonly win = input.required<OpenWindow>();

  protected readonly wm = inject(WindowManager);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly def = computed(() => APPS[this.win().id]);
  protected readonly titleId = computed(() => `win-title-${this.win().id}`);
  protected readonly active = computed(() => this.wm.activeId() === this.win().id);
  protected readonly pos = signal({ x: 24, y: 24 });
  protected readonly dragging = signal(false);

  private grab = { dx: 0, dy: 0 };

  constructor() {
    afterNextRender(() => {
      this.pos.set(this.startPosition());
      // Apps that take typing (the terminal) mark their field; everything else focuses the window.
      const el = this.host.nativeElement;
      (el.querySelector<HTMLElement>('[autofocus]') ?? el).focus({ preventScroll: true });
    });
  }

  protected startDrag(e: PointerEvent): void {
    if (e.button !== 0 || this.win().maximized || matchMedia(MOBILE).matches) return;
    if ((e.target as HTMLElement).closest('button')) return;
    const p = this.pos();
    this.grab = { dx: e.clientX - p.x, dy: e.clientY - p.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.dragging.set(true);
  }

  protected drag(e: PointerEvent): void {
    if (!this.dragging()) return;
    const w = this.def().width;
    // Keep at least a grab-able strip of title bar on screen.
    const x = clamp(e.clientX - this.grab.dx, 80 - w, innerWidth - 80);
    const y = clamp(e.clientY - this.grab.dy, 0, innerHeight - TASKBAR_H - 32);
    this.pos.set({ x, y });
  }

  protected endDrag(): void {
    this.dragging.set(false);
  }

  private startPosition(): { x: number; y: number } {
    const { width, height, at } = this.def();
    // Leave the desktop icon column clear when there's room for it.
    const left = innerWidth - width > ICON_COLUMN + 16 ? ICON_COLUMN : 8;
    const freeW = Math.max(0, innerWidth - width - left);
    const freeH = Math.max(0, innerHeight - TASKBAR_H - height);
    return { x: Math.round(left + at[0] * freeW), y: Math.round(Math.max(8, at[1] * freeH)) };
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

import { Component, ElementRef, afterNextRender, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { APPS } from './apps';
import { PixelIcon } from './pixel-icon';
import { OpenWindow, WindowManager } from './window-manager';

const TASKBAR_H = 44;
const ICON_COLUMN = 112;
const GAP = 12;
const MIN_WIDTH = 420;
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
    '[style.width.px]': 'size().w',
    '[style.height.px]': 'size().h',
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
  /** Starts at the app's preferred size; place() may shrink it to fit the desktop. */
  protected readonly size = linkedSignal(() => ({ w: this.def().width, h: this.def().height }));
  protected readonly dragging = signal(false);

  private grab = { dx: 0, dy: 0 };

  constructor() {
    afterNextRender(() => {
      this.place();
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
    const w = this.size().w;
    // Keep at least a grab-able strip of title bar on screen.
    const x = clamp(e.clientX - this.grab.dx, 80 - w, innerWidth - 80);
    const y = clamp(e.clientY - this.grab.dy, 0, innerHeight - TASKBAR_H - 32);
    this.pos.set({ x, y });
  }

  protected endDrag(): void {
    this.dragging.set(false);
  }

  /**
   * Opens the window in the desktop area right of the icons, shrinking it to
   * fit rather than covering them. `at` places it within that area
   * (0.5, 0.5 is centered).
   */
  private place(): void {
    const { width, height, at } = this.def();
    const icons = document.querySelector('app-desktop-icons')?.getBoundingClientRect();
    const left = Math.round((icons?.right ?? ICON_COLUMN) + GAP);
    const areaW = innerWidth - left - GAP;
    const areaH = innerHeight - TASKBAR_H - GAP * 2;

    // Too narrow to sit beside the icons (small tablets): overlap them rather than be unusable.
    const roomy = areaW >= MIN_WIDTH;
    const w = Math.min(width, roomy ? areaW : innerWidth - GAP * 2);
    const h = Math.min(height, areaH);
    const x0 = roomy ? left : GAP;
    const freeW = (roomy ? areaW : innerWidth - GAP * 2) - w;

    this.size.set({ w, h });
    this.pos.set({ x: Math.round(x0 + at[0] * freeW), y: Math.round(GAP + at[1] * (areaH - h)) });
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

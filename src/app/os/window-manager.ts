import { Service, computed, signal } from '@angular/core';
import { APPS, AppId } from './apps';

export interface OpenWindow {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

/**
 * Which windows are open, their stacking order and their min/max state.
 * Position is owned by CDK drag-drop on each window, not here.
 */
@Service()
export class WindowManager {
  private readonly list = signal<OpenWindow[]>([]);
  private topZ = 10;

  readonly windows = this.list.asReadonly();

  /** The window that should look active: highest z that isn't minimized. */
  readonly activeId = computed<AppId | null>(() => {
    const visible = this.list().filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  });

  open(id: AppId): void {
    if (!APPS[id]) return;
    const existing = this.list().find((w) => w.id === id);
    if (existing) {
      this.patch(id, { minimized: false, z: ++this.topZ });
      return;
    }
    this.list.update((l) => [...l, { id, z: ++this.topZ, minimized: false, maximized: false }]);
  }

  close(id: AppId): void {
    this.list.update((l) => l.filter((w) => w.id !== id));
  }

  focus(id: AppId): void {
    if (this.activeId() === id) return;
    this.patch(id, { z: ++this.topZ });
  }

  minimize(id: AppId): void {
    this.patch(id, { minimized: true });
  }

  toggleMaximize(id: AppId): void {
    const w = this.list().find((x) => x.id === id);
    if (w) this.patch(id, { maximized: !w.maximized, z: ++this.topZ });
  }

  /** Taskbar button: restore a minimized window, minimize the active one, or bring it forward. */
  taskbarClick(id: AppId): void {
    const w = this.list().find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) this.patch(id, { minimized: false, z: ++this.topZ });
    else if (this.activeId() === id) this.minimize(id);
    else this.focus(id);
  }

  closeAll(): void {
    this.list.set([]);
  }

  private patch(id: AppId, change: Partial<OpenWindow>): void {
    this.list.update((l) => l.map((w) => (w.id === id ? { ...w, ...change } : w)));
  }
}

import { TestBed } from '@angular/core/testing';
import { WindowManager } from './window-manager';

describe('WindowManager', () => {
  let wm: WindowManager;

  beforeEach(() => {
    wm = TestBed.inject(WindowManager);
  });

  it('opens a window once, however many times it is asked', () => {
    wm.open('about');
    wm.open('about');
    expect(wm.windows().map((w) => w.id)).toEqual(['about']);
  });

  it('makes the most recently opened window active', () => {
    wm.open('about');
    wm.open('projects');
    expect(wm.activeId()).toBe('projects');
    wm.focus('about');
    expect(wm.activeId()).toBe('about');
  });

  it('skips minimized windows when picking the active one', () => {
    wm.open('about');
    wm.open('projects');
    wm.minimize('projects');
    expect(wm.activeId()).toBe('about');
  });

  it('toggles a window from the taskbar: restore, then minimize when active', () => {
    wm.open('about');
    wm.minimize('about');
    wm.taskbarClick('about');
    expect(wm.windows()[0].minimized).toBe(false);
    wm.taskbarClick('about');
    expect(wm.windows()[0].minimized).toBe(true);
  });

  it('brings a background window forward from the taskbar instead of minimizing it', () => {
    wm.open('about');
    wm.open('projects');
    wm.taskbarClick('about');
    expect(wm.activeId()).toBe('about');
    expect(wm.windows().find((w) => w.id === 'about')?.minimized).toBe(false);
  });

  it('reopens a minimized window when it is opened again', () => {
    wm.open('terminal');
    wm.minimize('terminal');
    wm.open('terminal');
    expect(wm.windows()[0].minimized).toBe(false);
  });

  it('toggles maximize', () => {
    wm.open('about');
    wm.toggleMaximize('about');
    expect(wm.windows()[0].maximized).toBe(true);
    wm.toggleMaximize('about');
    expect(wm.windows()[0].maximized).toBe(false);
  });

  it('closes one window or all of them', () => {
    wm.open('about');
    wm.open('projects');
    wm.close('about');
    expect(wm.windows().map((w) => w.id)).toEqual(['projects']);
    wm.closeAll();
    expect(wm.windows()).toEqual([]);
    expect(wm.activeId()).toBeNull();
  });
});

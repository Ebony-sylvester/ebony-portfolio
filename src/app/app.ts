import { Component, inject, signal } from '@angular/core';
import { AboutApp } from './apps/about-app';
import { BinApp } from './apps/bin-app';
import { CaseStudyApp } from './apps/case-study-app';
import { NotesApp } from './apps/notes-app';
import { ContactApp } from './apps/contact-app';
import { ExperienceApp } from './apps/experience-app';
import { ProjectsApp } from './apps/projects-app';
import { SystemApp } from './apps/system-app';
import { TerminalApp } from './apps/terminal-app';
import { AppId } from './os/apps';
import { BootScreen } from './os/boot-screen';
import { DesktopIcons } from './os/desktop-icons';
import { FloppyHelper } from './os/floppy-helper';
import { Nameplate } from './os/nameplate';
import { StartMenu } from './os/start-menu';
import { Taskbar } from './os/taskbar';
import { WindowFrame } from './os/window-frame';
import { ViewState } from './os/view-state';
import { WindowManager } from './os/window-manager';
import { ResumeView } from './resume-view/resume-view';

const BOOTED_KEY = 'ebonyos-booted';

@Component({
  selector: 'app-root',
  imports: [
    AboutApp, BinApp, CaseStudyApp, ContactApp, NotesApp, ExperienceApp, ProjectsApp, SystemApp, TerminalApp,
    BootScreen, DesktopIcons, FloppyHelper, Nameplate, StartMenu, Taskbar, WindowFrame, ResumeView,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { '(document:pointerdown)': 'closeStartOnOutsideClick($event)' },
})
export class App {
  protected readonly wm = inject(WindowManager);
  protected readonly view = inject(ViewState);
  // Someone landing straight on /resume came for the facts, not the boot screen.
  protected readonly booted = signal(skipBoot() || this.view.resume());
  protected readonly startOpen = signal(false);
  protected readonly helper = signal(false);
  protected readonly off = signal(false);

  constructor() {
    if (this.booted()) this.arrive();
  }

  protected onBooted(): void {
    try {
      sessionStorage.setItem(BOOTED_KEY, '1');
    } catch {
      // Private mode or blocked storage: the boot screen just plays again next visit.
    }
    this.booted.set(true);
    this.arrive();
  }

  protected launch(id: AppId): void {
    this.startOpen.set(false);
    this.wm.open(id);
  }

  protected shutDown(): void {
    this.startOpen.set(false);
    this.helper.set(false);
    this.wm.closeAll();
    this.off.set(true);
  }

  protected restart(): void {
    this.off.set(false);
    this.booted.set(false);
  }

  protected closeStartOnOutsideClick(e: PointerEvent): void {
    if (!this.startOpen()) return;
    const t = e.target as HTMLElement;
    if (!t.closest('#start-menu, .start')) this.startOpen.set(false);
  }

  /** First thing a visitor sees on the desktop: who this is, then a nudge from Flop. */
  private arrive(): void {
    this.wm.open('about');
    // Flop only pops up where there's room beside the centered About window.
    if (matchMedia('(min-width: 1500px)').matches) setTimeout(() => this.helper.set(true), 1600);
  }
}

function skipBoot(): boolean {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(BOOTED_KEY) === '1';
  } catch {
    return false;
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { PROJECTS } from '../data/resume';
import { IconName, PixelIcon } from '../os/pixel-icon';
import { WindowManager } from '../os/window-manager';

const FILE_ICON: Record<string, IconName> = {
  'cleaner-app': 'floppy',
  'keepers-web': 'computer',
  'phish-free': 'mail',
  'zero-trust': 'doc',
  scraper: 'terminal',
  ebonyos: 'heart',
};

/** A folder of project "files"; selecting one shows its details below. */
@Component({
  selector: 'app-projects',
  imports: [PixelIcon],
  template: `
    <div class="files pane" role="group" aria-label="Projects">
      @for (p of projects; track p.id) {
        <button
          type="button"
          class="file"
          [attr.aria-pressed]="current() === p.id"
          (click)="current.set(p.id)"
        >
          <app-pixel-icon [name]="icons[p.id]" [size]="40" />
          <span>{{ p.file }}</span>
        </button>
      }
    </div>
    @if (project(); as p) {
      <section class="info bevel-in" aria-live="polite">
        <a class="shot" [href]="p.links[0].href" target="_blank" rel="noopener">
          <img [src]="p.shot" width="1000" height="625" loading="lazy" [alt]="'Screenshot of ' + p.name" />
        </a>
        <h3>{{ p.name }}</h3>
        <p class="kind">{{ p.kind }}</p>
        <p class="blurb">{{ p.blurb }}</p>
        <ul class="tags">
          @for (t of p.stack; track t) {
            <li>{{ t }}</li>
          }
        </ul>
        <div class="links">
          @if (p.id === 'cleaner-app') {
            <button type="button" class="btn primary" (click)="wm.open('casestudy')">Read the case study</button>
          }
          @for (l of p.links; track l.href) {
            <a class="btn" [class.primary]="$first && p.id !== 'cleaner-app'" [href]="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
          }
        </div>
      </section>
    }
    <div class="statusbar">
      <span class="bevel-in">{{ projects.length }} object(s)</span>
      <span class="bevel-in">{{ project()?.file }}</span>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 4px;
    }
    .files {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 4px;
      padding: 12px;
      box-shadow: inset 1px 1px 0 var(--mid), inset -1px -1px 0 var(--light);
    }
    .file {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px 4px;
      border: 0;
      background: none;
      cursor: pointer;
    }
    .file span {
      font-family: var(--font-ui);
      font-size: 14px;
      padding: 1px 4px;
      color: var(--ink);
    }
    .file[aria-pressed='true'] span {
      background: var(--title-a);
      color: var(--light);
    }
    .info {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 16px 20px;
      background: var(--chrome-hi);
      animation: swap 200ms steps(3, end);
    }
    @keyframes swap { from { clip-path: inset(0 0 100% 0); } }
    .shot {
      float: right;
      width: min(46%, 300px);
      margin: 0 0 10px 16px;
      padding: 3px;
      background: var(--chrome);
      box-shadow: inset 1px 1px 0 var(--dark), inset -1px -1px 0 var(--light);
    }
    .shot img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 8 / 5;
      object-fit: cover;
      object-position: top;
    }
    @media (max-width: 720px) {
      .shot {
        float: none;
        display: block;
        width: 100%;
        margin: 0 0 12px;
      }
    }
    h3 {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 22px;
      color: var(--title-a);
    }
    .kind {
      color: var(--accent);
      font-size: 15px;
    }
    .blurb {
      margin-top: 8px;
      max-width: 66ch;
      line-height: 1.55;
    }
    .tags {
      list-style: none;
      padding: 0;
      margin: 12px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tags li {
      font-family: var(--font-ui);
      font-size: 13px;
      padding: 2px 8px;
      background: var(--paper);
      border: 1px solid var(--mid);
      color: var(--ink);
    }
  `,
})
export class ProjectsApp {
  protected readonly wm = inject(WindowManager);
  protected readonly projects = PROJECTS;
  protected readonly icons = FILE_ICON;
  protected readonly current = signal(PROJECTS[0].id);
  protected readonly project = computed(() => PROJECTS.find((p) => p.id === this.current()));
}

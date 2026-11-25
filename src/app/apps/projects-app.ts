import { Component, computed, signal } from '@angular/core';
import { PROJECTS } from '../data/resume';
import { IconName, PixelIcon } from '../os/pixel-icon';

const FILE_ICON: Record<string, IconName> = {
  ebonyos: 'heart',
  'photo-qa': 'floppy',
  'phish-free': 'mail',
  'zero-trust': 'doc',
  scraper: 'terminal',
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
        <h3>{{ p.name }}</h3>
        <p class="kind">{{ p.kind }}</p>
        <p class="blurb">{{ p.blurb }}</p>
        <ul class="tags">
          @for (t of p.stack; track t) {
            <li>{{ t }}</li>
          }
        </ul>
        @if (p.link; as l) {
          <a class="btn" [href]="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
        }
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
    .tags li {
      font-family: var(--font-ui);
      font-size: 13px;
      padding: 2px 8px;
      background: var(--accent-soft);
      border: 1px solid var(--accent);
      color: #7a1f4b;
    }
  `,
})
export class ProjectsApp {
  protected readonly projects = PROJECTS;
  protected readonly icons = FILE_ICON;
  protected readonly current = signal(PROJECTS[0].id);
  protected readonly project = computed(() => PROJECTS.find((p) => p.id === this.current()));
}

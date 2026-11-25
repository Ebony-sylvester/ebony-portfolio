import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EDUCATION, PROFILE } from '../data/resume';
import { WindowManager } from '../os/window-manager';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  template: `
    <div class="pane">
      <figure class="photo">
        <div class="frame bevel-in">
          <img [ngSrc]="p.photo" width="720" height="900" priority [alt]="p.name + ' at a library table with a laptop'" />
        </div>
        <figcaption>{{ p.photo }}</figcaption>
      </figure>
      <div class="head">
        <h1>{{ p.name }}</h1>
        <p class="role">{{ p.role }}</p>
        <ul class="focus" aria-label="Focus areas">
          @for (f of p.focus; track f) {
            <li>{{ f }}</li>
          }
        </ul>
      </div>
      <p class="pitch">{{ p.pitch }}</p>
      <dl>
        <dt>Looking for</dt>
        <dd>My next software engineering role, frontend or mobile</dd>
        <dt>Most recently</dt>
        <dd>Keepers: led the cleaner mobile app and built the web dashboard</dd>
        <dt>Studied</dt>
        <dd>{{ edu.degree }}, {{ edu.school }} ({{ edu.date }})</dd>
        <dt>Based in</dt>
        <dd>{{ p.location }}</dd>
        <dt>Learning</dt>
        <dd>Angular, by building this desktop</dd>
      </dl>
    </div>
    <div class="actions">
      <button type="button" class="btn primary" (click)="wm.open('experience')">See experience</button>
      <button type="button" class="btn" (click)="wm.open('projects')">Browse projects</button>
      @if (p.resumePdf; as href) {
        <a class="btn" [href]="href" target="_blank" rel="noopener">Open resume</a>
      } @else {
        <button type="button" class="btn" (click)="wm.open('contact')">Say hello</button>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .pane {
      background: var(--paper);
    }
    .pane {
      display: grid;
      grid-template-columns: 190px minmax(0, 1fr);
      grid-template-rows: auto auto 1fr;
      column-gap: 22px;
      align-content: start;
    }
    .photo {
      grid-row: 1 / span 3;
      margin: 0;
    }
    .frame {
      padding: 4px;
      background: var(--chrome);
      animation: develop 900ms steps(6, end) both;
    }
    /* The photo "develops" in a few chunky steps, like a slow 90s download. */
    @keyframes develop {
      from { clip-path: inset(0 0 100% 0); }
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    figcaption {
      margin-top: 6px;
      font-family: var(--font-term);
      font-size: 17px;
      color: var(--ink-soft);
      text-align: center;
    }
    .head {
      align-self: end;
    }
    h1 {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: clamp(30px, 6vw, 40px);
      line-height: 1;
      color: var(--title-a);
    }
    .role {
      margin-top: 6px;
      font-family: var(--font-ui);
      font-size: 18px;
      color: var(--accent);
    }
    .focus {
      list-style: none;
      padding: 0;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .focus li {
      font-family: var(--font-ui);
      font-size: 13px;
      padding: 2px 8px;
      background: var(--accent-soft);
      border: 1px solid var(--accent);
      color: #7a1f4b;
    }
    .pitch {
      margin-top: 18px;
      font-size: 17px;
      max-width: 60ch;
    }
    @media (max-width: 720px) {
      .pane {
        grid-template-columns: 1fr;
      }
      .photo {
        grid-row: auto;
        width: min(220px, 70%);
        margin: 0 auto 16px;
      }
    }
    dl {
      margin: 18px 0 0;
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 6px 16px;
      font-size: 15px;
    }
    dt {
      font-family: var(--font-ui);
      color: var(--ink-soft);
    }
    dd {
      margin: 0;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 4px 4px;
    }
  `,
})
export class AboutApp {
  protected readonly wm = inject(WindowManager);
  protected readonly p = PROFILE;
  protected readonly edu = EDUCATION;
}

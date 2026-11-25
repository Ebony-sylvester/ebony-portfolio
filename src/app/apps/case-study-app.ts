import { Component } from '@angular/core';
import { CASE_STUDY } from '../data/case-study';
import { LINKS } from '../data/resume';

/** One deep story instead of six short ones: the cleaner app and its AI photo QA. */
@Component({
  selector: 'app-case-study',
  template: `
    <article class="pane" tabindex="0" aria-label="Cleaner app case study">
      <h3>{{ cs.title }}</h3>
      <p class="sub">{{ cs.subtitle }}</p>
      <p class="intro">{{ cs.intro }}</p>

      <h4>The problem</h4>
      @for (para of cs.problem; track para) {
        <p class="para">{{ para }}</p>
      }

      <h4>What I built</h4>
      <ul>
        @for (b of cs.built; track b) {
          <li>{{ b }}</li>
        }
      </ul>

      <h4>The result</h4>
      <figure class="qa">
        <figcaption>Clean rooms that pass the AI review</figcaption>
        <div class="meter">
          <span>Before</span>
          <div class="track bevel-in"><i [style.width.%]="cs.result.before"></i></div>
          <strong>{{ cs.result.before }}%</strong>
        </div>
        <div class="meter">
          <span>After</span>
          <div class="track bevel-in"><i class="after" [style.width.%]="cs.result.after"></i></div>
          <strong>{{ cs.result.after }}%</strong>
        </div>
        <p class="note">…while still blocking {{ cs.result.badBlocked }}% of bad photos.</p>
      </figure>

      <h4>Also shipped</h4>
      <p class="para">{{ cs.alsoShipped }}</p>

      <div class="screens" role="list" aria-label="App screenshots">
        @for (s of cs.screens; track s.src) {
          <figure role="listitem">
            <img [src]="s.src" width="414" height="900" loading="lazy" [alt]="s.caption" />
            <figcaption>{{ s.caption }}</figcaption>
          </figure>
        }
      </div>

      <p class="links">
        <a class="btn primary" [href]="links.appStore.href" target="_blank" rel="noopener">View on the App Store</a>
        <a class="btn" [href]="links.keepers.href" target="_blank" rel="noopener">Visit usekeepers.com</a>
      </p>
    </article>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    h3 {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 26px;
      color: var(--title-a);
      line-height: 1.1;
    }
    .sub {
      color: var(--accent);
      font-size: 15px;
    }
    .intro {
      margin-top: 12px;
      font-size: 17px;
      max-width: 64ch;
    }
    h4 {
      margin: 20px 0 6px;
      font-family: var(--font-ui);
      font-weight: 500;
      font-size: 18px;
      color: var(--title-a);
      border-bottom: 1px solid var(--mid);
    }
    .para + .para {
      margin-top: 8px;
    }
    .para,
    ul {
      max-width: 66ch;
    }
    ul {
      margin: 0;
      padding-left: 20px;
    }
    li + li {
      margin-top: 4px;
    }
    .qa {
      margin: 4px 0 0;
      padding: 12px 14px;
      background: var(--note);
      border: 1px solid var(--dark);
      max-width: 520px;
    }
    figcaption {
      font-size: 14px;
    }
    .qa > figcaption {
      font-family: var(--font-ui);
      font-size: 16px;
      margin-bottom: 6px;
    }
    .meter {
      display: grid;
      grid-template-columns: 56px 1fr 44px;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 14px;
    }
    .meter strong {
      text-align: right;
    }
    .track {
      height: 20px;
      padding: 3px;
      background: var(--paper);
    }
    .track i {
      display: block;
      height: 100%;
      background: repeating-linear-gradient(90deg, var(--mid) 0 10px, transparent 10px 12px);
      animation: fill 900ms steps(12, end) both;
    }
    .track i.after {
      background: repeating-linear-gradient(90deg, var(--accent) 0 10px, transparent 10px 12px);
      animation-delay: 250ms;
    }
    @keyframes fill {
      from { width: 0; }
    }
    .note {
      margin-top: 8px;
      font-size: 14px;
    }
    .screens {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 14px;
    }
    .screens figure {
      margin: 0;
    }
    .screens img {
      display: block;
      width: 100%;
      height: auto;
      border: 3px solid var(--dark);
      border-radius: 14px;
    }
    .screens figcaption {
      margin-top: 6px;
      font-size: 13px;
      color: var(--ink-soft);
    }
    .links {
      margin-top: 18px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `,
})
export class CaseStudyApp {
  protected readonly cs = CASE_STUDY;
  protected readonly links = LINKS;
}

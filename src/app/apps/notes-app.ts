import { Component, computed, signal } from '@angular/core';
import { NOTES } from '../data/notes';
import { PixelIcon } from '../os/pixel-icon';

interface Block {
  kind: 'h' | 'p';
  text: string;
}

/** A tiny blog: a list of posts on the left, the open post on the right. */
@Component({
  selector: 'app-notes',
  imports: [PixelIcon],
  template: `
    <div class="split">
      <nav class="list bevel-in" aria-label="Posts">
        @for (n of notes; track n.id) {
          <button type="button" [attr.aria-current]="current() === n.id ? 'true' : null" (click)="current.set(n.id)">
            <app-pixel-icon name="notes" [size]="18" />
            <span>
              <strong>{{ n.title }}</strong>
              <small>{{ n.date }}</small>
            </span>
          </button>
        }
      </nav>
      @if (note(); as n) {
        <article class="pane" tabindex="0" [attr.aria-label]="n.title">
          <h3>{{ n.title }}</h3>
          <p class="meta">{{ n.date }}</p>
          @for (b of blocks(); track $index) {
            @if (b.kind === 'h') {
              <h4>{{ b.text }}</h4>
            } @else {
              <p>{{ b.text }}</p>
            }
          }
        </article>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .split {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 210px minmax(0, 1fr);
      gap: 4px;
    }
    .list {
      background: var(--paper);
      padding: 6px;
      overflow: auto;
    }
    .list button {
      width: 100%;
      display: flex;
      gap: 8px;
      align-items: flex-start;
      text-align: left;
      border: 0;
      background: none;
      padding: 6px;
      cursor: pointer;
      color: var(--ink);
      font: inherit;
    }
    .list button[aria-current='true'] {
      background: var(--title-a);
      color: var(--light);
    }
    .list strong {
      display: block;
      font-size: 14px;
      line-height: 1.3;
    }
    .list small {
      font-size: 12px;
      opacity: 0.85;
    }
    h3 {
      font-family: var(--font-ui);
      font-weight: 600;
      font-size: 24px;
      line-height: 1.15;
      color: var(--title-a);
    }
    .meta {
      color: var(--ink-soft);
      font-size: 14px;
      margin-bottom: 8px;
    }
    h4 {
      margin: 16px 0 4px;
      font-family: var(--font-ui);
      font-weight: 500;
      font-size: 17px;
      color: var(--title-a);
    }
    article p {
      max-width: 66ch;
    }
    article p + p {
      margin-top: 10px;
    }
    @media (max-width: 720px) {
      .split {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }
    }
  `,
})
export class NotesApp {
  protected readonly notes = NOTES;
  protected readonly current = signal(NOTES[0].id);
  protected readonly note = computed(() => NOTES.find((n) => n.id === this.current()));
  protected readonly blocks = computed<Block[]>(() =>
    (this.note()?.body ?? []).map((line) =>
      line.startsWith('## ') ? { kind: 'h', text: line.slice(3) } : { kind: 'p', text: line.replaceAll('`', '') },
    ),
  );
}

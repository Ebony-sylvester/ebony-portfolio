import { Component, signal } from '@angular/core';
import { PixelIcon } from '../os/pixel-icon';

const JUNK = [
  { name: 'bugs.log', note: '0 bytes. All fixed.' },
  { name: 'console_log_everywhere.js', note: 'Replaced by real error states' },
  { name: 'rows_length_equals_limit.ts', note: 'Pagination now uses hasMore' },
  { name: 'final_FINAL_v3.fig', note: 'Shipped as v4' },
];

@Component({
  selector: 'app-bin',
  imports: [PixelIcon],
  template: `
    <ul class="pane" tabindex="0" aria-label="Deleted files">
      @for (item of items(); track item.name) {
        <li animate.leave="gone">
          <app-pixel-icon name="doc" [size]="20" />
          <span class="name">{{ item.name }}</span>
          <span class="note">{{ item.note }}</span>
        </li>
      } @empty {
        <li class="empty">The bin is empty. Very tidy.</li>
      }
    </ul>
    <div class="actions">
      <button type="button" class="btn" (click)="items.set([])">Empty recycle bin</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 8px;
    }
    li {
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      column-gap: 10px;
      padding: 6px 4px;
      font-size: 15px;
    }
    .name {
      font-family: var(--font-ui);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .note {
      grid-column: 2;
      font-size: 13px;
      color: var(--ink-soft);
    }
    .empty {
      display: block;
      color: var(--ink-soft);
    }
    .gone {
      animation: crumple 260ms ease-in forwards;
    }
    @keyframes crumple {
      to { transform: translateX(40px) rotate(8deg) scale(0.6); opacity: 0; }
    }
    .actions {
      padding: 8px 4px 4px;
    }
  `,
})
export class BinApp {
  protected readonly items = signal(JUNK);
}

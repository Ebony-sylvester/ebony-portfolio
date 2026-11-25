import { Component, signal } from '@angular/core';
import { EDUCATION, PROFILE, SKILLS } from '../data/resume';
import { PixelIcon } from '../os/pixel-icon';

/** Skills, presented as System Properties: specs on one tab, a Device Manager on the other. */
@Component({
  selector: 'app-system',
  imports: [PixelIcon],
  template: `
    <div class="tabs" role="tablist">
      <button type="button" role="tab" id="tab-gen" aria-controls="panel" [attr.aria-selected]="tab() === 'general'" (click)="tab.set('general')">General</button>
      <button type="button" role="tab" id="tab-dev" aria-controls="panel" [attr.aria-selected]="tab() === 'devices'" (click)="tab.set('devices')">Device manager</button>
    </div>
    <div class="panel bevel-out" id="panel" role="tabpanel" [attr.aria-labelledby]="tab() === 'general' ? 'tab-gen' : 'tab-dev'">
      @if (tab() === 'general') {
        <div class="general">
          <app-pixel-icon name="computer" [size]="96" />
          <dl>
            <dt>System</dt>
            <dd>EbonyOS 26, software engineer edition</dd>
            <dt>Registered to</dt>
            <dd>{{ p.name }}<br />{{ edu.school }}, {{ edu.date }}</dd>
            <dt>Computer</dt>
            <dd>{{ p.role }}<br />TypeScript processor<br />React and React Native, dual core</dd>
          </dl>
        </div>
      } @else {
        <p class="hint">Devices installed on this engineer. Expand a category to see drivers.</p>
        <div class="tree bevel-in">
          @for (g of skills; track g.device; let first = $first) {
            <details [open]="first">
              <summary><app-pixel-icon name="computer" [size]="16" /> {{ g.device }}</summary>
              <ul>
                @for (item of g.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </details>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 8px 8px 6px;
    }
    .tabs {
      display: flex;
      gap: 2px;
      padding-left: 4px;
    }
    [role='tab'] {
      font-family: var(--font-ui);
      font-size: 15px;
      padding: 5px 14px;
      border: 0;
      cursor: pointer;
      background: var(--chrome);
      box-shadow: inset 1px 1px 0 var(--light), inset -1px 0 0 var(--dark), inset -2px 0 0 var(--mid);
      position: relative;
      top: 2px;
      color: var(--ink);
    }
    [role='tab'][aria-selected='true'] {
      top: 0;
      padding-bottom: 8px;
      z-index: 1;
    }
    .panel {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 18px;
    }
    .general {
      display: flex;
      gap: 22px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    dl {
      margin: 0;
      flex: 1;
      min-width: 200px;
      font-size: 15px;
      line-height: 1.5;
    }
    dt {
      font-family: var(--font-ui);
      color: var(--ink-soft);
      margin-top: 10px;
    }
    dt:first-child {
      margin-top: 0;
    }
    dd {
      margin: 0 0 0 14px;
    }
    .hint {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .tree {
      background: var(--paper);
      padding: 8px;
      font-size: 15px;
    }
    summary {
      cursor: pointer;
      font-family: var(--font-ui);
      padding: 3px 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      list-style: none;
    }
    summary::before {
      content: '+';
      width: 11px;
      height: 11px;
      border: 1px solid var(--mid);
      font-size: 11px;
      line-height: 9px;
      text-align: center;
    }
    details[open] > summary::before {
      content: '−';
    }
    ul {
      list-style: none;
      margin: 0 0 4px 8px;
      padding-left: 20px;
      border-left: 1px dotted var(--mid);
    }
    li {
      padding: 1px 0;
    }
  `,
})
export class SystemApp {
  protected readonly tab = signal<'general' | 'devices'>('general');
  protected readonly p = PROFILE;
  protected readonly edu = EDUCATION;
  protected readonly skills = SKILLS;
}

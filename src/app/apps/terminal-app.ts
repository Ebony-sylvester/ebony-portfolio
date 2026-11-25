import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { WindowManager } from '../os/window-manager';
import { runCommand } from './terminal-commands';

interface Entry {
  input?: string;
  lines: string[];
}

const PROMPT = 'C:\\EBONY>';

@Component({
  selector: 'app-terminal',
  template: `
    <div class="screen" #screen (click)="focusInput()">
      <p>EBONY-DOS 26.05. Type "help" and press Enter.</p>
      @for (e of history(); track $index) {
        @if (e.input !== undefined) {
          <p>{{ prompt }}{{ e.input }}</p>
        }
        @for (line of e.lines; track $index) {
          <p>{{ line }}</p>
        }
      }
      <form class="line" (submit)="submit($event)">
        <label for="term-in">{{ prompt }}</label>
        <input
          #field
          id="term-in"
          autofocus
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          (keydown.arrowup)="recall(-1, $event)"
          (keydown.arrowdown)="recall(1, $event)"
        />
      </form>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
    }
    .screen {
      flex: 1;
      overflow: auto;
      background: var(--term-bg);
      color: var(--term-fg);
      font-family: var(--font-term);
      font-size: 21px;
      line-height: 1.15;
      padding: 10px 12px;
      white-space: pre-wrap;
      word-break: break-word;
      box-shadow: inset 2px 2px 0 var(--dark), inset -1px -1px 0 var(--light);
      cursor: text;
    }
    .line {
      display: flex;
    }
    input {
      flex: 1;
      min-width: 0;
      background: none;
      border: 0;
      color: inherit;
      font: inherit;
      padding: 0;
      caret-color: var(--accent-soft);
      outline: none;
    }
  `,
})
export class TerminalApp {
  private readonly wm = inject(WindowManager);
  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly prompt = PROMPT;
  protected readonly history = signal<Entry[]>([]);
  private readonly typed: string[] = [];
  private cursor = 0;

  protected submit(e: Event): void {
    e.preventDefault();
    // Read and clear the element directly: a [value] binding wouldn't see '' -> '' as a change.
    const el = this.field().nativeElement;
    const input = el.value;
    el.value = '';
    if (input.trim()) this.typed.push(input);
    this.cursor = this.typed.length;

    const result = runCommand(input);
    if (result.kind === 'clear') {
      this.history.set([]);
      return;
    }
    this.history.update((h) => [...h, { input, lines: result.lines }]);
    if (result.kind === 'open') setTimeout(() => this.wm.open(result.app), 350);
    requestAnimationFrame(() => {
      const el = this.screen().nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }

  protected recall(step: number, e: Event): void {
    if (!this.typed.length) return;
    e.preventDefault();
    this.cursor = Math.min(this.typed.length, Math.max(0, this.cursor + step));
    this.field().nativeElement.value = this.typed[this.cursor] ?? '';
  }

  protected focusInput(): void {
    if (!getSelection()?.toString()) this.field().nativeElement.focus();
  }
}

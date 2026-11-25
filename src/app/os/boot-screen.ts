import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { PixelIcon } from './pixel-icon';

// The power-on self test, except it tests my resume.
const POST_LINES = [
  'EbonyBIOS v26.05   (C) 2026 Ebony Sylvester',
  '',
  'CPU: TypeScript @ 227 merged PRs / 6 mo .......... OK',
  'Memory test: 1,200+ commits ...................... OK',
  'Mobile devices: iOS, Android ...... 1,600+ cleaners',
  'Loading photo_qa.vlm ......... pass rate 52% > 92%',
  'Mounting C:\\Projects .......................... 5 found',
  'Checking coffee level ...................... adequate',
  '',
  'Starting EbonyOS...',
];

const LINE_MS = 260;
const SPLASH_MS = 1700;

@Component({
  selector: 'app-boot-screen',
  imports: [PixelIcon],
  template: `
    @if (phase() === 'post') {
      <pre class="post" aria-hidden="true">@for (line of shown(); track $index) {{{ line }}
}<span class="cursor">_</span></pre>
    } @else {
      <div class="splash">
        <app-pixel-icon name="floppy" [size]="96" />
        <p class="logo">Ebony<b>OS</b></p>
        <p class="edition">Software engineer edition</p>
        <div class="bar bevel-in" aria-hidden="true"><i></i></div>
      </div>
    }
    <p class="skip">Press any key or tap to skip</p>
    <p class="sr-only" aria-live="polite">Loading Ebony Sylvester's portfolio</p>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: #000;
      color: #d8d6de;
      font-family: var(--font-term);
      font-size: clamp(16px, 2.6vw, 24px);
      cursor: pointer;
    }
    .post {
      margin: 0;
      padding: 24px clamp(16px, 4vw, 40px);
      font: inherit;
      white-space: pre-wrap;
      line-height: 1.25;
    }
    .cursor {
      animation: blink 0.8s steps(1) infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }
    .splash {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--desk);
      animation: fade 300ms ease;
    }
    @keyframes fade { from { opacity: 0; } }
    .logo {
      font-family: var(--font-ui);
      font-size: clamp(44px, 9vw, 72px);
      color: var(--light);
      text-shadow: 3px 3px 0 var(--dark);
      line-height: 1;
    }
    .logo b {
      color: var(--accent-soft);
      font-weight: 600;
    }
    .edition {
      font-family: var(--font-ui);
      color: var(--light);
      font-size: 18px;
    }
    .bar {
      margin-top: 18px;
      width: min(280px, 70vw);
      height: 22px;
      padding: 4px;
      background: var(--chrome);
    }
    .bar i {
      display: block;
      height: 100%;
      background: repeating-linear-gradient(90deg, var(--title-a) 0 12px, transparent 12px 15px);
      animation: load 1500ms steps(14, end) forwards;
    }
    @keyframes load { from { width: 0; } to { width: 100%; } }
    .skip {
      position: absolute;
      bottom: 16px;
      right: 20px;
      font-size: 18px;
      color: #8c8896;
    }
  `,
  host: {
    '(click)': 'finish()',
    '(document:keydown)': 'finish()',
  },
})
export class BootScreen {
  readonly done = output<void>();

  protected readonly phase = signal<'post' | 'splash'>('post');
  protected readonly shown = signal<string[]>([]);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];
  private finished = false;

  constructor() {
    POST_LINES.forEach((line, i) =>
      this.timers.push(setTimeout(() => this.shown.update((s) => [...s, line]), i * LINE_MS)),
    );
    const postEnd = POST_LINES.length * LINE_MS + 300;
    this.timers.push(setTimeout(() => this.phase.set('splash'), postEnd));
    this.timers.push(setTimeout(() => this.finish(), postEnd + SPLASH_MS));
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected finish(): void {
    if (this.finished) return;
    this.finished = true;
    this.done.emit();
  }
}

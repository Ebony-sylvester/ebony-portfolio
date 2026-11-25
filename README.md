# EbonyOS

My portfolio, built as a retro 90s desktop: draggable windows, a Start menu, a working terminal and
Flop, a pink floppy-disk helper. I built it to learn Angular coming from React.

Built with Angular 22: signals, `@for` / `@if` control flow, native `animate.enter` / `animate.leave`
animations and standalone components. No UI library; the pixel icons are hand-drawn as strings in
`src/app/os/pixel-icon.ts`.

## Run it

```bash
npm install
npm start          # http://localhost:4300
npm run build      # production build in dist/ebony-portfolio/browser
```

## Where things live

| Path | What |
|---|---|
| `src/app/data/resume.ts` | All the words: profile, roles, projects, skills |
| `src/app/os/` | The desktop: window manager, windows, taskbar, Start menu, boot screen, Flop |
| `src/app/apps/` | What opens in each window: About, Experience, Projects, System, Terminal, Contact, Recycle bin |
| `public/` | Photo (resume links show once `resumePdf` is set in `resume.ts`) |

Try the terminal: `help`, `whoami`, `projects`, `open contact`, `hire`.

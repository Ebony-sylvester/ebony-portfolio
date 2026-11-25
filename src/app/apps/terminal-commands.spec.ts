import { PROFILE, PROJECTS } from '../data/resume';
import { runCommand } from './terminal-commands';

describe('runCommand', () => {
  it('lists commands for help, ignoring case and spacing', () => {
    const result = runCommand('  HELP ');
    expect(result.kind).toBe('print');
    expect(result.kind === 'print' && result.lines[0]).toBe('Commands:');
  });

  it('prints nothing for an empty line', () => {
    expect(runCommand('')).toEqual({ kind: 'print', lines: [] });
  });

  it('introduces Ebony with her focus areas on whoami', () => {
    const result = runCommand('whoami');
    const text = result.kind === 'print' ? result.lines.join('\n') : '';
    expect(text).toContain(PROFILE.name);
    expect(text).toContain(PROFILE.focus[0]);
  });

  it('lists every project file', () => {
    const result = runCommand('projects');
    const text = result.kind === 'print' ? result.lines.join('\n') : '';
    for (const p of PROJECTS) expect(text).toContain(p.file);
  });

  it('opens a known app', () => {
    expect(runCommand('open experience')).toMatchObject({ kind: 'open', app: 'experience' });
  });

  it('explains an unknown app instead of opening it', () => {
    const result = runCommand('open minesweeper');
    expect(result.kind).toBe('print');
    expect(result.kind === 'print' && result.lines[0]).toContain("Can't find");
  });

  it('sends hire to the contact window', () => {
    expect(runCommand('hire')).toMatchObject({ kind: 'open', app: 'contact' });
  });

  it('clears the screen', () => {
    expect(runCommand('cls')).toEqual({ kind: 'clear' });
  });

  it('names an unrecognized command', () => {
    const result = runCommand('rm -rf /');
    expect(result.kind === 'print' && result.lines[0]).toContain("'rm' is not a recognized command");
  });
});

import { EDUCATION, PROFILE, PROJECTS, ROLES, SKILLS } from '../data/resume';
import { APPS, AppId } from '../os/apps';

export type CommandResult =
  | { kind: 'print'; lines: string[] }
  | { kind: 'open'; app: AppId; lines: string[] }
  | { kind: 'clear' };

const HELP = [
  'Commands:',
  '  whoami        who built this',
  '  experience    where I work and what I shipped',
  '  projects      things I made',
  '  skills        installed drivers',
  '  contact       how to reach me',
  '  open <app>    open a window (about, experience, projects, system, contact, bin)',
  '  clear         clear the screen',
];

/** Pure command interpreter, kept apart from the component so it's easy to test. */
export function runCommand(raw: string): CommandResult {
  const [cmd = '', ...args] = raw.trim().toLowerCase().split(/\s+/);
  const print = (lines: string[]): CommandResult => ({ kind: 'print', lines });

  switch (cmd) {
    case '':
      return print([]);
    case 'help':
    case '?':
      return print(HELP);
    case 'whoami':
      return print([`${PROFILE.name}, ${PROFILE.role.toLowerCase()} at Keepers.`, PROFILE.pitch]);
    case 'experience':
      return print(ROLES.flatMap((r) => [`> ${r.title} (${r.dates})`, ...r.stats.map((s) => `    ${s.value} ${s.label.toLowerCase()}`)]));
    case 'projects':
    case 'dir':
    case 'ls':
      return print(PROJECTS.map((p) => `  ${p.file.padEnd(18)} ${p.name}`));
    case 'skills':
      return print(SKILLS.map((g) => `  ${g.device}: ${g.items.slice(0, 5).join(', ')}${g.items.length > 5 ? '…' : ''}`));
    case 'education':
      return print([`${EDUCATION.degree}`, `${EDUCATION.school}, ${EDUCATION.date}`]);
    case 'contact':
      return print([`  email     ${PROFILE.email}`, `  linkedin  ${PROFILE.linkedin}`, `  github    ${PROFILE.github}`]);
    case 'open':
    case 'start': {
      const target = args[0] as AppId | undefined;
      if (target && target in APPS) return { kind: 'open', app: target, lines: [`Opening ${APPS[target].title}...`] };
      return print([`Can't find "${args[0] ?? ''}". Try: ${Object.keys(APPS).join(', ')}`]);
    }
    case 'clear':
    case 'cls':
      return { kind: 'clear' };
    case 'hire':
    case 'sudo':
      return { kind: 'open', app: 'contact', lines: ['Permission granted. Opening contact info...'] };
    case 'coffee':
      return print(['  ( (', '   ) )', ' ........', ' |      |]', ' \\      /', "  `----'   brewing..."]);
    default:
      return print([`'${cmd}' is not a recognized command. Type "help" for the list.`]);
  }
}

// Everything a visitor reads lives here, so updating the portfolio after a new
// job or project is a data edit, not a template edit.

export const PROFILE = {
  name: 'Ebony Sylvester',
  role: 'Junior Software Engineer',
  /** The headline from my LinkedIn, shown as tags under my title. */
  focus: ['React and React Native', 'AI-powered SaaS', 'IT support and cybersecurity'],
  pitch:
    'I build the screens people use all day. At Keepers I led a React Native app for 1,600+ cleaners and built the React web app their managers run. I like calm interfaces, honest error messages and well-tested code.',
  location: 'Lafayette, Louisiana',
  lookingFor: 'Frontend roles building web or mobile applications, and IT support roles',
  automation:
    'I use large language models, including Claude Code, to automate routine development and operations work so teams ship faster with fewer manual steps.',
  company: { name: 'Keepers', url: 'https://usekeepers.com/' },
  email: 'ebony.sylvester04@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/ebony-sylvester',
  github: 'https://github.com/Ebony-sylvester',
  /**
   * Printed from the /resume page (no phone number). Regenerate with
   * `npm run resume:pdf` while `npm start` is running. Set to null to hide the download.
   */
  resumePdf: 'Ebony_Sylvester_Resume.pdf' as string | null,
  photo: 'ebony-sylvester.jpg',
} as const;

export interface Highlight {
  text: string;
}

export interface Role {
  id: string;
  title: string;
  org: string;
  orgUrl: string;
  dates: string;
  stack: string;
  summary: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  links: { label: string; href: string }[];
}

export const ROLES: Role[] = [
  {
    id: 'cleaner-app',
    title: 'Lead engineer, Cleaner mobile app',
    org: 'Keepers',
    orgUrl: 'https://usekeepers.com/',
    dates: '2026',
    stack: 'React Native, iOS and Android',
    links: [
      { label: 'View on the App Store', href: 'https://apps.apple.com/us/app/keepers-jobs-for-cleaners/id6737248043' },
      { label: 'Visit usekeepers.com', href: 'https://usekeepers.com/' },
    ],
    summary:
      'Keepers is an AI-powered operations platform for short-term rentals. I led the app cleaners use on the job and owned its release cycle on both stores.',
    stats: [
      { label: 'Active cleaners', value: '1,600+' },
      { label: 'Cleaning companies', value: '65' },
      { label: 'App Store rating', value: '4.2' },
    ],
    highlights: [
      'Led the full redesign of layouts, navigation and job and task workflows: 32 merged PRs across 25+ tickets.',
      'Built the app side of vision-language-model photo QA: room-aware checks, plain-language failure reasons and a wrong-room retake flow in English, Spanish and Portuguese, backed by 55 unit tests.',
      'Rebuilt the camera with reference-photo orientation and an adjustable on-screen guide, so captures line up with the reference for AI comparison.',
      'Built "Fits my day", an Available Jobs view that only shows work fitting a cleaner’s schedule, with overlap warnings and crew availability.',
      'Added crew assignment and schedules, earnings statements, payout status and an in-app notification center.',
    ],
  },
  {
    id: 'saas-web',
    title: 'Frontend engineer, Keepers web app',
    org: 'Keepers',
    orgUrl: 'https://usekeepers.com/',
    dates: '2026',
    stack: 'React, TypeScript, TanStack Query',
    links: [{ label: 'Visit usekeepers.com', href: 'https://usekeepers.com/' }],
    summary:
      'The multi-tenant dashboard property managers, cleaning companies and staff use to run properties, jobs, reservations and billing. I was one of two frontend engineers on a team of four.',
    stats: [
      { label: 'Merged PRs, first 6 months', value: '227' },
      { label: 'Commits', value: '1,200+' },
      { label: 'Areas moved to TanStack Query', value: '25+' },
    ],
    highlights: [
      'Led the migration of 25+ feature areas to TanStack Query and Axios, with shared caching, mutations and error states.',
      'Redesigned the dashboard, Jobs and Tasks, guest reviews, My Team and Integrations, and merged calendar and reservations into one view.',
      'Rebuilt property details across 12 areas with role-based editing and an audit trail.',
      'Built the Payment Center and Stripe-backed payment methods.',
      'Used large language models (Claude Code) to automate routine engineering work, speeding up multi-file refactors, migrations and test coverage.',
      'Implemented RBAC gating, a "View as user" permission preview, CSV export with injection protection and shared Button, modal and status-color components.',
    ],
  },
];

/** The one before/after number worth drawing: the VLM photo reviewer. */
export const QA_RESULT = { before: 52, after: 92, badBlocked: 98 } as const;

export const EDUCATION = {
  school: 'University of Louisiana at Lafayette',
  degree: 'B.S. in Informatics, concentration in Cybersecurity',
  date: 'May 2026',
} as const;

export interface Link {
  label: string;
  href: string;
}

// Links from my resume, so visitors can open the real thing.
export const LINKS = {
  keepers: { label: 'Visit usekeepers.com', href: 'https://usekeepers.com/' },
  appStore: { label: 'View on the App Store', href: 'https://apps.apple.com/us/app/keepers-jobs-for-cleaners/id6737248043' },
  portfolioRepo: { label: 'View the code', href: 'https://github.com/Ebony-sylvester/ebony-portfolio' },
  phishFree: { label: 'View on GitHub', href: 'https://github.com/CalebB-hub/INFX_CMPS_490' },
  zeroTrust: { label: 'Read the report', href: 'https://docs.google.com/document/d/1_OYruB8gZLEXGNGQFSEu477F2GeQMWYUz0jGsqjh9Po/edit?tab=t.0' },
  scraper: { label: 'Open the notebook', href: 'https://colab.research.google.com/drive/1Isk9eRYXo-GPoa9soMMvhQI87zeaKwMa?usp=sharing' },
} satisfies Record<string, Link>;

export interface Project {
  id: string;
  name: string;
  file: string;
  kind: string;
  stack: string[];
  blurb: string;
  links: Link[];
  /** Screenshot in public/projects/, captured from the project's public page. */
  shot: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'cleaner-app',
    shot: 'projects/cleaner-app.jpg',
    name: 'Keepers cleaner app',
    file: 'cleaner_app.ipa',
    kind: 'Keepers, iOS and Android',
    stack: ['React Native', 'Expo / EAS', 'VLM photo QA', 'Vision Camera', 'i18n'],
    blurb:
      'The app 1,600+ cleaners use on the job. I led its redesign and owned releases on both stores. I also built the app side of AI photo QA: a vision-language model checks each room photo against a reference, with a capture guide and plain-language retake flows in three languages. The clean-room pass rate went from 52% to 92%.',
    links: [LINKS.appStore, LINKS.keepers],
  },
  {
    id: 'keepers-web',
    shot: 'projects/keepers-web.jpg',
    name: 'Keepers web app',
    file: 'keepers_web.exe',
    kind: 'Keepers, web',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Stripe'],
    blurb:
      'The multi-tenant dashboard property managers run their business from. 227 merged PRs in six months: the dashboard, jobs and tasks, a combined calendar and reservations view, the Payment Center and role-based access.',
    links: [LINKS.keepers],
  },
  {
    id: 'phish-free',
    shot: 'projects/phish-free.jpg',
    name: 'Phish Free',
    file: 'phish_free.web',
    kind: 'Team project',
    stack: ['React', 'Vite', 'Django REST'],
    blurb:
      'A phishing-awareness training platform. I built the frontend auth and onboarding: role-based signup for individuals and organizations, protected routes, password strength and reset flows, and an admin dashboard prototype.',
    links: [LINKS.phishFree],
  },
  {
    id: 'zero-trust',
    shot: 'projects/zero-trust.jpg',
    name: 'Zero Trust redesign',
    file: 'zero_trust.doc',
    kind: 'Report, team of 4',
    stack: ['Network design', 'RBAC', 'GDPR/ABA'],
    blurb:
      'A network modernization plan for a 500-staff law firm: segmented VLANs replacing a flat LAN, an RBAC access model for compliance, and a phased $770K budget.',
    links: [LINKS.zeroTrust],
  },
  {
    id: 'scraper',
    shot: 'projects/scraper.jpg',
    name: 'Vulnerability data scraper',
    file: 'vuln_scraper.py',
    kind: 'Security, Python notebook',
    stack: ['Python', 'BeautifulSoup', 'Requests', 'Pandas', 'Matplotlib'],
    blurb:
      'A Python tool that scrapes web pages for vulnerability data, filters by keyword or CVE identifier, scores each result for relevance and charts the trends.',
    links: [LINKS.scraper],
  },
  {
    id: 'ebonyos',
    shot: 'projects/ebonyos.jpg',
    name: 'EbonyOS',
    file: 'ebonyos.exe',
    kind: 'This website',
    stack: ['Angular 22', 'Signals', 'TypeScript', 'Netlify'],
    blurb:
      'The site you’re using. I built it to learn Angular coming from React: signals, the new control flow, native enter and leave animations, and a hand-rolled window manager.',
    links: [LINKS.portfolioRepo],
  },
];

export interface SkillGroup {
  device: string;
  items: string[];
}

/** Rendered as a Device Manager tree in System Properties. */
export const SKILLS: SkillGroup[] = [
  { device: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'HTML and CSS'] },
  {
    device: 'Frontend and mobile',
    items: ['React', 'React Native', 'Expo / EAS', 'TanStack Query', 'React Hook Form + Zod', 'Tailwind CSS', 'Radix UI', 'Reanimated', 'Vision Camera', 'Design systems', 'i18n (EN/ES/PT)'],
  },
  { device: 'APIs and services', items: ['REST and OpenAPI', 'Axios', 'Firebase Auth and push', 'Stripe', 'Twilio Voice'] },
  { device: 'Testing', items: ['Vitest', 'React Testing Library', 'Playwright', 'End-to-end testing'] },
  { device: 'AI and automation', items: ['LLM workflow automation', 'VLM photo QA', 'Claude Code', 'Pandas', 'NumPy', 'Matplotlib', 'PostgreSQL'] },
  { device: 'IT support and security', items: ['IT support and troubleshooting', 'RBAC', 'Zero Trust architecture', 'Ethical hacking', 'Wireshark'] },
  { device: 'Tools', items: ['Git and GitHub', 'Linear', 'Jira', 'Figma', 'Sentry', 'App Store and Google Play publishing'] },
];

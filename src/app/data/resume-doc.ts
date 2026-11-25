// The one-page resume shown at /resume and printed to the PDF. It follows my
// original resume (wording and order), plus a summary, and must fit one page:
// check `npm run resume:pdf` still prints a single page after editing.

import { LINKS, PROFILE } from './resume';

export interface DocLink {
  label: string;
  href: string;
}

export interface DocSection {
  heading: string;
  /** Short context after the heading, e.g. the stack and scale. */
  context?: string;
  link?: DocLink;
  bullets: string[];
}

export const RESUME_DOC = {
  headline: 'Junior Software Engineer | React and React Native | AI-Powered SaaS | IT Support and Cybersecurity',
  summary:
    'Frontend engineer who has shipped a React Native app used by 1,600+ cleaners and a multi-tenant React web app, from Linear ticket to App Store release. I use large language models, including Claude Code, to automate routine development and operations work. Looking for frontend roles building web or mobile applications, and IT support roles.',

  job: {
    company: 'Keepers',
    companyUrl: PROFILE.company.url,
    dates: '2026',
    title: 'Junior Software Engineer (promoted from part-time Software Engineer Intern)',
    context: 'AI-powered property operations platform for short-term rentals; 4-person engineering team, 1 of 2 frontend engineers',
    sections: [
      {
        heading: 'Lead Engineer, Cleaner Mobile App',
        context: 'React Native, iOS/Android; 1,600+ cleaners, 65 companies, 182 properties',
        link: { label: 'App Store', href: LINKS.appStore.href },
        bullets: [
          'Led the full redesign of the cleaner app (layouts, navigation, job and task workflows) and owned the release cycle for both app stores; merged 32 PRs across 25+ tickets.',
          'Built the app side of vision-language-model (VLM) photo QA: room-aware checks, plain-language failure reasons and a wrong-room retake flow in English, Spanish and Portuguese, backed by 55 unit tests. The reviewer lifted the clean-room pass rate from 52% to 92% while still blocking 98% of bad photos.',
          'Rebuilt the camera with reference-photo orientation and an adjustable guide so captures line up for AI comparison.',
          'Built the "Fits my day" Available Jobs view, crew assignment and schedules, earnings statements, payout status and an in-app notification center.',
        ],
      },
      {
        heading: 'Keepers SaaS Web App',
        context: 'React, TypeScript, multi-tenant property management',
        link: { label: 'usekeepers.com', href: PROFILE.company.url },
        bullets: [
          'Delivered 227 merged PRs and 1,200+ commits in the app’s first six months, from Linear ticket to release.',
          'Led the migration of 25+ feature areas to TanStack Query and Axios, adding shared caching, mutations and error states.',
          'Redesigned the dashboard, Jobs and Tasks, guest reviews, My Team and Integrations pages, and merged calendar and reservations into one view; rebuilt property details across 12 areas with role-based editing and an audit trail.',
          'Built the Payment Center and Stripe-backed payment methods; implemented RBAC gating, a "View as user" permission preview, tenant checks and CSV export with injection protection.',
          'Used LLM tooling (Claude Code) to automate routine engineering work: multi-file refactors, migrations and tests.',
        ],
      },
    ] satisfies DocSection[],
  },

  education: {
    school: 'University of Louisiana at Lafayette',
    degree: 'Bachelor of Science in Informatics, Concentration in Cybersecurity',
    date: 'May 2026',
  },

  projects: [
    {
      heading: 'Phish Free',
      context: 'Phishing awareness training; React/Vite, Django REST',
      link: { label: 'GitHub', href: LINKS.phishFree.href },
      bullets: [
        'Built the frontend auth and onboarding: role-based signup for individuals and organizations, protected routes, password flows and an admin dashboard prototype.',
      ],
    },
    {
      heading: 'Network Modernization and Zero Trust Design',
      context: 'Team of 4',
      link: { label: 'Report', href: LINKS.zeroTrust.href },
      bullets: [
        'Redesigned a 500-staff law firm’s network: Zero Trust requirements replacing a flat LAN with segmented VLANs, an RBAC model for GDPR/ABA compliance and a phased $770K budget.',
      ],
    },
    {
      heading: 'Vulnerability Data Scraper',
      context: 'Python, BeautifulSoup, Requests, Pandas, Matplotlib',
      link: { label: 'Colab notebook', href: LINKS.scraper.href },
      bullets: [
        'Built a scraper that pulls vulnerability data, filters by keyword or CVE identifier, scores results for relevance and charts trends.',
      ],
    },
  ] satisfies DocSection[],

  skills: [
    { label: 'Languages', items: 'TypeScript, JavaScript (ES6+), Python, Java, SQL, HTML5/CSS3' },
    {
      label: 'Frontend and Mobile',
      items:
        'React, React Native (iOS/Android), Expo/EAS, React Navigation, Reanimated, Vision Camera, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, MUI, Radix UI, Angular, Design Systems, i18n (EN/ES/PT)',
    },
    { label: 'APIs and Services', items: 'REST, OpenAPI contracts, Axios, Firebase (Auth, push), Stripe, Twilio Voice' },
    { label: 'Testing', items: 'Vitest, React Testing Library, Playwright, End-to-End Testing' },
    { label: 'AI and Automation', items: 'LLM workflow automation, Claude Code, VLM photo QA, Pandas, NumPy, Matplotlib, PostgreSQL' },
    { label: 'IT Support and Security', items: 'IT support and troubleshooting, RBAC, Zero Trust Architecture, Ethical Hacking, Wireshark' },
    { label: 'Tools', items: 'Git/GitHub, Linear, Jira (Agile/Scrum), Figma, Sentry, App Store and Google Play publishing' },
  ],
} as const;

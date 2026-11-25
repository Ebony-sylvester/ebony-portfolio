// The cleaner app case study. Facts here come from my resume; screenshots
// were captured from the app running in the iOS Simulator on staging data.

export interface Screen {
  src: string;
  caption: string;
}

export const CASE_STUDY = {
  title: 'Keepers cleaner app',
  subtitle: 'Lead engineer, React Native, iOS and Android, Jan – Nov 2026',
  intro:
    'The Keepers cleaner app is how 1,600+ cleaners across 65 cleaning companies find work, run each clean and get paid. I led its redesign and owned releases on both app stores.',

  problem: [
    'Property managers need proof that every room was cleaned, so cleaners photograph each room and an AI reviewer, a vision-language model (VLM), compares each photo with a reference.',
    'When a photo failed, cleaners needed to know why and how to fix it on the spot, in their own language, without slowing the clean down.',
  ],

  built: [
    'Room-aware photo checks with plain-language failure reasons instead of error codes.',
    'A "Checking photo" state, so cleaners know the review is running.',
    'A wrong-room retake flow in English, Spanish and Portuguese.',
    'A rebuilt camera with reference-photo orientation and an adjustable on-screen guide, so captures line up with the reference.',
    '55 unit tests around the checks and retake flow.',
  ],

  result: { before: 52, after: 92, badBlocked: 98 },

  alsoShipped:
    'Alongside photo QA I built "Fits my day", which only shows jobs that fit a cleaner’s schedule and warns about overlaps, plus crew scheduling, company tools, earnings statements and a notification center: 32 merged PRs across 25+ tickets.',

  screens: [
    { src: 'app/fits-my-day.jpg', caption: '"Fits my day" only shows jobs that fit the cleaner’s schedule.' },
    { src: 'app/overlap-warnings.jpg', caption: 'Overlap warnings before a cleaner picks up a clashing job.' },
    { src: 'app/my-schedule.jpg', caption: 'My Schedule with working hours and a week strip.' },
    { src: 'app/manage-company.jpg', caption: 'Company mode for owners: jobs, tasks, team and issues.' },
  ] satisfies Screen[],
} as const;

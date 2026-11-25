import { LINKS, PROFILE, PROJECTS, ROLES } from './resume';
import { RESUME_DOC } from './resume-doc';

// Guards on the content itself: the things a recruiter would notice if they broke.
describe('portfolio content', () => {
  const allLinks = [
    ...Object.values(LINKS),
    ...ROLES.flatMap((r) => r.links),
    ...PROJECTS.flatMap((p) => p.links),
  ];

  it('links only to https pages', () => {
    const docLinks = [...RESUME_DOC.job.sections, ...RESUME_DOC.projects].map((s) => s.link);
    for (const l of [...allLinks, ...docLinks]) expect(l.href, l.label).toMatch(/^https:\/\//);
  });

  it('gives every project a link and a screenshot', () => {
    for (const p of PROJECTS) {
      expect(p.links.length, p.name).toBeGreaterThan(0);
      expect(p.shot, p.name).toMatch(/^projects\/.+\.jpg$/);
    }
  });

  it('uses unique project ids and file names', () => {
    expect(new Set(PROJECTS.map((p) => p.id)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.file)).size).toBe(PROJECTS.length);
  });

  it('never publishes a phone number', () => {
    const text = JSON.stringify({ PROFILE, ROLES, PROJECTS, RESUME_DOC });
    expect(text).not.toMatch(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/);
  });
});

import { Component, computed, signal } from '@angular/core';
import { EDUCATION, QA_RESULT, ROLES } from '../data/resume';
import { PixelIcon } from '../os/pixel-icon';

type Node = 'education' | (typeof ROLES)[number]['id'];

/** An Explorer-style window: a folder tree on the left, details on the right. */
@Component({
  selector: 'app-experience',
  imports: [PixelIcon],
  templateUrl: './experience-app.html',
  styleUrl: './experience-app.css',
})
export class ExperienceApp {
  protected readonly roles = ROLES;
  protected readonly edu = EDUCATION;
  protected readonly qa = QA_RESULT;
  protected readonly current = signal<Node>(ROLES[0].id);

  protected readonly role = computed(() => ROLES.find((r) => r.id === this.current()) ?? null);
  protected readonly path = computed(() => {
    const r = this.role();
    return r ? `C:\\Experience\\${r.org}\\${r.id}` : 'C:\\Experience\\Education';
  });
}

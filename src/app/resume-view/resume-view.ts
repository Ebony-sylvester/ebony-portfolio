import { NgOptimizedImage } from '@angular/common';
import { Component, output } from '@angular/core';
import { EDUCATION, PROFILE, PROJECTS, ROLES, SKILLS } from '../data/resume';

/**
 * The plain, skimmable version of the portfolio for recruiters, at /resume.
 * Same data as the desktop; it also prints cleanly, which is how the
 * downloadable PDF is made.
 */
@Component({
  selector: 'app-resume-view',
  imports: [NgOptimizedImage],
  templateUrl: './resume-view.html',
  styleUrl: './resume-view.css',
})
export class ResumeView {
  readonly back = output<void>();

  protected readonly p = PROFILE;
  protected readonly roles = ROLES;
  protected readonly projects = PROJECTS;
  protected readonly skills = SKILLS;
  protected readonly edu = EDUCATION;

  protected print(): void {
    window.print();
  }
}

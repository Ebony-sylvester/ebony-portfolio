import { NgTemplateOutlet } from '@angular/common';
import { Component, output } from '@angular/core';
import { PROFILE } from '../data/resume';
import { RESUME_DOC } from '../data/resume-doc';

/**
 * The one-page resume for recruiters, at /resume. It mirrors my original
 * resume plus a summary, and prints to a single page (that's how the
 * downloadable PDF is made).
 */
@Component({
  selector: 'app-resume-view',
  imports: [NgTemplateOutlet],
  templateUrl: './resume-view.html',
  styleUrl: './resume-view.css',
})
export class ResumeView {
  readonly back = output<void>();

  protected readonly p = PROFILE;
  protected readonly doc = RESUME_DOC;

  protected print(): void {
    window.print();
  }
}

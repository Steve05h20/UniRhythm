import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormatCompactNumberPipe } from '../../pipes/format-compact-number/format-compact-number.pipe';
import { CountDisplayComponent } from '../count-display/count-display.component';

@Component({
  selector: 'app-lecture-count',
  standalone: true,
  imports: [NgClass, FormatCompactNumberPipe, CountDisplayComponent],
  template: `
    <div class="group ml-2 relative inline-flex items-center">
      <span class="px-2 py-0.5 rounded text-xs font-medium inline-flex items-center justify-center transition-all duration-200 ease-in-out opacity-100 group-hover:opacity-0 text-white whitespace-nowrap" [ngClass]="{
        'bg-blue-600/90 hover:bg-blue-600': nbLecture > 5000,
        'bg-red-500/90 hover:bg-red-500': nbLecture < 100,
        'bg-green-500/90 hover:bg-green-500': nbLecture >= 100 && nbLecture <= 5000
      }">
        {{nbLecture | formatCompactNumber}}
      </span>
      <div class="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out min-w-max">
        <app-count-display
          [count]="nbLecture"
          type="plays">
        </app-count-display>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      margin-left: 0.25rem;
    }
  `]
})
export class LectureCountComponent {
  @Input() nbLecture: number = 0;
}

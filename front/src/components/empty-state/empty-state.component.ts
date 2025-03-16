import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-lg mt-4">
      <mat-icon class="text-6xl text-zinc-600 mb-4">{{icon}}</mat-icon>
      <p class="text-xl text-zinc-400 font-medium">{{title}}</p>
      <p class="text-sm text-zinc-500 mt-2">{{description}}</p>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() icon: string = 'music_off';
  @Input() title: string = '';
  @Input() description: string = '';
}

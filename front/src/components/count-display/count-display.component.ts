import { Component, Input } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormatCompactNumberPipe } from '../../pipes/format-compact-number/format-compact-number.pipe';

@Component({
  selector: 'app-count-display',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    FormatCompactNumberPipe,
    I18nPluralPipe
  ],
  template: `
    <div class="flex items-center space-x-1 text-sm cursor-pointer">
      <span
        [matTooltip]="count | i18nPlural:pluralMapping"
        [matTooltipPosition]="'above'"
        class="hover:text-zinc-300 transition-colors duration-200">
        {{ count | formatCompactNumber }}
        <span class="text-zinc-500">{{ label }}</span>
      </span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class CountDisplayComponent {
  @Input() count: number = 0;
  @Input() type: 'saves' | 'plays' = 'saves';

  get label(): string {
    return this.type === 'saves' ? 'sauvegardes' : 'lectures';
  }

  get pluralMapping() {
    const mappings = {
      'saves': {
        '=0': 'Aucune sauvegarde',
        '=1': '1 sauvegarde',
        'other': `${this.count.toLocaleString('fr-FR')} sauvegardes`
      },
      'plays': {
        '=0': 'Aucune lecture',
        '=1': '1 lecture',
        'other': `${this.count.toLocaleString('fr-FR')} lectures`
      }
    };
    return mappings[this.type];
  }
}

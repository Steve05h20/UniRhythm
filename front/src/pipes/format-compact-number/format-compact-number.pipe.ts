import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCompactNumber',
  standalone: true
})
export class FormatCompactNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1000) {
      return value.toString();
    }
    if (value < 1000000) {
      return Math.floor(value / 1000) + 'k';
    }
    return Math.floor(value / 1000000) + 'M';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSecondsToMinSec',
  standalone: true
})
export class ConvertSecondsToMinSecPipe implements PipeTransform {

  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const remainingAfterHours = seconds % 3600;
    const minutes = Math.floor(remainingAfterHours / 60);
    const remainingSeconds = remainingAfterHours % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }

}

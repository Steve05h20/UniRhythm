import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="button-group">
      <div class="group-title">{{title}}</div>
      <div class="button-container">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .button-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    .group-title {
      color: #9ca3af;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 8px;
      text-align: center;
      white-space: nowrap;
    }

    .button-container {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }

    :host:last-child .button-group {
      border-right: none;
    }
  `]
})
export class ButtonGroupComponent {
  @Input() title!: string;
}

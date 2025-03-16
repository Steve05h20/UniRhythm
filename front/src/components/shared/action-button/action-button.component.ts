import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button
      *ngIf="!iconOnly"
      mat-raised-button
      [matTooltip]="tooltip"
      [style.background-color]="backgroundColor"
      [style.color]="'white'"
      class="action-button"
      (click)="onClick.emit()">
      <mat-icon>{{icon}}</mat-icon>
      <span>{{label}}</span>
    </button>
    <button
      *ngIf="iconOnly"
      mat-icon-button
      [matTooltip]="tooltip"
      [style.background-color]="backgroundColor"
      [style.color]="'white'"
      class="action-button"
      (click)="onClick.emit()">
      <mat-icon>{{icon}}</mat-icon>
    </button>
  `,
  styles: [`
    .action-button {
      display: flex !important;
      align-items: center;
      gap: 4px;
      padding: 0 16px !important;
      height: 32px;
      min-width: 50px !important;
      border-radius: 4px !important;
      border: none !important;
    }

    .action-button mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;

    }

    .action-button span {
      font-size: 13px;
      white-space: nowrap;
    }
  `]
})
export class ActionButtonComponent {
  @Input() icon!: string;
  @Input() label?: string;
  @Input() backgroundColor!: string;
  @Input() tooltip: string = '';
  @Input() iconOnly: boolean = false;
  @Output() onClick = new EventEmitter<void>();
}

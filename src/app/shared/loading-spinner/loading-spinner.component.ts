import {Component,Input} from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
      <i *ngIf="visible" class="fa fa-spinner fa-spin" [ngClass]="{
    'fa-lg': size === 'lg',
    'fa-2x': size === '2x',
    'fa-3x': size === '3x',
    'fa-4x': size === '4x',
    'fa-5x': size === '5x'
      }"></i>
  `,
  styles: []
})
export class LoadingSpinnerComponent {
  @Input() visible: boolean;
  @Input() size: string = 'lg';

}

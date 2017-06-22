import { trigger, transition, style, animate, state } from '@angular/animations';
/*
  Component declaration:
    @Component({
      selector: 'app-anim',
      animations: [expandCollapse],
      templateUrl: './anim.component.html',
      styleUrls: ['./anim.component.scss']
    })
  Template:
    <div *ngIf="show" [@expandCollapse]>
*/
export const expandCollapse = trigger('expandCollapse', [
  state('*', style({
    'overflow-y': 'hidden',
    'height': '*'
  })),
  state('void', style({
    'height': '0',
    'overflow-y': 'hidden'
  })),
  transition('* => void', animate('250ms ease-out')),
  transition('void => *', animate('250ms ease-in'))
]);

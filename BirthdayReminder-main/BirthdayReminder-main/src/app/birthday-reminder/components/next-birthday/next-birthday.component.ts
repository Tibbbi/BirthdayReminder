// next-birthday.component.ts
import { Component, Input } from '@angular/core';
import { Friend } from '../../models/friend';

@Component({
  selector: 'app-next-birthday',
  templateUrl: './next-birthday.component.html',
})
export class NextBirthdayComponent {
  @Input() nextFriend: Friend | undefined;
}

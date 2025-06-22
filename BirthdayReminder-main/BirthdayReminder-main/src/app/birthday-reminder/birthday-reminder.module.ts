import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { BirthdayReminderRoutingModule } from './birthday-reminder-routing.module';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';
import { NextBirthdayComponent } from './components/next-birthday/next-birthday.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzBadgeModule} from "ng-zorro-antd/badge";


@NgModule({
  declarations: [
    FriendsTableComponent,
    NextBirthdayComponent,
    AddFriendComponent,
    FriendEditComponent
  ],
  imports: [
    CommonModule,
    BirthdayReminderRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzCalendarModule,
    NzBadgeModule
  ],
  exports: [
    FriendsTableComponent,
    NextBirthdayComponent,
    AddFriendComponent
  ]
})
export class BirthdayReminderModule { }

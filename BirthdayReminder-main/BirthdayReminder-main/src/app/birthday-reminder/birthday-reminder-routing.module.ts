// src/app/birthday-reminder/birthday-reminder-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';
import { NextBirthdayComponent } from './components/next-birthday/next-birthday.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { FriendEditComponent } from './components/friend-edit/friend-edit.component';

const routes: Routes = [
  { path: 'friends', component: FriendsTableComponent },
  { path: 'next-birthday', component: NextBirthdayComponent },
  { path: 'add-friend', component: AddFriendComponent },
  { path: 'edit-friend/:id', component: FriendEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdayReminderRoutingModule { }

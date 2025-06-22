import { Component, OnInit, TemplateRef } from '@angular/core';
import { Friend } from '../../models/friend';
import { BirthdayService } from '../../birthday.service';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {AuthService} from "../../../../auth/auth.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.css']
})
export class FriendsTableComponent implements OnInit {
  friends: Friend[] = [];
  filteredFriends: Friend[] = [];
  nextBirthdayFriend: Friend | undefined;
  sortColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  searchCategory: keyof Friend | null = null;
  searchTerm: string = '';

  constructor(private birthdayService: BirthdayService , private authService: AuthService, private router: Router , private message: NzMessageService) {}

  ngOnInit(): void {
    this.birthdayService.getFriends().subscribe(friends => {
      this.friends = friends;
      this.filteredFriends = friends;
      this.sortData();
      this.updateNextBirthday();
    });
  }

  sortData(): void {
    if (!this.sortColumn) return;

    this.filteredFriends = [...this.filteredFriends].sort((a, b) => {
      const valueA = a[this.sortColumn as keyof Friend];
      const valueB = b[this.sortColumn as keyof Friend];

      let comparison = 0;
      if (valueA !== undefined && valueB !== undefined) {
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  toggleSort(column: keyof Friend): void {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  updateNextBirthday(): void {
    this.nextBirthdayFriend = this.birthdayService.getNextBirthday();
  }

  deleteFriend(friend: Friend): void {
    if (friend.id) {
      this.birthdayService.deleteFriend(friend);
    } else {
      console.error('Attempted to delete a friend without an ID');
    }
  }

  filterFriends(): void {
    if (!this.searchCategory || !this.searchTerm) {
      this.filteredFriends = this.friends;
      return;
    }

    this.filteredFriends = this.friends.filter(friend => {
      const value = friend[this.searchCategory as keyof Friend];
      return value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    this.sortData();
  }

  // Metodă pentru a verifica zilele de naștere
  hasBirthday(date: Date): boolean {
    return this.friends.some(friend => {
      const friendBirthday = new Date(friend.birthday);
      return friendBirthday.getDate() === date.getDate() && friendBirthday.getMonth() === date.getMonth();
    });
  }

  // Metodă pentru a obține prietenii cu zile de naștere într-o anumită dată
  getFriendsWithBirthday(date: Date): Friend[] {
    return this.friends.filter(friend => {
      const friendBirthday = new Date(friend.birthday);
      return friendBirthday.getDate() === date.getDate() && friendBirthday.getMonth() === date.getMonth();
    });
  }

  // Metodă pentru a genera mesajul de ziua de naștere
  getBirthdayMessage(firstName: string): string {
    return `${firstName}'s birthday 🎈`;
  }

  logout(): void {
    this.authService.logout();
    this.message.success('Logout successful');
    this.router.navigate(['/auth/login']);
  }
}

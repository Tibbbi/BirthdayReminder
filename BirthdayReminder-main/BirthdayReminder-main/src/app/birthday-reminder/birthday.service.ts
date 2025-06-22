import { Injectable } from '@angular/core';
import { Friend } from './models/friend';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = 'http://localhost:4000/friends';
  private friendsSubject = new BehaviorSubject<Friend[]>([]);
  private friends: Friend[] = [];

  constructor(private http: HttpClient) {
    this.loadFriends();
  }

  // Încarcă prietenii de pe server și îi stochează local
  private loadFriends(): void {
    this.http.get<Friend[]>(this.apiUrl).subscribe(friends => {
      this.friends = friends;
      this.friendsSubject.next(this.friends);
    });
  }

  getFriends(): Observable<Friend[]> {
    return this.friendsSubject.asObservable();
  }

  addFriend(friend: Friend): void {
    this.http.post<Friend>(this.apiUrl, friend).subscribe(addedFriend => {
      this.friends.push(addedFriend);
      this.friendsSubject.next(this.friends);
    });
  }
  

  getNextBirthday(): Friend | undefined {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.friends.sort((a, b) => {
      const nextBirthdayA = this.getNextBirthdayDate(a.birthday);
      const nextBirthdayB = this.getNextBirthdayDate(b.birthday);
      return nextBirthdayA.getTime() - nextBirthdayB.getTime();
    });

    return this.friends[0];
  }

  private getNextBirthdayDate(birthday: Date): Date {
    const today = new Date();
    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(today.getFullYear());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    return nextBirthday;
  }
  
  deleteFriend(friend: Friend): void {
    this.http.delete(`${this.apiUrl}/${friend.id}`).subscribe(() => {
      this.friends = this.friends.filter(f => f.id !== friend.id);
      this.friendsSubject.next(this.friends);
    });
  }

  getFriendById(id: number): Observable<Friend> {
    return this.http.get<Friend>(`${this.apiUrl}/${id}`);
  }

  updateFriend(friend: Friend): Observable<Friend> {
    return this.http.put<Friend>(`${this.apiUrl}/${friend.id}`, friend);
  }
}

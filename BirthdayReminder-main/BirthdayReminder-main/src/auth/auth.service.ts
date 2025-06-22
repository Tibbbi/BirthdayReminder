import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token: string | null = '';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          this.token = 'dummy-token';
          return { success: true, token: this.token, user };
        } else {
          throw new Error('No user found with these credentials');
        }
      })
    );
  }

  register(data: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.clear();
    sessionStorage.clear();
  }
}

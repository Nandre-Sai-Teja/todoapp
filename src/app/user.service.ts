import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private sessionKey = 'users';

  register(email: string, password: string): boolean {
    let users = this.getUsers();
    if (users.some(user => user.email === email)) {
      return false; // User already exists
    }
    users.push({ email, password });
    sessionStorage.setItem(this.sessionKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    let users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      sessionStorage.setItem('loggedInUser', email);
      return true;
    }
    return false;
  }

  getUsers(): { email: string; password: string }[] {
    return JSON.parse(sessionStorage.getItem(this.sessionKey) || '[]');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('loggedInUser') !== null;
  }

  logout(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}
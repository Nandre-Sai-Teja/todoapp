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
    const user = users.find(u => u.email === email && u.password === password); //search/look for a user matching the email and password
    if (user) { //if a user is found store their email in sessionStorage under loggedInuser
      sessionStorage.setItem('loggedInUser', email);
      return true; //return true indicating a successful login
    }
    return false;
  }

  getUsers(): { email: string; password: string }[] {
    return JSON.parse(sessionStorage.getItem(this.sessionKey) || '[]'); //if there are no users return an empty array //converts the stored json back into an array
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('loggedInUser') !== null; //returns true if loggedIn user exists, else returns false
  }

  logout(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}
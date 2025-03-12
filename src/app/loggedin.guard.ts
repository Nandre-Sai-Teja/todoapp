import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.router.navigate(['/home']); // Redirect to home page
      return false; // Block access to the route
    } else {
      return true; // Allow access to the route
    }
  }
}
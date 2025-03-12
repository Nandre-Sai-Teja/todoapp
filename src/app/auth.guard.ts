import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Block access to the route
    } 
  }
}

//implementing a route guard function in place of a class

// export const AuthGuard = () => {
//     const currentUser = sessionStorage.getItem('currentUser');
//     const 
// }

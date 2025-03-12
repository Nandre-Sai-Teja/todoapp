//Authguard function implementation 

import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthGuardFn = () => {
    const currentUser = sessionStorage.getItem('currentUser');
    const router =  inject(Router);

    if (currentUser) {
        return true; // Allow access to the route
      } else {
        router.navigate(['/login']); // Redirect to login page
        return false; // Block access to the route
      } 
}
//function approach for loggedinguard

import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

export const LoggedInGuardFn = () => {
    const currentUser = sessionStorage.getItem('currentUser');

    const router = inject(Router);

    if(currentUser){
        router.navigate(['/home']); //navigate to the home page
        return false; //block access to the route
    }else{
        return true; //allow access to the route
    }
}
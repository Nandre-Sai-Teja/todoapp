import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { HomeComponent } from './home/home.component';
//import { AuthGuard } from './auth.guard';
//import { LoggedInGuard } from './loggedin.guard';
import { AuthGuardFn } from './auth.guardFn';
import { LoggedInGuardFn } from './loggedin.guardFn.';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent, 
        //canActivate: [LoggedInGuard]  --> this is for class based approach
        canActivate: [LoggedInGuardFn]
    },
    { 
        path: 'register', 
        component: RegisterComponent, 
        //canActivate: [LoggedInGuard]  --> this is for class based approach
        canActivate: [LoggedInGuardFn]
    },
    {
        path: 'home',
        // component: HomeComponent, implemented lazy loading
        loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent),
        //canActivate: [AuthGuard] --> this is for class based approach
        canActivate: [AuthGuardFn]
    }
];
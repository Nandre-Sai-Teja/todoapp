import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], // Add RouterLink here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
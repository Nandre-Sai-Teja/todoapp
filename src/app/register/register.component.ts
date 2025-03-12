
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule and Validators
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Add ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup; // Define the form group

  constructor(private router: Router, private fb: FormBuilder) {
    // Initialize the form with validators
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email is required and must be valid
      password: ['', [Validators.required, Validators.minLength(3)]] // Password is required and must be at least 3 characters
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      // If the form is invalid, show an error message
      alert('Please fill out the form correctly.');
      return;
    }

    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const email = this.registerForm.value.email;

    // Check if the user already exists
    const userExists = users.some((user: any) => user.email === email);
    if (userExists) {
      alert('User already exists!');
      return;
    }

    // Add the new user
    users.push({ email: email, password: this.registerForm.value.password });
    sessionStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    this.router.navigate(['/login']);
  }
}
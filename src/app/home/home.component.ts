import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTask: string = '';
  currentUserEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}'); //json.parse() --> converts the JSON string back into an object
    this.currentUserEmail = currentUser.email; // Get the logged-in user's email
    this.loadTodoList();
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
      };

      this.todoList.push(newTodoItem);
      this.saveTodoList();
      this.newTask = '';
    }
  }

  toggleCompleted(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
    this.saveTodoList();
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }

  logout(): void {
    sessionStorage.removeItem('currentUser'); // Clear the current user
    this.router.navigate(['/login']); // Redirect to login page
  }

  private saveTodoList(): void {
    // Save tasks under a user-specific key
    sessionStorage.setItem(`todoList_${this.currentUserEmail}`, JSON.stringify(this.todoList));
  }

  private loadTodoList(): void {
    // Load tasks from a user-specific key
    const storedList = sessionStorage.getItem(`todoList_${this.currentUserEmail}`);
    if (storedList) {
      this.todoList = JSON.parse(storedList);
    }
  }
}
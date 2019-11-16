import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../interfaces';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  sortById() {
    this.todos = this.todos.sort((a, b) => a.id - b.id);
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  getTodo(id: number) {
    this.todoService.getTodo(id);

  }

  updateTodo(id: number, body: Todo) {
    this.todoService.updateTodo(id, body);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todoService.deleteTodo(id).subscribe();
  }

  addTodo(value) {
    let body = {
      title: value,
      body: 'default',
      userId: 1
    };
    this.todoService.addTodo(body).subscribe((todo: Todo) => this.todos.unshift(todo));
  }

}

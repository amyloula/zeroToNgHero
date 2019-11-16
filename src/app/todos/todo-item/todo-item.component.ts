import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo;
  @Output() markedForDeletion: EventEmitter<any> = new EventEmitter();
  @Output() toggled: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  markForDeletion(todoId) {
    this.markedForDeletion.emit(todoId);
  }

  toggleTodo(todo) {
    todo.completed = !todo.completed;
    this.toggled.emit(todo);
  }

}

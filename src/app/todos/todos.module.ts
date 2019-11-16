import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';


@NgModule({
  declarations: [TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }

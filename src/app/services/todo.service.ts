import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todo } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosEndpoint: string = environment.todosApi;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosEndpoint)
      .pipe(
        tap(_ => console.log('fetched todos')),
        catchError(this.handleError<[]>('getTodos', []))
      );
  }

  addTodo(body: {}): Observable<{}> {
    return this.http.post<Todo>(this.todosEndpoint, JSON.stringify(body), this.httpOptions)
      .pipe(
        tap(_ => console.log('addTodo')),
        catchError(this.handleError<{}>(`addTodo`))
      );
  }

  getTodo(id: number): Observable<{}> {
    let todoUrl = `${this.todosEndpoint}/${id}`;
    return this.http.get<Todo>(todoUrl)
      .pipe(
        tap(_ => console.log(`fetched todo id=${id}`)),
        catchError(this.handleError<{}>(`getTodo id=${id}`))
      );
  }

  updateTodo(id: number, body: {}): Observable<{}> {
    let todoUrl = `${this.todosEndpoint}/${id}`;
    return this.http.patch<Todo>(todoUrl, body, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched todo id=${id}`)),
        catchError(this.handleError<{}>(`updateTodo id=${id}`))
      );
  }

  deleteTodo(id: number): Observable<{}> {
    let todoUrl = `${this.todosEndpoint}/${id}`;
    return this.http.delete<Todo>(todoUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleteTodo id=${id}`))
      );
  }
}

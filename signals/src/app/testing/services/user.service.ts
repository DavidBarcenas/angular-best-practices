import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private usersURL = 'https://jsonplaceholder.typicode.com';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersURL}/users`).pipe(catchError(this.handleError('getUsers', [])));
  }

  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersURL}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => users[0]), // returns a {0|1} element array
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersURL}/users/${id}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<User[]>(`${this.usersURL}/users`)
      .pipe(catchError(this.handleError<User[]>('searchUsers', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add('HeroService: ' + message);
  }
}

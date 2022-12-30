import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config, map } from 'rxjs';
import { User } from 'src/stories/User';
import { AuthStateModel } from '../_NGXS/auth.model';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginNgrx(action: any): Observable<AuthStateModel> {
    return this.http.post<AuthStateModel>(`${config}/user/authenticate`, {
      action,
    });
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(`${config}/users/authenticate`, { username, password })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  logoutNgrx(action: {}): Observable<AuthStateModel> {
    const headers = {};
    return this.http.delete<AuthStateModel>(`${config}/user/authenticate`, {
      headers,
    });
  }
  // logout() {
  //   // remove user from local storage and set current user to null
  //   localStorage.removeItem('currentUser');
  // }
}

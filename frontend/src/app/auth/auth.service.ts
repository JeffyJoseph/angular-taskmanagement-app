import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from './user.model';

export interface AuthResponseData {
  user_token: string,
  user_id: number,
  error: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) { }
/**
 * login api call which returns the usertoken
 * @param email 
 * @param password 
 */
  login(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'apptoken': 'r0MrA268ORAobX53qkoaohaA7g9ek3JJ' });
    let options = { headers: headers };
    return this.http
      .post<AuthResponseData>(
        this.baseUrl + '/login',
        {
          email: email,
          password: password,
          tenantid: 3,
          id_type: 'email',
          apptoken:'r0MrA268ORAobX53qkoaohaA7g9ek3JJ'
        },
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const user = new User(resData.user_token, resData.user_id, null);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  /**
   * private method to handle error
   * @param errorRes 
   */
  private handleError(errorRes: HttpErrorResponse) {
    const user = new User("", 0, errorRes.error.text);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
  }

}

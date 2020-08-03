import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class TaskService {
  baseUrl = environment.baseUrl;
    constructor(private http: HttpClient, private router: Router) { }
 
    fetchTasks() {

      const userData: {
        usertoken: string;
        userid: string;
      } = JSON.parse(localStorage.getItem('userData'));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'apptoken': 'r0MrA268ORAobX53qkoaohaA7g9ek3JJ',
        'usertoken': userData.usertoken });
      let options = { headers: headers };
        return this.http
          .post<any>(
            this.baseUrl + '/tasks',
            {
              parent_id: 357
            },
             options
          )
          .pipe(
            catchError(this.handleError),
            tap(resData => {
            })
          );
      }

      private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
      }

}

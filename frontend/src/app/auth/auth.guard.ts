import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map,take } from 'rxjs/operators';
  import { AuthService } from './auth.service';

  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { 
    }
  
    /**
     * guard to route to task page only if usertoken is available
     * @param route 
     * @param router 
     */
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const userData: { usertoken: string; userid: number; errorMessage: string } = JSON.parse(localStorage.getItem('userData'));
          const isAuth = !!userData.usertoken;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/']);
        })
      );
    }
  }
  
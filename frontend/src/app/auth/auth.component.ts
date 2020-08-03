import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../tasks/task.service';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild('email', { static: false }) emailValue: ElementRef;
  @ViewChild('password', { static: false }) passwordValue: ElementRef;

  constructor(private authService: AuthService, private router: Router, private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  /**
   * login button call
   */
  onLogin() {
    const email = this.emailValue.nativeElement.value;
    const password = this.passwordValue.nativeElement.value;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    authObs = this.authService.login(email, password);
    authObs.subscribe(
      resData => {
        if (resData.user_token) {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        } else {
          this.router.navigate(['/']);
          this.isLoading = false;
        }
      },
      errorMessage => {
        this.error = 'Invalid credentials!';
        this.isLoading = false;
      }
    );
  }
}



























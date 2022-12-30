import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Actions,
  ofActionCompleted,
  ofActionDispatched,
  ofActionSuccessful,
} from '@ngxs/store';
import { Login } from 'src/app/core/_NGXS/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private actions: Actions
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // login() {
  //   if (
  //     this.form.value.username == 'admin' &&
  //     this.form.value.password == 'admin'
  //   ) {
  //     this.router.navigate(['customer']);
  //   } else {
  //     alert('اطلاعات وارد شده صحیح نمی باشد');
  //   }
  // }
  login() {
    // this.actions.pipe(ofActionCompleted(Login)).subscribe(() => {
    this.router.navigate(['customer']);
    // });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

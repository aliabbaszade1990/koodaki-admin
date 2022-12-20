import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (
      this.form.value.username == 'admin' &&
      this.form.value.password == 'admin'
    ) {
      this.router.navigate(['customer']);
    } else {
      alert('اطلاعات وارد شده صحیح نمی باشد');
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

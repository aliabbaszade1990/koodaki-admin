import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { LoginResultDTO } from '../dtos/auth.dto';

@Component({
  selector: 'koodaki-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  inProgress = false;
  login(): void {
    this.inProgress = true;
    this.authService.login(this.form.value).then((result: LoginResultDTO) => {
      if (result) {
        this.router.navigate(['project/list']);
      }
    });
  }

  get f() {
    return this.form.controls;
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

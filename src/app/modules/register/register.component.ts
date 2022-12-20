import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    const pattern = '^09[0|1|2|3][0-9]{8}$';
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(pattern)]],
    });
  }
  save() {}

  toLogin() {
    this.router.navigate(['log-in']);
  }
}

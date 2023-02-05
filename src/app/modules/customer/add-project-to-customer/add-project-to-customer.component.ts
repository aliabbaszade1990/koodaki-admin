import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../dto/customer';

@Component({
  selector: 'app-add-project-to-customer',
  templateUrl: './add-project-to-customer.component.html',
  styleUrls: ['./add-project-to-customer.component.scss'],
})
export class AddProjectToCustomerComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICustomer,
    private dialogRef: MatDialogRef<AddProjectToCustomerComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
    });
  }

  sendFormValue() {
    const form = {
      title: this.form.controls['title'].value,
      location: this.form.controls['location'].value,
      startDate: this.form.controls['startDate'].value._d,
    };
    console.log(form);
    this.form.reset();
  }
  closeDialog() {}
}

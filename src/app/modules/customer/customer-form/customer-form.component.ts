import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../dto/customer';

@Component({
  selector: 'koodaki-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  customer: ICustomer;
  editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICustomer,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const pattern = '^09[0|1|2|3][0-9]{8}$';
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(pattern)]],
    });

    if (this.data) {
      this.customer = this.data;
      this.form.patchValue(this.customer);
      this.editMode = true;
    }
  }

  sendFormValue() {
    if (this.editMode) {
      this.update();
      return;
    }
    this.creat();
  }

  update() {
    this.customer = { ...this.customer, ...this.form.value };
    this.customerService
      .update(this.customer.id, this.customer)
      .subscribe((res) => {
        this.dialogRef.close(this.customer);
      });
  }

  creat() {
    this.customer = {} as ICustomer;
    this.customer.firstName = this.form.value.firstName;
    this.customer.lastName = this.form.value.lastName;
    this.customer.phoneNumber = this.form.value.phoneNumber;

    this.customerService.create(this.customer).subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

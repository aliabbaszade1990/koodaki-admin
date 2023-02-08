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
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICustomer,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    const pattern = '^09[0|1|2|3][0-9]{8}$';
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(pattern)]],
    });

    if (this.data) {
      this.title = `ویرایش اطلاعات ${this.data.firstName} ${this.data.lastName}`;
      this.customer = this.data;
      this.form.patchValue(this.customer);
      this.editMode = true;
    } else {
      this.title = 'افزودن مشتری';
    }
  }

  sendFormValue() {
    if (this.editMode) {
      this.updateCustomer();
      return;
    } else this.createCustomer();
    return;
  }

  updateCustomer() {
    this.customer = { ...this.customer, ...this.form.value };
    this.customerService
      .update(this.customer.id, this.customer)
      .subscribe((res) => {
        this.dialogRef.close(res);
      });
  }

  createCustomer() {
    const form: Partial<ICustomer> = {
      firstName: this.form.value['firstName'],
      lastName: this.form.value['lastName'],
      phoneNumber: this.form.value['phoneNumber'],
    };

    this.customerService.create(form).subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

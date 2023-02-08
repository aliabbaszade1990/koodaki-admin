import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../project/project.service';
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
    private projectService: ProjectService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      startedAt: [new Date()],
      customerId: [''],
    });
    this.form.controls['customerId'].setValue(this.data.id);
  }

  sendFormValue() {
    this.projectService.create(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }
}

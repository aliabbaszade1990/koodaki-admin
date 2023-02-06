import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/modules/customer/customer.service';
import { ICustomer } from 'src/app/modules/customer/dto/customer';
import { IProject } from '../../dtos/project';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'koodaki-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  editMode: boolean = false;
  title: string = 'افزودن پروژه';
  customers: ICustomer[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProject,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      title: ['', Validators.required],
      location: ['', Validators.required],
      startedAt: [new Date(), Validators.required],
      customerId: ['', Validators.required],
    });
    this.form.patchValue(this.data);

    if (this.data.id) {
      this.title = 'ویرایش پروژه';
      this.editMode = true;
      this.form.controls['customerId'].setValue(this.data.customer.id);
    }

    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getAll().subscribe((result) => {
      this.customers = result;
    });
  }

  sendFormValue() {
    this.projectService.create(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

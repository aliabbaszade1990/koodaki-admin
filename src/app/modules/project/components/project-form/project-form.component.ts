import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'jalali-moment';
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
      isClosed: [''],
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
    const form: any = {
      title: this.form.value['title'],
      location: this.form.value['location'],
      startedAt: moment
        .from(this.form.value['startedAt'], 'en')
        .utc(true)
        .toJSON(),
      id: this.form.value['id'],
      isClosed: this.form.value['isClosed'],
      customerId: this.form.value['customerId'],
    };
    if (this.form.value['id']) {
      this.projectService
        .update(this.form.value['id'], form)
        .subscribe((result) => {
          this.dialogRef.close(result);
        });
    } else
      this.projectService.create(form).subscribe((result) => {
        this.dialogRef.close(result);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

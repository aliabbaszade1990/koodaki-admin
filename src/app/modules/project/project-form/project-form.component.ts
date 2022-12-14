import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProject } from '../dto/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  project: IProject;
  editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProject,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const pattern = '^09[0|1|2|3][0-9]{8}$';
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          //  Validators.pattern(pattern)
        ],
      ],
    });

    if (this.data) {
      this.project = this.data;
      this.form.patchValue(this.project);
      this.editMode = true;
    }
  }

  sendFormValue() {}

  closeDialog() {
    this.dialogRef.close();
  }
}

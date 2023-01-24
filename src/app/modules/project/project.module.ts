import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule } from '@angular/router';
import { ProjectRoute } from './project.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [ProjectFormComponent, ProjectListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoute),
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
  ],
})
export class ProjectModule {}

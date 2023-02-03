import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoute } from './project.routing';
import { ProjectService } from './project.service';

@NgModule({
  declarations: [ProjectListComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoute),
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
  ],
  providers: [ProjectService],
})
export class ProjectModule {}

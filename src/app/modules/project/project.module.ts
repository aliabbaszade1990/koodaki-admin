import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectFilesComponent } from './components/project-files/project-files.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ImageListModule } from './image-list/image-list.module';
import { PaginatorModule } from './paginator/paginator.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectService } from './project.service';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../customer/customer.service';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectFilesComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
    FileUploadModule,
    MatProgressBarModule,
    ImageListModule,
    PaginatorModule,
    MatSelectModule,
  ],
  providers: [ProjectService, CustomerService],
})
export class ProjectModule {}

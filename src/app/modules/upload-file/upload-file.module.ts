import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadFileRoute } from './upload-file.routing';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadFileComponent } from './upload-file.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UploadFileRoute),
    ReactiveFormsModule,
    SharedModule,
    FileUploadModule,
    MatProgressBarModule,
  ],
  declarations: [UploadFileComponent],
  providers: [],
})
export class UploadFileModule {}

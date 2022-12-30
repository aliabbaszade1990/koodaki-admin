import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { ShowRequestResultComponent } from './components/show-request-result/show-request-result.component';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    ConfirmComponent,
    PageNotFoundComponent,
    ShowRequestResultComponent,
  ],
  imports: [CommonModule, modules],
  exports: [modules],
})
export class SharedModule {}

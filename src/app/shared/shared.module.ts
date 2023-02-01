import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowRequestResultComponent } from './components/show-request-result/show-request-result.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTooltipModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatCheckboxModule,
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

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
import { ToaterService } from './services/toater.service';
import { PersianDateConvertor as PersianDateConvertorPipe } from './pipes/persian-date-convertor.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './material/persian-date.adapter';

import { LoadingModule } from './modules/loading/loading.module';
import { NoDataFoundModule } from './modules/no-data-found/shared-ui-no-data-found.module';
import { MatPaginatorModule } from '@angular/material/paginator';

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
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  LoadingModule,
  NoDataFoundModule,
];

@NgModule({
  declarations: [
    ConfirmComponent,
    PageNotFoundComponent,
    ShowRequestResultComponent,
    PersianDateConvertorPipe,
  ],
  imports: [CommonModule, modules],
  exports: [modules, PersianDateConvertorPipe],
  providers: [
    ToaterService,
    { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],
})
export class SharedModule {}

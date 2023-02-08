import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NoDataFoundComponent } from './no-data-found.component';

@NgModule({
  declarations: [NoDataFoundComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NoDataFoundComponent],
})
export class NoDataFoundModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}

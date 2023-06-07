import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NoDataFoundModule } from 'src/app/shared/modules/no-data-found/shared-ui-no-data-found.module';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [ImageListComponent],
  imports: [CommonModule, MatIconModule, NgOptimizedImage, NoDataFoundModule],
  exports: [ImageListComponent],
})
export class ImageListModule {}

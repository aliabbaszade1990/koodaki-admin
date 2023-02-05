import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [ImageListComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ImageListComponent],
})
export class ImageListModule {}

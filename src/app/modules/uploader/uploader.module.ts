import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { UploaderComponent } from './uploader.component';

@NgModule({
  declarations: [UploaderComponent],
  imports: [CommonModule, MatIconModule, MatBottomSheetModule],
  exports: [UploaderComponent],
})
export class UploaderModule {}

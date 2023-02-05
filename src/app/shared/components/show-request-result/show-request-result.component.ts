import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IRequestResult } from '../../models/request-result';

@Component({
  selector: 'koodaki-show-request-result',
  templateUrl: './show-request-result.component.html',
  styleUrls: ['./show-request-result.component.scss'],
})
export class ShowRequestResultComponent {
  title: string;
  content: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShowRequestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRequestResult
  ) {
    ({ title: this.title, content: this.content } = this.data);
  }
}

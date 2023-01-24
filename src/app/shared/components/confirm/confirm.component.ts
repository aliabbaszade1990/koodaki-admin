import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IQuestion } from '../../models/confirm-question';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  header: string;
  question: string;
  confirmButton: string;
  cancelButton: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestion
  ) {
    ({
      header: this.header,
      question: this.question,
      confirmButton: this.confirmButton,
      cancelButton: this.cancelButton,
    } = this.data);
  }

  ngOnInit(): void {}
}

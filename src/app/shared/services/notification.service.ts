import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      horizontalPosition: 'left',
      panelClass: ['success'],
    });
  }

  warning(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      horizontalPosition: 'left',
      panelClass: ['warning'],
    });
  }

  error(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      horizontalPosition: 'left',
      panelClass: ['error'],
    });
  }

  info(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      horizontalPosition: 'left',
      panelClass: ['info'],
    });
  }
}

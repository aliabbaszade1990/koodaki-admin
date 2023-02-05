import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class ToaterService {
  /**
   *
   */
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      panelClass: ['success'],
    });
  }

  warning(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      panelClass: ['warning'],
    });
  }

  error(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      panelClass: ['error'],
    });
  }

  info(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this._snackBar.open(message, action, {
      ...config,
      panelClass: ['info'],
    });
  }
}

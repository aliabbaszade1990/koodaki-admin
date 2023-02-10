import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseService } from '../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FileService extends BaseService<any> {
  constructor() {
    super('file');
  }

  private endpoint = 'file';
  upload(file: FormData, id: string): Observable<any> {
    return this.http.post<any>(`${this.endpoint}?projectId=${id}`, file).pipe(
      catchError((e: any) => {
        return throwError(() => e);
      })
    );
  }
}

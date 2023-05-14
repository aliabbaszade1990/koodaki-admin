import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from '../../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FileService extends BaseService<any> {
  constructor() {
    super('file');
  }

  private endpoint = 'file';
  upload(file: File, id: string): Observable<any> {
    let headers = new HttpHeaders();

    const options: any = {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    };

    const formData = new FormData();
    formData.append('files', file);

    return this.http
      .post<any>(`${this.endpoint}?projectId=${id}`, formData, options)
      .pipe(
        catchError((e: any) => {
          return throwError(() => e);
        })
      );
  }
}

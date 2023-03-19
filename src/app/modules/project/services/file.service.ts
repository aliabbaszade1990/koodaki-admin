import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders();

    const options: any = {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    };
    return this.http
      .post<any>(`${this.endpoint}?projectId=${id}`, file, options)
      .pipe(
        catchError((e: any) => {
          return throwError(() => e);
        })
      );
  }
}

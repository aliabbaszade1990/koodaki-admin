import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  private endpoint = 'file';
  upload(file: FormData, id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

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

  getFiles(projectId: string): Observable<any> {
    return this.http.get(
      `${this.endpoint}/getByFilter/${projectId}?size=20&pageNumber=1`
    );
  }
}

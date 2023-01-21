import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private baseUrl = 'http://localhost:3000/file';

  constructor(private http: HttpClient) {}

  upload(file: FormData, id: string): Observable<any> {
    // upload(file: FileItem): Observable<HttpEvent<any>> {
    // const formData: FormData = new FormData();

    // formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}?projectId=${id}`, file).pipe(
      catchError((e: any) => {
        return throwError(() => e);
      })
    );
    // projectId=578dba98-d093-4e81-a8a7-810793d93dba
    // return this.http.post(`${this.baseUrl}/upload`, file)
    // reportProgress: true,
    // responseType: 'json',

    // return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';

export class BaseService<T> {
  apiUrl: string = 'http://localhost:3000/';
  http: HttpClient;

  constructor(private controllerName: string) {
    this.apiUrl = this.apiUrl + controllerName + '/';
    this.http = AppModule.injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(catchError(this.error));
  }

  getById(id: string): Observable<T> {
    let API_URL = `${this.apiUrl}${id}`;
    return this.http.get<T>(API_URL).pipe(catchError(this.error));
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiUrl, data).pipe(catchError(this.error));
  }

  update(id: string, data: T): Observable<T> {
    let API_URL = `${this.apiUrl}${id}`;
    return this.http.put<T>(API_URL, data).pipe(catchError(this.error));
  }

  delete(id: string): Observable<T> {
    let API_URL = `${this.apiUrl}${id}`;
    return this.http.delete<T>(API_URL).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

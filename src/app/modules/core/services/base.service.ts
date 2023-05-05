import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PagingResponse } from 'src/app/shared/dtos/paging-response';
import { environment } from 'src/environments/environment';
import { ListParams } from '../../project/dtos/list-params.dto';

export class BaseService<T> {
  apiUrl: string = '';
  http: HttpClient;

  constructor(private controllerName: string) {
    this.apiUrl = environment.api + this.controllerName;
    this.http = AppModule.injector.get(HttpClient);
  }

  getAll(filters?: ListParams): Observable<PagingResponse<T>> {
    return this.http
      .get<PagingResponse<T>>(`${this.apiUrl}${ListParams.stringify(filters)}`)
      .pipe(catchError(this.error));
  }

  getById(id: string): Observable<T> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.get<T>(API_URL).pipe(catchError(this.error));
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiUrl, data).pipe(catchError(this.error));
  }

  update(id: string, data: T): Observable<T> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.patch<T>(API_URL, data).pipe(catchError(this.error));
  }

  delete(id: string): Observable<T> {
    let API_URL = `${this.apiUrl}/${id}`;
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

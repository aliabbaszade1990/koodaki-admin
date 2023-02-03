import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO, LoginResultDTO } from 'src/app/modules/auth/dtos/auth.dto';

@Injectable()
export class AuthApiService {
  constructor(private http: HttpClient) {}

  endpointBase = 'auth';
  login(model: LoginDTO): Observable<LoginResultDTO> {
    return this.http.post<LoginResultDTO>(
      this.endpointBase + '/login/admin',
      model
    );
  }
}

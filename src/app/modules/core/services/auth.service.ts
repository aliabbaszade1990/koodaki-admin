import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginDTO, LoginResultDTO } from 'src/app/modules/auth/dtos/auth.dto';
import * as store from 'store';
import { AuthApiService } from '../apis/auth-api.service';
import { StorageService } from './storage.service';
@Injectable()
export class AuthService {
  store: any = store;

  constructor(
    private authApi: AuthApiService,
    private storage: StorageService,
    private router: Router
  ) {}

  async login(model: LoginDTO): Promise<LoginResultDTO> {
    const loginResult: LoginResultDTO = await firstValueFrom(
      this.authApi.login(model)
    );
    this.storage.saveAccessToken(loginResult.accessToken);
    this.storage.saveUser(loginResult.user);

    return loginResult;
  }

  logout(): void {
    this.storage.clearAll();
    this.router.navigate(['/sign-in']);
  }
}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthApiService } from './apis/auth-api.service';
import { AuthGuard } from './guards/auth.guard';
import { CoreInterceptor } from './interceptors/core.interceptor';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
      multi: true,
    },
    AuthApiService,
    AuthGuard,
    StorageService,
  ],
})
export class CoreModule {}

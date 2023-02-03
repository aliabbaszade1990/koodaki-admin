import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing';
import { AppComponent } from './app.component';
// import { LuxonModule } from 'luxon-angular';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from './modules/core/core.module';
import { CoreInterceptor } from './modules/core/interceptors/core.interceptor';
import { AuthService } from './modules/core/services/auth.service';
import { AuthState } from './modules/core/_NGXS/auth.state';

// import { LuxonFormatPipe } from './luxon-format.pipe';
// import { LuxonFromNowPipe } from './luxon-from-now.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({ key: 'auth.token' }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;
  constructor(private injector: Injector) {
    AppModule.injector = injector;
  }
}

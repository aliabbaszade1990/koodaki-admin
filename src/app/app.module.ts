import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app-routing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LuxonModule } from 'luxon-angular';
// import { LuxonFormatPipe } from './luxon-format.pipe';
// import { LuxonFromNowPipe } from './luxon-from-now.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    LuxonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;
  constructor(private injector: Injector) {
    AppModule.injector = injector;
  }
}

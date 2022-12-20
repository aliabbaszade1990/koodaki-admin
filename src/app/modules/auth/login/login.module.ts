import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutes } from './login.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatTableModule,
  ],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {}

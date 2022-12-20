import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoute } from './register.routing';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoute),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}

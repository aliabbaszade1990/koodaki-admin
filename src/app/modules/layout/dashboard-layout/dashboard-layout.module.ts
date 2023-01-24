import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DashboardLayoutComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [DashboardLayoutComponent],
})
export class DashboardLayoutModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFilesComponent } from './components/project-files/project-files.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
export const ROUTES: Routes = [
  {
    path: 'list',
    component: ProjectListComponent,
  },
  {
    path: 'list/:id',
    component: ProjectListComponent,
  },
  {
    path: 'files',
    component: ProjectFilesComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}

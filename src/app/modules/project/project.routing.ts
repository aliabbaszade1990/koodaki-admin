import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';

export const ProjectRoute: Routes = [
  {
    path: 'list',
    component: ProjectListComponent,
  },
];

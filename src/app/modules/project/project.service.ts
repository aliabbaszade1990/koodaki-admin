import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { BaseService } from 'src/app/modules/core/services/base.service';
import { IProject } from './dto/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<IProject> {
  constructor() {
    super('project');
  }

  getByCustomerId(id: string) {
    return this.http
      .get<IProject[]>(`${this.apiUrl}getProjectsByCustomer/${id}`)
      .pipe(catchError(this.error));
  }
}

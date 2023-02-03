import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { catchError } from 'rxjs';
=======
>>>>>>> 7db5ecf4b89b2030bdc7f0ec33cdcd0e7a933b39
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

import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { IProject } from './dto/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<IProject> {
  constructor() {
    super('project');
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { IProject } from '../dto/project';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  dataSource: MatTableDataSource<IProject>;
  displayedColumns: string[] = [
    'isClosed',
    'title',
    'location',
    'startDate',
    'endDate',
    'action',
  ];
  disabled = true;
  customerId: string;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerId = this.activateRoute.snapshot.params['customerId'];
    this.getAllProject();
  }

  getAllProject() {
    if (this.customerId) {
      this.projectService
        .getByCustomerId(this.customerId)
        .subscribe((res: IProject[]) => {
          this.dataSource = new MatTableDataSource(res);
        });
    } else {
      this.projectService.getAll().subscribe((res: IProject[]) => {
        this.dataSource = new MatTableDataSource(res);
      });
    }
  }

  createProject() {
    this.dialog.open(ProjectFormComponent, {});
  }

  editProject(row: IProject) {
    this.dialog.open(ProjectFormComponent),
      {
        data: row,
      };
  }

  deleteProject(row: IProject) {
    this.dialog
      .open(ConfirmComponent, {
        data: {
          header: 'حذف پروژه',
          question: `آیا از حذف پروژه ${row.title} مطمئن هستید؟`,
          confirmButton: 'بله',
          cancelButton: 'خیر',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.projectService.delete(row.id).subscribe(() => {
            this.dataSource.data.splice(
              this.dataSource.data.findIndex((item) => item.id === row.id),
              1
            );
            this.dataSource.data = [...this.dataSource.data];
          });
        }
      });
  }
}

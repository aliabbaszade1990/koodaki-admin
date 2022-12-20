import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { IProject } from './dto/project';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  dataSource: MatTableDataSource<IProject>;
  displayedColumns: string[] = [
    'isClosed',
    'title',
    'location',
    'startDate',
    'endDate',
    'action',
  ];
  date = '';
  disabled = true;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAll().subscribe((res: IProject[]) => {
      res.forEach((res: IProject) => {
        this.date = new Date(res.createAt).toLocaleDateString('fa-IR');
      });
      this.dataSource = new MatTableDataSource(res);
      // this.dataSource = new MatTableDataSource<IProject>(res);
    });
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

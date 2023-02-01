import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { IProject } from '../dto/project';
import { ProjectService } from '../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private projectServiceSubscription: Subscription;
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
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.projectServiceSubscription = this.projectService
      .getAll()
      .subscribe((res: IProject[]) => {
        res.forEach((res: IProject) => {
          this.date = new Date(res.createAt).toLocaleDateString('fa-IR');
        });
        this.dataSource = new MatTableDataSource(res);
        this.isLoading = false;
        // this.dataSource = new MatTableDataSource<IProject>(res);
      });
  }

  createProject() {
    this.dialog.open(ProjectFormComponent, {});
  }

  editProject(row: IProject) {
    this.dialog
      .open(ProjectFormComponent, {
        data: row,
      })
      .afterClosed();
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

  uploadProject(row: IProject) {
    this.router.navigate(['upload-file', row.id]);
  }
  ngOnDestroy(): void {
    this.projectServiceSubscription.unsubscribe();
  }
}

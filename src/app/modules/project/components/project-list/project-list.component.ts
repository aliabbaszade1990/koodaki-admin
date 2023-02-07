import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/customer/customer.service';
import { ICustomer } from 'src/app/modules/customer/dto/customer';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ToaterService } from 'src/app/shared/services/toater.service';
import { IProject } from '../../dtos/project';
import { ProjectService } from '../../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'koodaki-project-list',
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
    'action',
  ];
  disabled = true;
  customerId: string;
  firstName: string;
  lastName: string;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toasterService: ToaterService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = this.activateRoute.snapshot.params['id'];
    this.getAllProject();
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getAll().subscribe((res: ICustomer[]) => {
      const customer = res.find(
        (item: ICustomer) => item.id === this.customerId
      );
      this.firstName = customer?.firstName as string;
      this.lastName = customer?.lastName as string;
    });
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
    this.dialog
      .open(ProjectFormComponent, {
        data: { customerId: this.customerId },
      })
      .afterClosed()
      .subscribe((result: IProject) => {
        if (result) {
          this.dataSource.data.push(result);
          this.dataSource.data = [...this.dataSource.data];

          this.toasterService.success(`پروژه ${result.title} ذخیره شد .`);
        }
      });
  }

  onClickEdit(row: IProject) {
    this.dialog
      .open(ProjectFormComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((result: IProject) => {
        if (result) {
          this.dataSource.data.splice(
            this.dataSource.data.findIndex((item) => item.id === result.id),
            1,
            result
          );
          this.dataSource.data = [...this.dataSource.data];
          this.toasterService.success(`پروژه ${result.title} ویرایش شد .`);
        }
      });
  }

  onClickDelete(row: IProject) {
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
      .subscribe((res: boolean) => {
        if (res) {
          this.projectService.delete(row.id).subscribe(() => {
            this.dataSource.data = [
              ...this.dataSource.data.filter((item) => item.id !== row.id),
            ];
            this.toasterService.success(`پروژه ${row.title} حذف شد .`);
          });
        }
      });
  }

  onClickManageFiles(row: IProject) {
    this.router.navigate([`project/${row.id}/files`]);
  }
}

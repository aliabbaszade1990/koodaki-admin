import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/customer/customer.service';
import { ICustomer } from 'src/app/modules/customer/dto/customer';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { PagingResponse } from 'src/app/shared/dtos/paging-response';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IProject } from '../../dtos/project';
import { ProjectListParams } from '../../dtos/project-list-params.dto';
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
    'selectedFile',
    'action',
  ];
  disabled = true;
  customerId: string;
  firstName: string;
  lastName: string;
  showtable: boolean = false;
  loading: boolean = false;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toasterService: NotificationService,
    private customerService: CustomerService,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'تعداد پروژه ها';
  }

  ngOnInit(): void {
    this.customerId = this.activateRoute.snapshot.params['id'];
    this.initializeProjectListParams();
    this.getAllProjects();
    if (this.customerId) this.getCustomer();
  }

  getCustomer() {
    this.customerService
      .getById(this.customerId)
      .subscribe((res: ICustomer) => {
        const customer = res;
        this.firstName = customer?.firstName as string;
        this.lastName = customer?.lastName as string;
      });
  }

  projectListParams: ProjectListParams;
  initializeProjectListParams() {
    this.projectListParams = new ProjectListParams(10, 1, this.customerId);
  }

  getAllProjects() {
    this.loading = true;
    this.projectService
      .getAll(this.projectListParams)
      .subscribe((res: PagingResponse<IProject>) => {
        this.dataSource = new MatTableDataSource(res.items);
        this.loading = false;
        if (res.items.length > 0) {
          this.showtable = true;
        }
      });
  }

  createProject() {
    this.dialog
      .open(ProjectFormComponent, {
        disableClose: true,
        data: { customerId: this.customerId },
      })
      .afterClosed()
      .subscribe((result: IProject) => {
        if (result) {
          this.dataSource.data.push(result);
          this.dataSource.data = [...this.dataSource.data];
          this.showtable = true;
          this.toasterService.success(`پروژه ${result.title} ذخیره شد.`);
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
          this.getAllProjects();
          this.toasterService.success(`پروژه ${result.title} ویرایش شد.`);
        }
      });
  }

  onClickDelete(row: IProject) {
    this.dialog
      .open(ConfirmComponent, {
        disableClose: true,
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
            this.showtable = false;
            this.toasterService.success(`پروژه ${row.title} حذف شد.`);
          });
        }
      });
  }

  onClickManageFiles(row: IProject) {
    this.router.navigate([`project/${row.id}/files`]);
  }
}

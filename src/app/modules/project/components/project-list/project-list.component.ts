import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatePipeArgs } from 'ngx-pagination';
import { debounceTime, startWith } from 'rxjs';
import { CustomerService } from 'src/app/modules/customer/customer.service';
import { ICustomer } from 'src/app/modules/customer/dto/customer';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { PagingResponse } from 'src/app/shared/dtos/paging-response';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IProject } from '../../dtos/project';
import { ProjectListParams } from '../../dtos/project-list-params.dto';
import { ProjectService } from '../../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'koodaki-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: IProject[] = [];
  displayedColumns: string[] = [
    'isClosed',
    'customer',
    'title',
    'location',
    'startDate',
    'totalFiles',
    'selectedFile',
    'finalizedAt',
    'action',
  ];
  paginatorConfig: PaginatePipeArgs = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };
  customerId: string;
  firstName: string;
  lastName: string;
  loading: boolean = false;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toasterService: NotificationService,
    private customerService: CustomerService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.customerId = this.activateRoute.snapshot.params['id'];
    this.initializeProjectListParams();
    if (this.customerId) this.getCustomer();
    this.observeOnSearchFormControl();
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
    this.projectListParams = new ProjectListParams(10, 1, '', this.customerId);
  }

  getAllProjects() {
    this.loading = true;
    this.projectService
      .getAll(this.projectListParams)
      .subscribe((res: PagingResponse<IProject>) => {
        this.projects = res.items;
        this.paginatorConfig.totalItems = res.total;
        this.loading = false;
      });
  }

  onChangeSelectedProjectFilter(event: MatCheckboxChange) {
    this.projects = [];
    this.projectListParams.finalized = event.checked ? true : undefined;
    this.setFirstPageForTableList();
    this.getAllProjects();
  }

  setFirstPageForTableList() {
    this.paginatorConfig.currentPage = 1;
    this.projectListParams.page = 1;
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
          this.projects.push(result);
          this.projects = [...this.projects];
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
            this.projects = [
              ...this.projects.filter((item) => item.id !== row.id),
            ];
            this.toasterService.success(`پروژه ${row.title} حذف شد.`);
          });
        }
      });
  }

  onClickDeleteFiels(row: IProject) {
    this.dialog
      .open(ConfirmComponent, {
        disableClose: true,
        data: {
          header: 'حذف فایلهای پروژه',
          question: `آیا از حذف فایلهای پروژه ${row.title} مطمئن هستید؟`,
          confirmButton: 'بله',
          cancelButton: 'خیر',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.fileService.deleteFilesByProject(row.id).subscribe(() => {
            this.getAllProjects();
            this.toasterService.success(`فایلهای پروژه ${row.title} حذف شد.`);
          });
        }
      });
  }

  searchFormControl = new FormControl(null);
  observeOnSearchFormControl() {
    this.searchFormControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((value) => {
        this.projectListParams.search = value as string;
        this.setFirstPageForTableList();
        this.getAllProjects();
      });
  }

  onPageChanged(page: number) {
    (this.paginatorConfig as PaginatePipeArgs).currentPage = page;
    this.projectListParams.page = page;
    this.getAllProjects();
  }

  onClickManageFiles(row: IProject) {
    this.router.navigate([`project/${row.id}/files`]);
  }
}

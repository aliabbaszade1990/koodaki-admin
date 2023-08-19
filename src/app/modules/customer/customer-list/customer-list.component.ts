import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaginatePipeArgs } from 'ngx-pagination';
import { Subscription, debounceTime, startWith } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { PagingResponse } from 'src/app/shared/dtos/paging-response';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ListParams } from '../../project/dtos/list-params.dto';
import { AddProjectToCustomerComponent } from '../add-project-to-customer/add-project-to-customer.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../dto/customer';

@Component({
  selector: 'koodaki-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private customerServiceSubscription: Subscription;
  customers: ICustomer[] = [];
  loading: boolean = false;
  paginatorConfig: PaginatePipeArgs = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };
  columns = [
    {
      columnDef: 'firstName',
      header: 'نام',
    },
    {
      columnDef: 'lastName',
      header: 'نام خانوادگی',
    },
    {
      columnDef: 'phoneNumber',
      header: 'شماره تماس',
    },
  ];
  displayedColumns: string[] = [
    ...this.columns.map((c) => c.columnDef),
    'action',
  ];

  /**
   *
   */
  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private toasterService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.observeOnSearchFormControl();
  }

  customerListParams = new ListParams();
  getAllCustomer() {
    this.loading = true;
    this.customerServiceSubscription = this.customerService
      .getAll(this.customerListParams)
      .subscribe((res: PagingResponse<ICustomer>) => {
        this.customers = res.items;
        this.paginatorConfig.totalItems = res.total;
        this.loading = false;
      });
  }

  createCustomer() {
    this.dialog
      .open(CustomerFormComponent, { disableClose: true })
      .afterClosed()
      .subscribe((res: ICustomer) => {
        if (res) {
          this.customers.push(res);
          this.customers = [...this.customers];
          this.toasterService.success(
            `کاربر ${res.firstName} ${res.lastName} افزوده شد.`
          );
        }
      });
  }

  editCustomer(row: ICustomer) {
    this.dialog
      .open(CustomerFormComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((res: ICustomer) => {
        if (res) {
          this.customers.splice(
            this.customers.findIndex((item) => item.id === res.id),
            1,
            res
          );
          this.customers = [...this.customers];
          this.toasterService.success(
            `کاربر ${res.firstName} ${res.lastName} ویرایش شد.`
          );
        }
      });
  }

  addProjectToCustomer(row: ICustomer) {
    this.dialog
      .open(AddProjectToCustomerComponent, {
        disableClose: true,
        data: row,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.toasterService.success(
            `پروژه ${result.title} برای ${row.firstName} ${row.lastName} ثبت شد.`
          );
        }
      });
  }

  deleteCustomer(row: ICustomer) {
    this.dialog
      .open(ConfirmComponent, {
        disableClose: true,
        data: {
          header: 'حذف کاربر',
          question: `با حذف مشتری پروژه های مشتری نیز حذف میشود.
          آیا از حذف ${row.firstName} ${row.lastName} مطمئن هستید؟`,
          confirmButton: 'بله',
          cancelButton: 'خیر',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.customerService.delete(row.id).subscribe(() => {
            this.customers = [
              ...this.customers.filter((item) => item.id !== row.id),
            ];
            this.toasterService.success(
              `کاربر ${row.firstName} ${row.lastName} حذف شد.`
            );
          });
        }
      });
  }

  customerProjects(row: ICustomer) {
    this.router.navigate([`/project/list/${row.id}`]);
  }

  searchFormControl = new FormControl(null);
  observeOnSearchFormControl() {
    this.searchFormControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((value) => {
        this.customerListParams.search = value as string;
        this.customerListParams.page = 1;
        this.paginatorConfig.currentPage = 1;
        this.getAllCustomer();
      });
  }

  onPageChanged(page: number) {
    (this.paginatorConfig as PaginatePipeArgs).currentPage = page;
    this.customerListParams.page = page;
    this.getAllCustomer();
  }

  ngOnDestroy(): void {
    this.customerServiceSubscription.unsubscribe();
  }
}

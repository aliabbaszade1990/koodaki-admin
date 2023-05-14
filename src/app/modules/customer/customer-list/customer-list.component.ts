import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { PagingResponse } from 'src/app/shared/dtos/paging-response';
import { ToaterService } from 'src/app/shared/services/toater.service';
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
  dataSource: MatTableDataSource<ICustomer>;
  showtable: boolean = false;
  loading: boolean = false;

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
    private toasterService: ToaterService,
    private router: Router,
    private paginator: MatPaginatorIntl
  ) {
    paginator.itemsPerPageLabel = 'تعداد مشتری';
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  customerListParams = new ListParams();
  getAllCustomer() {
    this.loading = true;
    this.customerServiceSubscription = this.customerService
      .getAll(this.customerListParams)
      .subscribe((res: PagingResponse<ICustomer>) => {
        this.dataSource = new MatTableDataSource(res.items);
        this.loading = false;
        if (res.items.length > 0) {
          this.showtable = true;
        }
      });
  }

  createCustomer() {
    this.dialog
      .open(CustomerFormComponent, { disableClose: true })
      .afterClosed()
      .subscribe((res: ICustomer) => {
        if (res) {
          this.dataSource.data.push(res);
          this.dataSource.data = [...this.dataSource.data];
          this.showtable = true;
          this.toasterService.success(
            `کاربر ${res.firstName} ${res.lastName} ذخیره شد.`
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
          this.dataSource.data.splice(
            this.dataSource.data.findIndex((item) => item.id === res.id),
            1,
            res
          );
          this.dataSource.data = [...this.dataSource.data];
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
            this.dataSource.data = [
              ...this.dataSource.data.filter((item) => item.id !== row.id),
            ];
            this.showtable = false;
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

  ngOnDestroy(): void {
    this.customerServiceSubscription.unsubscribe();
  }
}

import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ToaterService } from 'src/app/shared/services/toater.service';
import { IProject } from '../../project/dto/project';
import { AddProjectToCustomerComponent } from '../add-project-to-customer/add-project-to-customer.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../dto/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private customerServiceSubscription: Subscription;
  dataSource: ICustomer[] = [];
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerServiceSubscription = this.customerService
      .getAll()
      .subscribe((res: ICustomer[]) => {
        this.dataSource = res;
      });
  }

  createCustomer() {
    this.dialog
      .open(CustomerFormComponent, {})
      .afterClosed()
      .subscribe((res: ICustomer) => {
        if (res) {
          this.dataSource.push(res);
          this.dataSource = [...this.dataSource];

          this.toasterService.success(
            `کاربر ${res.firstName} ${res.lastName} ذخیره شد .`
          );
        }
      });
  }

  editCustomer(row: ICustomer) {
    this.dialog
      .open(CustomerFormComponent, {
        data: row,
        // maxWidth: '470px',
      })
      .afterClosed()
      .subscribe((res: ICustomer) => {
        if (res) {
          this.dataSource.splice(
            this.dataSource.findIndex((item) => item.id === res.id),
            1,
            res
          );
          this.dataSource = [...this.dataSource];

          this.toasterService.success(
            `کاربر ${res.firstName} ${res.lastName} ویرایش شد .`
          );
        }
      });
  }

  addProjectToCustomer(row: ICustomer) {
    this.dialog
      .open(AddProjectToCustomerComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((result: IProject) => {
        if (result) {
          this.toasterService.success(
            `پروژه ${result.title} برای ${row.firstName} ${row.lastName} ثبت شد .`
          );
        }
      });
  }

  deleteCustomer(row: ICustomer) {
    this.dialog
      .open(ConfirmComponent, {
        data: {
          header: 'حذف کاربر',
          question: `با حذف مشتری پروژه های مشتری نیز حذف میشود.
          آیااز حذف ${row.firstName} ${row.lastName} مطمئن هستید؟`,
          confirmButton: 'بله',
          cancelButton: 'خیر',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.customerService.delete(row.id).subscribe(() => {
            this.dataSource = [
              ...this.dataSource.filter((item) => item.id !== row.id),
            ];

            this.toasterService.success(
              `کاربر ${row.firstName} ${row.lastName} حذف شد .`
            );
          });
        }
      });
  }

  customerProjects(row: ICustomer) {
    this.router.navigate([`/project/${row.id}`]);
  }

  ngOnDestroy(): void {
    this.customerServiceSubscription.unsubscribe();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerService } from './customer.service';
import { ICustomer } from './dto/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  dataSource: ICustomer[] = [];
  // dataSource = new MatTableDataSource<ICustomer>();
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

  @ViewChild(MatTable) table: MatTable<ICustomer>;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAll().subscribe((res: ICustomer[]) => {
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
          this.table.renderRows();
          this.changeDetectorRefs.detectChanges();
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
          this.dataSource.splice(
            this.dataSource.findIndex((item) => item.id === res.id),
            1,
            res
          );
          this.table.renderRows();
        }
      });
  }

  deleteCustomer(row: ICustomer) {
    this.dialog
      .open(ConfirmComponent, {
        data: {
          header: 'حذف کاربر',
          question: `آیااز حذف کاربر ${row.firstName} ${row.lastName} مطمئن هستید؟`,
          confirmButton: 'بله',
          cancelButton: 'خیر',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.customerService.delete(row.id).subscribe(() => {
            this.dataSource.splice(
              this.dataSource.findIndex((item) => item.id === row.id),
              1
            );
            this.dataSource = [...this.dataSource];
          });
        }
      });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorConfig } from '../interfaces/pagination-config.interface';

@Component({
  selector: 'koodaki-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() config?: PaginatorConfig;
  @Output() clickNext: EventEmitter<number> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<number> = new EventEmitter();

  get totalPages() {
    return this.config ? Math.floor(this.config.total / this.config.size) : 0;
  }

  onClickNext() {
    // (this.config as PaginatorConfig).page =
    //   (this.config as PaginatorConfig).page + 1;
    if (this.config && this.config.hasNext) {
      this.clickNext.emit((this.config as PaginatorConfig).page + 1);
    }
  }

  onClickPrevious() {
    // (this.config as PaginatorConfig).page =
    //   (this.config as PaginatorConfig).page - 1;
    if (this.config && this.config.page > 1) {
      this.clickNext.emit((this.config as PaginatorConfig).page - 1);
    }
  }
}

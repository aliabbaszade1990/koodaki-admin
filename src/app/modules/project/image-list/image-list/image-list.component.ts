import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { GetFileDto } from 'src/app/shared/dtos/get-file.dto';

@Component({
  selector: 'koodaki-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnChanges {
  @Input() list: any[] = [];
  @Output() clickImage: EventEmitter<GetFileDto> = new EventEmitter();
  onClickImage(image: GetFileDto) {
    this.clickImage.emit(image);
  }
  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(): void {
    console.log(this.list);
  }
}

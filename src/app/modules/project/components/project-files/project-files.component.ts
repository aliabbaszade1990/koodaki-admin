import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { filter } from 'rxjs';
import { UploaderComponent } from 'src/app/modules/uploader/uploader.component';
import { GetFileDto } from 'src/app/shared/dtos/get-file.dto';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SubSink } from 'subsink';
import { FileListParams } from '../../dtos/list-params-file.dto';
import { PaginatorConfig } from '../../paginator/interfaces/pagination-config.interface';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'koodaki-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFilesComponent implements OnInit {
  images: GetFileDto[] = [];
  paginatorConfig: PaginatorConfig = {
    total: 0,
    page: 1,
    size: 20,
    hasNext: true,
  };
  currentItem: GetFileDto;
  choosenOnesControl = new FormControl(false);
  uploadProgress: number = 0;
  onClickImage(image: GetFileDto) {
    if (this.currentItem) {
      this.currentItem.isCurrentItem = false;
    }
    this.currentItem = image;
    this.currentItem.isCurrentItem = true;
  }

  uploader: FileUploader = new FileUploader({ url: '' });
  hasBaseDropZoneOver: boolean;
  response: string;
  errorMessage: string;
  allowedMimeType = [
    'image/x-png',
    'image/gif',
    'image/jpeg',
    'image/png',
    'application/x-zip-compressed',
    'application/zip',
  ];
  typeFileZipe = 'application/x-zip-compressed';
  errorMessageMaxSize = 'File size great than 1MB';
  errorMessageWrongType = 'Not allow file format';
  maxFileSize: number = 60 * 1024 * 1024;
  fileHashes: string[] = [];
  showError: boolean = false;
  dataSource: MatTableDataSource<FileItem>;
  displayedColumns: string[] = ['name', 'size', 'progress', 'action'];
  @ViewChild('fileInput') fileInput: any;
  formData: FormData = new FormData();
  projectId: string;
  fileItem: File;
  subsink = new SubSink();

  constructor(
    private fileService: FileService,
    private toasterService: NotificationService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private bottomsheet: MatBottomSheet
  ) {}

  @HostListener('window:keydown.ArrowRight', ['$event'])
  @HostListener('window:keydown.ArrowDown', ['$event'])
  onArrowRightAndBottom() {
    this.onClickNavigationNext();
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  @HostListener('window:keydown.ArrowUp', ['$event'])
  onArrowLeftAndUp() {
    this.onClickNavigationPreviouse();
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };
  }

  fileListParams: FileListParams = new FileListParams('', false, 20);
  ngOnInit(): void {
    this.observeCheckbox();
    this.route.params
      .pipe(filter((params) => !!params['id']))
      .subscribe((params) => {
        this.projectId = params['id'];
        this.fileListParams.projectId = params['id'];
        this.getFiles();
      });
  }

  observeCheckbox() {
    this.choosenOnesControl.valueChanges.subscribe((value) => {
      this.resetFileListParams();
      this.fileListParams.selected = value as boolean;
      this.resetPaginatorConfig();
      this.getFiles();
    });
  }

  resetFileListParams() {
    this.fileListParams = new FileListParams(this.projectId);
    this.fileListParams.size = 20;
  }

  resetPaginatorConfig() {
    this.paginatorConfig = {
      total: 0,
      page: this.fileListParams.page,
      size: this.fileListParams.size,
      hasNext: true,
    };
  }

  openUploader() {
    this.subsink.sink = this.bottomsheet
      .open(UploaderComponent, {
        panelClass: ['ins-bs-panel'],
        disableClose: false,
        data: {
          projectId: this.projectId,
        },
      })
      .afterDismissed()
      .subscribe((result: any) => {
        if (result) {
          this.getFiles();
        }
      });
  }

  getFiles() {
    this.fileService.getAll(this.fileListParams).subscribe((result) => {
      this.images = result.items;

      this.paginatorConfig = {
        ...this.paginatorConfig,
        page: this.fileListParams.page,
        total: result.total,
        hasNext: result.hasNext,
      };

      if (this.images && this.images.length) {
        this.currentItem = this.images[0];
        this.currentItem.isCurrentItem = true;
      }
      this.cd.detectChanges();
    });
  }

  onChangePage(page: number) {
    this.fileListParams.page = page;
    this.scrollTo(0);
    this.getFiles();
  }

  onClickNavigationNext() {
    let indexOfCurrentElement = this.images.indexOf(
      this.images.find((i) => i.isCurrentItem) as GetFileDto
    );
    this.currentItem.isCurrentItem = false;
    let nextEelement = this.images[indexOfCurrentElement + 1];
    this.currentItem = nextEelement || this.images[this.images.length - 1];
    this.currentItem.isCurrentItem = true;

    this.manageScrollingList(indexOfCurrentElement + 1);
    this.resetRotation();
  }

  @ViewChild('imageList') imageList: ElementRef = new ElementRef(null);
  manageScrollingList(index: number, scrollingDown = true) {
    let el = document.getElementById(`${this.images[index]}`);
    this.scrollTo(index * (113 + 12));
  }

  scrollTo(to: number) {
    this.imageList.nativeElement.scrollTop = to;
  }

  onClickNavigationPreviouse() {
    let indexOfCurrentElement = this.images.indexOf(
      this.images.find((i) => i.isCurrentItem) as GetFileDto
    );
    this.currentItem.isCurrentItem = false;
    let previouseEelement = this.images[indexOfCurrentElement - 1];

    this.currentItem = previouseEelement || this.images[0];
    this.currentItem.isCurrentItem = true;

    this.manageScrollingList(indexOfCurrentElement - 1, false);
    this.resetRotation();
  }

  resetRotation() {
    this.rotationDegree = 0;
  }

  @ViewChild('slider') slider: ElementRef = new ElementRef(null);
  @ViewChild('image') image: ElementRef = new ElementRef(null);
  rotationDegree = 0;
  onClickRotate() {
    this.rotationDegree = this.rotationDegree - 90;

    this.renderer.setStyle(
      this.image.nativeElement,
      'transform',
      `rotate(${this.rotationDegree}deg)`
    );

    this.renderer.setStyle(
      this.image.nativeElement,
      'max-width',
      this.imageIsVertical(this.rotationDegree)
        ? `${this.slider.nativeElement.offsetHeight}px`
        : '100%'
    );
  }

  imageIsVertical(degree: number): boolean {
    return degree === -90 || degree === -270;
  }
}

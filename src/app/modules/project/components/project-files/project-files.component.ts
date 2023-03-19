import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { GetFileDto } from 'src/app/shared/dtos/get-file.dto';
import { ToaterService } from 'src/app/shared/services/toater.service';
import { FileListParams } from '../../dtos/list-params-file.dto';
import { PaginatorConfig } from '../../paginator/interfaces/pagination-config.interface';
import { FileService } from '../../services/file.service';

const URL =
  'http://localhost:3000/file?projectId=578dba98-d093-4e81-a8a7-810793d93dba';

@Component({
  selector: 'koodaki-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFilesComponent {
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

  uploader: FileUploader = new FileUploader({ url: URL });
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

  constructor(
    private fileService: FileService,
    private toasterService: ToaterService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private renderer: Renderer2
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
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      this.fileListParams.projectId = params['id'];
      this.getFiles();
    });

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      // headers: [{ name: 'Accept', value: 'application/json' }],
      // allowedFileType: ['image', 'zip'],
      isHTML5: true,
      method: 'POST',
      removeAfterUpload: true,
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeType,

      formatDataFunction: async (item: any) => {
        //  this.onBuildItemForm = (item, form: FormData) => {
        //   file = form.append('files', item._file);
        // };
        // this.uploader.onBuildItemForm = (item, form) => {
        //   form.append('files', item._file);
        // };
        return new Promise((resolve, reject) => {
          // this.uploader.queue.forEach((file) => {
          //   formData.append('files', file._file);
          // });
          // formData.append('formData', item._file.name);
          // files.forEach((file) => formData.append('file', file, file.name));
          resolve({
            // name: item._file.name,
            // length: item._file.size,
            // contentType: item._file.type,
            // lastModified: item._file.lastModified,
            // date: new Date(),
            files: this.formData,
          });
        });
      },
    });

    this.response = '';
    this.uploader.response.subscribe((res) => (this.response = res));
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
    // this.fileListParams.size = 20;
  }

  resetPaginatorConfig() {
    this.paginatorConfig = {
      total: 0,
      page: this.fileListParams.page,
      size: this.fileListParams.size,
      hasNext: true,
    };
  }

  onCompleteItem(item: FileItem, response: any, status: any, headers: any) {
    console.log('ImageUpload:uploaded:', item, status);
  }

  checkTypeFileInArray(type: string): boolean {
    return this.allowedMimeType.includes(type);
  }

  removeFromQueue(item: FileItem) {
    this.uploader.removeFromQueue(item);
  }

  newFormData() {
    this.formData = new FormData();
  }

  appendToFile() {
    this.uploader.queue.forEach((item) => {
      this.formData.append('files', item._file);
    });
  }

  uploadAllFile() {
    this.appendToFile();
    this.uploader.queue.forEach((element: FileItem) => {
      this.uploadFileItem(element);
    });
  }

  setDataSource(
    data: FileItem[]
  ): MatTableDataSource<FileItem, MatTableDataSourcePaginator> {
    return (this.dataSource = new MatTableDataSource(data));
  }

  uploadFileItem(row: FileItem) {
    this.formData.append('files', row._file);
    this.fileService.upload(this.formData, this.projectId).subscribe({
      next: (res) => {
        this.handleUpdate(res, row);
      },
      error: (error) => {
        row.progress = 0;
        this.toasterService.error(error.message);
      },
    });
  }

  handleUpdate(event: HttpEvent<any>, row: FileItem): void {
    switch (event.type) {
      case HttpEventType.Response:
        break;
      case HttpEventType.UploadProgress:
        const percentage = Math.round(
          (100 * event.loaded) / (event.total as number)
        );
        row.progress = percentage;
        this.cd.detectChanges();
        if (
          row.progress === 100 &&
          ((this.images.length < (this.fileListParams as any).size) as any)
        ) {
          this.getFiles();
        }
        if (row.progress === 100) {
          this.removeFromQueue(row);
          this.setDataSource(this.uploader.queue);
          this.cd.detectChanges();
          this.toasterService.success(
            `فایل ${row._file.name} با موفقیت بارگذاری شد.`
          );
        }
        break;
    }
  }

  cancelFile(row: FileItem) {
    this.uploader.cancelItem(row);
  }

  deleteFile(row: FileItem) {
    this.removeFromQueue(row);
    this.setDataSource(this.uploader.queue);
    this.toasterService.success(`فایل ${row._file.name} حذف شد.`);
  }

  onFileSelected(event: File[]) {
    this.removeDuplicatItemFromQueue();
    this.setDataSource(this.uploader.queue);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  removeDuplicatItemFromQueue() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const item = this.uploader.queue.find(
        (item) =>
          item.file.name === this.uploader.queue[i].file.name &&
          this.uploader.queue.indexOf(item) !== i
      );
      if (item) {
        this.removeFromQueue(item);
      }
    }
  }

  checkFileTypeWhenSelectFile() {
    this.uploader.queue.forEach((item) => {
      if (!this.checkTypeFileInArray(item.file.type as string)) {
        this.removeFromQueue(item);
      }
    });
  }

  droppedFile(e: File[]) {
    console.log('droppedFile', e);
    this.removeDuplicatItemFromQueue();
    this.checkFileTypeWhenSelectFile();
    this.setDataSource(this.uploader.queue);
    // this.dataSource = new MatTableDataSource(this.uploader.queue);
    // this.appendToFile();
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

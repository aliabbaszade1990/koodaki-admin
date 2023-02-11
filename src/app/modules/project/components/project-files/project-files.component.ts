import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { finalize, map, tap } from 'rxjs';
import { GetFileDto } from 'src/app/shared/dtos/get-file.dto';
import { ToaterService } from 'src/app/shared/services/toater.service';
import { FilePagingRequset } from '../../dtos/file-paging-request';
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
    total: 1230,
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

  onClickNext(page: number) {
    this.paginatorConfig.page = page;
  }

  onClickPrevious(page: number) {
    this.paginatorConfig.page = page;
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
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };
  }

  filter: FilePagingRequset = {
    page: 1,
    size: 20,
    search: '',
    projectId: '',
  };
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      this.filter.projectId = params['id'];
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

    this.uploader.onErrorItem = (item, response, status, headers) =>
      this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers);
    this.uploader.onCancelItem = (item, response, status, header) =>
      this.onCancelItem(item, response, status, header);

    // this.uploader.onCompleteItem = (
    //   item: any,
    //   response: any,
    //   status: any,
    //   headers: any
    // ) => {
    //   this.onCompleteItem(item, response, status, headers);
    // };
  }

  onCompleteItem(item: FileItem, response: any, status: any, headers: any) {
    console.log('ImageUpload:uploaded:', item, status);
  }

  onSuccessItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    console.log('success');
  }

  onCancelItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    this.cancelFile(item);
    this.fileInput.nativeElement.value = '';
    this.uploader.queue.push(item);
    this.toasterService.info(`بار گذاری فایل ${item._file.name} متوقف شد.`);
  }

  onErrorItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    this.fileInput.nativeElement.value = '';
    this.uploader.queue.push(item);
    // this.dataSource = new MatTableDataSource(this.uploader.queue);
    this.setDataSource(this.uploader.queue);
    this.toasterService.error(
      `بارگذاری فایل ${item._file.name} با خطا مواجه شد.`
    );
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
        if (
          row.progress === 100 &&
          ((this.images.length < (this.filter as any).size) as any)
        ) {
          this.getFiles();
        }
        break;
    }
  }

  cancelFile(row: FileItem) {
    this.uploader.cancelItem(row);
  }

  deleteFile(row: FileItem) {
    this.removeFromQueue(row);
    // this.dataSource = new MatTableDataSource(this.uploader.queue);
    this.setDataSource(this.uploader.queue);
    this.toasterService.success(`فایل ${row._file.name} حذف شد.`);
  }

  onFileSelected(event: File[]) {
    this.removeDuplicatItemFromQueue();
    // this.dataSource = new MatTableDataSource(this.uploader.queue);
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
    this.fileService.getAll(this.filter).subscribe((result) => {
      this.images = result.items;

      if (this.images && this.images.length) {
        this.currentItem = this.images[0];
        this.currentItem.isCurrentItem = true;
      }
    });
  }
}

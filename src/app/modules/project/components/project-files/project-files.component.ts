import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { GetFileDto } from 'src/app/shared/dtos/get-file.dto';
import { FilePagingRequset } from '../../dtos/file-paging-request';
import { PaginatorConfig } from '../../paginator/interfaces/pagination-config.interface';
import { FileService } from '../../services/file.service';

const URL =
  'http://localhost:3000/file?projectId=578dba98-d093-4e81-a8a7-810793d93dba';

@Component({
  selector: 'koodaki-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss'],
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

  onClickImage(image: GetFileDto) {
    this.currentItem.isCurrentItem = false;
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
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      const filters: FilePagingRequset = {
        projectId: this.projectId,
        page: 1,
        size: 20,
      };
      this.getFiles(filters);
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
  }

  onErrorItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    this.fileInput.nativeElement.value = '';
    this.uploader.queue.push(item);
    this.dataSource = new MatTableDataSource(this.uploader.queue);
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
    this.fileService.upload(this.formData, this.projectId).subscribe({
      next: (result) => {
        this.newFormData();
        for (const key in result) {
          if (Object.prototype.hasOwnProperty.call(result, key)) {
            const fileName = result[key];
            this.uploader.queue.forEach((element) => {
              if (element._file.name === fileName.name)
                this.removeFromQueue(element);
              this.dataSource = new MatTableDataSource(this.uploader.queue);
              // alert('upload successfuly!');
            });
          }
        }
      },
      error: (result) => {
        this.newFormData();
        console.log(result.message);
      },
    });
  }

  uploadFileItem(row: FileItem) {
    this.formData.append('files', row._file);
    this.fileService.upload(this.formData, this.projectId).subscribe({
      next: (result) => {
        this.newFormData();
        for (const key in result) {
          if (Object.prototype.hasOwnProperty.call(result, key)) {
            const fileName = result[key];
            if (row._file.name === fileName.name) {
              this.removeFromQueue(row);
              this.dataSource = new MatTableDataSource(this.uploader.queue);
            }
          }
        }
      },
      error: (error) => {
        if (error) console.log(error.message);
        this.newFormData();
      },
    });
  }

  cancelFile(row: FileItem) {
    this.uploader.cancelItem(row);
  }

  deleteFile(row: FileItem) {
    this.removeFromQueue(row);
    this.dataSource = new MatTableDataSource(this.uploader.queue);
  }

  onFileSelected(event: File[]) {
    this.removeDuplicatItemFromQueue();
    this.dataSource = new MatTableDataSource(this.uploader.queue);
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
    this.dataSource = new MatTableDataSource(this.uploader.queue);
    // this.appendToFile();
  }

  getFiles(filters: FilePagingRequset) {
    this.fileService.getAll(filters).subscribe((result) => {
      this.images = result.items;
      this.currentItem = this.images[0];
      this.currentItem.isCurrentItem = true;
    });
  }
}

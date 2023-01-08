import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Duration } from 'luxon';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';
import { IUploadData } from './dto/upload-data';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: URL });
  // fileItem: FileItem = new FileItem(this.uploader, File, FileUploaderOptions)
  hasBaseDropZoneOver: boolean;
  response: string;
  errorMessage: string;
  allowedMimeType = [
    'image/x-png',
    'image/gif',
    'image/jpeg',
    'image/png',
    'application/x-zip-compressed',
  ];
  typeFileZipe = 'application/x-zip-compressed';
  errorMessageMaxSize = 'File size great than 1MB';
  errorMessageWrongType = 'Not allow file format';
  maxFileSize: number = 60 * 1024 * 1024;
  fileHashes: string[] = [];
  showError: boolean = false;

  dataSource: MatTableDataSource<FileItem>;
  displayedColumns: string[] = ['name', 'size', 'progress', 'action'];

  constructor(private fb: FormBuilder) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      headers: [{ name: 'Accept', value: 'application/json' }],
      // allowedFileType: ['image', 'zip'],
      isHTML5: true,
      removeAfterUpload: true,
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeType,
    });

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      console.log(fileItem);
      console.log(progress);
    };
  }

  ngOnInit(): void {}

  checkTypeFileInArray(type: string): boolean {
    return this.allowedMimeType.includes(type);
  }
  uploadFile(row: FileItem) {
    this.uploader.uploadItem(row);
  }
  deleteFile(row: FileItem) {
    this.uploader.removeFromQueue(row);
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
        this.uploader.removeFromQueue(item);
      }
    }
  }

  checkFileTypeWhenSelectFile() {
    this.uploader.queue.forEach((item) => {
      if (!this.checkTypeFileInArray(item.file.type as string)) {
        this.uploader.removeFromQueue(item);
      }
    });
  }

  droppedFile(e: File[]) {
    this.removeDuplicatItemFromQueue();
    this.checkFileTypeWhenSelectFile();
    this.dataSource = new MatTableDataSource(this.uploader.queue);
  }
}

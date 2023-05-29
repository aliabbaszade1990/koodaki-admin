import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SubSink } from 'subsink';
import { FileService } from '../project/services/file.service';

@Component({
  selector: 'koodaki-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit, OnDestroy {
  t = 'upload.';

  config: any = {
    file: {
      accept: 'image/*,.zip,.rar,.7zip',
      regex:
        /^image\/|application\/zip|application\/rar|application\/7zip|zip|rar|7zip/,
    },
  };

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  public get maxSize(): number {
    return 70000;
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      projectId?: string;
    },
    private bottomSheetRef: MatBottomSheetRef,
    private ref: MatBottomSheetRef,
    private notificationService: NotificationService,
    private fileService: FileService
  ) {}

  subsink = new SubSink();
  ngOnInit(): void {}

  tameEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: any): void {
    this.tameEvent(event);
    this.highlight();
  }

  onDragOver(event: any): void {
    this.tameEvent(event);
    this.highlight();
  }

  onDragLeave(event: any): void {
    this.tameEvent(event);
    this.unhighlight();
  }

  onDrop(event: any): void {
    this.tameEvent(event);
    this.unhighlight();
    const { files } = event.dataTransfer;
    this.selectFile(files);
  }

  shouldHighlight = false;
  highlight(): void {
    this.shouldHighlight = true;
  }

  unhighlight(): void {
    this.shouldHighlight = false;
  }

  browseFiles(): void {
    this.fileInput?.nativeElement.click();
  }

  close(): void {
    this.ref.dismiss();
  }

  files: FileList;
  selectedFile: File | null = null;
  async selectFile(event: any): Promise<void> {
    this.selectedFile = null;

    if (event.type != 'change') {
      this.files = event;
    } else {
      this.files = event.target.files;
    }

    this.selectedFile = this.files && this.files[0] ? this.files[0] : null;

    if (this.selectedFile) {
      try {
        await this.validateFile(this.selectedFile);
        await this.uploadFile(this.selectedFile);
      } catch (error: any) {
        this.handleError(error);
      }
    }
  }

  uploadSubscription: Subscription;
  async uploadFile(file: File): Promise<void> {
    this.uploadSubscription = this.fileService
      .upload(file, this.data?.projectId as string)
      .subscribe({
        next: (response: any) => this.handleUpdate(response),
        error: (error: any) => this.handleError(error),
        complete: () => this.onCompleted(),
      });
  }

  onCancelUploading(event: MouseEvent) {
    event.stopPropagation();
    this.uploadSubscription.unsubscribe();
  }

  async validateFile(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.runSizeValidation(file);
        this.runTypeValidation(file);
      } catch (error) {
        reject(error);
      }

      resolve(true);
    });
  }

  runSizeValidation(file: File): boolean {
    const sizeValidated = this.maxSize >= file.size / 1024;

    if (!sizeValidated) {
      throw new Error('اندازه فایل بیشتر از حد مجاز است');
    } else {
      return sizeValidated;
    }
  }

  runTypeValidation(file: File): boolean {
    const typeValidated = this.config['file'].regex.test(file.type);

    if (!typeValidated) {
      throw new Error('نوع فایل معتبر نیست');
    }

    return typeValidated;
  }

  uploadPercentage$ = new BehaviorSubject(0);
  handleUpdate(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.Response:
        this.ref.dismiss(event.body);
        break;
      case HttpEventType.UploadProgress:
        const percentage = Math.round(
          (100 * event.loaded) / (event.total as number)
        );
        this.uploadPercentage$.next(percentage);
        break;
    }
  }

  handleError(error: Error): void {
    this.ref.disableClose = false;
    this.uploadPercentage$.next(0);

    this.notificationService.error(error.message);
  }

  onCompleted(): void {
    this.uploadPercentage$.next(0);
    this.ref.disableClose = false;
    this.notificationService.success('فایل با موفقیت بارگذاری شد');
    this.bottomSheetRef.dismiss(true);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}

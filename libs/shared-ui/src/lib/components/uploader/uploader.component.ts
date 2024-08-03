import { Component, ElementRef, ViewChild, signal } from '@angular/core';

import { CloudinaryService } from '@ai-photo-playground/shared/data-access';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, catchError } from 'rxjs';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'shared-ui-uploader',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  providers: [CloudinaryService],
})
export class UploaderComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('slider') sliderRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  restoredPhotoUrl = signal<string | null>(null);
  originalImageUrl = signal<string | null>(null);

  isLoading = signal<boolean>(false);
  sliderPosition = signal<number>(50);
  errorMessage = signal<string | null>(null);

  constructor(private cloudinaryService: CloudinaryService) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0] || null;
    const hasSelectedFile = this.selectedFile();
    if (hasSelectedFile) {
      this.clearImage(event);
    }
    if (file) {
      this.selectedFile.set(file);
      this.loadPreviewImage(file);
    }
  }

  loadPreviewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl.set(e.target?.result as string);
      this.scrollToBottom();
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile.set(event.dataTransfer.files[0]);
      this.previewFile(event.dataTransfer.files[0]);
      this.scrollToBottom();
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  clearImage(event: Event): void {
    event.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.restoredPhotoUrl.set(null);
    this.isLoading.set(false);
    this.sliderPosition.set(50);
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit(): void {
    const selectedFile = this.selectedFile();
    if (selectedFile) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.cloudinaryService
        .uploadImage(selectedFile)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.errorMessage.set('Failed to upload image. Please try again.');
            this.isLoading.set(false);
            return EMPTY;
          })
        )
        .subscribe((originalUrl: string) => {
          console.log(originalUrl);
          // this.originalImageUrl.set(originalUrl);
          this.isLoading.set(false);
        });
    }
  }

  private initSlider() {
    if (!this.sliderRef) return;

    const slider = this.sliderRef.nativeElement;
    let isDragging = false;

    const moveSlider = (x: number) => {
      const rect = slider.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      position = Math.max(0, Math.min(position, 100));
      this.sliderPosition.set(position);
    };

    const startDragging = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      moveSlider(e.clientX);
    };

    const stopDragging = () => {
      isDragging = false;
    };

    slider.addEventListener('mousedown', startDragging as EventListener);
    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        moveSlider(e.clientX);
      }
    });
    window.addEventListener('mouseup', stopDragging);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.scrollContainer.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }, 250);
  }
}

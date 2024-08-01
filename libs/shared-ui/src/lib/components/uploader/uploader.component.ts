import { Component, ElementRef, ViewChild, signal } from '@angular/core';

import { RestorePhotoService } from '@ai-photo-playground/shared/data-access';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'shared-ui-uploader',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  providers: [RestorePhotoService],
})
export class UploaderComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('slider') sliderRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  restoredPhotoUrl = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  sliderPosition = signal<number>(50);

  constructor(private restorePhotoService: RestorePhotoService) {}
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
      this.restorePhotoService.restorePhoto(selectedFile).subscribe({
        next: (restoredPhoto: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setTimeout(() => {
              this.restoredPhotoUrl.set(reader.result as string);
              this.scrollToBottom();
              this.isLoading.set(false);
              setTimeout(() => this.initSlider(), 0);
            }, 5000);
          };
          reader.readAsDataURL(restoredPhoto);
        },
        error: (error) => {
          console.error('Error restoring photo:', error);
          // Handle error, e.g., show error message to user
        },
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

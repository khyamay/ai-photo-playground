import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'shared-ui-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
      this.previewFile(input.files[0]);
      this.scrollToBottom();
    }
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
  }

  onSubmit(): void {
    if (this.selectedFile()) {
      console.log('File uploaded:', this.selectedFile());
      // Here you would typically call a service to handle the file upload
    }
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

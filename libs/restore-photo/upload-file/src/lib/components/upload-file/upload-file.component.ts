import { UploaderComponent } from '@ai-photo-playground/shared-ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'restore-photo-upload-file',
  standalone: true,
  imports: [UploaderComponent],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileComponent {}

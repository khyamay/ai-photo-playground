import { UploadFileComponent } from '@ai-photo-playground/restore-photo/upload-file';
import { Route } from '@angular/router';
import { ShellComponent } from '../components/shell.component';

export const RESTORE_PHOTO_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full',
      },
      {
        path: 'upload',
        component: UploadFileComponent,
      },
    ],
  },
];

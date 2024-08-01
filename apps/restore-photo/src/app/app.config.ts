import { RESTORE_PHOTO_ROUTES } from '@ai-photo-playground/restore-photo/shell';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(RESTORE_PHOTO_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

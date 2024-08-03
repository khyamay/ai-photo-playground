import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';

import { environment } from '@ai-photo-playground/shared/environments';
import { CloudinaryResponse, CloudinarySignature } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  protected base = 'cloudinary/signature';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    return this.getSignature().pipe(
      switchMap((signature) => this.uploadToCloudinary(file, signature))
    );
  }

  private getSignature(): Observable<CloudinarySignature> {
    return this.http
      .get<CloudinarySignature>(`${environment.apiUrl}/${this.base}`)
      .pipe(
        catchError((error) => {
          console.error('Error getting signature:', error);
          return throwError(() => new Error('Failed to get signature'));
        })
      );
  }

  private uploadToCloudinary(
    file: File,
    signature: CloudinarySignature
  ): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', environment.cloudinary.apiKey);
    formData.append('folder', environment.cloudinary.folder);
    formData.append('signature', signature.signature);
    formData.append('timestamp', signature.timestamp.toString());
    return this.http
      .post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`,
        formData
      )
      .pipe(map((response) => response.secure_url));
  }
}

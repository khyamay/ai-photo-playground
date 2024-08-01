import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@ai-photo-playground/shared/environments';

@Injectable({
  providedIn: 'root',
})
export class RestorePhotoService {
  protected base = 'photo/upload';

  constructor(private http: HttpClient) {}

  restorePhoto(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.post(`${environment.apiUrl}/${this.base}`, formData, {
      responseType: 'blob',
    });
  }
}

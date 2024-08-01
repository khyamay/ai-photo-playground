import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestorePhotoService {
  private apiUrl = 'http://localhost:3333/api/photo/upload'; // temp replace this with env

  constructor(private http: HttpClient) {}

  restorePhoto(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.post(this.apiUrl, formData, { responseType: 'blob' });
  }
}

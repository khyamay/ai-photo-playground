import { environment } from '@ai-photo-playground/shared/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplicateService {
  protected base = `replicate/restore`;

  constructor(private http: HttpClient) {}

  restoreImage(imageUrl: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/${this.base}`, {
      imageUrl,
    });
  }
}

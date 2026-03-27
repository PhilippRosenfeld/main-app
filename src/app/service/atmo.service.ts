import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtmoService {
  private apiUrl = 'http://localhost:8080/atmo';

  constructor(private http: HttpClient) {}

  getLatest(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAll(limit: number = 50): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?limit=${limit}`);
  }


}

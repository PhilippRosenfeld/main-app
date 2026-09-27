import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from './api';

export interface AtmoReading {
  temp: number;
  humidity: number;
  pressure: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class AtmoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE}/atmo`;

  getLatest(): Observable<AtmoReading> {
    return this.http.get<AtmoReading>(this.apiUrl);
  }

  getAll(limit: number = 50): Observable<AtmoReading[]> {
    return this.http.get<AtmoReading[]>(`${this.apiUrl}/all?limit=${limit}`);
  }
}

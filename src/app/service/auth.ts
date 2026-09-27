import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE } from './api';

export interface LoginResponse {
  token: string;
  role: string;
}

const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const USER_KEY = 'username';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly loginUrl = `${API_BASE}/auth/login`;

  private readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly role = signal<string | null>(localStorage.getItem(ROLE_KEY));
  readonly username = signal<string | null>(localStorage.getItem(USER_KEY));

  readonly isLoggedIn = computed(() => this.token() !== null);
  readonly isAdmin = computed(() => this.isLoggedIn() && this.role() === 'ROLE_ADMIN');
  readonly isGuest = computed(() => this.isLoggedIn() && this.role() === 'ROLE_GUEST');

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(ROLE_KEY, response.role);
        localStorage.setItem(USER_KEY, username);
        this.token.set(response.token);
        this.role.set(response.role);
        this.username.set(username);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.role.set(null);
    this.username.set(null);
  }

  /** Returns the token if present and not expired; clears the session otherwise. */
  getToken(): string | null {
    const token = this.token();
    if (token && isExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  hasValidSession(): boolean {
    return this.getToken() !== null;
  }
}

/** Best-effort JWT expiry check; non-JWT tokens are treated as non-expiring. */
function isExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return false;
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.exp === 'number' && json.exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

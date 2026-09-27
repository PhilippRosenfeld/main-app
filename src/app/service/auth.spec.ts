import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { AuthService } from './auth';
import { authGuard } from './auth.guard';
import { authInterceptor } from './auth.interceptor';
import { API_BASE } from './api';

function jwt(payload: object): string {
  return `header.${btoa(JSON.stringify(payload))}.signature`;
}

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', children: [] }]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => localStorage.clear());

  it('stores the session on login and clears it on logout', () => {
    const auth = TestBed.inject(AuthService);
    const http = TestBed.inject(HttpTestingController);

    auth.login('philipp', 'secret').subscribe();
    http.expectOne(auth.loginUrl).flush({ token: 'abc', role: 'ROLE_ADMIN' });

    expect(auth.isLoggedIn()).toBe(true);
    expect(auth.isAdmin()).toBe(true);
    expect(auth.username()).toBe('philipp');

    auth.logout();
    expect(auth.isLoggedIn()).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('treats an expired JWT as no session', () => {
    localStorage.setItem('token', jwt({ exp: Math.floor(Date.now() / 1000) - 60 }));
    const auth = TestBed.inject(AuthService);

    expect(auth.hasValidSession()).toBe(false);
    expect(auth.isLoggedIn()).toBe(false);
  });

  describe('authGuard', () => {
    const state = { url: '/panopsys/atmo' } as RouterStateSnapshot;
    const route = {} as ActivatedRouteSnapshot;

    it('redirects to login with the return url when signed out', () => {
      const result = TestBed.runInInjectionContext(() => authGuard(route, state)) as UrlTree;
      expect(result.toString()).toBe('/login?returnUrl=%2Fpanopsys%2Fatmo');
    });

    it('allows access with a valid session', () => {
      localStorage.setItem('token', jwt({ exp: Math.floor(Date.now() / 1000) + 3600 }));
      expect(TestBed.runInInjectionContext(() => authGuard(route, state))).toBe(true);
    });
  });

  describe('authInterceptor', () => {
    beforeEach(() => localStorage.setItem('token', 'abc'));

    it('attaches the token to API requests only', () => {
      const client = TestBed.inject(HttpClient);
      const http = TestBed.inject(HttpTestingController);

      client.get(`${API_BASE}/atmo`).subscribe();
      client.get('https://example.com/data').subscribe();

      expect(http.expectOne(`${API_BASE}/atmo`).request.headers.get('Authorization')).toBe('Bearer abc');
      expect(http.expectOne('https://example.com/data').request.headers.has('Authorization')).toBe(false);
    });

    it('signs out when the API answers 401', () => {
      const client = TestBed.inject(HttpClient);
      const http = TestBed.inject(HttpTestingController);
      const auth = TestBed.inject(AuthService);

      client.get(`${API_BASE}/atmo`).subscribe({ error: () => undefined });
      http.expectOne(`${API_BASE}/atmo`).flush(null, { status: 401, statusText: 'Unauthorized' });

      expect(auth.isLoggedIn()).toBe(false);
    });
  });
});

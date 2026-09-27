import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { AuthService } from '../../service/auth';
import { LoginComponent } from './login-component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let navigateByUrl: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: { hasValidSession: () => false, login: () => of({ token: 't', role: 'ROLE_ADMIN' }) },
        },
      ],
    }).compileComponents();

    navigateByUrl = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true) as never;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  function submitWith(returnUrl: string): void {
    fixture.componentRef.setInput('returnUrl', returnUrl);
    fixture.detectChanges();
    component.username = 'philipp';
    component.password = 'secret';
    component.login();
  }

  it('returns to the requested page after sign in', () => {
    submitWith('/panopsys/atmo');
    expect(navigateByUrl).toHaveBeenCalledWith('/panopsys/atmo');
  });

  it('refuses to redirect to another origin', () => {
    submitWith('//evil.example.com');
    expect(navigateByUrl).toHaveBeenCalledWith('/');
  });
});

import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth';
import { LeviathanCrossComponent } from '../leviathan-cross/leviathan-cross';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LeviathanCrossComponent],
  templateUrl: './login-component.html',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /** Bound from the `returnUrl` query param. */
  readonly returnUrl = input<string>();

  username = '';
  password = '';
  protected readonly showPassword = signal(false);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  ngOnInit(): void {
    if (this.authService.hasValidSession()) {
      this.router.navigateByUrl(this.safeReturnUrl());
    }
  }

  login(): void {
    if (this.loading() || !this.username || !this.password) return;

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.password = '';
        this.router.navigateByUrl(this.safeReturnUrl());
      },
      error: (err: unknown) => {
        this.loading.set(false);
        const status = err instanceof HttpErrorResponse ? err.status : 0;
        this.error.set(
          status === 401 || status === 403
            ? 'Invalid username or password.'
            : 'Could not reach the server. Please try again.',
        );
      },
    });
  }

  /** Only allow same-app relative paths to prevent open redirects. */
  private safeReturnUrl(): string {
    const url = this.returnUrl();
    return url && url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\') ? url : '/';
  }
}

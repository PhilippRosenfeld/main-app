import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-component.html',
})
export class HomeComponent {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
}

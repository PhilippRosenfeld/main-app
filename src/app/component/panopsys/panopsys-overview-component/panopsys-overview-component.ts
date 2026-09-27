import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../service/theme.service';

@Component({
  selector: 'app-panopsys-overview-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panopsys-overview-component.html',
})
export class PanopsysOverviewComponent {
  protected readonly theme = inject(ThemeService);
}

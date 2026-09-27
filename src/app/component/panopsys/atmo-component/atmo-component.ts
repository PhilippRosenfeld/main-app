import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EMPTY, catchError, switchMap, timer } from 'rxjs';
import { AtmoReading, AtmoService } from '../../../service/atmo.service';
import { AtmoChartComponent } from '../atmo-chart.component/atmo-chart.component';

@Component({
  selector: 'app-atmo',
  standalone: true,
  imports: [AtmoChartComponent, RouterLink],
  templateUrl: './atmo-component.html',
})
export class AtmoComponent implements OnInit {
  private readonly atmoService = inject(AtmoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly atmo = signal<AtmoReading | null>(null);
  protected readonly failed = signal(false);
  protected readonly timeInfo = computed(() => {
    const ts = this.atmo()?.timestamp;
    return ts ? new Date(ts).toLocaleString('de-AT') : '–';
  });

  ngOnInit(): void {
    timer(0, 60000)
      .pipe(
        switchMap(() =>
          this.atmoService.getLatest().pipe(
            catchError(() => {
              this.failed.set(true);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => {
        this.atmo.set(data);
        this.failed.set(false);
      });
  }
}

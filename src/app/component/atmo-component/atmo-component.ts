import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer, switchMap } from 'rxjs';
import { AtmoService } from '../../service/atmo.service';
import {AtmoChartComponent} from '../atmo-chart.component/atmo-chart.component';

@Component({
  selector: 'app-atmo',
  standalone: true,
  imports: [CommonModule, AtmoChartComponent],
  templateUrl: './atmo-component.html'
})
export class AtmoComponent implements OnInit, OnDestroy {
  atmo: { temp: number, pressure: number, humidity: number } | null = null;
  timeInfo: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private atmoService: AtmoService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.atmoService.getLatest())
    ).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.atmo = data;
          this.timeInfo = data.timestamp
            ? new Date(data.timestamp).toLocaleString('de-AT')
            : '-';
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

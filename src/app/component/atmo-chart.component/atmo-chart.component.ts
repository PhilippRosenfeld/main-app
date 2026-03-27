import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer, switchMap } from 'rxjs';
import { AtmoService } from '../../service/atmo.service';
import Chart from 'chart.js/auto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-atmo-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atmo-chart.component.html'
})
export class AtmoChartComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  private chart!: Chart;
  private subscription: Subscription = new Subscription();
  private data: any[] = [];

  limit: number = 50;
  showTemp: boolean = true;
  showHumidity: boolean = false;
  showPressure: boolean = false;

  constructor(private atmoService: AtmoService, private zone: NgZone) {}

  ngOnInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
        scales: {
          x: { ticks: { maxTicksLimit: 6 } }
        },
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.atmoService.getAll(this.limit))
    ).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.data = data.reverse();
          this.updateChart();
        });
      },
      error: (err) => console.error(err)
    });
  }

  updateChart(): void {
    const labels = this.data.map((d: any) =>
      new Date(d.timestamp).toLocaleTimeString('de-AT')
    );

    const datasets = [];

    if (this.showTemp) datasets.push({
      label: 'Temperatur °C',
      data: this.data.map((d: any) => d.temp),
      borderColor: '#1D9E75',
      tension: 0,
      fill: false
    });

    if (this.showHumidity) datasets.push({
      label: 'Luftfeuchtigkeit %',
      data: this.data.map((d: any) => d.humidity),
      borderColor: '#378ADD',
      tension: 0,
      fill: false
    });

    if (this.showPressure) datasets.push({
      label: 'Luftdruck hPa',
      data: this.data.map((d: any) => d.pressure),
      borderColor: '#D85A30',
      tension: 0,
      fill: false
    });

    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets;
    this.chart.update('none');
  }

  onLimitChange(event: any): void {
    this.limit = parseInt(event.target.value);
    this.atmoService.getAll(this.limit).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.data = data.reverse();
          this.updateChart();
        });
      },
      error: (err) => console.error(err)
    });
  }

  onToggle(): void {
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.chart.destroy();
  }
}

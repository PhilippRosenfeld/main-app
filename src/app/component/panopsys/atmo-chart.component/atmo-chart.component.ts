import { Component, ElementRef, OnDestroy, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, switchMap, timer } from 'rxjs';
import Chart, { ChartDataset, ScriptableContext } from 'chart.js/auto';
import { AtmoReading, AtmoService } from '../../../service/atmo.service';
import { ThemeService } from '../../../service/theme.service';

type SeriesKey = 'temp' | 'humidity' | 'pressure';

interface Series {
  key: SeriesKey;
  label: string;
  unit: string;
  colorVar: string;
  axis: string;
}

const SERIES: Series[] = [
  { key: 'temp', label: 'Temperatur', unit: '°C', colorVar: '--chart-1', axis: 'yTemp' },
  { key: 'humidity', label: 'Luftfeuchtigkeit', unit: '%', colorVar: '--chart-2', axis: 'yHum' },
  { key: 'pressure', label: 'Luftdruck', unit: 'hPa', colorVar: '--chart-3', axis: 'yPres' },
];

@Component({
  selector: 'app-atmo-chart',
  standalone: true,
  templateUrl: './atmo-chart.component.html',
})
export class AtmoChartComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private readonly atmoService = inject(AtmoService);
  private readonly theme = inject(ThemeService);
  private chart?: Chart<'line'>;
  private data: AtmoReading[] = [];

  protected readonly series = SERIES;
  protected readonly limits = [10, 50, 100, 250, 1000, 10000];
  protected readonly limit = signal(50);
  protected readonly visible = signal<Record<SeriesKey, boolean>>({ temp: true, humidity: false, pressure: false });
  protected readonly failed = signal(false);

  constructor() {
    toObservable(this.limit)
      .pipe(
        switchMap((limit) =>
          timer(0, 60000).pipe(
            switchMap(() =>
              this.atmoService.getAll(limit).pipe(
                catchError(() => {
                  this.failed.set(true);
                  return EMPTY;
                }),
              ),
            ),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((data) => {
        this.failed.set(false);
        this.data = [...data].reverse();
        this.updateChart();
      });

    effect(() => {
      this.theme.resolved();
      this.theme.style();
      this.applyTheme();
      this.updateChart();
    });
  }

  ngOnInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { ticks: { maxTicksLimit: 6 }, grid: { display: false }, border: { display: false } },
          yTemp: { type: 'linear', position: 'left', display: 'auto', border: { display: false } },
          yHum: { type: 'linear', position: 'right', display: 'auto', border: { display: false }, grid: { drawOnChartArea: false } },
          yPres: { type: 'linear', position: 'right', display: 'auto', border: { display: false }, grid: { drawOnChartArea: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: { padding: 10, cornerRadius: 2, boxPadding: 4 },
        },
      },
    });
    this.applyTheme();
    this.updateChart();
  }

  protected toggle(key: SeriesKey): void {
    this.visible.update((v) => ({ ...v, [key]: !v[key] }));
    this.updateChart();
  }

  protected onLimitChange(event: Event): void {
    this.limit.set(Number((event.target as HTMLSelectElement).value));
  }

  private updateChart(): void {
    if (!this.chart) return;

    const visible = this.visible();
    this.chart.data.labels = this.data.map((d) => new Date(d.timestamp).toLocaleTimeString('de-AT'));
    this.chart.data.datasets = SERIES.filter((s) => visible[s.key]).map((s) => this.dataset(s));
    this.chart.update('none');
  }

  private dataset(s: Series): ChartDataset<'line'> {
    const color = token(s.colorVar);
    return {
      label: `${s.label} ${s.unit}`,
      data: this.data.map((d) => d[s.key]),
      yAxisID: s.axis,
      borderColor: color,
      borderWidth: 1.5,
      pointRadius: this.data.length > 30 ? 0 : 3,
      pointBackgroundColor: color,
      pointHoverRadius: 5,
      tension: 0.3,
      fill: 'start',
      backgroundColor: (ctx: ScriptableContext<'line'>) => {
        const area = ctx.chart.chartArea;
        if (!area || !color.startsWith('#')) return 'transparent';
        const gradient = ctx.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
        gradient.addColorStop(0, `${color}40`);
        gradient.addColorStop(1, `${color}00`);
        return gradient;
      },
    };
  }

  private applyTheme(): void {
    if (!this.chart) return;

    const text = token('--muted');
    const grid = token('--rule');
    const font = { family: token('--font-num') };
    const scales = this.chart.options.scales ?? {};

    for (const scale of Object.values(scales)) {
      if (!scale) continue;
      scale.ticks = { ...scale.ticks, color: text, font };
      if ('grid' in scale) {
        scale.grid = { ...scale.grid, color: grid };
      }
    }

    const tooltip = this.chart.options.plugins?.tooltip;
    if (tooltip) {
      tooltip.backgroundColor = token('--surface');
      tooltip.titleColor = token('--text');
      tooltip.bodyColor = text;
      tooltip.borderColor = token('--rule-strong');
      tooltip.borderWidth = 1;
      tooltip.titleFont = font;
      tooltip.bodyFont = font;
    }

    this.chart.update('none');
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}

function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

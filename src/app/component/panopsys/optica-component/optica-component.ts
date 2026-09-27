import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-optica-component',
  imports: [RouterLink],
  templateUrl: './optica-component.html',
})
export class OpticaComponent {
  protected readonly planned = [
    { icon: 'bi-brightness-high', title: 'Lichtlevel', text: 'Wann und wie stark — als Liniendiagramm.' },
    { icon: 'bi-camera-video', title: 'Kamerafeed', text: 'Live-Stream oder Einzelbilder.' },
    { icon: 'bi-door-open', title: 'Bewegungssensor', text: 'Tür-Events mit Zeitstempel.' },
  ];
}

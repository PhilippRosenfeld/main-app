import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-panopsys-main-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './panopsys-main-component.html',
  styleUrl: './panopsys-main-component.css',
})
export class PanopsysMainComponent {}

import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-panopsys-main-component',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './panopsys-main-component.html',
  styleUrl: './panopsys-main-component.css',
})
export class PanopsysMainComponent {}

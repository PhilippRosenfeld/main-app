import { RouterLink } from '@angular/router';
import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-component.html'
})
export class HomeComponent {}

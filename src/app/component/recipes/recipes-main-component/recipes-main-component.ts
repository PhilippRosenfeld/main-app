import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, RECIPES } from '../recipes.list';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes-main-component.html',
})
export class RecipesListComponent {
  categories: Category[] = RECIPES;
}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-template',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-template.component.html',
})
export class RecipeTemplateComponent {
  @Input() recipe!: RecipeModel;
}

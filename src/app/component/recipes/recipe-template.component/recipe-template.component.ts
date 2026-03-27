import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-template',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-template.component.html',
})
export class RecipeTemplateComponent {
  @Input() recipe!: RecipeModel;
}

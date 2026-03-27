import { Component } from '@angular/core';
import { RecipeTemplateComponent } from '../recipe-template.component/recipe-template.component';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-gugelhupf',
  standalone: true,
  imports: [RecipeTemplateComponent],
  template: `<app-recipe-template [recipe]="recipe"></app-recipe-template>`,
})
export class GugelhupfComponent {
  recipe: RecipeModel = {
    name: 'Gugelhupf',
    category: 'Baking',
    description: '',
    image: 'assets/gugelhupf.jpg',
    prepTime: '20 min',
    cookTime: '35 min',
    difficulty: 'Einfach',
    portions: 16,
    ingredients: [
      { name: 'Schokolade', amount: '200g' },
      { name: 'Butter', amount: '100g' },
      { name: 'Eier', amount: '3 Stück' },
      { name: 'Zucker', amount: '200g' },
      { name: 'Mehl', amount: '100g' },
    ],
    steps: [
      'Schokolade und Butter im Wasserbad schmelzen.',
      'Eier und Zucker schaumig schlagen.',
      'Schokoladenmasse einrühren, Mehl unterheben.',
      'Bei 175°C 35 Minuten backen.',
    ],
    nutrition: { calories: 220, fat: 12, carbs: 28, protein: 3 },
  };
}

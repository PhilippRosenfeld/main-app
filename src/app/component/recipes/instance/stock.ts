import { Component } from '@angular/core';
import { RecipeTemplateComponent } from '../recipe-template.component/recipe-template.component';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-Stock',
  standalone: true,
  imports: [RecipeTemplateComponent],
  template: `<app-recipe-template [recipe]="recipe"></app-recipe-template>`,
})
export class StockComponent {
  recipe: RecipeModel = {
    name: 'Suppe',
    category: 'Cooking',
    description: '',
    image: 'assets/stock.jpg',
    prepTime: '10min',
    cookTime: '1-3h',
    difficulty: 'Simple',
    portions: 4,
    ingredients: [
      { name: 'Onion', amount: '1 pc' },
      { name: 'Carrot', amount: '1-2 pcs' },
      { name: 'Celery', amount: '1-2 stalks' },
      { name: 'Garlic', amount: '1 clove' },
      { name: 'Bay leaves', amount: '1-2 pcs' },
      { name: 'Peppercorns', amount: 'A few' },
      { name: 'Water', amount: '1.5-2L' },
      { name: 'Parsley stalks', amount: 'A few' },
    ],
    optionalIngredients: [
      { name: 'Thyme', amount: 'A sprig' },
      { name: 'Lovage', amount: 'A bit' },
      { name: 'Allspice', amount: 'A bit' },
      { name: 'Chicken parts', amount: '500g-1kg' },
      { name: 'Beef, soup meat', amount: '500g-1kg' },
      { name: 'Beef marrow', amount: '3 pcs' },
    ],
    steps: [
      'Roughly chop the onion, carrot & celery, crush the garlic. If using chicken, no need to peel anything.',
      'Sear the vegetables (and meat if used) in a large pot. Deglaze with cold water and bring slowly to a simmer, skimming off any foam that rises to the top.',
      'Add the bay leaves, peppercorns & optional herbs, then let it simmer gently, uncovered, for 1-3h.',
      'Season with salt to taste. Let it cool before storing, or use it right away.',
    ],
    nutrition: { calories: 620, fat: 50, carbs: 5, protein: 35 },
  };
}

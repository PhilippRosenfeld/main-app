import { Component } from '@angular/core';
import { RecipeTemplateComponent } from '../recipe-template.component/recipe-template.component';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-Senfgemuese',
  standalone: true,
  imports: [RecipeTemplateComponent],
  template: `<app-recipe-template [recipe]="recipe"></app-recipe-template>`,
})
export class SenfgemueseComponent {
  recipe: RecipeModel = {
    name: 'Senfgemüse',
    category: 'Cooking',
    description: '',
    image: 'assets/senfgemuese.jpg',
    prepTime: '30 min',
    cookTime: '45 min',
    difficulty: 'Simple',
    portions: 2,
    ingredients: [
      { name: 'Salmon', amount: '300g' },
      { name: 'Potatoes', amount: '3-4 small ones' },
      { name: 'Onion', amount: '1 big one' },
      { name: 'Zucchini', amount: '1/2 piece' },
      { name: 'Aubergine', amount: '1/4 - 1/2 pcs' },
      { name: 'Carrot', amount: '1-2 pcs' },
      { name: 'Vegetable oil', amount: '25-50ml' },
      { name: '(Dijon/Estragon/English) Mustard', amount: '100g' },
      { name: 'Tomato paste', amount: '1 tablespoon' },
      { name: 'Thyme', amount: 'Pinch' },
      { name: 'Rosemary', amount: 'Pinch' },
    ],
    optionalIngredients: [
      { name: 'Tomatoes', amount: '5-10 pcs' },
      { name: 'White wine', amount: '200ml' },
    ],
    steps: [
      'Dice the potatoes, zucchini, aubergine & carrot and slice the Onion. ',
      "Roast the potatoes in the oil, after a while add the tomato paste. Add the remaining vegetables, as well as the mustard, thyme & rosemary and pour in the wine. Put on lid to retain moisture, pay attention that it doesn't burn",
      'Meanwhile season the salmon as you wish, e.g. lemon & pepper or ginger & chili. Sear the salmon on its skin approximately 5min on high heat.',
      'Cook the vegetables until potatoes & carrots are soft to eat, season with salt & pepper.',
    ],
    nutrition: { calories: 850, fat: 40, carbs: 60, protein: 34 },
  };
}

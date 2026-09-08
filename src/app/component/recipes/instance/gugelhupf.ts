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
    name: 'Marmor-Gugelhupf',
    category: 'Baking',
    description: '',
    image: 'assets/gugelhupf.jpg',
    prepTime: '20 min',
    cookTime: '45 min',
    difficulty: 'Simple',
    portions: 1,
    ingredients: [
      { name: 'Eggs', amount: '4' },
      { name: 'Butter', amount: '200g' },
      { name: 'Milk', amount: '250ml' },
      { name: 'Sugar', amount: '250g' },
      { name: 'Flour', amount: '400g' },
      { name: 'Baking chocolate powder', amount: '35-50g' },
      { name: 'Baking powder', amount: '16g' },
    ],
    optionalIngredients: [
      { name: 'Grated Nuts', amount: '100g' },
      { name: 'Lemon Zest', amount: '1/2 lemon' },
    ],
    steps: [
      'Mix flour, sugar, milk & eggs together and mix until homogenous.',
      'Split the dough into two similarly sized batches, add to one of them the cocoa & most of the nuts, to the other one the lemon zest.',
      'Butter the cake pan, sprinkle remaining nuts onto the walls of the form. Pour the two batches alternately into the form.',
      'Bake it at 180°C for 45 minutes.',
      'Variant: Use a flat lasagna-like form. Pour the light dough in first, and then pour the cocoa one in separate blobs, achieving a leopard like pattern.',
    ],
    nutrition: { calories: 4000, fat: 220, carbs: 475, protein: 80 },
  };
}

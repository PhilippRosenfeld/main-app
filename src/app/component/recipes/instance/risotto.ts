import { Component } from '@angular/core';
import { RecipeTemplateComponent } from '../recipe-template.component/recipe-template.component';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-Risotto',
  standalone: true,
  imports: [RecipeTemplateComponent],
  template: `<app-recipe-template [recipe]="recipe"></app-recipe-template>`,
})
export class RisottoComponent {
  recipe: RecipeModel = {
    name: 'Risotto',
    category: 'Cooking',
    description: '',
    image: 'assets/risotto.jpg',
    prepTime: '30min',
    cookTime: '45min',
    difficulty: 'Medium',
    portions: 2,
    ingredients: [
      { name: 'Risotto rice (Arborio/Carnaroli)', amount: '150g' },
      { name: 'Shallot/small Onion', amount: '2 pc' },
      { name: 'Garlic', amount: '1 clove' },
      { name: 'White wine', amount: '100ml' },
      { name: 'Vegetable/chicken stock', amount: '500ml' },
      { name: 'Butter', amount: '50g' },
      { name: 'Olive oil', amount: '25ml' },
    ],
    optionalIngredients: [
      { name: 'Mushrooms', amount: '250g' },
      { name: 'Parsley', amount: 'A bunch' },
      { name: 'Parmesan', amount: '30g' },
      { name: 'Safran', amount: 'not as much as you would think' },
    ],
    steps: [
      'Before starting with the risotto, start by making the stock, see link here.',
      'Finely dice the shallots and let them sweat on low heat in the olive oil and half of the butter, do not let them brown.',
      'Add the rice and toast it for 3min while stirring, until it turns glassy.',
      'Deglaze with the white wine and let it reduce until almost fully absorbed.',
      'Add the hot stock one ladle at a time, stirring frequently and letting each addition absorb before adding the next. Continue for about 20-30min until the rice is creamy but still has a bite.',
      'Remove from heat and stir in the rest of the butter and parmesan, if wanted. Season with salt and pepper, optionally parsley.',
      'Variant: alla milanese: grind the safran in a mortar and let it desolve in some of the white wine and stock for 10-15min. Add it shortly before the end to the rice.',
      'Variant: Mushrooms: dice and sear them separately in a pan with some oil, add salt and parsley. After searing, stir half of it into the rice, use the other one to garnish.'
    ],
    nutrition: { calories: 650, fat: 33, carbs: 72, protein: 8 },
  };
}

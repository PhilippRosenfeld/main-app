import { Component } from '@angular/core';
import { RecipeTemplateComponent } from '../recipe-template.component/recipe-template.component';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-Rindsgulasch',
  standalone: true,
  imports: [RecipeTemplateComponent],
  template: `<app-recipe-template [recipe]="recipe"></app-recipe-template>`,
})
export class RindsgulaschComponent {
  recipe: RecipeModel = {
    name: 'Rindsgulasch',
    category: 'Cooking',
    description: '',
    image: 'assets/rindsgulasch.jpg',
    prepTime: '30min',
    cookTime: '2-3h',
    difficulty: 'Medium',
    portions: 4,
    ingredients: [
      { name: 'Beef', amount: '500g' },
      { name: 'Onion', amount: '500g' },
      { name: 'Carrot', amount: '2 pcs' },
      { name: 'Celery', amount: 'A bunch' },
      { name: 'Garlic', amount: '1-4 gloves' },
      { name: 'Red Wine', amount: '250ml' },
      { name: 'Vinegar', amount: '25-50ml' },
      { name: 'Vegetable oil', amount: '25ml' },
      { name: 'Soup stock', amount: '500ml' },
      { name: 'Tomato paste', amount: '2 tablespoon' },
      { name: 'Marjoram', amount: 'Quite a bit' },
      { name: 'Paprika', amount: 'Quite a lot' },
      { name: 'Caraway seeds', amount: 'Pinch' },
      { name: 'Bay leaves', amount: '2 pcs' },
      { name: 'Parsley', amount: 'Half a bunch' },
    ],
    steps: [
      'Start roasting the beef in the oil on high heat for about 5min.',
      'But the beef on a plate aside. Now sear the sliced onions for around 5-10min on high, then 15 min on medium to low heat. Stir often until they are soft.',
      'Add tomato paste, paprika, caraway seed & marjoram and roast for 20sec. Add in the vinegar and deglaze with the red wine.',
      'Now add the cubed carrots, sliced garlic, celery & bay leaves and return the beef to the pot. Fill up with soup stock (or alternatively water), and let it simmer on medium to low heat for several hours, the longer the better.',
      'Just before the end add a part of the chopped parsley, use the remaining one to sprinkle over and decorate the dish.',
    ],
    nutrition: { calories: 550, fat: 30, carbs: 22, protein: 25 },
  };
}

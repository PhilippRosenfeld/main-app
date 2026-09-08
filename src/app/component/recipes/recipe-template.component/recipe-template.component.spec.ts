import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RecipeTemplateComponent } from './recipe-template.component';

describe('RecipeTemplateComponent', () => {
  let component: RecipeTemplateComponent;
  let fixture: ComponentFixture<RecipeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTemplateComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeTemplateComponent);
    component = fixture.componentInstance;
    component.recipe = {
      name: 'Test',
      category: 'Cooking',
      description: '',
      image: '',
      prepTime: '',
      cookTime: '',
      difficulty: '',
      portions: 1,
      ingredients: [],
      steps: [],
      nutrition: { calories: 0, fat: 0, carbs: 0, protein: 0 },
    };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

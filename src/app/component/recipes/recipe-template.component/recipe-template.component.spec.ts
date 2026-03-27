import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTemplateComponent } from './recipe-template.component';

describe('RecipeTemplateComponent', () => {
  let component: RecipeTemplateComponent;
  let fixture: ComponentFixture<RecipeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeTemplateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesMainComponent } from './recipes-main-component';

describe('RecipesMainComponent', () => {
  let component: RecipesMainComponent;
  let fixture: ComponentFixture<RecipesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesMainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

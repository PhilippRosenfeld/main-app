import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RecipesListComponent } from './recipes-main-component';

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

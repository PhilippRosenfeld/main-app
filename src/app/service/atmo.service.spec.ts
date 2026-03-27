import { TestBed } from '@angular/core/testing';

import { AtmoService } from './atmo.service';

describe('Atmo', () => {
  let service: AtmoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

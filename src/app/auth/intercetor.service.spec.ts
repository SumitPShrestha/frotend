import { TestBed } from '@angular/core/testing';

import { IntercetorService } from './intercetor.service';

describe('IntercetorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntercetorService = TestBed.get(IntercetorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TokenUtilService } from './token-util.service';

describe('TokenUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenUtilService = TestBed.get(TokenUtilService);
    expect(service).toBeTruthy();
  });
});

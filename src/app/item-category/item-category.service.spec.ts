import { TestBed } from '@angular/core/testing';

import { ItemCategoryService } from './item-category.service';

describe('ItemCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCategoryService = TestBed.get(ItemCategoryService);
    expect(service).toBeTruthy();
  });
});

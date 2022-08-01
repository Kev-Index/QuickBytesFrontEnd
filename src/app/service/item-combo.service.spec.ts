import { TestBed } from '@angular/core/testing';

import { ItemComboService } from './item-combo.service';

describe('ItemComboService', () => {
  let service: ItemComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

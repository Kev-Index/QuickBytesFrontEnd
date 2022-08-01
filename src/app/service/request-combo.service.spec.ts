import { TestBed } from '@angular/core/testing';

import { RequestComboService } from './request-combo.service';

describe('RequestComboService', () => {
  let service: RequestComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

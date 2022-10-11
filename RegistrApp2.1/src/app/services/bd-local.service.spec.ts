import { TestBed } from '@angular/core/testing';

import { BdLocalService } from './bd-local.service';

describe('BdLocalService', () => {
  let service: BdLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StockResolverService } from './stock-resolver.service';

describe('StockResolverService', () => {
  let service: StockResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

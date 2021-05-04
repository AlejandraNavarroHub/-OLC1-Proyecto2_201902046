import { TestBed } from '@angular/core/testing';

import { CompilarServiceService } from './compilar-service.service';

describe('CompilarServiceService', () => {
  let service: CompilarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompilarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

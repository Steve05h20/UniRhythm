import { TestBed } from '@angular/core/testing';

import { GetListeService } from './get-liste.service';

describe('GetListeService', () => {
  let service: GetListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

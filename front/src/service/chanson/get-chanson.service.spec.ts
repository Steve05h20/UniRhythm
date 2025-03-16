import { TestBed } from '@angular/core/testing';

import { GetChansonService } from './get-chanson.service';

describe('GetChansonService', () => {
  let service: GetChansonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetChansonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

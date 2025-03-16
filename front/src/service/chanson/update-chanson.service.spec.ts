import { TestBed } from '@angular/core/testing';

import { UpdateChansonService } from './update-chanson.service';

describe('UpdateChansonService', () => {
  let service: UpdateChansonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateChansonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DeleteChansonService } from './delete-chanson.service';

describe('DeleteChansonService', () => {
  let service: DeleteChansonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteChansonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

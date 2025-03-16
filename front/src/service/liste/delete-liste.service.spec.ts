import { TestBed } from '@angular/core/testing';

import { DeleteListeService } from './delete-liste.service';

describe('DeleteListeService', () => {
  let service: DeleteListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

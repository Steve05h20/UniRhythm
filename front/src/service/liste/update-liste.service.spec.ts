import { TestBed } from '@angular/core/testing';

import { UpdateListeService } from './update-liste.service';

describe('UpdateListeService', () => {
  let service: UpdateListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

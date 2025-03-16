import { TestBed } from '@angular/core/testing';

import { PostChansonService } from './post-chanson.service';

describe('PostChansonService', () => {
  let service: PostChansonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostChansonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
